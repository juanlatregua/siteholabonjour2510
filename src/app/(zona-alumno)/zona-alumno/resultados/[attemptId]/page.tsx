import React from "react";
import Link from "next/link";
import { requireStudent } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import type { AssessmentResult } from "@/lib/assessment/types";

export default async function ResultadoDetailPage({
  params,
}: {
  params: Promise<{ attemptId: string }>;
}) {
  const { attemptId } = await params;
  const session = await requireStudent();

  // Verify the student owns this assessment link
  const link = await prisma.assessmentLink.findFirst({
    where: {
      attemptId,
      userId: session.user.id,
    },
  });

  if (!link) notFound();

  // Fetch the attempt with its result
  const attempt = await prisma.assessmentAttempt.findUnique({
    where: { id: attemptId },
  });

  if (!attempt || !attempt.result) notFound();

  let result: AssessmentResult;
  try {
    result = JSON.parse(attempt.result) as AssessmentResult;
  } catch {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Resultado de evaluación
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {format(attempt.finishedAt || attempt.createdAt, "d 'de' MMMM yyyy, HH:mm", {
              locale: es,
            })}
          </p>
        </div>
        <Link
          href="/zona-alumno/resultados"
          className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Volver
        </Link>
      </div>

      {/* Level + Score */}
      <Card>
        <CardContent>
          <div className="flex flex-col items-center py-4">
            <span className="mb-2 inline-flex items-center rounded-full border-2 border-[#E50046] px-4 py-1 text-lg font-bold text-[#E50046]">
              {result.estimatedLevel}
            </span>
            <div className="text-4xl font-bold text-[#1e2d4a]">
              {result.totalScore}
              <span className="text-xl text-gray-400">/{result.maxScore}</span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {result.percentage}% de acierto
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Recommended */}
      <Card>
        <CardHeader>
          <CardTitle>Recomendación</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>
              <span className="font-medium text-gray-700">Examen recomendado:</span>{" "}
              <span className="text-gray-900">{result.recommendedExam}</span>
            </p>
            <p>
              <span className="font-medium text-gray-700">Curso sugerido:</span>{" "}
              <span className="text-gray-900">{result.recommendedCourse}</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Section scores */}
      <Card>
        <CardHeader>
          <CardTitle>Detalle por sección</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result.sectionScores.map((section) => (
              <div key={section.sectionId}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">
                    {section.sectionTitle}
                  </span>
                  <span className="text-sm font-semibold text-[#1e2d4a]">
                    {section.score}/{section.maxScore} ({section.percentage}%)
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-gray-200">
                  <div
                    className={`h-2.5 rounded-full transition-all ${
                      section.percentage >= 60 ? "bg-[#395D9F]" : "bg-orange-400"
                    }`}
                    style={{ width: `${section.percentage}%` }}
                  />
                </div>
                {section.percentage < 60 && (
                  <p className="mt-1 text-xs text-orange-600">
                    Refuerza esta sección — por debajo del 60%.
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CTAs */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href={`/contratar?nivel=${result.estimatedLevel}`}
          className="inline-flex items-center justify-center rounded-lg bg-[#E50046] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#c7003b] transition-colors"
        >
          Ver tarifas y contratar
        </Link>
        <Link
          href={`/cursos/preparacion-delf-dalf?nivel=${result.estimatedLevel}`}
          className="inline-flex items-center justify-center rounded-lg border border-[#1e2d4a] px-5 py-2.5 text-sm font-semibold text-[#1e2d4a] hover:bg-[#1e2d4a]/5 transition-colors"
        >
          Ver plan recomendado
        </Link>
      </div>
    </div>
  );
}
