"use client";

import Link from "next/link";
import { Cpu, Server, Code2, Zap } from "lucide-react";
import { AnimatedSection, AnimatedItem } from "@/components/ui/animated-section";

const techStack = [
  { label: "TypeScript", icon: Code2 },
  { label: "Python", icon: Zap },
  { label: "Go", icon: Server },
  { label: "AI / LLM", icon: Cpu },
];

const focus = [
  { label: "AI 自动化工作流", detail: "Agent + Tool Use" },
  { label: "银行系统架构", detail: "AML / 风控 / 高并发" },
  { label: "独立产品开发", detail: "从 0 到 1 全栈交付" },
];

export function AboutPreview() {
  return (
    <AnimatedSection bg="bg-surface-2">
      <AnimatedItem className="mb-16">
        <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/50 uppercase">
          About
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
          关于
        </h2>
      </AnimatedItem>

      <AnimatedItem>
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          <div className="flex-1 space-y-6">
            <p className="text-base leading-relaxed text-muted-foreground/80">
              我是一名全栈开发者，在银行系统的严谨与独立产品的自由之间找到了自己的节奏。
            </p>
            <p className="text-base leading-relaxed text-muted-foreground/70">
              目前专注于 AI 自动化与 Agent 工作流，同时撰写关于 TypeScript、系统设计
              和独立开发日常的文章。相信简洁、性能和匠心。
            </p>
            <Link
              href="/about"
              className="inline-block pt-1 text-sm font-medium text-muted-foreground/60 transition-colors duration-200 hover:text-accent-blue"
            >
              了解更多 →
            </Link>
          </div>

          <div className="w-full lg:w-80 shrink-0">
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              {/* Header bar */}
              <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
                <div className="size-1.5 rounded-full bg-muted-foreground/30" />
                <div className="size-1.5 rounded-full bg-muted-foreground/30" />
                <div className="size-1.5 rounded-full bg-muted-foreground/30" />
                <span className="ml-2 font-mono text-[10px] text-muted-foreground/35">
                  system.info
                </span>
              </div>

              <div className="p-5">
                {/* Tech Stack */}
                <p className="mb-4 font-mono text-[10px] tracking-[0.15em] text-muted-foreground/40 uppercase">
                  Stack
                </p>
                <div className="mb-6 grid grid-cols-2 gap-2">
                  {techStack.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.label}
                        className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/30 px-3 py-2 transition-colors duration-200 hover:border-accent-blue/20 hover:bg-accent-blue-subtle/20"
                      >
                        <Icon className="size-3.5 text-muted-foreground/50 transition-colors duration-200 group-hover:text-accent-blue/60" />
                        <span className="font-mono text-[11px] text-muted-foreground/70">
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Current Focus */}
                <p className="mb-4 font-mono text-[10px] tracking-[0.15em] text-muted-foreground/40 uppercase">
                  Focus
                </p>
                <div className="space-y-2.5">
                  {focus.map((item, i) => (
                    <div key={item.label} className="flex items-start gap-2.5">
                      <div
                        className={`mt-0.5 flex size-1.5 shrink-0 rounded-full ${
                          i === 0
                            ? "bg-accent-blue/80"
                            : "bg-muted-foreground/40"
                        }`}
                      />
                      <div className="min-w-0">
                        <p className="text-[12px] font-medium text-foreground/80 leading-tight">
                          {item.label}
                        </p>
                        <p className="text-[11px] text-muted-foreground/50 leading-tight mt-0.5">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedItem>
    </AnimatedSection>
  );
}
