import React from "react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import CalendarView from "@/components/zona/CalendarView";


export default async function CalendarioPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/iniciar-sesion");

  const lessons = await prisma.lesson.findMany({
    where: { teacherId: session.user.id },
    select: {
      id: true,
      scheduledAt: true,
      status: true,
    },
    orderBy: { scheduledAt: "asc" },
  });

  const calendarLessons = lessons.map((l) => ({
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

      <CalendarView lessons={calendarLessons} />
    </div>
  );
}
