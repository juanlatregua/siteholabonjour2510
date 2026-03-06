// Seed Isabelle's PreparateurProfile + Google reviews
// Run: npx tsx scripts/seed-isabelle-profile.ts

import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const ISABELLE_EMAIL =
  process.env.TEACHER_EMAIL_ISABELLE || "isabelleguitton@holabonjour.es";

const GOOGLE_REVIEWS = [
  {
    rating: 5,
    comment:
      "Isabelle es una profesora excepcional. Su método de preparación para el DELF B2 es muy eficaz. Aprobé a la primera gracias a su orientación.",
  },
  {
    rating: 5,
    comment:
      "Excelente preparación para el DALF C1. Isabelle conoce perfectamente los criterios del examen y sabe exactamente qué necesitas mejorar.",
  },
  {
    rating: 5,
    comment:
      "Muy recomendable. Clases dinámicas y bien estructuradas. Aprobé el DELF B1 con nota alta después de solo 4 sesiones.",
  },
];

async function main() {
  const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL! }),
  });

  try {
    // Find Isabelle's user
    const user = await prisma.user.findUnique({
      where: { email: ISABELLE_EMAIL },
    });

    if (!user) {
      console.error(
        `User not found: ${ISABELLE_EMAIL}. Make sure Isabelle exists in the users table.`
      );
      process.exit(1);
    }

    console.log(`Found user: ${user.name} (${user.id})`);

    // Upsert PreparateurProfile
    const profile = await prisma.preparateurProfile.upsert({
      where: { userId: user.id },
      update: {
        displayName: "Isabelle Guitton",
        bio: "Profesora de FLE desde 2003 especializada en preparación DELF/DALF. El 100% de sus alumnos ha aprobado desde 2017 — niveles B1 a C2.",
        levels: ["B1", "B2", "C1", "C2"],
        languages: ["es", "fr"],
        specialties: [
          "DELF B1",
          "DELF B2",
          "DALF C1",
          "DALF C2",
          "Production écrite",
          "Production orale",
        ],
        hourlyRate: 3500,
        certificationVerified: true,
        verifiedBy: "admin",
        verifiedAt: new Date(),
        status: "ACTIVE",
      },
      create: {
        userId: user.id,
        slug: "isabelle-guitton",
        displayName: "Isabelle Guitton",
        bio: "Profesora de FLE desde 2003 especializada en preparación DELF/DALF. El 100% de sus alumnos ha aprobado desde 2017 — niveles B1 a C2.",
        levels: ["B1", "B2", "C1", "C2"],
        languages: ["es", "fr"],
        specialties: [
          "DELF B1",
          "DELF B2",
          "DALF C1",
          "DALF C2",
          "Production écrite",
          "Production orale",
        ],
        hourlyRate: 3500,
        certificationVerified: true,
        verifiedBy: "admin",
        verifiedAt: new Date(),
        status: "ACTIVE",
      },
    });

    console.log(`Profile created/updated: ${profile.slug} (${profile.id})`);

    // Seed Google reviews
    const existingReviews = await prisma.preparateurReview.count({
      where: { preparateurId: profile.id, source: "google" },
    });

    if (existingReviews === 0) {
      for (let i = 0; i < GOOGLE_REVIEWS.length; i++) {
        const review = GOOGLE_REVIEWS[i];
        await prisma.preparateurReview.create({
          data: {
            preparateurId: profile.id,
            studentId: "google-review",
            lessonId: `google-review-${i + 1}`,
            rating: review.rating,
            comment: review.comment,
            source: "google",
          },
        });
      }
      console.log(`Created ${GOOGLE_REVIEWS.length} Google reviews`);
    } else {
      console.log(
        `Skipped reviews: ${existingReviews} Google reviews already exist`
      );
    }

    console.log("Done!");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
