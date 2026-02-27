# Friction Backlog

| ID | Severidad | Ruta | Problema | Fix | Owner | ETA |
|---|---|---|---|---|---|---|
| UX-001 | Blocker (P0) | `/zona-alumno` | Área supuestamente privada accesible sin control y con IDs visibles en errores (`src/app/zona-alumno/page.tsx:36`). | Quitar entrada demo pública en Home y ocultar enumeración de IDs; mostrar mensaje neutro + acceso autenticado. | Frontend + PM | 1 día |
| UX-002 | High (P0) | `/` -> `/zona-alumno?alumno=demo` | CTA público “Ver zona alumno demo” rompe expectativa de privacidad (`src/app/page.tsx:182`). | Mover demo a entorno interno/noindex o eliminar del Home público. | UX + Frontend | 0.5 día |
| UX-003 | High (P0) | `/prueba-nivel/[assessmentId]` | Resultado no tiene CTA directo a contratación; fuga tras completar test (`src/components/AssessmentFlow.tsx:747`). | Añadir CTA principal “Contratar pack recomendado” hacia `/contratar?nivel=...&ruta=...`. | UX Writer + Frontend | 1 día |
| UX-004 | High (P0) | `/contratar` | Fallback muestra texto técnico de variable de entorno (`NEXT_PUBLIC_ISABELLE_CALENDAR_URL`) al usuario (`src/app/contratar/page.tsx:99`). | Sustituir por mensaje de negocio + CTA alternativo claro (WhatsApp/Email + SLA). | Content + Frontend | 0.5 día |
| UX-005 | High (P0) | Global | Reseñas mostradas son genéricas/no verificadas (`src/components/TrustReviews.tsx`). | Integrar reseñas reales de Google Business con fuente/enlace visible (sin inventar). | Content + PM | 1 día |
| UX-006 | Medium (P1) | Header móvil | Densidad alta en header sticky + notice pequeña (`src/components/Header.module.css`). | Reducir ruido: compactar notice, priorizar 1 CTA principal por viewport. | UX/UI + Frontend | 1 día |
| UX-007 | Medium (P1) | Global copy | Inconsistencia ortográfica sin acentos en labels críticos (“Preparacion”, “academica”). | Normalizar copy ES profesional en navegación, hero y pies. | UX Writer | 0.5 día |
| UX-008 | Medium (P1) | `/contratar` | No se explica tiempo exacto de respuesta/confirmación tras reservar. | Añadir bloque “Qué pasa después” con ETA y canal de confirmación. | Content | 0.5 día |
| UX-009 | Medium (P1) | `/contact` | Página informativa sin preclasificación de dudas frecuentes; deriva a WhatsApp repetitivo. | Añadir FAQ operativa corta y CTA según intención (precio, nivel, agenda). | Content + PM | 1 día |
| UX-010 | Medium (P1) | `/prueba-nivel` | Falta resumen de utilidad comercial (“si sacas X, paso siguiente Y”). | Añadir microcopy de decisión y expectativa de tiempo/coste. | UX Writer | 0.5 día |
| UX-011 | Medium (P1) | A11Y global | Sin skip link visible y foco no unificado en links/botones globales. | Implementar skip link + estados focus-visible consistentes en design tokens. | A11Y + Frontend | 1 día |
| UX-012 | Low (P2) | `src/components/Navigation.tsx` | Componente legacy no alineado con stack visual actual. | Marcar deprecated o retirar para evitar reutilización accidental. | Frontend Lead | 0.5 día |
| UX-013 | Low (P2) | Home visual | Falta uso de assets históricos de marca (logos/fotos snapshot) para continuidad. | Curar set de imágenes legacy válidas y reemplazar placeholders. | UX/UI + Content | 1.5 días |
| UX-014 | Low (P2) | Soporte | Falta bloque de “preguntas rápidas” tipo chat/FAQ para filtrar WhatsApp repetido. | Añadir módulo de preguntas frecuentes estructurado por intención. | PM + Content + Frontend | 2 días |
| UX-015 | Low (P2) | QA | Sin automatización E2E en rutas críticas (`package.json` sin test e2e). | Crear smoke Playwright para Home->Contratar y Home->Prueba->Resultado. | QA + Frontend | 2 días |
