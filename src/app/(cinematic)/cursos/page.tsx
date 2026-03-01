import type { Metadata } from "next";
import Link from "next/link";
import GlassCard from "@/components/cinematic/GlassCard";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GoldButton from "@/components/cinematic/GoldButton";

export const metadata: Metadata = {
  title: "Cursos de francés online con nativos — HolaBonjour",
  description:
    "Cursos individuales de francés online: DELF/DALF, conversación, empresas, intensivos. 1h por Zoom con profesoras nativas francesas.",
  alternates: { canonical: "/cursos" },
  openGraph: {
    title: "Cursos de francés online con nativos — HolaBonjour",
    description:
      "Cursos individuales de francés online: DELF/DALF, conversación, empresas, intensivos. 1h por Zoom con profesoras nativas francesas.",
    url: "https://holabonjour.es/cursos",
    siteName: "HolaBonjour",
    locale: "es_ES",
    type: "website",
  },
};

const courseTypes = [
  {
    title: "Préparation DELF/DALF",
    levels: "A1 – C2",
    description:
      "Preparación específica para cada nivel del examen oficial. Simulacros reales, correcciones detalladas y estrategia por prueba.",
    href: "/cursos/preparacion-delf-dalf",
  },
  {
    title: "Conversation",
    levels: "A2 – C2",
    description:
      "Práctica oral con profesores nativos. Temas de actualidad, debates, expresiones coloquiales y pronunciación.",
    href: "/cursos/conversacion",
  },
  {
    title: "Français pour entreprises",
    levels: "A1 – C1",
    description:
      "Programas corporativos adaptados: francés comercial, presentaciones, negociación y comunicación profesional.",
    href: "/cursos/frances-empresas",
  },
  {
    title: "Cours particuliers",
    levels: "A1 – C2",
    description:
      "Sesiones individuales con horarios flexibles. Contenido 100% adaptado a tus necesidades y ritmo.",
    href: "/cursos/clases-particulares",
  },
  {
    title: "Cours intensifs",
    levels: "A1 – C2",
    description:
      "Cursos sprint de 2-4 semanas para preparación de exámenes o inmersión rápida.",
    href: "/cursos/intensivos",
  },
];

const cefrLevels = [
  { level: "A1", name: "Découverte", description: "Primeras palabras y frases básicas" },
  { level: "A2", name: "Survie", description: "Comunicación en situaciones cotidianas" },
  { level: "B1", name: "Seuil", description: "Autonomía en viajes y conversaciones" },
  { level: "B2", name: "Avancé", description: "Argumentación y comprensión compleja" },
  { level: "C1", name: "Autonome", description: "Fluidez profesional y académica" },
  { level: "C2", name: "Maîtrise", description: "Nivel nativo o casi nativo" },
];

export default function CursosPage() {
  return (
    <div style={{ background: "var(--cin-bg)", color: "var(--cin-text)" }}>
      {/* Hero */}
      <CinematicSection className="py-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ fontFamily: "var(--font-display)", color: "var(--cin-gold)" }}
          >
            Nos cours de français en ligne
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Programas adaptados a tu nivel y objetivo. Clases en directo con
            profesores nativos.
          </p>
        </div>
      </CinematicSection>

      {/* Course types */}
      <CinematicSection className="py-12 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid sm:grid-cols-2 gap-6">
            {courseTypes.map((course) => (
              <Link
                key={course.title}
                href={course.href}
                style={{ textDecoration: "none" }}
              >
                <GlassCard className="h-full">
                  <div className="flex items-center justify-between mb-4">
                    <h2
                      className="text-xl font-bold"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {course.title}
                    </h2>
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(232,184,101,0.15)",
                        color: "var(--cin-gold)",
                        border: "1px solid rgba(232,184,101,0.25)",
                      }}
                    >
                      {course.levels}
                    </span>
                  </div>
                  <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.6 }}>
                    {course.description}
                  </p>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* CEFR levels */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-14"
            style={{ fontFamily: "var(--font-display)", color: "var(--cin-gold)" }}
          >
            Niveaux CECR
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {cefrLevels.map((item) => (
              <div
                key={item.level}
                className="rounded-2xl p-5 text-center"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <p
                  className="text-2xl font-bold mb-1"
                  style={{ color: "var(--cin-gold)" }}
                >
                  {item.level}
                </p>
                <p className="text-sm font-semibold mb-1">{item.name}</p>
                <p
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* CTA */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Vous ne connaissez pas votre niveau ?
          </h2>
          <p
            className="text-lg mb-8"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Haz nuestro test gratuito y descubre tu nivel de francés en menos de
            20 minutos.
          </p>
          <GoldButton href="/test-de-nivel">Faire le test de niveau</GoldButton>
        </div>
      </CinematicSection>
    </div>
  );
}
