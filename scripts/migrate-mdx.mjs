import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { createClient } from "@sanity/client";
import { execSync } from "child_process";

// Get auth token from sanity CLI
const raw = execSync("npx sanity debug --secrets 2>&1", { encoding: "utf-8" });
const match = raw.match(/Auth token: (\S+)/);
if (!match) {
  console.error("无法获取 Sanity auth token，请先运行 npx sanity login");
  process.exit(1);
}
const TOKEN = match[1];

const client = createClient({
  projectId: "2coiw8kw",
  dataset: "production",
  token: TOKEN,
  apiVersion: "2025-01-01",
  useCdn: false,
});

const blogDir = path.join(process.cwd(), "content/blog");
const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));

async function migrate() {
  for (const file of files) {
    const raw = fs.readFileSync(path.join(blogDir, file), "utf-8");
    const { data, content } = matter(raw);

    const slug = file.replace(".mdx", "");

    // Check if already exists
    const existing = await client.fetch(`*[_type == "post" && slug.current == $s][0]._id`, { s: slug });
    if (existing) {
      console.log(`⏭  已存在: ${data.title}`);
      continue;
    }

    // Parse content into portable text blocks
    const blocks = [];
    const paragraphs = content.trim().split("\n\n");
    for (const p of paragraphs) {
      const text = p.trim();
      if (!text) continue;
      let style = "normal";
      let cleanText = text;
      if (text.startsWith("## ")) { style = "h2"; cleanText = text.slice(3); }
      else if (text.startsWith("# ")) { style = "h1"; cleanText = text.slice(2); }
      else if (text.startsWith("> ")) { style = "blockquote"; cleanText = text.slice(2); }

      blocks.push({
        _type: "block",
        style,
        children: [{ _type: "span", text: cleanText.replace(/\n/g, " ") }],
      });
    }

    const doc = {
      _type: "post",
      title: data.title,
      slug: { _type: "slug", current: slug },
      description: data.description || "",
      publishedAt: data.date,
      body: blocks,
    };

    try {
      await client.create(doc);
      console.log(`✅ ${data.title}`);
    } catch (err) {
      console.error(`❌ ${data.title}: ${err.message}`);
    }
  }
  console.log("\n迁移完成！");
}

migrate().catch(console.error);
