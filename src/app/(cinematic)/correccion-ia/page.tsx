import type { Metadata } from "next";
import CorrectionPage from "@/components/correction/CorrectionPage";

export const metadata: Metadata = {
  title: "Corrección IA de expresión escrita en francés — DELF/DALF — HolaBonjour",
  description:
    "Corrige tu expresión escrita en francés con inteligencia artificial. Evaluación con rúbricas oficiales DELF/DALF, errores anotados, texto corregido y consejos. 3 correcciones gratis.",
  alternates: { canonical: "/correccion-ia" },
  openGraph: {
    title: "Corrección IA de expresión escrita en francés — HolaBonjour",
    description:
      "Corrige tu expresión escrita en francés con IA. Rúbricas oficiales DELF/DALF. 3 correcciones gratis.",
    url: "https://holabonjour.es/correccion-ia",
    siteName: "HolaBonjour",
    locale: "es_ES",
    type: "website",
  },
};

export default function CorreccionIAPage() {
  return <CorrectionPage />;
}
