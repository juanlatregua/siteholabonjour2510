import { prisma } from "@/lib/prisma";
import { TEACHER_EMAILS } from "@/lib/constants";

const ISABELLE_EMAIL = TEACHER_EMAILS[1]; // isabelleguitton@holabonjour.es

export async function getDefaultTeacher() {
  const teacher = await prisma.user.findFirst({
    where: {
      email: ISABELLE_EMAIL,
      role: { in: ["TEACHER", "ADMIN"] },
      active: true,
    },
    select: { id: true, name: true, email: true },
  });

  if (!teacher) {
    throw new Error(`Default teacher not found: ${ISABELLE_EMAIL}`);
  }

  return teacher;
}

/** Look up a PreparateurProfile by slug. Returns null if not found or inactive. */
export async function getPreparateurBySlug(slug: string) {
  return prisma.preparateurProfile.findFirst({
    where: { slug, status: "ACTIVE" },
    include: {
      user: { select: { id: true, name: true, email: true } },
      reviews: { orderBy: { createdAt: "desc" } },
    },
  });
}

/** Get PreparateurProfile + teacher User for a slug, or fall back to Isabelle. */
export async function getTeacherBySlugOrDefault(slug?: string | null) {
  if (slug) {
    const profile = await getPreparateurBySlug(slug);
    if (profile) {
      return {
        teacher: profile.user,
        profile,
      };
    }
  }
  // Fallback: Isabelle
  const teacher = await getDefaultTeacher();
  const profile = await prisma.preparateurProfile.findFirst({
    where: { userId: teacher.id, status: "ACTIVE" },
    include: { reviews: { orderBy: { createdAt: "desc" } } },
  });
  return { teacher, profile };
}
