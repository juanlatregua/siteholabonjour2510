# 007 — Plan de desarrollo: Pivot SaaS

**Fecha**: 2026-03-13
**Prerequisito**: Decisión 006 aprobada

---

## Estado actual vs. objetivo

| Área | Ahora | Objetivo |
|------|-------|----------|
| Alta profesor | Manual (BD directa) | Self-registration + onboarding |
| Booking | Alumno reserva, HolaBonjour asigna profe | Alumno reserva con SU profesor directamente |
| Video | Zoom API (1 cuenta) | Free: link manual / Premium: Zoom API |
| Pagos alumno→profe | Todo vía Stripe de HolaBonjour | Free: externo / Premium: Stripe Connect |
| Pagos profe→plataforma | No existe | Stripe Subscriptions (€39/mes) |
| Perfil público | PreparateurProfile (parcial) | Perfil completo + página de booking |
| Portal profesor | zona-profesor (fijo para staff) | Multi-tenant: cada profe ve solo sus datos |
| Portal alumno | zona-alumno (fijo para staff) | Multi-tenant: alumno ve datos de su profe |

---

## Fases de implementación

### FASE 0 — Quick wins (1-2 días)
> Cero cambios de schema. Preparar el terreno.

**0.1 — Landing page para profesores**
- `src/app/profesores/page.tsx` — página de captación
- Explica el modelo: "Usa HolaBonjour gratis para gestionar tus clases de francés"
- CTA → formulario de registro (reusa /colabora como paso 1)
- SEO: "plataforma para profesores de francés", "gestión de clases de francés"

**0.2 — Automatizar pipeline de aplicación**
- `POST /api/preparateurs/apply` → crear PreparateurApplication
- Email automático al candidato (confirmación)
- Panel admin: aprobar/rechazar aplicaciones
- Al aprobar: crear User (role: TEACHER) + PreparateurProfile automáticamente

---

### FASE 1 — Self-service para profesores (3-5 días)
> El profesor se registra, configura su perfil, y empieza a dar clases.

**1.1 — Registro de profesores**

Schema changes:
```prisma
// En User, hacer coachId self-referencing más flexible
// Añadir campo para tipo de videollamada
model User {
  // ... existente ...
  videoProvider    String?  // "zoom" | "teams" | "meet" | "manual"
  videoLink        String?  // link fijo del profesor (para provider "manual")
  onboardingDone   Boolean  @default(false)
}
```

Archivos nuevos:
- `src/app/registro-profesor/page.tsx` — formulario de registro
- `src/app/registro-profesor/verificar/page.tsx` — verificar email
- `src/app/api/auth/register-teacher/route.ts` — crear cuenta profesor
- Nuevo provider en `src/lib/auth.ts`: credentials para profesores auto-registrados

Flujo:
```
/registro-profesor → email + password → verificar email → login → onboarding
```

**1.2 — Onboarding wizard**

Archivos nuevos:
- `src/app/(zona-profesor)/zona-profesor/onboarding/page.tsx`
- `src/app/(zona-profesor)/zona-profesor/onboarding/OnboardingWizard.tsx` (client)

Pasos:
1. Perfil: nombre, foto, bio, idiomas, niveles CEFR
2. Disponibilidad: selector de horarios (reusar componente existente)
3. Pricing: tarifa por hora
4. Video: elegir proveedor (pegar link de Teams/Meet o "activar Zoom premium")
5. Preview: así se verá tu perfil público

Al completar: `onboardingDone = true`, `PreparateurProfile.status = "ACTIVE"`

**1.3 — Perfil público con booking**

Archivos a modificar:
- `src/app/preparateurs/[slug]/page.tsx` — añadir sección de booking
- Reusar la lógica de `/contratar` pero scoped al profesor

El alumno puede:
1. Ver perfil del profesor
2. Ver disponibilidad
3. Reservar clase de prueba (gratis o precio trial)
4. Se crea cuenta automáticamente (magic link)

**1.4 — Multi-tenancy en zona-profesor**

Cambios en queries existentes:
- Todas las queries de `zona-profesor` ya filtran por `teacherId` del JWT → ya es multi-tenant
- Verificar que no hay queries globales sin filtro de profesor
- Dashboard: adaptar contadores al profesor autenticado

**1.5 — Video provider abstraction**

Modificar `src/lib/zoom.ts` → `src/lib/video.ts`:
```typescript
export async function createMeeting(teacher: User, opts: MeetingOpts) {
  if (teacher.videoProvider === "zoom" && isTeacherPremium(teacher)) {
    return createZoomMeeting(opts); // existente
  }
  // Para "manual": usar el link fijo del profesor
  return { joinUrl: teacher.videoLink, meetingId: null, startUrl: teacher.videoLink };
}
```

---

### FASE 2 — Subscripciones para profesores (2-3 días)
> El profesor paga suscripción mensual para features premium.

**2.1 — Stripe Subscriptions**

Schema:
```prisma
// PreparateurProfile ya tiene estos campos, usarlos:
model PreparateurProfile {
  stripeCustomerId     String?
  stripeSubscriptionId String?
  subscriptionStatus   String?  // "active" | "past_due" | "canceled" | "trialing"
}
```

Archivos nuevos:
- `src/app/api/subscriptions/checkout/route.ts` — crear Stripe Checkout (mode: subscription)
- `src/app/api/subscriptions/portal/route.ts` — Stripe Customer Portal (gestionar suscripción)
- `src/app/api/webhook/stripe/route.ts` — añadir handlers para `customer.subscription.*` events

Producto Stripe:
- "HolaBonjour Professionnel" — €39/mes, trial 14 días
- Crear en Stripe Dashboard, price ID en env var

**2.2 — Feature gating**

```typescript
// src/lib/subscription.ts
export function isTeacherPremium(teacherOrProfile: User | PreparateurProfile): boolean {
  return profile.subscriptionStatus === "active" || profile.subscriptionStatus === "trialing";
}
```

Features gated:
- Zoom automático (free = link manual)
- Grabaciones (free = no)
- Corrección IA para alumnos (free = no)
- Simuladores (free = no)
- Límite de alumnos (free = 10, premium = ilimitado)
- Analíticas avanzadas (free = básicas)

**2.3 — UI de upgrade**

- Banner en zona-profesor: "Activa Zoom, grabaciones y corrección IA — Prueba gratis 14 días"
- Página `/zona-profesor/suscripcion` con comparativa de planes
- Botón en settings para gestionar suscripción (Stripe Portal)

---

### FASE 3 — Pagos alumno→profesor (5-7 días, futuro)
> Stripe Connect para que alumnos paguen a través de la plataforma.

**3.1 — Stripe Connect Onboarding**
- El profesor conecta su cuenta bancaria vía Stripe Express
- Onboarding flow de Stripe (hosted)
- `PreparateurProfile.stripeAccountId` (Connect account)

**3.2 — Checkout con Connect**
- Alumno paga → Stripe retiene → transfiere al profesor
- Comisión de aplicación: 0% (solo comisión Stripe ~2.9%)
- O comisión HolaBonjour: 5-10% opcional

**3.3 — Dashboard de pagos para profesor**
- Ingresos, payouts, facturas
- Integración con Stripe Dashboard embebido

> **Nota**: Esta fase es OPCIONAL para el MVP. Muchos profesores prefieren cobrar por Bizum/transferencia directamente.

---

## Resumen de archivos por fase

### FASE 0 (2 archivos nuevos, 0 modificados)
| Archivo | Tipo |
|---------|------|
| `src/app/profesores/page.tsx` | Landing captación |
| `src/app/api/preparateurs/approve/route.ts` | Aprobar aplicación → crear User+Profile |

### FASE 1 (8-10 archivos nuevos, 5-6 modificados)
| Archivo | Tipo |
|---------|------|
| `src/app/registro-profesor/page.tsx` | Registro |
| `src/app/registro-profesor/verificar/page.tsx` | Verificación email |
| `src/app/api/auth/register-teacher/route.ts` | API registro |
| `src/app/(zona-profesor)/zona-profesor/onboarding/page.tsx` | Onboarding |
| `src/app/(zona-profesor)/zona-profesor/onboarding/OnboardingWizard.tsx` | Onboarding client |
| `src/lib/video.ts` | Abstracción video provider |
| **Modificar** `src/lib/auth.ts` | Nuevo provider para auto-registro |
| **Modificar** `src/app/preparateurs/[slug]/page.tsx` | Añadir booking |
| **Modificar** `prisma/schema.prisma` | videoProvider, videoLink, onboardingDone |
| **Modificar** `src/middleware.ts` | Whitelist /registro-profesor |

### FASE 2 (4-5 archivos nuevos, 3-4 modificados)
| Archivo | Tipo |
|---------|------|
| `src/app/api/subscriptions/checkout/route.ts` | Checkout suscripción |
| `src/app/api/subscriptions/portal/route.ts` | Portal Stripe |
| `src/lib/subscription.ts` | Feature gating |
| `src/app/(zona-profesor)/zona-profesor/suscripcion/page.tsx` | UI planes |
| **Modificar** `src/app/api/webhook/stripe/route.ts` | Subscription events |
| **Modificar** `src/lib/video.ts` | Gating Zoom |
| **Modificar** zona-profesor layout | Banner upgrade |

---

## Decisiones clave pendientes

1. **Teams vs link manual en tier gratis**: ¿Integrar Microsoft Graph API para crear reuniones Teams automáticamente, o simplemente dejar que el profesor pegue su link? Recomendación: **link manual para MVP**, integrar Teams después si hay demanda.

2. **Pagos alumno→profesor**: ¿Stripe Connect desde el principio o dejar que el profesor cobre externamente? Recomendación: **pago externo para MVP**, Stripe Connect en Fase 3.

3. **Límite de alumnos en free**: ¿10 es el número correcto? Tiene que ser suficiente para que sea útil pero no tanto que nunca necesiten premium.

4. **Precio premium**: €39/mes propuesto. Comparable con Calendly Pro (€12) + Zoom Pro (€14) + Teachable (€39). Pero incluye corrección IA y simuladores DELF que no existen en ningún otro sitio.

5. **Trial**: 14 días recomendado. Suficiente para que un profesor configure todo y vea el valor.

6. **Migración profesoras actuales**: Isabelle y Juan pasan a cuentas premium automáticamente (no pagan, internal staff). Mantener backward compatibility.
