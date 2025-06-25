import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['images.unsplash.com', 'substackcdn.com', 'via.placeholder.com'],
  },
};

export default nextConfig;
