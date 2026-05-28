import type { Metadata } from "next";
import { getAllIdeas } from "@/lib/sanity/api";
import { IdeaCard } from "@/components/ideas/idea-card";

export const metadata: Metadata = {
  title: "想法",
  description: "关于 AI、系统、自动化与持续构建的一些记录。",
};

export default async function IdeasPage() {
  let ideas: Awaited<ReturnType<typeof getAllIdeas>> = [];
  try {
    ideas = await getAllIdeas();
  } catch {}

  const displayIdeas = ideas.map((i) => ({
    slug: i.slug,
    frontmatter: {
      title: i.title,
      date: i.date,
      excerpt: i.excerpt,
      tags: i.tags,
      coverImage: i.coverImage,
      quote: i.quote,
      links: i.links,
      featured: i.featured,
    },
  }));

  const hasIdeas = displayIdeas.length > 0;

  return (
    <div className="mx-auto max-w-5xl px-6 py-28 sm:py-36">
      <section className="mb-20">
        <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/50 uppercase">Ideas</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">想法</h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground/70">关于 AI、系统、自动化与持续构建的一些记录。碎片思考、灵感与工作流片段。</p>
      </section>
      {hasIdeas ? (
        <div className="relative">
          <div className="absolute left-[19px] top-3 bottom-3 w-px lg:left-1/2 lg:-translate-x-px" style={{ background: "linear-gradient(to bottom, rgba(56,189,248,0.15), rgba(56,189,248,0.04), rgba(56,189,248,0.15))" }} />
          <div className="space-y-16">
            {displayIdeas.map((idea) => (
              <div key={idea.slug} className="relative flex items-start gap-8 lg:gap-0">
                <div className="relative z-10 flex shrink-0 items-center gap-4 lg:absolute lg:left-1/2 lg:-translate-x-[calc(100%+32px)] lg:flex-row-reverse lg:text-right">
                  <div className="relative flex size-[10px] shrink-0 items-center justify-center lg:order-last lg:translate-x-[5px]">
                    <div className="absolute size-[10px] rounded-full bg-accent-blue/60" />
                    <div className="absolute size-[20px] rounded-full bg-accent-blue/10 blur-sm" />
                  </div>
                  <time className="font-mono text-[11px] text-muted-foreground/40 lg:w-28 shrink-0">{idea.frontmatter.date}</time>
                </div>
                <div className="min-w-0 flex-1 lg:ml-[calc(50%+32px)]">
                  <IdeaCard slug={idea.slug} frontmatter={idea.frontmatter} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-border/40 bg-card/50 px-6 py-16 text-center">
          <p className="text-sm text-muted-foreground/50">还没有想法记录。</p>
          <p className="mt-2 text-xs text-muted-foreground/35">在 Sanity Studio 中创建第一条想法吧。</p>
        </div>
      )}
    </div>
  );
}
