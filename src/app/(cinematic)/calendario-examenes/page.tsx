import type { Metadata } from "next";
import ExamCalendar from "@/components/exams/ExamCalendar";

export const metadata: Metadata = {
  title: "Calendario de exámenes DELF/DALF y EOI en España 2026 — HolaBonjour",
  description:
    "Consulta las fechas de exámenes oficiales de francés DELF, DALF y EOI en toda España. Filtra por nivel, comunidad autónoma y tipo de examen. Activa recordatorios.",
  alternates: { canonical: "/calendario-examenes" },
  openGraph: {
    title: "Calendario de exámenes DELF/DALF en España 2026 — HolaBonjour",
    description:
      "Fechas de exámenes DELF, DALF y EOI en toda España. Filtra por nivel y comunidad. Activa recordatorios.",
    url: "https://holabonjour.es/calendario-examenes",
    siteName: "HolaBonjour",
    locale: "es_ES",
    type: "website",
  },
};

export default function CalendarioExamenesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-[#1e2d4a] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Calendario de exámenes de francés en España
          </h1>
          <p className="text-lg text-blue-200 max-w-2xl mx-auto">
            Fechas actualizadas de DELF, DALF y EOI. Filtra por nivel, comunidad
            autónoma y centro. Activa recordatorios para no perder los plazos.
          </p>
        </div>
      </section>

      {/* Calendar */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <ExamCalendar />
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl border p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Prepárate con HolaBonjour
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Clases particulares con profesores nativos, corrección IA de
            expresión escrita y tests de nivel gratuitos.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/correccion-ia"
              className="inline-block bg-[#E50046] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#c7003b] transition-colors"
            >
              Corrección IA gratuita
            </a>
            <a
              href="/contratar"
              className="inline-block bg-[#1e2d4a] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#2e4d8a] transition-colors"
            >
              Contratar pack de clases
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
