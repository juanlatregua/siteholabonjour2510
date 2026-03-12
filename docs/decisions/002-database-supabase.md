# 002 — PostgreSQL en Supabase con Prisma ORM

## Contexto
Se necesitaba una base de datos relacional para modelar relaciones complejas entre usuarios,
packs, clases, pagos, exámenes y correcciones. Se evaluaron opciones managed (PlanetScale,
Neon, Supabase) por facilidad de operación.

## Decisión
PostgreSQL hosted en Supabase, con Prisma 7 como ORM. 28+ modelos. Supabase también
provee Storage para archivos (materiales, facturas, audio de exámenes).

## Consecuencias
- PostgreSQL full-featured (JSON fields, enums, relaciones complejas)
- Prisma genera tipos TypeScript automáticamente
- Shadow DB no funciona en Supabase → usar `prisma db push` o SQL manual
- Supabase Storage integrado (mismo proyecto, misma facturación)
- Sin Redis/cache — queries directas a DB (aceptable para el volumen actual)
