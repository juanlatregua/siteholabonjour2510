import type { Metadata } from "next";
import { team } from "@/data/team";
import GlassCard from "@/components/cinematic/GlassCard";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GoldButton from "@/components/cinematic/GoldButton";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description:
    "Conoce al equipo de HolaBonjour: profesores nativos franceses especializados en preparación DELF/DALF y tecnología educativa.",
};

const methodologyPillars = [
  {
    title: "Inmersión cultural",
    description:
      "Aprendes francés a través de la cultura: cine, gastronomía, actualidad y juegos. Cada clase es una ventana a Francia.",
    icon: "🎬",
  },
  {
    title: "Preparación con criterio",
    description:
      "Cada sesión está alineada con los estándares oficiales DELF y DALF. Simulacros reales, correcciones detalladas, estrategia por prueba.",
    icon: "🎯",
  },
  {
    title: "Acompañamiento real",
    description:
      "Tu profesor te conoce, sigue tu progreso y adapta el plan. Nada de cursos genéricos: cada alumno tiene su ruta.",
    icon: "🤝",
  },
  {
    title: "100% online",
    description:
      "Clases en directo por videoconferencia desde donde estés. Sin desplazamientos, con la misma calidad que una clase presencial.",
    icon: "💻",
  },
];

export default function SobreNosotrosPage() {
  return (
    <div style={{ background: "var(--cin-bg)", color: "var(--cin-text)" }}>
      {/* Hero */}
      <CinematicSection className="py-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ fontFamily: "var(--font-display)", color: "var(--cin-gold)" }}
          >
            Sobre nosotros
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Dos apasionados del francés con una misión: hacer que aprender
            francés sea una experiencia, no solo una clase.
          </p>
        </div>
      </CinematicSection>

      {/* Team */}
      <CinematicSection className="py-16 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            {team.map((member) => (
              <GlassCard key={member.name} className="flex flex-col gap-4">
                <div>
                  <h2
                    className="text-2xl font-bold mb-1"
                    style={{ fontFamily: "var(--font-display)", color: "var(--cin-gold)" }}
                  >
                    {member.name}
                  </h2>
                  <p
                    className="text-sm font-medium mb-4"
                    style={{ color: "var(--cin-gold-light)" }}
                  >
                    {member.role}
                  </p>
                </div>
                <p
                  className="leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.75)" }}
                >
                  {member.bio}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {member.credentials.map((credential) => (
                    <span
                      key={credential}
                      className="text-xs font-medium px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(232,184,101,0.12)",
                        color: "var(--cin-gold-light)",
                        border: "1px solid rgba(232,184,101,0.2)",
                      }}
                    >
                      {credential}
                    </span>
                  ))}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* Methodology */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-14"
            style={{ fontFamily: "var(--font-display)", color: "var(--cin-gold)" }}
          >
            Nuestro método
          </h2>
          <div className="grid sm:grid-cols-2 gap-8">
            {methodologyPillars.map((pillar) => (
              <GlassCard key={pillar.title}>
                <div className="text-3xl mb-4" aria-hidden="true">
                  {pillar.icon}
                </div>
                <h3
                  className="text-xl font-semibold mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  {pillar.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* CTA */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ¿Quieres conocernos?
          </h2>
          <p
            className="mb-10 text-lg"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Escríbenos por WhatsApp o reserva una clase de prueba gratuita.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GoldButton href="https://wa.me/34685070304">
              WhatsApp
            </GoldButton>
            <GoldButton href="/contacto" variant="outline">
              Reservar clase de prueba
            </GoldButton>
          </div>
        </div>
      </CinematicSection>
    </div>
  );
}
