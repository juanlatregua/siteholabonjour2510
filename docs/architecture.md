# Arquitectura — HolaBonjour

## Diagrama del sistema

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENTE (Browser)                     │
│  Next.js App Router (React 19 + Tailwind v4)            │
└──────────────┬──────────────────────────┬───────────────┘
               │                          │
               ▼                          ▼
┌──────────────────────┐    ┌──────────────────────────┐
│   Páginas públicas   │    │   Portales autenticados   │
│   (cinematic)        │    │   zona-alumno             │
│   examenes           │    │   zona-profesor           │
│   contratar          │    │   (NextAuth v5 JWT)       │
│   preparateurs       │    │                           │
└──────────┬───────────┘    └──────────┬────────────────┘
           │                           │
           ▼                           ▼
┌─────────────────────────────────────────────────────────┐
│                    API Routes (70+)                      │
│  /api/auth/*        NextAuth handlers                    │
│  /api/booking/*     Checkout + manual payments           │
│  /api/webhook/*     Stripe + Zoom webhooks               │
│  /api/zona-alumno/* Student CRUD                         │
│  /api/zona-profesor/* Teacher CRUD                       │
│  /api/corrections/* AI writing correction                │
│  /api/examenes/*    Exam simulators + AI analysis        │
│  /api/cron/*        Scheduled tasks (Vercel Cron)        │
└────┬──────────┬──────────┬──────────┬──────────┬────────┘
     │          │          │          │          │
     ▼          ▼          ▼          ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│Prisma 7│ │ Stripe │ │ Azure  │ │Twilio  │ │Claude  │
│  ORM   │ │  API   │ │Graph AP│ │SMS/WA  │ │  SDK   │
└───┬────┘ └────────┘ └────────┘ └────────┘ └────────┘
    │
    ▼
┌─────────────────────────────────────────────────────────┐
│              PostgreSQL (Supabase)                        │
│  28+ modelos: User, Pack, Lesson, Payment, Exam...       │
│  + Supabase Storage (materiales, facturas, audio)        │
└─────────────────────────────────────────────────────────┘
```

## Flujo de reserva de clase (inicio a fin)

```
1. Alumno visita /contratar
   └─> Selecciona nivel (A1-B2 o C1-C2) y pack de horas

2. Selecciona horario disponible
   └─> PublicSlotPicker consulta /api/booking/disponibilidad
   └─> Muestra slots libres según Availability del profesor

3. Elige método de pago
   ├─ Stripe → POST /api/booking/checkout → redirect a Stripe Checkout
   └─ Transfer/Bizum → POST /api/booking/manual → instrucciones por email

4. Pago se confirma
   ├─ Stripe: webhook checkout.session.completed
   │   ├─ Payment → CONFIRMED
   │   ├─ Pack → ACTIVE
   │   ├─ Lesson → SCHEDULED (de PENDING_PAYMENT)
   │   ├─ Crear Zoom meeting
   │   ├─ Generar factura (PDF → Supabase Storage)
   │   └─ Emails + SMS de confirmación
   └─ Manual: profesor confirma desde zona-profesor
       └─ Mismo flujo de activación

5. 24h antes de clase
   └─> Cron /api/cron/class-reminders
       └─> Email + SMS recordatorio a alumno y profesor

6. Clase completada
   └─> Profesor marca como completada desde zona-profesor
   └─> Post-class email al alumno (con grabación si disponible)
```

## Flujo de pago

```
                  ┌──────────────┐
                  │  /contratar  │
                  └──────┬───────┘
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
     ┌────────────────┐   ┌────────────────┐
     │ Stripe Checkout│   │ Manual (Bizum/ │
     │   Session      │   │  Transferencia)│
     └───────┬────────┘   └───────┬────────┘
             │                    │
             ▼                    ▼
     ┌────────────────┐   ┌────────────────┐
     │ Webhook        │   │ Profesor       │
     │ stripe/        │   │ confirma pago  │
     └───────┬────────┘   └───────┬────────┘
             │                    │
             └────────┬───────────┘
                      ▼
             ┌────────────────┐
             │ Pack ACTIVE    │
             │ Lesson SCHED.  │
             │ Zoom created   │
             │ Factura PDF    │
             │ Notificaciones │
             └────────────────┘
```

## Capas del sistema

| Capa | Responsabilidad | Ejemplo |
|------|----------------|---------|
| `app/` | Routing, layouts, pages (RSC) | `(zona-profesor)/alumnos/page.tsx` |
| `components/` | UI reutilizable | `cinematic/GlassCard.tsx` |
| `lib/` | Lógica de negocio, integraciones | `stripe.ts`, `email.ts` |
| `api/` | Endpoints HTTP | `api/webhook/stripe/route.ts` |
| `prisma/` | Schema + migraciones | `schema.prisma` |
| Supabase | PostgreSQL + Storage | Datos + archivos |
| Vercel | Hosting + Crons | Deploy + jobs programados |
