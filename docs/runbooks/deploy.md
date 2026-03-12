# Deploy — HolaBonjour

## Plataforma: Vercel (Pro plan)

### Dominio: holabonjour.es

## Deploy a producción

### 1. Verificar build local
```bash
npm run build    # Debe pasar sin errores (prisma generate + next build)
```

### 2. Deploy
```bash
vercel --prod    # Deploy directo a producción
```

### 3. Verificar en producción
- Visitar https://holabonjour.es
- Probar login de profesor
- Verificar que las APIs responden

## Variables de entorno en Vercel
Configuradas en Vercel Dashboard → Settings → Environment Variables.
Las mismas que en `.env.local` pero con valores de producción:
- `DATABASE_URL` — connection string de Supabase (producción)
- `NEXTAUTH_URL` — `https://holabonjour.es`
- `STRIPE_SECRET_KEY` — `sk_live_...`
- `STRIPE_WEBHOOK_SECRET` — webhook de producción
- `CRON_SECRET` — secret para autenticar cron jobs

## Cron Jobs
Configurados en `vercel.json`. Ejecutan endpoints `/api/cron/*`:
- `class-reminders` — recordatorios 24h antes de clase
- `exam-reminders` — recordatorios de convocatorias
- `exam-followup` — análisis IA post-examen
- `review-request` — solicitar valoración post-clase

Los crons requieren header `Authorization: Bearer {CRON_SECRET}`.

## Migraciones en producción
Ver `docs/runbooks/prisma-migrations.md`.
Ejecutar SQL en Supabase ANTES del deploy si hay cambios de schema.

## Rollback
```bash
# Ver deployments anteriores
vercel ls

# Volver a un deployment anterior
vercel rollback [deployment-url]
```

## Checklist pre-deploy
- [ ] `npm run build` pasa sin errores
- [ ] Si hay cambios en schema → migración aplicada en Supabase
- [ ] Variables de entorno nuevas → añadidas en Vercel Dashboard
- [ ] Webhook endpoints → verificar en Stripe Dashboard
