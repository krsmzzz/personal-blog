import fs from "fs";

const html = fs.readFileSync(
  "/Users/wangruikang/Downloads/flomo@krsmzzz-20260528/krsmzzz的笔记.html",
  "utf8"
);

const memoRegex = /<div class="memo">\s*<div class="time">([^<]+)<\/div>\s*<div class="content"><p>(.+?)<\/p><\/div>/gs;
const docs = [];
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
  docs.push({
    _type: "thought",
    _id: `thought-${date}-${docs.length}`,
    content,
    date,
  });
}

// Write NDJSON for Sanity CLI import
const ndjson = docs.map((d) => JSON.stringify(d)).join("\n");
const outPath = "/Users/wangruikang/Documents/个人博客/scripts/flomo-import.ndjson";
fs.writeFileSync(outPath, ndjson);
console.log(`Wrote ${docs.length} documents to flomo-import.ndjson`);
