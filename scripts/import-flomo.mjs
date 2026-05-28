import fs from "fs";
import { createClient } from "@sanity/client";

const projectId = "2coiw8kw";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN || "skRxtMamSUQobYldVShCNAKP0UVL7sxTArfSiquLeeYM2W5BiZ1etueMqPAxAdQWikpOwRs5OuR3NzRBJ9gF5EBriWJztP2eWtzTVL0lc3KA9LQggDXkcHuNhuNunPFehSZufeao6t0gzeOR85fJKBr7HPPtKlJPf3vV2gRp5Cn3Ykeoq2JU";

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const html = fs.readFileSync(
  "/Users/wangruikang/Downloads/flomo@krsmzzz-20260528/krsmzzz的笔记.html",
  "utf8"
);

// Extract all memos
const memoRegex = /<div class="memo">\s*<div class="time">([^<]+)<\/div>\s*<div class="content"><p>(.+?)<\/p><\/div>/gs;
const memos = [];
let match;
while ((match = memoRegex.exec(html)) !== null) {
  const time = match[1].trim();
  const rawContent = match[2].trim();
  const content = rawContent
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
  const date = time.split(" ")[0];
  memos.push({ date, content });
}

console.log(`Found ${memos.length} memos\n`);

let imported = 0;
for (const memo of memos) {
  try {
    await client.create({
      _type: "thought",
      content: memo.content,
      date: memo.date,
    });
    imported++;
    console.log(`✅ [${memo.date}] ${memo.content.slice(0, 50)}...`);
  } catch (err) {
    console.error(`❌ [${memo.date}] ${err.message}`);
  }
}

console.log(`\nDone! Imported ${imported}/${memos.length} thoughts.`);
