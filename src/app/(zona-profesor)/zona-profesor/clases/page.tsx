import React from "react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { FiPlus } from "react-icons/fi";
import ClasesFilterProfesor from "./ClasesFilterProfesor";

export default async function ClasesPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/iniciar-sesion");

  const lessons = await prisma.lesson.findMany({
    where: { teacherId: session.user.id },
    orderBy: { scheduledAt: "desc" },
    include: {
      student: { select: { id: true, name: true, email: true } },
    },
  });

  const upcoming = lessons.filter((l) => l.status === "SCHEDULED");
  const past = lessons.filter((l) => l.status !== "SCHEDULED");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Clases</h2>
          <p className="mt-1 text-sm text-gray-500">
            {lessons.length} clase{lessons.length !== 1 ? "s" : ""} en total
          </p>
        </div>
        <Link
          href="/zona-profesor/clases/nueva"
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#0b3c6f] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0e4f8d]"
        >
          <FiPlus className="h-4 w-4" />
          Nueva clase
        </Link>
      </div>

      <ClasesFilterProfesor
        upcoming={upcoming.map((l) => ({
          id: l.id,
          scheduledAt: l.scheduledAt.toISOString(),
          status: l.status,
          focus: l.focus,
          zoomLink: l.zoomLink,
          durationMinutes: l.durationMinutes,
          studentName: l.student.name || l.student.email,
        }))}
        past={past.map((l) => ({
          id: l.id,
          scheduledAt: l.scheduledAt.toISOString(),
          status: l.status,
          focus: l.focus,
          zoomLink: l.zoomLink,
          durationMinutes: l.durationMinutes,
          studentName: l.student.name || l.student.email,
        }))}
      />
    </div>
  );
}
