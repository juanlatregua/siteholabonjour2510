import React from "react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { format, addDays } from "date-fns";
import { es } from "date-fns/locale/es";
import LessonCard from "@/components/zona/LessonCard";
import MaterialItem from "@/components/zona/MaterialItem";
import ConfirmNextClassButton from "@/components/zona/ConfirmNextClassButton";

import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import LessonEditForm from "./LessonEditForm";
import ZoomEditForm from "./ZoomEditForm";
import CancellationActions from "./CancellationActions";

export default async function ClaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) redirect("/iniciar-sesion");

  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      student: { select: { id: true, name: true, email: true } },
      teacher: { select: { id: true, name: true } },
      materials: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!lesson || lesson.teacherId !== session.user.id) {
    notFound();
  }

  // Check for recurring slot if lesson is completed
  let nextDateLabel: string | null = null;
  if (lesson.status === "COMPLETED") {
    const lessonDay = lesson.scheduledAt.getDay();
    const lessonTime = `${String(lesson.scheduledAt.getHours()).padStart(2, "0")}:${String(lesson.scheduledAt.getMinutes()).padStart(2, "0")}`;

    const recurringSlot = await prisma.recurringSlot.findFirst({
      where: {
        teacherId: session.user.id,
        studentId: lesson.studentId,
        dayOfWeek: lessonDay,
        startTime: lessonTime,
        active: true,
      },
    });

    if (recurringSlot) {
      let nextDate = addDays(lesson.scheduledAt, 7);
      const now = new Date();
      while (nextDate < now) {
        nextDate = addDays(nextDate, 7);
      }
      nextDateLabel = format(nextDate, "EEEE d 'de' MMMM, HH:mm", { locale: es });
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Detalle de clase</h2>
          <p className="mt-1 text-sm text-gray-500">
            {format(lesson.scheduledAt, "EEEE d 'de' MMMM yyyy, HH:mm", { locale: es })}
          </p>
        </div>
        <Link
          href="/zona-profesor/clases"
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Volver
        </Link>
      </div>

      {/* Lesson card */}
      <LessonCard
        scheduledAt={lesson.scheduledAt}
        status={lesson.status}
        focus={lesson.focus}
        teacherName={lesson.student.name || lesson.student.email}
        zoomLink={lesson.zoomLink}
        zoomStartUrl={lesson.zoomStartUrl}
        durationMinutes={lesson.durationMinutes}
        personLabel="Alumno"
        isTeacher
        recordingUrl={lesson.recordingUrl}
        cancellationRequestedAt={lesson.cancellationRequestedAt}
        modality={lesson.modality}
      />

      {/* Confirm next class for recurring students */}
      {lesson.status === "COMPLETED" && nextDateLabel && (
        <Card>
          <CardHeader>
            <CardTitle>Siguiente clase</CardTitle>
          </CardHeader>
          <CardContent>
            <ConfirmNextClassButton
              lessonId={lesson.id}
              nextDateLabel={nextDateLabel}
            />
          </CardContent>
        </Card>
      )}

      {/* Cancellation management */}
      <CancellationActions
        lessonId={lesson.id}
        status={lesson.status}
        scheduledAt={lesson.scheduledAt.toISOString()}
        cancellationRequestedAt={
          lesson.cancellationRequestedAt?.toISOString() ?? null
        }
        packId={lesson.packId}
        studentName={lesson.student.name || lesson.student.email || "Alumno"}
      />

      {/* Zoom management */}
      {lesson.status === "SCHEDULED" && lesson.modality !== "PRESENCIAL" && (
        <Card>
          <CardHeader>
            <CardTitle>Zoom</CardTitle>
          </CardHeader>
          <CardContent>
            <ZoomEditForm
              lessonId={lesson.id}
              initialZoomLink={lesson.zoomLink || ""}
            />
          </CardContent>
        </Card>
      )}

      {/* Edit notes & feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Notas y feedback</CardTitle>
        </CardHeader>
        <CardContent>
          <LessonEditForm
            lessonId={lesson.id}
            initialNotes={lesson.notes || ""}
            initialFeedback={lesson.studentFeedback || ""}
            initialStatus={lesson.status}
            scheduledAt={lesson.scheduledAt.toISOString()}
          />
        </CardContent>
      </Card>

      {/* Materials */}
      <Card>
        <CardHeader>
          <CardTitle>Materiales de la clase</CardTitle>
        </CardHeader>
        <CardContent>
          {lesson.materials.length > 0 ? (
            <div className="space-y-2">
              {lesson.materials.map((m) => (
                <MaterialItem
                  key={m.id}
                  title={m.title}
                  type={m.type}
                  storagePath={m.storagePath}
                  publicUrl={m.publicUrl}
                  createdAt={m.createdAt}
                  downloadEndpoint="/api/zona-profesor/download"
                  sizeBytes={m.sizeBytes}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="Sin materiales"
              description="No hay materiales asociados a esta clase."
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
