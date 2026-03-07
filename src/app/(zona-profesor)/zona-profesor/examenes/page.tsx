import React from "react";
import Link from "next/link";
import { requireTeacher } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import Card, { CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";

const STATUS_BADGE: Record<string, { label: string; variant: "default" | "warning" | "success" }> = {
  DRAFT: { label: "Borrador", variant: "default" },
  REVIEW: { label: "En revisión", variant: "warning" },
  PUBLISHED: { label: "Publicado", variant: "success" },
};

export default async function ExamenesListPage() {
  const session = await requireTeacher();

  const examenes = await prisma.examenModelo.findMany({
    where: { creadoPor: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Mis exámenes</h2>
          <p className="mt-1 text-sm text-gray-500">
            Crea y gestiona modelos de examen DELF/DALF.
          </p>
        </div>
        <Link
          href="/zona-profesor/examenes/nuevo"
          className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-700"
        >
          + Crear nuevo modelo
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Modelos de examen</CardTitle>
        </CardHeader>
        <CardContent>
          {examenes.length === 0 ? (
            <EmptyState
              title="Sin exámenes"
              description="Aún no has creado ningún modelo de examen. ¡Crea el primero!"
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left text-gray-500">
                    <th className="pb-3 pr-4 font-medium">Título</th>
                    <th className="pb-3 pr-4 font-medium">Nivel</th>
                    <th className="pb-3 pr-4 font-medium">Estado</th>
                    <th className="pb-3 pr-4 font-medium">Fecha</th>
                    <th className="pb-3 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {examenes.map((ex) => {
                    const badge = STATUS_BADGE[ex.status] || STATUS_BADGE.DRAFT;
                    return (
                      <tr key={ex.id} className="border-b last:border-0">
                        <td className="py-3 pr-4 font-medium text-gray-900">
                          {ex.titulo}
                        </td>
                        <td className="py-3 pr-4">
                          <Badge variant="info">{ex.nivel}</Badge>
                        </td>
                        <td className="py-3 pr-4">
                          <Badge variant={badge.variant}>{badge.label}</Badge>
                        </td>
                        <td className="py-3 pr-4 text-gray-500">
                          {new Date(ex.createdAt).toLocaleDateString("es-ES")}
                        </td>
                        <td className="py-3">
                          <div className="flex gap-2">
                            <Link
                              href={`/zona-profesor/examenes/${ex.id}`}
                              className="rounded-md bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 transition-colors hover:bg-gray-200"
                            >
                              Editar
                            </Link>
                            <Link
                              href={`/zona-profesor/examenes/${ex.id}/preview`}
                              className="rounded-md bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100"
                            >
                              Preview
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
