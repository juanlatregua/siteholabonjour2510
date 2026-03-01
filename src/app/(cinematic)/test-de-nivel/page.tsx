import type { Metadata } from "next";
import { listPublicAssessments } from "@/lib/assessment/service";
import LeVoyageFlow from "@/components/le-voyage/LeVoyageFlow";

export const metadata: Metadata = {
  title: "Test de niveau — Le Voyage",
  description:
    "Descubre tu nivel real con nuestros tests oficiales basados en el MCER. Resultado inmediato y recomendación personalizada.",
  alternates: {
    canonical: "/test-de-nivel",
  },
};

export default function TestDeNivelPage() {
  const assessments = listPublicAssessments();

  return <LeVoyageFlow assessments={assessments} />;
}
