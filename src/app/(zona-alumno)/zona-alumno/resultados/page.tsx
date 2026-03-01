import React from "react";
import { requireStudent } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { format } from "date-fns";
import { es } from "date-fns/locale/es";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import { FiBarChart2, FiExternalLink } from "react-icons/fi";

export default async function ResultadosPage() {
  const session = await requireStudent();

  const assessmentLinks = await prisma.assessmentLink.findMany({
    where: { userId: session.user.id },
    orderBy: { linkedAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Resultados</h2>
        <p className="mt-1 text-sm text-gray-500">
          Tus evaluaciones y pruebas de nivel.
        </p>
      </div>

      {assessmentLinks.length > 0 ? (
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
                    href={`/resultados/${link.attemptId}`}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-[#0b3c6f] transition-colors hover:bg-[#0b3c6f]/5"
                  >
                    Ver resultados
                    <FiExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <EmptyState
          icon={<FiBarChart2 className="h-12 w-12" />}
          title="Sin evaluaciones"
          description="Cuando completes una prueba de nivel, tus resultados aparecerán aquí."
        />
      )}
    </div>
  );
}
