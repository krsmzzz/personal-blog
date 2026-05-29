import { client, previewClient } from "./client";
import type { Post, Project, Idea } from "./types";

// ----- Posts -----

export async function getAllPosts(preview = false): Promise<Post[]> {
  const c = preview ? previewClient : client;
  return c.fetch<Post[]>(`
    *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
      _id,
      title,
      "slug": coalesce(slug.current, _id),
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
    *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
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
    *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))].slug.current
  `);
}

// ----- Projects -----

export async function getAllProjects(preview = false): Promise<Project[]> {
  const c = preview ? previewClient : client;
  return c.fetch<Project[]>(`
    *[_type == "project" && defined(slug.current) && !(_id in path("drafts.**"))] | order(_createdAt desc) {
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
    *[_type == "project" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
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

// ----- Ideas -----

export async function getAllIdeas(preview = false): Promise<Idea[]> {
  const c = preview ? previewClient : client;
  return c.fetch<Idea[]>(`
    *[_type == "idea" && defined(date) && !(_id in path("drafts.**"))] | order(date desc) {
      _id,
      "title": content[0].children[0].text,
      "slug": _id,
      date,
      "excerpt": array::join(string::split(pt::text(content), "")[0..1999], ""),
      "galleryImages": images[] {
        "asset": asset->{url},
        alt
      }
    }
  `);
}

export async function getIdeaBySlug(slug: string, preview = false): Promise<Idea | null> {
  const c = preview ? previewClient : client;
  return c.fetch<Idea | null>(`
    *[_type == "idea" && _id == $slug && !(_id in path("drafts.**"))][0] {
      _id,
      "title": content[0].children[0].text,
      "slug": _id,
      date,
      "excerpt": array::join(string::split(pt::text(content), "")[0..1999], ""),
      "galleryImages": images[] {
        "asset": asset->{url},
        alt
      }
    }
  `, { slug });
}

export async function getAllIdeaSlugs(): Promise<string[]> {
  return client.fetch<string[]>(`
    *[_type == "idea" && defined(date)]._id
  `);
}
