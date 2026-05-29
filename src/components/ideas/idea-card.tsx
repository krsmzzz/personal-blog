"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { IdeaFrontmatter } from "@/lib/content-bridge";

interface IdeaCardProps {
  slug: string;
  frontmatter: IdeaFrontmatter;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getGridClass(count: number): string {
  if (count === 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-2";
  if (count === 3) return "grid-cols-2";
  return "grid-cols-3";
}

function getImageClass(count: number, index: number): string {
  if (count === 1) return "";
  if (count === 3) {
    if (index === 0) return "aspect-square row-span-2";
    return "aspect-square";
  }
  return "aspect-square";
}

export function IdeaCard({ slug, frontmatter }: IdeaCardProps) {
  const { date, excerpt, galleryImages } = frontmatter;
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [lightbox, setLightbox] = useState<{ url: string; index: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ESC key to close
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft" && lightbox.index > 0) {
        const prev = galleryImages?.filter((g) => g.url)[lightbox.index - 1];
        if (prev?.url) setLightbox({ url: prev.url, index: lightbox.index - 1 });
      }
      if (e.key === "ArrowRight") {
        const imgs = galleryImages?.filter((g) => g.url) || [];
        if (lightbox.index < imgs.length - 1) {
          const next = imgs[lightbox.index + 1];
          if (next?.url) setLightbox({ url: next.url, index: lightbox.index + 1 });
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, galleryImages]);

  // Prevent body scroll when lightbox open
  useEffect(() => {
    if (lightbox) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const images = galleryImages?.filter((g) => g.url) || [];
  const count = images.length;

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
      }}
    >
      <div className="rounded-xl border border-border/25 bg-card/70 p-4 transition-all duration-300 hover:border-border/50">
        {excerpt && (
          <p className="text-[13px] leading-relaxed whitespace-pre-wrap text-muted-foreground/80">
            {excerpt}
          </p>
        )}

        {count > 0 && (
          <div className={`mt-3 grid gap-1 ${getGridClass(count)}`}>
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightbox({ url: img.url!, index: i })}
                className={
                  count === 1
                    ? "group inline-block cursor-zoom-in overflow-hidden rounded-lg"
                    : `group relative w-full cursor-zoom-in overflow-hidden rounded-lg max-h-48 ${getImageClass(count, i)}`
                }
              >
                {count === 1 ? (
                  <img
                    src={img.url!}
                    alt={img.alt || ""}
                    className="max-h-48 w-auto rounded-lg transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <Image
                    src={img.url!}
                    alt={img.alt || ""}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, 250px"
                  />
                )}
                <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />
              </button>
            ))}
          </div>
        )}

        <time className="mt-3 block font-mono text-[10px] text-muted-foreground/25">
          {formatDate(date)}
        </time>
      </div>

      {lightbox && createPortal(
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center">
          <div
            className="absolute inset-0 bg-black/75"
            onClick={() => setLightbox(null)}
          />

          {lightbox.index > 0 && (
            <button
              onClick={() => {
                const prev = images[lightbox.index - 1];
                setLightbox({ url: prev.url!, index: lightbox.index - 1 });
              }}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white/50 transition-colors hover:bg-white/20 hover:text-white"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>
          )}

          {lightbox.index < count - 1 && (
            <button
              onClick={() => {
                const next = images[lightbox.index + 1];
                setLightbox({ url: next.url!, index: lightbox.index + 1 });
              }}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white/50 transition-colors hover:bg-white/20 hover:text-white"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          )}

          <img
            src={lightbox.url}
            alt=""
            className="relative z-10 max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
          />

          <div className="relative z-10 mt-4 rounded-full bg-white/10 px-3 py-1 font-mono text-xs text-white/50">
            {lightbox.index + 1} / {count}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
