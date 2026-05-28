import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "2coiw8kw",
  dataset: "production",
  apiVersion: "2025-01-01",
  token: "skRxtMamSUQobYldVShCNAKP0UVL7sxTArfSiquLeeYM2W5BiZ1etueMqPAxAdQWikpOwRs5OuR3NzRBJ9gF5EBriWJztP2eWtzTVL0lc3KA9LQggDXkcHuNhuNunPFehSZufeao6t0gzeOR85fJKBr7HPPtKlJPf3vV2gRp5Cn3Ykeoq2JU",
  useCdn: false,
});

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 96);
}

const docs = await client.fetch('*[_type == "idea" && !defined(slug.current)]{_id, title}');
console.log(`Found ${docs.length} ideas without slug`);

if (docs.length === 0) {
  console.log("All ideas have slugs already.");
  process.exit(0);
}

const tx = client.transaction();
for (const doc of docs) {
  const s = slugify(doc.title);
  tx.patch(doc._id, { set: { slug: { _type: "slug", current: s } } });
}
const result = await tx.commit();
console.log(`Patched ${docs.length} ideas with slugs`);
