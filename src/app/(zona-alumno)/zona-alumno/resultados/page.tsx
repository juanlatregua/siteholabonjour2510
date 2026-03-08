import React from "react";
import { requireStudent } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import Link from "next/link";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import { FiBarChart2, FiExternalLink } from "react-icons/fi";
import ExamHistoryRow from "./ExamHistoryRow";

export default async function ResultadosPage() {
  const session = await requireStudent();

  const [assessmentLinks, examAttempts] = await Promise.all([
    prisma.assessmentLink.findMany({
      where: { userId: session.user.id },
      orderBy: { linkedAt: "desc" },
    }),
    prisma.examAttempt.findMany({
      where: { userId: session.user.id, status: "finished" },
      orderBy: { finishedAt: "desc" },
      take: 20,
    }),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Resultados</h2>
        <p className="mt-1 text-sm text-gray-500">
          Tus evaluaciones, pruebas de nivel y simulacros FEI.
        </p>
      </div>

      {/* Exam Attempts (Simulacros FEI) */}
      {examAttempts.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Simulacros FEI</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Desktop table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                    <th className="px-3 py-2">Fecha</th>
                    <th className="px-3 py-2">Nivel</th>
                    <th className="px-3 py-2 text-center">CO</th>
                    <th className="px-3 py-2 text-center">CE</th>
                    <th className="px-3 py-2 text-center">PE</th>
                    <th className="px-3 py-2 text-center">PO</th>
                    <th className="px-3 py-2 text-center">Total</th>
                    <th className="px-3 py-2 text-center">Resultado</th>
                    <th className="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {examAttempts.map((attempt) => (
                    <ExamHistoryRow key={attempt.id} attempt={attempt} />
                  ))}
                </tbody>
              </table>
            </div>
            {/* Mobile cards */}
            <div className="sm:hidden space-y-3">
              {examAttempts.map((attempt) => (
                <div
                  key={attempt.id}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center rounded-full bg-[#395D9F]/10 px-2.5 py-0.5 text-xs font-bold text-[#395D9F]">
                      {attempt.nivel}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${
                      attempt.passed
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-600 border border-red-200"
                    }`}>
                      {attempt.passed ? "Réussi" : "Non réussi"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">
                    {attempt.finishedAt
                      ? format(attempt.finishedAt, "d MMM yyyy, HH:mm", { locale: es })
                      : "—"}
                  </p>
                  <div className="grid grid-cols-5 gap-1 text-center text-xs">
                    <div>
                      <div className="text-gray-400 mb-0.5">CO</div>
                      <div className="font-semibold">{attempt.scoreCO !== null ? attempt.scoreCO : "—"}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 mb-0.5">CE</div>
                      <div className="font-semibold">{attempt.scoreCE !== null ? attempt.scoreCE : "—"}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 mb-0.5">PE</div>
                      <div className="font-semibold">{attempt.scorePE !== null ? attempt.scorePE : "—"}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 mb-0.5">PO</div>
                      <div className="font-semibold">{attempt.scorePO !== null ? attempt.scorePO : "—"}</div>
                    </div>
                    <div>
                      <div className="text-gray-400 mb-0.5">Total</div>
                      <div className="font-bold text-[#1e2d4a]">{attempt.totalScore ?? "—"}/100</div>
                    </div>
                  </div>
                  {attempt.aiAnalysis && (
                    <ExamHistoryRow attempt={attempt} mobileAiOnly />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent>
            <div className="text-center py-8">
              <div className="text-4xl mb-3">📝</div>
              <p className="font-semibold text-gray-900 mb-1">Sin simulacros</p>
              <p className="text-sm text-gray-500 mb-4">
                Realiza tu primer simulacro FEI para ver tus resultados aquí.
              </p>
              <Link
                href="/examenes"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#395D9F] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2d4a80] transition-colors"
              >
                Ir a simulacros
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Assessment Links */}
      {assessmentLinks.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Mis evaluaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {assessmentLinks.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Evaluación {link.assessmentId}
                    </p>
                    <p className="text-xs text-gray-500">
                      {format(link.linkedAt, "d 'de' MMMM yyyy", {
                        locale: es,
                      })}
                    </p>
                  </div>
                  <a
                    href={`/zona-alumno/resultados/${link.attemptId}`}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-[#1e2d4a] transition-colors hover:bg-[#1e2d4a]/5"
                  >
                    Ver resultados
                    <FiExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {assessmentLinks.length === 0 && examAttempts.length === 0 && (
        <EmptyState
          icon={<FiBarChart2 className="h-12 w-12" />}
          title="Sin resultados"
          description="Cuando completes una prueba de nivel o simulacro, tus resultados aparecerán aquí."
        />
      )}
    </div>
  );
}
