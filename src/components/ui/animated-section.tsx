"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  bg?: string;
  as?: "section" | "div";
  glow?: boolean;
}

export function AnimatedSection({
  children,
  className,
  bg,
  as: Component = "section",
  glow = false,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "-60px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Component className={cn("relative overflow-hidden py-28 sm:py-36", bg, className)}>
      {glow && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(56,189,248,0.04) 0%, transparent 70%)",
            filter: "blur(80px)",
            opacity: 0.35,
          }}
        />
      )}
      <div ref={ref} className="mx-auto max-w-5xl px-6 relative z-10">
        <div className={revealed ? "stagger-reveal revealed" : "stagger-reveal"}>
          {children}
        </div>
      </div>
    </Component>
  );
}

export function AnimatedItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
