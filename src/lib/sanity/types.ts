import type { PortableTextBlock } from "@portabletext/react";

export interface Post {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  publishedAt: string;
  tags?: string[];
  cover?: string;
  body: PortableTextBlock[];
  readingTime: number;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  tags?: string[];
  github?: string;
  demo?: string;
  year?: string;
  body: PortableTextBlock[];
  featured?: boolean;
}

export interface Category {
  _id: string;
  title: string;
  slug: string;
  description?: string;
}

export interface Thought {
  _id: string;
  content: string;
  date: string;
}

export interface IdeaImage {
  asset?: { url?: string };
  alt?: string;
  caption?: string;
}

export interface IdeaLink {
  label?: string;
  url?: string;
}

export interface Idea {
  _id: string;
  title: string;
  slug: string;
  date: string;
  excerpt?: string;
  tags?: string[];
  coverImage?: string;
  galleryImages?: IdeaImage[];
  body: PortableTextBlock[];
  quote?: string;
  links?: IdeaLink[];
  featured?: boolean;
}
