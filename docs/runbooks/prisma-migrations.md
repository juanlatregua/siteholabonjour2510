# Prisma Migrations — HolaBonjour

## Contexto
Prisma 7 con PostgreSQL en Supabase. Shadow DB no funciona con Supabase
(requiere CREATE DATABASE, no disponible). Se usa `prisma db push` como alternativa.

## Crear una migración (desarrollo local)

### Opción A: prisma db push (recomendado con Supabase)
```bash
# 1. Editar prisma/schema.prisma
# 2. Aplicar cambios a la DB
npx prisma db push

# 3. Regenerar cliente
npx prisma generate
```

### Opción B: prisma migrate dev (si shadow DB funciona)
```bash
npx prisma migrate dev --name descripcion-del-cambio
# Esto genera: prisma/migrations/YYYYMMDDHHMMSS_descripcion/migration.sql
```

## Aplicar migraciones en producción (Supabase)

### Opción A: SQL directo (más seguro)
1. Abrir Supabase Dashboard → SQL Editor
2. Copiar el contenido de `prisma/migrations/YYYYMMDD_nombre/migration.sql`
3. Ejecutar el SQL
4. Verificar con `npx prisma studio` (apuntando a DB de producción)

### Opción B: prisma db push (más rápido)
```bash
# Con DATABASE_URL apuntando a producción
DATABASE_URL="postgresql://..." npx prisma db push
```

## Reglas de oro

1. **NUNCA editar migraciones ya aplicadas** — crear una nueva migración
2. **NUNCA borrar datos sin backup** — hacer SELECT antes de DELETE/DROP
3. **Siempre regenerar el cliente** después de cambiar el schema:
   ```bash
   npx prisma generate
   ```
4. **Verificar antes de aplicar** en producción:
   ```bash
   npx prisma migrate diff --from-schema-datasource prisma/schema.prisma --to-schema-datamodel prisma/schema.prisma
   ```
5. **Campos opcionales primero** — al añadir campos a tablas con datos, hacerlos opcionales (`?`)
   o con valor default. Después migrar datos y hacer required.

## Inspeccionar datos
```bash
npx prisma studio    # Navegador en localhost:5555
```

## Rollback
No hay rollback automático. Para deshacer:
1. Crear nueva migración que revierte los cambios
2. O ejecutar SQL manual en Supabase SQL Editor
