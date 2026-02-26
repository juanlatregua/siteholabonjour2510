import type { Metadata } from "next";
import PlacementTest from "@/components/PlacementTest";

export const metadata: Metadata = {
  title: "Prueba de nivel francés online",
  description:
    "Test de nivel online orientativo para DELF/DALF con recomendación de itinerario de preparación.",
  alternates: {
    canonical: "/prueba-nivel",
  },
};

export default function PruebaNivelPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-2xl border border-blue-100 bg-blue-50/70 p-6">
        <h1 className="text-3xl font-bold text-[#0b3c6f] sm:text-4xl">Prueba de nivel DELF/DALF</h1>
        <p className="mt-3 text-sm text-gray-700 sm:text-base">
          Diagnóstico orientativo basado en destrezas y descriptores CEFR. Este test no sustituye la
          evaluación oficial del centro examinador, pero te sitúa en el punto de partida correcto para
          preparar tu convocatoria.
        </p>
      </section>

      <div className="mt-8">
        <PlacementTest />
      </div>
    </div>
  );
}
