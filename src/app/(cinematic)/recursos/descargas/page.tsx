import type { Metadata } from "next";
import GlassCard from "@/components/cinematic/GlassCard";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GoldButton from "@/components/cinematic/GoldButton";
import Particles from "@/components/cinematic/Particles";
import MorphBlob from "@/components/cinematic/MorphBlob";

export const metadata: Metadata = {
  title: "Descargas gratuitas de francés — Fichas y PDF — HolaBonjour",
  description:
    "Descarga fichas de gramática, vocabulario y guías de preparación DELF/DALF gratuitas en PDF. Material para todos los niveles.",
  alternates: { canonical: "/recursos/descargas" },
  openGraph: {
    title: "Descargas gratuitas de francés — Fichas y PDF — HolaBonjour",
    description:
      "Descarga fichas de gramática, vocabulario y guías de preparación DELF/DALF gratuitas en PDF. Material para todos los niveles.",
    url: "https://holabonjour.es/recursos/descargas",
    siteName: "HolaBonjour",
    locale: "es_ES",
    type: "website",
  },
};

const resources = [
  {
    icon: "\u{1F4C4}",
    title: "Fiches de grammaire",
    description:
      "Fichas de gramática por nivel. Conjugación, preposiciones, pronombres y más.",
    badge: "A1-B2",
    cta: "Prochainement",
  },
  {
    icon: "\u{1F4DA}",
    title: "Vocabulaire par niveau",
    description:
      "Listas de vocabulario temático organizadas por nivel CEFR.",
    badge: "A1-C1",
    cta: "Prochainement",
  },
  {
    icon: "\u{1F4CB}",
    title: "Guide DELF/DALF",
    description:
      "Guía completa de preparación con consejos y ejercicios tipo.",
    badge: "B1-C2",
    cta: "Prochainement",
  },
];

export default function DescargasPage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden flex items-center justify-center min-h-[70vh] px-6"
        style={{
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          color: "var(--cin-text)",
        }}
      >
        <Particles count={40} color="#e8b865" />
        <MorphBlob
          size={400}
          color="#e8b865"
          position={{ top: "-10%", left: "-5%" }}
        />
        <MorphBlob
          size={300}
          color="#3b82f6"
          position={{ bottom: "-10%", right: "-5%" }}
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-gold)",
            }}
          >
            Ressources à télécharger
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Material gratuito para complementar tu aprendizaje. Fichas,
            vocabulario y guías.
          </p>
        </div>
      </section>

      {/* Resources grid */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid sm:grid-cols-3 gap-6">
            {resources.map((resource) => (
              <GlassCard key={resource.title}>
                <div className="text-3xl mb-4">{resource.icon}</div>
                <div className="flex items-center gap-3 mb-3">
                  <h2
                    className="text-lg font-bold"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--cin-gold)",
                    }}
                  >
                    {resource.title}
                  </h2>
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full shrink-0"
                    style={{
                      background: "rgba(232,184,101,0.15)",
                      color: "var(--cin-gold)",
                      border: "1px solid rgba(232,184,101,0.25)",
                    }}
                  >
                    {resource.badge}
                  </span>
                </div>
                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  {resource.description}
                </p>
                <span
                  className="inline-block text-sm font-medium px-4 py-2 rounded-lg"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  {resource.cta}
                </span>
              </GlassCard>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* Note + CTA */}
      <CinematicSection className="py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--cin-gold)" }}
          >
            Nos ressources arrivent bientôt
          </h2>
          <p
            className="text-lg mb-8"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Mientras tanto, descubre tu nivel de francés con nuestro test
            gratuito.
          </p>
          <GoldButton href="/test-de-nivel">
            Faire le test de niveau
          </GoldButton>
        </div>
      </CinematicSection>
    </div>
  );
}
