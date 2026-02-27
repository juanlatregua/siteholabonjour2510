# Accessibility Report (Práctico)

## Alcance
- Rutas: `/`, `/contratar`, `/preparacion-delf-dalf`, `/prueba-nivel`, `/prueba-nivel/[assessmentId]`, `/contact`, `/zona-alumno`.
- Fuentes: revisión de código (`src/app`, `src/components`) + contraste heurístico.
- Estado de ejecución con navegador real/lector pantalla: **NO_VERIFICADO** en este entorno.

## Hallazgos

| ID | Severidad | Ruta/Archivo | Hallazgo | Riesgo UX/A11Y | Acción concreta |
|---|---|---|---|---|---|
| A11Y-001 | High | Global (`src/components/Header.tsx`) | No hay skip link visible para saltar al contenido principal. | Navegación por teclado lenta/repetitiva. | Añadir enlace `Saltar al contenido` visible al foco, apuntando a `main#contenido`. |
| A11Y-002 | Medium | Header notice (`src/components/Header.module.css`) | Texto de aviso en `0.7rem` y `0.66rem` en móvil. | Legibilidad reducida y esfuerzo cognitivo alto. | Elevar a mínimo equivalente a `text-xs` legible y aumentar contraste percibido. |
| A11Y-003 | Medium | Prueba nivel (`src/components/AssessmentFlow.tsx`) | Uso intensivo de `text-xs`/`text-[11px]` en pasos, progreso y estados. | Información clave difícil de leer en móvil y zoom 200%. | Subir tamaños en elementos críticos (progreso, estado guardado, labels). |
| A11Y-004 | Medium | Global links/buttons | Foco visible no unificado en links y botones globales. | Usuarios teclado no identifican contexto activo de forma consistente. | Definir estilo `:focus-visible` común para enlaces y CTA. |
| A11Y-005 | High | `/zona-alumno` (`src/app/zona-alumno/page.tsx:36`) | Error muestra IDs de alumnos. | Fuga de información + patrón de error inseguro. | Sustituir por mensaje genérico y canal de recuperación de acceso. |
| A11Y-006 | Medium | `/prueba-nivel/[assessmentId]` sticky mobile | Barra sticky inferior puede competir visualmente con contenido en pantallas pequeñas. | Posible ocultación de contenido y fatiga visual. | Validar en 320px/375px y ajustar espaciado inferior dinámico. |

## Checklist WCAG práctica
- Contraste en gradientes (texto pequeño): pendiente validación automática.
- Navegación por teclado end-to-end: pendiente.
- Etiquetas y labels en formularios: correcto en input de alias y slider audio.
- Semántica de encabezados: estructura base correcta (h1/h2 en páginas clave).

## NO_VERIFICADO
- Validación con lector de pantalla (VoiceOver/NVDA).
- Auditoría automática (axe/Lighthouse) en deployment real.
