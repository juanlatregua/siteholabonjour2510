# Auth API — NO MODIFICAR SIN LEER ESTO

## Sistema
NextAuth v5 beta con JWT strategy (edge-compatible).

## Archivos relacionados
- `src/lib/auth.ts` — config principal (handlers, auth(), signIn, signOut)
- `src/lib/auth.config.ts` — providers y callbacks (edge-compatible)
- `src/lib/auth-helpers.ts` — requireAuth, requireRole, getCurrentUser
- `src/middleware.ts` — protección de rutas por rol

## JWT Claims
```typescript
token.role: "STUDENT" | "TEACHER" | "ADMIN"
token.userId: string
```

## Providers
1. **Email (Magic Link)** — alumnos. Envío via Azure Graph API. Token TTL: 10 min
2. **Credentials** — profesores. bcrypt hash en `User.passwordHash` (fallback: env vars)

## Reglas
- NO cambiar la estructura de callbacks (jwt, session) — rompe todas las sesiones activas
- NO cambiar el adapter (PrismaAdapter) — afecta tablas Account/Session/VerificationToken
- NO modificar el flujo de magic link sin probar envío real de email
- ADMIN override: cualquier requireRole() pasa si role === "ADMIN"
- El middleware valida auth en TODAS las rutas no whitelisted — ver src/middleware.ts
