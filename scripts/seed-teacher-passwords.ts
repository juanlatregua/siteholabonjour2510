/**
 * Backfill teacher passwordHash from env vars to DB.
 * Run once after adding the passwordHash column:
 *   DATABASE_URL="..." npx tsx scripts/seed-teacher-passwords.ts
 */
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  max: 1,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool),
});

const TEACHER_EMAILS = [
  "juansilva@traduccionesjuradas.net",
  "isabelleguitton@holabonjour.es",
];

async function main() {
  for (const email of TEACHER_EMAILS) {
    const envKey = `TEACHER_PASSWORD_HASH_${email.split("@")[0].toUpperCase().replace(/[^A-Z]/g, "")}`;
    const hash = process.env[envKey];

    if (!hash) {
      console.warn(`[skip] No env var ${envKey}`);
      continue;
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.warn(`[skip] User not found: ${email}`);
      continue;
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash: hash },
    });
    console.log(`[ok] ${email} → passwordHash updated`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
