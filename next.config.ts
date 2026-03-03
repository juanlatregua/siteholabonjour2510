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
      // Legacy URLs from 2018 site
      {
        source: '/horarios-clases-frances-malaga.html',
        destination: '/contratar',
        permanent: true,
      },
      {
        source: '/cursos-frances-malaga.html',
        destination: '/preparacion-delf-dalf',
        permanent: true,
      },
      {
        source: '/precios-curso-frances-malaga.html',
        destination: '/contratar',
        permanent: true,
      },
      {
        source: '/aprende-frances-conocenos.html',
        destination: '/#equipo',
        permanent: true,
      },
      {
        source: '/preguntas-frecuentes.html',
        destination: '/preguntas-frecuentes',
        permanent: true,
      },
      {
        source: '/envio-ok.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/politica-de-privacidad.html',
        destination: '/politica-de-privacidad',
        permanent: true,
      },
      {
        source: '/aviso-legal.html',
        destination: '/aviso-legal',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
