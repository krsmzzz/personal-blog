"use client";

import { useRef, type MouseEvent } from "react";

interface MagneticCardProps {
  children: React.ReactNode;
  className?: string;
  maxShift?: number; // px
}

export function MagneticCard({ children, className = "", maxShift = 4 }: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const tx = (x / (rect.width / 2)) * maxShift;
    const ty = (y / (rect.height / 2)) * maxShift;
    card.style.transform = `translate(${tx}px, ${ty}px)`;
  };

  const handleMouseLeave = () => {
    const card = ref.current;
    if (!card) return;
    card.style.transform = "translate(0px, 0px)";
  };

  return (
    <div
      ref={ref}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ willChange: "transform" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
