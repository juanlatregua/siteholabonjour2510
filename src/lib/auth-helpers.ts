import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function getServerSession() {
  return auth();
}

export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    redirect("/iniciar-sesion");
  }
  return session;
}

export async function requireRole(role: string) {
  const session = await requireAuth();
  if (session.user.role !== role && session.user.role !== "ADMIN") {
    redirect("/");
  }
  return session;
}

export async function requireTeacher() {
  return requireRole("TEACHER");
}

export async function requireStudent() {
  const session = await requireAuth();
  if (
    session.user.role !== "STUDENT" &&
    session.user.role !== "TEACHER" &&
    session.user.role !== "ADMIN"
  ) {
    redirect("/");
  }
  return session;
}

export async function getCurrentUser(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    include: {
      studentPacks: {
        where: { status: "ACTIVE" },
        orderBy: { purchasedAt: "desc" },
        take: 1,
      },
      coach: { select: { id: true, name: true, email: true, image: true } },
      studentLessons: {
        where: { status: "SCHEDULED" },
        orderBy: { scheduledAt: "asc" },
        take: 5,
        include: {
          teacher: { select: { id: true, name: true, image: true } },
        },
      },
      studentMaterials: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
      studentPayments: {
        orderBy: { createdAt: "desc" },
        take: 10,
      },
      assessmentLinks: {
        orderBy: { linkedAt: "desc" },
        take: 5,
      },
    },
  });
}
