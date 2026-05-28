import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "out");
const baseUrl = "https://ruikang.dev";

const routes = [
  { url: baseUrl, priority: "1.0" },
  { url: `${baseUrl}/blog`, priority: "0.8" },
  { url: `${baseUrl}/projects`, priority: "0.8" },
  { url: `${baseUrl}/now`, priority: "0.6" },
  { url: `${baseUrl}/about`, priority: "0.5" },
];

// Add blog posts
const blogDir = path.join(__dirname, "..", "content", "blog");
if (fs.existsSync(blogDir)) {
  fs.readdirSync(blogDir).filter(f => f.endsWith(".mdx")).forEach(f => {
    routes.push({ url: `${baseUrl}/blog/${f.replace(".mdx", "")}`, priority: "0.7" });
  });
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(r => `  <url><loc>${r.url}</loc><priority>${r.priority}</priority></url>`).join("\n")}
</urlset>`;

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "sitemap.xml"), sitemap);
console.log("✅ Sitemap generated: out/sitemap.xml");
