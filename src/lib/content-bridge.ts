/**
 * Unified data layer.
 * Merges Sanity CMS posts with local MDX posts.
 */

import { getAllPosts as getMdxPosts, getPostBySlug as getMdxPostBySlug } from "./content";
import type { Post } from "./content";

const isSanityConfigured = () =>
  !!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID &&
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID !== "your-project-id";

async function getSanityPostsSafe() {
  try {
    const { getAllPosts } = await import("./sanity/api");
    const posts = await getAllPosts();
    return posts.map((p: { slug: string; title: string; publishedAt: string; description?: string; tags?: string[]; cover?: string; body: unknown; readingTime: number }) => ({
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
  } catch {
    return [];
  }
}

async function getSanityPostBySlugSafe(slug: string) {
  try {
    const { getPostBySlug } = await import("./sanity/api");
    const post = await getPostBySlug(slug);
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
  } catch {
    return null;
  }
}

export async function fetchAllPosts(): Promise<Post[]> {
  const mdxPosts = getMdxPosts();
  if (isSanityConfigured()) {
    const sanityPosts = await getSanityPostsSafe();
    // Merge: Sanity posts first, then MDX (dedup by slug)
    const sanitySlugs = new Set(sanityPosts.map((p: Post) => p.slug));
    const filteredMdx = mdxPosts.filter((p) => !sanitySlugs.has(p.slug));
    return [...sanityPosts, ...filteredMdx];
  }
  return mdxPosts;
}

export async function fetchPostBySlug(slug: string) {
  if (isSanityConfigured()) {
    const sanityPost = await getSanityPostBySlugSafe(slug);
    if (sanityPost) return sanityPost;
  }
  return getMdxPostBySlug(slug);
}
