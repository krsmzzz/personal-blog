import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { createClient } from "@sanity/client";
import { execSync } from "child_process";

const raw = execSync("npx sanity debug --secrets 2>&1", { encoding: "utf-8" });
const match = raw.match(/Auth token: (\S+)/);
const TOKEN = match[1];

const client = createClient({
  projectId: "2coiw8kw",
  dataset: "production",
  token: TOKEN,
  apiVersion: "2025-01-01",
  useCdn: false,
});

const projectsDir = path.join(process.cwd(), "content/projects");
const files = fs.readdirSync(projectsDir).filter((f) => f.endsWith(".mdx"));

// First, collect all unique tags
const allTags = new Set();
const projectData = [];

for (const file of files) {
  const raw = fs.readFileSync(path.join(projectsDir, file), "utf-8");
  const { data, content } = matter(raw);
  (data.tags || []).forEach((t) => allTags.add(t));
  projectData.push({ file, data, content, slug: file.replace(".mdx", "") });
}

console.log(`Tags to create: ${[...allTags].join(", ")}`);

// Create tags
const tagRefs = {};
for (const tagName of allTags) {
  const tagSlug = tagName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  // Check existing
  const existing = await client.fetch(`*[_type == "tag" && title == $t][0]._id`, { t: tagName });
  if (existing) {
    console.log(`⏭  Tag exists: ${tagName}`);
    tagRefs[tagName] = { _type: "reference", _ref: existing };
    continue;
  }
  const tag = await client.create({
    _type: "tag",
    title: tagName,
    slug: { _type: "slug", current: tagSlug },
  });
  console.log(`✅ Tag: ${tagName}`);
  tagRefs[tagName] = { _type: "reference", _ref: tag._id };
}

// Create projects
for (const { data, content, slug } of projectData) {
  const existing = await client.fetch(`*[_type == "project" && slug.current == $s][0]._id`, { s: slug });
  if (existing) {
    console.log(`⏭  Project exists: ${data.title}`);
    continue;
  }

  // Parse body into blocks
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
    _type: "project",
    title: data.title,
    slug: { _type: "slug", current: slug },
    description: data.description || "",
    tags: (data.tags || []).map((t) => tagRefs[t]).filter(Boolean),
    github: data.github || undefined,
    demo: data.demo || undefined,
    year: data.year || undefined,
    featured: data.featured || false,
    body: blocks,
  };

  await client.create(doc);
  console.log(`✅ Project: ${data.title}`);
}

console.log("\n迁移完成！");
