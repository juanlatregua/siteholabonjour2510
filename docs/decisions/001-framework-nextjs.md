# 001 — Next.js 15 como framework

## Contexto
Se necesitaba un framework fullstack que permitiera SSR, API routes, y un sistema de routing
robusto para una plataforma con múltiples zonas (pública, alumno, profesor). La aplicación
combina páginas estáticas de marketing con portales dinámicos autenticados.

## Decisión
Next.js 15 (App Router) con React 19 y TypeScript. Route groups para separar
zonas: `(cinematic)` público, `(zona-alumno)` alumno, `(zona-profesor)` profesor.
Server Components por defecto, Client Components solo para interactividad.

## Consecuencias
- SSR nativo para SEO en páginas públicas
- API Routes integradas (70+ endpoints sin servidor separado)
- Middleware para auth-gating por ruta
- Deploy directo en Vercel con zero-config
- Tailwind v4 + inline styles (sin librería de componentes externa)
