import type { Metadata } from "next";

import { blogPosts } from "@/data/blog-posts";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GlassCard from "@/components/cinematic/GlassCard";
import GoldButton from "@/components/cinematic/GoldButton";
import Particles from "@/components/cinematic/Particles";
import MorphBlob from "@/components/cinematic/MorphBlob";
import BlogGrid from "./BlogGrid";

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

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function BlogPage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden flex items-center justify-center min-h-[60vh] px-6"
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

      {/* Category filter + article grid (client component) */}
      <BlogGrid blogPosts={blogPosts} />

      {/* CTA */}
      <CinematicSection className="py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <GlassCard hover={false}>
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--cin-gold)",
              }}
            >
              &iquest;Quieres mejorar tu franc&eacute;s?
            </h2>
            <p
              className="text-base mb-8 leading-relaxed max-w-xl mx-auto"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Descubre tu nivel actual con nuestro test gratuito o ponte en
              contacto con nosotros para diseñar un plan de estudio
              personalizado.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <GoldButton href="/test-de-nivel">
                Haz el test de nivel
              </GoldButton>
              <GoldButton href="/contacto" variant="outline">
                Contáctanos
              </GoldButton>
            </div>
          </GlassCard>
        </div>
      </CinematicSection>
    </div>
  );
}
