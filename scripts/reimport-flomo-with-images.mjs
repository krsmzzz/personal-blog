import fs from "fs";
import { createClient } from "@sanity/client";

// ===== CONFIG =====
const BASE = "/Users/wangruikang/Downloads/flomo@krsmzzz-20260528 2";
const HTML_PATH = `${BASE}/krsmzzz的笔记.html`;

const client = createClient({
  projectId: "2coiw8kw",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  token: "sk53mJEGebnv9BiNcGVTukvnURB5casE81rSYEUwRCiRSlWmTG3GhBxm3OjsPRDXdpYhoKxGF8aNTNcPo",
});

// ===== PARSE HTML =====
const html = fs.readFileSync(HTML_PATH, "utf8");

// Extract each memo div with its full inner content
const memoBlocks = html.match(/<div class="memo">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g) || [];
console.log(`Found ${memoBlocks.length} memos`);

const memos = [];

for (const block of memoBlocks) {
  // Extract time
  const timeMatch = block.match(/<div class="time">([^<]+)<\/div>/);
  if (!timeMatch) continue;
  const time = timeMatch[1].trim();
  const date = time.split(" ")[0];

  // Extract all content (text + image tags)
  const contentMatch = block.match(/<div class="content">([\s\S]*?)<\/div>/);
  if (!contentMatch) continue;
  const rawContent = contentMatch[1].trim();

  // Extract images
  const imgMatches = [...rawContent.matchAll(/<img\s+src="([^"]+)"[^>]*\/>/g)];
  const imagePaths = imgMatches.map(m => m[1]);
  
  // Extract text (remove img tags and HTML)
  let text = rawContent
    .replace(/<img[^>]*\/>/g, "")
    .replace(/<br\s*\/?>/g, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();

  if (!text && imagePaths.length === 0) continue;

  // Clean up text: remove HTML entities
  memos.push({ date, time: time, text, imagePaths, index: memos.length });
}

console.log(`Parsed ${memos.length} memos with content`);

// ===== UPLOAD IMAGES TO SANITY =====
const imageCache = new Map(); // localPath -> sanityAsset

async function uploadImage(localPath) {
  if (imageCache.has(localPath)) return imageCache.get(localPath);
  
  const fullPath = `${BASE}/${localPath}`;
  if (!fs.existsSync(fullPath)) {
    console.log(`  Image not found: ${localPath}`);
    return null;
  }

  try {
    const buffer = fs.readFileSync(fullPath);
    const ext = localPath.split(".").pop();
    const mimeMap = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", gif: "image/gif", webp: "image/webp" };
    const filename = localPath.split("/").pop();
    
    const asset = await client.assets.upload("image", buffer, { 
      filename, 
      contentType: mimeMap[ext] || "image/jpeg" 
    });
    
    imageCache.set(localPath, asset);
    return asset;
  } catch (err) {
    console.log(`  Failed to upload ${localPath}: ${err.message}`);
    return null;
  }
}

// ===== CREATE SANITY DOCUMENTS =====
let successCount = 0;
let skipCount = 0;

for (let i = 0; i < memos.length; i++) {
  const memo = memos[i];
  const docId = `idea-flomo-${memo.date}-${i}`;
  
  // Upload images for this memo
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

  // Build content blocks
  const content = [{
    _type: "block",
    style: "normal",
    children: [{ _type: "span", text: memo.text || "" }],
    markDefs: [],
  }];

  const doc = {
    _id: docId,
    _type: "idea",
    content,
    images: imageRefs,
    date: `${memo.date}T12:00:00.000Z`,
  };

  try {
    await client.createOrReplace(doc);
    successCount++;
    if (successCount % 20 === 0) console.log(`  Progress: ${successCount}/${memos.length}`);
  } catch (err) {
    console.log(`  Skip ${docId}: ${err.message}`);
    skipCount++;
  }
}

console.log(`\nDone! Created: ${successCount}, Skipped: ${skipCount}`);
