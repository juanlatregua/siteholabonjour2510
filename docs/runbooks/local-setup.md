# Local Setup — HolaBonjour

## Requisitos previos
- Node.js 20+
- npm
- Acceso a Supabase (DB + Storage)
- Cuentas: Stripe (test mode), Azure AD, Twilio, Anthropic

## Pasos

### 1. Clonar y instalar
```bash
git clone <repo-url>
cd HolaBonjour
npm install          # Ejecuta postinstall → prisma generate
```

### 2. Configurar variables de entorno
```bash
cp .env.example .env.local   # O crear manualmente
```

Variables mínimas para desarrollo:
```env
DATABASE_URL=postgresql://postgres:password@db.xxx.supabase.co:5432/postgres
NEXTAUTH_SECRET=un-secret-largo-random
NEXTAUTH_URL=http://localhost:3000

# Email (Azure)
AZURE_CLIENT_ID=...
AZURE_CLIENT_SECRET=...
AZURE_TENANT_ID=...
EMAIL_FROM=hola@holabonjour.es

# Stripe (test mode)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...   # Se obtiene al ejecutar stripe listen

# Supabase Storage
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# AI
ANTHROPIC_API_KEY=sk-ant-...

# Teachers
TEACHER_PASSWORD_HASH_JUANSILVA=...
TEACHER_PASSWORD_HASH_ISABELLEGUITTON=...
```

### 3. Sincronizar base de datos
```bash
npx prisma db push       # Aplica schema a la DB
npx prisma studio        # (Opcional) Verificar datos en navegador
```

### 4. Arrancar servidor
```bash
npm run dev              # http://localhost:3000
```

### 5. (Opcional) Stripe webhook local
```bash
# En otra terminal:
stripe listen --forward-to localhost:3000/api/webhook/stripe
# Copiar el whsec_... que muestra y ponerlo en STRIPE_WEBHOOK_SECRET
```

### 6. Verificar que funciona
- Visitar http://localhost:3000 — página pública
- Visitar http://localhost:3000/iniciar-sesion — login profesor
- Visitar http://localhost:3000/contratar — flujo de compra

## Problemas comunes
- **Shadow DB error en Prisma**: Normal con Supabase. Usar `prisma db push` en vez de `prisma migrate dev`
- **Email no se envía**: Verificar AZURE_* env vars y que el sender está autorizado en Azure AD
- **Stripe webhook 400**: Verificar que STRIPE_WEBHOOK_SECRET coincide con el de `stripe listen`
