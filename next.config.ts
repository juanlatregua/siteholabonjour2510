// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.facebook.com',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'holabonjour.es' }],
        destination: 'https://www.holabonjour.es/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
