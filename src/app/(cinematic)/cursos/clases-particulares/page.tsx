import type { Metadata } from "next";
import GlassCard from "@/components/cinematic/GlassCard";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GoldButton from "@/components/cinematic/GoldButton";
import Particles from "@/components/cinematic/Particles";
import MorphBlob from "@/components/cinematic/MorphBlob";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Clases particulares de francés online — HolaBonjour",
  description:
    "Clases particulares de francés 1 a 1 por Zoom. Horarios flexibles, contenido personalizado, profesoras nativas. Pack 4 clases de 55 min desde 150€.",
  alternates: { canonical: "/cursos/clases-particulares" },
  openGraph: {
    title: "Clases particulares de francés online — HolaBonjour",
    description:
      "Clases particulares de francés 1 a 1 por Zoom. Horarios flexibles, contenido personalizado, profesoras nativas. Pack 4 clases de 55 min desde 150€.",
    url: "https://holabonjour.es/cursos/clases-particulares",
    siteName: "HolaBonjour",
    locale: "es_ES",
    type: "website",
  },
};

const benefits = [
  {
    icon: "📅",
    title: "Flexibilité totale",
    description:
      "Horarios que se adaptan a ti. Mananas, tardes o fines de semana. Tu eliges cuando aprender.",
  },
  {
    icon: "🎯",
    title: "Contenu personnalisé",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Clases Particulares de Francés Online",
            "description":
              "Clases particulares de francés 1 a 1 por Zoom. Horarios flexibles, contenido personalizado, profesoras nativas. Pack 4 clases de 55 min desde 150€.",
            "provider": {
              "@type": "EducationalOrganization",
              "name": "HolaBonjour",
              "url": "https://holabonjour.es",
            },
            "educationalLevel": "A1-C2",
            "inLanguage": "fr",
            "teaches":
              "Francés — Clases individuales personalizadas",
            "courseMode": "online",
            "offers": {
              "@type": "AggregateOffer",
              "lowPrice": "35",
              "highPrice": "50",
              "priceCurrency": "EUR",
              "offerCount": "3",
              "availability": "https://schema.org/InStock",
            },
            "hasCourseInstance": {
              "@type": "CourseInstance",
              "courseMode": "online",
              "instructor": {
                "@type": "Person",
                "name": "Profesoras nativas certificadas",
              },
            },
          }),
        }}
      />
      {/* Hero */}
      <CinematicSection className="py-24 px-6">
        <div
          className="absolute inset-0"
          style={{
            background: "#faf7f2",
          }}
        />
        <Particles color="#6B3FA0" />
        <MorphBlob
          size={400}
          color="#6B3FA0"
          position={{ top: "-10%", left: "-5%" }}
        />
        <MorphBlob
          size={300}
          color="#6B3FA0"
          position={{ bottom: "-10%", right: "-5%" }}
        />
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-accent)",
            }}
          >
            Cours particuliers
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#3d4a5c" }}
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
              color: "var(--cin-accent)",
            }}
          >
            Vos avantages
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit) => (
              <GlassCard key={benefit.title} glow="rgba(107,63,160,0.2)">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {benefit.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#5f6b78" }}
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
              color: "var(--cin-accent)",
            }}
          >
            Comment ça fonctionne ?
          </h2>
          <div className="space-y-6">
            {[
              {
                step: "01",
                title: "Teste ton niveau",
                text: "Haz nuestro test de nivel gratuito o escríbenos por WhatsApp para que te asesoremos sin compromiso.",
              },
              {
                step: "02",
                title: "Plan personnalisé",
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
                    style={{ color: "#6B3FA0" }}
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
                    <p style={{ color: "#5f6b78" }}>
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
            Prêt à commencer ?
          </h2>
          <p
            className="text-lg mb-8"
            style={{ color: "#5f6b78" }}
          >
            Inf&oacute;rmate sin compromiso. Te asesoramos sobre el programa ideal para ti.
          </p>
          <GoldButton href={CONTACT.whatsapp}>
            Demander des informations
          </GoldButton>
        </div>
      </CinematicSection>
    </div>
  );
}
