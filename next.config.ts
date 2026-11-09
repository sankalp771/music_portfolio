import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep dev's hot-reload output isolated from production builds.
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
};

export default nextConfig;
