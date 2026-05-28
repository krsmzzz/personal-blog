import fs from "fs";
import { createClient } from "@sanity/client";

const BASE = "/Users/wangruikang/Downloads/flomo@krsmzzz-20260528 2";
const HTML_PATH = `${BASE}/krsmzzz的笔记.html`;

const client = createClient({
  projectId: "2coiw8kw",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  token: "sk53mJEGebnv9BiNcGVTukvnURB5casE81rSYEUwRCiRSlWmTG3GhBxm3OjsPRDXdpYhoKxGF8aNTNcPo",
});

// ===== PARSE =====
const html = fs.readFileSync(HTML_PATH, "utf8");
const parts = html.split('<div class="memo">');
parts.shift();

const memos = [];

for (let i = 0; i < parts.length; i++) {
  const block = parts[i];
  
  const timeMatch = block.match(/<div class="time">([^<]+)<\/div>/);
  const contentMatch = block.match(/<div class="content">([\s\S]*?)<\/div>/);
  if (!timeMatch || !contentMatch) continue;
  
  const time = timeMatch[1].trim(); // "2024-11-27 15:55:46"
  const raw = contentMatch[1];
  
  // Extract images
  const imgMatches = [...raw.matchAll(/<img\s+src="([^"]+)"[^>]*\/>/g)];
  const imagePaths = imgMatches.map(m => m[1]);
  
  // Clean text
  let text = raw
    .replace(/<img[^>]*\/>/g, "")
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/&#39;/g, "'")
    .trim();

  if (!text && imagePaths.length === 0) continue;

  const date = time.split(" ")[0];
  const timeOfDay = time.split(" ")[1] || "00:00:00";

  memos.push({ date, time: timeOfDay, text, imagePaths, index: i });
}

console.log(`Parsed ${memos.length} memos`);

// ===== UPLOAD IMAGES =====
const imageCache = new Map();

async function uploadImage(localPath) {
  if (imageCache.has(localPath)) return imageCache.get(localPath);
  
  const fullPath = `${BASE}/${localPath}`;
  if (!fs.existsSync(fullPath)) {
    console.log(`  [WARN] Image not found: ${localPath}`);
    return null;
  }

  try {
    const buffer = fs.readFileSync(fullPath);
    const filename = localPath.split("/").pop();
    const asset = await client.assets.upload("image", buffer, { filename });
    imageCache.set(localPath, asset);
    return asset;
  } catch (err) {
    console.log(`  [ERROR] Upload ${localPath}: ${err.message}`);
    return null;
  }
}

// ===== IMPORT =====
let successCount = 0;
let skipCount = 0;

for (const memo of memos) {
  const docId = `idea-flomo-${memo.date}-${memo.index}`;
  
  // Upload images
  const imageRefs = [];
  for (const imgPath of memo.imagePaths) {
    const asset = await uploadImage(imgPath);
    if (asset) {
      imageRefs.push({
        _type: "image",
        _key: `img${imageRefs.length}`,
        asset: { _type: "reference", _ref: asset._id },
        alt: memo.text.slice(0, 50),
      });
    }
  }

  // Build content array (Sanity blockContent)
  // Split text by double newline for paragraph breaks
  const paragraphs = memo.text.split(/\n\n+/).filter(Boolean);
  const content = paragraphs.length > 0 ? paragraphs.map((p, pi) => ({
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: p.replace(/\n/g, " ") }],
    markDefs: [],
  })) : [{
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: memo.text }],
    markDefs: [],
  }];

  const doc = {
    _id: docId,
    _type: "idea",
    content,
    images: imageRefs,
    date: `${memo.date}T${memo.timeOfDay}.000Z`,
  };

  try {
    await client.createOrReplace(doc);
    successCount++;
    if (successCount % 50 === 0) console.log(`  Progress: ${successCount}/${memos.length}`);
  } catch (err) {
    console.log(`  Skip ${docId}: ${err.message}`);
    skipCount++;
  }
}

console.log(`\nDone! Created: ${successCount}, Skipped: ${skipCount}`);
