import type { Metadata } from "next";
import Link from "next/link";
import GlassCard from "@/components/cinematic/GlassCard";
import CinematicSection from "@/components/cinematic/CinematicSection";
import Particles from "@/components/cinematic/Particles";
import MorphBlob from "@/components/cinematic/MorphBlob";

export const metadata: Metadata = {
  title: "Recursos gratuitos para aprender francés — HolaBonjour",
  description:
    "Recursos gratuitos de francés: guía DELF/DALF, fichas de gramática, enlaces útiles, descargas y blog educativo.",
  alternates: { canonical: "/recursos" },
  openGraph: {
    title: "Recursos gratuitos para aprender francés — HolaBonjour",
    description:
      "Recursos gratuitos de francés: guía DELF/DALF, fichas de gramática, enlaces útiles, descargas y blog educativo.",
    url: "https://holabonjour.es/recursos",
    siteName: "HolaBonjour",
    locale: "es_ES",
    type: "website",
  },
};

const resourceLinks = [
  {
    icon: "\u{1F4D6}",
    title: "Guide DELF/DALF",
    description:
      "Todo sobre los exámenes oficiales: niveles, inscripción, fechas y preparación.",
    href: "/recursos/guia-delf-dalf",
  },
  {
    icon: "\u{1F517}",
    title: "Liens utiles",
    description:
      "Diccionarios, medios, herramientas y recursos seleccionados para aprender francés.",
    href: "/recursos/enlaces-utiles",
  },
  {
    icon: "\u{1F4E5}",
    title: "Téléchargements",
    description:
      "Fichas de gramática, vocabulario por nivel y guías de preparación gratuitas.",
    href: "/recursos/descargas",
  },
  {
    icon: "\u{270D}\u{FE0F}",
    title: "Blog",
    description:
      "Artículos sobre gramática, cultura, exámenes y vida en Francia.",
    href: "/recursos/blog",
  },
];

export default function RecursosPage() {
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
            Todo lo que necesitas para complementar tu aprendizaje de francés.
          </p>
        </div>
      </section>

      {/* Resource cards */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid sm:grid-cols-2 gap-6">
            {resourceLinks.map((resource) => (
              <Link
                key={resource.title}
                href={resource.href}
                style={{ textDecoration: "none" }}
              >
                <GlassCard className="h-full">
                  <div className="text-3xl mb-4">{resource.icon}</div>
                  <h2
                    className="text-xl font-bold mb-3"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: "var(--cin-gold)",
                    }}
                  >
                    {resource.title}
                  </h2>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                  >
                    {resource.description}
                  </p>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </CinematicSection>
    </div>
  );
}
