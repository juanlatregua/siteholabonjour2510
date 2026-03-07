# HolaBonjour — Referencia técnica completa

> Documento generado el 2026-03-06 para contexto de desarrollo con Claude.
> Proyecto: plataforma web de preparación DELF/DALF en español.
> Dominio: holabonjour.es

---

## 1. Stack tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | Next.js (App Router) | 15.5.x |
| Runtime | React / React DOM | 19.x |
| Lenguaje | TypeScript | 5.x |
| ORM | Prisma Client | 7.4.x |
| Base de datos | PostgreSQL (Supabase) | — |
| Auth | NextAuth (next-auth) | 5.0.0-beta.30 |
| CSS | Tailwind CSS v4 + CSS Modules | 4.x |
| Pagos | Stripe | 20.4.x |
| Email | SendGrid + Azure Mail | — |
| SMS | Twilio | — |
| IA | Anthropic Claude SDK | 0.78.x |
| PDF | jsPDF | 4.2.x |
| Formularios | react-hook-form + zod | 7.71 / 4.3 |
| Iconos | react-icons | 5.5.x |
| Slider | react-slick + slick-carousel | 0.30.x |
| Fechas | date-fns | 4.1.x |
| Upload | react-dropzone | 15.x |

### Scripts npm

```
dev         → next dev
build       → prisma generate && next build
postinstall → prisma generate
start       → next start
lint        → next lint
sync:fei    → node scripts/sync-fei-resources.mjs
```

---

## 2. Estructura del proyecto

```
src/
├── app/
│   ├── (auth)/                    # Login, verificación email, error
│   ├── (cinematic)/               # Web pública (tema oscuro navy/rouge)
│   │   ├── page.tsx               # HOME — Hero + niveles + CTA
│   │   ├── calendario-examenes/   # Calendario oficial DELF/DALF/EOI
│   │   ├── contacto/
│   │   ├── correccion-ia/         # Corrección IA pública
│   │   ├── cursos/                # 5 subpáginas de cursos
│   │   ├── empresas/
│   │   ├── examen-delf-a1/        # Simulador legacy A1
│   │   ├── examen-delf-a2/        # Simulador legacy A2
│   │   ├── politica-cookies/
│   │   ├── politica-privacidad/
│   │   ├── recursos/              # Blog + descargas + guía DELF
│   │   ├── sobre-nosotros/
│   │   ├── tarifas/
│   │   └── test-de-nivel/
│   ├── (public)/                  # Contenido cultural (tema claro)
│   │   ├── la-carte/              # Mapa interactivo de Francia
│   │   ├── la-cuisine/            # Recetas francesas
│   │   ├── le-cinema/             # Películas francesas
│   │   ├── le-jeu/                # Juego interactivo
│   │   ├── le-marche/             # Quiz semanal con ranking
│   │   ├── le-mot-du-jour/        # Palabra del día + newsletter
│   │   └── preparacion-delf-dalf/ # Landing funnel DELF/DALF
│   ├── (zona-alumno)/             # Portal alumno (protegido)
│   │   └── zona-alumno/
│   │       ├── calendario/
│   │       ├── clases/
│   │       ├── correcciones/      # Lista, nueva, [id]
│   │       ├── pack/
│   │       ├── pagos/
│   │       ├── recursos/
│   │       ├── reservar/
│   │       └── resultados/        # Lista, [attemptId]
│   ├── (zona-profesor)/           # Portal profesor (TEACHER/ADMIN)
│   │   └── zona-profesor/
│   │       ├── alumnos/           # Lista, [id], nuevo
│   │       ├── calendario/
│   │       ├── clases/            # Lista, [id], nueva
│   │       ├── correcciones/      # Lista, [id]
│   │       ├── disponibilidad/
│   │       ├── materiales/        # Lista, subir
│   │       ├── packs/             # Lista, nuevo
│   │       └── pagos/
│   ├── examenes/                  # Motor de exámenes nuevo
│   │   ├── layout.tsx             # Layout oscuro con Header/Footer
│   │   ├── page.tsx               # Hub — cards por nivel (A1–C2)
│   │   └── [nivel]/[modalidad]/
│   │       ├── page.tsx           # Server: valida nivel, carga examen
│   │       └── ExamenClient.tsx   # Client: intro → en-curso → resultado
│   ├── api/                       # 42 endpoints (ver sección 5)
│   ├── contratar/
│   ├── confirmacion/
│   └── preguntas-frecuentes/
├── components/
│   ├── assessment/                # Test de nivel (7 archivos)
│   ├── cinematic/                 # Componentes tema oscuro (14)
│   ├── correction/                # Corrección IA (6)
│   ├── exam/                      # ExamShell legacy A1/A2 (8)
│   ├── examenes/                  # Temporizador nuevo (1)
│   ├── exams/                     # ExamCalendar (1)
│   ├── la-carte/                  # Mapa interactivo (4)
│   ├── la-cuisine/                # Recetas (5)
│   ├── le-cinema/                 # Películas (5)
│   ├── le-jeu/                    # Juego (7)
│   ├── le-marche/                 # Quiz semanal (4)
│   ├── le-mot-du-jour/            # Palabra del día (4)
│   ├── le-voyage/                 # Test de nivel flujo (4)
│   ├── ui/                        # Componentes base (12)
│   ├── zona/                      # Portales alumno/profesor (13)
│   ├── Header.tsx                 # Nav horizontal desktop + burger mobile
│   ├── Header.module.css
│   ├── Footer.tsx
│   └── Footer.module.css
├── lib/
│   ├── assessment/                # Motor test de nivel (4)
│   ├── chat/                      # Chat IA (4)
│   ├── correction/                # Corrección IA (4)
│   ├── examenes/                  # Motor exámenes DELF/DALF (16)
│   ├── auth.ts                    # Config NextAuth
│   ├── brand.ts                   # Colores, fuentes, marca
│   ├── email.ts                   # SendGrid
│   ├── azure-mail.ts              # Azure email
│   ├── prisma.ts                  # Prisma client singleton
│   ├── sms.ts                     # Twilio
│   ├── stripe.ts                  # Stripe config + precios
│   └── supabase.ts                # Supabase client
├── generated/prisma/              # Prisma generated types
└── middleware.ts                  # Auth + role guard
```

---

## 3. Base de datos — Prisma schema (22 modelos)

### Modelos principales

| Modelo | Propósito | Campos clave |
|--------|-----------|-------------|
| **User** | Usuario (alumno/profesor/admin) | email, role (STUDENT/TEACHER/ADMIN), level (CEFR), phone, coachId |
| **Pack** | Pack de horas comprado | hoursTotal, hoursUsed, price, levelRange, status (ACTIVE/EXPIRED/EXHAUSTED/CANCELLED) |
| **Lesson** | Clase programada | scheduledAt, durationMinutes, zoomLink, status (SCHEDULED/COMPLETED/CANCELLED/NO_SHOW), focus, notes |
| **Material** | Material de clase | type (PDF/AUDIO/DOC/NOTE), storagePath, publicUrl, sizeBytes |
| **Payment** | Pago | amount, method (STRIPE/TRANSFER/BIZUM/OTHER), status (PENDING/CONFIRMED/REJECTED/REFUNDED), stripeSessionId |
| **Availability** | Disponibilidad profesor | dayOfWeek (0-6), startTime, endTime |

### Corrección IA

| Modelo | Propósito | Campos clave |
|--------|-----------|-------------|
| **WritingCorrection** | Corrección enviada | level, taskType, inputText, wordCount, globalScore, criterionScores (JSON), annotations (JSON), correctedText, estimatedLevel, modelUsed, inputTokens, outputTokens, latencyMs, status |
| **CorrectionQuota** | Cuota por email | freeUsed, freeLimit=3, paidRemaining |
| **TeacherAnnotation** | Anotación del profesor | correctionId, teacherId, content, scoreOverride (JSON) |

### Calendario de exámenes

| Modelo | Propósito | Campos clave |
|--------|-----------|-------------|
| **ExamSession** | Convocatoria oficial | examType (DELF/DALF/EOI), level, center, centerType, city, province, autonomousCommunity, registrationStart/End, writtenExamDate, fee |
| **ExamReminder** | Recordatorio | userId, examSessionId, reminderType (REGISTRATION_OPEN/REGISTRATION_CLOSING/EXAM_WEEK) |

### Quiz semanal (Le Marché)

| Modelo | Propósito |
|--------|-----------|
| **Quiz** | Quiz semanal (weekNumber, year, theme) |
| **QuizQuestion** | Pregunta (options JSON, correctIdx) |
| **QuizResult** | Resultado (name, email, score, timeMs) |

### Auth + Assessment

| Modelo | Propósito |
|--------|-----------|
| **Account** / **Session** / **VerificationToken** | NextAuth |
| **AssessmentLink** | Vincula usuario ↔ intento de test |
| **AssessmentAttempt** | Intento de test (assessmentId, status, result JSON) |
| **AssessmentAttemptAnswer** | Respuesta individual |
| **NewsletterSubscriber** | Suscriptor newsletter |

---

## 4. Autenticación y autorización

- **NextAuth v5** con Prisma adapter sobre PostgreSQL (Supabase)
- **Magic link** para alumnos (envío por email)
- **Credentials** para profesores (bcrypt)
- **Roles**: STUDENT, TEACHER, ADMIN
- **SessionProvider** envuelve toda la app en root layout

### Middleware (`src/middleware.ts`)

```
Rutas públicas: /, /cursos/*, /examenes/*, /correccion-ia, /calendario-examenes/*, ...
Rutas auth: /iniciar-sesion, /verificar-email, /error
APIs públicas: /api/auth/*, /api/assessments/*, /api/corrections/*, /api/exams/*, /api/le-marche/*, /api/leads
Protegidas: /zona-alumno/* → requiere sesión
Protegidas: /zona-profesor/* → requiere rol TEACHER o ADMIN
```

---

## 5. Endpoints API (42 rutas)

### Test de nivel
- `GET /api/assessments` — listar tests
- `GET /api/assessments/[id]` — detalle
- `POST /api/assessments/[id]/start` — iniciar intento
- `POST /api/assessments/[id]/answer` — responder pregunta
- `POST /api/assessments/[id]/finish` — finalizar
- `GET /api/assessments/[id]/result/[attemptId]` — resultado

### Corrección IA
- `POST /api/corrections/submit` — enviar texto para corrección
- `GET /api/corrections/[id]` — ver corrección
- `POST /api/corrections/[id]/annotations` — anotaciones profesor
- `GET /api/corrections/quota` — consultar cuota
- `POST /api/corrections/purchase` — comprar pack correcciones

### Calendario exámenes
- `GET /api/exams` — listar convocatorias
- `POST /api/exams/reminders` — activar recordatorio

### Portal alumno (protegido)
- `GET /api/zona-alumno/dashboard` — datos dashboard
- `GET /api/zona-alumno/[studentId]` — perfil
- `GET /api/zona-alumno/clases` — mis clases
- `GET /api/zona-alumno/reservar/disponibilidad` — slots libres
- `POST /api/zona-alumno/reservar` — reservar clase

### Portal profesor (protegido, TEACHER/ADMIN)
- `GET|POST /api/zona-profesor/alumnos` — listar/crear alumnos
- `GET|PATCH /api/zona-profesor/clases` — listar/actualizar clases
- `GET /api/zona-profesor/disponibilidad` — ver disponibilidad
- `GET|PATCH /api/zona-profesor/packs` — gestionar packs
- `GET /api/zona-profesor/materiales` — listar materiales
- `POST /api/zona-profesor/upload` — subir material
- `GET|PATCH /api/zona-profesor/pagos` — gestionar pagos
- `GET /api/zona-profesor/calendario` — datos calendario
- `GET /api/zona-profesor/download` — descargar archivo

### Quiz semanal
- `GET /api/le-marche/quiz` — quiz actual
- `GET /api/le-marche/quiz/[weekNumber]` — quiz específico
- `POST /api/le-marche/result` — enviar resultado
- `GET /api/le-marche/leaderboard` — ranking

### Otros
- `POST /api/chat` — chat IA
- `POST /api/leads` — captura leads
- `POST /api/le-mot-du-jour/subscribe` — suscripción newsletter
- `POST /api/booking/checkout` — checkout Stripe
- `POST /api/webhook/stripe` — webhook Stripe
- `GET /api/cron/class-reminders` — recordatorio clases
- `POST /api/cron/exam-reminders` — recordatorio exámenes

---

## 6. Motor de exámenes DELF/DALF

### Arquitectura

El motor está en `src/lib/examenes/` y usa tipos TypeScript estáticos (sin base de datos). Los datos de cada examen se definen en archivos `.ts` individuales.

### Sistema de tipos (`types.ts`)

```typescript
type Nivel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2'
type Diploma = 'DELF' | 'DALF'
type CodigoSeccion = 'CO' | 'CE' | 'PE' | 'PO'
type TipoPregunta = 'qcm' | 'vrai-faux' | 'reponse-libre' | 'grille' | 'production' | 'synthese'

interface OpcionQCM {
  letra: 'A' | 'B' | 'C' | 'D'
  texto: string
}

interface Pregunta {
  id: string
  numero: number
  tipo: TipoPregunta
  enunciado: string
  puntos: number
  opciones?: OpcionQCM[]           // QCM
  respuestaCorrecta?: string | boolean  // QCM→letra, vrai-faux→boolean
  justificacionCorrecta?: string   // Vrai-faux
  criterios?: CriterioGrille[]     // Grille
  opcionesGrille?: OpcionGrille[]
  respuestasGrille?: Record<string, Record<string, boolean>>
  opcionCorrectaGrille?: string
  minPalabras?: number             // Production
  criteriosEvaluacion?: { label: string; valores: number[] }[]
  nota?: string
}

interface Ejercicio {
  id: string
  numero: number
  titulo: string
  instrucciones: string
  texto?: string                   // Documento de lectura (CE)
  audio?: string                   // Ruta MP3 (CO)
  numEscuchas?: number
  tiempoLecturaPrevia?: number     // segundos
  pausaEntreEscuchas?: number      // segundos
  tiempoRespuestaFinal?: number    // segundos
  preguntas: Pregunta[]
  puntuacionTotal: number
}

interface SeccionExamen {
  id: string
  numero: 1 | 2 | 3 | 4
  codigo: CodigoSeccion            // CO, CE, PE, PO
  titulo: string
  duracionMinutos: number
  puntuacionTotal: number          // siempre 25
  instruccionesGenerales: string
  ejercicios: Ejercicio[]
  notasEspeciales?: string[]
}

interface Examen {
  id: string                       // ej: 'B2-exemple1'
  nivel: Nivel
  diploma: Diploma
  modalidad: Modalidad
  ejemplo: 1 | 2
  titulo: string
  secciones: SeccionExamen[]
  puntuacionMinPorSeccion: number  // siempre 5
  puntuacionMinTotal: number       // siempre 50
}
```

### Tipos de resultado

```typescript
interface RespuestaCandidat {
  preguntaId: string
  respuesta: string | boolean | null
  justificacion?: string
  respuestasGrille?: Record<string, Record<string, boolean>>
  opcionGrille?: string
}

interface ResultadoExamen {
  examenId: string
  fechaRealizacion: Date
  secciones: ResultadoSeccion[]    // cada una con ejercicios → preguntas
  puntuacionTotal: number
  aprobado: boolean
}
```

### Configuración por nivel (`config-niveles.ts`)

```typescript
const CONFIG_NIVELES: Record<string, ConfigNivel> = {
  A1: { diploma: 'DELF', duracionTotalMinutos: 70,  secciones: [CO:20, CE:30, PE:25, PO:10] },
  A2: { diploma: 'DELF', duracionTotalMinutos: 100, secciones: [CO:25, CE:30, PE:45, PO:10] },
  B1: { diploma: 'DELF', duracionTotalMinutos: 115, secciones: [CO:25, CE:45, PE:45, PO:15] },
  B2: { diploma: 'DELF', duracionTotalMinutos: 135, secciones: [CO:30, CE:35, PE:45, PO:20] },
  C1: { diploma: 'DALF', duracionTotalMinutos: 165, secciones: [CO:40, CE:50, PE:60, PO:30] },
  C2: { diploma: 'DALF', duracionTotalMinutos: 195, secciones: [CO:45, CE:60, PE:90, PO:30] },
}
```

### Registro de exámenes (`index.ts`)

```typescript
// Importa los 12 archivos de datos (6 niveles × 2 ejemplos)
import { examen_A1_exemple1 } from './data/A1-exemple1'
// ... etc

// API pública
getExamen(nivel: Nivel, ejemplo: 1 | 2): Examen | undefined
getExamenesPorNivel(nivel: Nivel): Examen[]
getNivelesDisponibles(): Nivel[]
tieneAudio(nivel: Nivel, ejemplo: 1 | 2): boolean
examenDisponible(nivel: Nivel, ejemplo: 1 | 2): boolean
getExamenesDisponiblesPorNivel(): Record<Nivel, Examen[]>
isLegacyExam(nivel: string): boolean  // A1 y A2 usan rutas legacy
```

### Archivos de datos

```
src/lib/examenes/data/
├── _PLANTILLA.ts          # Plantilla para nuevos exámenes
├── A1-exemple1.ts         # ⚠️ PLACEHOLDER (secciones: [])
├── A1-exemple2.ts         # ⚠️ PLACEHOLDER
├── A2-exemple1.ts         # ⚠️ PLACEHOLDER
├── A2-exemple2.ts         # ⚠️ PLACEHOLDER
├── B1-exemple1.ts         # ⚠️ PLACEHOLDER
├── B1-exemple2.ts         # ⚠️ PLACEHOLDER
├── B2-exemple1.ts         # ⚠️ PLACEHOLDER
├── B2-exemple2.ts         # ⚠️ PLACEHOLDER
├── C1-exemple1.ts         # ⚠️ PLACEHOLDER
├── C1-exemple2.ts         # ⚠️ PLACEHOLDER
├── C2-exemple1.ts         # ⚠️ PLACEHOLDER
└── C2-exemple2.ts         # ⚠️ PLACEHOLDER
```

> **Estado actual**: Todos los archivos son placeholders vacíos (`secciones: []`). Cada uno necesita ser rellenado con el contenido del PDF oficial correspondiente del sujet démo de France Éducation International.

### Convenciones de IDs

```
{NIVEL}-exemple{N}                    → id del examen: 'B2-exemple1'
{NIVEL}-e{N}-{SECCION}               → id de sección: 'B2-e1-CO'
{NIVEL}-e{N}-{SECCION}-ex{M}         → id de ejercicio: 'B2-e1-CO-ex1'
{NIVEL}-e{N}-{SECCION}-ex{M}-p{K}    → id de pregunta: 'B2-e1-CO-ex1-p1'
```

### Audios

```
public/examenes/audio/{NIVEL}/exempleN-exerciceM.mp3
```

Directorios creados (vacíos): `public/examenes/audio/{A1,A2,B1,B2,C1,C2}/`

Los audios de A1 y A2 ya existen en `public/audio/` (sistema legacy).

### Plantilla para transcribir un examen (`_PLANTILLA.ts`)

La plantilla incluye las 4 secciones (CO, CE, PE, PO) con ejemplos de:
- Ejercicio CO con audio, numEscuchas, tiempos de lectura/pausa/respuesta
- Ejercicio CE con texto de lectura y preguntas QCM
- Ejercicio PE con producción escrita, minPalabras y criteriosEvaluacion
- Ejercicio PO con las 3 partes (entretien dirigé, monologue, interaction)

### Componentes del motor

**Temporizador** (`src/components/examenes/Temporizador.tsx`):
- Props: `duracionMinutos`, `onTiempoAgotado`, `onTick?`, `autoStart?`
- Estados: activo | pausado | agotado
- Barra de progreso con colores: verde (>50%), amarillo (20-50%), rojo (<20%)
- Parpadeo cuando quedan <60 segundos
- Pausa automática al cambiar de pestaña (visibilitychange)
- Beep a los 5 minutos restantes (Web Audio API, 880Hz sine)

**ExamenClient** (`src/app/examenes/[nivel]/[modalidad]/ExamenClient.tsx`):
- Flujo: intro → en-curso → resultado
- Intro: tabla de secciones + reglas + botón "Comenzar examen"
- En curso: temporizador por sección + ejercicios + botón "Section suivante"
- Resultado: puntuación global, barras por sección, PE/PO marcados "Pendiente de revisión"
- Renders: QCM (radio con letras), vrai-faux (2 botones), production (textarea con word count), reponse-libre (input text)
- Corrección automática: QCM compara con respuestaCorrecta (string), vrai-faux compara boolean, reponse-libre compara lowercase

**Hub** (`src/app/examenes/page.tsx`):
- Cards por nivel con: badge diploma, duración, grid de secciones (CO/CE/PE/PO con iconos), botones Exemple 1/2
- Colores: emerald (A1-A2), blue (B1-B2), amber (C1-C2)
- Legacy A1/A2 enlazan a `/examen-delf-a1` y `/examen-delf-a2`
- Otros niveles enlazan a `/examenes/{nivel}/{1|2}`

### Exámenes legacy (A1 y A2)

Los exámenes A1 y A2 tienen páginas completas funcionales en:
- `/examen-delf-a1` → `src/app/(cinematic)/examen-delf-a1/`
- `/examen-delf-a2` → `src/app/(cinematic)/examen-delf-a2/`

Usan el componente `ExamShell` (`src/components/exam/ExamShell.tsx`, ~497 líneas) con:
- Tipos propios: `ExamData`, `ExamSection`, `ExamExercise`, `ExamQuestion`
- Audio integrado con `<audio>` HTML
- Datos completos con preguntas y respuestas reales del sujet démo oficial

---

## 7. Sistema de corrección IA

### Flujo

1. Usuario envía texto en `/correccion-ia` (público) o `/zona-alumno/correcciones/nueva`
2. `POST /api/corrections/submit` verifica cuota, crea registro en DB, llama a Claude
3. Claude evalúa con `tool_use` para devolver JSON estructurado
4. Resultado se guarda y se muestra en `/zona-alumno/correcciones/[id]`
5. Profesor puede añadir anotaciones en `/zona-profesor/correcciones/[id]`

### Rúbricas (`src/lib/correction/rubrics.ts`)

Cada nivel CEFR (A1–C2) tiene:
- `maxScore`: 25
- `minWords` / `maxWords` según nivel (A1: 40-50, B2: 250-280, C2: 300-500)
- `taskTypes`: tipos de tarea (formulaire, carte_postale, essai, lettre_formelle, synthèse, etc.)
- `criteria`: 5 criterios de evaluación basados en las grillas oficiales de FEI:
  - Respect de la consigne
  - Capacité à argumenter (B1+) / Correction sociolinguistique (A1-A2)
  - Compétence lexicale
  - Compétence grammaticale
  - Cohérence et cohésion

### Cuotas

- 3 correcciones gratuitas por email
- Pack de 10 correcciones: 19€
- Pack de 1 corrección: 2.90€
- Ilimitadas con pack de clases activo

---

## 8. Stripe — Pagos

### Packs de clases (`src/lib/stripe.ts`)

| Pack | Precio | Descripción |
|------|--------|-------------|
| DELF A1-B2 | desde 150€ | 4-20 horas |
| DALF C1-C2 | desde 200€ | 4-20 horas |

### Packs de correcciones

| Pack | Precio |
|------|--------|
| 10 correcciones | 19€ |
| 1 corrección | 2.90€ |

### Webhook

`POST /api/webhook/stripe` procesa:
- `checkout.session.completed` → detecta metadata `packId` (clase) o `correction_pack` (corrección)
- Crea registros en `Pack` + `Payment` o actualiza `CorrectionQuota`

---

## 9. Header y navegación

### Desktop (>768px)
- Logo a la izquierda
- 5 links centrados: Cursos, Preparación DELF/DALF, Exámenes (badge NUEVO), Blog, Sobre nosotros
- Derecha: botón auth condicional + CTA "Empezar gratis"
- Sticky con `backdrop-filter: blur(12px)`

### Mobile (<768px)
- Logo + hamburguesa
- Overlay fullscreen con links + CTAs

### Auth condicional (`useSession`)
- Sin sesión → "Área alumno" → `/iniciar-sesion`
- STUDENT → "Mi zona" → `/zona-alumno`
- TEACHER/ADMIN → "Zona profesor" → `/zona-profesor`

---

## 10. Diseño visual

### Colores de marca

| Color | Hex | Uso |
|-------|-----|-----|
| Bleu | #395D9F | Marca principal |
| Bleu dark | #1e2d4a | Fondo cinematic |
| Rouge | #E50046 | Acento, CTAs |
| Fondo oscuro | #0a0a0a | Páginas de exámenes |
| Texto claro | #f5f5f5 | Texto sobre fondo oscuro |
| Gold | #c9a84c | Detalles premium, DALF |

### Fuentes (Google Fonts)

- **Playfair Display** (serif) → Títulos, headings
- **DM Sans** (sans-serif) → Cuerpo de texto
- **Space Grotesk** (monospace) → Temporizador, datos técnicos
- **DM Mono** (monospace) → Código, badges

### Componentes cinematic (`src/components/cinematic/`)

- `GlassCard` — Tarjeta con glassmorphism
- `GoldButton` — Botón dorado estilizado
- `CinematicSection` — Wrapper de sección con gradientes
- `SceneGradient` — Fondo con degradado animado
- `TypeWriter` — Efecto máquina de escribir
- `RevealText` — Texto que aparece al scroll
- `MorphBlob` — Blob animado SVG
- `Particles` — Efecto partículas
- `WhatsAppFloat` — Botón flotante WhatsApp

---

## 11. Contenido cultural ("Le Côté Vie")

Secciones de contenido cultural francés accesibles desde la web pública:

| Sección | Ruta | Descripción |
|---------|------|-------------|
| La Carte | `/la-carte` | Mapa interactivo de Francia, regiones |
| La Cuisine | `/la-cuisine` | Recetas con vocabulario |
| Le Cinéma | `/le-cinema` | Películas francesas con quiz |
| Le Jeu | `/le-jeu` | Juego interactivo con escenarios |
| Le Marché | `/le-marche` | Quiz semanal con ranking en DB |
| Le Mot du Jour | `/le-mot-du-jour` | Palabra del día + newsletter |

---

## 12. Calendario de exámenes

- **Página**: `/calendario-examenes` (listado) + `/calendario-examenes/[slug]` (SEO por nivel)
- **Datos**: modelo `ExamSession` en Prisma
- **Seed**: `src/data/exam-sessions-seed.ts` + `scripts/seed-exams.ts`
- **API**: `GET /api/exams` (listar), `POST /api/exams/reminders` (recordatorios)
- **Cron**: `POST /api/cron/exam-reminders` (envío automático)
- **Tipos de centro**: Alliance Française, Institut Français, EOI

---

## 13. Test de nivel ("Le Voyage")

- **Landing**: `/test-de-nivel`
- **Motor**: `src/lib/assessment/` (repository, service, types, http)
- **Flujo**: CinematicIntro → PassportScreen → DestinationScreen → ResultScreen
- **Componentes**: `src/components/le-voyage/` + `src/components/assessment/`
- **Resultado**: nivel CEFR estimado, certificado PDF (jsPDF), compartir en redes
- **DB**: `AssessmentAttempt` + `AssessmentAttemptAnswer`

---

## 14. Redirects y SEO

### Redirects permanentes (next.config.ts)

24 redirects incluyendo:
- `/contact` → `/contacto`
- `/courses` → `/cursos`
- `/prueba-nivel` → `/test-de-nivel`
- `/blog` → `/recursos/blog`
- `/preparacion-delf-dalf` → `/cursos/preparacion-delf-dalf`
- Legacy HTML pages → rutas modernas
- `/phone/` y `/tablet/` → rutas limpias

### Metadata global

```
title: "Preparación online DELF/DALF | HolaBonjour"
base URL: https://www.holabonjour.es
OG image: /og-holabonjour.jpg (1200x630)
Schema: EducationalOrganization (JSON-LD)
```

---

## 15. Variables de entorno necesarias

```
DATABASE_URL           # PostgreSQL Supabase connection string
NEXTAUTH_SECRET        # Secret para JWT
NEXTAUTH_URL           # URL de callback auth
ANTHROPIC_API_KEY      # Claude API
STRIPE_SECRET_KEY      # Stripe
STRIPE_PUBLISHABLE_KEY # Stripe público
STRIPE_WEBHOOK_SECRET  # Verificación webhook
SENDGRID_API_KEY       # Email
TWILIO_ACCOUNT_SID     # SMS
TWILIO_AUTH_TOKEN       # SMS
AZURE_MAIL_ACCOUNT     # Azure email
AZURE_MAIL_PASSWORD    # Azure email
SUPABASE_URL           # Supabase
SUPABASE_ANON_KEY      # Supabase client
```

---

## 16. Estado actual y pendientes

### Funcional
- ✅ Web pública completa con tema oscuro
- ✅ Header horizontal desktop + mobile burger
- ✅ Portales alumno y profesor con auth
- ✅ Test de nivel interactivo con certificado
- ✅ Corrección IA con rúbricas DELF/DALF (Claude)
- ✅ Calendario de exámenes oficiales
- ✅ Simuladores legacy A1 y A2 completos
- ✅ Quiz semanal con ranking (Le Marché)
- ✅ Stripe checkout + webhook
- ✅ Hub de exámenes con cards por nivel
- ✅ Motor de exámenes con temporizador

### Pendiente
- ⚠️ Todos los archivos de datos de exámenes (12 ficheros) son placeholders vacíos — necesitan transcripción del PDF oficial
- ⚠️ Audios de exámenes B1-C2 no disponibles aún
- ⚠️ Contenido B2 demo que existía previamente fue perdido al migrar al scaffold
- ⚠️ Grille (tabla de correspondencias) renderizada pero no probada con datos reales
