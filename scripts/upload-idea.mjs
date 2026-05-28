import { createClient } from "@sanity/client";
import { readFileSync } from "fs";

const client = createClient({
  projectId: "2coiw8kw",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  token: "skRxtMamSUQobYldVShCNAKP0UVL7sxTArfSiquLeeYM2W5BiZ1etueMqPAxAdQWikpOwRs5OuR3NzRBJ9gF5EBriWJztP2eWtzTVL0lc3KA9LQggDXkcHuNhuNunPFehSZufeao6t0gzeOR85fJKBr7HPPtKlJPf3vV2gRp5Cn3Ykeoq2JU",
});

const imageUrl = "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80";
const response = await fetch(imageUrl);
const buffer = Buffer.from(await response.arrayBuffer());

const asset = await client.assets.upload("image", buffer, { filename: "idea-image.jpg" });
console.log(JSON.stringify(asset));
