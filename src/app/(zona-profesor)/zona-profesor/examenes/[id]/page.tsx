import React from "react";
import { notFound } from "next/navigation";
import { requireTeacher } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import ExamWizard from "../nuevo/ExamWizard";

export default async function EditExamenPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireTeacher();
  const { id } = await params;

  const examen = await prisma.examenModelo.findUnique({ where: { id } });
  if (!examen || (examen.creadoPor !== session.user.id && session.user.role !== "ADMIN")) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Editar examen</h2>
        <p className="mt-1 text-sm text-gray-500">
          Modifica el modelo de examen &ldquo;{examen.titulo}&rdquo;.
        </p>
      </div>
      <ExamWizard
        initialData={{
          id: examen.id,
          titulo: examen.titulo,
          nivel: examen.nivel,
          diploma: examen.diploma,
          numero: examen.numero,
          esPago: examen.esPago,
          precio: examen.precio,
          status: examen.status,
          secciones: examen.secciones,
        }}
      />
    </div>
  );
}
