# 003 — NextAuth v5 beta para autenticación

## Contexto
Dos tipos de usuario con necesidades distintas: alumnos (login fácil, sin contraseña)
y profesores (acceso protegido con credenciales). Se necesitaba JWT para compatibilidad
con Edge Runtime (middleware).

## Decisión
NextAuth v5 beta con estrategia JWT. Dos providers:
- **Email (Magic Link)** para alumnos — envío via Azure Graph API
- **Credentials** para profesores — bcrypt hash en DB (migración desde env vars)

## Consecuencias
- JWT permite auth-check en middleware (Edge Runtime compatible)
- Magic link elimina fricción para alumnos (no recordar contraseñas)
- Los profesores tienen login tradicional más seguro
- JWT claims: `role` (STUDENT/TEACHER/ADMIN) + `userId`
- ADMIN override en todos los checks de rol
- Beta de NextAuth v5 — breaking changes posibles en actualizaciones
