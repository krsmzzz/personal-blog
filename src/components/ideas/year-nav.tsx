"use client";

import { useEffect, useState, useCallback } from "react";

interface YearNavProps {
  years: number[];
}

export function YearNav({ years }: YearNavProps) {
  const [activeYear, setActiveYear] = useState<number>(years[0] || 0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => {
            const ya = parseInt((a.target as HTMLElement).dataset.year || "0");
            const yb = parseInt((b.target as HTMLElement).dataset.year || "0");
            return yb - ya;
          });
        if (visible.length > 0) {
          setActiveYear(parseInt((visible[0].target as HTMLElement).dataset.year || "0"));
        }
      },
      { threshold: 0.1, rootMargin: "-80px 0px -60% 0px" }
    );

    years.forEach((y) => {
      const el = document.getElementById(`year-${y}`);
      if (el) {
        (el as HTMLElement).dataset.year = String(y);
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [years]);

  const scrollToYear = useCallback((year: number) => {
    const el = document.getElementById(`year-${year}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveYear(year);
    }
  }, []);

  return (
    <nav className="sticky top-28 hidden lg:block">
      <p className="mb-5 font-mono text-[9px] tracking-[0.2em] text-muted-foreground/30 uppercase">
        归档
      </p>
      <ul className="space-y-1.5">
        {years.map((year) => (
          <li key={year}>
            <button
              onClick={() => scrollToYear(year)}
              className={`group flex items-center gap-2.5 text-[13px] transition-all duration-300 ${
                activeYear === year
                  ? "text-foreground font-medium"
                  : "text-muted-foreground/40 hover:text-muted-foreground/70"
              }`}
            >
              <span
                className={`block h-px transition-all duration-300 ${
                  activeYear === year
                    ? "w-3 bg-accent-blue"
                    : "w-0 bg-muted-foreground/30 group-hover:w-2"
                }`}
              />
              {year}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
