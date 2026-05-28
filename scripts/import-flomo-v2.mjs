import fs from "fs";
import path from "path";
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

// ===== PARSE HTML =====
const html = fs.readFileSync(HTML_PATH, "utf8");
const parts = html.split('<div class="memo">');
parts.shift();

const memos = [];

for (let i = 0; i < parts.length; i++) {
  const block = parts[i];
  const timeMatch = block.match(/<div class="time">([^<]+)<\/div>/);
  const contentMatch = block.match(/<div class="content">([\s\S]*?)<\/div>/);
  if (!timeMatch || !contentMatch) continue;

  const time = timeMatch[1].trim(); // "2024-11-27 15:55:46" or "2024-11-27"
  const raw = contentMatch[1];

  // Extract images
  const imgMatches = [...block.matchAll(/<img[^>]*src="([^"]+)"[^>]*>/g)];
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

  const datePart = time.split(" ")[0];
  const timePart = time.split(" ")[1] || "12:00:00";

  memos.push({
    date: datePart,
    time: timePart,
    text,
    imagePaths,
    index: i,
  });
}

console.log(`Parsed ${memos.length} memos`);
const memosWithImages = memos.filter(m => m.imagePaths.length > 0);
console.log(`Memos with images: ${memosWithImages.length}`);

// ===== UPLOAD IMAGES =====
// Use HTTP API directly for more control
const imageCache = new Map();

async function uploadImageHttp(localPath) {
  if (imageCache.has(localPath)) return imageCache.get(localPath);

  const fullPath = path.join(BASE, localPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`  [SKIP] Not found: ${localPath}`);
    return null;
  }

  const buffer = fs.readFileSync(fullPath);
  const ext = path.extname(localPath).slice(1).toLowerCase();
  const mimeMap = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", gif: "image/gif", webp: "image/webp" };
  const contentType = mimeMap[ext] || "image/jpeg";

  try {
    const resp = await fetch(
      `https://2coiw8kw.api.sanity.io/v2025-01-01/assets/images/production`,
      {
        method: "POST",
        headers: {
          Authorization: "Bearer sk53mJEGebnv9BiNcGVTukvnURB5casE81rSYEUwRCiRSlWmTG3GhBxm3OjsPRDXdpYhoKxGF8aNTNcPo",
          "Content-Type": contentType,
        },
        body: buffer,
      }
    );
    const json = await resp.json();
    if (json.document) {
      console.log(`  [OK] ${localPath.split("/").pop()} -> ${json.document._id}`);
      imageCache.set(localPath, json.document);
      return json.document;
    } else {
      console.log(`  [FAIL] ${localPath}: ${JSON.stringify(json).slice(0, 100)}`);
      return null;
    }
  } catch (err) {
    console.log(`  [ERROR] ${localPath}: ${err.message}`);
    return null;
  }
}

// ===== CREATE DOCUMENTS =====
let count = 0;

for (const memo of memos) {
  const docId = `idea-flomo-${memo.date}-${memo.index}`;

  // Upload images
  const imageRefs = [];
  for (const imgPath of memo.imagePaths) {
    const asset = await uploadImageHttp(imgPath);
    if (asset) {
      imageRefs.push({
        _type: "image",
        _key: `img${imageRefs.length}`,
        asset: { _type: "reference", _ref: asset._id },
        alt: memo.text.slice(0, 60),
      });
    }
  }

  // Build content blocks (split by double newline)
  const paragraphs = memo.text.split(/\n\n+/).filter(Boolean);
  const content = paragraphs.length > 0
    ? paragraphs.map(p => ({
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: p.replace(/\n/g, " ") }],
        markDefs: [],
      }))
    : [{
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
    date: `${memo.date}T${memo.time}.000Z`,
  };

  try {
    await client.createOrReplace(doc);
    count++;
    if (count % 50 === 0) console.log(`  Docs: ${count}/${memos.length}`);
  } catch (err) {
    console.log(`  [ERR] ${docId}: ${err.message}`);
  }
}

console.log(`\nDone! Created ${count} ideas.`);
