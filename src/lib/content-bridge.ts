/**
 * Unified data layer.
 * Uses Sanity if configured, otherwise falls back to local MDX.
 */
import { getAllPosts as getMdxPosts, getPostBySlug as getMdxPostBySlug } from "./content";

// Lazy Sanity imports — only loaded when env vars are set
async function getSanityPosts() {
  const { getAllPosts } = await import("./sanity/api");
  return getAllPosts();
}

async function getSanityPostBySlug(slug: string) {
  const { getPostBySlug } = await import("./sanity/api");
  return getPostBySlug(slug);
}

const isSanityConfigured = () =>
  !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your-project-id";

export async function fetchAllPosts() {
  if (isSanityConfigured()) {
    const posts = await getSanityPosts();
    return posts.map((p) => ({
      slug: p.slug,
      frontmatter: {
        title: p.title,
        date: p.publishedAt,
        description: p.description,
        tags: p.tags,
        cover: p.cover,
      },
      content: "",
      readingTime: p.readingTime > 0 ? `${p.readingTime} min read` : "1 min read",
      _sanityBody: p.body,
    }));
  }
  return getMdxPosts();
}

export async function fetchPostBySlug(slug: string) {
  if (isSanityConfigured()) {
    const post = await getSanityPostBySlug(slug);
    if (!post) return null;
    return {
      slug: post.slug,
      frontmatter: {
        title: post.title,
        date: post.publishedAt,
        description: post.description,
        tags: post.tags,
        cover: post.cover,
      },
      content: "",
      readingTime: post.readingTime > 0 ? `${post.readingTime} min read` : "1 min read",
      _sanityBody: post.body,
    };
  }
  return getMdxPostBySlug(slug);
}
