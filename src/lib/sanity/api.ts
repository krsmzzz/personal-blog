import { client, previewClient } from "./client";
import type { Post, Project, Thought } from "./types";

// ----- Posts -----

export async function getAllPosts(preview = false): Promise<Post[]> {
  const c = preview ? previewClient : client;
  return c.fetch<Post[]>(`
    *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      description,
      publishedAt,
      "tags": tags[]->title,
      "cover": cover.asset->url,
      body,
      "readingTime": round(length(pt::text(body)) / 5 / 200)
    }
  `);
}

export async function getPostBySlug(slug: string, preview = false): Promise<Post | null> {
  const c = preview ? previewClient : client;
  return c.fetch<Post | null>(`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      description,
      publishedAt,
      "tags": tags[]->title,
      "cover": cover.asset->url,
      body,
      "readingTime": round(length(pt::text(body)) / 5 / 200)
    }
  `, { slug });
}

export async function getAllPostSlugs(): Promise<string[]> {
  return client.fetch<string[]>(`
    *[_type == "post" && defined(slug.current)].slug.current
  `);
}

// ----- Projects -----

export async function getAllProjects(preview = false): Promise<Project[]> {
  const c = preview ? previewClient : client;
  return c.fetch<Project[]>(`
    *[_type == "project" && defined(slug.current)] | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      description,
      "tags": tags[]->title,
      github,
      demo,
      year,
      body,
      featured
    }
  `);
}

export async function getProjectBySlug(slug: string, preview = false): Promise<Project | null> {
  const c = preview ? previewClient : client;
  return c.fetch<Project | null>(`
    *[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      description,
      "tags": tags[]->title,
      github,
      demo,
      year,
      body,
      featured
    }
  `, { slug });
}

// ----- Thoughts -----

export async function getAllThoughts(preview = false): Promise<Thought[]> {
  const c = preview ? previewClient : client;
  return c.fetch<Thought[]>(`
    *[_type == "thought" && defined(date)] | order(date desc) {
      _id,
      content,
      date
    }
  `);
}
