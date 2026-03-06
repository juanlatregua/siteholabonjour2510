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
