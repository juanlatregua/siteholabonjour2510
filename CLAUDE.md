# HolaBonjour — Plataforma SaaS para profesores de francés

## WHY
Plataforma SaaS donde profesores FLE certificados gestionan su negocio de clases:
booking, videoconferencia, portal alumno, corrección IA, simuladores DELF/DALF.
Los profesores traen sus alumnos; la plataforma les da las herramientas.
Producción en holabonjour.es.

**Modelo de negocio:**
- Essentiel (gratis): perfil público, booking, 10 alumnos, link de video manual
- Professionnel (€39/mes): Zoom/Teams automático, grabaciones, corrección IA, simuladores, sin límite alumnos

## WHAT
```
src/
├── app/(cinematic)/        # Páginas públicas (palette claro #faf7f2)
│   ├── profesores/         # Landing captación profesores SaaS
│   ├── colabora/           # Formulario candidatura profesor
│   └── preparateurs/       # Directorio público de profesores
├── app/(zona-alumno)/      # Portal alumno (auth required)
│   └── zona-alumno/        # Dashboard, clases, mensajes, grabaciones, correcciones
├── app/(zona-profesor)/    # Portal profesor (TEACHER/ADMIN)
│   └── zona-profesor/      # Dashboard, alumnos, clases, candidaturas, analíticas
├── app/api/                # 80+ API routes
│   ├── mensajes/           # Chat alumno-profesor (polling)
│   ├── push/               # Web Push subscribe/unsubscribe
│   └── zona-profesor/candidaturas/  # Aprobar/rechazar candidaturas
├── app/examenes/           # Simuladores de examen (layout propio)
├── components/             # UI: Tailwind v4 + inline styles (sin shadcn/radix/MUI)
│   ├── chat/ChatWidget.tsx # Concierge IA (Claude streaming)
│   └── zona/               # Componentes de zona alumno/profesor
├── lib/                    # Auth, Stripe, email, SMS, Prisma, AI, storage, web-push
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
Stripe (pagos + futuro: Subscriptions para profesores) | Azure Graph API (email)
Twilio (SMS/WhatsApp) | Claude SDK (IA: correcciones + concierge + futuro: diploma scanner)
Supabase Storage (archivos + diplomas) | web-push (notificaciones) | Tailwind v4 + inline styles | Deploy: Vercel

## Convenciones
- Route groups: `(cinematic)` público, `(zona-alumno)` alumno, `(zona-profesor)` profesor
- Auth: magic link (alumnos) + credentials (profesores auto-registrados y staff). JWT con `role` + `userId`
- Roles: `STUDENT` | `TEACHER` | `ADMIN` (futuro: `TEACHER_PRO` para suscriptores)
- Middleware (`src/middleware.ts`): whitelist rutas públicas, auth-gate todo lo demás
- Admin pages: Server Components + Prisma directo. Client components solo para interactividad
- Palette: navy (#1e2d4a) SOLO en navbar/footer. Todo lo demás fondo claro (#faf7f2)
- Candidaturas profesor: `/colabora` (formulario) → BD `PreparateurApplication` → `/zona-profesor/candidaturas` (aprobar/rechazar) → User + PreparateurProfile automáticos
- Push notifications: web-push con VAPID, Service Worker en `public/sw.js`, lazy init
- Chat: Conversation/Message con polling (15-30s), no WebSockets

## NO modificar (sistemas estables en producción)
- `src/lib/correction/` — Motor IA de corrección
- `src/middleware.ts` — Solo añadir paths, no reestructurar
- `prisma/schema.prisma` — Siempre crear migración después de cambios
- **NUNCA usar `prisma db push` en producción** — siempre `prisma migrate dev` + `prisma migrate deploy`
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
   - **AI**: Anthropic Claude SDK para correcciones de escritura, análisis de exámenes, concierge chat, y (futuro) scanner de diplomas.
   - **Push**: web-push + VAPID keys. Service Worker en `public/sw.js`. Lazy init en `src/lib/web-push.ts`.
   - **Chat**: Conversation/Message models con polling. NO WebSockets. APIs en `/api/mensajes/*`.
   - **Deploy**: Vercel (vercel --prod). Crons en vercel.json.
   - **DB**: PostgreSQL en Supabase, Prisma 7. Shadow DB falla → usar migraciones manuales SQL + `prisma migrate resolve --applied`.
   - **NO instalados**: drizzle-orm, resend, supabase SDK, redis, ioredis

5. **Formato obligatorio de prompts de fixes:**
   ```
   ## Rutas verificadas (fecha)
   ## BLOQUE 1 — ALTA
   ## BLOQUE 2 — MEDIA
   ## AL TERMINAR — build + checklist en dev
   ```
