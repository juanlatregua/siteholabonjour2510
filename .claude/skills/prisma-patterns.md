# Prisma Patterns — HolaBonjour

## Schema: 28+ modelos en `prisma/schema.prisma`

### Modelos principales y relaciones

**Auth (NextAuth):**
- `User` — centro del sistema. Roles: STUDENT, TEACHER, ADMIN
  - Tiene: packs, lessons (como alumno y como profesor), materials, payments, invoices
  - Campos billing: billingType, NIF, razonSocial, direccion, ciudad, CP, pais
- `Account`, `Session`, `VerificationToken` — manejados por NextAuth adapter

**Booking:**
- `Pack` — paquete de horas comprado. Status: ACTIVE/EXPIRED/EXHAUSTED/CANCELLED
  - Relación: User (student) → Pack → Lessons + Payments
  - levelRange: "A1-B2" | "C1-C2" | "diagnostico"
- `Lesson` — clase individual. Status: SCHEDULED/COMPLETED/CANCELLED/NO_SHOW/PENDING_PAYMENT
  - Relación: Student + Teacher + Pack
  - Modality: ZOOM | PRESENCIAL
  - Campos Zoom: zoomLink, zoomMeetingId, zoomStartUrl, recordingUrl
- `Payment` — pago asociado a un pack. Method: STRIPE/TRANSFER/BIZUM/OTHER
- `Availability` — horarios del profesor (dayOfWeek 0-6, startTime, endTime)
- `RecurringSlot` — clases fijas semanales (profesor + alumno + día + hora)

**Exámenes:**
- `ExamAttempt` — intento de simulacro. Scores por sección (CO, CE, PE, PO)
- `ExamSession` — convocatoria oficial (fechas, centro, tasa)
- `ExamenModelo` — examen creado por profesor (secciones como JSON)

**Correcciones IA:**
- `WritingCorrection` — corrección completa (input, scores, annotations, feedback)
- `CorrectionQuota` — cuota por email (3 gratis, luego packs de pago)
- `TeacherAnnotation` — anotación manual del profesor sobre una corrección

**Facturación:**
- `Factura` — factura fiscal. Serie "HB", numeración secuencial por año
- `Invoice` — factura legacy (número "HB-YYYY-NNNN")

**Contenido:**
- `Quiz` + `QuizQuestion` + `QuizResult` — quiz semanal Le Marché
- `Material` — archivos subidos (PDF, audio, doc). Storage en Supabase

**Marketplace:**
- `PreparateurProfile` — perfil público de preparador
- `PreparateurReview` — valoración de alumno
- `PreparateurApplication` — solicitud de preparador

## Prisma Client Singleton
```typescript
// src/lib/prisma.ts
import { PrismaClient } from '@/generated/prisma'
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }
export const prisma = globalForPrisma.prisma ?? new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

## Cómo crear y aplicar migraciones

**En local:**
```bash
# 1. Editar prisma/schema.prisma
# 2. Crear migración
npx prisma migrate dev --name descripcion-cambio
# 3. Si shadow DB falla (Supabase):
npx prisma db push
```

**En producción (Supabase):**
```bash
# Opción A: Ejecutar SQL directamente en Supabase SQL Editor
# Copiar el SQL de prisma/migrations/YYYYMMDD_nombre/migration.sql

# Opción B: Desde CLI con DATABASE_URL de producción
npx prisma db push
```

**Inspeccionar datos:**
```bash
npx prisma studio  # Abre navegador en localhost:5555
```

## Reglas
- SIEMPRE generar migración después de cambiar el schema
- NUNCA editar `src/generated/prisma/` — se regenera automáticamente
- NUNCA borrar migraciones ya aplicadas en producción
- Usar `prisma db push` cuando shadow DB falla (normal en Supabase)
- Los modelos `Account`, `Session`, `VerificationToken` son de NextAuth — no modificar estructura
- JSON fields (answers, annotations, secciones) — validar con Zod antes de guardar
