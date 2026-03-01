import type { Metadata } from "next";
import GlassCard from "@/components/cinematic/GlassCard";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GoldButton from "@/components/cinematic/GoldButton";
import Particles from "@/components/cinematic/Particles";
import MorphBlob from "@/components/cinematic/MorphBlob";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cours particuliers de francais — HolaBonjour",
  description:
    "Clases particulares de frances online. Horarios flexibles, contenido 100% adaptado a tus necesidades.",
};

const benefits = [
  {
    icon: "📅",
    title: "Flexibilite totale",
    description:
      "Horarios que se adaptan a ti. Mananas, tardes o fines de semana. Tu eliges cuando aprender.",
  },
  {
    icon: "🎯",
    title: "Contenu personnalise",
    description:
      "Cada clase disenada para tus necesidades especificas. Sin programas genericos.",
  },
  {
    icon: "💻",
    title: "100% en ligne",
    description:
      "Clases por Zoom desde cualquier lugar. Solo necesitas conexion a internet.",
  },
  {
    icon: "🚀",
    title: "Progression rapide",
    description:
      "Avanza mas rapido con atencion exclusiva. Tu profesor se centra unicamente en ti.",
  },
];

export default function ClasesParticularesPage() {
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
            Cours particuliers
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Sesiones individuales 1-to-1 con profesores nativos. Contenido 100%
            adaptado a tu ritmo y objetivos.
          </p>
        </div>
      </CinematicSection>

      {/* Benefits */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-14"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-gold)",
            }}
          >
            Vos avantages
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit) => (
              <GlassCard key={benefit.title} glow="rgba(199,125,186,0.2)">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {benefit.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  {benefit.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* How it works */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-14"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-gold)",
            }}
          >
            Comment ca fonctionne ?
          </h2>
          <div className="space-y-6">
            {[
              {
                step: "01",
                title: "Classe d'essai gratuite",
                text: "Reserva una sesion de prueba sin compromiso para conocer a tu profesor y evaluar tu nivel.",
              },
              {
                step: "02",
                title: "Plan personnalise",
                text: "Disenamos un plan de estudio adaptado a tus objetivos, tu nivel y tu disponibilidad.",
              },
              {
                step: "03",
                title: "Apprentissage continu",
                text: "Clases semanales con material personalizado, ejercicios entre sesiones y seguimiento de progreso.",
              },
            ].map((item) => (
              <GlassCard key={item.step} hover={false}>
                <div className="flex items-start gap-4">
                  <span
                    className="text-2xl font-bold shrink-0"
                    style={{ color: "#c77dba" }}
                  >
                    {item.step}
                  </span>
                  <div>
                    <h3
                      className="text-lg font-bold mb-1"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {item.title}
                    </h3>
                    <p style={{ color: "rgba(255,255,255,0.65)" }}>
                      {item.text}
                    </p>
                  </div>
                </div>
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
            Pret a commencer ?
          </h2>
          <p
            className="text-lg mb-8"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Tu primera clase de prueba es gratuita y sin compromiso.
          </p>
          <GoldButton href={CONTACT.whatsapp}>
            Reserver ma classe d&apos;essai gratuite
          </GoldButton>
        </div>
      </CinematicSection>
    </div>
  );
}
