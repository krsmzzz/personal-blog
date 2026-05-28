"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const pos = posRef.current;
      const target = targetRef.current;

      // Smooth interpolation (lerp)
      pos.x += (target.x - pos.x) * 0.08;
      pos.y += (target.y - pos.y) * 0.08;

      glow.style.transform = `translate(${pos.x - 300}px, ${pos.y - 300}px)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed left-0 top-0 z-0 h-[600px] w-[600px] rounded-full opacity-0 transition-opacity duration-1000"
      style={{
        background: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)",
        filter: "blur(80px)",
        willChange: "transform",
      }}
      onMouseEnter={(e) => {
        // Show on first mouse move
        (e.currentTarget as HTMLElement).style.opacity = "1";
      }}
    />
  );
}
