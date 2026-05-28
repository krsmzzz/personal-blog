"use client";

import { useEffect, useRef } from "react";

/**
 * Multi-layer atmospheric glow system — deep infra blue edition.
 * 3 non-centered layers with deep blue, cool blue, and subtle indigo.
 * Blur 140–180px. Diffuse, no hard edges. Multi-color spatial depth.
 */
export function AtmosphereSystem() {
  const layerARef = useRef<HTMLDivElement>(null);
  const layerBRef = useRef<HTMLDivElement>(null);
  const layerCRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const lA = layerARef.current;
    const lB = layerBRef.current;
    const lC = layerCRef.current;
    if (!lA || !lB || !lC) return;

    const animate = () => {
      timeRef.current += 0.003;
      const t = timeRef.current;

      // Layer A — deep blue core, top-right, largest, blur 180px (18s cycle)
      const aOp = 0.65 + Math.sin(t * 0.55) * 0.20;
      const aScale = 1 + Math.sin(t * 0.40) * 0.04;
      const aY = Math.sin(t * 0.30) * 35;
      lA.style.opacity = String(aOp);
      lA.style.transform = `translate(calc(35% + ${Math.sin(t * 0.28) * 25}px), calc(-35% + ${aY}px)) scale(${aScale})`;

      // Layer B — cool blue mid-layer, left-center, blur 160px (15s cycle)
      const bOp = 0.55 + Math.sin(t * 0.62 + 1.5) * 0.20;
      const bScale = 1 + Math.sin(t * 0.44 + 1.5) * 0.05;
      const bX = Math.sin(t * 0.35 + 0.8) * 30;
      lB.style.opacity = String(bOp);
      lB.style.transform = `translate(calc(-25% + ${bX}px), calc(15% + ${Math.sin(t * 0.38) * 25}px)) scale(${bScale})`;

      // Layer C — indigo accent, bottom-right, blur 150px (13s cycle)
      const cOp = 0.40 + Math.sin(t * 0.70 + 3) * 0.18;
      const cScale = 1 + Math.sin(t * 0.48 + 3) * 0.06;
      const cX = Math.sin(t * 0.38 + 1.2) * 40;
      lC.style.opacity = String(cOp);
      lC.style.transform = `translate(calc(45% + ${cX}px), calc(35% + ${Math.sin(t * 0.42 + 0.5) * 30}px)) scale(${cScale})`;

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      {/* Layer A — Deep blue primary, top-right zone, 1300px, blur 180px */}
      <div
        ref={layerARef}
        className="pointer-events-none fixed z-10 will-change-transform"
        style={{
          width: "1300px",
          height: "1300px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 55% 35%, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0.10) 25%, rgba(59,130,246,0.04) 55%, transparent 72%)",
          filter: "blur(180px)",
          left: "0",
          top: "0",
          transition: "opacity 3.5s ease-in",
        }}
      />

      {/* Layer B — Cool blue + subtle indigo, mid-left zone, 1100px, blur 165px */}
      <div
        ref={layerBRef}
        className="pointer-events-none fixed z-10 will-change-transform"
        style={{
          width: "1100px",
          height: "1100px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 40% 55%, rgba(96,165,250,0.14) 0%, rgba(99,102,241,0.07) 20%, rgba(37,99,235,0.05) 40%, transparent 70%)",
          filter: "blur(165px)",
          left: "0",
          top: "0",
          transition: "opacity 3.5s ease-in",
        }}
      />

      {/* Layer C — Indigo accent, bottom-right, 900px, blur 150px */}
      <div
        ref={layerCRef}
        className="pointer-events-none fixed z-10 will-change-transform"
        style={{
          width: "900px",
          height: "900px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.08) 0%, rgba(37,99,235,0.04) 30%, rgba(59,130,246,0.02) 55%, transparent 72%)",
          filter: "blur(150px)",
          left: "0",
          top: "0",
          transition: "opacity 3.5s ease-in",
        }}
      />
    </>
  );
}
