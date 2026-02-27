# QA Bugs (Manual + Automation)

## Estado general
- Smoke runtime en deployment público: **NO_VERIFICADO** (DNS no resolvía desde el entorno de auditoría).
- Validación funcional principal realizada sobre código fuente.
- Automation E2E: **NO_VERIFICADO** (no hay suite Playwright/Cypress en `package.json`).

| ID | Severidad | Flujo | Ruta | Pasos de reproducción | Resultado actual | Resultado esperado | Evidencia |
|---|---|---|---|---|---|---|---|
| QA-001 | Blocker | Home -> Zona alumno | `/` -> `/zona-alumno?alumno=demo` | 1) Abrir Home 2) Pulsar “Ver zona alumno demo” | Área de alumno accesible sin gate | Área no pública, acceso controlado | `src/app/page.tsx:182` |
| QA-002 | High | Error de acceso zona alumno | `/zona-alumno?alumno=xxx` | 1) Cambiar query `alumno` a valor inválido | Muestra “IDs disponibles: ...” | Mensaje genérico, sin enumerar IDs | `src/app/zona-alumno/page.tsx:36` |
| QA-003 | High | Contratación con agenda no configurada | `/contratar` | 1) Abrir ruta sin env de agenda | Mensaje técnico con nombre de variable | Mensaje de negocio + alternativa de reserva | `src/app/contratar/page.tsx:99-102` |
| QA-004 | High | Prueba -> Conversión | `/prueba-nivel/[assessmentId]` | 1) Completar intento 2) Ver resultado | CTA lleva solo a plan académico | CTA primario a contratación del pack | `src/components/AssessmentFlow.tsx:747` |
| QA-005 | Medium | Claridad de marca | Global | Revisar navegación/hero/footer | Copy con faltas ortográficas en textos clave | Copy profesional consistente en ES | `Header.tsx`, `Footer.tsx`, `page.tsx` |
| QA-006 | Medium | A11Y lectura móvil | Header/Assessment | Revisar textos pequeños en móvil | Varios labels en `text-xs`/`11px` | Tamaño mínimo legible en elementos críticos | `Header.module.css`, `AssessmentFlow.tsx` |
| QA-007 | Low | Deuda de UI | N/A | Revisar componentes no usados | Existe componente legacy incompatible | Eliminar/deprecar para evitar uso accidental | `src/components/Navigation.tsx` |

## Recomendación QA inmediata
1. Ejecutar smoke manual real en móvil (iOS/Android) y desktop tras cierre de P0.
2. Añadir E2E mínimo:
   - `Home -> Contratar -> fallback/agenda`
   - `Home -> Prueba -> Resultado -> Contratar`
3. Añadir checklist visual de release con capturas por ruta crítica.
