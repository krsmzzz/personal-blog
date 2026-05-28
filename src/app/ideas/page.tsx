import type { Metadata } from "next";
import { getAllIdeas } from "@/lib/sanity/api";
import { IdeaCard } from "@/components/ideas/idea-card";
import { YearNav } from "@/components/ideas/year-nav";

export const metadata: Metadata = {
  title: "想法",
  description: "碎片思考 · 灵感 · 工作流片段",
};

export default async function IdeasPage() {
  let ideas: Awaited<ReturnType<typeof getAllIdeas>> = [];
  try { ideas = await getAllIdeas(); } catch {}

  const allIdeas = ideas.map((i) => ({
    slug: i.slug,
    frontmatter: {
      title: i.title,
      date: i.date,
      excerpt: i.excerpt,
      galleryImages: i.galleryImages?.map((g) => ({ url: g.asset?.url, alt: g.alt })),
    },
  }));

  const byYear = new Map<number, typeof allIdeas>();
  for (const idea of allIdeas) {
    const year = new Date(idea.frontmatter.date).getFullYear();
    if (!byYear.has(year)) byYear.set(year, []);
    byYear.get(year)!.push(idea);
  }
  const years = Array.from(byYear.keys()).sort((a, b) => b - a);

  return (
    <div className="mx-auto max-w-5xl px-6 py-28 sm:py-36">

      <div className="flex gap-12">
        <div className="min-w-0 flex-1">
          {years.map((year) => (
            <section key={year} id={`year-${year}`} className="mb-14">
              <div className="mb-6 flex items-center gap-3">
                <h2 className="font-mono text-2xl font-light tracking-tight text-foreground/45">{year}</h2>
                <div className="h-px flex-1 bg-border/20" />
              </div>
              <div className="max-w-xl">
                {byYear.get(year)!.map((idea) => (
                  <div key={idea.slug} className="mb-4 break-inside-avoid">
                    <IdeaCard slug={idea.slug} frontmatter={idea.frontmatter} />
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
        <aside className="hidden w-16 shrink-0 lg:block">
          <YearNav years={years} />
        </aside>
      </div>
    </div>
  );
}
