import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchProjectBySlug, fetchAllProjects } from "@/lib/content-bridge";
import { MDXContent } from "@/components/mdx/mdx-content";
import { PortableTextContent } from "@/components/mdx/portable-text";
import type { PortableTextBlock } from "@portabletext/react";
import { ArrowUpRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await fetchAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);
  if (!project) notFound();

  const isSanity = "_sanityBody" in project && Array.isArray((project as { _sanityBody?: unknown })._sanityBody);

  return (
    <div className="mx-auto max-w-5xl px-6 py-28 sm:py-36">

      <header className="mb-12">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {project.frontmatter.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground/50"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {project.frontmatter.title}
        </h1>

        <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground/60">
          {project.frontmatter.year && <span>{project.frontmatter.year}</span>}
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {project.frontmatter.github && (
            <a
              href={project.frontmatter.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:border-accent-blue/30 hover:text-accent-blue"
            >
              GitHub
              <ArrowUpRight className="size-3.5" />
            </a>
          )}
          {project.frontmatter.demo && (
            <a
              href={project.frontmatter.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-all duration-200 hover:bg-foreground/85"
            >
              Live Demo
              <ArrowUpRight className="size-3.5" />
            </a>
          )}
        </div>
      </header>

      <div className="prose-custom">
        {isSanity ? (
          <PortableTextContent value={(project as unknown as { _sanityBody: PortableTextBlock[] })._sanityBody} />
        ) : (
          <MDXContent source={project.content} />
        )}
      </div>
    </div>
  );
}
