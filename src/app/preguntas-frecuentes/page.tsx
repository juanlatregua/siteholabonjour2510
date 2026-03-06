import type { Metadata } from "next";
import { faqItems } from "@/lib/faq-content";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GoldButton from "@/components/cinematic/GoldButton";

export const metadata: Metadata = {
  title: "Preguntas frecuentes — HolaBonjour",
  description:
    "Resuelve tus dudas sobre clases de francés online, preparación DELF/DALF, precios, anulaciones y cómo funcionan nuestros cursos.",
  alternates: { canonical: "/preguntas-frecuentes" },
};

export default function PreguntasFrecuentesPage() {
  return (
    <div style={{ background: "#faf7f2", color: "#1e2d4a", minHeight: "100vh" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems.map((f) => ({
              "@type": "Question",
              "name": f.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": f.answer,
              },
            })),
          }),
        }}
      />
      {/* Hero */}
      <CinematicSection className="py-16 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p
            className="inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em]"
            style={{ background: "rgba(229,0,70,0.15)", color: "#E50046", border: "1px solid rgba(229,0,70,0.3)" }}
          >
            Preguntas frecuentes
          </p>
          <h1
            className="mt-4 text-3xl font-bold sm:text-4xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            FAQ HolaBonjour
          </h1>
          <p className="mt-3 text-sm sm:text-base" style={{ color: "#3d4a5c" }}>
            Recopilación adaptada de nuestra web histórica publicada y de la operativa online actual.
          </p>
        </div>
      </CinematicSection>

      {/* FAQ items */}
      <CinematicSection className="pb-10 px-6">
        <div className="mx-auto max-w-3xl flex flex-col gap-4">
          {faqItems.map((item) => (
            <details
              key={item.id}
              className="group"
              style={{
                background: "#ffffff",
                border: "1px solid rgba(30,45,74,0.08)",
                borderRadius: 16,
              }}
            >
              <summary
                className="cursor-pointer list-none flex items-center justify-between gap-4 px-6 py-5 font-semibold select-none"
                style={{ color: "#1e2d4a" }}
              >
                <span>{item.question}</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-300 group-open:rotate-180"
                  style={{ color: "#E50046", flexShrink: 0 }}
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div
                className="px-6 pb-5 leading-relaxed text-sm"
                style={{ color: "#3d4a5c" }}
              >
                {item.answer}
              </div>
              <div
                className="px-6 pb-4 text-xs uppercase tracking-wide"
                style={{ color: "#9ca3af" }}
              >
                Fuente: {item.source === "legacy" ? "Web histórica 2017+" : "Operativa actual online"}
              </div>
            </details>
          ))}
        </div>
      </CinematicSection>

      {/* CTA */}
      <CinematicSection className="pb-16 px-6">
        <div
          className="mx-auto max-w-3xl rounded-2xl p-6 text-center"
          style={{ background: "#ffffff", border: "1px solid rgba(30,45,74,0.08)" }}
        >
          <h2 className="text-xl font-semibold">¿No ves tu caso?</h2>
          <p className="mt-2 text-sm" style={{ color: "#3d4a5c" }}>
            Escríbenos y te orientamos en menos de 24h laborables con ruta, nivel y siguiente paso.
          </p>
          <div className="mt-4">
            <GoldButton href="/contacto">
              Contactar ahora
            </GoldButton>
          </div>
        </div>
      </CinematicSection>
    </div>
  );
}
