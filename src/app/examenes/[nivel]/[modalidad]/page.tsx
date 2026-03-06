import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getExamen, isLegacyExam, CONFIG_NIVELES } from "@/lib/examenes";
import type { Nivel } from "@/lib/examenes/types";
import ExamenClient from "./ExamenClient";

interface Props {
  params: Promise<{ nivel: string; modalidad: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { nivel, modalidad } = await params;
  const upper = nivel.toUpperCase();
  const cfg = CONFIG_NIVELES[upper];

  if (!cfg) return { title: "Examen | HolaBonjour" };

  return {
    title: `${cfg.diploma} ${upper} — Exemple ${modalidad} | HolaBonjour`,
    description: `Entraîne-toi avec le sujet démo officiel ${cfg.diploma} ${upper}. Questions interactives avec correction automatique.`,
  };
}

export default async function ExamenPage({ params }: Props) {
  const { nivel, modalidad } = await params;
  const nivelUpper = nivel.toUpperCase() as Nivel;

  // Validate nivel
  if (!["A1", "A2", "B1", "B2", "C1", "C2"].includes(nivelUpper)) {
    notFound();
  }

  // Legacy A1/A2 exams redirect to old pages
  if (isLegacyExam(nivel) && (modalidad === "demo" || modalidad === "1")) {
    redirect(`/examen-delf-${nivel.toLowerCase()}`);
  }

  // Parse ejemplo number (support both "1"/"2" and "demo"/"completo")
  let ejemplo: 1 | 2;
  if (modalidad === "1" || modalidad === "demo") {
    ejemplo = 1;
  } else if (modalidad === "2" || modalidad === "completo") {
    ejemplo = 2;
  } else {
    notFound();
  }

  const examen = getExamen(nivelUpper, ejemplo);
  const config = CONFIG_NIVELES[nivelUpper];

  if (!examen || !config || examen.secciones.length === 0) {
    notFound();
  }

  return <ExamenClient examen={examen} config={config} />;
}
