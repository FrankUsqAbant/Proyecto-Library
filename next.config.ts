import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wsrv.nl',
      },
      {
        protocol: 'https',
        hostname: 'gutendex.com',
      },
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
      },
      {
        protocol: 'https',
        hostname: 'www.gutenberg.org',
      },
    ],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    // Desactivamos por ahora para evitar Timeouts
    // optimizePackageImports: ['lucide-react'],
  },
  turbopack: {},
  poweredByHeader: false,
};

export default nextConfig;
