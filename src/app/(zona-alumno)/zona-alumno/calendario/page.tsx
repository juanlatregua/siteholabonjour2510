import React from "react";
import { requireStudent } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import CalendarView from "@/components/zona/CalendarView";

export default async function CalendarioPage() {
  const session = await requireStudent();

  const lessons = await prisma.lesson.findMany({
    where: { studentId: session.user.id },
    select: {
      id: true,
      scheduledAt: true,
      status: true,
    },
    orderBy: { scheduledAt: "asc" },
  });

  const serializedLessons = lessons.map((l) => ({
    id: l.id,
    scheduledAt: l.scheduledAt.toISOString(),
    status: l.status,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Calendario</h2>
        <p className="mt-1 text-sm text-gray-500">
          Vista mensual de todas tus clases.
        </p>
      </div>

      <CalendarView lessons={serializedLessons} />
    </div>
  );
}
