import type { Metadata } from "next";
import { enlacesUtiles } from "@/data/enlaces-utiles";
import GlassCard from "@/components/cinematic/GlassCard";
import CinematicSection from "@/components/cinematic/CinematicSection";

export const metadata: Metadata = {
  title: "Enlaces útiles",
  description:
    "Recursos seleccionados para complementar tu aprendizaje de francés: medios, diccionarios, exámenes oficiales y cultura.",
};

export default function EnlacesUtilesPage() {
  const categories = Array.from(
    new Set(enlacesUtiles.map((e) => e.category)),
  );

  return (
    <div style={{ background: "var(--cin-bg)", color: "var(--cin-text)" }}>
      {/* Hero */}
      <CinematicSection className="py-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-gold)",
            }}
          >
            Enlaces útiles
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Recursos seleccionados para complementar tu aprendizaje de francés.
          </p>
        </div>
      </CinematicSection>

      {/* Links by category */}
      {categories.map((category) => (
        <CinematicSection key={category} className="py-10 px-6">
          <div className="mx-auto max-w-5xl">
            <h2
              className="text-2xl font-bold mb-8"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--cin-gold)",
              }}
            >
              {category}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {enlacesUtiles
                .filter((e) => e.category === category)
                .map((enlace) => (
                  <a
                    key={enlace.url}
                    href={enlace.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <GlassCard className="h-full">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h3 className="text-base font-semibold">
                          {enlace.name}
                        </h3>
                        <span
                          className="shrink-0 text-xs"
                          style={{ color: "rgba(255,255,255,0.4)" }}
                          aria-hidden="true"
                        >
                          ↗
                        </span>
                      </div>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.6)" }}
                      >
                        {enlace.description}
                      </p>
                    </GlassCard>
                  </a>
                ))}
            </div>
          </div>
        </CinematicSection>
      ))}
    </div>
  );
}
