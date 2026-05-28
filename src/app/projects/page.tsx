import Link from "next/link";
import type { Metadata } from "next";
import { fetchAllProjects } from "@/lib/content-bridge";
import { Bot, Shield, Terminal, Mic, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "项目",
  description: "精选项目作品。",
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Bot,
  Shield,
  Terminal,
  Mic,
};

const projectIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "ai-job-agent": Bot,
  "aml-system": Shield,
};

export default async function ProjectsPage() {
  const projects = await fetchAllProjects();

  return (
    <div className="mx-auto max-w-5xl px-6 py-28 sm:py-36">
      <div className="mb-16">
        <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/50 uppercase">
          Projects
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
          项目
        </h1>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((p) => {
          const Icon = projectIcons[p.slug] || Terminal;
          return (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group relative flex flex-col rounded-xl border border-border/60 bg-card p-7 transition-all duration-500 hover:border-accent-blue/20 hover:shadow-[0_0_30px_-6px_rgba(56,189,248,0.06)] hover:-translate-y-0.5"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-sky-500/15 bg-sky-500/5 transition-all duration-300 group-hover:border-sky-500/25 group-hover:bg-sky-500/8">
                  <Icon className="size-4 text-sky-400/60 transition-all duration-300 group-hover:text-sky-400" />
                </div>
                <h2 className="text-base font-semibold tracking-tight text-foreground">
                  {p.frontmatter.title}
                </h2>
              </div>
              <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground/80">
                {p.frontmatter.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {p.frontmatter.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
