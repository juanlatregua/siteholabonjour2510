// Script to seed exam sessions into the database
// Run: npx tsx scripts/seed-exams.ts

import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { examSessionSeeds } from "../src/data/exam-sessions-seed";

async function main() {
  const prisma = new PrismaClient({
    adapter: new PrismaBetterSqlite3({
      url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
    }),
  });

  console.log(`Seeding ${examSessionSeeds.length} exam sessions...`);

  for (const seed of examSessionSeeds) {
    await prisma.examSession.create({
      data: {
        examType: seed.examType,
        level: seed.level,
        center: seed.center,
        centerType: seed.centerType,
        city: seed.city,
        province: seed.province,
        autonomousCommunity: seed.autonomousCommunity,
        registrationStart: seed.registrationStart ? new Date(seed.registrationStart) : null,
        registrationEnd: seed.registrationEnd ? new Date(seed.registrationEnd) : null,
        writtenExamDate: seed.writtenExamDate ? new Date(seed.writtenExamDate) : null,
        oralExamStart: seed.oralExamStart ? new Date(seed.oralExamStart) : null,
        oralExamEnd: seed.oralExamEnd ? new Date(seed.oralExamEnd) : null,
        resultsDate: seed.resultsDate ? new Date(seed.resultsDate) : null,
        fee: seed.fee || null,
        sourceUrl: seed.sourceUrl || null,
        notes: seed.notes || null,
        verified: false,
      },
    });
  }

  console.log("Done!");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
