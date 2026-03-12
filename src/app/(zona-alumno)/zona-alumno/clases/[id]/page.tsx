import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireStudent } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import LessonCard from "@/components/zona/LessonCard";
import MaterialItem from "@/components/zona/MaterialItem";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { FiArrowLeft, FiStar } from "react-icons/fi";

export default async function ClaseDetallePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireStudent();
  const { id } = await params;

  const lesson = await prisma.lesson.findUnique({
    where: { id },
    include: {
      teacher: { select: { name: true, email: true } },
      pack: { select: { levelRange: true, hoursTotal: true } },
      materials: { orderBy: { createdAt: "desc" } },
      review: true,
    },
  });

  if (!lesson || lesson.studentId !== session.user.id) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/zona-alumno/clases"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
      >
        <FiArrowLeft className="h-4 w-4" />
        Volver a clases
      </Link>

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          Clase del {format(lesson.scheduledAt, "d 'de' MMMM, yyyy", { locale: es })}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {format(lesson.scheduledAt, "HH:mm", { locale: es })} h &middot; {lesson.durationMinutes} min
          {lesson.teacher.name && ` · ${lesson.teacher.name}`}
        </p>
      </div>

      {/* Lesson card with zoom/cancel */}
      <LessonCard
        lessonId={lesson.id}
        scheduledAt={lesson.scheduledAt}
        status={lesson.status}
        focus={lesson.focus}
        teacherName={lesson.teacher.name}
        zoomLink={lesson.zoomLink}
        durationMinutes={lesson.durationMinutes}
        recordingUrl={lesson.recordingUrl}
        cancellationRequestedAt={lesson.cancellationRequestedAt}
        modality={lesson.modality}
      />

      {/* Details grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Teacher notes / feedback */}
        <Card>
          <CardHeader>
            <CardTitle>Notas del profesor</CardTitle>
          </CardHeader>
          <CardContent>
            {lesson.notes ? (
              <p className="whitespace-pre-wrap text-sm text-gray-700">{lesson.notes}</p>
            ) : (
              <p className="text-sm text-gray-400">Sin notas todavía.</p>
            )}
          </CardContent>
        </Card>

        {/* Pack info */}
        <Card>
          <CardHeader>
            <CardTitle>Info de la clase</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500">Modalidad</dt>
                <dd className="font-medium text-gray-900">
                  {lesson.modality === "PRESENCIAL" ? "Presencial" : "Zoom"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Duración</dt>
                <dd className="font-medium text-gray-900">{lesson.durationMinutes} min</dd>
              </div>
              {lesson.pack && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Pack</dt>
                  <dd className="font-medium text-gray-900">
                    {lesson.pack.levelRange || `${lesson.pack.hoursTotal}h`}
                  </dd>
                </div>
              )}
              {lesson.focus && (
                <div className="flex justify-between">
                  <dt className="text-gray-500">Tema</dt>
                  <dd className="font-medium text-gray-900">{lesson.focus}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>
      </div>

      {/* Materials */}
      {lesson.materials.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Materiales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lesson.materials.map((m) => (
                <MaterialItem
                  key={m.id}
                  title={m.title}
                  type={m.type}
                  storagePath={m.storagePath}
                  publicUrl={m.publicUrl}
                  createdAt={m.createdAt}
                  sizeBytes={m.sizeBytes}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Review */}
      <Card>
        <CardHeader>
          <CardTitle>Tu valoración</CardTitle>
        </CardHeader>
        <CardContent>
          {lesson.review?.submittedAt ? (
            <div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    className={`h-5 w-5 ${
                      (lesson.review?.rating ?? 0) >= star
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm font-medium text-gray-700">
                  {lesson.review.rating}/5
                </span>
              </div>
              {lesson.review.comment && (
                <p className="mt-2 text-sm text-gray-600">{lesson.review.comment}</p>
              )}
            </div>
          ) : lesson.review ? (
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Aún no has valorado esta clase.</p>
              <Link
                href={`/opinion/${lesson.review.token}`}
                className="rounded-lg bg-[#1e2d4a] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2e4d8a]"
              >
                Valorar clase
              </Link>
            </div>
          ) : (
            <p className="text-sm text-gray-400">No hay valoración disponible para esta clase.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
