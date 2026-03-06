import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Preparación DELF/DALF — Simuladores y clases con nativos | HolaBonjour",
  description:
    "Prepara tu DELF o DALF con simuladores oficiales, corrección IA y clases individuales con profesores nativos examinadores. Próxima convocatoria mayo 2025.",
  alternates: { canonical: "/preparacion-delf-dalf" },
};

const levels = [
  {
    nivel: "A1",
    label: "Découverte",
    desc: "Comprende frases básicas y expresiones cotidianas.",
    hours: "50–80h",
  },
  {
    nivel: "A2",
    label: "Survie",
    desc: "Comunícate en tareas simples y describe tu entorno.",
    hours: "80–120h",
  },
  {
    nivel: "B1",
    label: "Seuil",
    desc: "Desenvuélvete en viajes, trabajo y opiniones.",
    hours: "150–200h",
  },
  {
    nivel: "B2",
    label: "Avancé",
    desc: "Argumenta con fluidez, comprende textos complejos.",
    hours: "250–350h",
  },
  {
    nivel: "C1",
    label: "Autonome",
    desc: "Usa el francés de forma flexible y eficaz.",
    hours: "400–500h",
  },
  {
    nivel: "C2",
    label: "Maîtrise",
    desc: "Dominio prácticamente nativo del idioma.",
    hours: "600–800h",
  },
];

const steps = [
  {
    num: "1",
    title: "Test de nivel gratuito",
    desc: "Descubre tu nivel actual con nuestro test inmersivo de 15 minutos.",
  },
  {
    num: "2",
    title: "Simulador DELF/DALF",
    desc: "Practica con exámenes reales con temporizador y corrección automática.",
  },
  {
    num: "3",
    title: "Clases con profesores nativos",
    desc: "Sesiones individuales de 55 min centradas en tus puntos débiles.",
  },
  {
    num: "4",
    title: "Examen oficial",
    desc: "Preséntate con confianza y aprueba a la primera.",
  },
];

const faqs = [
  {
    q: "¿Qué diferencia hay entre DELF y DALF?",
    a: "El DELF cubre los niveles A1 a B2 y el DALF los niveles C1 y C2. Ambos son diplomas oficiales del Ministerio de Educación francés, reconocidos internacionalmente y válidos de por vida.",
  },
  {
    q: "¿Cuánto tiempo necesito para prepararme?",
    a: "Depende de tu nivel actual y del nivel objetivo. En general, pasar de un nivel al siguiente requiere entre 100 y 200 horas de estudio. Nuestros packs de 4 clases se pueden renovar las veces necesarias.",
  },
  {
    q: "¿Los simuladores son iguales al examen real?",
    a: "Nuestros simuladores replican el formato oficial del DELF/DALF con los mismos tipos de ejercicios, duración y baremo de puntuación. Los elaboramos a partir de los modelos publicados por France Éducation International.",
  },
  {
    q: "¿Puedo hacer el examen desde España?",
    a: "Sí. Hay centros examinadores autorizados en toda España: Alianzas Francesas, Institutos Franceses y Escuelas Oficiales de Idiomas. Consulta nuestro calendario de convocatorias.",
  },
  {
    q: "¿Qué incluye el pack de clases?",
    a: "4 clases individuales de 55 minutos por Zoom con una profesora nativa examinadora. Incluye acceso a simuladores completos, correcciones IA ilimitadas y materiales de preparación.",
  },
];

export default function PreparacionDelfDalf() {
  return (
    <div style={{ background: "#0a0a0a", color: "#f5f5f5", minHeight: "100vh" }}>
      {/* ── HERO ── */}
      <section
        style={{
          position: "relative",
          padding: "5rem 1rem 4rem",
          textAlign: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(229,0,70,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
          <div
            style={{
              display: "inline-block",
              padding: "0.35rem 1rem",
              borderRadius: 999,
              background: "rgba(239,68,68,0.12)",
              border: "1px solid rgba(239,68,68,0.25)",
              color: "#ef4444",
              fontSize: "0.8rem",
              fontWeight: 700,
              marginBottom: "1.25rem",
            }}
          >
            Próxima convocatoria: mayo 2026
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            Prepara tu DELF o DALF con garantía de resultados
          </h1>
          <p
            style={{
              fontSize: "1.05rem",
              color: "#9ca3af",
              lineHeight: 1.6,
              marginBottom: "2rem",
              maxWidth: 550,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Simuladores oficiales + clases individuales con profesoras nativas examinadoras
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/examenes"
              style={{
                padding: "0.8rem 2rem",
                borderRadius: "0.5rem",
                background: "#E50046",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
              }}
            >
              Hacer simulador gratis
            </Link>
            <a
              href="#precios"
              style={{
                padding: "0.8rem 2rem",
                borderRadius: "0.5rem",
                border: "1.5px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.85)",
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
              }}
            >
              Ver precios
            </a>
          </div>
        </div>
      </section>

      {/* ── SELECTOR DE NIVEL ── */}
      <section style={{ padding: "4rem 1rem", borderTop: "1px solid #1f1f1f" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "2.5rem",
            }}
          >
            ¿Qué nivel necesitas?
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
              gap: "1rem",
            }}
          >
            {levels.map((l) => (
              <div
                key={l.nivel}
                style={{
                  padding: "1.5rem",
                  borderRadius: "0.75rem",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 800,
                      fontSize: "1.3rem",
                      color: "#E50046",
                    }}
                  >
                    {l.nivel}
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "#9ca3af" }}>{l.hours}</span>
                </div>
                <div style={{ fontSize: "0.9rem", fontWeight: 600, marginBottom: "0.35rem" }}>
                  {l.label}
                </div>
                <p style={{ fontSize: "0.85rem", color: "rgba(245,245,245,0.6)", margin: 0, lineHeight: 1.5 }}>
                  {l.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── METODOLOGÍA ── */}
      <section style={{ padding: "4rem 1rem", borderTop: "1px solid #1f1f1f" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "2.5rem",
            }}
          >
            Cómo te preparamos
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {steps.map((s) => (
              <div key={s.num} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "rgba(229,0,70,0.12)",
                    border: "2px solid rgba(229,0,70,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 0.75rem",
                    fontWeight: 800,
                    color: "#E50046",
                    fontSize: "1.1rem",
                  }}
                >
                  {s.num}
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "0.35rem" }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "#9ca3af", lineHeight: 1.5, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SIMULADORES DESTACADOS ── */}
      <section style={{ padding: "4rem 1rem", borderTop: "1px solid #1f1f1f" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            Prueba un simulador gratuito
          </h2>
          <p style={{ textAlign: "center", color: "#9ca3af", marginBottom: "2rem", fontSize: "0.95rem" }}>
            Los niveles B1 y B2 son los más demandados
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[
              { nivel: "B2", label: "DELF B2 — Avancé", href: "/examenes/b2/demo" },
              { nivel: "A1", label: "DELF A1 — Découverte", href: "/examenes/a1/demo" },
            ].map((item) => (
              <Link
                key={item.nivel}
                href={item.href}
                style={{
                  padding: "1.5rem",
                  borderRadius: "0.75rem",
                  background: "rgba(59,130,246,0.08)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  textDecoration: "none",
                  color: "#f5f5f5",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.4rem",
                    fontWeight: 800,
                    color: "#3b82f6",
                    marginBottom: "0.25rem",
                  }}
                >
                  {item.nivel}
                </div>
                <div style={{ fontSize: "0.85rem", marginBottom: "0.75rem", color: "#9ca3af" }}>
                  {item.label}
                </div>
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#E50046" }}>
                  Empezar gratis &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRECIOS ── */}
      <section id="precios" style={{ padding: "4rem 1rem", borderTop: "1px solid #1f1f1f" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "2.5rem",
            }}
          >
            Precios de preparación
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div
              style={{
                padding: "2rem 1.5rem",
                borderRadius: "0.75rem",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#E50046", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                DELF A1 – B2
              </div>
              <div style={{ fontSize: "2.5rem", fontWeight: 800, fontFamily: "'Playfair Display', serif" }}>
                150€
              </div>
              <div style={{ fontSize: "0.85rem", color: "#9ca3af", marginBottom: "1rem" }}>
                Pack 4 clases · 55 min
              </div>
              <ul style={{ listStyle: "none", padding: 0, fontSize: "0.85rem", color: "rgba(245,245,245,0.7)", lineHeight: 2, textAlign: "left" }}>
                <li>&#10003; Profesora nativa examinadora</li>
                <li>&#10003; Simuladores completos</li>
                <li>&#10003; Correcciones IA ilimitadas</li>
                <li>&#10003; Material de preparación</li>
              </ul>
              <Link
                href="/contratar?nivel=B2"
                style={{
                  display: "block",
                  marginTop: "1.25rem",
                  padding: "0.7rem",
                  borderRadius: "0.5rem",
                  background: "#E50046",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                Contratar
              </Link>
            </div>

            <div
              style={{
                padding: "2rem 1.5rem",
                borderRadius: "0.75rem",
                background: "rgba(201,168,76,0.06)",
                border: "1px solid rgba(201,168,76,0.2)",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#c9a84c", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.5rem" }}>
                DALF C1 – C2
              </div>
              <div style={{ fontSize: "2.5rem", fontWeight: 800, fontFamily: "'Playfair Display', serif" }}>
                200€
              </div>
              <div style={{ fontSize: "0.85rem", color: "#9ca3af", marginBottom: "1rem" }}>
                Pack 4 clases · 55 min
              </div>
              <ul style={{ listStyle: "none", padding: 0, fontSize: "0.85rem", color: "rgba(245,245,245,0.7)", lineHeight: 2, textAlign: "left" }}>
                <li>&#10003; Profesora nativa examinadora</li>
                <li>&#10003; Simuladores completos</li>
                <li>&#10003; Correcciones IA ilimitadas</li>
                <li>&#10003; Preparación oral avanzada</li>
              </ul>
              <Link
                href="/contratar?nivel=C1"
                style={{
                  display: "block",
                  marginTop: "1.25rem",
                  padding: "0.7rem",
                  borderRadius: "0.5rem",
                  background: "#c9a84c",
                  color: "#0a0a0a",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                Contratar
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "4rem 1rem", borderTop: "1px solid #1f1f1f" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: "2.5rem",
            }}
          >
            Preguntas frecuentes
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {faqs.map((faq) => (
              <details
                key={faq.q}
                style={{
                  padding: "1.25rem",
                  borderRadius: "0.75rem",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  cursor: "pointer",
                }}
              >
                <summary
                  style={{
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    color: "#f5f5f5",
                    listStyle: "none",
                  }}
                >
                  {faq.q}
                </summary>
                <p
                  style={{
                    marginTop: "0.75rem",
                    fontSize: "0.9rem",
                    color: "rgba(245,245,245,0.65)",
                    lineHeight: 1.6,
                    margin: "0.75rem 0 0",
                  }}
                >
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL + CONTACTO ── */}
      <section
        style={{
          padding: "4rem 1rem",
          borderTop: "1px solid #1f1f1f",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 500, margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            ¿Tienes dudas?
          </h2>
          <p
            style={{
              fontSize: "0.95rem",
              color: "#9ca3af",
              marginBottom: "2rem",
              lineHeight: 1.6,
            }}
          >
            Escríbenos y te orientamos sobre el nivel y la convocatoria más
            adecuada para ti
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="https://wa.me/34685070304"
              style={{
                padding: "0.8rem 2rem",
                borderRadius: "0.5rem",
                background: "#25d366",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.95rem",
                textDecoration: "none",
              }}
            >
              WhatsApp
            </a>
            <a
              href="mailto:hola@holabonjour.es"
              style={{
                padding: "0.8rem 2rem",
                borderRadius: "0.5rem",
                border: "1.5px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.85)",
                fontWeight: 600,
                fontSize: "0.95rem",
                textDecoration: "none",
              }}
            >
              hola@holabonjour.es
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
