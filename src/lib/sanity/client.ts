import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";
const token = process.env.SANITY_API_READ_TOKEN;

// Main client — use token if available (needed for private datasets in CI)
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: !token, // CDN only works for public datasets without token
  token,
  stega: { studioUrl: "/studio" },
});

// Preview client — always uses token, no CDN
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token,
  stega: { studioUrl: "/studio" },
});
