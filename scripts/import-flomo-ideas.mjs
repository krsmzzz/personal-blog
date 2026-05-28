import fs from "fs";

const html = fs.readFileSync(
  "/Users/wangruikang/Downloads/flomo@krsmzzz-20260528 2/krsmzzz的笔记.html",
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
  const timeStr = time.split(" ")[1]?.slice(0, 5) || "";
  
  // Use first 40 chars as title
  const title = content.slice(0, 40) + (content.length > 40 ? "…" : "");
  
  docs.push({
    _type: "idea",
    _id: `idea-flomo-${date}-${docs.length}`,
    title,
    date,
    excerpt: content.slice(0, 120) + (content.length > 120 ? "…" : ""),
  });
}

const ndjson = docs.map((d) => JSON.stringify(d)).join("\n");
fs.writeFileSync("/Users/wangruikang/Documents/个人博客/scripts/flomo-ideas-import.ndjson", ndjson);
console.log(`Wrote ${docs.length} ideas to flomo-ideas-import.ndjson`);
