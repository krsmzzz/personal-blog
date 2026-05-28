"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -500, y: -500 });
  const targetRef = useRef({ x: -500, y: -500 });
  const velRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const mountedRef = useRef(false);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!mountedRef.current) {
        // Snap to position on first move
        posRef.current = { x: e.clientX, y: e.clientY };
        mountedRef.current = true;
        glow.style.opacity = "1";
      }
    };

    const animate = () => {
      const pos = posRef.current;
      const target = targetRef.current;
      const vel = velRef.current;

      // Spring-like interpolation
      const dx = target.x - pos.x;
      const dy = target.y - pos.y;
      vel.x += dx * 0.04;
      vel.y += dy * 0.04;
      vel.x *= 0.92;
      vel.y *= 0.92;
      pos.x += vel.x;
      pos.y += vel.y;

      glow.style.transform = `translate(${pos.x - 450}px, ${pos.y - 450}px)`;
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
      className="pointer-events-none fixed left-0 top-0 z-0 opacity-0"
      style={{
        width: "900px",
        height: "900px",
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(56,189,248,0.10) 0%, rgba(125,211,252,0.05) 35%, transparent 70%)",
        filter: "blur(120px)",
        willChange: "transform",
        transition: "opacity 1.5s ease-out",
      }}
    />
  );
}
