import type { Metadata } from "next";
import { listPublicAssessments } from "@/lib/assessment/service";
import LeVoyageFlow from "@/components/le-voyage/LeVoyageFlow";

export const metadata: Metadata = {
  title: "Test de nivel de francés gratis online — HolaBonjour",
  description:
    "Descubre tu nivel de francés con nuestro test gratuito de 15 minutos. Resultado inmediato y recomendación personalizada MCER.",
  alternates: { canonical: "/test-de-nivel" },
  openGraph: {
    title: "Test de nivel de francés gratis online — HolaBonjour",
    description:
      "Descubre tu nivel de francés con nuestro test gratuito de 15 minutos. Resultado inmediato y recomendación personalizada MCER.",
    url: "https://holabonjour.es/test-de-nivel",
    siteName: "HolaBonjour",
    locale: "es_ES",
    type: "website",
  },
};

export default function TestDeNivelPage() {
  const assessments = listPublicAssessments();

  return <LeVoyageFlow assessments={assessments} />;
}
