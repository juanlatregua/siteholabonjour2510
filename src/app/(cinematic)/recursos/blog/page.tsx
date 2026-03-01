import type { Metadata } from "next";

import GlassCard from "@/components/cinematic/GlassCard";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GoldButton from "@/components/cinematic/GoldButton";
import Particles from "@/components/cinematic/Particles";
import MorphBlob from "@/components/cinematic/MorphBlob";

export const metadata: Metadata = {
  title: "Blog de francés — Gramática, cultura y DELF — HolaBonjour",
  description:
    "Artículos sobre gramática francesa, expresiones, cultura, preparación DELF/DALF y vida en Francia. Contenido para todos los niveles.",
  alternates: { canonical: "/recursos/blog" },
  openGraph: {
    title: "Blog de francés — Gramática, cultura y DELF — HolaBonjour",
    description:
      "Artículos sobre gramática francesa, expresiones, cultura, preparación DELF/DALF y vida en Francia. Contenido para todos los niveles.",
    url: "https://holabonjour.es/recursos/blog",
    siteName: "HolaBonjour",
    locale: "es_ES",
    type: "website",
  },
};

const categories = [
  {
    icon: "\u{270D}\u{FE0F}",
    title: "Grammaire",
    description: "Reglas gramaticales explicadas con claridad.",
  },
  {
    icon: "\u{1F1EB}\u{1F1F7}",
    title: "Culture",
    description: "Costumbres, tradiciones y curiosidades francesas.",
  },
  {
    icon: "\u{1F393}",
    title: "DELF/DALF",
    description: "Consejos y estrategias para los exámenes oficiales.",
  },
  {
    icon: "\u{1F4AC}",
    title: "Expressions",
    description: "Expresiones francesas para el día a día.",
  },
];

export default function BlogPage() {
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
            Notre blog
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Artículos sobre gramática, cultura, exámenes y vida en Francia.
          </p>
        </div>
      </section>

      {/* Coming soon */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-2xl">
          <GlassCard>
            <p
              className="text-xl font-semibold text-center mb-3"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--cin-gold)",
              }}
            >
              Nous préparons des articles passionnants. Revenez bientôt !
            </p>
            <p
              className="text-base text-center leading-relaxed"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Estamos preparando contenido de calidad. ¡Vuelve pronto!
            </p>
          </GlassCard>
        </div>
      </CinematicSection>

      {/* Categories preview */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-14"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-gold)",
            }}
          >
            Catégories
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <GlassCard key={cat.title}>
                <div className="text-3xl mb-4">{cat.icon}</div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--cin-gold)",
                  }}
                >
                  {cat.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {cat.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* Newsletter CTA */}
      <CinematicSection className="py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Le Mot du Jour
          </h2>
          <p
            className="text-lg mb-8"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Suscríbete al Mot du Jour y aprende una palabra nueva cada día.
          </p>
          <GoldButton href="/le-mot-du-jour">
            Suscríbete al Mot du Jour
          </GoldButton>
        </div>
      </CinematicSection>
    </div>
  );
}
