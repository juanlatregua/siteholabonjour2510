# HolaBonjour — Plataforma de clases de francés

## WHY
Plataforma SaaS para clases particulares de francés: reserva y gestión de clases con Zoom,
simuladores de exámenes DELF/DALF/EOI, corrección IA de escritura, y portal académico completo
para alumnos y profesores. Producción en holabonjour.es.

## WHAT
```
src/
├── app/(cinematic)/        # Páginas públicas (palette claro #faf7f2)
├── app/(zona-alumno)/      # Portal alumno (auth required)
├── app/(zona-profesor)/    # Portal profesor (TEACHER/ADMIN)
├── app/api/                # 70+ API routes
├── app/examenes/           # Simuladores de examen (layout propio)
├── components/             # UI: Tailwind v4 + inline styles (sin shadcn/radix/MUI)
├── lib/                    # Auth, Stripe, email, SMS, Prisma, AI, storage
└── generated/prisma/       # Prisma client generado (NO editar)
```

## HOW
```bash
npm run dev                              # Dev server (:3000)
npm run build                            # prisma generate + next build
npx prisma db push                       # Aplicar schema (shadow DB falla en Supabase)
npx prisma migrate dev --name <name>     # Nueva migración (solo local)
npx prisma studio                        # Inspeccionar datos en navegador
vercel --prod                            # Deploy a producción
```

## Stack
Next.js 15 + React 19 + TS | Prisma 7 + PostgreSQL (Supabase) | NextAuth v5 beta (JWT)
Stripe (pagos) | Azure Graph API (email) | Twilio (SMS/WhatsApp) | Claude SDK (IA)
Supabase Storage (archivos) | Tailwind v4 + inline styles | Deploy: Vercel

## Convenciones
- Route groups: `(cinematic)` público, `(zona-alumno)` alumno, `(zona-profesor)` profesor
- Auth: magic link (alumnos) + credentials (profesores). JWT con `role` + `userId`
- Middleware (`src/middleware.ts`): whitelist rutas públicas, auth-gate todo lo demás
- Admin pages: Server Components + Prisma directo. Client components solo para interactividad
- Palette: navy (#1e2d4a) SOLO en navbar/footer. Todo lo demás fondo claro (#faf7f2)

## NO modificar (sistemas estables en producción)
- `src/lib/correction/` — Motor IA de corrección
- `src/middleware.ts` — Solo añadir paths, no reestructurar
- `prisma/schema.prisma` — Siempre crear migración después de cambios
- Footer/Header nav — Mantener fondo navy

## PROTOCOLO OBLIGATORIO — Verificación antes de proponer fixes

1. **Siempre ejecutar `bash scripts/project-map.sh`** al inicio de cualquier sesión de audit o fixes. Nunca asumir rutas.

2. **Verificar archivos antes de editarlos:**
   ```bash
   find . -path "*/api/*" -name "route.ts" | grep <término>
   ```
   Si el archivo no existe donde se supone → buscarlo.
   Distinguir siempre entre "archivo a modificar" vs "archivo a crear".

3. **Todo prompt de fixes debe incluir una sección "Rutas verificadas"** al inicio, con la lista de archivos confirmados con ✓.

4. **Reglas de stack:**
   - **UI**: Tailwind v4 + inline styles. CSS Modules solo en Footer y Header. NO hay shadcn/ui, Radix, ni MUI instalados.
   - **Storage**: Supabase Storage (via `src/lib/supabase.ts` con service role key). NO hay Vercel Blob, S3, ni Cloudinary.
   - **Admin pages**: Server Components con Prisma directo (zona-profesor). Client components solo para interactividad (formularios, filtros).
   - **Auth**: NextAuth v5 beta. Magic link para alumnos, credentials para profesores. JWT strategy sin maxAge explícito (30 días default).
   - **Pagos**: Stripe checkout sessions + webhooks. Bizum/Transfer manual vía `/api/booking/manual`.
   - **Email**: Azure Communication Services (Microsoft Graph API). NO Resend, NO SendGrid.
   - **SMS/WhatsApp**: Twilio REST API directa (sin SDK). Canal WhatsApp preferido si `TWILIO_WHATSAPP_FROM` está configurado.
   - **AI**: Anthropic Claude SDK para correcciones de escritura y análisis de exámenes.
   - **Deploy**: Vercel (vercel --prod). Crons en vercel.json.
   - **DB**: PostgreSQL en Supabase, Prisma 7. Shadow DB falla → usar `prisma db push` + migration manual.
   - **NO instalados**: drizzle-orm, resend, supabase SDK, redis, ioredis

5. **Formato obligatorio de prompts de fixes:**
   ```
   ## Rutas verificadas (fecha)
   ## BLOQUE 1 — ALTA
   ## BLOQUE 2 — MEDIA
   ## AL TERMINAR — build + checklist en dev
   ```
