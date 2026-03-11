# HolaBonjour -- Knowledge Base

> Enciclopedia completa del proyecto. Referencia para desarrolladores humanos e IA.
> Ultima actualizacion: 2026-03-10

---

## 1. Resumen del proyecto

**HolaBonjour** es una academia de frances online con sede en Malaga, operada por **HBTJ Consultores Linguisticos S.L.** La plataforma conecta a estudiantes hispanohablantes con profesores nativos o bilingues para clases particulares de frances por Zoom.

### Audiencia objetivo
- Estudiantes espanoles (adultos) que preparan examenes oficiales DELF/DALF
- Profesionales que necesitan frances para negocios
- Estudiantes que quieren clases de conversacion

### Modelo de negocio
- **Packs de 4 clases** de 55 min por Zoom (150 EUR nivel A1-B2, 200 EUR nivel C1-C2)
- **Sesion diagnostico** de 30 min (25 EUR)
- **Correcciones IA** de expresion escrita: 3 gratis, luego 2.90 EUR/unidad o 19 EUR/10 unidades
- **Examenes simulacro** DELF/DALF gratuitos (funnel de captacion)
- **Marketplace de preparateurs** (en desarrollo): profesores externos con perfil propio

### Entidad legal
- Razon social: HBTJ Consultores Linguisticos S.L.
- Banco: BBVA (IBAN ES66 0182 3370 67 0201616991)
- Bizum: 654 366 320
- Contacto: info@holabonjour.es / 685 070 304

---

## 2. Stack tecnico

| Tecnologia | Version | Uso |
|---|---|---|
| **Next.js** | 15.5 | Framework full-stack (App Router) |
| **React** | 19 | UI library |
| **TypeScript** | 5.x | Tipado estatico |
| **Tailwind CSS** | 4.x | Estilos (+ inline styles, CSS Modules solo en Footer/Header) |
| **PostgreSQL** | - | Base de datos (Supabase-hosted) |
| **Prisma** | 7.4 | ORM (37 modelos) |
| **NextAuth** | 5.0.0-beta.30 | Autenticacion (magic link + credentials) |
| **Stripe** | 20.4 | Pagos online (checkout sessions + webhooks) |
| **Azure AD / Microsoft Graph** | - | Envio de emails transaccionales |
| **Twilio** | REST API (sin SDK) | SMS y WhatsApp |
| **Zoom** | Server-to-Server OAuth | Videoconferencias para clases |
| **Anthropic Claude** | SDK 0.78 | Correcciones IA de escritura + analisis de examenes |
| **Supabase** | SDK 2.98 | Storage (archivos, PDFs, audio) |
| **Zod** | 4.3 | Validacion de schemas |
| **date-fns** | 4.1 | Formateo de fechas |
| **jspdf** | 4.2 | Generacion de facturas/recibos PDF |
| **bcryptjs** | 3.0 | Hash de passwords para profesores |
| **lucide-react + react-icons** | - | Iconos |
| **react-hook-form** | 7.71 | Formularios |
| **react-dropzone** | 15.0 | Upload de archivos |
| **react-slick** | 0.30 | Carrusel/slider |
| **xlsx** | 0.18 | Exportacion Excel (contabilidad) |
| **Vercel** | - | Deploy + Crons |
| **@vercel/analytics** | 1.6 | Analytics |
| **@vercel/speed-insights** | 1.3 | Performance monitoring |

### NO instalados (no usar)
drizzle-orm, resend, supabase SDK (server-side), redis, ioredis, shadcn/ui, Radix, MUI, SendGrid, Cloudinary, Vercel Blob, S3

---

## 3. Estructura de carpetas

```
HolaBonjour/
├── prisma/
│   ├── schema.prisma              # 37 modelos (definicion de BD)
│   ├── migrations/                # Migraciones SQL
│   └── seed.ts                    # Script de seed
├── public/
│   ├── images/                    # Logos, fotos, assets publicos
│   ├── examenes/audio/{NIVEL}/    # Audio oficial FEI para simulacros
│   └── assets/                    # Otros recursos estaticos
├── scripts/
│   ├── project-map.sh             # Mapeo de proyecto (ejecutar al inicio)
│   ├── seed-teacher-passwords.ts  # Seed de passwords de profesores
│   └── sync-fei-resources.mjs     # Sincronizacion recursos FEI
├── src/
│   ├── app/
│   │   ├── (cinematic)/           # Paginas publicas — fondo claro (#faf7f2)
│   │   ├── (public)/              # Le Cote Vie — contenido cultural
│   │   ├── (auth)/                # Login, verify-email, error
│   │   ├── (zona-alumno)/         # Portal del alumno (auth requerida)
│   │   ├── (zona-profesor)/       # Portal del profesor (role TEACHER/ADMIN)
│   │   ├── examenes/              # Motor de examenes (layout propio)
│   │   ├── preparateurs/          # Perfiles de marketplace
│   │   ├── preguntas-frecuentes/  # FAQ
│   │   └── api/                   # API routes (ver seccion 7)
│   ├── components/
│   │   ├── cinematic/             # Componentes publicos (GlassCard, GoldButton...)
│   │   ├── zona/                  # Componentes de portal (ZonaSidebar, ZonaTopbar, LessonCard...)
│   │   ├── correction/            # UI de correcciones IA
│   │   ├── booking/               # PublicSlotPicker, BookingSlotPicker
│   │   ├── assessment/            # UI de assessment/quiz
│   │   ├── chat/                  # Componentes de chat
│   │   ├── exam/                  # UI de examenes
│   │   ├── examenes/              # Componentes de examenes (espanol)
│   │   ├── ui/                    # Componentes base
│   │   ├── le-cinema/             # Componentes Le Cinema
│   │   ├── la-cuisine/            # Componentes La Cuisine
│   │   └── le-jeu/                # Componentes Le Jeu
│   ├── lib/
│   │   ├── auth.ts                # NextAuth config completa (providers + callbacks)
│   │   ├── auth.config.ts         # Config edge-compatible (JWT + session callbacks)
│   │   ├── auth-helpers.ts        # requireAuth, requireTeacher, requireStudent, getCurrentUser
│   │   ├── prisma.ts              # Prisma client singleton
│   │   ├── stripe.ts              # Stripe helpers + PACK_PRICES + CORRECTION_PACK_PRICES
│   │   ├── brand.ts               # Design tokens (brand, vie, dashboard, cinematic, scenes, fonts)
│   │   ├── constants.ts           # BANK, PRICING, TEACHER_EMAILS, CONTACT
│   │   ├── azure-mail.ts          # Email via Microsoft Graph API
│   │   ├── email.ts               # Templates de email transaccional
│   │   ├── sms.ts                 # Twilio SMS/WhatsApp
│   │   ├── sms-templates.ts       # Plantillas SMS (max 160 chars)
│   │   ├── zoom.ts                # Zoom Server-to-Server OAuth + CRUD meetings
│   │   ├── ics.ts                 # Generacion de archivos .ics (calendario)
│   │   ├── supabase.ts            # Supabase client (service role, storage)
│   │   ├── teacher.ts             # Utilidades de profesor (getDefaultTeacher)
│   │   ├── student-zone-db.ts     # Helpers DB para portal alumno
│   │   ├── factura.ts             # Generacion de facturas formales
│   │   ├── post-class.ts          # Flujo post-clase
│   │   ├── zoom-webhook.ts        # Handler de webhooks de Zoom
│   │   ├── cron-auth.ts           # Validacion de auth para cron jobs
│   │   ├── assessment-engine.ts   # Motor de assessment
│   │   ├── delf-dalf.ts           # Datos DELF/DALF
│   │   ├── faq-content.ts         # Contenido FAQ
│   │   ├── fei-resources.ts       # Recursos FEI
│   │   ├── level-content.ts       # Contenido por nivel
│   │   ├── correction/            # Motor de correccion IA (rubricas, prompts, scoring)
│   │   ├── examenes/              # Datos de examenes + tipos
│   │   │   └── data/{NIVEL}-exemple{N}.ts
│   │   ├── assessment/            # Utilidades de assessment
│   │   └── chat/                  # Logica de chat/conversacion
│   └── generated/prisma/          # Prisma client generado (no tocar)
├── vercel.json                    # Configuracion crons
├── package.json
├── tsconfig.json
├── CLAUDE.md                      # Instrucciones del proyecto
└── knowledge-holabonjour.md       # Este archivo
```

---

## 4. Modelos Prisma (37 totales)

### Autenticacion (NextAuth)

| Modelo | Campos clave | Notas |
|---|---|---|
| **User** | id, email, name, role, passwordHash, level, route, phone, active, coachId, billing* | Roles: STUDENT, TEACHER, ADMIN. Coach = profesor asignado |
| **Account** | userId, provider, providerAccountId | OAuth accounts |
| **Session** | sessionToken, userId, expires | Sesiones (no usado con JWT strategy) |
| **VerificationToken** | identifier, token, expires | Magic link tokens |

**Campos de facturacion en User**: billingType, billingNif, billingRazonSocial, billingDireccion, billingCiudad, billingCP, billingPais, billingContacto, billingEmail

### Reservas y Clases

| Modelo | Campos clave | Notas |
|---|---|---|
| **Pack** | studentId, hoursTotal, hoursUsed, price, levelRange, status | Status: ACTIVE, EXPIRED, EXHAUSTED, CANCELLED. Ej: 4 horas, A1-B2 |
| **Lesson** | studentId, teacherId, packId, scheduledAt, durationMinutes, zoomLink, zoomMeetingId, zoomStartUrl, status | Status: SCHEDULED, COMPLETED, CANCELLED, NO_SHOW, PENDING_PAYMENT |
| **Availability** | teacherId, dayOfWeek (0-6), startTime, endTime, active | Horarios semanales del profesor |
| **Material** | lessonId, studentId, uploadedById, type, title, storagePath | Tipos: PDF, AUDIO, DOC, NOTE. Storage en Supabase |

**Campos extra en Lesson**:
- Zoom recording: recordingUrl, recordingPassword, recordingReadyAt
- Attendance: teacherJoinedAt, teacherLeftAt, studentJoinedAt, studentLeftAt, actualDurationMin, attendanceSource
- Post-class: postClassEmailSentAt
- Cancellation: cancellationRequestedAt

### Pagos y Facturas

| Modelo | Campos clave | Notas |
|---|---|---|
| **Payment** | studentId, packId, amount, method, status, stripeSessionId, stripePaymentId | Methods: STRIPE, TRANSFER, BIZUM, OTHER. Status: PENDING, CONFIRMED, REJECTED, REFUNDED |
| **Invoice** | number (HB-2026-0001), paymentId, concept, baseAmount, ivaRate (21%), ivaAmount, totalAmount | Recibo simplificado |
| **Factura** | numero, serie (HB), anio, secuencial, clienteNif, baseImponible, tipoIva, cuotaIva, total, estado | Factura formal completa (emitida, anulada). Incluye datos fiscales del cliente |
| **StripeEvent** | id (evt_...) | Idempotencia de webhooks |

### Examenes y Simulacros

| Modelo | Campos clave | Notas |
|---|---|---|
| **ExamAttempt** | userId, examenId, nivel, scores (CO/CE/PE/PO), totalScore, passed, status, answers (JSON), aiAnalysis | Intentos de simulacro DELF/DALF |
| **ExamSession** | examType (DELF/DALF/EOI), level, center, city, province, dates, fee | Calendario de convocatorias oficiales |
| **ExamReminder** | userId, examSessionId, reminderType | Tipos: REGISTRATION_OPEN, REGISTRATION_CLOSING, EXAM_WEEK |
| **ExamenModelo** | titulo, nivel, diploma, secciones (JSON), status, esPago, precio | Modelos de examen creados por profesores. Status: DRAFT, REVIEW, PUBLISHED |

### Correcciones IA

| Modelo | Campos clave | Notas |
|---|---|---|
| **WritingCorrection** | userId, candidateEmail, level, taskType, inputText, globalScore, maxScore, annotations (JSON), status | Status: PENDING, PROCESSING, COMPLETED, ERROR |
| **CorrectionQuota** | email, freeUsed, freeLimit (3), paidRemaining | Cuotas por email (3 gratis) |
| **TeacherAnnotation** | correctionId, teacherId, content, scoreOverride (JSON) | Anotaciones manuales del profesor sobre correcciones IA |

### Assessments y Quizzes

| Modelo | Campos clave | Notas |
|---|---|---|
| **AssessmentLink** | userId, attemptId, assessmentId | Vincula usuario con su intento de assessment |
| **AssessmentAttempt** | assessmentId, attemptToken, candidateId, status, result (JSON) | Prueba de nivel |
| **AssessmentAttemptAnswer** | attemptId, questionId, selectedOptionId, isCorrect, pointsAwarded | Respuestas individuales |
| **Quiz** | weekNumber, year, theme, title | Le Marche: quiz semanal |
| **QuizQuestion** | quizId, text, textFr, options (JSON), correctIdx, order | Preguntas del quiz |
| **QuizResult** | quizId, name, email, score, timeMs | Resultados de participantes |

### Marketplace (Preparateurs)

| Modelo | Campos clave | Notas |
|---|---|---|
| **PreparateurProfile** | userId, slug, displayName, bio, languages, specialties, levels, hourlyRate (cents), status | Status: PENDING, ACTIVE, SUSPENDED |
| **PreparateurReview** | preparateurId, studentId, lessonId, rating (1-5), source | Sources: platform, google |
| **PreparateurApplication** | name, email, levels, experience, hourlyRate, status | Status: PENDING, APPROVED, REJECTED |

### Contenido y Leads

| Modelo | Campos clave | Notas |
|---|---|---|
| **NewsletterSubscriber** | email, name, active | Suscriptores a newsletter |
| **Review** | lessonId, studentId, rating (1-5), comment, token | Resenas post-clase. Token unico para link anonimo |
| **Lead** | name, email, phone, objetivo, message, source | Leads del formulario de contacto |
| **ZoomEvent** | id, type, meetingId, payload | Log de eventos Zoom webhook |

### Relaciones clave
```
User 1--N Pack (student)
User 1--N Lesson (student + teacher)
User 1--N Payment (student)
User 1--N Availability (teacher)
User 1--N Material (student + uploadedBy)
User 1--1 PreparateurProfile
User 1--N ExamAttempt
Pack 1--N Lesson
Pack 1--N Payment
Lesson 1--N Material
Lesson 1--1 Review
Payment 1--1 Invoice
WritingCorrection 1--N TeacherAnnotation
ExamAttempt 1--N WritingCorrection
Quiz 1--N QuizQuestion
Quiz 1--N QuizResult
User (coach) 1--N User (students) [self-relation]
```

---

## 5. Autenticacion y roles

### Roles

| Rol | Acceso | Login method |
|---|---|---|
| **STUDENT** | `/zona-alumno/*` | Magic link por email |
| **TEACHER** | `/zona-profesor/*` + `/zona-alumno/*` | Credentials (email + password) |
| **ADMIN** | Todo (= TEACHER con mas privilegios) | Credentials |

### Flujo de autenticacion

**Alumnos (magic link)**:
1. Alumno introduce email en `/iniciar-sesion`
2. Se envia magic link via Azure Graph API (Microsoft 365)
3. Link valido 10 minutos
4. Al hacer clic, NextAuth verifica token y crea sesion JWT
5. Redirect a `/zona-alumno`

**Profesores (credentials)**:
1. Profesor introduce email + password en `/iniciar-sesion`
2. Se busca usuario con role TEACHER/ADMIN
3. Se compara password con hash (primero DB `passwordHash`, fallback env var `TEACHER_PASSWORD_HASH_{NAME}`)
4. Si valido, crea sesion JWT
5. Redirect a `/zona-profesor`

### Configuracion NextAuth
- **Strategy**: JWT (no database sessions)
- **Session duration**: 30 dias (default)
- **Pages**: `/iniciar-sesion`, `/verificar-email`, `/error`
- **Adapter**: PrismaAdapter (para magic link tokens)
- **Auth config split**: `auth.config.ts` (edge-compatible, shared con middleware) + `auth.ts` (full config con providers)

### Middleware (`src/middleware.ts`)

**Flujo de la request**:
1. Legacy redirects (.html pages, /phone/, /tablet/) -> 301
2. Public paths, static files, public APIs -> allow without auth
3. Auth pages (`/iniciar-sesion`, etc.) -> redirect authenticated users to their zone
4. Not logged in -> redirect to `/iniciar-sesion?callbackUrl=...`
5. `/zona-profesor/*` -> require TEACHER or ADMIN role
6. Everything else -> allow authenticated users

**Paths publicos**:
`/`, `/prueba-nivel`, `/preparacion-delf-dalf`, `/contratar`, `/contacto`, `/cursos`, `/empresas`, `/opiniones`, `/preguntas-frecuentes`, `/aviso-legal`, `/politica-de-privacidad`, `/politica-de-cookies`, `/recursos`, `/le-marche`, `/la-carte`, `/le-cinema`, `/la-cuisine`, `/le-mot-du-jour`, `/le-jeu`, `/tarifas`, `/frances-empresas`, `/blog`, `/sobre-nosotros`, `/correccion-ia`, `/examen-delf-a1`, `/examen-delf-a2`, `/examenes`, `/calendario-examenes`, `/preparateurs`, `/unirse`, `/colabora`, `/confirmacion`, `/opinion`

**APIs publicas**:
`/api/auth/*`, `/api/assessments/*`, `/api/leads/*`, `/api/le-marche/*`, `/api/le-mot-du-jour/*`, `/api/corrections/*`, `/api/exams/*`, `/api/examenes/*`, `/api/debug/*`, `/api/public/*`, `/api/booking/*`, `/api/webhook/*`, `/api/cron/*`, `/api/contabilidad/*`

### Auth helpers (`src/lib/auth-helpers.ts`)

| Funcion | Uso |
|---|---|
| `requireAuth()` | Requiere sesion, redirect si no |
| `requireTeacher()` | Requiere role TEACHER o ADMIN |
| `requireStudent()` | Requiere STUDENT, TEACHER, o ADMIN |
| `getCurrentUser(userId)` | Carga usuario con packs, lessons, materials, payments |
| `getServerSession()` | Wrapper de `auth()` |

---

## 6. Rutas y route groups

### (cinematic) -- Paginas publicas principales

Fondo claro `#faf7f2`. Layout con navbar + footer navy.

| Ruta | Pagina |
|---|---|
| `/` | Home principal |
| `/contratar` | Funnel de contratacion (selector de pack + checkout) |
| `/tarifas` | Pagina de tarifas |
| `/preparacion-delf-dalf` | Pagina de preparacion DELF/DALF |
| `/preparacion-delf-dalf/[nivel]` | Pagina por nivel (A1-C2) |
| `/cursos` | Catalogo de cursos |
| `/cursos/conversacion` | Curso de conversacion |
| `/cursos/clases-particulares` | Clases particulares |
| `/cursos/intensivos` | Cursos intensivos |
| `/cursos/frances-empresas` | Frances para empresas |
| `/empresas` | Landing de empresas |
| `/sobre-nosotros` | Sobre nosotros |
| `/contacto` | Formulario de contacto |
| `/opiniones` | Pagina de resenas |
| `/opinion/[token]` | Formulario de resena (link unico) |
| `/correccion-ia` | Corrector de escritura con IA |
| `/calendario-examenes` | Calendario de convocatorias oficiales |
| `/calendario-examenes/[slug]` | Detalle de convocatoria |
| `/examen-delf-a1` | Examen simulacro A1 (legacy) |
| `/examen-delf-a2` | Examen simulacro A2 |
| `/confirmacion` | Pagina post-compra |
| `/colabora` | Formulario de colaboracion |
| `/recursos` | Hub de recursos |
| `/recursos/blog` | Blog |
| `/recursos/blog/[slug]` | Articulo de blog |
| `/recursos/descargas` | Descargas |
| `/recursos/enlaces-utiles` | Enlaces utiles |
| `/recursos/guia-delf-dalf` | Guia DELF/DALF |
| `/test-de-nivel` | Test de nivel |
| `/aviso-legal` | Aviso legal |
| `/politica-de-privacidad` | Politica de privacidad |
| `/politica-de-cookies` | Politica de cookies |

### (public) -- Le Cote Vie (contenido cultural)

| Ruta | Pagina |
|---|---|
| `/le-marche` | Quiz semanal |
| `/le-marche/classement` | Ranking/leaderboard |
| `/le-marche/historique` | Historico de quizzes |
| `/la-carte` | Mapa cultural de Francia |
| `/la-carte/[region]` | Region especifica |
| `/le-cinema` | Cine frances |
| `/le-cinema/[slug]` | Pelicula especifica |
| `/la-cuisine` | Cocina francesa |
| `/la-cuisine/[slug]` | Receta especifica |
| `/le-jeu` | Juegos interactivos |
| `/le-jeu/[scenario]` | Escenario de juego |
| `/le-mot-du-jour` | Palabra del dia |
| `/prueba-nivel` | Test de nivel |
| `/prueba-nivel/[assessmentId]` | Assessment especifico |
| `/home` | Home alternativo |
| `/home-legacy` | Home legacy |
| `/contact` | Contacto (EN) |
| `/courses` | Cursos (EN) |
| `/test` | Test page |

### (auth) -- Autenticacion

| Ruta | Pagina |
|---|---|
| `/iniciar-sesion` | Login (magic link + credentials) |
| `/verificar-email` | Pantalla "revisa tu email" |
| `/error` | Error de autenticacion |

### (zona-alumno) -- Portal del alumno

Layout con sidebar + topbar. Auth requerida.

| Ruta | Pagina | Icono sidebar |
|---|---|---|
| `/zona-alumno` | Dashboard (proximas clases, pack activo) | FiHome |
| `/zona-alumno/clases` | Lista de clases | FiBook |
| `/zona-alumno/calendario` | Vista calendario | FiCalendar |
| `/zona-alumno/reservar` | Reservar clase (selector de horario) | FiPlus |
| `/zona-alumno/correcciones` | Lista de correcciones IA | FiEdit3 |
| `/zona-alumno/correcciones/[id]` | Detalle de correccion | - |
| `/zona-alumno/correcciones/nueva` | Nueva correccion | - |
| `/zona-alumno/pack` | Mi pack activo | FiPackage |
| `/zona-alumno/pagos` | Historial de pagos | FiCreditCard |
| `/zona-alumno/resultados` | Resultados de examenes | FiBarChart2 |
| `/zona-alumno/resultados/[attemptId]` | Detalle de intento | - |
| `/zona-alumno/recursos` | Materiales y recursos | FiFolder |
| `/zona-alumno/perfil` | Mi perfil + datos de facturacion | FiUser |

### (zona-profesor) -- Portal del profesor

Layout con sidebar + topbar. Role TEACHER/ADMIN requerido.

| Ruta | Pagina | Icono sidebar |
|---|---|---|
| `/zona-profesor` | Dashboard (resumen de clases, alumnos) | FiHome |
| `/zona-profesor/alumnos` | Lista de alumnos | FiUsers |
| `/zona-profesor/alumnos/nuevo` | Crear alumno | - |
| `/zona-profesor/alumnos/[id]` | Detalle de alumno + facturacion | - |
| `/zona-profesor/clases` | Lista de clases (con filtros) | FiBook (badge: nuevas 24h) |
| `/zona-profesor/clases/nueva` | Crear clase manual | - |
| `/zona-profesor/clases/[id]` | Detalle de clase (editar, cancelar) | - |
| `/zona-profesor/calendario` | Vista calendario | FiCalendar |
| `/zona-profesor/correcciones` | Correcciones de alumnos | FiEdit3 |
| `/zona-profesor/correcciones/[id]` | Detalle + anotaciones | - |
| `/zona-profesor/examenes` | Gestion de examenes | FiFileText |
| `/zona-profesor/examenes/nuevo` | Crear examen | - |
| `/zona-profesor/examenes/[id]` | Editar examen | - |
| `/zona-profesor/examenes/[id]/preview` | Preview de examen | - |
| `/zona-profesor/materiales` | Materiales subidos | FiFolder |
| `/zona-profesor/materiales/subir` | Subir material | - |
| `/zona-profesor/disponibilidad` | Horarios semanales | FiClock |
| `/zona-profesor/packs` | Gestion de packs | FiPackage |
| `/zona-profesor/packs/nuevo` | Crear pack manual | - |
| `/zona-profesor/pagos` | Gestion de pagos | FiCreditCard |
| `/zona-profesor/contabilidad` | Contabilidad (facturas, export) | FiBarChart2 |
| `/zona-profesor/cuenta` | Mi cuenta (password, perfil) | FiSettings |

### Otras rutas fuera de route groups

| Ruta | Pagina |
|---|---|
| `/examenes` | Hub de examenes simulacro |
| `/examenes/[nivel]/[modalidad]` | Simulacro especifico |
| `/preparateurs/[slug]` | Perfil de preparateur |
| `/preguntas-frecuentes` | FAQ |

---

## 7. API routes

### Autenticacion
| Ruta | Metodo | Proposito |
|---|---|---|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth handlers (signin, signout, callback) |

### Booking y Pagos
| Ruta | Metodo | Proposito |
|---|---|---|
| `/api/booking/checkout` | POST | Crear Stripe checkout session |
| `/api/booking/manual` | POST | Registrar pago manual (Bizum/transferencia) |
| `/api/webhook/stripe` | POST | Webhook Stripe: confirmar pago, activar pack, crear Zoom, enviar notificaciones |
| `/api/webhook/zoom` | POST | Webhook Zoom: recording ready, attendance tracking |

### Zona Alumno
| Ruta | Metodo | Proposito |
|---|---|---|
| `/api/zona-alumno/dashboard` | GET | Datos del dashboard del alumno |
| `/api/zona-alumno/clases` | GET | Lista de clases del alumno |
| `/api/zona-alumno/clases/[id]/cancelar` | POST | Solicitar cancelacion de clase |
| `/api/zona-alumno/reservar` | POST | Reservar clase (valida pack, disponibilidad, crea Zoom) |
| `/api/zona-alumno/reservar/disponibilidad` | GET | Slots disponibles para reserva |
| `/api/zona-alumno/download` | GET | Descargar material |
| `/api/zona-alumno/facturas/[id]/pdf` | GET | Descargar factura PDF |
| `/api/zona-alumno/[studentId]` | GET | Datos del estudiante |
| `/api/zona-alumno/perfil/billing` | PATCH | Actualizar datos de facturacion |

### Zona Profesor
| Ruta | Metodo | Proposito |
|---|---|---|
| `/api/zona-profesor/alumnos` | GET/POST | Listar/crear alumnos |
| `/api/zona-profesor/alumnos/[id]/billing` | PATCH | Actualizar facturacion del alumno |
| `/api/zona-profesor/clases` | GET/POST | Listar/crear clases |
| `/api/zona-profesor/clases/[id]` | PATCH | Actualizar clase (status, notas, cancelar) |
| `/api/zona-profesor/calendario` | GET | Datos de calendario |
| `/api/zona-profesor/disponibilidad` | GET/POST/DELETE | CRUD de disponibilidad |
| `/api/zona-profesor/materiales` | GET/POST | Listar/subir materiales |
| `/api/zona-profesor/upload` | POST | Upload de archivos a Supabase Storage |
| `/api/zona-profesor/download` | GET | Descargar material |
| `/api/zona-profesor/packs` | GET/POST | Listar/crear packs |
| `/api/zona-profesor/packs/[id]` | PATCH | Actualizar pack |
| `/api/zona-profesor/pagos` | GET | Listar pagos |
| `/api/zona-profesor/pagos/[id]` | PATCH | Confirmar/rechazar pago manual |
| `/api/zona-profesor/examenes` | GET/POST | Listar/crear modelos de examen |
| `/api/zona-profesor/examenes/[id]` | GET/PATCH/DELETE | CRUD de modelo de examen |
| `/api/zona-profesor/examenes/generate` | POST | Generar examen con IA |
| `/api/zona-profesor/examenes/upload-audio` | POST | Subir audio de examen |
| `/api/zona-profesor/contabilidad/export` | GET | Exportar contabilidad a Excel |
| `/api/zona-profesor/resena` | GET | Obtener resenas |
| `/api/zona-profesor/cuenta` | GET/PATCH | Datos y actualizacion de cuenta |

### Correcciones IA
| Ruta | Metodo | Proposito |
|---|---|---|
| `/api/corrections/submit` | POST | Enviar texto para correccion IA |
| `/api/corrections/[id]` | GET | Obtener resultado de correccion |
| `/api/corrections/[id]/annotations` | POST | Agregar anotacion del profesor |
| `/api/corrections/quota` | GET | Consultar cuota de correcciones |
| `/api/corrections/purchase` | POST | Comprar correcciones adicionales |

### Examenes / Simulacros
| Ruta | Metodo | Proposito |
|---|---|---|
| `/api/examenes/attempts` | POST | Crear intento de examen |
| `/api/examenes/attempts/[id]` | GET/PATCH | Obtener/actualizar intento |
| `/api/examenes/analyze` | POST | Analisis IA del intento |
| `/api/exams` | GET | Listar convocatorias oficiales |
| `/api/exams/reminders` | POST | Crear recordatorio de convocatoria |

### Assessments (Prueba de nivel)
| Ruta | Metodo | Proposito |
|---|---|---|
| `/api/assessments` | GET | Listar assessments disponibles |
| `/api/assessments/[id]` | GET | Obtener assessment |
| `/api/assessments/[id]/start` | POST | Iniciar intento |
| `/api/assessments/[id]/answer` | POST | Enviar respuesta |
| `/api/assessments/[id]/finish` | POST | Finalizar intento |
| `/api/assessments/[id]/result/[attemptId]` | GET | Obtener resultado |

### Le Marche (Quiz semanal)
| Ruta | Metodo | Proposito |
|---|---|---|
| `/api/le-marche/quiz` | GET | Quiz de la semana actual |
| `/api/le-marche/quiz/[weekNumber]` | GET | Quiz de una semana especifica |
| `/api/le-marche/result` | POST | Enviar resultado |
| `/api/le-marche/leaderboard` | GET | Ranking |

### Otros
| Ruta | Metodo | Proposito |
|---|---|---|
| `/api/leads` | POST | Capturar lead (formulario contacto) |
| `/api/le-mot-du-jour/subscribe` | POST | Suscripcion a palabra del dia |
| `/api/chat` | POST | Chat conversacional |
| `/api/public/disponibilidad` | GET | Disponibilidad publica (funnel contratacion) |
| `/api/public/preparateur` | GET | Datos de preparateur publico |
| `/api/public/colabora` | POST | Solicitud de colaboracion |
| `/api/public/colabora/upload` | POST | Upload de CV |
| `/api/public/opinion` | POST | Enviar resena publica |
| `/api/contabilidad/factura/generar` | POST | Generar factura formal |
| `/api/contabilidad/factura/anular` | POST | Anular factura |
| `/api/contabilidad/factura/[id]/pdf` | GET | PDF de factura |

### Cron jobs
| Ruta | Schedule | Proposito |
|---|---|---|
| `/api/cron/class-reminders` | `0 10 * * *` (10:00 UTC diario) | Recordatorio de clases de manana |
| `/api/cron/exam-followup` | `0 18 * * *` (18:00 UTC diario) | Follow-up por email ~1h post-examen |
| `/api/cron/review-request` | `0 20 * * *` (20:00 UTC diario) | Solicitud de resena post-clase |

---

## 8. Flujos de negocio

### 8.1 Flujo de reserva (nuevo alumno)

```
1. Alumno visita /contratar
2. Selecciona nivel (A1-B2 o C1-C2) o diagnostico
3. Selecciona fecha/hora de la primera clase (SlotPicker)
4. Se crea Pack (ACTIVE) + Payment (PENDING) + Lesson (PENDING_PAYMENT) en BD
5. Redirect a Stripe Checkout (150 EUR o 200 EUR o 25 EUR)
6. Alumno paga con tarjeta
7. Stripe webhook (checkout.session.completed):
   a. Payment -> CONFIRMED
   b. Pack -> ACTIVE
   c. Lesson -> SCHEDULED (de PENDING_PAYMENT)
   d. Crea meeting en Zoom (auto_recording: cloud)
   e. Genera factura/recibo PDF
   f. Envia emails: confirmacion pago + confirmacion clase + notificacion staff/profesor
   g. Envia SMS/WhatsApp al alumno
   h. Adjunta .ics (calendar invite) en emails
8. Alumno ve /confirmacion con datos de la clase
```

### 8.2 Flujo de reserva (alumno existente con pack activo)

```
1. Alumno accede a /zona-alumno/reservar
2. Selecciona profesor, fecha, hora
3. POST /api/zona-alumno/reservar:
   a. Valida sesion, profesor, disponibilidad, pack activo
   b. Verifica que no hay conflicto de horario
   c. Transaction: crea Lesson + incrementa hoursUsed en Pack
   d. Crea Zoom meeting
   e. Envia email confirmacion (alumno + profesor) con .ics
   f. Envia SMS/WhatsApp al alumno
4. Alumno ve clase en /zona-alumno/clases
```

### 8.3 Flujo de pago manual (Bizum/transferencia)

```
1. Alumno selecciona "Bizum" o "Transferencia" en /contratar
2. POST /api/booking/manual:
   a. Crea Pack + Payment (PENDING, method: BIZUM/TRANSFER)
3. Email a staff: "Pago manual pendiente"
4. Profesor confirma en /zona-profesor/pagos:
   a. PATCH /api/zona-profesor/pagos/[id] -> status: CONFIRMED
   b. Se activa pack, se confirma leccion
```

### 8.4 Flujo de cancelacion

**Cancelacion con >48h de antelacion:**
```
1. Alumno hace POST /api/zona-alumno/clases/[id]/cancelar
2. Se marca cancellationRequestedAt en Lesson
3. Email al alumno: "Solicitud enviada"
4. Email al profesor: "Solicitud de cancelacion" (con link a gestionar)
5. Profesor confirma en /zona-profesor/clases/[id]:
   a. PATCH status -> CANCELLED
   b. Se elimina Zoom meeting
   c. Pack.hoursUsed NO se incrementa (hora devuelta)
   d. Email al alumno: "Clase cancelada - hora devuelta a tu pack"
```

**Cancelacion con <48h de antelacion:**
```
1-4. Igual que arriba
5. Profesor confirma:
   a. PATCH status -> CANCELLED
   b. Se elimina Zoom meeting
   c. Pack.hoursUsed SI se incrementa (hora perdida - penalizacion)
   d. Email al alumno: "Clase anulada fuera de plazo - se descuenta del bono"
   e. SMS al alumno con aviso
   f. Excepcion: justificante medico en 24h
```

### 8.5 Flujo de correccion IA

```
1. Alumno accede a /correccion-ia (publica) o /zona-alumno/correcciones/nueva
2. Selecciona nivel CEFR, tipo de tarea (lettre_formelle, essai, etc.)
3. Escribe texto
4. Se verifica cuota (3 gratis, luego pago)
5. POST /api/corrections/submit:
   a. Crea WritingCorrection (PENDING)
   b. Envia texto a Claude (Anthropic SDK)
   c. Claude devuelve: globalScore, criterionScores, annotations, correctedText, overallFeedback
   d. Actualiza WritingCorrection (COMPLETED)
6. Alumno ve resultado con:
   - Puntuacion global y por criterio (rubricas DELF/DALF)
   - Texto corregido con anotaciones inline
   - Feedback general y proximos pasos
7. Profesor puede agregar TeacherAnnotation
```

### 8.6 Flujo de examen simulacro

```
1. Alumno accede a /examenes
2. Selecciona nivel (A1-C2) y modelo
3. POST /api/examenes/attempts -> crea ExamAttempt (in_progress)
4. Alumno realiza examen:
   - Comprension oral (CO): audio + preguntas
   - Comprension escrita (CE): textos + preguntas
   - Produccion escrita (PE): redaccion -> correccion IA
   - Produccion oral (PO): auto-evaluacion (no implementada con IA)
5. PATCH /api/examenes/attempts/[id] -> respuestas guardadas
6. Al finalizar: status -> finished, scores calculados
7. POST /api/examenes/analyze: analisis IA del intento
8. Cron exam-followup (1h despues):
   - Email con resultados, probabilidad de aprobado, plan de estudio
   - CTA contextual: diagnostico (si <40%), pack de preparacion, o correccion IA
```

### 8.7 Flujo de facturacion

**Recibo simplificado (automatico)**:
```
1. Stripe webhook confirma pago
2. Se genera Invoice (HB-2026-XXXX) con PDF via jspdf
3. Se sube a Supabase Storage
4. Se envia por email al alumno
5. Alumno puede descargar desde /zona-alumno/pagos
```

**Factura formal (bajo demanda)**:
```
1. Profesor/admin accede a /zona-profesor/contabilidad
2. Selecciona pago y datos fiscales del alumno (NIF, razon social, direccion)
3. POST /api/contabilidad/factura/generar:
   a. Crea Factura con numeracion secuencial (HB-2026-0001)
   b. Calcula base imponible + IVA 21%
   c. Genera PDF
4. Factura se puede anular (estado: anulada + factura rectificativa)
5. Exportacion Excel de toda la contabilidad
```

### 8.8 Flujo post-clase

```
1. Profesor marca clase como COMPLETED en /zona-profesor/clases/[id]
2. Zoom recording queda disponible (via webhook o polling)
3. Email post-clase al alumno: "Merci pour ta classe!"
   - Link a grabacion (si disponible)
   - Horas restantes del pack
   - CTA: reservar siguiente clase
4. Cron review-request (20:00 UTC):
   - Crea Review con token unico
   - SMS al alumno con link a /opinion/[token]
5. Alumno deja resena (rating 1-5 + comentario)
```

---

## 9. Servicios externos

### Stripe
- **Uso**: Pagos online con tarjeta
- **Flujo**: Checkout Sessions (redirect flow) + Webhooks
- **Webhook events**: `checkout.session.completed`
- **Idempotencia**: StripeEvent model (evt_...)
- **Productos**: Packs de clases (150/200 EUR) + Diagnostico (25 EUR) + Correcciones IA (2.90/19 EUR)
- **Config**: `src/lib/stripe.ts`

### Azure AD / Microsoft Graph
- **Uso**: Envio de emails transaccionales
- **Auth**: client_credentials OAuth2 flow
- **Endpoint**: `graph.microsoft.com/v1.0/users/{from}/sendMail`
- **From**: `info@holabonjour.es` (o `EMAIL_FROM`)
- **Soporta**: HTML, adjuntos (.ics, .pdf)
- **Config**: `src/lib/azure-mail.ts`

### Twilio
- **Uso**: SMS y WhatsApp
- **Auth**: REST API directa (sin SDK Twilio). Basic auth con Account SID + Auth Token (o API Key)
- **Canales**: SMS (`TWILIO_FROM_NUMBER`) o WhatsApp (`TWILIO_WHATSAPP_FROM`) -- WhatsApp preferido si configurado
- **Dev mode**: `SMS_PROVIDER=log` -> solo console.log
- **Config**: `src/lib/sms.ts`

### Zoom
- **Uso**: Videoconferencias para clases
- **Auth**: Server-to-Server OAuth (ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET, ZOOM_ACCOUNT_ID)
- **Funciones**: Crear meeting, eliminar meeting
- **Settings**: join_before_host=true, waiting_room=false, auto_recording=cloud
- **Timezone**: Europe/Madrid
- **Webhooks**: Recording ready, participant join/leave (attendance tracking)
- **Config**: `src/lib/zoom.ts`

### Supabase
- **Uso**: PostgreSQL hosting + Storage (archivos)
- **Storage**: Materiales, PDFs de facturas, audio de examenes
- **Client**: `src/lib/supabase.ts` (service role key)
- **No usar**: Supabase Auth, Supabase Realtime

### Anthropic Claude
- **Uso**: Correcciones IA de escritura + analisis de examenes + generacion de examenes
- **SDK**: `@anthropic-ai/sdk` v0.78
- **Config**: `ANTHROPIC_API_KEY`
- **Motor de correccion**: `src/lib/correction/` (rubricas DELF/DALF, prompts, scoring)

### Vercel
- **Uso**: Hosting, deploy, cron jobs
- **Deploy**: `vercel --prod`
- **Crons**: Definidos en `vercel.json` (3 cron jobs diarios)
- **Analytics**: `@vercel/analytics` + `@vercel/speed-insights`

---

## 10. Cron jobs

| Job | Schedule (UTC) | Ruta | Proposito |
|---|---|---|---|
| **Class Reminders** | 10:00 diario | `/api/cron/class-reminders` | Envia SMS + email de recordatorio a alumnos y profesores para clases de manana |
| **Exam Follow-up** | 18:00 diario | `/api/cron/exam-followup` | Envia email de seguimiento ~1h despues de completar simulacro. Incluye analisis IA, probabilidad de aprobado y plan de estudio |
| **Review Request** | 20:00 diario | `/api/cron/review-request` | Crea Review con token unico y envia SMS al alumno pidiendo resena de clases completadas ayer |

Todos los crons:
- Requieren autenticacion (CRON_SECRET header, validado en `src/lib/cron-auth.ts`)
- Definidos en `vercel.json`
- Son GET requests

---

## 11. Paleta de diseno

### Regla de oro
**Navy (#1e2d4a) SOLO en navbar y footer.** Todo lo demas usa fondos claros.

### Variante C -- Cinematic (paginas publicas)

| Token | Valor | Uso |
|---|---|---|
| `cinematic.bg` | `#faf7f2` | Fondo principal de pagina |
| `cinematic.bgAlt` | `#f0ede6` | Secciones alternas |
| `cinematic.bgCard` | `#ffffff` | Cards, inputs, modals |
| `cinematic.text` | `#1e2d4a` | Titulos (navy) |
| `cinematic.textBody` | `#3d4a5c` | Parrafos |
| `cinematic.textMuted` | `#5f6b78` | Captions, labels |
| `cinematic.accent` | `#E50046` | CTAs, highlights, botones primarios |
| `cinematic.navBg` | `#1e2d4a` | Navbar y footer (SOLO estos) |
| `cinematic.navText` | `#f1f5f9` | Texto en navbar/footer |

### Brand (colores principales)

| Token | Valor | Uso |
|---|---|---|
| `brand.bleu` | `#395D9F` | Badges, links, botones secundarios |
| `brand.bleuDark` | `#1e2d4a` | Navy (headings, nav/footer) |
| `brand.rouge` | `#E50046` | Acento principal, CTAs |
| `brand.rougeHover` | `#c7003b` | Hover de rouge |
| `brand.blanc` | `#ffffff` | Blanco puro |
| `brand.cream` | `#faf7f2` | Fondo cream |
| `brand.success` | `#22c55e` | Estados exitosos |
| `brand.danger` | `#ef4444` | Errores, peligro |
| `brand.warning` | `#f59e0b` | Advertencias |

### Le Cote Vie (contenido cultural)

| Token | Valor | Uso |
|---|---|---|
| `vie.cream` | `#faf7f2` | Fondo |
| `vie.gold` | `#c9a84c` | Acento dorado |
| `vie.navy` | `#1a2744` | Titulos oscuros |
| `vie.wine` | `#722f37` | Acento vino |
| `vie.sage` | `#7c9a6e` | Acento verde salvia |

### Dashboard (zona profesor/alumno)

| Token | Valor | Uso |
|---|---|---|
| `dashboard.bg` | `#0C0F1A` | Fondo (dark mode) |
| `dashboard.card` | `#141825` | Cards |
| `dashboard.accent1` | `#3B82F6` | Azul |
| `dashboard.accent2` | `#F59E0B` | Amarillo |
| `dashboard.accent3` | `#10B981` | Verde |

> **Nota**: Las zonas de alumno/profesor actualmente usan `bg-gray-50` de Tailwind, no la paleta dashboard oscura.

### Tipografias

| Token | Fuente | Uso |
|---|---|---|
| `fonts.display` | Playfair Display | Titulos elegantes |
| `fonts.body` | DM Sans / Inter | Texto general |
| `fonts.heading` | Space Grotesk / DM Sans | Headings |
| `fonts.mono` | DM Mono / Fira Code | Codigo |

### Iconos
- **lucide-react**: Iconos principales
- **react-icons (FI = Feather)**: Sidebar de zonas

---

## 12. Variables de entorno

### Obligatorias

| Variable | Descripcion |
|---|---|
| `DATABASE_URL` | Connection string PostgreSQL de Supabase |
| `NEXTAUTH_SECRET` | Secreto JWT para NextAuth |
| `NEXTAUTH_URL` | URL base (`http://localhost:3000` en dev, `https://www.holabonjour.es` en prod) |
| `ANTHROPIC_API_KEY` | API key de Claude para correcciones IA |
| `STRIPE_SECRET_KEY` | `sk_test_...` o `sk_live_...` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` |
| `AZURE_CLIENT_ID` | App registration de Azure AD |
| `AZURE_CLIENT_SECRET` | Secret de la app Azure |
| `AZURE_TENANT_ID` | Tenant de Microsoft 365 |
| `EMAIL_FROM` | Direccion de envio (`info@holabonjour.es`) |

### Profesores

| Variable | Descripcion |
|---|---|
| `TEACHER_PASSWORD_HASH_JUANSILVA` | Bcrypt hash del password (legacy, migrar a DB) |
| `TEACHER_PASSWORD_HASH_ISABELLEGUITTON` | Bcrypt hash del password (legacy, migrar a DB) |

### Zoom

| Variable | Descripcion |
|---|---|
| `ZOOM_CLIENT_ID` | Client ID de la app Server-to-Server |
| `ZOOM_CLIENT_SECRET` | Client Secret |
| `ZOOM_ACCOUNT_ID` | Account ID |
| `ZOOM_WEBHOOK_SECRET_TOKEN` | Para verificar webhooks de Zoom |

### Twilio (SMS/WhatsApp)

| Variable | Descripcion |
|---|---|
| `TWILIO_ACCOUNT_SID` | Account SID |
| `TWILIO_AUTH_TOKEN` | Auth Token (o usar API Key) |
| `TWILIO_API_KEY_SID` | API Key SID (alternativa) |
| `TWILIO_API_KEY_SECRET` | API Key Secret (alternativa) |
| `TWILIO_FROM_NUMBER` | Numero de envio SMS |
| `TWILIO_WHATSAPP_FROM` | `whatsapp:+14155238886` (si configurado, se prefiere WhatsApp) |
| `SMS_PROVIDER` | `twilio` en prod, `log` en dev |

### Supabase

| Variable | Descripcion |
|---|---|
| `SUPABASE_URL` | URL del proyecto Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key (acceso total a Storage) |

### Otros

| Variable | Descripcion |
|---|---|
| `CRON_SECRET` | Secreto para autenticar cron jobs de Vercel |
| `STAFF_NOTIFICATION_TO` | Email de notificaciones internas (fallback: EMAIL_FROM) |

---

## 13. Convenciones de codigo

### Naming
- **Route groups**: `(cinematic)` = publico, `(zona-alumno)` = alumno, `(zona-profesor)` = profesor
- **API routes**: Verbos HTTP (GET/POST/PATCH/DELETE), siempre `export async function METHOD`
- **Archivos**: kebab-case para rutas (`zona-alumno`), camelCase para libs (`azure-mail.ts`)
- **Modelos Prisma**: PascalCase singular (`Lesson`, no `Lessons`)
- **Enums como strings**: Roles (`STUDENT`, `TEACHER`, `ADMIN`), status (`SCHEDULED`, `COMPLETED`...)

### Patrones

**Server Components (default)**:
- Zona-profesor pages: Server Components con Prisma directo
- Solo marcar `"use client"` cuando se necesita interactividad

**Client Components**:
- Formularios, filtros, slot pickers
- Siempre lazy-load con `dynamic` si son pesados

**API routes**:
```typescript
export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ ok: false, error: "UNAUTHORIZED" }, { status: 401 });
  // Zod validation
  // Business logic
  return NextResponse.json({ ok: true, data });
}
```

**Fire-and-forget notifications**:
```typescript
// No bloquear la response
sendSomething(...).catch(() => {});
// O con Promise.allSettled para multiples
Promise.allSettled(notifications).catch(() => {});
```

**Transacciones Prisma**:
```typescript
await prisma.$transaction(async (tx) => {
  // Operaciones atomicas
});
```

### Estilos
- **Tailwind v4**: Clases utility en `className`
- **Inline styles**: Para valores dinamicos o tokens de `brand.ts`
- **CSS Modules**: SOLO en Footer y Header
- **NO usar**: shadcn/ui, Radix, MUI, styled-components

### Emails
- Todos los emails usan `wrapEmailHtml()` para layout consistente
- Logo + HolaBonjour branding
- Botones con colores de marca (rouge para CTAs primarias, bleu para secundarias)
- Footer con datos de contacto
- Adjuntos .ics para clases programadas

### SMS
- Max ~160 caracteres
- Sin acentos (para compatibilidad GSM)
- Siempre empiezan con "HolaBonjour:"

### Lo que NO hacer
- NO agregar fondos navy a secciones de pagina (solo nav/footer)
- NO instalar dependencias no aprobadas
- NO usar `prisma db pull` (puede romper el schema)
- NO modificar sistemas estables (ver seccion 14)
- NO asumir rutas: siempre verificar con `find` o `glob` antes de editar
- NO crear Server Components con `"use client"` innecesario
- NO crear archivos sin verificar que no existen ya

---

## 14. Sistemas estables (no tocar)

Estos sistemas estan en produccion y no deben modificarse sin razon justificada:

| Sistema | Ruta | Motivo |
|---|---|---|
| **Motor de correccion IA** | `src/lib/correction/` | Rubricas DELF/DALF calibradas, prompts optimizados |
| **Examen legacy A1** | `src/app/(cinematic)/examen-delf-a1/` | Funcional en produccion |
| **Middleware** | `src/middleware.ts` | Solo agregar paths, no reestructurar |
| **Prisma schema** | `prisma/schema.prisma` | Siempre crear migracion tras cambios |
| **Footer / Header nav** | Componentes de layout | Mantener fondo navy |
| **Stripe webhook** | `/api/webhook/stripe/route.ts` | Flujo de pago critico |
| **Auth config** | `src/lib/auth.ts` + `auth.config.ts` | Configuracion estable |
| **Generated Prisma client** | `src/generated/prisma/` | Auto-generado, nunca editar manualmente |

### Protocolo obligatorio antes de hacer cambios

1. Ejecutar `bash scripts/project-map.sh` al inicio de cualquier sesion
2. Verificar archivos antes de editarlos (no asumir rutas)
3. Todo prompt de fixes debe incluir seccion "Rutas verificadas"
4. Respetar el stack (no instalar alternativas)
5. Formato de fixes: BLOQUE ALTA -> MEDIA -> build + checklist

---

## Apendice: Precios y packs

| Producto | Precio | Sesiones | Duracion |
|---|---|---|---|
| Pack A1-B2 | 150 EUR | 4 | 55 min c/u |
| Pack C1-C2 | 200 EUR | 4 | 55 min c/u |
| Diagnostico | 25 EUR | 1 | 30 min |
| 1 correccion IA | 2.90 EUR | - | - |
| 10 correcciones IA | 19 EUR | - | - |

### Profesores registrados
- **Juan Silva**: juansilva@traduccionesjuradas.net
- **Isabelle Guitton**: isabelleguitton@holabonjour.es
