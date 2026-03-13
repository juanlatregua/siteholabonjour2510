import type { Metadata } from "next";
import Link from "next/link";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GlassCard from "@/components/cinematic/GlassCard";

export const metadata: Metadata = {
  title: "Plataforma para profesores de francés | HolaBonjour",
  description:
    "Gestiona tus clases de francés con una plataforma gratuita: reservas, videoconferencia, portal de alumnos, corrección IA y simuladores DELF/DALF.",
  alternates: { canonical: "/profesores" },
  openGraph: {
    title: "Plataforma para profesores de francés | HolaBonjour",
    description:
      "Gestiona tus clases de francés con una plataforma gratuita: reservas, videoconferencia, portal de alumnos, corrección IA y simuladores DELF/DALF.",
    url: "https://holabonjour.es/profesores",
    siteName: "HolaBonjour",
    locale: "es_ES",
    type: "website",
  },
};

const benefits = [
  {
    title: "Perfil público",
    desc: "Tu propia página de profesor con URL personalizada. Tus alumnos te encuentran y reservan directamente.",
  },
  {
    title: "Sistema de reservas",
    desc: "Configura tu disponibilidad. Tus alumnos eligen hora y reservan en 2 clics. Adiós WhatsApp y calendarios manuales.",
  },
  {
    title: "Portal del alumno",
    desc: "Cada alumno tiene su zona: clases, materiales, grabaciones, historial. Todo organizado sin esfuerzo.",
  },
  {
    title: "Corrección IA",
    desc: "Tus alumnos practican escritura y reciben corrección automática con rúbricas DELF/DALF reales. Tú supervisas.",
  },
  {
    title: "Simuladores DELF/DALF",
    desc: "Exámenes A1-C2 integrados para que tus alumnos practiquen comprensión oral y escrita.",
  },
  {
    title: "Mensajería integrada",
    desc: "Chat directo con cada alumno dentro de la plataforma. Sin mezclar con tu WhatsApp personal.",
  },
];

const tiers = [
  {
    name: "Essentiel",
    price: "Gratis",
    color: "#395D9F",
    features: [
      "Perfil público con URL personalizada",
      "Sistema de reservas y disponibilidad",
      "Videoconferencia integrada",
      "Portal básico del alumno",
      "Mensajería con alumnos",
      "Hasta 10 alumnos activos",
    ],
  },
  {
    name: "Professionnel",
    price: "39 €/mes",
    color: "#E50046",
    features: [
      "Todo lo de Essentiel +",
      "Zoom con grabación automática",
      "Portal alumno completo con grabaciones",
      "Corrección IA para tus alumnos",
      "Simuladores DELF/DALF",
      "Analíticas avanzadas",
      "Sin límite de alumnos",
    ],
    highlighted: true,
  },
];

const faq = [
  {
    q: "¿Es realmente gratis?",
    a: "Sí. El plan Essentiel es gratuito y sin comisiones. Tú cobras a tus alumnos directamente como siempre. La plataforma se sostiene con las suscripciones al plan Professionnel.",
  },
  {
    q: "¿Necesito traer mis propios alumnos?",
    a: "Puedes usar la plataforma para gestionar tus alumnos actuales. Además, los alumnos que llegan a holabonjour.es por SEO pueden descubrirte en nuestro directorio de préparateurs.",
  },
  {
    q: "¿Qué pasa con mis datos si dejo la plataforma?",
    a: "Tus datos son tuyos. Puedes exportar la lista de alumnos y su historial en cualquier momento.",
  },
  {
    q: "¿Puedo usar mi propio Zoom o Google Meet?",
    a: "Sí. En el plan gratuito puedes usar cualquier herramienta de videollamada. En Professionnel, además tienes Zoom con grabación automática integrado.",
  },
  {
    q: "¿Qué es la corrección IA?",
    a: "Un sistema de corrección automática de escritura basado en inteligencia artificial que evalúa con las rúbricas oficiales del DELF/DALF. El alumno practica y tú puedes revisar las correcciones.",
  },
];

export default function ProfesoresPage() {
  return (
    <div style={{ background: "var(--cin-bg)", color: "var(--cin-text)" }}>
      {/* ====== HERO ====== */}
      <CinematicSection className="py-20 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p
            style={{
              fontSize: "0.85rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              color: "#E50046",
              marginBottom: "0.75rem",
            }}
          >
            Para profesores de francés
          </p>
          <h1
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              color: "#1e2d4a",
            }}
          >
            Tu plataforma de clases de francés.
            <br />
            <span style={{ color: "#E50046" }}>Gratis.</span>
          </h1>
          <p
            style={{
              marginTop: "1.25rem",
              fontSize: "1.1rem",
              lineHeight: 1.6,
              color: "#3d4a5c",
              maxWidth: 600,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Reservas, portal del alumno, corrección IA, simuladores DELF/DALF y
            videoconferencia. Todo lo que necesitas para dar clases de francés
            online, en un solo sitio.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/colabora"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.85rem 2rem",
                background: "#E50046",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1rem",
                borderRadius: "0.75rem",
                textDecoration: "none",
                transition: "opacity 0.15s",
              }}
            >
              Empezar gratis
            </Link>
            <Link
              href="/preparateurs"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.85rem 2rem",
                background: "transparent",
                color: "#1e2d4a",
                fontWeight: 600,
                fontSize: "1rem",
                borderRadius: "0.75rem",
                border: "1px solid rgba(30,45,74,0.2)",
                textDecoration: "none",
                transition: "background 0.15s",
              }}
            >
              Ver directorio
            </Link>
          </div>
        </div>
      </CinematicSection>

      {/* ====== BENEFITS ====== */}
      <section className="py-16 px-4" style={{ background: "var(--cin-bg-alt)" }}>
        <div className="mx-auto max-w-5xl">
          <h2
            style={{
              fontSize: "1.6rem",
              fontWeight: 700,
              color: "#1e2d4a",
              textAlign: "center",
              marginBottom: "2.5rem",
            }}
          >
            Todo lo que un profesor de francés necesita
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <GlassCard key={b.title} hover={false}>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e2d4a", marginBottom: "0.4rem" }}>
                  {b.title}
                </h3>
                <p style={{ fontSize: "0.88rem", color: "#3d4a5c", lineHeight: 1.55 }}>
                  {b.desc}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ====== PRICING TIERS ====== */}
      <CinematicSection className="py-16 px-4">
        <div className="mx-auto max-w-3xl">
          <h2
            style={{
              fontSize: "1.6rem",
              fontWeight: 700,
              color: "#1e2d4a",
              textAlign: "center",
              marginBottom: "2.5rem",
            }}
          >
            Planes
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                style={{
                  background: "#ffffff",
                  border: tier.highlighted
                    ? "2px solid #E50046"
                    : "1px solid rgba(30,45,74,0.1)",
                  borderRadius: "1rem",
                  padding: "2rem 1.5rem",
                  position: "relative",
                }}
              >
                {tier.highlighted && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-0.75rem",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "#E50046",
                      color: "#fff",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      padding: "0.25rem 0.75rem",
                      borderRadius: "1rem",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Recomendado
                  </span>
                )}
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: tier.color }}>
                  {tier.name}
                </h3>
                <p style={{ fontSize: "1.8rem", fontWeight: 800, color: "#1e2d4a", margin: "0.5rem 0 1.25rem" }}>
                  {tier.price}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      style={{
                        padding: "0.35rem 0",
                        fontSize: "0.88rem",
                        color: "#3d4a5c",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.5rem",
                      }}
                    >
                      <span style={{ color: tier.color, fontWeight: 700, flexShrink: 0 }}>&#10003;</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* ====== HOW IT WORKS ====== */}
      <section className="py-16 px-4" style={{ background: "var(--cin-bg-alt)" }}>
        <div className="mx-auto max-w-3xl">
          <h2
            style={{
              fontSize: "1.6rem",
              fontWeight: 700,
              color: "#1e2d4a",
              textAlign: "center",
              marginBottom: "2.5rem",
            }}
          >
            Cómo funciona
          </h2>
          <div className="space-y-6">
            {[
              { step: "1", title: "Regístrate gratis", desc: "Rellena el formulario con tu experiencia y titulación. Revisamos tu perfil en 48h." },
              { step: "2", title: "Configura tu perfil", desc: "Añade tu foto, bio, disponibilidad y tarifa. Tu perfil público se activa automáticamente." },
              { step: "3", title: "Empieza a dar clases", desc: "Comparte tu enlace con tus alumnos o deja que te encuentren en nuestro directorio." },
            ].map((item) => (
              <div
                key={item.step}
                style={{
                  display: "flex",
                  gap: "1.25rem",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "#1e2d4a",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "1rem",
                    flexShrink: 0,
                  }}
                >
                  {item.step}
                </div>
                <div>
                  <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#1e2d4a", marginBottom: "0.25rem" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "0.9rem", color: "#3d4a5c", lineHeight: 1.5 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== FAQ ====== */}
      <CinematicSection className="py-16 px-4">
        <div className="mx-auto max-w-3xl">
          <h2
            style={{
              fontSize: "1.6rem",
              fontWeight: 700,
              color: "#1e2d4a",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            Preguntas frecuentes
          </h2>
          <div className="space-y-3">
            {faq.map((item) => (
              <details
                key={item.q}
                className="group"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(30,45,74,0.08)",
                  borderRadius: "0.75rem",
                  overflow: "hidden",
                }}
              >
                <summary
                  style={{
                    padding: "1rem 1.25rem",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: "#1e2d4a",
                    listStyle: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {item.q}
                  <span
                    style={{ fontSize: "1.2rem", color: "#5f6b78", transition: "transform 0.2s" }}
                    className="group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <div
                  style={{
                    padding: "0 1.25rem 1rem",
                    fontSize: "0.9rem",
                    color: "#3d4a5c",
                    lineHeight: 1.6,
                  }}
                >
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* ====== FINAL CTA ====== */}
      <section className="py-16 px-4" style={{ background: "var(--cin-bg-alt)" }}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#1e2d4a", marginBottom: "1rem" }}>
            Empieza a usar la plataforma hoy
          </h2>
          <p style={{ fontSize: "0.95rem", color: "#3d4a5c", marginBottom: "1.5rem", lineHeight: 1.6 }}>
            Sin tarjeta de crédito. Sin comisiones. Gratis para siempre en el plan Essentiel.
          </p>
          <Link
            href="/colabora"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.85rem 2.5rem",
              background: "#E50046",
              color: "#fff",
              fontWeight: 700,
              fontSize: "1rem",
              borderRadius: "0.75rem",
              textDecoration: "none",
            }}
          >
            Registrarme gratis
          </Link>
          <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "#5f6b78" }}>
            ¿Dudas?{" "}
            <a
              href="mailto:info@holabonjour.es?subject=Consulta%20plataforma%20profesores"
              style={{ color: "#E50046", fontWeight: 600, textDecoration: "none" }}
            >
              info@holabonjour.es
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
