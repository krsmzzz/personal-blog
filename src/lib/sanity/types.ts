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
