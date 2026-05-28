"use client";

import Link from "next/link";
import { AnimatedSection, AnimatedItem } from "@/components/ui/animated-section";

const articles = [
  {
    title: "少写代码的静默艺术",
    date: "2025-05-15",
    href: "/blog/writing-less-code",
  },
  {
    title: "从零构建类型安全的 API 客户端",
    date: "2025-04-02",
    href: "/blog/type-safe-api-client",
  },
  {
    title: "为什么我从 VSCode 换到了 Neovim",
    date: "2025-02-18",
    href: "/blog/vscode-to-neovim",
  },
  {
    title: "独立开发者的设计系统原则",
    date: "2025-01-07",
    href: "/blog/solo-design-system",
  },
];

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function LatestArticles() {
  return (
    <AnimatedSection>
      <AnimatedItem className="mb-12">
        <p className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
          文章
        </p>
      </AnimatedItem>

      <div className="grid gap-0.5">
        {articles.map((article) => (
          <AnimatedItem key={article.href}>
            <Link
              href={article.href}
              className="group flex flex-col gap-1.5 rounded-xl px-4 py-4 -mx-4 transition-colors duration-200 hover:bg-muted/40 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
            >
              <span className="text-sm font-medium text-foreground transition-colors duration-200 group-hover:text-foreground/80">
                {article.title}
              </span>
              <span className="shrink-0 font-mono text-xs text-muted-foreground/60">
                {formatDate(article.date)}
              </span>
            </Link>
          </AnimatedItem>
        ))}
      </div>

      <AnimatedItem className="mt-8">
        <Link
          href="/blog"
          className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          全部文章 →
        </Link>
      </AnimatedItem>
    </AnimatedSection>
  );
}
