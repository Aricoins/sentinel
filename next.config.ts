import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/sentinel' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/sentinel/' : '',
  // Development optimizations
  ...(process.env.NODE_ENV === 'development' && {
    experimental: {
      optimizePackageImports: ['lucide-react'],
    },
  }),
};

export default nextConfig;
