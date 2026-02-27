# Go / No-Go

## Decisión actual
**NO-GO (condicional)** para release orientada a conversión, hasta cerrar P0.

## Bloqueadores P0
1. `/zona-alumno` y su patrón de error exponen información no alineada con “área no pública”.
2. `/prueba-nivel/[assessmentId]` no cierra comercialmente con CTA directo a contratación.
3. `/contratar` muestra fallback técnico cuando falta agenda, generando fricción y pérdida de confianza.

## Condiciones de Go
- C1: Eliminada exposición pública de zona alumno (incluyendo enumeración de IDs).
- C2: Resultado de prueba con CTA primario `Contratar pack recomendado`.
- C3: Fallback de contratación redactado en lenguaje de negocio y con siguiente paso inequívoco.
- C4: Smoke QA mobile + desktop completado sin Blocker/High abiertos.
- C5: Revisión A11Y mínima (skip link + foco visible + legibilidad crítica) aprobada.

## Riesgo si se libera sin P0
- Incremento de abandono en paso de decisión.
- Pérdida de confianza por señales de “área privada abierta”.
- Más consultas repetitivas por WhatsApp por falta de claridad operativa.

## Responsable de aprobación final
- Design/Frontend Lead + Product Manager + QA Lead.
