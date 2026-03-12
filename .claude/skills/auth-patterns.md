# Auth Patterns — HolaBonjour

## Sistema: NextAuth v5 beta con JWT

### Archivos clave
- `src/lib/auth.ts` — configuración principal NextAuth (handlers, auth, signIn, signOut)
- `src/lib/auth.config.ts` — config compartida edge-compatible (providers, callbacks)
- `src/lib/auth-helpers.ts` — helpers para server components y API routes
- `src/middleware.ts` — protección de rutas por rol

### Providers

**1. Email (Magic Link)** — para alumnos
- Usa Azure Graph API (Microsoft) para enviar el email
- Token TTL: 10 minutos
- Template HTML con branding HB + botón CTA

**2. Credentials** — solo para profesores
- Email + password
- Busca `User.passwordHash` en DB, fallback a env `TEACHER_PASSWORD_HASH_{NAME}`
- Solo permite roles TEACHER o ADMIN
- Hash con bcryptjs

### JWT Claims
```typescript
token.role: "STUDENT" | "TEACHER" | "ADMIN"
token.userId: string  // User.id de la DB
```

### Cómo leer la sesión

**Server Component:**
```typescript
import { auth } from "@/lib/auth"
const session = await auth()
// session.user.id, session.user.role, session.user.email
```

**API Route:**
```typescript
import { auth } from "@/lib/auth"
export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "No auth" }, { status: 401 })
}
```

**Client Component:**
```typescript
import { useSession } from "next-auth/react"
const { data: session } = useSession()
```

### Auth Helpers (`src/lib/auth-helpers.ts`)
```typescript
requireAuth()      // Redirige a /iniciar-sesion si no autenticado
requireRole(role)  // Verifica rol (ADMIN siempre pasa)
requireTeacher()   // Shortcut para requireRole("TEACHER")
requireStudent()   // Permite STUDENT, TEACHER, o ADMIN
getCurrentUser(id) // User completo con relaciones (packs, lessons, materials)
```

### Middleware — protección de rutas

**Rutas públicas (sin auth):**
- `/`, `/prueba-nivel`, `/contratar`, `/examenes`, `/preparateurs`, `/opinion`, `/correccion-ia`
- APIs: `/api/auth/*`, `/api/assessments/*`, `/api/corrections/*`, `/api/webhook/*`, `/api/cron/*`, `/api/booking/*`, `/api/public/*`

**Rutas protegidas por rol:**
- `/zona-profesor/*` → requiere TEACHER o ADMIN (redirige a `/zona-alumno` si no)
- Todo lo demás → requiere auth (redirige a `/iniciar-sesion?callbackUrl=...`)

### Reglas
- NO modificar el middleware sin entender el flujo completo
- Solo AÑADIR paths al whitelist público, nunca reestructurar
- Los teachers se identifican por email en `TEACHER_EMAILS` (src/lib/constants.ts)
- El passwordHash en DB tiene prioridad sobre env vars (migración en curso)
- ADMIN override: cualquier check de rol pasa si el usuario es ADMIN
