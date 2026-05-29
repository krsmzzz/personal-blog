"use client";

import { useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import Image from "next/image";
import type { IdeaFrontmatter } from "@/lib/content-bridge";

// ============================================================
// Variants
// ============================================================

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] as const },
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.15 },
  },
};

// ============================================================
// Helpers
// ============================================================

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ============================================================
// IdeaCard
// ============================================================

interface IdeaCardProps {
  slug: string;
  frontmatter: IdeaFrontmatter;
  index: number;
}

export function IdeaCard({ slug, frontmatter, index }: IdeaCardProps) {
  const { date, excerpt, galleryImages } = frontmatter;
  const cardRef = useRef<HTMLDivElement>(null);
  const images = galleryImages?.filter((g) => g.url) || [];
  const count = images.length;

  const [lightbox, setLightbox] = useClientState<{ url: string; index: number } | null>(null);

  // ESC / Arrow keys
  useLightboxKeys(lightbox, setLightbox, images);

  // Prevent body scroll
  useBodyScrollLock(!!lightbox);

  return (
    <>
      <motion.div
        ref={cardRef}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="group relative rounded-xl border border-border/25 bg-card/70 p-4"
        whileHover={{
          y: -3,
          boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
          borderColor: "rgba(56,189,248,0.15)",
          transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1.0] as const },
        }}
      >
        {/* Subtle radial glow on hover */}
        <div className="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(56,189,248,0.06), transparent 60%)",
          }}
        />

        {/* Content */}
        {excerpt && (
          <p className="text-[14px] leading-7 whitespace-pre-wrap text-foreground/80">
            {excerpt}
          </p>
        )}

        {/* Image Grid */}
        {count > 0 && (
          <div className="mt-3 grid grid-cols-3 gap-1">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightbox({ url: img.url!, index: i })}
                className="group/img relative w-full cursor-zoom-in overflow-hidden rounded-lg aspect-square max-h-48"
              >
                <motion.div
                  className="h-full w-full"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1.0] as const }}
                >
                  <Image
                    src={img.url!}
                    alt={img.alt || ""}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 33vw, 180px"
                  />
                </motion.div>

                {/* Hover mask */}
                <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover/img:bg-black/12" />
              </button>
            ))}
          </div>
        )}

        {/* Date */}
        <time className="mt-3 block font-mono text-[10px] text-muted-foreground/35">
          {formatDate(date)}
        </time>
      </motion.div>

      {/* Lightbox */}
      {lightbox && createPortal(
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
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
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m15 18-6-6 6-6"/></svg>
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
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          )}

          <motion.img
            src={lightbox.url}
            alt=""
            className="relative z-10 max-h-[85vh] max-w-[90vw] rounded-xl object-contain"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            key={lightbox.url}
          />

          <div className="relative z-10 mt-4 rounded-full bg-white/10 px-3 py-1 font-mono text-xs text-white/50">
            {lightbox.index + 1} / {count}
          </div>
        </motion.div>,
        document.body
      )}
    </>
  );
}

// ============================================================
// Hooks (inline to keep single-file)
// ============================================================

import { useState, useEffect, useCallback } from "react";

function useClientState<T>(initial: T) {
  const [state, setState] = useState<T>(initial);
  return [state, setState] as const;
}

function useLightboxKeys(
  lightbox: { url: string; index: number } | null,
  setLightbox: (v: { url: string; index: number } | null) => void,
  images: { url?: string }[]
) {
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft" && lightbox.index > 0) {
        const prev = images[lightbox.index - 1];
        if (prev?.url) setLightbox({ url: prev.url, index: lightbox.index - 1 });
      }
      if (e.key === "ArrowRight" && lightbox.index < images.length - 1) {
        const next = images[lightbox.index + 1];
        if (next?.url) setLightbox({ url: next.url, index: lightbox.index + 1 });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, setLightbox, images]);
}

function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (locked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [locked]);
}
