# Copy Rewrite (Antes vs Después)

## Objetivo
Reducir duda en contratación, reforzar confianza real y filtrar preguntas repetitivas por WhatsApp.

| Ruta/Componente | Antes | Después (propuesto) | Impacto |
|---|---|---|---|
| Header nav (`src/components/Header.tsx`) | `Preparacion y conversacion` | `Preparación y conversación` | Mejora credibilidad inmediata y consistencia lingüística. |
| Header notice (`src/components/Header.tsx:43`) | `Isabelle Guitton, directora academica y docente · Zoom + entorno digital · Pack 4h desde 140€` | `Clases online con Isabelle Guitton · Pack 4h desde 140€ · Preparación DELF/DALF o conversación` | Mensaje más escaneable en 3 bloques de valor. |
| Home hero CTA secundaria (`src/app/page.tsx:63`) | `Reservar orientacion` | `Reservar orientación (15 min)` | Reduce ambigüedad sobre tipo de acción. |
| Home trust block (`src/app/page.tsx`) | `Trayectoria activa desde 2017` | `Desde 2017 formando alumnado en francés (antes presencial en Málaga, hoy 100% online)` | Conecta pasado físico con modelo actual. |
| Home reseñas (`src/components/TrustReviews.tsx`) | Reseñas sintéticas sin fuente | `Valoración real de alumnos en Google` + enlace al perfil Google Business + 3 extractos verificables | Refuerza prueba social verificable. |
| Contratar fallback (`src/app/contratar/page.tsx:99`) | Mensaje técnico con variable `NEXT_PUBLIC_ISABELLE_CALENDAR_URL` | `La agenda online se está actualizando. Mientras tanto, reserva por WhatsApp o email y te confirmamos hueco en <24h laborables.` | Evita lenguaje técnico y mejora confianza operativa. |
| Resultado prueba (`src/components/AssessmentFlow.tsx`) | CTA: `Ver plan recomendado` | CTA primario: `Contratar pack recomendado` + CTA secundario `Ver plan detallado` | Cierra flujo comercial tras alta intención. |
| Contacto (`src/app/contact/page.tsx`) | `Siguiente paso: reserva orientacion y plan personalizado.` | `Siguiente paso: te orientamos y te proponemos ruta + pack en 24h laborables.` | Define promesa de respuesta concreta. |
| Zona alumno error (`src/app/zona-alumno/page.tsx`) | `IDs disponibles: ...` | `No hemos podido abrir tu zona de alumno. Escríbenos y te enviamos acceso.` | Elimina fuga de información y mantiene soporte. |

## Microcopy de soporte (FAQ corta sugerida)
- `¿Qué incluye el pack de 4 horas?` -> `Sesiones por Zoom, objetivos por clase y material en tu entorno digital.`
- `¿Qué pack necesito?` -> `A1-B2: 140€ · C1-C2: 200€. Si dudas, hacemos orientación previa.`
- `¿Cuándo empiezo?` -> `En cuanto reserves, te proponemos primer hueco disponible.`
- `¿Preparación o conversación?` -> `Puedes elegir una ruta o combinar ambas según objetivo.`

## NO_VERIFICADO
- Extractos exactos de reseñas reales pendientes de validación manual en Google Business para evitar citar texto no autorizado.
