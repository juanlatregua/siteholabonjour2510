# Prisma Schema — NO MODIFICAR SIN MIGRACIÓN

## 30+ modelos en schema.prisma

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

**Marketplace / SaaS profesores:**
- PreparateurProfile — perfil público del profesor (slug, bio, tarifa, niveles, badge verificado). Tiene campos Stripe Connect preparados (stripeCustomerId, stripeSubscriptionId, subscriptionStatus)
- PreparateurReview — reseñas de alumnos sobre profesores
- PreparateurApplication — candidatura de profesor FLE (extendida: telefono, nivelFrances, titulacion, especialidades, motivacion, archivos, rejectionReason). Status: PENDING/APPROVED/REJECTED

**Chat y notificaciones:**
- Conversation — conversación alumno-profesor (unique por par studentId+teacherId)
- Message — mensaje individual con readAt para unread tracking
- PushSubscription — suscripción Web Push por usuario (endpoint + keys VAPID)

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
User ──< Conversation (student) ──< Message
User ──< Conversation (teacher)
User ──< PushSubscription
User ──1 PreparateurProfile ──< PreparateurReview
```

### Flujo de candidatura profesor
```
/colabora (formulario) → PreparateurApplication (status: PENDING)
  → /zona-profesor/candidaturas (admin revisa)
  → PATCH /api/zona-profesor/candidaturas/[id] { action: "approve" }
  → Crea User (role: TEACHER) + PreparateurProfile (status: ACTIVE)
  → Email con credenciales temporales
```

### Reglas
- SIEMPRE crear migración después de cambiar el schema
- NUNCA editar migraciones ya aplicadas en producción
- NUNCA usar `prisma db push` en producción — usar migraciones manuales SQL + `prisma migrate resolve --applied`
- Campos nuevos en tablas con datos → opcionales (`?`) o con default
- Regenerar cliente: `npx prisma generate`
- JSON fields: validar con Zod antes de escribir
- Migraciones en `prisma/migrations/YYYYMMDD_nombre/migration.sql`
