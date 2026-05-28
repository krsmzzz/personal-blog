import type { PortableTextBlock } from "@portabletext/react";
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
      readingTime: p.readingTime > 0 ? `${p.readingTime} 分钟阅读` : "1 分钟阅读",
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
      readingTime: post.readingTime > 0 ? `${post.readingTime} 分钟阅读` : "1 分钟阅读",
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

// ----- Projects -----

import type { Project } from "./content";
import { getAllProjects as getMdxProjects, getProjectBySlug as getMdxProjectBySlug } from "./content";

async function getSanityProjectsSafe() {
  try {
    const { getAllProjects } = await import("./sanity/api");
    const projects = await getAllProjects();
    return projects.map((p: { slug: string; title: string; description?: string; tags?: string[]; github?: string; demo?: string; year?: string; featured?: boolean; body: unknown }) => ({
      slug: p.slug,
      frontmatter: {
        title: p.title,
        description: p.description,
        tags: p.tags,
        github: p.github,
        demo: p.demo,
        year: p.year,
        featured: p.featured,
      },
      content: "",
      _sanityBody: p.body,
    }));
  } catch {
    return [];
  }
}

async function getSanityProjectBySlugSafe(slug: string) {
  try {
    const { getProjectBySlug } = await import("./sanity/api");
    const project = await getProjectBySlug(slug);
    if (!project) return null;
    return {
      slug: project.slug,
      frontmatter: {
        title: project.title,
        description: project.description,
        tags: project.tags,
        github: project.github,
        demo: project.demo,
        year: project.year,
        featured: project.featured,
      },
      content: "",
      _sanityBody: project.body,
    };
  } catch {
    return null;
  }
}

export async function fetchAllProjects(): Promise<Project[]> {
  const mdxProjects = getMdxProjects();
  if (isSanityConfigured()) {
    const sanityProjects = await getSanityProjectsSafe();
    const sanitySlugs = new Set(sanityProjects.map((p: any) => p.slug));
    const filteredMdx = mdxProjects.filter((p) => !sanitySlugs.has(p.slug));
    return [...sanityProjects, ...filteredMdx] as Project[];
  }
  return mdxProjects;
}

export async function fetchProjectBySlug(slug: string) {
  if (isSanityConfigured()) {
    const sanityProject = await getSanityProjectBySlugSafe(slug);
    if (sanityProject) return sanityProject;
  }
  return getMdxProjectBySlug(slug);
}


// ----- Ideas -----

export interface IdeaFrontmatter {
  title: string;
  date: string;
  excerpt?: string;
  galleryImages?: Array<{ url?: string; alt?: string }>;
}

export interface IdeaPost {
  slug: string;
  frontmatter: IdeaFrontmatter;
  content: string;
  _sanityBody?: PortableTextBlock[];
}

async function getSanityIdeasSafe(): Promise<IdeaPost[]> {
  try {
    const { getAllIdeas } = await import("./sanity/api");
    const ideas = await getAllIdeas();
    return ideas.map((i) => ({
      slug: i.slug,
      frontmatter: {
        title: i.title,
        date: i.date,
        excerpt: i.excerpt,
        galleryImages: i.galleryImages?.map((g) => ({
          url: g.asset?.url,
          alt: g.alt,
        })),
      },
      content: "",
    }));
  } catch {
    return [];
  }
}

async function getSanityIdeaBySlugSafe(slug: string): Promise<IdeaPost | null> {
  try {
    const { getIdeaBySlug } = await import("./sanity/api");
    const idea = await getIdeaBySlug(slug);
    if (!idea) return null;
    return {
      slug: idea.slug,
      frontmatter: {
        title: idea.title,
        date: idea.date,
        excerpt: idea.excerpt,
        galleryImages: idea.galleryImages?.map((g) => ({
          url: g.asset?.url,
          alt: g.alt,
        })),
      },
      content: "",
    };
  } catch {
    return null;
  }
}

export async function fetchAllIdeas(): Promise<IdeaPost[]> {
  if (isSanityConfigured()) {
    return getSanityIdeasSafe();
  }
  return [];
}

export async function fetchIdeaBySlug(slug: string): Promise<IdeaPost | null> {
  if (isSanityConfigured()) {
    return getSanityIdeaBySlugSafe(slug);
  }
  return null;
}
