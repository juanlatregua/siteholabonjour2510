import React from "react";
import { requireStudent } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import LessonCard from "@/components/zona/LessonCard";
import EmptyState from "@/components/ui/EmptyState";
import { FiBook } from "react-icons/fi";
import ClasesFilter from "./ClasesFilter";

export default async function ClasesPage(props: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const session = await requireStudent();
  const { filter } = await props.searchParams;

  const activeFilter = filter || "upcoming";

  const statusFilter =
    activeFilter === "upcoming"
      ? { status: "SCHEDULED" }
      : activeFilter === "past"
        ? { status: { in: ["COMPLETED", "CANCELLED", "NO_SHOW"] } }
        : {};

  const lessons = await prisma.lesson.findMany({
    where: {
      studentId: session.user.id,
      ...statusFilter,
    },
    orderBy: {
      scheduledAt: activeFilter === "upcoming" ? "asc" : "desc",
    },
    include: {
      teacher: { select: { name: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Mis Clases</h2>
        <p className="mt-1 text-sm text-gray-500">
          Consulta tus clases programadas y pasadas.
        </p>
      </div>

      <ClasesFilter active={activeFilter} />

      {lessons.length > 0 ? (
        <div className="space-y-3">
          {lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              scheduledAt={lesson.scheduledAt}
              status={lesson.status}
              focus={lesson.focus}
              teacherName={lesson.teacher.name}
              zoomLink={lesson.zoomLink}
              durationMinutes={lesson.durationMinutes}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<FiBook className="h-12 w-12" />}
          title="Sin clases"
          description={
            activeFilter === "upcoming"
              ? "No tienes clases programadas. Reserva una nueva clase."
              : "No hay clases en tu historial."
          }
        />
      )}
    </div>
  );
}
