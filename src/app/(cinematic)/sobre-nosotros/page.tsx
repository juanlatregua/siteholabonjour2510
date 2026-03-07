import type { Metadata } from "next";
import Image from "next/image";
import GlassCard from "@/components/cinematic/GlassCard";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GoldButton from "@/components/cinematic/GoldButton";

export const metadata: Metadata = {
  title: "Sobre nosotros — HolaBonjour",
  description:
    "Conoce a Isabelle Guitton y Juan Antonio Silva, el equipo detrás de HolaBonjour.",
  alternates: { canonical: "/sobre-nosotros" },
  openGraph: {
    title: "Sobre nosotros — HolaBonjour",
    description:
      "Conoce a Isabelle Guitton y Juan Antonio Silva, el equipo detrás de HolaBonjour.",
    url: "https://holabonjour.es/sobre-nosotros",
    siteName: "HolaBonjour",
    locale: "es_ES",
    type: "website",
  },
};

const caseStudies = [
  {
    company: "Oracle",
    logo: "/images/logo-oracle.png",
    logoWidth: 120,
    logoHeight: 67,
    badge: "Formación in-company",
    description:
      "Programa de francés profesional para el equipo comercial de Oracle España. Clases grupales B1-B2 orientadas a negociación y presentaciones en francés.",
  },
  {
    company: "ALISS",
    logo: "/images/logo-aliss.jpg",
    logoWidth: 80,
    logoHeight: 80,
    badge: "ONG internacional",
    description:
      "Formación en francés para voluntarios y personal de ALISS destinados a misiones en países francófonos de África. Niveles A2-B1 con enfoque intercultural.",
  },
];

export default function SobreNosotrosPage() {
  return (
    <div style={{ background: "var(--cin-bg)", color: "var(--cin-text)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "Sobre nosotros — HolaBonjour",
            description:
              "Conoce a Isabelle Guitton y Juan Antonio Silva, el equipo detrás de HolaBonjour.",
            mainEntity: {
              "@type": "EducationalOrganization",
              name: "HolaBonjour",
              url: "https://holabonjour.es",
              founder: [
                {
                  "@type": "Person",
                  name: "Isabelle Guitton",
                  jobTitle: "Profesora de FLE y Préparatrice DELF/DALF",
                  knowsLanguage: ["fr", "es"],
                },
                {
                  "@type": "Person",
                  name: "Juan Antonio Silva",
                  jobTitle: "Traductor-Intérprete Jurado de Francés",
                  knowsLanguage: ["es", "fr", "en"],
                },
              ],
              address: {
                "@type": "PostalAddress",
                addressLocality: "Málaga",
                addressRegion: "Andalucía",
                addressCountry: "ES",
              },
            },
          }),
        }}
      />

      {/* Hero */}
      <CinematicSection className="py-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-accent)",
            }}
          >
            El equipo detr&aacute;s de HolaBonjour
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#3d4a5c" }}
          >
            Experiencia real, resultados verificables
          </p>
        </div>
      </CinematicSection>

      {/* Isabelle — principal */}
      <CinematicSection className="py-16 px-6">
        <div className="mx-auto max-w-5xl">
          <GlassCard className="mb-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="shrink-0">
                <Image
                  src="/images/isabelle-guitton.jpg"
                  alt="Isabelle Guitton — Profesora de FLE y Préparatrice DELF/DALF"
                  width={200}
                  height={250}
                  className="rounded-xl object-cover"
                  style={{ width: 200, height: 250, objectFit: "cover" }}
                />
              </div>
              <div className="flex-1">
                <h2
                  className="text-2xl md:text-3xl font-bold mb-1"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--cin-accent)",
                  }}
                >
                  Isabelle Guitton
                </h2>
                <p
                  className="text-sm font-semibold mb-4"
                  style={{ color: "#E50046" }}
                >
                  Profesora de FLE y Pr&eacute;paratrice DELF/DALF
                </p>
                <div
                  className="leading-relaxed mb-5 space-y-3"
                  style={{ color: "#3d4a5c" }}
                >
                  <p>
                    Isabelle Guitton lleva desde 2003 preparando alumnos para
                    ex&aacute;menes oficiales de franc&eacute;s como Lengua
                    Extranjera. Francesa de origen, vive en Espa&ntilde;a desde
                    hace m&aacute;s de 20 a&ntilde;os y conoce a fondo los
                    errores t&iacute;picos de los hispanohablantes en el DELF y
                    el DALF.
                  </p>
                  <p>
                    El 100% de sus alumnos ha aprobado el DELF o el DALF desde
                    que comenz&oacute; a preparar ex&aacute;menes — desde B1
                    hasta C2. Sus clases son en directo por Zoom, en
                    espa&ntilde;ol o en franc&eacute;s seg&uacute;n el nivel,
                    siempre orientadas al examen concreto que el alumno va a
                    realizar.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Desde 2003 en FLE",
                    "100% aprobados DELF/DALF",
                    "B1 · B2 · C1 · C2",
                  ].map((badge) => (
                    <span
                      key={badge}
                      className="text-xs font-medium px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(229,0,70,0.12)",
                        color: "#E50046",
                        border: "1px solid rgba(229,0,70,0.2)",
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Juan — secundaria */}
          <GlassCard>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div
                className="shrink-0 flex items-center justify-center rounded-xl"
                style={{
                  width: 80,
                  height: 80,
                  background: "#395D9F",
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                  color: "#fff",
                }}
              >
                JS
              </div>
              <div className="flex-1">
                <h2
                  className="text-xl font-bold mb-1"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--cin-accent)",
                  }}
                >
                  Juan Antonio Silva
                </h2>
                <p
                  className="text-sm font-semibold mb-3"
                  style={{ color: "#E50046" }}
                >
                  Traductor-Int&eacute;rprete Jurado de Franc&eacute;s y
                  Desarrollo
                </p>
                <div
                  className="leading-relaxed mb-3 space-y-3"
                  style={{ color: "#3d4a5c" }}
                >
                  <p>
                    Juan Antonio Silva es traductor-int&eacute;rprete jurado de
                    franc&eacute;s (MAEC N.3850) con base en M&aacute;laga.
                    Responsable del desarrollo tecnol&oacute;gico del ecosistema
                    HolaBonjour, construye las herramientas que hacen posible la
                    plataforma: simulacros, correcci&oacute;n IA, portales y
                    automatizaciones.
                  </p>
                  <p>
                    Su trabajo como traductor jurado puede consultarse en{" "}
                    <a
                      href="https://www.traduccionesjuradas.net"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#395D9F", textDecoration: "underline" }}
                    >
                      traduccionesjuradas.net
                    </a>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Traductor Jurado MAEC N.3850"].map((badge) => (
                    <span
                      key={badge}
                      className="text-xs font-medium px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(229,0,70,0.12)",
                        color: "#E50046",
                        border: "1px solid rgba(229,0,70,0.2)",
                      }}
                    >
                      {badge}
                    </span>
                  ))}
                  <a
                    href="https://www.traduccionesjuradas.net"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{
                      background: "rgba(57,93,159,0.08)",
                      color: "#395D9F",
                      border: "1px solid rgba(57,93,159,0.15)",
                    }}
                  >
                    traduccionesjuradas.net
                  </a>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </CinematicSection>

      {/* Logos empresas */}
      <CinematicSection className="py-16 px-6">
        <div className="mx-auto max-w-5xl">
          <h2
            className="text-3xl md:text-4xl font-bold text-center mb-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-accent)",
            }}
          >
            Empresas que conf&iacute;an en nosotros
          </h2>
          <p
            className="text-center mb-10"
            style={{ color: "#3d4a5c", maxWidth: 500, marginLeft: "auto", marginRight: "auto" }}
          >
            Casos reales de formaci&oacute;n en franc&eacute;s profesional
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {caseStudies.map((cs) => (
              <GlassCard key={cs.company}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "1.25rem",
                  }}
                >
                  <Image
                    src={cs.logo}
                    alt={cs.company}
                    width={cs.logoWidth}
                    height={cs.logoHeight}
                    style={{ objectFit: "contain" }}
                  />
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      padding: "0.25rem 0.7rem",
                      borderRadius: 999,
                      background: "rgba(57,93,159,0.08)",
                      border: "1px solid rgba(57,93,159,0.15)",
                      color: "#395D9F",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {cs.badge}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "#1e2d4a",
                    marginBottom: "0.6rem",
                  }}
                >
                  {cs.company}
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    lineHeight: 1.65,
                    color: "#3d4a5c",
                    margin: 0,
                  }}
                >
                  {cs.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* CTA */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-6"
            style={{ fontFamily: "var(--font-display)", color: "var(--cin-accent)" }}
          >
            &iquest;Quieres prepararte con Isabelle?
          </h2>
          <p className="mb-10 text-lg" style={{ color: "#3d4a5c" }}>
            Reserva una sesi&oacute;n de diagn&oacute;stico para evaluar tu
            nivel y dise&ntilde;ar tu plan de preparaci&oacute;n personalizado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GoldButton href="/contratar?producto=diagnostico">
              Reservar sesi&oacute;n diagn&oacute;stico
            </GoldButton>
            <GoldButton href="/tarifas" variant="outline">
              Ver tarifas
            </GoldButton>
          </div>
        </div>
      </CinematicSection>
    </div>
  );
}
