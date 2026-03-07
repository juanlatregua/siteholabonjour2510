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
        source: '/cursos/preparacion-delf-dalf',
        destination: '/preparacion-delf-dalf',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/recursos/blog',
        permanent: true,
      },
      // Legacy 2018 .html URLs
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
        destination: '/sobre-nosotros',
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
      // Legacy /phone/ and /tablet/ prefixed URLs
      {
        source: '/phone/:path*.html',
        destination: '/:path*.html',
        permanent: true,
      },
      {
        source: '/tablet/:path*.html',
        destination: '/:path*.html',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
