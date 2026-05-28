import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import type { PortableTextBlock } from "@portabletext/react";
import { fetchIdeaBySlug, fetchAllIdeas } from "@/lib/content-bridge";
import { PortableTextContent } from "@/components/mdx/portable-text";
import { ArrowUpRight } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const ideas = await fetchAllIdeas();
  return ideas.map((idea) => ({ slug: idea.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const idea = await fetchIdeaBySlug(slug);
  if (!idea) return {};
  return {
    title: idea.frontmatter.title,
    description: idea.frontmatter.excerpt,
    openGraph: {
      title: idea.frontmatter.title,
      description: idea.frontmatter.excerpt,
      type: "article",
      images: idea.frontmatter.coverImage ? [idea.frontmatter.coverImage] : [],
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function IdeaPage({ params }: Props) {
  const { slug } = await params;
  const idea = await fetchIdeaBySlug(slug);
  if (!idea) notFound();

  const { title, date, tags, coverImage, galleryImages, quote, links } = idea.frontmatter;

  return (
    <article className="mx-auto max-w-5xl px-6 py-28 sm:py-36">
      <Link href="/ideas" className="mb-8 inline-flex text-sm text-muted-foreground/60 transition-colors duration-200 hover:text-accent-blue">← 想法</Link>
      <header className="mb-12">
        {tags && tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span key={tag} className="rounded-md border border-border/50 px-2 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground/50">{tag}</span>
            ))}
          </div>
        )}
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{title}</h1>
        <time className="mt-4 inline-block font-mono text-sm text-muted-foreground/50">{formatDate(date)}</time>
      </header>
      {quote && (
        <blockquote className="mb-12 border-l-2 border-accent-blue/30 bg-accent-blue-subtle/5 py-4 pl-5 italic text-muted-foreground/70">{quote}</blockquote>
      )}
      {coverImage && (
        <div className="mb-12 overflow-hidden rounded-2xl border border-border/40">
          <Image src={coverImage} alt={title} width={1200} height={675} className="w-full object-cover" priority />
        </div>
      )}
      {idea._sanityBody && (idea._sanityBody as PortableTextBlock[]).length > 0 && (
        <div className="mb-12">
          <PortableTextContent value={idea._sanityBody as PortableTextBlock[]} />
        </div>
      )}
      {galleryImages && galleryImages.length > 0 && (
        <div className="mb-12 grid gap-4 sm:grid-cols-2">
          {galleryImages.map((img, i) => (
            <figure key={i} className="overflow-hidden rounded-xl border border-border/40">
              {img.url && <Image src={img.url} alt={img.alt || ""} width={600} height={400} className="w-full object-cover" />}
              {img.caption && <figcaption className="px-4 py-2.5 font-mono text-[11px] text-muted-foreground/50">{img.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}
      {links && links.length > 0 && (
        <div className="rounded-xl border border-border/50 bg-card/50 p-5">
          <h3 className="mb-3 font-mono text-[10px] tracking-[0.15em] text-muted-foreground/40 uppercase">Links</h3>
          <div className="space-y-2">
            {links.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground/70 transition-all duration-200 hover:bg-muted/30 hover:text-accent-blue">
                {link.label || link.url}
                <ArrowUpRight className="size-3.5 text-muted-foreground/40 transition-all duration-200 group-hover:text-accent-blue/60 group-hover:-translate-y-px group-hover:translate-x-px" />
              </a>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
