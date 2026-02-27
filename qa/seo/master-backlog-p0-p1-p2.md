# Master Backlog SEO · P0 / P1 / P2

## P0 (impacto directo en indexacion, CTR o conversion)

| ID | Owner | Archivo/Ruta exacta | Riesgo si no se hace | Dependencias | ETA (dias) | KPI afectado |
|---|---|---|---|---|---:|---|
| P0-01 | UX + Content | `src/components/Header.tsx`, `src/components/Footer.tsx` | Ambiguedad de marca y menor claridad de oferta en 5 segundos | Aprobacion naming final (“Equipo”) | 1 | CTR branded, CVR orgánico |
| P0-02 | Backend SEO | `src/app/zona-alumno/page.tsx`, `src/app/api/zona-alumno/[studentId]/route.ts`, `src/app/robots.ts` (nuevo), metadata de segmento | Indexacion de rutas privadas / datos de alumno | Definir política indexación | 1 | URLs indexables válidas, cobertura |
| P0-03 | Backend SEO | `src/app/sitemap.ts` (nuevo) o `next-sitemap` equivalente nativo | Cobertura incompleta de URLs transaccionales | Lista final de URLs canónicas | 1 | Impresiones orgánicas |
| P0-04 | Content | `src/app/page.tsx`, `src/app/contratar/page.tsx`, `src/app/preparacion-delf-dalf/page.tsx` | Mensajes inconsistentes y pérdida de intención transaccional | Aprobación copy comercial | 2 | CTR y CVR |
| P0-05 | Backend SEO + Content | Metadata por ruta: `src/app/page.tsx`, `src/app/contratar/page.tsx`, `src/app/preparacion-delf-dalf/page.tsx`, `src/app/prueba-nivel/page.tsx` | Titles/meta débiles, bajo CTR en queries de dinero | Matriz keywords-intent | 2 | CTR y posición media |
| P0-06 | Marketing SEO | GSC/GA4 (sin código) + `qa/seo/kpi-dashboard-spec.md` | Sin baseline no hay atribución de impacto | Accesos a cuentas | 2 | Todos los KPI |
| P0-07 | UX + Frontend | `src/app/page.tsx` bloque principal CTA, `src/app/contratar/page.tsx` | Fricción en paso “siguiente acción” | Validación comercial | 2 | Conversión orgánica |
| P0-08 | Backend SEO | `next.config.ts` / middleware SEO (si aplica) | Riesgo de canónicas inconsistentes, parámetros indexables | Auditoría técnica de rutas | 2 | Cobertura limpia, canonical health |

## P1 (relevante, no bloqueante)

| ID | Owner | Archivo/Ruta exacta | Riesgo si no se hace | Dependencias | ETA (dias) | KPI afectado |
|---|---|---|---|---|---:|---|
| P1-01 | Content | `src/app/preparacion-delf-dalf/page.tsx` (FAQ real + aclaraciones de proceso) | Menor respuesta a dudas previas a contratación | Soporte de UX Writer | 3 | CTR long-tail, CVR |
| P1-02 | UX + Frontend | `src/app/contratar/page.tsx` (microcopy de ansiedad post-compra) | Abandono en transición contratación→reserva | Política de soporte y SLA | 2 | CVR lead→reserva |
| P1-03 | Backend SEO | Schema (`Organization`, `Person`, `Service`, `BreadcrumbList`) en layout/pages | Menor comprensión semántica en SERP | Validación legal de entidad | 3 | CTR enriquecido, impresiones |
| P1-04 | Content + Marketing | `src/components/TrustReviews.tsx` (testimonios verificables) | Señales E-E-A-T débiles | Evidencia/reseñas reales | 3 | CVR orgánico |
| P1-05 | Frontend QA | Imágenes/alt/performance: `src/app/page.tsx`, `public/images/*` | Peor CWV y UX móvil | Inventario multimedia | 3 | LCP/INP, rebote |
| P1-06 | Backend SEO | Limpieza de páginas heredadas vacías (`*.html` en raíz repo) | Riesgo de rastreo basura/cobertura inútil | Decisión de deprecación | 2 | Crawl efficiency |

## P2 (optimización opcional / escalado)

| ID | Owner | Archivo/Ruta exacta | Riesgo si no se hace | Dependencias | ETA (dias) | KPI afectado |
|---|---|---|---|---|---:|---|
| P2-01 | Marketing SEO | Experimentos de title/meta (documentados en QA) | Crecimiento más lento de CTR | Baseline estable 3 semanas | 5 | CTR |
| P2-02 | UX Research | Test cualitativo móvil en `/`, `/contratar`, `/prueba-nivel` | Fricciones finas no detectadas | Panel de usuarios | 5 | CVR |
| P2-03 | Content Ops | Calendario editorial soporte semántico (sin canibalizar home) | Menor cobertura de intenciones secundarias | Keyword map final | 7 | Impresiones no branded |
| P2-04 | SEO Off-page | Plan de autoridad externa y menciones | Techo de ranking competitivo | Activos de PR | 14 | Posición media |
| P2-05 | Data + PM | Modelo de atribución orgánica por ruta | Decisiones de priorización menos precisas | GA4 limpio + eventos | 7 | ROI SEO |
