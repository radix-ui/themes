/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@kushagradhawan/kookie-ui'],
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

module.exports = nextConfig;
