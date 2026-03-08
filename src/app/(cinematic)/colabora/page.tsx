import type { Metadata } from "next";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GlassCard from "@/components/cinematic/GlassCard";
import ColaboraForm from "./ColaboraForm";

export const metadata: Metadata = {
  title: "Colabora con nosotros — Profesores FLE | HolaBonjour",
  description:
    "¿Eres profesor/a de FLE? Únete al equipo de HolaBonjour. Clases individuales por Zoom, horario flexible, plataforma propia.",
  alternates: { canonical: "/colabora" },
  openGraph: {
    title: "Colabora con nosotros — Profesores FLE | HolaBonjour",
    description:
      "¿Eres profesor/a de FLE? Únete al equipo de HolaBonjour. Clases individuales por Zoom, horario flexible, plataforma propia.",
    url: "https://holabonjour.es/colabora",
    siteName: "HolaBonjour",
    locale: "es_ES",
    type: "website",
  },
};

const offerings = [
  { icon: "🖥️", text: "Plataforma propia: zona alumno, materiales, seguimiento y corrección IA" },
  { icon: "🕐", text: "Horario 100% flexible acordado contigo" },
  { icon: "🎓", text: "Alumnos adultos motivados (no clases de colegio)" },
  { icon: "💶", text: "Comisión competitiva sobre cada clase impartida" },
  { icon: "📚", text: "Formación inicial en el uso de la plataforma" },
  { icon: "📂", text: "Materiales y recursos compartidos" },
];

const faq = [
  {
    q: "¿Necesito estar en España para colaborar?",
    a: "Preferimos profesores en España o con horario peninsular (±1h), aunque valoramos perfiles excepcionales de otros países francófonos.",
  },
  {
    q: "¿Cuánto se cobra por clase?",
    a: "La remuneración se acuerda individualmente según experiencia y disponibilidad. Lo hablamos en la entrevista.",
  },
  {
    q: "¿Tengo que conseguir yo los alumnos?",
    a: "No. holabonjour.es gestiona la captación de alumnos. Tú te centras en dar clases de calidad.",
  },
  {
    q: "¿Qué pasa si no tengo el DAEFLE pero sí un Máster FLE?",
    a: "El Máster FLE universitario es perfectamente válido y muy valorado. Cualquier titulación específica en didáctica del francés es aceptada.",
  },
  {
    q: "¿Puedo compaginar con otro trabajo?",
    a: "Sí. Muchos de nuestros profesores compaginan con otras actividades. Solo pedimos un mínimo de 4 horas semanales y puntualidad.",
  },
];

export default function ColaboraPage() {
  return (
    <div style={{ background: "var(--cin-bg)", color: "var(--cin-text)" }}>
      {/* ====== SECTION 1: Hero ====== */}
      <CinematicSection className="py-20 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h1
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 800,
              lineHeight: 1.15,
              color: "#1e2d4a",
            }}
          >
            ¿Eres profesor/a de FLE y quieres enseñar online?
          </h1>
          <p
            style={{
              marginTop: "1rem",
              fontSize: "1.1rem",
              lineHeight: 1.6,
              color: "#3d4a5c",
              maxWidth: 640,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Buscamos profesores apasionados por la lengua y la cultura francesa
            para impartir clases individuales por Zoom desde cualquier lugar.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-4" style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "#3d4a5c" }}>
          <p>
            <strong style={{ color: "#1e2d4a" }}>holabonjour.es</strong> es una academia online de francés con sede en Málaga,
            especializada en clases individuales, preparación DELF/DALF y francés para empresas.
          </p>
          <p>
            Las clases son de 55 minutos por Zoom, con horario flexible pactado directamente con el profesor.
            Trabajamos con alumnos adultos motivados que buscan resultados concretos.
          </p>
          <p>
            Contamos con plataforma propia con zona de alumno, seguimiento personalizado,
            corrección por IA, gestión de bonos y materiales compartidos.
          </p>
        </div>
      </CinematicSection>

      {/* ====== SECTION 2: Qué ofrecemos ====== */}
      <section className="py-16 px-4" style={{ background: "var(--cin-bg-alt)" }}>
        <div className="mx-auto max-w-4xl">
          <h2
            style={{
              fontSize: "1.6rem",
              fontWeight: 700,
              color: "#1e2d4a",
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            Qué ofrecemos
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {offerings.map((item) => (
              <GlassCard key={item.text} hover={false}>
                <p style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{item.icon}</p>
                <p style={{ fontSize: "0.9rem", color: "#3d4a5c", lineHeight: 1.5 }}>{item.text}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SECTION 3: Perfil que buscamos ====== */}
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
            Perfil que buscamos
          </h2>

          {/* Imprescindible */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid rgba(229,0,70,0.15)",
              borderRadius: "1rem",
              padding: "1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "#E50046",
                marginBottom: "1rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Imprescindible
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: "0.9rem",
                color: "#3d4a5c",
                lineHeight: 2,
              }}
            >
              <li>
                <strong style={{ color: "#1e2d4a" }}>Nivel de francés:</strong> nativo o DALF C1/C2 certificado
              </li>
              <li>
                <strong style={{ color: "#1e2d4a" }}>Titulación específica:</strong> Filología Francesa, Traducción e Interpretación (francés),
                Máster FLE, DAEFLE (Alliance Française + CNED), DPAFP (Alliance Française París),
                Magisterio especialidad francés, Máster Formación del Profesorado (francés),
                o titulación equivalente de sistemas francófonos (CAPES, etc.)
              </li>
              <li>
                <strong style={{ color: "#1e2d4a" }}>Experiencia:</strong> mínimo 1 año enseñando francés a adultos (demostrable)
              </li>
              <li>
                <strong style={{ color: "#1e2d4a" }}>Disponibilidad:</strong> mínimo 4 horas semanales
              </li>
              <li>
                <strong style={{ color: "#1e2d4a" }}>Herramientas:</strong> dominio de Zoom y herramientas digitales básicas
              </li>
              <li>
                <strong style={{ color: "#1e2d4a" }}>Zona horaria:</strong> residencia en España o zona horaria peninsular (±1h)
              </li>
            </ul>
          </div>

          {/* Se valora */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid rgba(57,93,159,0.15)",
              borderRadius: "1rem",
              padding: "1.5rem",
            }}
          >
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "#395D9F",
                marginBottom: "1rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Se valora especialmente
            </h3>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                fontSize: "0.9rem",
                color: "#3d4a5c",
                lineHeight: 2,
              }}
            >
              <li>Experiencia en preparación DELF/DALF</li>
              <li>Experiencia con francés de negocios / profesional</li>
              <li>Conocimiento de metodología comunicativa y enfoque por tareas</li>
              <li>Formación BELC (Bureau pour l&apos;Enseignement de la Langue et de la Civilisation françaises)</li>
              <li>Experiencia con plataformas LMS o gestión de alumnos online</li>
              <li>Español nativo o C1 mínimo</li>
              <li>Portfolio o materiales propios de clase</li>
            </ul>
          </div>
        </div>
      </CinematicSection>

      {/* ====== SECTION 4: Formulario ====== */}
      <section className="py-16 px-4" style={{ background: "var(--cin-bg-alt)" }}>
        <div className="mx-auto max-w-2xl">
          <h2
            style={{
              fontSize: "1.6rem",
              fontWeight: 700,
              color: "#1e2d4a",
              textAlign: "center",
              marginBottom: "0.5rem",
            }}
          >
            Envía tu candidatura
          </h2>
          <p
            style={{
              textAlign: "center",
              fontSize: "0.9rem",
              color: "#5f6b78",
              marginBottom: "2rem",
            }}
          >
            Todos los campos marcados con * son obligatorios.
          </p>
          <ColaboraForm />
        </div>
      </section>

      {/* ====== SECTION 5: FAQ ====== */}
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
                  <span style={{ fontSize: "1.2rem", color: "#5f6b78", transition: "transform 0.2s" }} className="group-open:rotate-45">+</span>
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

      {/* ====== SECTION 6: Footer CTA ====== */}
      <CinematicSection className="py-12 px-4">
        <div className="mx-auto max-w-2xl text-center">
          <p style={{ fontSize: "0.95rem", color: "#5f6b78" }}>
            ¿Tienes dudas antes de aplicar? Escríbenos a{" "}
            <a
              href="mailto:info@holabonjour.es?subject=Consulta%20profesor%20FLE"
              style={{ color: "#E50046", fontWeight: 600, textDecoration: "none" }}
            >
              info@holabonjour.es
            </a>{" "}
            con el asunto &quot;Consulta profesor FLE&quot;.
          </p>
        </div>
      </CinematicSection>
    </div>
  );
}
