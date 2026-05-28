"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Bot, Shield, Terminal, Mic } from "lucide-react";
import { AnimatedSection, AnimatedItem } from "@/components/ui/animated-section";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const projects = [
  {
    title: "AI 自动求职助手",
    description:
      "聚合多平台职位信息，AI 自动匹配简历与岗位，一键批量投递，求职效率提升 10 倍。",
    tags: ["Next.js", "Python", "LLM", "Chrome Extension"],
    icon: Bot,
    color: "sky",
    github: "https://github.com",
    demo: "https://demo.example.com",
  },
  {
    title: "银行反洗钱系统",
    description:
      "基于规则引擎与机器学习的 AML 交易监控平台，实时风控、可疑交易识别与监管报送。",
    tags: ["Java", "Spring Boot", "Flink", "PostgreSQL"],
    icon: Shield,
    color: "slate",
    github: "https://github.com",
    demo: null,
  },
  {
    title: "OpenClaw 网关",
    description:
      "轻量级 API 网关，支持多协议路由、限流熔断、灰度发布，专为微服务架构设计。",
    tags: ["Go", "gRPC", "Redis", "Kubernetes"],
    icon: Terminal,
    color: "cyan",
    github: "https://github.com",
    demo: "https://demo.example.com",
  },
  {
    title: "AI 面试助手",
    description:
      "模拟真实面试场景，AI 根据简历生成个性化问题，实时语音交互并提供评分反馈。",
    tags: ["TypeScript", "Whisper", "GPT-4", "WebRTC"],
    icon: Mic,
    color: "indigo",
    github: null,
    demo: "https://demo.example.com",
  },
];

const colorMap: Record<string, { border: string; bg: string; icon: string; glow: string }> = {
  sky: {
    border: "border-sky-500/15 group-hover:border-sky-500/25",
    bg: "bg-sky-500/5 group-hover:bg-sky-500/8",
    icon: "text-sky-400/60 group-hover:text-sky-400",
    glow: "group-hover:shadow-[0_0_20px_-4px_rgba(56,189,248,0.06)]",
  },
  slate: {
    border: "border-slate-500/15 group-hover:border-slate-500/25",
    bg: "bg-slate-500/5 group-hover:bg-slate-500/8",
    icon: "text-slate-400/60 group-hover:text-slate-400",
    glow: "group-hover:shadow-[0_0_20px_-4px_rgba(148,163,184,0.06)]",
  },
  cyan: {
    border: "border-cyan-500/15 group-hover:border-cyan-500/25",
    bg: "bg-cyan-500/5 group-hover:bg-cyan-500/8",
    icon: "text-cyan-400/60 group-hover:text-cyan-400",
    glow: "group-hover:shadow-[0_0_20px_-4px_rgba(34,211,238,0.06)]",
  },
  indigo: {
    border: "border-indigo-500/15 group-hover:border-indigo-500/25",
    bg: "bg-indigo-500/5 group-hover:bg-indigo-500/8",
    icon: "text-indigo-400/60 group-hover:text-indigo-400",
    glow: "group-hover:shadow-[0_0_20px_-4px_rgba(129,140,248,0.06)]",
  },
};

export function FeaturedProjects() {
  return (
    <AnimatedSection bg="bg-surface-1">
      <AnimatedItem className="mb-16">
        <div className="flex items-baseline justify-between">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground/50 uppercase">
              精选作品
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
              作品
            </h2>
          </div>
        </div>
      </AnimatedItem>

      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project) => {
          const Icon = project.icon;
          const c = colorMap[project.color];
          return (
            <AnimatedItem key={project.title}>
              <motion.div
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`group relative flex h-full flex-col rounded-xl border border-border bg-card p-7 transition-all duration-300 hover:border-border/40 ${c.glow}`}
              >
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className={`flex size-9 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${c.border} ${c.bg}`}
                  >
                    <Icon
                      className={`size-4 transition-all duration-300 ${c.icon}`}
                    />
                  </div>
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {project.title}
                  </h3>
                </div>

                <p className="mb-6 flex-1 text-sm leading-relaxed text-muted-foreground/80">
                  {project.description}
                </p>

                <div className="mb-6 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-border px-2 py-0.5 font-mono text-[10px] tracking-wide text-muted-foreground/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-5">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors duration-200 hover:text-foreground"
                    >
                      <GithubIcon className="size-3.5" />
                      GitHub
                      <ArrowUpRight className="size-3 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-px group-hover:translate-x-px" />
                    </a>
                  )}
                  {project.demo && (
                    <Link
                      href={project.demo}
                      className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors duration-200 hover:text-accent-blue"
                    >
                      Live Demo
                      <ArrowUpRight className="size-3 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-translate-y-px group-hover:translate-x-px" />
                    </Link>
                  )}
                </div>
              </motion.div>
            </AnimatedItem>
          );
        })}
      </div>
    </AnimatedSection>
  );
}
