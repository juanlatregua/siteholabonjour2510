import React from "react";
import { requireStudent } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import EmptyState from "@/components/ui/EmptyState";
import { FiVideo } from "react-icons/fi";

export default async function GrabacionesPage() {
  const session = await requireStudent();

  const lessons = await prisma.lesson.findMany({
    where: {
      studentId: session.user.id,
      status: "COMPLETED",
      recordingUrl: { not: null },
    },
    orderBy: { scheduledAt: "desc" },
    include: {
      teacher: { select: { name: true } },
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Grabaciones</h2>
        <p className="mt-1 text-sm text-gray-500">
          Revisa las grabaciones de tus clases completadas.
        </p>
      </div>

      {lessons.length > 0 ? (
        <div className="space-y-3">
          {lessons.map((lesson) => {
            const date = new Date(lesson.scheduledAt);
            return (
              <div
                key={lesson.id}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {format(date, "EEEE d 'de' MMMM, yyyy", { locale: es })}
                    </p>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {format(date, "HH:mm", { locale: es })} h &middot;{" "}
                      {lesson.durationMinutes} min
                    </p>
                    {lesson.teacher.name && (
                      <p className="mt-1 text-sm text-gray-600">
                        Profesor:{" "}
                        <span className="font-medium">{lesson.teacher.name}</span>
                      </p>
                    )}
                    {lesson.focus && (
                      <p className="mt-1 text-sm text-gray-500">Tema: {lesson.focus}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-purple-100 p-2 text-purple-600">
                      <FiVideo className="h-4 w-4" />
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-3 border-t border-gray-100 pt-3">
                  <a
                    href={lesson.recordingUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-purple-50 px-4 py-2 text-sm font-semibold text-purple-700 transition-colors hover:bg-purple-100"
                  >
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    Ver grabación
                  </a>
                  {lesson.recordingPassword && (
                    <span className="text-xs text-gray-500">
                      Contraseña:{" "}
                      <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-gray-700">
                        {lesson.recordingPassword}
                      </code>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={<FiVideo className="h-12 w-12" />}
          title="Sin grabaciones"
          description="Las grabaciones de tus clases aparecerán aquí cuando estén disponibles."
        />
      )}
    </div>
  );
}
