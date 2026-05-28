"use client";

import { useEffect, useRef } from "react";

export function AmbientGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const timeRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const animate = () => {
      timeRef.current += 0.004;
      const t = timeRef.current;
      const opacity = 0.06 + Math.sin(t * 0.8) * 0.03;
      const scale = 1 + Math.sin(t * 0.5) * 0.06;
      el.style.opacity = String(opacity);
      el.style.transform = `translate(-50%, -50%) scale(${scale})`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed z-0 opacity-0"
      style={{
        left: "50%",
        top: "50%",
        width: "1000px",
        height: "1000px",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(56,189,248,0.12) 0%, rgba(96,165,250,0.06) 30%, transparent 65%)",
        filter: "blur(140px)",
        willChange: "transform, opacity",
        transition: "opacity 2s ease-in",
      }}
    />
  );
}
