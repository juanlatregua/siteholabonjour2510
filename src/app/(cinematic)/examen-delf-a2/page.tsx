import type { Metadata } from "next";
import ExamShell from "@/components/exam/ExamShell";
import { DELF_A2_EXAM } from "@/data/delf-a2-exam";

export const metadata: Metadata = {
  title: "Examen DELF A2 — Simulation complète avec correction IA — HolaBonjour",
  description:
    "Simulación completa del examen DELF A2: comprensión oral con audios, comprensión escrita, expresión escrita con corrección IA y producción oral. Practica como en el examen real.",
  alternates: { canonical: "/examen-delf-a2" },
  openGraph: {
    title: "Examen DELF A2 — Simulation complète — HolaBonjour",
    description:
      "Simulación completa del examen DELF A2 con audios oficiales, textos y corrección IA de tu expresión escrita.",
    url: "https://holabonjour.es/examen-delf-a2",
    siteName: "HolaBonjour",
    locale: "es_ES",
    type: "website",
  },
};

export default function ExamenDelfA2Page() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Quiz",
            "name": "DELF A2 — Simulation d'examen complet",
            "description":
              "Simulación completa del examen oficial DELF A2 con 4 secciones: comprensión oral, comprensión escrita, expresión escrita y expresión oral.",
            "educationalLevel": "A2",
            "inLanguage": "fr",
            "provider": {
              "@type": "EducationalOrganization",
              "name": "HolaBonjour",
              "url": "https://holabonjour.es",
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-[#faf7f2] text-[#1e2d4a] py-10">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-[#E50046] text-xs font-semibold mb-4">
            DELF A2
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Simulation d&apos;examen DELF A2
          </h1>
          <p className="text-[#3d4a5c] max-w-xl mx-auto">
            Examen complet avec les 4 épreuves : compréhension orale et écrite,
            production écrite (corrigée par IA) et production orale.
          </p>
          <div className="flex justify-center gap-4 mt-4 text-xs text-[#5f6b78]">
            <span>4 sections</span>
            <span>&middot;</span>
            <span>100 points</span>
            <span>&middot;</span>
            <span>~1h40</span>
          </div>
        </div>
      </section>

      {/* Exam */}
      <section className="bg-gray-50 min-h-screen pb-12">
        <ExamShell exam={DELF_A2_EXAM} correctionLevel="A2" correctionTaskType="lettre_informelle" minWritingWords={60} />
      </section>
    </div>
  );
}
