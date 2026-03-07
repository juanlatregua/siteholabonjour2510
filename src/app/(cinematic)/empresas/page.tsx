import type { Metadata } from "next";
import Image from "next/image";
import GlassCard from "@/components/cinematic/GlassCard";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GoldButton from "@/components/cinematic/GoldButton";

export const metadata: Metadata = {
  title: "Francés profesional para empresas | HolaBonjour",
  description:
    "Clases de francés profesional para equipos que trabajan con Francia y los países francófonos. Oracle, ALISS y otras empresas confían en HolaBonjour.",
  alternates: { canonical: "/empresas" },
  openGraph: {
    title: "Francés profesional para empresas | HolaBonjour",
    description:
      "Clases de francés profesional para equipos que trabajan con Francia y los países francófonos. Oracle, ALISS y otras empresas confían en HolaBonjour.",
    url: "https://holabonjour.es/empresas",
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
    badge: "Tecnología · Francia",
    title: "Francés para entornos corporativos internacionales",
    description:
      "Preparación lingüística para profesionales que trabajan con equipos, clientes o proveedores en Francia. Vocabulario técnico, reuniones, presentaciones y negociación.",
  },
  {
    company: "ALISS",
    logo: "/images/logo-aliss.jpg",
    logoWidth: 80,
    logoHeight: 80,
    badge: "Alimentación · Caribe francés",
    title: "Francés para mercados del Caribe francés",
    description:
      "Comunicación profesional adaptada al contexto de Martinica, Guadalupe y Reunión — negociación comercial, correspondencia y atención a clientes francófonos del Caribe.",
  },
];

const programFeatures = [
  {
    title: "Diagnóstico del equipo",
    description: "Evaluamos el nivel real de cada persona con un test adaptativo y entrevista oral.",
  },
  {
    title: "Contenido sectorial",
    description: "Vocabulario y situaciones reales de tu sector: tecnología, alimentación, turismo, comercio exterior.",
  },
  {
    title: "Clases en directo",
    description: "Por Zoom, con horario flexible. Formato individual o en grupo reducido (máx. 4 personas).",
  },
  {
    title: "Seguimiento y progreso",
    description: "Informes periódicos para RR.HH. con evolución por competencia y asistencia.",
  },
];

export default function EmpresasPage() {
  return (
    <div style={{ background: "#faf7f2", color: "#1e2d4a" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Francés profesional para empresas",
            description:
              "Clases de francés profesional para equipos que trabajan con Francia y los países francófonos.",
            provider: {
              "@type": "EducationalOrganization",
              name: "HolaBonjour",
              url: "https://holabonjour.es",
            },
            areaServed: "ES",
            serviceType: "Formación de idiomas para empresas",
          }),
        }}
      />

      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          padding: "6rem 1.5rem 5rem",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(57,93,159,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 800, margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#395D9F",
              marginBottom: "1rem",
            }}
          >
            Formación para empresas
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: "1.25rem",
              color: "#1e2d4a",
            }}
          >
            Francés profesional para tu equipo
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.15rem)",
              lineHeight: 1.65,
              color: "#3d4a5c",
              marginBottom: "2.5rem",
              maxWidth: 640,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Clases online adaptadas al sector y los países con los que trabaja tu empresa
            — Francia, Bélgica, Caribe francés, Magreb, África francófona
          </p>
          <GoldButton href="/contacto?tipo=empresa">Solicitar información</GoldButton>
        </div>
      </section>

      {/* ── CASOS DE USO REALES ── */}
      <section style={{ padding: "5rem 1.5rem", background: "#f0ede6" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "1rem",
              color: "#1e2d4a",
            }}
          >
            Empresas que confían en nosotros
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "#6b7280",
              fontSize: "1rem",
              marginBottom: "3rem",
              maxWidth: 500,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Casos reales de formación en francés profesional
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
                  {cs.title}
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
      </section>

      {/* ── QUÉ INCLUYE EL PROGRAMA ── */}
      <CinematicSection>
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "5rem 1.5rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "3rem",
              color: "#1e2d4a",
            }}
          >
            ¿Qué incluye el programa para empresas?
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {programFeatures.map((feat) => (
              <GlassCard key={feat.title}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    color: "#1e2d4a",
                    marginBottom: "0.5rem",
                  }}
                >
                  {feat.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.88rem",
                    lineHeight: 1.6,
                    color: "#6b7280",
                    margin: 0,
                  }}
                >
                  {feat.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* ── NIVELES Y MODALIDADES ── */}
      <section style={{ padding: "5rem 1.5rem", background: "#f0ede6" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "2.5rem",
              color: "#1e2d4a",
            }}
          >
            Niveles y modalidades
          </h2>
          <GlassCard>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "2rem",
              }}
            >
              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#6b7280", marginBottom: "0.4rem" }}>
                  Niveles
                </p>
                <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e2d4a" }}>
                  Desde A1 hasta C1
                </p>
              </div>
              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#6b7280", marginBottom: "0.4rem" }}>
                  Formato
                </p>
                <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e2d4a" }}>
                  Individual o grupo (máx. 4)
                </p>
              </div>
              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#6b7280", marginBottom: "0.4rem" }}>
                  Mínimo
                </p>
                <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e2d4a" }}>
                  10 horas por persona
                </p>
              </div>
              <div>
                <p style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#6b7280", marginBottom: "0.4rem" }}>
                  Precio
                </p>
                <p style={{ fontSize: "1.1rem", fontWeight: 700, color: "#1e2d4a" }}>
                  Desde 45 €/hora (grupos)
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <CinematicSection>
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: "5rem 1.5rem",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              marginBottom: "1rem",
              color: "#1e2d4a",
            }}
          >
            ¿Tu empresa trabaja con Francia o países francófonos?
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.6,
              color: "#3d4a5c",
              marginBottom: "2.5rem",
              maxWidth: 520,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Cuéntanos tu caso y diseñamos un programa a medida
          </p>
          <GoldButton href="/contacto?tipo=empresa">
            Solicitar propuesta
          </GoldButton>
        </div>
      </CinematicSection>
    </div>
  );
}
