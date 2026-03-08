import React from "react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import CalendarioProfesorClient from "./CalendarioProfesorClient";

export default async function CalendarioPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/iniciar-sesion");

  const [lessons, availabilitySlots] = await Promise.all([
    prisma.lesson.findMany({
      where: { teacherId: session.user.id },
      select: {
        id: true,
        scheduledAt: true,
        status: true,
        focus: true,
        student: { select: { name: true, email: true } },
      },
      orderBy: { scheduledAt: "asc" },
    }),
    prisma.availability.findMany({
      where: { teacherId: session.user.id, active: true },
      select: { dayOfWeek: true, startTime: true, endTime: true },
      orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
    }),
  ]);

  const calendarLessons = lessons.map((l) => ({
    id: l.id,
    scheduledAt: l.scheduledAt.toISOString(),
    status: l.status,
    personName: l.student.name ?? l.student.email ?? "",
    focus: l.focus,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Calendario</h2>
          <p className="mt-1 text-sm text-gray-500">
            Vista mensual de clases y disponibilidad.
          </p>
        </div>
        <Link
          href="/zona-profesor/clases"
          className="text-sm font-medium text-[#1e2d4a] hover:underline"
        >
          Ver todas las clases
        </Link>
      </div>

      <CalendarioProfesorClient
        lessons={calendarLessons}
        availability={availabilitySlots}
      />
    </div>
  );
}
