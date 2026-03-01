import type { Metadata } from "next";
import GlassCard from "@/components/cinematic/GlassCard";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GoldButton from "@/components/cinematic/GoldButton";
import Particles from "@/components/cinematic/Particles";
import MorphBlob from "@/components/cinematic/MorphBlob";

export const metadata: Metadata = {
  title: "Français pour entreprises — HolaBonjour",
  description:
    "Formación de francés para empresas: turismo, hostelería, inmobiliario, comercio exterior. In-company u online, facturación directa.",
};

const sectors = [
  {
    icon: "\u{1F3E8}",
    title: "Tourisme Costa del Sol",
    description:
      "Atención a clientes francófonos en hoteles, restaurantes, actividades turísticas y ocio.",
  },
  {
    icon: "\u{1F3E0}",
    title: "Immobilier",
    description:
      "Vocabulario inmobiliario para agencias, contratos, visitas a propiedades y negociación.",
  },
  {
    icon: "\u{1F30D}",
    title: "Commerce extérieur",
    description:
      "Presentaciones corporativas, negociación internacional, correspondencia comercial.",
  },
  {
    icon: "\u{1F4CB}",
    title: "Programme sur mesure",
    description:
      "Diseñamos un programa 100% a medida para las necesidades de tu equipo.",
  },
];

const benefits = [
  "Facturation directe à l'entreprise",
  "Possibilité bonification Fundae",
  "Horaires flexibles",
  "Suivi et rapports de progression",
  "Professeurs natifs spécialisés B2B",
];

export default function EmpresasPage() {
  return (
    <div>
      {/* Hero — fullscreen with marine gradient, Particles + MorphBlob turquoise */}
      <section
        className="relative overflow-hidden flex items-center justify-center min-h-screen px-6"
        style={{
          background:
            "linear-gradient(135deg, #1b2838 0%, #0d1b2a 50%, #1b3a4b 100%)",
          color: "var(--cin-text)",
        }}
      >
        <Particles count={50} color="#6ec6ca" />
        <MorphBlob
          size={450}
          color="#6ec6ca"
          position={{ top: "-10%", left: "-5%" }}
        />
        <MorphBlob
          size={320}
          color="#6ec6ca"
          position={{ bottom: "-10%", right: "-8%" }}
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "#6ec6ca",
            }}
          >
            Français pour votre entreprise
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Programas de francés corporativo adaptados a tu sector. Formación
            in-company u online, facturación directa a empresa.
          </p>
        </div>
      </section>

      {/* Sectors */}
      <CinematicSection className="py-20 px-6" scene="bordeaux">
        <div className="mx-auto max-w-5xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-14"
            style={{ fontFamily: "var(--font-display)", color: "#6ec6ca" }}
          >
            Secteurs d&apos;activité
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {sectors.map((sector) => (
              <GlassCard key={sector.title} glow="rgba(110,198,202,0.15)">
                <div className="text-3xl mb-4">{sector.icon}</div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "#6ec6ca",
                  }}
                >
                  {sector.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  {sector.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* Benefits */}
      <CinematicSection className="py-20 px-6" scene="bordeaux">
        <div className="mx-auto max-w-3xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-10"
            style={{ fontFamily: "var(--font-display)", color: "#6ec6ca" }}
          >
            Avantages
          </h2>
          <GlassCard glow="rgba(110,198,202,0.12)">
            <ul className="space-y-4">
              {benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-3 text-base"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  <span style={{ color: "#6ec6ca", flexShrink: 0 }}>
                    &#10003;
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </CinematicSection>

      {/* B2B CTA */}
      <CinematicSection className="py-24 px-6" scene="bordeaux">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)", color: "#6ec6ca" }}
          >
            Demandez votre proposition
          </h2>
          <p
            className="text-lg mb-10 max-w-xl mx-auto"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Envíanos los datos de tu empresa y te preparamos una propuesta a
            medida.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <GoldButton
              href="https://wa.me/34685070304?text=Bonjour%2C%20je%20voudrais%20une%20proposition%20pour%20mon%20entreprise"
            >
              Solicitar propuesta
            </GoldButton>
            <GoldButton href="mailto:info@holabonjour.es" variant="outline">
              Écrire par email
            </GoldButton>
          </div>
        </div>
      </CinematicSection>
    </div>
  );
}
