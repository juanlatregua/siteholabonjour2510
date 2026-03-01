import type { Metadata } from "next";
import GlassCard from "@/components/cinematic/GlassCard";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GoldButton from "@/components/cinematic/GoldButton";
import Particles from "@/components/cinematic/Particles";
import MorphBlob from "@/components/cinematic/MorphBlob";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Clases de conversación en francés online — HolaBonjour",
  description:
    "Practica tu francés hablado con profesoras nativas. Sesiones individuales de 1h por Zoom, 100% en francés desde el primer minuto.",
  alternates: { canonical: "/cursos/conversacion" },
  openGraph: {
    title: "Clases de conversación en francés online — HolaBonjour",
    description:
      "Practica tu francés hablado con profesoras nativas. Sesiones individuales de 1h por Zoom, 100% en francés desde el primer minuto.",
    url: "https://holabonjour.es/cursos/conversacion",
    siteName: "HolaBonjour",
    locale: "es_ES",
    type: "website",
  },
};

const features = [
  {
    icon: "💬",
    title: "Thèmes variés",
    description:
      "Actualidad, cultura francesa, debates eticos, cine, gastronomia y mucho mas. Temas adaptados a tus intereses.",
  },
  {
    icon: "📊",
    title: "Niveau A2 → C2",
    description:
      "Sesiones adaptadas a tu nivel para que practiques con confianza desde A2 hasta C2.",
  },
  {
    icon: "💻",
    title: "Format en ligne",
    description:
      "Sesiones por Zoom en directo. Participa desde cualquier lugar con total comodidad.",
  },
];

export default function ConversacionPage() {
  return (
    <div style={{ background: "var(--cin-bg)", color: "var(--cin-text)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "Conversación en Francés Online",
            "description":
              "Practica tu francés hablado con profesoras nativas. Sesiones individuales de 1h por Zoom, 100% en francés desde el primer minuto.",
            "provider": {
              "@type": "EducationalOrganization",
              "name": "HolaBonjour",
              "url": "https://holabonjour.es",
            },
            "educationalLevel": "A2-C2",
            "inLanguage": "fr",
            "teaches": "Francés — Conversación y expresión oral",
            "courseMode": "online",
            "offers": {
              "@type": "Offer",
              "price": "35",
              "priceCurrency": "EUR",
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
            Conversation
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Sesiones individuales de conversacion con profesores nativos. Cultura,
            actualidad, debates y expresiones coloquiales.
          </p>
        </div>
      </CinematicSection>

      {/* Format highlight */}
      <CinematicSection className="py-12 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <GlassCard glow="rgba(199,125,186,0.15)">
            <p
              className="text-xl md:text-2xl font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: "#c77dba",
              }}
            >
              1h par s&eacute;ance &middot; Cours individuel &middot; 100% en fran&ccedil;ais
            </p>
          </GlassCard>
        </div>
      </CinematicSection>

      {/* Features */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="grid sm:grid-cols-3 gap-6">
            {features.map((feature) => (
              <GlassCard key={feature.title} glow="rgba(199,125,186,0.2)">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  {feature.description}
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
            Comment ça marche ?
          </h2>
          <div className="space-y-6">
            {[
              {
                step: "01",
                title: "Choisis ton niveau",
                text: "Indica tu nivel (A2-B1, B2 o C1-C2) y adaptamos la sesion a ti.",
              },
              {
                step: "02",
                title: "Connecte-toi",
                text: "Recibe tu enlace de Zoom y conectate a tu sesion individual.",
              },
              {
                step: "03",
                title: "Parle sans limites",
                text: "Practica con temas nuevos cada semana en un ambiente distendido.",
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
            Envie de parler ?
          </h2>
          <p
            className="text-lg mb-8"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Reserva tu sesion individual de conversacion.
          </p>
          <GoldButton href={CONTACT.whatsapp}>R&eacute;server ma s&eacute;ance</GoldButton>
        </div>
      </CinematicSection>
    </div>
  );
}
