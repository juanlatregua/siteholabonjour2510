import type { Metadata } from "next";
import Link from "next/link";
import GlassCard from "@/components/cinematic/GlassCard";
import GoldButton from "@/components/cinematic/GoldButton";
import CinematicSection from "@/components/cinematic/CinematicSection";

export const metadata: Metadata = {
  title: "HolaBonjour — El 100% de nuestros alumnos aprueba el DELF/DALF",
  description:
    "Practica con situaciones de examen reales y corrección IA inmediata. Simulacros DELF/DALF A2, B1, B2, C1, C2 disponibles gratis.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "HolaBonjour — El 100% de nuestros alumnos aprueba el DELF/DALF",
    description:
      "Practica con situaciones de examen reales y corrección IA inmediata.",
    url: "https://holabonjour.es/",
    siteName: "HolaBonjour",
    locale: "es_ES",
    type: "website",
  },
};

/* ─── Data ─── */

const trustStats = [
  { value: "A2 · B1 · B2 · C1 · C2", label: "niveles disponibles" },
  { value: "10", label: "simulacros completos con audio oficial" },
  { value: "24/7", label: "corrección IA con criterios oficiales" },
];

const levels = [
  {
    nivel: "A1",
    title: "Découverte",
    desc: "Comprende y usa expresiones cotidianas básicas.",
    color: "#22c55e",
    free: true,
  },
  {
    nivel: "A2",
    title: "Survie",
    desc: "Comunícate en tareas simples y habituales.",
    color: "#22c55e",
    free: true,
  },
  {
    nivel: "B1",
    title: "Seuil",
    desc: "Desenvuélvete en situaciones de viaje y trabajo.",
    color: "#3b82f6",
    free: true,
  },
  {
    nivel: "B2",
    title: "Avancé",
    desc: "Argumenta con fluidez y comprende textos complejos.",
    color: "#3b82f6",
    free: true,
  },
  {
    nivel: "C1",
    title: "Autonome",
    desc: "Usa el francés de forma flexible y eficaz.",
    color: "#6B3FA0",
    free: true,
  },
  {
    nivel: "C2",
    title: "Maîtrise",
    desc: "Dominio prácticamente nativo del idioma.",
    color: "#6B3FA0",
    free: true,
  },
];

const steps = [
  {
    num: "1",
    title: "Elige tu nivel",
    desc: "Selecciona entre A1 y C2 según tu objetivo.",
  },
  {
    num: "2",
    title: "Haz el simulador",
    desc: "Examen real con temporizador y corrección automática.",
  },
  {
    num: "3",
    title: "Recibe tu resultado",
    desc: "Resultado detallado por sección con tu puntuación real.",
  },
];

const testimonials = [
  {
    quote:
      "Aprobé el DELF B2 con 78/100 tras prepararme con los simuladores y las clases.",
    author: "Elena M.",
    level: "DELF B2",
    score: "78/100",
  },
  {
    quote:
      "El simulador es idéntico al examen real. Me quitó todos los nervios el día del examen.",
    author: "Carlos R.",
    level: "DELF B1",
    score: "85/100",
  },
  {
    quote:
      "Las correcciones de producción escrita con IA son increíblemente detalladas.",
    author: "Laura P.",
    level: "DALF C1",
    score: "72/100",
  },
];

/* ─── Page ─── */

export default function HomePage() {
  return (
    <div style={{ background: "#faf7f2", color: "#1e2d4a", minHeight: "100vh" }}>
      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          padding: "6rem 1rem 5rem",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(229,0,70,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 800,
            margin: "0 auto",
          }}
        >
          <p
            style={{
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#E50046",
              marginBottom: "1rem",
            }}
          >
            Academia online de francés
          </p>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 5vw, 3.2rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: "1.25rem",
              color: "#1e2d4a",
            }}
          >
            El 100% de nuestros alumnos aprueba el DELF/DALF
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              lineHeight: 1.6,
              color: "#6b7280",
              marginBottom: "2.5rem",
              maxWidth: 600,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Practica con situaciones de examen reales y corrección IA inmediata
          </p>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <GoldButton href="/examenes">
              Hacer simulacro gratis
            </GoldButton>
          </div>
        </div>
      </section>

      {/* ── TRUST BAND ── */}
      <section
        style={{
          borderTop: "1px solid rgba(30,45,74,0.08)",
          borderBottom: "1px solid rgba(30,45,74,0.08)",
          padding: "2rem 1rem",
          background: "#f0ede6",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
            textAlign: "center",
          }}
        >
          {trustStats.map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontSize: "1.75rem",
                  fontWeight: 700,
                  fontFamily: "'Playfair Display', serif",
                  color: "#E50046",
                  marginBottom: "0.25rem",
                }}
              >
                {stat.value}
              </div>
              <div style={{ fontSize: "0.9rem", color: "#6b7280" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── EXÁMENES POR NIVEL ── */}
      <CinematicSection>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "5rem 1rem",
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "1rem",
              color: "#1e2d4a",
            }}
          >
            Simuladores disponibles
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
            Elige tu nivel y empieza con una prueba gratuita
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {levels.map((l) => (
              <Link
                key={l.nivel}
                href={`/examenes/${l.nivel.toLowerCase()}/1`}
                style={{ textDecoration: "none" }}
              >
                <GlassCard>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "0.75rem",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: 800,
                        fontFamily: "'Playfair Display', serif",
                        color: l.color,
                      }}
                    >
                      {l.nivel}
                    </span>
                    <span
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        padding: "0.2rem 0.6rem",
                        borderRadius: 999,
                        background: l.free
                          ? "rgba(34, 197, 94, 0.08)"
                          : "rgba(201, 168, 76, 0.08)",
                        border: l.free
                          ? "1px solid rgba(34, 197, 94, 0.2)"
                          : "1px solid rgba(201, 168, 76, 0.2)",
                        color: l.free ? "#16a34a" : "#a16207",
                      }}
                    >
                      {l.free ? "Gratis" : "Premium"}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "#1e2d4a",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {l.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: 1.5,
                      color: "#6b7280",
                      margin: 0,
                      marginBottom: "1rem",
                    }}
                  >
                    {l.desc}
                  </p>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "#E50046",
                    }}
                  >
                    Empezar prueba &rarr;
                  </span>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* ── CÓMO FUNCIONA ── */}
      <section style={{ padding: "5rem 1rem", background: "#f0ede6" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "3rem",
              color: "#1e2d4a",
            }}
          >
            Cómo funciona
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "2rem",
            }}
          >
            {steps.map((s) => (
              <div key={s.num} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "rgba(229, 0, 70, 0.06)",
                    border: "2px solid rgba(229, 0, 70, 0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem",
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: "#E50046",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {s.num}
                </div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    marginBottom: "0.5rem",
                    color: "#1e2d4a",
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                    color: "#6b7280",
                    margin: 0,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <CinematicSection>
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "5rem 1rem",
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "3rem",
              color: "#1e2d4a",
            }}
          >
            Lo que dicen nuestros alumnos
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {testimonials.map((t) => (
              <GlassCard key={t.author}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      padding: "0.2rem 0.6rem",
                      borderRadius: 999,
                      background: "rgba(57, 93, 159, 0.08)",
                      border: "1px solid rgba(57, 93, 159, 0.2)",
                      color: "#395D9F",
                    }}
                  >
                    {t.level}
                  </span>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "#16a34a",
                    }}
                  >
                    {t.score}
                  </span>
                </div>
                <blockquote
                  style={{
                    margin: 0,
                    fontSize: "1rem",
                    lineHeight: 1.65,
                    color: "#3d4a5c",
                    fontStyle: "italic",
                    marginBottom: "1.25rem",
                  }}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: "#E50046",
                  }}
                >
                  &mdash; {t.author}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* ── CTA FINAL ── */}
      <section
        style={{
          background: "#f0ede6",
        }}
      >
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            padding: "5rem 1rem",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              marginBottom: "1rem",
              color: "#1e2d4a",
            }}
          >
            ¿Listo para empezar?
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.6,
              color: "#6b7280",
              marginBottom: "2.5rem",
              maxWidth: 520,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Haz un examen de prueba gratuito y descubre tu nivel real
          </p>
          <GoldButton href="/examenes">
            Hacer examen de prueba gratis
          </GoldButton>
        </div>
      </section>
    </div>
  );
}
