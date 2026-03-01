import type { Metadata } from "next";
import { listPublicAssessments } from "@/lib/assessment/service";
import LeVoyageFlow from "@/components/le-voyage/LeVoyageFlow";

export const metadata: Metadata = {
  title: "Test de Nivel | Le Voyage",
  description:
    "Descubre tu nivel real de frances con Le Voyage, una experiencia interactiva que evalua tu comprension escrita, oral, gramatica y expresiones.",
  alternates: {
    canonical: "/test-de-nivel",
  },
};

export default function TestDeNivelPage() {
  const assessments = listPublicAssessments();

  return <LeVoyageFlow assessments={assessments} />;
}
