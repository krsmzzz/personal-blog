import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Set basePath for GitHub project pages (not needed for user pages)
  // basePath: isProd ? "/repo-name" : "",
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
