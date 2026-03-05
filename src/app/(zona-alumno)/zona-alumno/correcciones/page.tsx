import React from "react";
import Link from "next/link";
import { requireStudent } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import Badge from "@/components/ui/Badge";
import { FiEdit3, FiPlus, FiExternalLink } from "react-icons/fi";

export default async function CorreccionesListPage() {
  const session = await requireStudent();

  const corrections = await prisma.writingCorrection.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Correcciones IA</h2>
          <p className="mt-1 text-sm text-gray-500">
            Tus correcciones de expresión escrita con inteligencia artificial.
          </p>
        </div>
        <Link
          href="/zona-alumno/correcciones/nueva"
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#1e2d4a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2e4d8a]"
        >
          <FiPlus className="h-4 w-4" />
          Nueva corrección
        </Link>
      </div>

      {corrections.length > 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Mis correcciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {corrections.map((c) => {
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
                    href={`/zona-alumno/correcciones/${c.id}`}
                    className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                        <FiEdit3 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {c.level} — {c.taskType.replace(/_/g, " ")}
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
          description="Envía tu primer texto en francés para recibir una corrección detallada con IA."
          action={
            <Link
              href="/zona-alumno/correcciones/nueva"
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#1e2d4a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2e4d8a]"
            >
              <FiPlus className="h-4 w-4" />
              Nueva corrección
            </Link>
          }
        />
      )}
    </div>
  );
}
