"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Circle } from "lucide-react";

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
    <div className="relative hidden w-full max-w-xs shrink-0 animate-fade-in lg:block" style={{ animationDelay: "0.6s", animationFillMode: "backwards" }}>
      <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card/85 shadow-[0_0_30px_-8px_rgba(56,189,248,0.04)] backdrop-blur-sm transition-shadow duration-1000 hover:shadow-[0_0_40px_-8px_rgba(56,189,248,0.08)]">
        {/* Scan line */}
        <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden opacity-[0.012]">
          <div className="animate-scan-line absolute h-px w-full bg-accent-blue" />
        </div>

        <div className="flex items-center gap-1.5 border-b border-border/40 px-4 py-2.5">
          <span className="size-2 rounded-full bg-red-500/70 animate-pulse" style={{ animationDuration: "2.5s" }} />
          <span className="size-2 rounded-full bg-amber-500/70" />
          <span className="size-2 rounded-full bg-accent-blue/70" />
          <span className="ml-2 font-mono text-[10px] text-muted-foreground/30">terminal</span>
        </div>

        <div className="px-4 py-4 font-mono text-[12px] leading-relaxed">
          {terminalLines.map((line, i) => (
            <p
              key={i}
              className={`transition-all duration-500 ${
                visibleLines > i
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-1.5"
              } ${
                i === 0
                  ? "text-accent-blue/80"
                  : i === 1
                    ? "text-accent-blue/70"
                    : "text-muted-foreground/60"
              }`}
            >
              <span className="select-none text-muted-foreground/35">$</span>{" "}
              {line}
              {i === 2 && (
                <span className="ml-0.5 inline-block h-3.5 w-1.5 bg-accent-blue/50 align-middle animate-blink" />
              )}
            </p>
          ))}
          <p className="mt-2 text-muted-foreground/25 transition-opacity duration-1000" style={{ transitionDelay: "4s", opacity: visibleLines >= terminalLines.length ? 1 : 0 }}>
            <span className="animate-blink inline-block" style={{ animationDuration: "1.2s" }}>_</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// === Fade-in-on-mount wrapper ===
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] flex-col justify-center overflow-hidden bg-background pt-28 pb-24 sm:pt-32 sm:pb-28">
      {/* === CSS Glow Layers === */}
      <div className="pointer-events-none absolute left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full blur-3xl animate-glow-primary"
        style={{ top: "-200px", background: "radial-gradient(circle, #38bdf8 0%, transparent 70%)" }}
      />
      <div className="pointer-events-none absolute h-[400px] w-[400px] rounded-full blur-2xl animate-glow-secondary"
        style={{ top: "10%", left: "20%", background: "radial-gradient(circle, #7dd3fc 0%, transparent 70%)" }}
      />
      <div className="pointer-events-none absolute h-[300px] w-[300px] rounded-full blur-2xl animate-glow-tertiary"
        style={{ bottom: "10%", right: "5%", background: "radial-gradient(circle, #38bdf8 0%, transparent 70%)" }}
      />

      {/* Grid */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage: "linear-gradient(rgba(56,189,248,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.4) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at 50% 35%, black 25%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 35%, black 25%, transparent 70%)",
        }}
      />

      {/* Floating dots — pure CSS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="absolute size-0.5 rounded-full bg-accent-blue/20 animate-float-up"
            style={{
              left: `${10 + Math.random() * 80}%`,
              bottom: `${10 + Math.random() * 40}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl px-6">
        <div className="flex flex-col gap-14">
          {/* Title */}
          <FadeIn delay={0}>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-accent-blue/10 bg-accent-blue/[0.03] px-3 py-1">
              <span className="size-1.5 rounded-full bg-accent-blue/80 animate-pulse" style={{ animationDuration: "2.5s" }} />
              <span className="font-mono text-[10px] tracking-[0.15em] text-accent-blue/60">
                status.online
              </span>
            </div>
            <h1 className="text-7xl font-black leading-[0.9] tracking-tight text-foreground sm:text-8xl md:text-9xl">
              瑞康
            </h1>
          </FadeIn>

          {/* Subtitle */}
          <FadeIn delay={120}>
            <div className="flex flex-col gap-3">
              <p className="text-base text-muted-foreground/85 sm:text-lg">
                从银行系统开发走向 AI 与独立开发。
              </p>
              <p className="max-w-lg text-sm leading-relaxed text-muted-foreground/55">
                正在构建 AI 自动化、Agent 工作流与个人产品。
              </p>
            </div>
          </FadeIn>

          {/* Bottom section */}
          <FadeIn delay={240}>
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-16">
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
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
