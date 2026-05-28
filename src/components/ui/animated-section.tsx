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
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          {/* Section atmosphere — deep blue, diffuse, 900px blur 150px */}
          <div
            className="absolute rounded-full"
            style={{
              left: "25%",
              top: "-30%",
              width: "900px",
              height: "900px",
              background:
                "radial-gradient(ellipse at 50% 40%, rgba(59,130,246,0.10) 0%, rgba(37,99,235,0.04) 30%, rgba(99,102,241,0.02) 55%, transparent 72%)",
              filter: "blur(150px)",
              opacity: 0.6,
              animation: "glow-atmosphere-b 16s ease-in-out infinite",
            }}
          />
        </div>
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
