"use client";

import { useEffect, useRef, useState } from "react";
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
                className={`group relative w-full cursor-zoom-in overflow-hidden rounded-lg ${getImageClass(count, i)}`}
              >
                {count === 1 ? (
                  <img
                    src={img.url!}
                    alt={img.alt || ""}
                    className="w-full transition-transform duration-500 group-hover:scale-105"
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

      {lightbox && (
        <>
          {/* Mask overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl"
            onClick={() => setLightbox(null)}
          />

          {/* Lightbox controls + image */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-8 pointer-events-none">
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="pointer-events-auto absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2.5 text-white/50 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            </button>

            {/* Counter */}
            <div className="pointer-events-auto absolute left-4 top-4 z-10 rounded-full bg-white/10 px-3 py-1 font-mono text-xs text-white/50 backdrop-blur-sm">
              {lightbox.index + 1} / {count}
            </div>

            {/* Prev */}
            {lightbox.index > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox({ url: images[lightbox.index - 1].url!, index: lightbox.index - 1 }); }}
                className="pointer-events-auto absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white/50 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m15 18-6-6 6-6"/></svg>
              </button>
            )}

            {/* Next */}
            {lightbox.index < count - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox({ url: images[lightbox.index + 1].url!, index: lightbox.index + 1 }); }}
                className="pointer-events-auto absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white/50 backdrop-blur-sm transition-colors hover:bg-white/20 hover:text-white"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m9 18 6-6-6-6"/></svg>
              </button>
            )}

            {/* Image */}
            <div className="pointer-events-auto z-10 max-h-full max-w-full" onClick={(e) => e.stopPropagation()}>
              <img
                src={lightbox.url}
                alt=""
                className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
