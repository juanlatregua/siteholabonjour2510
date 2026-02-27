# Master Plan SEO Ejecutivo · holabonjour.es

## 1) Consolidacion interdepartamental

### Estado de inputs recibidos
- `qa/seo/content-audit.md`: NO_VERIFICADO (no localizado en repo)
- `qa/seo/copy-rewrite-pack.md`: NO_VERIFICADO
- `qa/seo/keyword-intent-map.md`: NO_VERIFICADO
- `qa/ux/seo-ux-audit.md`: NO_VERIFICADO
- `qa/ux/navigation-friction-map.md`: NO_VERIFICADO
- `qa/ux/cta-consistency-plan.md`: NO_VERIFICADO
- `qa/seo/growth-priorities.md`: NO_VERIFICADO
- `qa/seo/gsc-opportunity-matrix.md`: NO_VERIFICADO
- `qa/seo/8-week-roadmap.md`: NO_VERIFICADO
- `qa/seo/technical-audit.md`: NO_VERIFICADO
- `qa/seo/indexability-checklist.md`: NO_VERIFICADO
- `qa/seo/fixes-priority-plan.md`: NO_VERIFICADO

> Este plan consolida con evidencia de código actual y debe refinarse cuando se carguen los 12 inputs.

### Hallazgos unificados (sin duplicidades)
1. Propuesta de valor ya clara (online + packs + rutas), pero la taxonomía de navegación no está cerrada para SEO+UX ("Isabelle" vs "Equipo").
2. Falta gobernanza SEO de rutas sensibles (`/zona-alumno`, `/api/zona-alumno/*`) para evitar indexación no deseada.
3. Existen páginas heredadas HTML vacías en raíz (`*.html`) que pueden generar señales débiles de calidad/indexabilidad.
4. Falta especificación de baseline KPI formal en GSC/GA4 para medir impacto real de cambios.
5. Hay buena base de conversion copy, pero falta disciplina de experimentación CTR (titles/meta) y calendarización semanal.

### Conflictos / contradicciones entre equipos
- **Copy vs UX**: Marketing pide personalización por directora; UX necesita nomenclatura más escalable en menú. Resolver con “Equipo (Dirección Isabelle)”.
- **SEO vs Producto**: Zona alumno mejora conversión, pero no debe indexarse. Resolver con noindex + exclusión en sitemap.
- **Contenido vs Técnica**: Se piden mejoras rápidas, pero sin baseline no hay atribución. Resolver con semana 1 de instrumentación mínima obligatoria.

## 2) Prioridad ejecutiva consolidada
- **P0 (0-14 días)**: indexabilidad segura, arquitectura de navegación estable, baseline y quick wins de CTR.
- **P1 (15-42 días)**: expansión controlada de contenido transaccional y semántico, mejora UX de contratación.
- **P2 (43-56 días)**: optimización avanzada (experimentos, autoridad externa y mejora continua).

## 3) Objetivo operativo 8 semanas
- Cero incidentes de indexación en rutas privadas.
- +25% clics orgánicos no branded en páginas money (`/`, `/contratar`, `/preparacion-delf-dalf`).
- +1.5 pp CTR medio en consultas transaccionales prioritarias.
- +20% conversión orgánica a lead/contratación.

## 4) Dependencias críticas
- Acceso GSC/GA4 para baseline semanal.
- Definición final de naming de navegación con Dirección.
- Aprobación legal/comercial de claims de trayectoria y precios.
- URL final de agenda de Isabelle (`NEXT_PUBLIC_ISABELLE_CALENDAR_URL`).

## 5) Regla de ejecución
- Ningún cambio entra a `main` sin:
  1. owner asignado,
  2. KPI vinculado,
  3. criterio de Done,
  4. validación QA técnica SEO.
