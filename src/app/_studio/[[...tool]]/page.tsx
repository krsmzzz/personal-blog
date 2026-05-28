"use client";

import dynamic from "next/dynamic";

const Studio = dynamic(
  () => import("./StudioClient").then((mod) => mod.default),
  { ssr: false }
);

export default function StudioPage() {
  return <Studio />;
}
