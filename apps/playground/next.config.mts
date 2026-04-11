import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  transpilePackages: ['@radix-ui/themes'],
  outputFileTracingRoot: path.resolve(import.meta.dirname, '../..'),
  async redirects() {
    return [
      {
        source: '/',
        destination: '/sink',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
