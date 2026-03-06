import type { Metadata } from "next";
import ExamCalendar from "@/components/exams/ExamCalendar";

interface Props {
  params: Promise<{ slug: string }>;
}

const SLUG_MAP: Record<string, { examType: string; level: string; label: string }> = {
  "delf-a1": { examType: "DELF", level: "A1", label: "DELF A1" },
  "delf-a2": { examType: "DELF", level: "A2", label: "DELF A2" },
  "delf-b1": { examType: "DELF", level: "B1", label: "DELF B1" },
  "delf-b2": { examType: "DELF", level: "B2", label: "DELF B2" },
  "dalf-c1": { examType: "DALF", level: "C1", label: "DALF C1" },
  "dalf-c2": { examType: "DALF", level: "C2", label: "DALF C2" },
};

export async function generateStaticParams() {
  return Object.keys(SLUG_MAP).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const info = SLUG_MAP[slug];
  if (!info) {
    return { title: "Calendario de exámenes — HolaBonjour" };
  }
  return {
    title: `Exámenes ${info.label} en España 2026 — Fechas y centros — HolaBonjour`,
    description: `Fechas y centros de examen ${info.label} en España 2026. Alliance Française, Institut Français y EOI. Matrícula, pruebas escritas y orales.`,
    alternates: { canonical: `/calendario-examenes/${slug}` },
    openGraph: {
      title: `Exámenes ${info.label} en España 2026 — HolaBonjour`,
      description: `Calendario ${info.label}: fechas, centros, matrícula y precios.`,
      url: `https://holabonjour.es/calendario-examenes/${slug}`,
      siteName: "HolaBonjour",
      locale: "es_ES",
      type: "website",
    },
  };
}

export default async function ExamLevelPage({ params }: Props) {
  const { slug } = await params;
  const info = SLUG_MAP[slug];

  if (!info) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Examen no encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-[#faf7f2] text-[#1e2d4a] py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Exámenes {info.label} en España — 2026
          </h1>
          <p className="text-lg text-[#3d4a5c] max-w-2xl mx-auto">
            Todas las fechas y centros de examen {info.label} en España. Filtra por
            comunidad autónoma y activa recordatorios.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8">
        <ExamCalendar />
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl border p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Prepárate para el {info.label}
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Practica tu expresión escrita con nuestra corrección IA y prepara el
            examen con clases particulares.
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
              className="inline-block border border-[#1e2d4a] text-[#1e2d4a] hover:bg-[#1e2d4a]/5 font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Pack de clases
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
