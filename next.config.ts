// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
    ];
  },
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
      // ── Legacy 2018 .html URLs (direct, no prefix) ──
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
      {
        source: '/testdelfa1.html',
        destination: '/examenes/a1/1',
        permanent: true,
      },
      {
        source: '/contacto.html',
        destination: '/contacto',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      // ── Legacy /phone/ and /tablet/ + .html (specific pages first) ──
      // These must come BEFORE the catch-all to ensure correct destination
      {
        source: '/phone/horarios-clases-frances-malaga.html',
        destination: '/contratar',
        permanent: true,
      },
      {
        source: '/tablet/horarios-clases-frances-malaga.html',
        destination: '/contratar',
        permanent: true,
      },
      {
        source: '/phone/cursos-frances-malaga.html',
        destination: '/preparacion-delf-dalf',
        permanent: true,
      },
      {
        source: '/tablet/cursos-frances-malaga.html',
        destination: '/preparacion-delf-dalf',
        permanent: true,
      },
      {
        source: '/phone/precios-curso-frances-malaga.html',
        destination: '/contratar',
        permanent: true,
      },
      {
        source: '/tablet/precios-curso-frances-malaga.html',
        destination: '/contratar',
        permanent: true,
      },
      {
        source: '/phone/aprende-frances-conocenos.html',
        destination: '/sobre-nosotros',
        permanent: true,
      },
      {
        source: '/tablet/aprende-frances-conocenos.html',
        destination: '/sobre-nosotros',
        permanent: true,
      },
      {
        source: '/phone/preguntas-frecuentes.html',
        destination: '/preguntas-frecuentes',
        permanent: true,
      },
      {
        source: '/tablet/preguntas-frecuentes.html',
        destination: '/preguntas-frecuentes',
        permanent: true,
      },
      {
        source: '/phone/envio-ok.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tablet/envio-ok.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/phone/politica-de-privacidad.html',
        destination: '/politica-de-privacidad',
        permanent: true,
      },
      {
        source: '/tablet/politica-de-privacidad.html',
        destination: '/politica-de-privacidad',
        permanent: true,
      },
      {
        source: '/phone/aviso-legal.html',
        destination: '/aviso-legal',
        permanent: true,
      },
      {
        source: '/tablet/aviso-legal.html',
        destination: '/aviso-legal',
        permanent: true,
      },
      {
        source: '/phone/contacto.html',
        destination: '/contacto',
        permanent: true,
      },
      {
        source: '/tablet/contacto.html',
        destination: '/contacto',
        permanent: true,
      },
      {
        source: '/phone/testdelfa1.html',
        destination: '/examenes/a1/1',
        permanent: true,
      },
      {
        source: '/tablet/testdelfa1.html',
        destination: '/examenes/a1/1',
        permanent: true,
      },
      {
        source: '/phone/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tablet/index.html',
        destination: '/',
        permanent: true,
      },
      // Catch-all: any other /phone/ or /tablet/ URL → home
      {
        source: '/phone/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tablet/:path*',
        destination: '/',
        permanent: true,
      },
      // ── Legacy blog posts in French ──
      {
        source: '/blog/les-marches-de-noel-en-france',
        destination: '/recursos/blog',
        permanent: true,
      },
      {
        source: '/blog/mots-croises-sur-halloween',
        destination: '/recursos/blog',
        permanent: true,
      },
      {
        source: '/blog/mon-plus-beau-souvenir-de-vacances',
        destination: '/recursos/blog',
        permanent: true,
      },
      // ── Legacy assets ──
      {
        source: '/assets/delf-dalf-2019.pdf',
        destination: '/preparacion-delf-dalf',
        permanent: true,
      },
      {
        source: '/assets/:path*',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
