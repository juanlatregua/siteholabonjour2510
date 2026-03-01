import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL ?? "file:./prisma/dev.db",
  }),
});

async function main() {
  // ── Teachers ──
  const teacher1 = await prisma.user.upsert({
    where: { email: "juansilva@traduccionesjuradas.net" },
    update: {},
    create: {
      email: "juansilva@traduccionesjuradas.net",
      name: "Juan Silva",
      role: "ADMIN",
      emailVerified: new Date(),
    },
  });

  const teacher2 = await prisma.user.upsert({
    where: { email: "isabelleguitton@holabonjour.es" },
    update: {},
    create: {
      email: "isabelleguitton@holabonjour.es",
      name: "Isabelle Guitton",
      role: "TEACHER",
      emailVerified: new Date(),
    },
  });

  // ── Demo student ──
  const student = await prisma.user.upsert({
    where: { email: "demo@holabonjour.es" },
    update: {},
    create: {
      email: "demo@holabonjour.es",
      name: "Alumno Demo",
      role: "STUDENT",
      level: "A2",
      coachId: teacher2.id,
      emailVerified: new Date(),
    },
  });

  // ── Demo pack ──
  await prisma.pack.upsert({
    where: { id: "demo-pack-01" },
    update: {},
    create: {
      id: "demo-pack-01",
      studentId: student.id,
      hoursTotal: 4,
      hoursUsed: 1,
      price: 140,
      levelRange: "A1-B2",
      status: "ACTIVE",
      expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    },
  });

  // ── Week 1 Quiz ──
  const quiz1 = await prisma.quiz.upsert({
    where: { weekNumber_year: { weekNumber: 1, year: 2026 } },
    update: {},
    create: {
      weekNumber: 1,
      year: 2026,
      theme: "La boulangerie",
      title: "Au marche: La boulangerie",
      publishedAt: new Date("2026-01-06"),
    },
  });

  // Delete old questions if re-seeding
  await prisma.quizQuestion.deleteMany({ where: { quizId: quiz1.id } });

  await prisma.quizQuestion.createMany({
    data: [
      {
        quizId: quiz1.id,
        text: "Comment appelle-t-on un petit pain rond en France ?",
        options: JSON.stringify(["Un croissant", "Un petit pain", "Une baguette", "Un pain de mie"]),
        correctIdx: 1,
        explanation: "Un 'petit pain' est un pain individuel de forme ronde.",
        order: 1,
      },
      {
        quizId: quiz1.id,
        text: "Quelle est la forme typique d'une baguette ?",
        options: JSON.stringify(["Ronde", "Carree", "Longue et fine", "Triangulaire"]),
        correctIdx: 2,
        explanation: "La baguette est longue (environ 65 cm) et fine.",
        order: 2,
      },
      {
        quizId: quiz1.id,
        text: "Que signifie 'une viennoiserie' ?",
        options: JSON.stringify([
          "Un plat autrichien",
          "Une patisserie feuilletee type croissant",
          "Un pain complet",
          "Un gateau d'anniversaire",
        ]),
        correctIdx: 1,
        explanation: "Les viennoiseries (croissants, pains au chocolat...) tirent leur nom de Vienne, en Autriche.",
        order: 3,
      },
      {
        quizId: quiz1.id,
        text: "Quel pain est fabrique avec de la farine complete ?",
        options: JSON.stringify(["Le pain blanc", "Le pain de seigle", "Le pain complet", "La brioche"]),
        correctIdx: 2,
        explanation: "Le pain complet utilise de la farine de ble entier.",
        order: 4,
      },
      {
        quizId: quiz1.id,
        text: "A quelle heure les boulangeries ouvrent-elles generalement en France ?",
        options: JSON.stringify(["5h-6h du matin", "8h du matin", "10h du matin", "Midi"]),
        correctIdx: 0,
        explanation: "Les boulangers commencent tres tot pour avoir le pain frais des l'ouverture.",
        order: 5,
      },
    ],
  });

  console.log("Seed completed:");
  console.log(`  Teachers: ${teacher1.name}, ${teacher2.name}`);
  console.log(`  Student: ${student.name}`);
  console.log(`  Quiz: ${quiz1.title} (${quiz1.weekNumber} questions)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
