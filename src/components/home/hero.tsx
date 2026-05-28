"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  { label: "Blog", href: "/blog", icon: ArrowRight, primary: true },
  { label: "Projects", href: "/projects", icon: ArrowRight, primary: false },
  { label: "GitHub", href: "https://github.com", icon: ArrowUpRight, primary: false, external: true },
];

// Terminal lines for typing effect
const terminalLines = [
  "building ai-job-agent...",
  "agent workflow online",
  "shipping v0.2",
  "system stable",
];

function TerminalCard() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    terminalLines.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleLines((prev) => prev + 1), 800 + i * 600)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      variants={fadeUp}
      className="relative hidden w-full max-w-xs shrink-0 lg:block"
    >
      {/* Terminal glow */}
      <div className="pointer-events-none absolute -inset-2 rounded-2xl opacity-0 transition-opacity duration-1000"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(56,189,248,0.06) 0%, transparent 70%)",
        }}
      />
      <div className="relative overflow-hidden rounded-xl border border-border/60 bg-card/90 backdrop-blur-sm">
        {/* Scan line */}
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden opacity-[0.015]">
          <motion.div
            className="h-px w-full bg-accent-blue"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            style={{ position: "absolute" }}
          />
        </div>

        {/* Terminal header */}
        <div className="flex items-center gap-1.5 border-b border-border/50 px-4 py-2.5">
          <motion.div
            className="size-2 rounded-full bg-red-500/70"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <div className="size-2 rounded-full bg-amber-500/70" />
          <div className="size-2 rounded-full bg-accent-blue/70" />
          <span className="ml-2 font-mono text-[10px] text-muted-foreground/35">terminal</span>
        </div>

        {/* Terminal body */}
        <div className="relative px-4 py-4 font-mono text-[12px] leading-relaxed">
          {terminalLines.map((line, i) => (
            <AnimatePresence key={i}>
              {visibleLines > i && (
                <motion.p
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={
                    i === 0
                      ? "text-accent-blue/80"
                      : i === 1
                        ? "text-accent-blue/70"
                        : "text-muted-foreground/60"
                  }
                >
                  <span className="text-muted-foreground/40">$</span>{" "}
                  {line}
                  {i === 2 && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                      className="inline-block h-3.5 w-1.5 bg-accent-blue/60 align-middle"
                    />
                  )}
                </motion.p>
              )}
            </AnimatePresence>
          ))}

          {/* CLI cursor at bottom */}
          <motion.p
            className="mt-2 text-muted-foreground/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5 }}
          >
            <motion.span
              animate={{ opacity: [0.3, 0.7] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
            >
              _
            </motion.span>
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

// Floating dots for tech atmosphere
function FloatingDots() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute size-0.5 rounded-full bg-accent-blue/20"
          initial={{
            x: `${Math.random() * 100}%`,
            y: `${Math.random() * 100}%`,
            opacity: 0,
          }}
          animate={{
            y: [`${Math.random() * 100}%`, `${Math.random() * 30}%`],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] flex-col justify-center overflow-hidden bg-background pt-28 pb-24 sm:pt-32 sm:pb-28">
      {/* Animated background glow */}
      <motion.div
        className="pointer-events-none absolute -top-32 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full"
        animate={{ opacity: [0.02, 0.05, 0.02] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "radial-gradient(circle, #38bdf8 0%, transparent 70%)",
        }}
      />

      {/* Second glow, offset for depth */}
      <motion.div
        className="pointer-events-none absolute -top-16 left-[30%] h-[400px] w-[400px] rounded-full"
        animate={{ opacity: [0.01, 0.03, 0.01] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          background: "radial-gradient(circle, #7dd3fc 0%, transparent 70%)",
        }}
      />

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at 50% 30%, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black 30%, transparent 70%)",
        }}
      />

      {/* Floating dots */}
      <FloatingDots />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-14"
        >
          <motion.div variants={fadeUp}>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent-blue/15 bg-accent-blue/5 px-3 py-1">
              <motion.span
                className="size-1.5 rounded-full bg-accent-blue"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-mono text-[10px] tracking-[0.15em] text-accent-blue/70">
                status.online
              </span>
            </div>
            <h1 className="text-7xl font-black leading-[0.9] tracking-tight text-foreground sm:text-8xl md:text-9xl">
              瑞康
            </h1>
          </motion.div>

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
            <div className="flex flex-col gap-6">
              <div className="inline-flex flex-col gap-2 rounded-xl border border-border/60 bg-card/40 px-5 py-4 backdrop-blur-sm">
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

            <TerminalCard />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
