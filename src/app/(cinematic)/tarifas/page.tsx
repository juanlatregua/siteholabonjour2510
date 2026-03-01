import type { Metadata } from "next";
import { pricingTiers, faqItems } from "@/data/pricing";
import GlassCard from "@/components/cinematic/GlassCard";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GoldButton from "@/components/cinematic/GoldButton";

export const metadata: Metadata = {
  title: "Precios de clases de francés online — HolaBonjour",
  description:
    "Tarifas de clases de francés: 35\u20AC/clase individual, pack 10 clases 300\u20AC. Profesoras nativas, 1h por Zoom.",
  alternates: { canonical: "/tarifas" },
  openGraph: {
    title: "Precios de clases de francés online — HolaBonjour",
    description:
      "Tarifas de clases de francés: 35\u20AC/clase individual, pack 10 clases 300\u20AC. Profesoras nativas, 1h por Zoom.",
    url: "https://holabonjour.es/tarifas",
    siteName: "HolaBonjour",
    locale: "es_ES",
    type: "website",
  },
};

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ color: "var(--cin-gold)", flexShrink: 0 }}
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function TarifasPage() {
  return (
    <div style={{ background: "var(--cin-bg)", color: "var(--cin-text)" }}>
      {/* Hero */}
      <CinematicSection className="py-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{ fontFamily: "var(--font-display)", color: "var(--cin-gold)" }}
          >
            Nos tarifs
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Planes de preparación adaptados a tu nivel y objetivo.
          </p>
        </div>
      </CinematicSection>

      {/* Pricing Cards */}
      <CinematicSection className="py-16 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <GlassCard
                key={tier.name}
                glow={tier.popular ? "rgba(232,184,101,0.15)" : undefined}
                className="flex flex-col relative"
              >
                {tier.popular && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full"
                    style={{
                      background: "var(--cin-gold)",
                      color: "var(--cin-bg)",
                    }}
                  >
                    Le plus populaire
                  </span>
                )}

                <div className="text-center mb-6">
                  <h2
                    className="text-2xl font-bold mb-2"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {tier.name}
                  </h2>
                  <span
                    className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4"
                    style={{
                      background: "rgba(232,184,101,0.12)",
                      color: "var(--cin-gold-light)",
                      border: "1px solid rgba(232,184,101,0.2)",
                    }}
                  >
                    {tier.levels}
                  </span>
                  <div className="flex items-baseline justify-center gap-1">
                    <span
                      className="text-4xl font-bold"
                      style={{ color: "var(--cin-gold)" }}
                    >
                      {tier.price}€
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                    >
                      / pack
                    </span>
                  </div>
                  <p
                    className="text-sm mt-1"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {tier.hours} horas de clase
                  </p>
                </div>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckIcon />
                      <span
                        className="text-sm leading-relaxed"
                        style={{ color: "rgba(255,255,255,0.75)" }}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <GoldButton
                  href="/contacto"
                  variant={tier.popular ? "solid" : "outline"}
                  className="w-full text-center"
                >
                  Commencer
                </GoldButton>
              </GlassCard>
            ))}
          </div>

          <p
            className="text-center mt-10 text-sm"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Todos los packs son mensuales. Puedes renovar o cambiar de nivel en
            cualquier momento.
          </p>
        </div>
      </CinematicSection>

      {/* FAQ */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-14"
            style={{ fontFamily: "var(--font-display)", color: "var(--cin-gold)" }}
          >
            Questions fréquentes
          </h2>
          <div className="flex flex-col gap-4">
            {faqItems.map((item) => (
              <details
                key={item.question}
                className="group"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 16,
                }}
              >
                <summary
                  className="cursor-pointer list-none flex items-center justify-between gap-4 px-6 py-5 font-semibold select-none"
                  style={{ color: "var(--cin-text)" }}
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
                    style={{ color: "var(--cin-gold)", flexShrink: 0 }}
                    aria-hidden="true"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </summary>
                <div
                  className="px-6 pb-5 leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  {item.answer}
                </div>
              </details>
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
            Besoin d&apos;un plan personnalisé ?
          </h2>
          <p
            className="mb-10 text-lg"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Hablemos de tus objetivos y diseñamos un plan a medida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GoldButton href="https://wa.me/34685070304">
              WhatsApp
            </GoldButton>
            <GoldButton href="mailto:info@holabonjour.es" variant="outline">
              info@holabonjour.es
            </GoldButton>
          </div>
        </div>
      </CinematicSection>
    </div>
  );
}
