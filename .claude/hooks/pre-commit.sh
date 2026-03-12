#!/bin/bash
# Hook: pre-commit — Validación antes de commit
# Ejecuta lint, typecheck y prisma validate. Bloquea el commit si falla cualquiera.

set -e

echo "=== Pre-commit: lint ==="
npm run lint
if [ $? -ne 0 ]; then
  echo "BLOQUEADO: npm run lint falló. Corrige los errores antes de hacer commit."
  exit 1
fi

echo "=== Pre-commit: typecheck ==="
npx tsc --noEmit
if [ $? -ne 0 ]; then
  echo "BLOQUEADO: TypeScript tiene errores. Corrige antes de hacer commit."
  exit 1
fi

echo "=== Pre-commit: prisma validate ==="
npx prisma validate
if [ $? -ne 0 ]; then
  echo "BLOQUEADO: El schema de Prisma no es válido. Revisa prisma/schema.prisma."
  exit 1
fi

echo "=== Pre-commit: todo OK ==="
