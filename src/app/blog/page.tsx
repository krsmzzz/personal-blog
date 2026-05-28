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
        {posts.map((post, i) => (
          <article key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group flex flex-col gap-5 -mx-3 rounded-xl px-3 py-3 transition-colors duration-200 hover:bg-muted/20 sm:flex-row">
              <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-xl border border-border/40 bg-card transition-all duration-500 group-hover:border-accent-blue/15 group-hover:shadow-[inset_0_0_20px_-6px_rgba(56,189,248,0.04)] sm:h-28 sm:w-48">
                {post.frontmatter.cover ? (
                  <Image src={post.frontmatter.cover} alt={post.frontmatter.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 192px" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center p-4">
                    <Thumbnail index={i} />
                  </div>
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

// Abstract thumbnails (fallback when no cover image)
function Thumbnail({ index }: { index: number }) {
  const t = index % 4;
  if (t === 0) return <TerminalPreview />;
  if (t === 1) return <ArchitecturePreview />;
  if (t === 2) return <CodePreview />;
  return <SystemPreview />;
}

function TerminalPreview() {
  return (
    <div className="flex w-full flex-col gap-1 font-mono text-[9px] text-muted-foreground/25">
      <div className="flex items-center gap-1 text-accent-blue/40">
        <span className="text-muted-foreground/20">$</span>
        <span>npm run dev</span>
      </div>
      <div className="h-1 w-3/4 rounded-sm bg-muted-foreground/8" />
      <div className="flex gap-1">
        <span className="text-muted-foreground/20">$</span>
        <span className="h-1 w-10 rounded-sm bg-muted-foreground/10" />
      </div>
      <div className="flex gap-1 text-accent-blue/35">
        <span className="text-muted-foreground/20">$</span>
        <span>✓ ready</span>
        <span className="ml-auto text-muted-foreground/12">2.1s</span>
      </div>
    </div>
  );
}

function ArchitecturePreview() {
  return (
    <div className="flex w-full items-center justify-center gap-2">
      <div className="flex flex-col items-center gap-0.5">
        <div className="size-1.5 rounded border border-muted-foreground/20 bg-muted-foreground/8" />
        <div className="h-2 w-px bg-muted-foreground/12" />
        <div className="size-1 rounded border border-muted-foreground/20" />
        <div className="h-2 w-px bg-muted-foreground/12" />
        <div className="size-1.5 rounded border border-muted-foreground/20 bg-muted-foreground/8" />
      </div>
      <div className="h-px w-5 bg-muted-foreground/12" />
      <div className="flex flex-col items-center gap-0.5">
        <div className="size-1 rounded border border-accent-blue/25" />
        <div className="h-2 w-px bg-muted-foreground/12" />
        <div className="size-1.5 rounded border border-muted-foreground/20 bg-muted-foreground/8" />
        <div className="h-2 w-px bg-accent-blue/12" />
        <div className="size-1 rounded border border-muted-foreground/20" />
      </div>
      <div className="h-px w-5 bg-muted-foreground/12" />
      <div className="flex flex-col items-center gap-0.5">
        <div className="size-1 rounded border border-muted-foreground/20" />
        <div className="h-2 w-px bg-muted-foreground/12" />
        <div className="size-1 rounded border border-muted-foreground/20" />
        <div className="h-2 w-px bg-muted-foreground/12" />
        <div className="size-1.5 rounded border border-muted-foreground/20 bg-muted-foreground/8" />
      </div>
    </div>
  );
}

function CodePreview() {
  return (
    <div className="flex w-full flex-col gap-0.5 font-mono text-[8px]">
      <div className="flex gap-1">
        <span className="text-muted-foreground/18">01</span>
        <span className="text-muted-foreground/18">import</span>
        <span className="text-muted-foreground/25">{'{'}</span>
        <span className="text-accent-blue/30">type</span>
        <span className="text-muted-foreground/25">{'}'}</span>
        <span className="text-muted-foreground/18">from</span>
      </div>
      <div className="flex gap-1">
        <span className="text-muted-foreground/18">02</span>
        <span className="text-muted-foreground/25 ml-3">{'<'}</span>
        <span className="text-muted-foreground/18">T</span>
        <span className="text-muted-foreground/25">{'>'}</span>
      </div>
      <div className="flex gap-1">
        <span className="text-muted-foreground/18">03</span>
        <span className="text-muted-foreground/18 ml-3">fn</span>
        <span className="text-accent-blue/30">build</span>
        <span className="text-muted-foreground/25">(</span>
        <span className="text-muted-foreground/25">)</span>
      </div>
      <div className="flex gap-1">
        <span className="text-muted-foreground/18">04</span>
        <span className="text-muted-foreground/18 ml-3">return</span>
        <span className="text-muted-foreground/25">{'=>'}</span>
        <span className="text-muted-foreground/22 font-sans">...</span>
      </div>
    </div>
  );
}

function SystemPreview() {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="flex items-center justify-between text-[8px] text-muted-foreground/22">
        <span>cpu</span>
        <span>42%</span>
      </div>
      <div className="h-1 w-full rounded-full bg-muted-foreground/8">
        <div className="h-full w-[42%] rounded-full bg-muted-foreground/18" />
      </div>
      <div className="flex items-center justify-between text-[8px] text-muted-foreground/22">
        <span>mem</span>
        <span>3.2 / 16 GB</span>
      </div>
      <div className="h-1 w-full rounded-full bg-muted-foreground/8">
        <div className="h-full w-[20%] rounded-full bg-muted-foreground/18" />
      </div>
      <div className="flex items-center justify-between text-[8px] text-muted-foreground/22">
        <span>disk</span>
        <span>128 GB</span>
      </div>
      <div className="h-1 w-full rounded-full bg-muted-foreground/8">
        <div className="h-full w-[35%] rounded-full bg-accent-blue/18" />
      </div>
    </div>
  );
}
