"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { AnimatedSection, AnimatedItem } from "@/components/ui/animated-section";
import type { Post } from "@/lib/content";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

interface LatestPostsProps {
  posts: Post[];
  showAllLink?: boolean;
}

export function LatestPosts({
  posts,
  showAllLink = true,
}: LatestPostsProps) {
  return (
    <AnimatedSection bg="bg-background">
      <AnimatedItem className="mb-16">
        <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/50 uppercase">
          文章
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
          文章
        </h2>
      </AnimatedItem>

      <div className="space-y-8">
        {posts.map((post, i) => (
          <AnimatedItem key={post.slug}>
            <motion.article whileHover={{ x: 2 }} transition={{ duration: 0.2 }}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex gap-5 -mx-3 rounded-xl px-3 py-3 transition-colors duration-200 hover:bg-muted/20"
              >
                <div className="hidden h-[72px] w-[128px] shrink-0 overflow-hidden rounded-lg border border-border/40 bg-card transition-all duration-300 group-hover:border-accent-blue/20 sm:block">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex h-full w-full items-center justify-center p-3"
                  >
                    <Thumbnail index={i} />
                  </motion.div>
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-center">
                  <time
                    dateTime={post.frontmatter.date}
                    className="mb-2 block font-mono text-[11px] tabular-nums text-muted-foreground/40"
                  >
                    {formatDate(post.frontmatter.date)}
                  </time>
                  <h3 className="mb-1.5 text-base font-medium leading-snug text-foreground transition-colors duration-200 group-hover:text-foreground/65">
                    {post.frontmatter.title}
                  </h3>
                  {post.frontmatter.description && (
                    <p className="mb-2 line-clamp-2 max-w-xl text-sm leading-relaxed text-muted-foreground/60">
                      {post.frontmatter.description}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {post.frontmatter.tags?.map((tag) => (
                      <span key={tag} className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground/50">
                        {tag}
                      </span>
                    ))}
                    <span className="self-center font-mono text-[10px] text-muted-foreground/30 ml-1">
                      {post.readingTime}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          </AnimatedItem>
        ))}
      </div>

      {showAllLink && (
        <AnimatedItem className="mt-14">
          <Link
            href="/blog"
            className="text-sm font-medium text-muted-foreground/70 transition-colors duration-200 hover:text-accent-blue"
          >
            全部文章 →
          </Link>
        </AnimatedItem>
      )}
    </AnimatedSection>
  );
}

// Abstract thumbnails
function Thumbnail({ index }: { index: number }) {
  const t = index % 4;
  if (t === 0) return <TerminalPreview />;
  if (t === 1) return <ArchitecturePreview />;
  if (t === 2) return <CodePreview />;
  return <SystemPreview />;
}

function TerminalPreview() {
  return (
    <div className="flex w-full flex-col gap-1 font-mono text-[8px] text-muted-foreground/30">
      <div className="flex items-center gap-1 text-accent-blue/50">
        <span className="text-muted-foreground/25">$</span>
        <span>npm run build</span>
      </div>
      <div className="h-1 w-3/4 rounded-sm bg-muted-foreground/10" />
      <div className="flex gap-1">
        <span className="text-muted-foreground/25">$</span>
        <span className="h-1 w-8 rounded-sm bg-muted-foreground/12" />
      </div>
      <div className="flex gap-1 text-accent-blue/40">
        <span className="text-muted-foreground/25">$</span>
        <span>✓ done</span>
        <span className="ml-auto text-muted-foreground/15">3.2s</span>
      </div>
    </div>
  );
}

function ArchitecturePreview() {
  return (
    <div className="flex w-full items-center justify-center gap-2">
      <div className="flex flex-col items-center gap-0.5">
        <div className="size-1.5 rounded border border-muted-foreground/25 bg-muted-foreground/10" />
        <div className="h-2 w-px bg-muted-foreground/15" />
        <div className="size-1 rounded border border-muted-foreground/25" />
        <div className="h-2 w-px bg-muted-foreground/15" />
        <div className="size-1.5 rounded border border-muted-foreground/25 bg-muted-foreground/10" />
      </div>
      <div className="h-px w-5 bg-muted-foreground/15" />
      <div className="flex flex-col items-center gap-0.5">
        <div className="size-1 rounded border border-accent-blue/30" />
        <div className="h-2 w-px bg-muted-foreground/15" />
        <div className="size-1.5 rounded border border-muted-foreground/25 bg-muted-foreground/10" />
        <div className="h-2 w-px bg-accent-blue/15" />
        <div className="size-1 rounded border border-muted-foreground/25" />
      </div>
      <div className="h-px w-5 bg-muted-foreground/15" />
      <div className="flex flex-col items-center gap-0.5">
        <div className="size-1 rounded border border-muted-foreground/25" />
        <div className="h-2 w-px bg-muted-foreground/15" />
        <div className="size-1 rounded border border-muted-foreground/25" />
        <div className="h-2 w-px bg-muted-foreground/15" />
        <div className="size-1.5 rounded border border-muted-foreground/25 bg-muted-foreground/10" />
      </div>
    </div>
  );
}

function CodePreview() {
  return (
    <div className="flex w-full flex-col gap-0.5 font-mono text-[7px]">
      <div className="flex gap-1">
        <span className="text-muted-foreground/20">01</span>
        <span className="text-muted-foreground/20">import</span>
        <span className="text-muted-foreground/30">{'{'}</span>
        <span className="text-accent-blue/35">type</span>
        <span className="text-muted-foreground/30">{'}'}</span>
        <span className="text-muted-foreground/20">from</span>
      </div>
      <div className="flex gap-1">
        <span className="text-muted-foreground/20">02</span>
        <span className="text-muted-foreground/30 ml-3">{'<'}</span>
        <span className="text-muted-foreground/20">T</span>
        <span className="text-muted-foreground/30">{'>'}</span>
      </div>
      <div className="flex gap-1">
        <span className="text-muted-foreground/20">03</span>
        <span className="text-muted-foreground/20 ml-3">fn</span>
        <span className="text-accent-blue/35">build</span>
        <span className="text-muted-foreground/30">(</span>
        <span className="text-muted-foreground/30">)</span>
      </div>
      <div className="flex gap-1">
        <span className="text-muted-foreground/20">04</span>
        <span className="text-muted-foreground/20 ml-3">return</span>
        <span className="text-muted-foreground/30">{'=>'}</span>
        <span className="text-muted-foreground/25 font-sans">...</span>
      </div>
    </div>
  );
}

function SystemPreview() {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="flex items-center justify-between text-[7px] text-muted-foreground/25">
        <span>cpu</span>
        <span>42%</span>
      </div>
      <div className="h-1 w-full rounded-full bg-muted-foreground/10">
        <div className="h-full w-[42%] rounded-full bg-muted-foreground/20" />
      </div>
      <div className="flex items-center justify-between text-[7px] text-muted-foreground/25">
        <span>mem</span>
        <span>3.2 / 16 GB</span>
      </div>
      <div className="h-1 w-full rounded-full bg-muted-foreground/10">
        <div className="h-full w-[20%] rounded-full bg-muted-foreground/20" />
      </div>
      <div className="flex items-center justify-between text-[7px] text-muted-foreground/25">
        <span>disk</span>
        <span>128 GB</span>
      </div>
      <div className="h-1 w-full rounded-full bg-muted-foreground/10">
        <div className="h-full w-[35%] rounded-full bg-accent-blue/20" />
      </div>
    </div>
  );
}
