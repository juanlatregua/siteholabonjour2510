// next.config.ts
import type { NextConfig } from 'next';

// Legacy pages from 2018 WordPress site and their current destinations
const legacyRedirects: Array<{ source: string; destination: string }> = [
  // Main pages
  { source: '/horarios-clases-frances-malaga.html', destination: '/horarios' },
  { source: '/cursos-frances-malaga.html', destination: '/cursos' },
  { source: '/precios-curso-frances-malaga.html', destination: '/precios' },
  { source: '/aprende-frances-conocenos.html', destination: '/nosotros' },
  { source: '/preguntas-frecuentes.html', destination: '/preguntas-frecuentes' },
  { source: '/envio-ok.html', destination: '/confirmacion' },
  { source: '/politica-de-privacidad.html', destination: '/politica-de-privacidad' },
  { source: '/aviso-legal.html', destination: '/aviso-legal' },
  // Additional legacy pages
  { source: '/contacto.html', destination: '/contact' },
  { source: '/contact.html', destination: '/contact' },
  { source: '/index.html', destination: '/' },
  { source: '/clases-de-frances-online.html', destination: '/cursos' },
  { source: '/clases-frances-malaga.html', destination: '/cursos' },
  { source: '/academia-frances-malaga.html', destination: '/' },
  { source: '/preparacion-delf.html', destination: '/preparacion-delf-dalf' },
  { source: '/preparacion-dalf.html', destination: '/preparacion-delf-dalf' },
  { source: '/test-de-nivel.html', destination: '/prueba-nivel' },
  { source: '/test-nivel-frances.html', destination: '/prueba-nivel' },
  { source: '/politica-de-cookies.html', destination: '/politica-de-cookies' },
];

// Generate variants for /phone/ and /tablet/ prefixed URLs (WordPress mobile plugins)
function expandWithDevicePrefixes(
  redirects: Array<{ source: string; destination: string }>,
): Array<{ source: string; destination: string; permanent: boolean }> {
  const result: Array<{ source: string; destination: string; permanent: boolean }> = [];

  for (const r of redirects) {
    // Original
    result.push({ source: r.source, destination: r.destination, permanent: true });
    // /phone/ prefix
    result.push({ source: `/phone${r.source}`, destination: r.destination, permanent: true });
    // /tablet/ prefix
    result.push({ source: `/tablet${r.source}`, destination: r.destination, permanent: true });
  }

  return result;
}

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
      // Canonical domain redirect (non-www → www)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'holabonjour.es' }],
        destination: 'https://www.holabonjour.es/:path*',
        permanent: true,
      },
      // All legacy .html URLs with /phone/ and /tablet/ variants
      ...expandWithDevicePrefixes(legacyRedirects),
      // Catch-all: any remaining /phone/ or /tablet/ prefix → root
      {
        source: '/phone/:path*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/tablet/:path*',
        destination: '/:path*',
        permanent: true,
      },
      // Legacy query param redirects (WordPress ?page_id=)
      {
        source: '/',
        has: [{ type: 'query', key: 'page_id' }],
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
