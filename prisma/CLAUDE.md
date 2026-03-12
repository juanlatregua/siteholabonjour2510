# Prisma Schema — NO MODIFICAR SIN MIGRACIÓN

## 28+ modelos en schema.prisma

### Grupos de modelos

**Auth (NextAuth — NO tocar estructura):**
- Account, Session, VerificationToken — manejados por PrismaAdapter
- User — roles: STUDENT/TEACHER/ADMIN, campos billing, passwordHash

**Booking:**
- Pack — paquete de horas (ACTIVE/EXPIRED/EXHAUSTED/CANCELLED)
- Lesson — clase individual (SCHEDULED/COMPLETED/CANCELLED/NO_SHOW/PENDING_PAYMENT)
- Payment — pago (STRIPE/TRANSFER/BIZUM/OTHER)
- Availability — horarios del profesor
- RecurringSlot — clases fijas semanales

**Exámenes:**
- ExamAttempt — intento de simulacro con scores por sección
- ExamSession — convocatoria oficial
- ExamenModelo — examen creado por profesor (secciones JSON)

**Correcciones IA:**
- WritingCorrection — corrección completa (scores, annotations, feedback)
- CorrectionQuota — cuota por email (3 free + paid packs)
- TeacherAnnotation — anotación manual sobre corrección

**Facturación:**
- Factura — factura fiscal española (serie HB, secuencial por año)
- Invoice — factura legacy

**Contenido:**
- Quiz, QuizQuestion, QuizResult — quiz semanal
- Material — archivos de clase (storage en Supabase)
- NewsletterSubscriber

**Marketplace:**
- PreparateurProfile, PreparateurReview, PreparateurApplication

**Otros:**
- Review — valoración de clase
- Lead — contacto/lead de marketing
- StripeEvent — idempotencia de webhooks
- ZoomEvent — eventos de Zoom

### Relaciones críticas
```
User ──< Pack ──< Lesson >── User (teacher)
Pack ──< Payment
Lesson ──< Material
Lesson ──< Review
User ──< WritingCorrection
WritingCorrection ──< TeacherAnnotation
Payment ──< Factura
```

### Reglas
- SIEMPRE crear migración después de cambiar el schema
- NUNCA editar migraciones ya aplicadas en producción
- Campos nuevos en tablas con datos → opcionales (`?`) o con default
- Regenerar cliente: `npx prisma generate`
- JSON fields: validar con Zod antes de escribir
- Shadow DB falla en Supabase → usar `prisma db push`
