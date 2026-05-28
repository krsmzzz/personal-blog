import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { fetchAllPosts } from "@/lib/content-bridge";

export const metadata: Metadata = {
  title: "文章",
  description: "关于 TypeScript、系统设计与独立开发的文章。",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

export default async function BlogPage() {
  const posts = await fetchAllPosts();

  return (
    <div className="mx-auto max-w-5xl px-6 py-28 sm:py-36">
      <div className="mb-16">
        <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/50 uppercase">文章</p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">文章</h1>
      </div>
      <div className="space-y-10">
        {posts.map((post) => (
          <article key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group flex flex-col gap-5 -mx-3 rounded-xl px-3 py-3 transition-colors duration-200 hover:bg-muted/20 sm:flex-row">
              <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl border border-border/40 bg-card transition-all duration-300 group-hover:border-accent-blue/20 sm:h-28 sm:w-48">
                {post.frontmatter.cover ? (
                  <Image src={post.frontmatter.cover} alt={post.frontmatter.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 192px" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted/20 font-mono text-[10px] text-muted-foreground/30">无封面</div>
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-center">
                <time dateTime={post.frontmatter.date} className="mb-2 block font-mono text-[11px] tabular-nums text-muted-foreground/40">{formatDate(post.frontmatter.date)}</time>
                <h2 className="mb-1.5 text-lg font-medium leading-snug text-foreground transition-colors duration-200 group-hover:text-foreground/65">{post.frontmatter.title}</h2>
                {post.frontmatter.description && (
                  <p className="mb-2 line-clamp-2 max-w-xl text-sm leading-relaxed text-muted-foreground/60">{post.frontmatter.description}</p>
                )}
                <div className="flex flex-wrap items-center gap-1.5">
                  {post.frontmatter.tags?.map((tag) => (
                    <span key={tag} className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground/50">{tag}</span>
                  ))}
                  <span className="font-mono text-[10px] text-muted-foreground/30 ml-1">{post.readingTime}</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
