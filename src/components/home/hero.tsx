"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Circle } from "lucide-react";

const easeOut = [0.22, 0.03, 0.26, 1] as const;

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.06 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

const building = [
  { label: "AI Automation", active: true },
  { label: "Agent Workflow", active: true },
  { label: "Personal Products", active: true },
  { label: "Banking Architecture", active: false },
];

const buttons = [
  {
    label: "Blog",
    href: "/blog",
    icon: ArrowRight,
    primary: true,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: ArrowRight,
    primary: false,
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: ArrowUpRight,
    primary: false,
    external: true,
  },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] flex-col justify-center overflow-hidden bg-background pt-28 pb-24 sm:pt-32 sm:pb-28">
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-[0.03] dark:opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, #38bdf8 0%, transparent 70%)",
        }}
      />

      <div className="mx-auto w-full max-w-5xl px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-14"
        >
          <motion.h1
            variants={fadeUp}
            className="text-7xl font-black leading-[0.9] tracking-tight text-foreground sm:text-8xl md:text-9xl"
          >
            瑞康
          </motion.h1>

          <motion.div variants={fadeUp} className="flex flex-col gap-3">
            <p className="text-base text-muted-foreground/90 sm:text-lg">
              从银行系统开发走向 AI 与独立开发。
            </p>
            <p className="max-w-lg text-sm leading-relaxed text-muted-foreground/60">
              正在构建 AI 自动化、Agent 工作流与个人产品。
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16"
          >
            {/* Left — status + buttons */}
            <div className="flex flex-col gap-6">
              <div className="inline-flex flex-col gap-2 rounded-xl border border-border bg-card/30 px-5 py-4">
                <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground/50 uppercase">
                  Currently Building
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                  {building.map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <Circle
                        className={
                          item.active
                            ? "size-1.5 fill-accent-blue text-accent-blue"
                            : "size-1.5 fill-muted-foreground/30 text-muted-foreground/30"
                        }
                      />
                      <span
                        className={
                          item.active
                            ? "font-mono text-[12px] text-foreground/80"
                            : "font-mono text-[12px] text-muted-foreground/40"
                        }
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {buttons.map((btn) =>
                  btn.primary ? (
                    <Link
                      key={btn.label}
                      href={btn.href}
                      className="group inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-all duration-200 hover:bg-foreground/85 active:scale-[0.98]"
                    >
                      {btn.label}
                      <btn.icon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </Link>
                  ) : (
                    <Link
                      key={btn.label}
                      href={btn.href}
                      target={btn.external ? "_blank" : undefined}
                      rel={btn.external ? "noopener noreferrer" : undefined}
                      className="group inline-flex items-center gap-1.5 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:border-accent-blue/30 hover:text-foreground active:scale-[0.98]"
                    >
                      {btn.label}
                      <btn.icon className="size-3.5 text-muted-foreground/40 transition-all duration-200 group-hover:text-accent-blue/60 group-hover:-translate-y-px group-hover:translate-x-px" />
                    </Link>
                  )
                )}
              </div>
            </div>

            {/* Right — Terminal card */}
            <motion.div
              variants={fadeUp}
              className="hidden w-full max-w-xs shrink-0 lg:block"
            >
              <div className="overflow-hidden rounded-xl border border-border bg-card/80">
                {/* Terminal header */}
                <div className="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
                  <div className="size-2 rounded-full bg-red-500/60" />
                  <div className="size-2 rounded-full bg-amber-500/60" />
                  <div className="size-2 rounded-full bg-accent-blue/60" />
                </div>
                {/* Terminal body */}
                <div className="px-4 py-4 font-mono text-[12px] leading-relaxed text-muted-foreground/70">
                  <p className="text-accent-blue/80">
                    <span className="text-muted-foreground/40">$</span> building
                    ai-job-agent...
                  </p>
                  <p className="text-accent-blue/70">
                    <span className="text-muted-foreground/40">$</span> agent
                    workflow online
                  </p>
                  <p className="text-muted-foreground/60">
                    <span className="text-muted-foreground/40">$</span> shipping
                    v0.2{" "}
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                      className="inline-block h-3.5 w-1.5 bg-accent-blue/60 align-middle"
                    />
                  </p>
                  <p className="text-muted-foreground/50">
                    <span className="text-muted-foreground/40">$</span> system
                    stable
                  </p>
                  <p className="mt-2 text-muted-foreground/30">
                    <motion.span
                      animate={{ opacity: [0.3, 0.6] }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    >
                      _
                    </motion.span>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
