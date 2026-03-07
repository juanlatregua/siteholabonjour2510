import React from "react";
import { notFound } from "next/navigation";
import { requireTeacher } from "@/lib/auth-helpers";
import { prisma } from "@/lib/prisma";
import { CONFIG_NIVELES } from "@/lib/examenes/config-niveles";
import type { Examen, SeccionExamen, Nivel, Diploma } from "@/lib/examenes/types";
import ExamenClient from "@/app/examenes/[nivel]/[modalidad]/ExamenClient";

export default async function PreviewExamenPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await requireTeacher();
  const { id } = await params;

  const modelo = await prisma.examenModelo.findUnique({ where: { id } });
  if (!modelo || (modelo.creadoPor !== session.user.id && session.user.role !== "ADMIN")) {
    notFound();
  }

  const config = CONFIG_NIVELES[modelo.nivel];
  if (!config) notFound();

  // Map ExamenModelo → Examen type for ExamenClient
  const examen: Examen = {
    id: modelo.id,
    nivel: modelo.nivel as Nivel,
    diploma: modelo.diploma as Diploma,
    modalidad: "completo",
    ejemplo: modelo.numero as 1 | 2,
    titulo: modelo.titulo,
    secciones: (modelo.secciones as unknown as SeccionExamen[]) || [],
    puntuacionMinPorSeccion: 5,
    puntuacionMinTotal: 50,
  };

  return (
    <div>
      {/* Preview banner */}
      <div
        style={{
          background: "#fef3c7",
          border: "1px solid #fbbf24",
          borderRadius: 8,
          padding: "10px 16px",
          marginBottom: 16,
          textAlign: "center",
          fontSize: 14,
          fontWeight: 600,
          color: "#92400e",
        }}
      >
        PREVIEW — Este es un preview del examen, no es el examen real
      </div>
      <ExamenClient examen={examen} config={config} />
    </div>
  );
}
