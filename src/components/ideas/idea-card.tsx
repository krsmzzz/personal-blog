"use client";

import Image from "next/image";
import type { IdeaFrontmatter } from "@/lib/content-bridge";

interface IdeaCardProps {
  slug: string;
  frontmatter: IdeaFrontmatter;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("zh-CN", { year: "numeric", month: "2-digit", day: "2-digit" });
}

export function IdeaCard({ slug, frontmatter }: IdeaCardProps) {
  const { title, date, excerpt, tags, coverImage, quote } = frontmatter;

  return (
    <div className="group relative transition-all duration-500">
      <div className="overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-500 hover:-translate-y-1 hover:border-accent-blue/20 hover:shadow-[0_0_30px_-8px_rgba(56,189,248,0.06)]">
        {coverImage ? (
          <div className="relative aspect-[16/9] overflow-hidden border-b border-border/40">
            <Image src={coverImage} alt={title} fill className="object-cover transition-all duration-700 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 600px" />
            <div className="absolute inset-0 bg-gradient-to-t from-card/40 to-transparent" />
          </div>
        ) : quote ? (
          <div className="border-b border-border/40 bg-accent-blue-subtle/5 px-5 py-6">
            <p className="text-sm italic leading-relaxed text-muted-foreground/70">“{quote}”</p>
          </div>
        ) : null}

        <div className="p-5">
          {tags && tags.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span key={tag} className="rounded-md border border-border/50 px-2 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground/50">{tag}</span>
              ))}
            </div>
          )}
          <h3 className="text-base font-semibold tracking-tight text-foreground transition-colors duration-200 group-hover:text-accent-blue/90">{title}</h3>
          {excerpt && <p className="mt-2 text-sm leading-relaxed text-muted-foreground/70 line-clamp-2">{excerpt}</p>}
          <div className="mt-4">
            <time className="font-mono text-[11px] text-muted-foreground/40">{formatDate(date)}</time>
          </div>
        </div>
      </div>
    </div>
  );
}
