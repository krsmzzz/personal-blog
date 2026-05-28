import type { Metadata } from "next";
import { ArrowUpRight, Circle, Cpu, Server, Code2, Zap, Database, Container } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Building AI, systems, and personal products.",
};

const techStack = [
  { label: "Java", icon: Server },
  { label: "Go", icon: Zap },
  { label: "TypeScript", icon: Code2 },
  { label: "Python", icon: Cpu },
  { label: "PostgreSQL", icon: Database },
  { label: "Next.js", icon: Code2 },
  { label: "Docker", icon: Container },
  { label: "LLM / GPT-4", icon: Cpu },
];

const focus = [
  { label: "AI 自动化", detail: "Agent 工作流 + Tool Use", active: true },
  { label: "Banking Architecture", detail: "AML / 风控 / 高并发系统", active: true },
  { label: "Independent Products", detail: "从 0 到 1 全栈交付", active: true },
];

const timeline = [
  { year: "2021", label: "银行系统", detail: "开始构建银行核心系统与反洗钱平台。" },
  { year: "2023", label: "AI 自动化", detail: "将 AI 引入金融风控与自动化流程。" },
  { year: "2025", label: "独立开发", detail: "独立开发 AI Agent 与个人产品。" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-28 sm:py-36">
      <section className="mb-24">
        <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/50 uppercase">
          About
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Building AI, systems,
          <br />
          and personal products.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground/70">
          从银行系统开发走向 AI 与独立开发——构建自动化、Agent 与系统架构。
        </p>
      </section>

      <div className="grid gap-20 lg:grid-cols-3">
        <div className="space-y-20 lg:col-span-2">
          <section>
            <h2 className="mb-6 font-mono text-[10px] tracking-[0.15em] text-muted-foreground/40 uppercase">
              About Me
            </h2>
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground/80">
              <p>
                我叫瑞康，一名全栈开发者。从 2021 年开始构建银行核心系统——反洗钱交易监控、
                实时风控引擎和高并发支付架构。
              </p>
              <p>
                2023 年起将 AI 引入金融场景：基于 LLM 的智能风控决策、Agent 驱动的自动化
                流程，以及面向开发者的 AI 工具链。
              </p>
              <p>
                现在，我作为独立开发者，专注于 AI Agent 工作流、系统设计与个人产品的打造。
                我相信简洁、性能与工程美学。
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-6 font-mono text-[10px] tracking-[0.15em] text-muted-foreground/40 uppercase">
              Current Focus
            </h2>
            <div className="overflow-hidden rounded-xl border border-border bg-card">
              <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
                <div className="size-1.5 rounded-full bg-muted-foreground/30" />
                <div className="size-1.5 rounded-full bg-muted-foreground/30" />
                <div className="size-1.5 rounded-full bg-muted-foreground/30" />
                <span className="ml-2 font-mono text-[10px] text-muted-foreground/35">专注状态</span>
              </div>
              <div className="p-5 space-y-3">
                {focus.map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <Circle className={`mt-0.5 size-2 shrink-0 ${item.active ? "fill-accent-blue text-accent-blue" : "fill-muted-foreground/30 text-muted-foreground/30"}`} />
                    <div>
                      <p className="text-sm font-medium text-foreground/85">{item.label}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground/60">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-8 font-mono text-[10px] tracking-[0.15em] text-muted-foreground/40 uppercase">
              Journey
            </h2>
            <div className="relative border-l border-border/60 pl-8 space-y-12">
              {timeline.map((item, i) => (
                <div key={item.year} className="relative">
                  <div className={`absolute -left-[33px] top-1 size-2.5 rounded-full border-2 border-background ${i === timeline.length - 1 ? "bg-accent-blue" : "bg-muted-foreground/30"}`} />
                  <span className="font-mono text-xs text-muted-foreground/50">{item.year}</span>
                  <h3 className="mt-1 text-sm font-semibold text-foreground/85">{item.label}</h3>
                  <p className="mt-1 text-sm text-muted-foreground/65 leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-6 font-mono text-[10px] tracking-[0.15em] text-muted-foreground/40 uppercase">
              Philosophy
            </h2>
            <div className="space-y-5 text-sm leading-relaxed text-muted-foreground/70">
              <p>AI 不是替代人，而是放大人的能力。最好的系统是那些让复杂变简单、让重复自动化的系统。</p>
              <p>在工程中，少即是多。每减少一行不必要的代码，就减少一个未来的维护成本。优秀的架构来自约束，而非自由。</p>
              <p>独立开发不是孤独——它是选择性地与世界连接。构建自己相信的产品，按照自己的节奏。</p>
            </div>
          </section>
        </div>

        <aside className="lg:col-span-1">
          <div className="sticky top-28 space-y-8">
            <div className="rounded-xl border border-border bg-card/50 p-5">
              <h2 className="mb-4 font-mono text-[10px] tracking-[0.15em] text-muted-foreground/40 uppercase">Tech Stack</h2>
              <div className="grid grid-cols-2 gap-2">
                {techStack.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-2 rounded-lg border border-border/60 bg-muted/20 px-3 py-2 transition-all duration-200 hover:border-accent-blue/20 hover:bg-accent-blue-subtle/10">
                      <Icon className="size-3.5 text-muted-foreground/50" />
                      <span className="font-mono text-[11px] text-muted-foreground/70">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-card/50 p-5">
              <h2 className="mb-4 font-mono text-[10px] tracking-[0.15em] text-muted-foreground/40 uppercase">联系</h2>
              <div className="space-y-2">
                {[
                  { label: "GitHub", href: "https://github.com" },
                  { label: "X (Twitter)", href: "https://x.com" },
                  { label: "Email", href: "mailto:hello@ruikang.dev" },
                ].map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground/70 transition-all duration-200 hover:bg-muted/30 hover:text-foreground">
                    {link.label}
                    <ArrowUpRight className="size-3.5 text-muted-foreground/40 transition-all duration-200 group-hover:text-accent-blue/60 group-hover:-translate-y-px group-hover:translate-x-px" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
