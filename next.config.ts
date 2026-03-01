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
        source: '/contact',
        destination: '/contacto',
        permanent: true,
      },
      {
        source: '/courses',
        destination: '/cursos',
        permanent: true,
      },
      {
        source: '/prueba-nivel',
        destination: '/test-de-nivel',
        permanent: true,
      },
      {
        source: '/test-de-niveau',
        destination: '/test-de-nivel',
        permanent: true,
      },
      {
        source: '/frances-empresas',
        destination: '/cursos/frances-empresas',
        permanent: true,
      },
      {
        source: '/preparacion-delf-dalf',
        destination: '/cursos/preparacion-delf-dalf',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
