"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Circle } from "lucide-react";

const easeOut = [0.22, 0.03, 0.26, 1] as const;

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.04 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: easeOut },
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

const terminalLines = [
  "building ai-job-agent...",
  "agent workflow online",
  "shipping v0.2",
  "system stable",
];

// === Terminal Card ===
function TerminalCard() {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];
    terminalLines.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleLines((prev) => prev + 1), 1000 + i * 700)
      );
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      variants={fadeUp}
      className="relative hidden w-full max-w-xs shrink-0 lg:block"
    >
      <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card/85 shadow-[0_0_30px_-8px_rgba(56,189,248,0.04)] backdrop-blur-sm transition-shadow duration-1000 hover:shadow-[0_0_40px_-8px_rgba(56,189,248,0.08)]">
        {/* Scan line */}
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden opacity-[0.012]">
          <motion.div
            className="h-px w-full bg-accent-blue"
            animate={{ top: ["-2%", "102%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
            style={{ position: "absolute" }}
          />
        </div>

        <div className="flex items-center gap-1.5 border-b border-border/40 px-4 py-2.5">
          <motion.div
            className="size-2 rounded-full bg-red-500/70"
            animate={{ opacity: [1, 0.6, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="size-2 rounded-full bg-amber-500/70" />
          <div className="size-2 rounded-full bg-accent-blue/70" />
          <span className="ml-2 font-mono text-[10px] text-muted-foreground/30">terminal</span>
        </div>

        <div className="px-4 py-4 font-mono text-[12px] leading-relaxed">
          {terminalLines.map((line, i) => (
            <AnimatePresence key={i}>
              {visibleLines > i && (
                <motion.p
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={
                    i === 0
                      ? "text-accent-blue/80"
                      : i === 1
                        ? "text-accent-blue/70"
                        : "text-muted-foreground/60"
                  }
                >
                  <span className="select-none text-muted-foreground/35">$</span>{" "}
                  {line}
                  {i === 2 && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                      className="ml-0.5 inline-block h-3.5 w-1.5 bg-accent-blue/50 align-middle"
                    />
                  )}
                </motion.p>
              )}
            </AnimatePresence>
          ))}

          <motion.p
            className="mt-2 text-muted-foreground/25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4 }}
          >
            <motion.span
              animate={{ opacity: [0.25, 0.65] }}
              transition={{ duration: 1.2, repeat: Infinity, repeatType: "reverse" }}
            >
              _
            </motion.span>
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

// === Floating ambient dots ===
function FloatingDots() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute size-0.5 rounded-full bg-accent-blue/15"
          initial={{
            x: `${10 + Math.random() * 80}%`,
            y: `${30 + Math.random() * 60}%`,
            opacity: 0,
            scale: 0,
          }}
          animate={{
            y: [`${30 + Math.random() * 60}%`, `${10 + Math.random() * 30}%`],
            opacity: [0, 0.5, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 7,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// === Main Hero ===
export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] flex-col justify-center overflow-hidden bg-background pt-28 pb-24 sm:pt-32 sm:pb-28">
      {/* Primary glow — large, slow breathing */}
      <motion.div
        className="pointer-events-none absolute left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full blur-3xl"
        animate={{
          opacity: [0.03, 0.07, 0.03],
          scale: [0.95, 1.08, 0.95],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{
          top: "-200px",
          background: "radial-gradient(circle, #38bdf8 0%, transparent 70%)",
        }}
      />

      {/* Secondary glow — smaller, offset, out of phase */}
      <motion.div
        className="pointer-events-none absolute h-[400px] w-[400px] rounded-full blur-2xl"
        animate={{
          opacity: [0.02, 0.05, 0.02],
          scale: [1.05, 0.92, 1.05],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        style={{
          top: "10%",
          left: "20%",
          background: "radial-gradient(circle, #7dd3fc 0%, transparent 70%)",
        }}
      />

      {/* Tertiary glow — bottom right, very subtle */}
      <motion.div
        className="pointer-events-none absolute h-[300px] w-[300px] rounded-full blur-2xl"
        animate={{ opacity: [0.01, 0.03, 0.01] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        style={{
          bottom: "10%",
          right: "5%",
          background: "radial-gradient(circle, #38bdf8 0%, transparent 70%)",
        }}
      />

      {/* Grid pattern — subtle, masked */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.4) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 35%, black 25%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 35%, black 25%, transparent 70%)",
        }}
      />

      <FloatingDots />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-14"
        >
          {/* Status badge + Title */}
          <motion.div variants={fadeUp}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent-blue/10 bg-accent-blue/[0.03] px-3 py-1">
              <motion.span
                className="size-1.5 rounded-full bg-accent-blue/80"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="font-mono text-[10px] tracking-[0.15em] text-accent-blue/60">
                status.online
              </span>
            </div>
            <h1 className="text-7xl font-black leading-[0.9] tracking-tight text-foreground sm:text-8xl md:text-9xl">
              瑞康
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={fadeUp} className="flex flex-col gap-3">
            <p className="text-base text-muted-foreground/85 sm:text-lg">
              从银行系统开发走向 AI 与独立开发。
            </p>
            <p className="max-w-lg text-sm leading-relaxed text-muted-foreground/55">
              正在构建 AI 自动化、Agent 工作流与个人产品。
            </p>
          </motion.div>

          {/* Bottom: status + buttons | terminal */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16"
          >
            <div className="flex flex-col gap-6">
              <div className="inline-flex flex-col gap-2 rounded-xl border border-border/50 bg-card/30 px-5 py-4 backdrop-blur-sm">
                <p className="font-mono text-[10px] tracking-[0.15em] text-muted-foreground/45 uppercase">
                  Currently Building
                </p>
                <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                  {building.map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <Circle
                        className={
                          item.active
                            ? "size-1.5 fill-accent-blue text-accent-blue"
                            : "size-1.5 fill-muted-foreground/25 text-muted-foreground/25"
                        }
                      />
                      <span
                        className={
                          item.active
                            ? "font-mono text-[12px] text-foreground/75"
                            : "font-mono text-[12px] text-muted-foreground/35"
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
                      className="group inline-flex items-center gap-1.5 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-300 hover:border-accent-blue/25 hover:text-foreground active:scale-[0.98]"
                    >
                      {btn.label}
                      <btn.icon className="size-3.5 text-muted-foreground/35 transition-all duration-300 group-hover:text-accent-blue/50 group-hover:-translate-y-px group-hover:translate-x-px" />
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
