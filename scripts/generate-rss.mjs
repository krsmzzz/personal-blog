import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentRoot = path.join(__dirname, "..", "content", "blog");
const outDir = path.join(__dirname, "..", "out");
const baseUrl = "https://ruikang.dev";

function getAllPosts() {
  if (!fs.existsSync(contentRoot)) return [];
  const files = fs.readdirSync(contentRoot).filter((f) => f.endsWith(".mdx"));
  return files.map((file) => {
    const raw = fs.readFileSync(path.join(contentRoot, file), "utf-8");
    const match = raw.match(/^---\n([\s\S]*?)\n---/);
    const frontmatter = {};
    if (match) {
      match[1].split("\n").forEach((line) => {
        const [key, ...rest] = line.split(":");
        if (key && rest.length) {
          frontmatter[key.trim()] = rest.join(":").trim().replace(/^"(.*)"$/, "$1");
        }
      });
    }
    return {
      slug: file.replace(/\.mdx$/, ""),
      frontmatter,
    };
  }).filter((p) => p.frontmatter.published !== false)
    .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
}

const posts = getAllPosts();
const items = posts.map((p) => `
    <item>
      <title><![CDATA[${p.frontmatter.title || ""}]]></title>
      <link>${baseUrl}/blog/${p.slug}</link>
      <description><![CDATA[${p.frontmatter.description || ""}]]></description>
      <pubDate>${p.frontmatter.date ? new Date(p.frontmatter.date).toUTCString() : ""}</pubDate>
      <guid>${baseUrl}/blog/${p.slug}</guid>
    </item>`).join("\n");

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ruikang</title>
    <description>个人博客与作品集</description>
    <link>${baseUrl}</link>
    <language>zh-CN</language>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "rss.xml"), rss);
console.log("✅ RSS generated: out/rss.xml");
