# Findings By Role

## 1) UX/UI Designer
- P0: La ruta no pública `/zona-alumno` sigue visible desde Home mediante CTA demo (`src/app/page.tsx:182`), lo que rompe expectativa de área privada.
- P0: En `/prueba-nivel/[assessmentId]` el paso final no conecta con compra inmediata; hay salto cognitivo de “resultado” a “plan” sin acción comercial directa (`src/components/AssessmentFlow.tsx:747`).
- P1: Header añade banda superior + barra sticky + CTA adicional, aumentando densidad visual en móvil (`src/components/Header.tsx:42-76`, `src/components/Header.module.css`).
- P1: Repetición de bloques de confianza y pricing entre Home, Preparación y Contacto sin patrón visual único.
- P2: Unificar sistema de tarjetas y espaciado vertical para reducir percepción de “pantalla larga” en móvil.

## 2) Content Designer / UX Writer
- P0: Mensaje de contratación depende de variable técnica (`NEXT_PUBLIC_ISABELLE_CALENDAR_URL`) visible al usuario final (`src/app/contratar/page.tsx:99-102`).
- P0: En flujo de prueba, falta texto de cierre “qué ocurre ahora” ligado a contratación del pack.
- P1: Copy con faltas de acentuación (“Preparacion”, “conversacion”, “academica”) en navegación y secciones críticas (`Header.tsx`, `Footer.tsx`, `page.tsx`).
- P1: CTA “Reservar orientacion” no explicita canal/tiempo de respuesta en contexto de alta intención.
- P2: Añadir microcopy anti-fricción para dudas repetidas (precio, modalidad, siguiente paso) en Home y Contratar.

## 3) Frontend Engineer
- P0: Exposición de zona alumno sin control en UI pública (`src/app/page.tsx:182`, `src/app/zona-alumno/page.tsx`).
- P1: Componente legado no alineado con arquitectura actual (`src/components/Navigation.tsx`), riesgo de uso accidental con patrones obsoletos.
- P1: Dependencia de env para agenda sin componente alternativo de UX estable.
- P1: En sticky mobile de prueba se usan contenedores duplicados por step; conviene componente compartido para evitar drift (`AssessmentFlow.tsx:614`, `:700`).
- P2: Consolidar tokens tipográficos/espaciado para coherencia global (actual mezcla Tailwind + CSS modules puntuales).

## 4) QA (manual + automation)
- Blocker: flujo “Home -> Contratar -> Reserva/Calendario” queda incompleto sin URL de agenda (fallback a contacto sin confirmación de disponibilidad real).
- High: flujo “Home -> Prueba -> Resultado -> Contratar” no es directo (pérdida de conversión).
- High: `/zona-alumno` es accesible por URL directa y presenta estructura de datos de alumno demo.
- Medium: no hay suite E2E automatizada para regresión de rutas críticas.
- Estado verificación runtime: **NO_VERIFICADO** en dominio por error DNS del entorno de auditoría.

## 5) Accessibility Specialist
- P0: no existe skip link visible para salto a contenido principal en header actual (navegación por teclado más lenta).
- P1: varios textos en tamaño muy pequeño (`text-xs`, `text-[11px]`) sobre gradientes pueden degradar legibilidad (`AssessmentFlow.tsx`, `Header.module.css .notice`).
- P1: estados de foco no definidos de forma consistente para links/botones globales (solo inputs tienen foco reforzado explícito).
- P1: en `/zona-alumno`, mensaje de error devuelve IDs disponibles (`page.tsx:36`), problema de privacidad y UX de error.
- P2: revisar contraste real con auditoría automática en navegador (axe/Lighthouse) pendiente.

## 6) Product Manager
- Prioridad negocio inmediata:
  1. Cerrar exposición de `/zona-alumno` y eliminar señal de "área privada abierta".
  2. Hacer lineal la contratación tras resultado de prueba.
  3. Reescribir microcopy de precio/ruta/siguiente paso para reducir consultas repetitivas.
- KPI foco:
  - CTR de CTA principal “Contratar pack”
  - CVR de sesión orgánica/directa a “inicio contratación”
  - ratio de contactos repetitivos por WhatsApp

## 7) Design/Frontend Lead (aprobación final)
- Resolución de conflicto UX vs negocio: mantener historia de academia física, pero con jerarquía clara para oferta online actual.
- Criterio de aprobación:
  - P0 cerrados (privacidad + contratación directa + copy crítico)
  - checklist A11Y básico validado
  - QA smoke mobile/desktop en rutas objetivo
- Estado actual: **NO-GO** condicionado a cierre de P0.
