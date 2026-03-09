#!/usr/bin/env bash
# project-map.sh — Mapa real del proyecto HolaBonjour
set -euo pipefail
cd "$(dirname "$0")/.."

echo "=== PROJECT MAP — holabonjour.es ==="
echo "Fecha: $(date '+%Y-%m-%d %H:%M')"
echo ""

echo "── 1. API Routes ──"
find src/app/api -name "route.ts" 2>/dev/null | sort
echo ""

echo "── 2. Pages ──"
find src/app -name "page.tsx" 2>/dev/null | sort
echo ""

echo "── 3. Components ──"
find src/components -name "*.tsx" 2>/dev/null | sort
echo ""

echo "── 4. Scripts ──"
ls scripts/ 2>/dev/null
echo ""

echo "── 5. Cron Jobs ──"
find src/app/api/cron -name "route.ts" 2>/dev/null | sort
echo ""

echo "── 6. Environment Variables (.env.local) ──"
if [ -f .env.local ]; then
  grep -E '^[A-Z_]' .env.local | cut -d= -f1 | sort
elif [ -f .env ]; then
  grep -E '^[A-Z_]' .env | cut -d= -f1 | sort
else
  echo "(no .env file found)"
fi
echo ""

echo "── 7. Stack (package.json) ──"
node -e "
const pkg = require('./package.json');
const all = { ...pkg.dependencies, ...pkg.devDependencies };
const keys = [
  'next', 'react', 'typescript', 'tailwindcss',
  'prisma', '@prisma/client',
  'next-auth', '@auth/prisma-adapter',
  'stripe', '@stripe/stripe-js',
  '@anthropic-ai/sdk',
  '@azure/communication-email', '@azure/identity',
  'zod', 'react-hook-form',
  'framer-motion',
  '@vercel/analytics', '@vercel/speed-insights',
  'twilio',
];
for (const k of keys) {
  if (all[k]) console.log('  ' + k + ': ' + all[k]);
}
const notInstalled = ['drizzle-orm', 'resend', 'supabase', '@supabase/supabase-js', 'redis', 'ioredis'];
const missing = notInstalled.filter(k => !all[k]);
if (missing.length) console.log('  NOT installed: ' + missing.join(', '));
"
echo ""

echo "── 8. Prisma Models ──"
grep -E '^model ' prisma/schema.prisma 2>/dev/null | awk '{print "  " $2}'
echo ""

echo "=== END ==="
