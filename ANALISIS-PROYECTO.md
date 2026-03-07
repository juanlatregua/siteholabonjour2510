# HolaBonjour — Analisis del proyecto

> Generado: 6 marzo 2026 | Branch: `feat/stripe-sms-funnel`

---

## 1. Que es HolaBonjour

Plataforma online de preparacion de examenes oficiales de frances (DELF A1-B2, DALF C1-C2), con clases en directo por Zoom, correccion de textos por IA y herramientas de engagement cultural.

**Publico objetivo:** hispanohablantes adultos que se presentan a examenes DELF/DALF.

**Modelo de negocio:**
- Packs de clases particulares por Zoom (4 sesiones: 150EUR DELF / 200EUR DALF)
- Packs de correcciones IA (10 por 19EUR, 1 por 2,90EUR)
- Simuladores de examen gratuitos como funnel de captacion

---

## 2. Stack tecnico

| Capa | Tecnologia |
|------|-----------|
| Framework | Next.js 15 (App Router, TypeScript) |
| Estilos | Tailwind v4 + CSS Modules |
| Base de datos | PostgreSQL (Supabase) via Prisma ORM |
| Auth | NextAuth v5 (magic link alumnos, credenciales profesores) |
| Pagos | Stripe Checkout + webhooks |
| Email | Microsoft Azure Graph API (OAuth2) |
| SMS/WhatsApp | Twilio REST API |
| IA correcciones | Anthropic Claude (tool_use, rubricas DELF/DALF) |
| IA chat | Anthropic Claude Sonnet (streaming) |
| Hosting | Vercel |
| Tracking | Facebook Pixel |

---

## 3. Arquitectura de rutas

### 3.1 Route groups

| Grupo | Proposito | Layout |
|-------|----------|--------|
| `(cinematic)` | Web publica (tema oscuro navy/rouge) | Header + Footer + WhatsAppFloat |
| `(public)` | Paginas legacy y Le Cote Vie | Header + Footer |
| `(auth)` | Login, verificacion email | Minimalista |
| `(zona-alumno)` | Portal alumno | Sidebar + Topbar |
| `(zona-profesor)` | Portal profesor | Sidebar + Topbar |
| `examenes` | Simuladores DELF/DALF | Barra de examen |

### 3.2 Paginas publicas principales (22)

| Ruta | Descripcion |
|------|------------|
| `/` | Homepage cinematica |
| `/cursos` | Catalogo de cursos |
| `/cursos/clases-particulares` | Clases 1:1 por Zoom |
| `/cursos/conversacion` | Talleres de conversacion |
| `/cursos/intensivos` | Cursos intensivos |
| `/cursos/frances-empresas` | Frances profesional |
| `/cursos/preparacion-delf-dalf` | Itinerario DELF/DALF |
| `/examenes` | Hub de simuladores (A1-C2) |
| `/examenes/[nivel]/[modalidad]` | Simulador interactivo |
| `/examen-delf-a1` | Legacy: examen A1 antiguo |
| `/examen-delf-a2` | Legacy: examen A2 antiguo |
| `/correccion-ia` | Landing correccion IA |
| `/test-de-nivel` | Test de nivel (Le Voyage) |
| `/calendario-examenes` | Calendario convocatorias |
| `/calendario-examenes/[slug]` | SEO por nivel |
| `/tarifas` | Precios y packs |
| `/contratar` | Formulario de contratacion |
| `/sobre-nosotros` | Equipo |
| `/contacto` | Contacto |
| `/recursos/blog` | Blog |
| `/recursos/guia-delf-dalf` | Guia descargable |
| `/preguntas-frecuentes` | FAQ |

### 3.3 Le Cote Vie — seccion cultural (10 paginas)

| Ruta | Descripcion |
|------|------------|
| `/la-carte` | Mapa interactivo de Francia |
| `/la-carte/[region]` | Detalle por region |
| `/la-cuisine` | Recetas francesas |
| `/la-cuisine/[slug]` | Detalle receta |
| `/le-cinema` | Cine frances |
| `/le-cinema/[slug]` | Detalle pelicula |
| `/le-jeu` | Juegos de rol en frances |
| `/le-jeu/[scenario]` | Escenario interactivo |
| `/le-marche` | Quiz semanal |
| `/le-mot-du-jour` | Palabra del dia + newsletter |

### 3.4 Portales (28 paginas)

**Zona alumno (12):** Dashboard, calendario, clases, pack, pagos, recursos, reservar, correcciones (lista/nueva/detalle), resultados (lista/detalle)

**Zona profesor (16):** Dashboard, alumnos (lista/nuevo/detalle), calendario, clases (lista/nueva/detalle), disponibilidad, materiales (lista/subir), packs (lista/nuevo), pagos, correcciones (lista/detalle)

---

## 4. API (44 endpoints)

### 4.1 Flujos criticos

| Flujo | Endpoints | Integraciones |
|-------|----------|---------------|
| **Contratacion** | `/api/booking/checkout` → `/api/webhook/stripe` | Stripe, Azure email, Twilio SMS |
| **Correccion IA** | `/api/corrections/submit`, `/quota`, `/purchase`, `/[id]` | Claude tool_use, Stripe, Prisma |
| **Examenes** | `/api/examenes/attempts`, `/attempts/[id]` | Prisma |
| **Test de nivel** | `/api/assessments/*` (6 endpoints) | Prisma |
| **Auth** | `/api/auth/[...nextauth]` | NextAuth, Azure email |
| **Cron** | `/api/cron/class-reminders`, `/exam-reminders` | Twilio, Azure email |

### 4.2 Estado por endpoint

| Categoria | Endpoints | Error handling | Estado |
|-----------|----------|---------------|--------|
| Booking/Stripe | 2 | Try-catch + idempotency | OK |
| Corrections | 5 | Try-catch (submit), parcial resto | MEJORABLE |
| Exam attempts | 2 (+[id]) | Sin try-catch | PENDIENTE |
| Assessments | 6 | Completo | OK |
| Zona alumno | 5 | Completo | OK |
| Zona profesor | 12 | Completo | OK |
| Cron jobs | 2 | CRON_SECRET + logging | OK |
| Engagement | 6 | Variable | OK |

---

## 5. Motor de examenes DELF/DALF

### 5.1 Arquitectura

```
src/lib/examenes/
  types.ts          → Tipos: Examen, Seccion, Ejercicio, Pregunta (7 tipos de pregunta)
  config-niveles.ts → Configuracion por nivel (duraciones, secciones, puntuaciones)
  index.ts          → API publica: getExamen(), examenDisponible(), tieneAudio()
  data/
    A1-exemple1.ts  → [STUB] Placeholder
    A1-exemple2.ts  → [STUB] Placeholder
    A2-exemple1.ts  → [COMPLETO] 4 secciones, ~50 preguntas, 4 audios
    A2-exemple2.ts  → [COMPLETO] 4 secciones, ~40 preguntas, 4 audios
    B1-exemple1.ts  → [STUB] Audio listo, datos pendientes
    B1-exemple2.ts  → [STUB] Audio listo, datos pendientes
    B2-exemple1.ts  → [STUB] Audio listo, datos pendientes
    B2-exemple2.ts  → [STUB] Audio listo, datos pendientes
    C1-exemple1.ts  → [STUB] Audio listo, datos pendientes
    C1-exemple2.ts  → [STUB] Audio listo, datos pendientes
    C2-exemple1.ts  → [STUB] Audio listo, datos pendientes
    C2-exemple2.ts  → [STUB] Audio listo, datos pendientes
```

### 5.2 Tipos de pregunta soportados

| Tipo | Descripcion | Ejemplo |
|------|------------|---------|
| `qcm` | Opcion multiple (A/B/C/D) | "Quel est le numero de telephone?" |
| `vrai-faux` | Verdadero/Falso con justificacion | "Vrai ou Faux? Justifiez." |
| `reponse-libre` | Respuesta abierta corta | "Combien coute le billet?" |
| `grille` | Tabla criterios x opciones | Asociar dialogos con situaciones |
| `production` | Produccion escrita evaluada | Escribir email, carta, opinion |
| `oral` | Produccion oral con sujets | Monologue suivi, interaction |
| `association` | Emparejar elementos | (Disponible, no usado aun) |

### 5.3 Audio disponible vs datos

| Nivel | Audios | Datos transcritos | Estado |
|-------|--------|-------------------|--------|
| A1 | 5 ficheros (ruta legacy) | 0 secciones | Solo pagina legacy |
| **A2** | **8 ficheros** | **8 secciones (2 exams x 4)** | **COMPLETO** |
| B1 | 6 ficheros | 0 secciones | Audio listo, transcripcion pendiente |
| B2 | 6 ficheros + 1 integral | 0 secciones | Audio listo, transcripcion pendiente |
| C1 | 3 ficheros | 0 secciones | Audio listo, transcripcion pendiente |
| C2 | 2 ficheros (75MB + 70MB) | 0 secciones | Audio listo, transcripcion pendiente |

### 5.4 Flujo del simulador

1. `/examenes` → Hub con tarjetas por nivel (disponible/proximamente)
2. Click "Exemple 1/2" → `/examenes/a2/1`
3. `ExamenClient.tsx` carga datos, muestra seccion por seccion
4. `Temporizador.tsx` cuenta regresiva segun duracion oficial
5. CO/CE: correccion automatica instantanea
6. PE: envio a `/api/corrections/submit` (Claude IA)
7. Resultado guardado en `ExamAttempt` (Prisma)
8. CTAs post-examen: tarifas, correccion IA, WhatsApp

---

## 6. Sistema de correccion IA

### 6.1 Flujo

```
Usuario escribe texto → /api/corrections/submit
  → Valida nivel CECR + tipo de tarea + cuota
  → Crea WritingCorrection en DB (status: pending)
  → Llama Claude con tool_use + rubrica DELF/DALF
  → Parsea respuesta estructurada (scores, anotaciones, texto corregido)
  → Guarda resultado en DB
  → Devuelve JSON al frontend
```

### 6.2 Rubricas por nivel

Cada nivel (A1-C2) tiene criterios especificos del CECR:
- **A1-A2**: Respect de la consigne, Lexique, Morphosyntaxe, Coherence
- **B1-B2**: + Capacite a argumenter, Competence sociolinguistique
- **C1-C2**: + Competence pragmatique, elaboration

### 6.3 Cuotas

| Tipo | Correcciones | Precio |
|------|-------------|--------|
| Gratis | 3 | 0EUR |
| Pack alumno activo | Ilimitadas | Incluido en pack clases |
| Pack 10 | 10 | 19EUR |
| Unitario | 1 | 2,90EUR |

---

## 7. Base de datos (22 modelos)

### 7.1 Modelos core

| Modelo | Campos | Relaciones |
|--------|--------|-----------|
| `User` | 17 | Packs, Lessons, Materials, Payments, Corrections, ExamAttempts |
| `Pack` | 12 | User, Lessons, Payments |
| `Lesson` | 14 | Pack, User (teacher+student), Materials |
| `Payment` | 13 | Pack, User |

### 7.2 Modelos de examenes

| Modelo | Campos | Proposito |
|--------|--------|----------|
| `ExamSession` | 17 | Convocatorias oficiales (fechas, centros, ciudades) |
| `ExamReminder` | 6 | Recordatorios email por convocatoria |
| `ExamAttempt` | 15 | Intentos de simulador (scores CO/CE/PE/PO) |

### 7.3 Modelos de correccion

| Modelo | Campos | Proposito |
|--------|--------|----------|
| `WritingCorrection` | 23 | Resultado IA completo (scores, anotaciones, diff) |
| `CorrectionQuota` | 7 | Cuota gratis/pagada por email |
| `TeacherAnnotation` | 6 | Override del profesor sobre correccion IA |

### 7.4 Modelos de engagement

| Modelo | Campos | Proposito |
|--------|--------|----------|
| `Quiz` | 8 | Quiz semanal Le Marche |
| `QuizQuestion` | 9 | Preguntas con opciones JSON |
| `QuizResult` | 7 | Puntuaciones + leaderboard |
| `NewsletterSubscriber` | 5 | Mot du Jour |
| `AssessmentAttempt` | 11 | Test de nivel |

---

## 8. Componentes (105 ficheros)

### 8.1 Por namespace

| Namespace | Componentes | Proposito |
|-----------|------------|----------|
| `cinematic/` | 11 | Efectos visuales web publica (particles, morphblob, typewriter) |
| `ui/` | 9 | Sistema de diseno base (Button, Card, Modal, Toast) |
| `zona/` | 10 | Componentes portales (CalendarView, LessonCard, PackCard) |
| `correction/` | 6 | UI correccion IA (ScoreGauge, AnnotatedText, CorrectedTextDiff) |
| `assessment/` | 7 | Test de nivel (AnimatedGauge, CertificatePDF, ResultScreen) |
| `exam/` | 6 | Simulador examen (ExamShell, ExamMCQ, AudioPlayer, WritingExercise) |
| `le-voyage/` | 4 | Flujo test de nivel cinematico |
| `la-carte/` | 4 | Mapa interactivo Francia |
| `la-cuisine/` | 5 | Recetas |
| `le-cinema/` | 5 | Cine frances |
| `le-jeu/` | 7 | Juegos de rol |
| `le-marche/` | 4 | Quiz semanal |
| `le-mot-du-jour/` | 4 | Palabra del dia |
| `chat/` | 1 | Widget IA conversacional |
| `exams/` | 1 | Calendario convocatorias |
| `examenes/` | 1 | Temporizador |

---

## 9. Integraciones externas

| Servicio | Fichero | Uso |
|----------|---------|-----|
| **Stripe** | `src/lib/stripe.ts` | Checkout packs clases + correcciones. Webhook procesa ambos. |
| **Claude (Anthropic)** | `src/lib/correction/prompt-builder.ts`, `src/lib/chat/anthropic.ts` | Correccion escrita (tool_use) + chat streaming |
| **Azure Graph** | `src/lib/azure-mail.ts` | Todos los emails: auth magic link, confirmacion pago, recordatorios |
| **Twilio** | `src/lib/sms.ts` | SMS + WhatsApp: recordatorios clase, notificaciones staff |
| **NextAuth v5** | `src/lib/auth.ts` | Magic link (alumnos), credentials (profesores), PrismaAdapter |
| **Supabase** | `src/lib/supabase.ts` | PostgreSQL produccion |
| **Facebook Pixel** | `src/components/FacebookPixel.tsx` | Tracking conversiones |

---

## 10. Funnel de conversion

### 10.1 Puntos de entrada

```
SEO/Ads → Homepage → Test de nivel (Le Voyage)
                   → Simulador DELF gratuito
                   → Correccion IA (3 gratis)
                   → Blog / Le Cote Vie
```

### 10.2 Flujo principal

```
1. Test de nivel → Resultado + nivel CECR
   → CTA: "Ver tarifas y contratar" → /contratar?nivel=X
   → CTA: "Ver plan recomendado" → /cursos/preparacion-delf-dalf

2. Simulador DELF → Resultado por seccion
   → CTA: "Ver tarifas y packs" → /tarifas
   → CTA: "Prueba la correccion IA" → /correccion-ia
   → CTA: "Reservar clase de prueba" → WhatsApp

3. Correccion IA → 3 correcciones gratis
   → Cuota agotada → Pack 10 (19EUR Stripe) o Pack clases (150EUR+)

4. Contratacion → /contratar → Stripe Checkout
   → Webhook: confirma pago, activa pack, email + SMS
```

### 10.3 CTAs en Header

```
[Cursos] [Examenes NUEVO] [Correccion IA] [Tarifas] [Sobre nosotros] [Contacto]
                                                          [Area alumno] [Hacer el test de nivel]
```

---

## 11. Estado actual y pendientes

### 11.1 Completado

- [x] Web publica completa (22 paginas + Le Cote Vie)
- [x] Portales alumno (12 paginas) y profesor (16 paginas)
- [x] Sistema de auth (magic link + credentials)
- [x] Pagos Stripe (clases + correcciones)
- [x] Correccion IA con rubricas DELF/DALF
- [x] Motor de examenes con tipos de pregunta completos
- [x] Datos A2 completos (2 examenes, 8 secciones, ~90 preguntas)
- [x] Audio oficial para todos los niveles (A2-C2)
- [x] Calendario de convocatorias con recordatorios email
- [x] Chat IA streaming
- [x] Cron jobs (recordatorios clase + examen)
- [x] Facebook Pixel
- [x] SEO (schema.org, OG tags, canonicals)
- [x] Navegacion simplificada (6 links + auth + CTA)

### 11.2 Pendiente prioritario

| Prioridad | Tarea | Esfuerzo |
|-----------|-------|----------|
| **P0** | Transcribir B1 exemple 1 + 2 (audio ya listo) | 2-3h |
| **P0** | Transcribir B2 exemple 1 + 2 (audio ya listo) | 3-4h |
| **P1** | Transcribir C1 exemple 1 + 2 | 3-4h |
| **P1** | Transcribir C2 exemple 1 + 2 | 4-5h |
| **P1** | Migrar A1 de pagina legacy a motor nuevo | 1h |
| **P2** | Try-catch en `/api/examenes/attempts` | 30min |
| **P2** | Validacion scores en PATCH attempts | 30min |
| **P2** | Stripe webhook: no retornar 200 si falla addPaidCorrections | 15min |
| **P3** | Persistir leads de `/api/leads` en DB (actualmente solo console.log) | 30min |
| **P3** | Idempotencia en submit correcciones | 1h |

### 11.3 Metricas del proyecto

| Metrica | Valor |
|---------|-------|
| Paginas totales | 82 |
| Endpoints API | 44 |
| Componentes | 105 |
| Modelos Prisma | 22 |
| Examenes completos | 2 de 12 |
| Audio listo | 25 ficheros (245MB) |
| Integraciones externas | 7 |
| Lineas de codigo (estimado) | ~25.000 |

---

## 12. Variables de entorno requeridas

```env
# Base
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=...
NEXTAUTH_URL=https://www.holabonjour.es

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# Azure Email
AZURE_TENANT_ID=...
AZURE_CLIENT_ID=...
AZURE_CLIENT_SECRET=...
EMAIL_FROM=hola@holabonjour.es

# Anthropic (IA)
ANTHROPIC_API_KEY=sk-ant-...

# Twilio (SMS/WhatsApp)
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_FROM_NUMBER=+34...
TWILIO_WHATSAPP_FROM=whatsapp:+...
SMS_PROVIDER=twilio

# Auth profesores
TEACHER_PASSWORD_HASH_ISABELLE=...

# Cron
CRON_SECRET=...

# Tracking
NEXT_PUBLIC_FB_PIXEL_ID=...
```
