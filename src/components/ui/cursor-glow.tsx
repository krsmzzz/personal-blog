"use client";

import { useEffect, useRef } from "react";

/**
 * Deep infra blue cursor-following glow.
 * Delayed spring follow (stiffness ≈ 40, damping ≈ 30).
 * Two layers: main glow + trailing haze. Blur 160px / 150px.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -600, y: -600 });
  const targetRef = useRef({ x: -600, y: -600 });
  const velRef = useRef({ x: 0, y: 0 });
  const trailPosRef = useRef({ x: -500, y: -500 });
  const trailVelRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);
  const mountedRef = useRef(false);

  useEffect(() => {
    const glow = glowRef.current;
    const trail = trailRef.current;
    if (!glow || !trail) return;

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!mountedRef.current) {
        posRef.current = { x: e.clientX, y: e.clientY };
        trailPosRef.current = { x: e.clientX, y: e.clientY };
        mountedRef.current = true;
        glow.style.opacity = "1";
        trail.style.opacity = "1";
      }
    };

    const animate = () => {
      const pos = posRef.current;
      const target = targetRef.current;
      const vel = velRef.current;
      const tPos = trailPosRef.current;
      const tVel = trailVelRef.current;

      // Main glow — soft spring
      const dx = target.x - pos.x;
      const dy = target.y - pos.y;
      vel.x += dx * 0.018;
      vel.y += dy * 0.018;
      vel.x *= 0.94;
      vel.y *= 0.94;
      pos.x += vel.x;
      pos.y += vel.y;

      // Trail — even slower
      const tdx = pos.x - tPos.x;
      const tdy = pos.y - tPos.y;
      tVel.x += tdx * 0.008;
      tVel.y += tdy * 0.008;
      tVel.x *= 0.96;
      tVel.y *= 0.96;
      tPos.x += tVel.x;
      tPos.y += tVel.y;

      glow.style.transform = `translate(${pos.x - 500}px, ${pos.y - 500}px)`;
      trail.style.transform = `translate(${tPos.x - 550}px, ${tPos.y - 550}px)`;

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
    <>
      {/* Main cursor glow — deep blue, 1000px, blur 160px */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-20 opacity-0"
        style={{
          width: "1000px",
          height: "1000px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.14) 0%, rgba(59,130,246,0.06) 30%, rgba(37,99,235,0.02) 55%, transparent 70%)",
          filter: "blur(160px)",
          willChange: "transform",
          transition: "opacity 2.5s ease-out",
        }}
      />

      {/* Trail glow — indigo-tinged, 750px, blur 150px */}
      <div
        ref={trailRef}
        className="pointer-events-none fixed left-0 top-0 z-20 opacity-0"
        style={{
          width: "750px",
          height: "750px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.08) 0%, rgba(37,99,235,0.03) 40%, transparent 68%)",
          filter: "blur(150px)",
          willChange: "transform",
          transition: "opacity 2.5s ease-out",
        }}
      />
    </>
  );
}
