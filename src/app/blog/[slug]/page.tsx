import type { PortableTextBlock } from "@portabletext/react";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { fetchPostBySlug, fetchAllPosts } from "@/lib/content-bridge";
import { MDXContent } from "@/components/mdx/mdx-content";
import { PortableTextContent } from "@/components/mdx/portable-text";
import { TableOfContents, type TOCItem } from "@/components/mdx/table-of-contents";
import { ReadingProgress } from "@/components/mdx/reading-progress";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await fetchAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
      images: post.frontmatter.cover ? [post.frontmatter.cover] : [],
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

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await fetchPostBySlug(slug);
  if (!post) notFound();

  const { cover } = post.frontmatter;
  const isSanity = "_sanityBody" in post && Array.isArray((post as { _sanityBody?: unknown })._sanityBody);

  return (
    <>
      <ReadingProgress />
      <article>
        {cover && (
          <div className="relative mx-auto w-full max-w-5xl px-6 pt-24">
            <div className="overflow-hidden rounded-2xl border border-border/40">
              <Image src={cover} alt={post.frontmatter.title} width={1200} height={675} className="w-full object-cover" priority />
            </div>
          </div>
        )}
        <div className="mx-auto max-w-5xl px-6 py-24 sm:py-28">
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {post.frontmatter.tags?.map((tag) => (
                <span key={tag} className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground/50">{tag}</span>
              ))}
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">{post.frontmatter.title}</h1>
            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground/50">
              <time dateTime={post.frontmatter.date}>{formatDate(post.frontmatter.date)}</time>
              <span>·</span>
              <span>{post.readingTime}</span>
            </div>
          </header>
          <div className="flex gap-16">
            <div className="min-w-0 flex-1">
              {isSanity ? (
                <PortableTextContent value={(post as unknown as { _sanityBody: PortableTextBlock[] })._sanityBody} />
              ) : (
                <MDXContent source={post.content} />
              )}
            </div>
            <aside className="hidden w-48 shrink-0 lg:block">
              <div className="sticky top-28">
                <TableOfContents
                  content={isSanity ? undefined : post.content}
                  headings={
                    isSanity
                      ? (() => {
                          const blocks = (post as unknown as { _sanityBody: Array<{ style?: string; children?: Array<{ text?: string }> }> })._sanityBody;
                          const slugify = (t: string) => t.toLowerCase().replace(/[^\w\u4e00-\u9fff\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/(^-|-$)/g, "");
                          return blocks
                            .filter((b) => b.style === "h2" || b.style === "h3")
                            .map((b) => {
                              const text = (b.children || []).map((c) => c.text || "").join("");
                              return {
                                id: slugify(text),
                                text,
                                level: parseInt(b.style?.replace("h", "") || "2"),
                              };
                            });
                        })()
                      : undefined
                  }
                />
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
