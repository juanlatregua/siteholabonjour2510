import type { Metadata } from "next";
import Link from "next/link";
import GlassCard from "@/components/cinematic/GlassCard";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GoldButton from "@/components/cinematic/GoldButton";
import Particles from "@/components/cinematic/Particles";
import MorphBlob from "@/components/cinematic/MorphBlob";

export const metadata: Metadata = {
  title: "Recursos de francés — Guías, blog y herramientas — HolaBonjour",
  description:
    "Recursos gratuitos para aprender francés: guía DELF/DALF, artículos de blog, test de nivel y enlaces útiles. Material para todos los niveles.",
  alternates: { canonical: "/recursos/descargas" },
  openGraph: {
    title: "Recursos de francés — Guías, blog y herramientas — HolaBonjour",
    description:
      "Recursos gratuitos para aprender francés: guía DELF/DALF, artículos de blog, test de nivel y enlaces útiles. Material para todos los niveles.",
    url: "https://holabonjour.es/recursos/descargas",
    siteName: "HolaBonjour",
    locale: "es_ES",
    type: "website",
  },
};

const resources = [
  {
    icon: "\u{1F4CB}",
    title: "Guide DELF/DALF",
    description:
      "Guía completa de preparación con estructura de cada examen, consejos por destreza y estrategias de estudio.",
    badge: "B1-C2",
    cta: "Ver la guía",
    href: "/recursos/guia-delf-dalf",
  },
  {
    icon: "\u{1F4DD}",
    title: "Notre blog",
    description:
      "Artículos sobre gramática, expresiones, cultura francesa y preparación de exámenes oficiales.",
    badge: "A1-C2",
    cta: "Leer artículos",
    href: "/recursos/blog",
  },
  {
    icon: "\u{1F3AF}",
    title: "Test de niveau",
    description:
      "Descubre tu nivel de francés con nuestro test gratuito y recibe recomendaciones personalizadas.",
    badge: "A1-C2",
    cta: "Hacer el test",
    href: "/test-de-nivel",
  },
  {
    icon: "\u{1F517}",
    title: "Liens utiles",
    description:
      "Selección de recursos externos: diccionarios, conjugadores, medios francófonos y herramientas de estudio.",
    badge: "Todos",
    cta: "Ver enlaces",
    href: "/recursos/enlaces-utiles",
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
            Ressources
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Material gratuito para complementar tu aprendizaje. Guías,
            artículos, herramientas y más.
          </p>
        </div>
      </section>

      {/* Resources grid */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid sm:grid-cols-2 gap-6">
            {resources.map((resource) => (
              <Link
                key={resource.title}
                href={resource.href}
                style={{ textDecoration: "none" }}
              >
                <GlassCard className="h-full">
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
                      background: "rgba(232,184,101,0.12)",
                      border: "1px solid rgba(232,184,101,0.3)",
                      color: "#e8b865",
                    }}
                  >
                    {resource.cta} &rarr;
                  </span>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* CTA */}
      <CinematicSection className="py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-2xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--cin-gold)" }}
          >
            Besoin d&apos;aide personnalis&eacute;e ?
          </h2>
          <p
            className="text-lg mb-8"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Nuestras profesoras nativas diseñan un plan de estudio adaptado a
            tus objetivos.
          </p>
          <GoldButton href="/contacto">
            Contactar
          </GoldButton>
        </div>
      </CinematicSection>
    </div>
  );
}
