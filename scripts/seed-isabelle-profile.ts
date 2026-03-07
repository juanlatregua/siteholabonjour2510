// Seed Isabelle's PreparateurProfile + Google reviews
// Run: npx tsx scripts/seed-isabelle-profile.ts

import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const ISABELLE_EMAIL =
  process.env.TEACHER_EMAIL_ISABELLE || "isabelleguitton@holabonjour.es";

const GOOGLE_REVIEWS = [
  {
    studentName: "Alessia Bo",
    rating: 5,
    comment:
      "Clases online para la preparación al DALF C2. La profesora Isabelle fue muy amable y profesional.",
    createdAt: "2024-09-01",
  },
  {
    studentName: "Irene Sogorb",
    rating: 5,
    comment:
      "He estado un año con Isabelle preparándome para el examen oficial. Isabelle es maravillosa.",
    createdAt: "2024-09-01",
  },
  {
    studentName: "Reena Huet",
    rating: 5,
    comment:
      "Isabelle is very welcoming and understanding, has lots of patience to teach french. For me she is the number one.",
    createdAt: "2018-09-20",
  },
  {
    studentName: "MJ Cano",
    rating: 5,
    comment:
      "La mejor opción para prepararte a tu ritmo. La enseñanza es personalizada, adaptada a tus necesidades.",
    createdAt: "2018-12-17",
  },
  {
    studentName: "Rosa Cabrera",
    rating: 5,
    comment:
      "El método y las profesoras son excepcionales. Súper recomendada tras mi experiencia con HolaBonjour.",
    createdAt: "2019-12-01",
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

    // Delete existing Google reviews and recreate with real data
    const deleted = await prisma.preparateurReview.deleteMany({
      where: { preparateurId: profile.id, source: "google" },
    });
    if (deleted.count > 0) {
      console.log(`Deleted ${deleted.count} old Google reviews`);
    }

    for (let i = 0; i < GOOGLE_REVIEWS.length; i++) {
      const review = GOOGLE_REVIEWS[i];
      await prisma.preparateurReview.create({
        data: {
          preparateurId: profile.id,
          studentId: review.studentName,
          lessonId: `google-review-${review.studentName.toLowerCase().replace(/\s+/g, "-")}`,
          rating: review.rating,
          comment: review.comment,
          source: "google",
          createdAt: new Date(review.createdAt),
        },
      });
    }
    console.log(`Created ${GOOGLE_REVIEWS.length} Google reviews`);

    console.log("Done!");
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
