import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "2coiw8kw",
  dataset: "production",
  apiVersion: "2025-01-01",
  token: "skRxtMamSUQobYldVShCNAKP0UVL7sxTArfSiquLeeYM2W5BiZ1etueMqPAxAdQWikpOwRs5OuR3NzRBJ9gF5EBriWJztP2eWtzTVL0lc3KA9LQggDXkcHuNhuNunPFehSZufeao6t0gzeOR85fJKBr7HPPtKlJPf3vV2gRp5Cn3Ykeoq2JU",
  useCdn: false,
});

const docs = await client.fetch('*[_type == "thought"]._id');
console.log(`Found ${docs.length} thought documents`);

const tx = client.transaction();
docs.forEach((id) => tx.delete(id));
await tx.commit();
console.log(`Deleted ${docs.length} documents`);
