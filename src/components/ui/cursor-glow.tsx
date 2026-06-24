"use client";

import { useEffect, useRef } from "react";

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -300, y: -300 });
  const posRef = useRef({ x: -300, y: -300 });
  const trailPosRef = useRef({ x: -300, y: -300 });
  const rafRef = useRef(0);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const pos = posRef.current;
      const tgt = mouseRef.current;
      const tPos = trailPosRef.current;

      // Main glow — fast follow
      pos.x += (tgt.x - pos.x) * 0.15;
      pos.y += (tgt.y - pos.y) * 0.15;

      // Trail — slower, follows the main glow
      tPos.x += (pos.x - tPos.x) * 0.06;
      tPos.y += (pos.y - tPos.y) * 0.06;

      // Single element with two gradient layers — same color
      glow.style.background = [
        `radial-gradient(circle 340px at ${pos.x}px ${pos.y}px, rgba(59,130,246,0.20) 0%, rgba(59,130,246,0.06) 30%, rgba(37,99,235,0.02) 55%, transparent 65%)`,
        `radial-gradient(circle 280px at ${tPos.x}px ${tPos.y}px, rgba(59,130,246,0.06) 0%, rgba(59,130,246,0.02) 40%, transparent 65%)`,
      ].join(", ");

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
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        pointerEvents: "none",
        mixBlendMode: "screen",
      }}
    />
  );
}
