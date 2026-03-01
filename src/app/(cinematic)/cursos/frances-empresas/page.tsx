import type { Metadata } from "next";
import GlassCard from "@/components/cinematic/GlassCard";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GoldButton from "@/components/cinematic/GoldButton";
import Particles from "@/components/cinematic/Particles";
import MorphBlob from "@/components/cinematic/MorphBlob";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Francais pour entreprises — HolaBonjour",
  description:
    "Programas de frances para empresas: turismo, hosteleria, comercio internacional. Formacion in-company u online.",
};

const sectors = [
  {
    icon: "🏨",
    title: "Tourisme & Hotellerie",
    description:
      "Atencion a clientes francofonos, vocabulario hotelero y turistico. Ideal para la Costa del Sol.",
  },
  {
    icon: "🏠",
    title: "Immobilier",
    description:
      "Vocabulario inmobiliario, contratos, visitas y negociacion con compradores franceses.",
  },
  {
    icon: "🌍",
    title: "Commerce international",
    description:
      "Presentaciones, negociacion, correspondencia comercial y protocolo de negocios.",
  },
  {
    icon: "📋",
    title: "Sur mesure",
    description:
      "Programa a medida para cualquier sector. Analizamos tus necesidades y disenamos el curso.",
  },
];

export default function FrancesEmpresasPage() {
  return (
    <div style={{ background: "var(--cin-bg)", color: "var(--cin-text)" }}>
      {/* Hero */}
      <CinematicSection className="py-24 px-6">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #2d1b4e 0%, #1a1a2e 50%, #462255 100%)",
          }}
        />
        <Particles color="#c77dba" />
        <MorphBlob
          size={400}
          color="#c77dba"
          position={{ top: "-10%", left: "-5%" }}
        />
        <MorphBlob
          size={300}
          color="#c77dba"
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
            Francais pour entreprises
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Programas corporativos adaptados a tu sector: turismo Costa del Sol,
            hosteleria, inmobiliario, comercio exterior.
          </p>
        </div>
      </CinematicSection>

      {/* Sectors */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-14"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-gold)",
            }}
          >
            Nos secteurs
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {sectors.map((sector) => (
              <GlassCard key={sector.title} glow="rgba(199,125,186,0.2)">
                <div className="text-4xl mb-4">{sector.icon}</div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
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

      {/* Format */}
      <CinematicSection className="py-16 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <GlassCard glow="rgba(199,125,186,0.15)">
            <p
              className="text-xl md:text-2xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-display)",
                color: "#c77dba",
              }}
            >
              In-company ou en ligne &middot; Facturation entreprise &middot;
              Possibilite Fundae
            </p>
            <p
              className="leading-relaxed"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Nos adaptamos al calendario y horario de tu empresa. Emitimos
              factura a nombre de la empresa y gestionamos la bonificacion
              Fundae.
            </p>
          </GlassCard>
        </div>
      </CinematicSection>

      {/* Why choose us */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-14"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-gold)",
            }}
          >
            Pourquoi nous choisir ?
          </h2>
          <div className="space-y-6">
            {[
              {
                title: "Audit linguistique gratuit",
                text: "Evaluamos el nivel de tu equipo y disenamos un programa a medida sin coste inicial.",
              },
              {
                title: "Professeurs specialises",
                text: "Profesores nativos con experiencia en formacion corporativa y conocimiento sectorial.",
              },
              {
                title: "Suivi et rapports",
                text: "Informes trimestrales de progreso para RRHH con metricas claras de avance.",
              },
            ].map((item) => (
              <GlassCard key={item.title} hover={false}>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "#c77dba",
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.65)" }}>{item.text}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* CTA */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Besoin d&apos;un devis ?
          </h2>
          <p
            className="text-lg mb-8"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Contactanos para recibir un presupuesto personalizado para tu
            empresa.
          </p>
          <GoldButton href={CONTACT.whatsapp}>Demander un devis</GoldButton>
        </div>
      </CinematicSection>
    </div>
  );
}
