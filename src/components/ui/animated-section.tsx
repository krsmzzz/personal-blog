"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  bg?: string;
  as?: "section" | "div";
}

export function AnimatedSection({
  children,
  className,
  bg,
  as: Component = "section",
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
    <Component className={cn("py-28 sm:py-36", bg, className)}>
      <div className="mx-auto max-w-5xl px-6">
        <div
          ref={ref}
          className={cn(
            "transition-all duration-700",
            revealed
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          )}
          style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
        >
          <div className="stagger-children">
            {children}
          </div>
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
  return (
    <div
      className={cn(
        "reveal-on-scroll",
        className
      )}
    >
      {children}
    </div>
  );
}
