// @ts-check
import path from 'node:path';

/** @type {import('next').NextConfig} */
const nextConfig = {
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
