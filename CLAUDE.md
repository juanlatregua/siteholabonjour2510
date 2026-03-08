# HolaBonjour — Project Instructions

## Stack
- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **DB**: PostgreSQL on Supabase, Prisma 7 ORM (26 models)
- **Auth**: NextAuth v5 beta — magic link (students), credentials (teachers)
- **Payments**: Stripe (checkout sessions, webhooks)
- **Email**: Azure Communication Services (`src/lib/azure-mail.ts`)
- **SMS**: Twilio (`src/lib/sms.ts`)
- **AI**: Anthropic Claude SDK (correction engine)
- **Styling**: Tailwind v4 + inline styles (mixed, no CSS modules except Footer)

## Run Commands
```bash
npm run dev          # Dev server (port 3000)
npm run build        # Production build (TypeScript check)
npx prisma migrate dev --name <name>   # New migration
npx prisma generate  # Regenerate client after schema change
```

## Project Structure
```
src/
├── app/
│   ├── (cinematic)/          # Public pages — light palette (#faf7f2)
│   ├── (public)/             # Le Côté Vie cultural content
│   ├── (auth)/               # Login, verify-email, error
│   ├── (zona-alumno)/        # Student portal (auth required)
│   ├── (zona-profesor)/      # Teacher portal (TEACHER/ADMIN role)
│   ├── examenes/             # Exam engine (own layout)
│   ├── contratar/            # Booking funnel
│   ├── confirmacion/         # Post-purchase confirmation
│   ├── preparateurs/         # Marketplace profiles
│   ├── preguntas-frecuentes/ # FAQ page
│   └── api/                  # API routes
├── components/
│   ├── cinematic/       # Public site components (GlassCard, GoldButton, etc.)
│   ├── zona/            # Portal components
│   ├── correction/      # AI correction UI
│   ├── booking/         # PublicSlotPicker
│   ├── assessment/      # Assessment/quiz UI
│   ├── chat/            # Chat components
│   ├── exam/            # Exam UI components
│   ├── examenes/        # Exam components (Spanish)
│   ├── le-cinema/, la-cuisine/, le-jeu/, etc.  # Le Côté Vie section components
│   └── ui/              # Base UI components
├── lib/
│   ├── auth.ts          # NextAuth config
│   ├── auth.config.ts   # NextAuth provider config
│   ├── auth-helpers.ts  # Auth utility functions
│   ├── prisma.ts        # Prisma client singleton
│   ├── stripe.ts        # Stripe helpers + PACK_PRICES
│   ├── brand.ts         # Design tokens
│   ├── constants.ts     # Pricing, teacher emails, contact
│   ├── azure-mail.ts    # Azure email service
│   ├── email.ts         # Email utility wrapper
│   ├── sms.ts           # Twilio SMS
│   ├── sms-templates.ts # SMS templates
│   ├── supabase.ts      # Direct Supabase client
│   ├── teacher.ts       # Teacher utilities
│   ├── student-zone-db.ts    # Student portal DB helpers
│   ├── assessment-engine.ts  # Assessment processing
│   ├── delf-dalf.ts     # DELF/DALF exam data
│   ├── faq-content.ts   # FAQ content
│   ├── fei-resources.ts # FEI resources
│   ├── level-content.ts # Level-specific content
│   ├── correction/      # AI correction engine (rubrics, prompts, scoring)
│   ├── examenes/        # Exam data files + types
│   ├── assessment/      # Assessment utilities
│   └── chat/            # Chat/conversation logic
└── generated/prisma/    # Generated Prisma client
```

## Design Palette — "Variante C" (current)
Navy (#1e2d4a) backgrounds ONLY in navbar and footer.
Everything else uses light backgrounds:

| Token | Value | Usage |
|-------|-------|-------|
| `--cin-bg` | `#faf7f2` | Primary background |
| `--cin-bg-alt` | `#f0ede6` | Alternating sections |
| Card bg | `#ffffff` | Cards, inputs |
| Title text | `#1e2d4a` | Headings |
| Body text | `#3d4a5c` | Paragraphs |
| Muted text | `#5f6b78` | Captions, labels |
| Rouge accent | `#E50046` | CTAs, highlights |
| Bleu accent | `#395D9F` | Badges, links |
| Nav/Footer bg | `#1e2d4a` | Only these two |

DO NOT add navy backgrounds to page sections. Keep light.

## Key Conventions
- **Route groups**: `(cinematic)` = public, `(zona-alumno)` = student, `(zona-profesor)` = teacher
- **Teacher auth**: Credentials provider, password hash in env vars `TEACHER_PASSWORD_HASH_{NAME}`
- **Teacher emails**: Defined in `src/lib/constants.ts` → `TEACHER_EMAILS`
- **Middleware**: `src/middleware.ts` — whitelist public paths, auth-gate everything else
- **API public routes**: `/api/public/*`, `/api/corrections/*`, `/api/assessments/*` are unauthenticated
- **Stripe webhook**: `/api/webhook/stripe` — handles pack activation + correction purchases
- **Exam data**: `src/lib/examenes/data/{NIVEL}-exemple{N}.ts` — typed exam content
- **Audio files**: `public/examenes/audio/{NIVEL}/` — official FEI audio files

## Environment Variables Required
```
DATABASE_URL              # Supabase PostgreSQL connection string
NEXTAUTH_SECRET           # NextAuth JWT secret
NEXTAUTH_URL              # http://localhost:3000 (dev)
ANTHROPIC_API_KEY         # Claude API for AI corrections
STRIPE_SECRET_KEY         # sk_test_... or sk_live_...
STRIPE_WEBHOOK_SECRET     # whsec_...
AZURE_CLIENT_ID           # Azure email service
AZURE_CLIENT_SECRET
AZURE_TENANT_ID
EMAIL_FROM                # hola@holabonjour.es
TEACHER_PASSWORD_HASH_JUANSILVA
TEACHER_PASSWORD_HASH_ISABELLEGUITTON
```

## Do NOT Modify (stable systems)
- `src/lib/correction/` — AI correction engine (working in production)
- `src/app/(cinematic)/examen-delf-a1/` — Legacy A1 exam (functional)
- `src/middleware.ts` — Only add paths, don't restructure
- Prisma schema — Always create a migration after changes
- Footer / Header nav — Keep navy background

## Prisma Models (26 total)
Auth: Account, Session, VerificationToken, User
Booking: Pack, Lesson, Payment, Availability
Exams: ExamAttempt, ExamSession, ExamReminder, ExamenModelo
Assessment: AssessmentLink, AssessmentAttempt, AssessmentAttemptAnswer, Quiz, QuizQuestion, QuizResult
Corrections: WritingCorrection, CorrectionQuota, TeacherAnnotation
Content: Material, NewsletterSubscriber
Marketplace: PreparateurProfile, PreparateurReview, PreparateurApplication
