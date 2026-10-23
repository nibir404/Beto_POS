import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export so the site can be served by any static host (FuncHole STATIC runtime).
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
