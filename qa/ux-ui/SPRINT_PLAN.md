# Sprint Plan (2 sprints)

## KPI marco (PM)
- KPI-1: CTR del CTA principal (`/` y `/prueba-nivel/[assessmentId]` -> `/contratar`).
- KPI-2: CVR a inicio de contratación (`visitas /contratar` sobre sesiones de intención alta).
- KPI-3: Ratio de consultas repetitivas en WhatsApp (precio/ruta/agenda).
- KPI-4: Finalización de prueba de nivel y paso a contratación.
- Baseline actual: **NO_VERIFICADO** en este entorno (medir en GA4/Vercel Analytics antes de Sprint 1 día 2).

## Sprint 1 (semana 1)
Objetivo: cerrar fricciones P0 de privacidad y conversión.

| Item | Owner | Entregable | Done | KPI objetivo semanal |
|---|---|---|---|---|
| S1-01 | Frontend | Retirar CTA pública a zona alumno y ocultar IDs en error | No existe exposición de IDs ni acceso demo desde Home | 0 incidencias de privacidad en QA |
| S1-02 | UX Writer + Frontend | Reescritura de fallback en `/contratar` sin texto técnico | Mensaje de reserva claro + CTA alternativo operativo | +15% clic en CTA de reserva cuando no hay agenda |
| S1-03 | Frontend + UX | CTA primario de resultado de prueba hacia `/contratar` | Resultado ofrece “Contratar pack recomendado” visible en móvil y desktop | +20% clic desde resultado hacia contratación |
| S1-04 | Content | Normalización ortográfica en header/home/footer/contact | Copy revisado por bloque crítico | -25% dudas repetidas por wording |
| S1-05 | QA + A11Y | Smoke manual de 6 rutas objetivo | Checklist QA firmado con evidencias | 0 blockers abiertos al cierre |

## Sprint 2 (semana 2)
Objetivo: reforzar confianza y estabilidad UX.

| Item | Owner | Entregable | Done | KPI objetivo semanal |
|---|---|---|---|---|
| S2-01 | Content + PM | Integración de reseñas reales (Google) con fuente visible | Bloque de prueba social verificable en Home/Prueba | +10% tiempo de permanencia en Home |
| S2-02 | UX/UI + Frontend | Ajuste visual de header móvil y sistema de CTA | Menú/CTA consistentes en todas las rutas clave | -15% rebote móvil en rutas de entrada |
| S2-03 | A11Y + Frontend | Skip link + focus-visible unificado + tamaños mínimos críticos | Checklist A11Y base completado | 100% navegación teclado en rutas clave |
| S2-04 | Frontend Lead | Deprecar componente legacy `Navigation.tsx` | Archivo marcado/retirado de uso | 0 referencias activas a componente legacy |
| S2-05 | QA | Plan de regresión y pre-release visual | Informe final go/no-go con capturas | 0 regressions High en release |

## Dependencias
- Reseñas reales: validación legal/editorial de texto y fuente.
- Agenda de Isabelle: disponibilidad de URL de reservas para experiencia completa.
- Métricas: acceso a GA4/Vercel Analytics y registro de contactos WhatsApp.
