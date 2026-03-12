#!/usr/bin/env bash
set -euo pipefail

echo "🔧 HolaBonjour — Setup"
echo "======================"

# Check Node version
NODE_VERSION=$(node -v | sed 's/v//' | cut -d. -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
  echo "❌ Node >= 20 requerido (actual: $(node -v))"
  exit 1
fi
echo "✅ Node $(node -v)"

# Install dependencies
echo "📦 Instalando dependencias..."
npm install

# Check .env.local
if [ ! -f .env.local ]; then
  echo "⚠️  No se encontró .env.local — copia .env.example y configura las variables"
fi

# Prisma generate
echo "🔄 Generando Prisma client..."
npx prisma generate

# Prisma db push (only if DATABASE_URL is set)
if [ -n "${DATABASE_URL:-}" ]; then
  echo "🗄️  Sincronizando schema con la base de datos..."
  npx prisma db push
else
  echo "⏭️  DATABASE_URL no configurado — saltando db push"
fi

# Husky
echo "🐶 Configurando git hooks..."
npx husky

echo ""
echo "✅ Setup completado. Ejecuta 'npm run dev' para iniciar."
