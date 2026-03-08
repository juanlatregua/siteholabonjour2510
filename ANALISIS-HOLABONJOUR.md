# Análisis Técnico Completo — HolaBonjour

> Documento de referencia técnica del proyecto.
> Última actualización: 2026-03-08

---

## 1. Stack Técnico Completo

### Framework & Runtime
| Paquete | Versión | Uso |
|---------|---------|-----|
| Next.js | ^15.5.12 | App Router, SSR, API Routes |
| React | ^19.0.0 | UI |
| React DOM | ^19.0.0 | Rendering |
| TypeScript | ^5 | Tipado estático |
| Node.js | ≥ 20 | Runtime (requerido en engines) |

### Base de Datos & ORM
| Paquete | Versión | Uso |
|---------|---------|-----|
| prisma | ^7.4.2 | ORM, migraciones |
| @prisma/client | ^7.4.2 | Cliente generado |
| @prisma/adapter-pg | ^7.4.2 | Adaptador PostgreSQL |
| @prisma/adapter-better-sqlite3 | ^7.4.2 | Adaptador SQLite (dev/test) |
| pg | ^8.20.0 | Driver PostgreSQL |
| better-sqlite3 | ^12.6.2 | SQLite local |
| @supabase/supabase-js | ^2.98.0 | Storage (archivos, audio) |

### Autenticación
| Paquete | Versión | Uso |
|---------|---------|-----|
| next-auth | ^5.0.0-beta.30 | Auth (JWT, magic link, credentials) |
| @auth/prisma-adapter | ^2.11.1 | Adaptador Prisma para NextAuth |
| bcryptjs | ^3.0.3 | Hash de contraseñas docentes |

### Pagos
| Paquete | Versión | Uso |
|---------|---------|-----|
| stripe | ^20.4.0 | Checkout, webhooks, pagos |

### Email
| Paquete | Versión | Uso |
|---------|---------|-----|
| — | — | Azure/Microsoft Graph API vía fetch (transaccional) |

### SMS
| Paquete | Versión | Uso |
|---------|---------|-----|
| — | — | Twilio REST API vía fetch (sin SDK) |

### IA
| Paquete | Versión | Uso |
|---------|---------|-----|
| @anthropic-ai/sdk | ^0.78.0 | Correcciones escritas, chat concierge |

### UI & Styling
| Paquete | Versión | Uso |
|---------|---------|-----|
| tailwindcss | ^4 | CSS utility-first |
| @tailwindcss/postcss | ^4 | PostCSS plugin |
| react-icons | ^5.5.0 | Iconos |
| react-slick | ^0.30.3 | Carruseles |
| slick-carousel | ^1.8.1 | CSS de carruseles |
| react-dropzone | ^15.0.0 | Upload de archivos |

### Formularios & Validación
| Paquete | Versión | Uso |
|---------|---------|-----|
| react-hook-form | ^7.71.2 | Gestión de formularios |
| @hookform/resolvers | ^5.2.2 | Resolvers (Zod) |
| zod | ^4.3.6 | Validación de esquemas |

### Utilidades
| Paquete | Versión | Uso |
|---------|---------|-----|
| date-fns | ^4.1.0 | Formateo de fechas |
| jspdf | ^4.2.0 | Generación de PDFs |
| dotenv | ^17.3.1 | Variables de entorno |
| tsx | ^4.21.0 | Ejecución de scripts TS |

---

## 2. Estructura de Rutas y Páginas

### (cinematic) — Páginas Públicas Marketing
| Ruta | Descripción |
|------|-------------|
| `/` | Landing principal: hero, simuladores, testimonios |
| `/cursos` | Overview de 5 tipos de curso |
| `/cursos/clases-particulares` | Detalle clases particulares |
| `/cursos/conversacion` | Detalle curso conversación |
| `/cursos/intensivos` | Detalle cursos intensivos |
| `/cursos/frances-empresas` | Detalle francés empresas |
| `/preparacion-delf-dalf` | Overview preparación DELF/DALF |
| `/preparacion-delf-dalf/[nivel]` | Detalle por nivel (A1-C2) |
| `/examen-delf-a1` | Legacy: examen A1 (no modificar) |
| `/examen-delf-a2` | Legacy: examen A2 |
| `/test-de-nivel` | Redirect a /prueba-nivel |
| `/correccion-ia` | Landing corrección IA |
| `/tarifas` | Página de precios |
| `/sobre-nosotros` | Sobre nosotros |
| `/empresas` | Programa empresas |
| `/contacto` | Formulario de contacto |
| `/calendario-examenes` | Calendario de exámenes oficiales |
| `/calendario-examenes/[slug]` | Detalle sesión de examen |
| `/recursos` | Hub de recursos |
| `/recursos/blog` | Blog (BlogGrid) |
| `/recursos/blog/[slug]` | Post individual |
| `/recursos/guia-delf-dalf` | Guía DELF/DALF |
| `/recursos/descargas` | Materiales descargables |
| `/recursos/enlaces-utiles` | Enlaces útiles |
| `/aviso-legal` | Aviso legal |
| `/politica-de-privacidad` | Política de privacidad |
| `/politica-de-cookies` | Política de cookies |

### (public) — Le Côté Vie (Contenido Cultural)
| Ruta | Descripción |
|------|-------------|
| `/home` | Home legacy |
| `/home-legacy` | Home legacy alternativo |
| `/courses` | Listado de cursos (EN) |
| `/contact` | Contacto (EN) |
| `/test` | Test/quiz (client component) |
| `/le-mot-du-jour` | Palabra del día |
| `/le-marche` | Quiz semanal del mercado |
| `/le-marche/classement` | Clasificación/leaderboard |
| `/le-marche/historique` | Historial de quizzes |
| `/le-cinema` | Hub de cine francés |
| `/le-cinema/[slug]` | Película individual |
| `/la-cuisine` | Hub de gastronomía |
| `/la-cuisine/[slug]` | Receta individual |
| `/la-carte` | Hub de mapas/viajes |
| `/la-carte/[region]` | Región específica |
| `/le-jeu` | Hub de juegos |
| `/le-jeu/[scenario]` | Escenario individual |
| `/prueba-nivel` | Hub de pruebas de nivel |
| `/prueba-nivel/[assessmentId]` | Test de nivel interactivo |

### (auth) — Autenticación
| Ruta | Descripción |
|------|-------------|
| `/iniciar-sesion` | Login dual: magic link (alumnos) + credentials (docentes) |
| `/verificar-email` | Verificación de magic link |
| `/error` | Página de error de auth |

### (zona-alumno) — Portal del Alumno (auth required)
| Ruta | Descripción |
|------|-------------|
| `/zona-alumno` | Dashboard: próxima clase, pack activo, corrección, materiales |
| `/zona-alumno/clases` | Lista de clases con filtros |
| `/zona-alumno/calendario` | Vista calendario interactivo |
| `/zona-alumno/reservar` | Reservar clases (slot picker) |
| `/zona-alumno/correcciones` | Lista de correcciones escritas |
| `/zona-alumno/correcciones/nueva` | Enviar nuevo escrito para corrección |
| `/zona-alumno/correcciones/[id]` | Detalle de corrección con anotaciones IA |
| `/zona-alumno/pack` | Detalle del pack activo |
| `/zona-alumno/pagos` | Historial de pagos |
| `/zona-alumno/resultados` | Resultados de exámenes |
| `/zona-alumno/resultados/[attemptId]` | Detalle de resultado con desglose |
| `/zona-alumno/recursos` | Biblioteca de materiales |

### (zona-profesor) — Portal del Docente (TEACHER/ADMIN)
| Ruta | Descripción |
|------|-------------|
| `/zona-profesor` | Dashboard: nº alumnos, clases hoy, próximas |
| `/zona-profesor/alumnos` | Lista de alumnos |
| `/zona-profesor/alumnos/[id]` | Detalle/gestión de alumno |
| `/zona-profesor/alumnos/nuevo` | Crear nuevo alumno |
| `/zona-profesor/clases` | Lista de clases con filtros |
| `/zona-profesor/clases/nueva` | Crear nueva clase |
| `/zona-profesor/clases/[id]` | Editar clase existente |
| `/zona-profesor/calendario` | Vista calendario del docente |
| `/zona-profesor/disponibilidad` | Gestión de disponibilidad |
| `/zona-profesor/packs` | Lista de packs creados |
| `/zona-profesor/packs/nuevo` | Crear nuevo pack |
| `/zona-profesor/examenes` | Lista de exámenes creados |
| `/zona-profesor/examenes/nuevo` | Wizard de creación de examen |
| `/zona-profesor/examenes/[id]` | Gestión de examen |
| `/zona-profesor/examenes/[id]/preview` | Preview de examen |
| `/zona-profesor/materiales` | Materiales subidos |
| `/zona-profesor/materiales/subir` | Subir nuevo material |
| `/zona-profesor/correcciones` | Correcciones/feedback |
| `/zona-profesor/correcciones/[id]` | Añadir feedback a corrección |
| `/zona-profesor/pagos` | Pagos/ingresos |

### Rutas Independientes
| Ruta | Descripción |
|------|-------------|
| `/examenes` | Hub de exámenes DELF A1-B2 / DALF C1-C2 |
| `/examenes/[nivel]/[modalidad]` | Examen interactivo con timer |
| `/contratar` | Funnel de contratación + pago |
| `/confirmacion` | Confirmación post-compra |
| `/preguntas-frecuentes` | FAQ |
| `/preparateurs/[slug]` | Perfil público de preparateur |

---

## 3. Modelos Prisma (26 total)

### Auth (3 modelos)
| Modelo | Campos clave | Descripción |
|--------|-------------|-------------|
| **Account** | provider, providerAccountId, userId | Cuentas OAuth/provider |
| **Session** | sessionToken, userId, expires | Sesiones (no usado con JWT) |
| **VerificationToken** | identifier, token, expires | Tokens magic link |

### Usuarios (1 modelo)
| Modelo | Campos clave | Descripción |
|--------|-------------|-------------|
| **User** | email, role (STUDENT/TEACHER/ADMIN), level (A1-C2), coachId, active | Usuario central; self-relation coach↔students |

### Booking (4 modelos)
| Modelo | Campos clave | Descripción |
|--------|-------------|-------------|
| **Pack** | hoursTotal, hoursUsed, price, levelRange, status | Packs de clases |
| **Lesson** | studentId, teacherId, packId, scheduledAt, status, zoomLink | Clases programadas |
| **Payment** | amount, method, status, stripeSessionId | Pagos (Stripe/Bizum/transferencia) |
| **Availability** | teacherId, dayOfWeek, startTime, endTime | Slots de disponibilidad docente |

### Exámenes (4 modelos)
| Modelo | Campos clave | Descripción |
|--------|-------------|-------------|
| **ExamAttempt** | userId, nivel, scores (CO/CE/PE/PO), answers (JSON) | Intentos de simulacro |
| **ExamSession** | examType, level, center, city, dates | Convocatorias oficiales |
| **ExamReminder** | userId, examSessionId, reminderType | Recordatorios de inscripción |
| **ExamenModelo** | titulo, nivel, diploma, secciones (JSON), status | Exámenes creados por docentes |

### Assessment (6 modelos)
| Modelo | Campos clave | Descripción |
|--------|-------------|-------------|
| **AssessmentLink** | userId, attemptId, assessmentId | Vínculo usuario↔assessment |
| **AssessmentAttempt** | assessmentId, attemptToken, status, result (JSON) | Intento de prueba de nivel |
| **AssessmentAttemptAnswer** | attemptId, questionId, isCorrect, pointsAwarded | Respuesta individual |
| **Quiz** | weekNumber, year, theme, title | Quiz semanal (Le Marché) |
| **QuizQuestion** | quizId, text, options (JSON), correctIdx | Pregunta de quiz |
| **QuizResult** | quizId, name, email, score, timeMs | Resultado de quiz |

### Correcciones IA (3 modelos)
| Modelo | Campos clave | Descripción |
|--------|-------------|-------------|
| **WritingCorrection** | level, taskType, inputText, globalScore, annotations (JSON), status | Corrección IA completa |
| **CorrectionQuota** | email, freeUsed, freeLimit, paidRemaining | Cuota de correcciones |
| **TeacherAnnotation** | correctionId, teacherId, content, scoreOverride | Feedback docente sobre corrección |

### Contenido (2 modelos)
| Modelo | Campos clave | Descripción |
|--------|-------------|-------------|
| **Material** | studentId, type, title, storagePath | Materiales subidos |
| **NewsletterSubscriber** | email, name, active | Suscriptores newsletter |

### Marketplace (3 modelos)
| Modelo | Campos clave | Descripción |
|--------|-------------|-------------|
| **PreparateurProfile** | slug, displayName, hourlyRate, status, avgRating | Perfil público de tutor |
| **PreparateurReview** | preparateurId, rating, comment | Reseñas de alumnos |
| **PreparateurApplication** | name, email, experience, status | Solicitudes de nuevos tutores |

---

## 4. Sistema de Auth (NextAuth v5)

### Estrategia
- **Sesiones JWT** (stateless, cookie HTTP-only)
- Firmadas con `NEXTAUTH_SECRET`
- Sin sesiones en base de datos

### Providers

| Provider | Para | Flujo |
|----------|------|-------|
| **Email (Magic Link)** | Alumnos | Email → Azure Graph API → link de 10 min → auto-login → crea usuario STUDENT |
| **Credentials** | Docentes | Email + password → valida vs TEACHER_EMAILS + bcrypt vs env hash → login |

### Roles
| Rol | Acceso | Asignación |
|-----|--------|------------|
| `STUDENT` | /zona-alumno, exámenes, correcciones | Automático al registrarse |
| `TEACHER` | /zona-profesor + todo lo de STUDENT | Manual en BD + credenciales en env |
| `ADMIN` | Todo | Manual en BD |

### Docentes Autorizados (whitelist fija)
- `juansilva@traduccionesjuradas.net` → `TEACHER_PASSWORD_HASH_JUANSILVA`
- `isabelleguitton@holabonjour.es` → `TEACHER_PASSWORD_HASH_ISABELLEGUITTON`

### Middleware (`src/middleware.ts`)
- **Rutas públicas**: `/`, `/cursos`, `/preparacion-delf-dalf`, `/contacto`, `/examenes`, `/le-marche`, `/le-cinema`, `/la-cuisine`, `/le-jeu`, `/la-carte`, `/le-mot-du-jour`, `/prueba-nivel`, `/recursos`, `/blog`, `/tarifas`, `/sobre-nosotros`, etc.
- **APIs públicas**: `/api/auth/**`, `/api/assessments/**`, `/api/corrections/**`, `/api/exams/**`, `/api/examenes/**`, `/api/public/**`, `/api/webhook/**`, `/api/le-marche/**`, `/api/le-mot-du-jour/**`, `/api/chat`, `/api/leads/**`
- **Zona profesor**: Requiere role TEACHER o ADMIN, redirige a /zona-alumno si no
- **Por defecto**: Sin auth → redirige a `/iniciar-sesion?callbackUrl=...`

### Helpers (`src/lib/auth-helpers.ts`)
- `requireAuth()` → sesión o redirect a login
- `requireTeacher()` → valida TEACHER/ADMIN o redirect
- `requireStudent()` → permisivo (acepta cualquier rol autenticado)
- `requireRole(role)` → rol específico o ADMIN
- `getCurrentUser(userId)` → usuario completo con relaciones

---

## 5. APIs y Endpoints

### Autenticación
| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET/POST | `/api/auth/[...nextauth]` | No | NextAuth catch-all |

### Assessments (Prueba de Nivel) — Público
| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/api/assessments` | No | Listar assessments |
| GET | `/api/assessments/[id]` | No | Detalle de assessment |
| POST | `/api/assessments/[id]/start` | No | Iniciar intento |
| POST | `/api/assessments/[id]/answer` | No | Enviar respuesta |
| POST | `/api/assessments/[id]/finish` | No | Finalizar intento |
| GET | `/api/assessments/[id]/result/[attemptId]` | No | Obtener resultados |

### Correcciones IA
| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| POST | `/api/corrections/submit` | No | Enviar texto para corrección (verifica cuota) |
| GET | `/api/corrections/quota` | Opcional | Estado de cuota |
| POST | `/api/corrections/purchase` | No | Checkout Stripe para packs de correcciones |
| GET | `/api/corrections/[id]` | Sí | Obtener resultado de corrección |
| POST | `/api/corrections/[id]/annotations` | TEACHER | Añadir anotaciones docentes |

### Exámenes
| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/api/exams` | No | Listar convocatorias con filtros |
| POST | `/api/exams/reminders` | Opcional | Suscribirse a recordatorios |
| GET/POST | `/api/examenes/attempts` | Sí | Listar/crear intentos de simulacro |
| GET/PATCH | `/api/examenes/attempts/[id]` | Sí | Obtener/actualizar intento |

### Pagos & Booking
| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| POST | `/api/booking/checkout` | No | Crear sesión Stripe para pack de clases |
| POST | `/api/webhook/stripe` | No | Webhook Stripe (activación packs, correcciones, pagos) |

### Chat Concierge
| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| POST | `/api/chat` | No | Chat streaming con Claude (rate limited: 30 msgs/sesión) |

### Le Côté Vie (Contenido Cultural)
| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/api/le-marche/quiz` | No | Quiz de la semana actual |
| GET | `/api/le-marche/quiz/[weekNumber]` | No | Quiz por número de semana |
| GET | `/api/le-marche/leaderboard` | No | Top 10 resultados |
| POST | `/api/le-marche/result` | No | Enviar resultado de quiz |
| POST | `/api/le-mot-du-jour/subscribe` | No | Suscripción a palabra del día |

### Leads
| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| POST | `/api/leads` | No | Captura de leads |

### Público (Marketplace)
| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/api/public/disponibilidad` | No | Slots disponibles (?slug) |
| GET | `/api/public/preparateur` | No | Perfil preparateur (?slug) |

### Zona Alumno
| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/api/zona-alumno/dashboard` | Sí | Dashboard del alumno |
| GET | `/api/zona-alumno/clases` | Sí | Clases del alumno |
| POST | `/api/zona-alumno/reservar` | Sí | Reservar clase |
| GET | `/api/zona-alumno/reservar/disponibilidad` | Sí | Disponibilidad por docente/semana |

### Zona Profesor
| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET/POST | `/api/zona-profesor/alumnos` | TEACHER | CRUD alumnos |
| GET/POST | `/api/zona-profesor/clases` | TEACHER | CRUD clases |
| PATCH | `/api/zona-profesor/clases/[id]` | TEACHER | Actualizar clase |
| GET | `/api/zona-profesor/calendario` | TEACHER | Vista calendario |
| GET/PUT | `/api/zona-profesor/disponibilidad` | TEACHER | Gestionar disponibilidad |
| GET | `/api/zona-profesor/materiales` | TEACHER | Listar materiales |
| POST | `/api/zona-profesor/upload` | TEACHER | Subir material a Supabase |
| GET | `/api/zona-profesor/download` | TEACHER | URL firmada de descarga |
| GET/POST | `/api/zona-profesor/packs` | TEACHER | CRUD packs |
| PATCH | `/api/zona-profesor/packs/[id]` | TEACHER | Actualizar pack |
| GET | `/api/zona-profesor/pagos` | TEACHER | Listar pagos |
| PATCH | `/api/zona-profesor/pagos/[id]` | TEACHER | Confirmar/rechazar pago |
| GET/POST | `/api/zona-profesor/examenes` | TEACHER | CRUD exámenes modelo |
| GET/PUT/DELETE | `/api/zona-profesor/examenes/[id]` | TEACHER | Gestionar examen |
| POST | `/api/zona-profesor/examenes/generate` | TEACHER | Generar sección con IA |
| POST | `/api/zona-profesor/examenes/upload-audio` | TEACHER | Subir audio (max 50MB) |

### Cron Jobs
| Método | Endpoint | Auth | Descripción |
|--------|----------|------|-------------|
| GET | `/api/cron/class-reminders` | Bearer | Recordatorios de clase (email + SMS) |
| POST | `/api/cron/exam-reminders` | Bearer | Recordatorios de exámenes oficiales |

**Total: ~54 endpoints**

---

## 6. Integraciones Externas

### Stripe (Pagos)
- **Archivo**: `src/lib/stripe.ts`
- **SDK**: stripe ^20.4.0
- **Uso**: Checkout sessions, webhooks, activación de packs
- **Precios packs de clases**: A1-B2 €150/4h, C1-C2 €200/4h, Diagnóstico €25/1h
- **Precios correcciones**: 1 corrección €2.90, 10 correcciones €19.00
- **Webhook**: `/api/webhook/stripe` — gestiona activación de packs + compra de correcciones
- **Env vars**: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`

### Microsoft Graph API (Email)
- **Archivo**: `src/lib/azure-mail.ts` + `src/lib/email.ts`
- **Método**: OAuth2 client_credentials → Microsoft Graph `/sendMail`
- **Uso**: Magic links, confirmaciones de pago, recordatorios de clase, notificaciones staff
- **Templates** (en `email.ts`): confirmación pago, recordatorio clase, nueva reserva, review examen, cancelación tardía
- **Env vars**: `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET`, `EMAIL_FROM`

### Twilio (SMS/WhatsApp)
- **Archivo**: `src/lib/sms.ts` + `src/lib/sms-templates.ts`
- **Método**: REST API directo vía fetch (sin SDK instalado)
- **Canales**: SMS y/o WhatsApp (selección automática)
- **Templates**: confirmación reserva, confirmación pago, recordatorio clase, cancelación tardía
- **Modo dev**: `SMS_PROVIDER=log` → solo console.log
- **Env vars**: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN` o `TWILIO_API_KEY_SID`+`TWILIO_API_KEY_SECRET`, `TWILIO_FROM_NUMBER`, `TWILIO_WHATSAPP_FROM`

### Supabase (Storage)
- **Archivo**: `src/lib/supabase.ts`
- **SDK**: @supabase/supabase-js ^2.98.0
- **Uso**: Almacenamiento de materiales (PDFs, audio), audio de exámenes
- **Buckets**: `materials`, `examenes-audio`
- **URLs firmadas**: Expiración configurable (default 1h)
- **Env vars**: `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`

### Anthropic Claude (IA)
- **Archivos**: `src/lib/correction/`, `src/lib/chat/anthropic.ts`
- **SDK**: @anthropic-ai/sdk ^0.78.0
- **Modelo**: `CHAT_MODEL` env var o `claude-sonnet-4-20250514`
- **Funciones**:
  - **Corrección de escritos**: Evaluación con rúbricas FEI oficiales, 5 criterios, anotaciones posicionales, texto corregido, feedback, nivel estimado
  - **Chat concierge**: Streaming con retry automático en errores 5xx
- **Cuota**: 3 correcciones gratis/email, packs de pago vía Stripe, ilimitado con pack de clases activo
- **Tracking**: Tokens usados, latencia, modelo utilizado
- **Env vars**: `ANTHROPIC_API_KEY`, `CHAT_MODEL` (opcional)

---

## 7. Estado de Funcionalidades

### Sitio Público
| Funcionalidad | Estado | Notas |
|---------------|--------|-------|
| Landing page + hero | ✅ Funcionando | SEO, schema.org |
| Páginas de cursos (5 tipos) | ✅ Funcionando | |
| Preparación DELF/DALF por nivel | ✅ Funcionando | Rutas dinámicas A1-C2 |
| Página de tarifas | ✅ Funcionando | |
| Contacto con formulario | ✅ Funcionando | |
| Sobre nosotros | ✅ Funcionando | |
| Empresas | ✅ Funcionando | |
| Blog | ✅ Funcionando | BlogGrid + posts dinámicos |
| Recursos (guía, descargas, enlaces) | ✅ Funcionando | |
| Calendario exámenes oficiales | ✅ Funcionando | |
| Páginas legales (aviso, privacidad, cookies) | ✅ Funcionando | |
| FAQ | ✅ Funcionando | |
| SEO (robots.ts, sitemap.ts, OG images) | ✅ Funcionando | |
| Redirects (legacy URLs) | ✅ Funcionando | Configurado en next.config.ts |

### Le Côté Vie (Contenido Cultural)
| Funcionalidad | Estado | Notas |
|---------------|--------|-------|
| Le Mot du Jour | ✅ Funcionando | Palabra del día |
| Le Marché (quiz semanal) | ✅ Funcionando | Quiz + leaderboard + historial |
| Le Cinéma | ✅ Funcionando | Hub + fichas por película |
| La Cuisine | ✅ Funcionando | Hub + recetas |
| La Carte | ✅ Funcionando | Mapas por región |
| Le Jeu | ✅ Funcionando | Juegos por escenario |

### Autenticación
| Funcionalidad | Estado | Notas |
|---------------|--------|-------|
| Magic link (alumnos) | ✅ Funcionando | Azure email, 10 min expiry |
| Credentials (docentes) | ✅ Funcionando | bcrypt + env hash, 2 docentes |
| Middleware de rutas | ✅ Funcionando | Whitelist + role check |
| Control de roles | ✅ Funcionando | STUDENT, TEACHER, ADMIN |
| Bloqueo de cuentas inactivas | ✅ Funcionando | Campo user.active |

### Portal del Alumno
| Funcionalidad | Estado | Notas |
|---------------|--------|-------|
| Dashboard | ✅ Funcionando | Próxima clase, pack, corrección, materiales |
| Lista de clases + filtros | ✅ Funcionando | |
| Calendario interactivo | ✅ Funcionando | CalendarioAlumnoClient |
| Reservar clase (slot picker) | ✅ Funcionando | Valida disponibilidad + horas pack |
| Correcciones IA (lista + detalle) | ✅ Funcionando | |
| Enviar nuevo escrito | ✅ Funcionando | |
| Detalle de pack activo | ✅ Funcionando | |
| Historial de pagos | ✅ Funcionando | |
| Resultados de exámenes | ✅ Funcionando | |
| Biblioteca de recursos | ✅ Funcionando | |

### Portal del Docente
| Funcionalidad | Estado | Notas |
|---------------|--------|-------|
| Dashboard | ✅ Funcionando | Stats + clases del día |
| CRUD alumnos | ✅ Funcionando | Lista, detalle, crear nuevo |
| CRUD clases | ✅ Funcionando | Lista, crear, editar, filtros |
| Calendario | ✅ Funcionando | CalendarioProfesorClient |
| Gestión disponibilidad | ✅ Funcionando | Slots recurrentes |
| CRUD packs | ✅ Funcionando | Crear, listar, actualizar estado |
| CRUD exámenes modelo | ✅ Funcionando | Wizard + preview + generación IA |
| Upload materiales | ✅ Funcionando | Supabase storage |
| Correcciones + feedback | ✅ Funcionando | Anotaciones docentes |
| Pagos (confirmar/rechazar) | ✅ Funcionando | |

### Motor de Exámenes
| Funcionalidad | Estado | Notas |
|---------------|--------|-------|
| Hub de exámenes (A1-C2) | ✅ Funcionando | |
| Simulacros interactivos con timer | ✅ Funcionando | CO, CE, PE, PO |
| Corrección automática (CO/CE) | ✅ Funcionando | |
| Corrección IA (PE) | ✅ Funcionando | Claude + rúbricas FEI |
| Guardado de intentos + puntuaciones | ✅ Funcionando | |
| Audio de exámenes | ✅ Funcionando | Archivos en Supabase |

### Corrección IA
| Funcionalidad | Estado | Notas |
|---------------|--------|-------|
| Evaluación con rúbricas FEI | ✅ Funcionando | 5 criterios, todos los niveles |
| Anotaciones posicionales | ✅ Funcionando | start/end, tipo, corrección, explicación |
| Texto corregido + feedback | ✅ Funcionando | |
| Nivel estimado + next steps | ✅ Funcionando | |
| Cuota gratuita (3/email) | ✅ Funcionando | |
| Compra de correcciones (Stripe) | ✅ Funcionando | 1 × €2.90, 10 × €19.00 |
| Tracking de tokens/latencia | ✅ Funcionando | |

### Assessment (Prueba de Nivel)
| Funcionalidad | Estado | Notas |
|---------------|--------|-------|
| Hub de assessments | ✅ Funcionando | |
| Flujo start → answer → finish | ✅ Funcionando | Token-based, sin auth |
| Resultados con puntuación | ✅ Funcionando | |

### Pagos & Booking
| Funcionalidad | Estado | Notas |
|---------------|--------|-------|
| Checkout Stripe (packs) | ✅ Funcionando | |
| Webhook Stripe | ✅ Funcionando | Activación pack + notificaciones |
| Checkout correcciones | ✅ Funcionando | |
| Métodos alternativos (Bizum, transferencia) | ⚠️ Parcial | Registrados en BD pero sin flujo automático |

### Chat Concierge
| Funcionalidad | Estado | Notas |
|---------------|--------|-------|
| Chat streaming con Claude | ✅ Funcionando | Rate limited, retry en 5xx |

### Marketplace (Preparateurs)
| Funcionalidad | Estado | Notas |
|---------------|--------|-------|
| Perfiles públicos | ✅ Funcionando | /preparateurs/[slug] |
| Reseñas | ✅ Funcionando | Modelo en BD |
| Solicitud de nuevos tutores | ⚠️ Parcial | Modelo PreparateurApplication existe, flujo básico |
| Suscripción Stripe de tutores | ⚠️ Parcial | Campos en modelo pero sin flujo completo |

### Cron Jobs
| Funcionalidad | Estado | Notas |
|---------------|--------|-------|
| Recordatorios de clase (email + SMS) | ✅ Funcionando | Bearer token auth |
| Recordatorios de exámenes | ✅ Funcionando | Bearer token auth |

### Notificaciones
| Funcionalidad | Estado | Notas |
|---------------|--------|-------|
| Email transaccional (Azure/Graph) | ✅ Funcionando | Magic links, confirmaciones, recordatorios |
| SMS/WhatsApp (Twilio) | ✅ Funcionando | Recordatorios, confirmaciones |
| Newsletter Le Mot du Jour | ⚠️ Parcial | Suscripción funciona, envío automático no verificado |

---

## 8. Pendientes y Problemas Conocidos

### Dependencias
- **Twilio**: No hay SDK instalado, usa REST API vía fetch — funciona pero sin tipado
- **better-sqlite3 + adapter**: Instalados pero no parece usarse en producción — verificar si son necesarios

### Marketplace
- Flujo completo de alta de preparateurs (solicitud → aprobación → perfil activo) no está automatizado
- Suscripción Stripe para preparateurs: campos `stripeCustomerId`, `stripeSubscriptionId` en modelo pero sin implementación de cobro recurrente

### Pagos Alternativos
- Bizum y transferencia bancaria: Se pueden registrar manualmente pero no hay flujo automático de confirmación

### Newsletter
- Suscripción a "Le Mot du Jour" captura emails pero no se ha verificado el envío diario automatizado

### Pricing
- Unificado a €150/4h (A1-B2) en todos los archivos (constants.ts, stripe.ts, seed.ts)

### Configuración
- `next.config.js` y `next.config.ts` coexisten — el `.ts` es el activo, el `.js` parece obsoleto

---

## 9. Variables de Entorno

### Obligatorias
```env
# Base de datos
DATABASE_URL=                          # PostgreSQL (Supabase)

# Auth
NEXTAUTH_SECRET=                       # JWT secret
NEXTAUTH_URL=http://localhost:3000     # URL base (dev)

# Docentes
TEACHER_PASSWORD_HASH_JUANSILVA=       # bcrypt hash
TEACHER_PASSWORD_HASH_ISABELLEGUITTON= # bcrypt hash

# Email (Azure/Microsoft Graph)
AZURE_TENANT_ID=
AZURE_CLIENT_ID=
AZURE_CLIENT_SECRET=
EMAIL_FROM=hola@holabonjour.es

# Pagos
STRIPE_SECRET_KEY=                     # sk_test_... o sk_live_...
STRIPE_WEBHOOK_SECRET=                 # whsec_...

# IA
ANTHROPIC_API_KEY=                     # Claude API

# Storage
NEXT_PUBLIC_SUPABASE_URL=              # URL del proyecto Supabase
SUPABASE_SERVICE_ROLE_KEY=             # Service role key (admin)
```

### Opcionales
```env
# SMS (Twilio)
SMS_PROVIDER=log                       # "log" (dev) o "twilio" (prod)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=                     # O usar API Key:
TWILIO_API_KEY_SID=
TWILIO_API_KEY_SECRET=
TWILIO_FROM_NUMBER=                    # Número SMS
TWILIO_WHATSAPP_FROM=                  # Número WhatsApp

# IA (modelo alternativo)
CHAT_MODEL=claude-sonnet-4-20250514   # Default si no se especifica

# Notificaciones
STAFF_NOTIFICATION_TO=                 # Email de notificaciones internas

# Cron
CRON_SECRET=                           # Bearer token para cron jobs
```
