import React from "react";
import Link from "next/link";
import { requireTeacher, getCurrentUser } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import Badge from "@/components/ui/Badge";
import { FiEdit3, FiExternalLink } from "react-icons/fi";

export default async function ProfesorCorreccionesPage() {
  const session = await requireTeacher();
  const user = await getCurrentUser(session.user.id);
  if (!user) return null;

  // Get student IDs for this teacher's students
  const studentIds = (
    await prisma.user.findMany({
      where: { coachId: user.id },
      select: { id: true },
    })
  ).map((s) => s.id);

  // Get corrections from assigned students
  const corrections = await prisma.writingCorrection.findMany({
    where: {
      userId: { in: studentIds.length > 0 ? studentIds : ["__none__"] },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  // Get student names for display
  const students = await prisma.user.findMany({
    where: { id: { in: studentIds } },
    select: { id: true, name: true, email: true },
  });
  const studentMap = new Map(students.map((s) => [s.id, s]));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Correcciones IA de alumnos</h2>
        <p className="mt-1 text-sm text-gray-500">
          Correcciones de expresión escrita de tus alumnos asignados.
        </p>
      </div>

      {corrections.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Correcciones recientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {corrections.map((c) => {
                const student = c.userId ? studentMap.get(c.userId) : null;
                const scoreLabel = c.globalScore != null && c.maxScore != null
                  ? `${c.globalScore}/${c.maxScore}`
                  : "—";
                const pct = c.globalScore != null && c.maxScore != null && c.maxScore > 0
                  ? Math.round((c.globalScore / c.maxScore) * 100)
                  : null;
                const color = pct !== null
                  ? pct >= 70 ? "success" : pct >= 50 ? "warning" : "danger"
                  : "default";

                return (
                  <Link
                    key={c.id}
                    href={`/zona-profesor/correcciones/${c.id}`}
                    className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <FiEdit3 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {student?.name || c.candidateEmail} — {c.level} · {c.taskType.replace(/_/g, " ")}
                        </p>
                        <p className="text-xs text-gray-500">
                          {format(c.createdAt, "d 'de' MMMM yyyy, HH:mm", { locale: es })}
                          {" · "}{c.wordCount} palabras
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={color as "success" | "warning" | "danger" | "default"}>
                        {scoreLabel}
                      </Badge>
                      <FiExternalLink className="h-3.5 w-3.5 text-gray-400" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      ) : (
        <EmptyState
          icon={<FiEdit3 className="h-12 w-12" />}
          title="Sin correcciones"
          description="Las correcciones IA de tus alumnos aparecerán aquí."
        />
      )}
    </div>
  );
}
