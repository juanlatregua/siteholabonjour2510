import type { Metadata } from "next";
import Link from "next/link";
import ExamCalendar from "@/components/exams/ExamCalendar";

export const metadata: Metadata = {
  title: "Calendario Exámenes DELF y DALF 2026 en España | HolaBonjour",
  description:
    "Fechas y centros oficiales para los exámenes DELF y DALF en España en 2026. Institut français de Madrid, Barcelona, Bilbao, Sevilla, Valencia, Zaragoza y Málaga.",
  alternates: { canonical: "/calendario-examenes" },
  openGraph: {
    title: "Calendario Exámenes DELF y DALF 2026 en España | HolaBonjour",
    description:
      "Fechas y centros oficiales para los exámenes DELF y DALF en España en 2026. Institut français de Madrid, Barcelona, Bilbao, Sevilla, Valencia, Zaragoza y Málaga.",
    url: "https://holabonjour.es/calendario-examenes",
    siteName: "HolaBonjour",
    locale: "es_ES",
    type: "website",
  },
};

const CENTROS = [
  {
    ciudad: "Madrid",
    centro: "Institut français de Madrid",
    direccion: "C/ Marqués de la Ensenada, 12",
    web: "https://www.institutfrancais.es/madrid",
  },
  {
    ciudad: "Barcelona",
    centro: "Institut français de Barcelona",
    direccion: "C/ Moià, 8",
    web: "https://www.institutfrancais.es/barcelona",
  },
  {
    ciudad: "Bilbao",
    centro: "Institut français de Bilbao",
    direccion: "C/ Villafranca de Ordizia, 2",
    web: "https://www.institutfrancais.es/bilbao",
  },
  {
    ciudad: "Sevilla",
    centro: "Institut français de Sevilla",
    direccion: "C/ Federico Rubio, 14",
    web: "https://www.institutfrancais.es/sevilla",
  },
  {
    ciudad: "Valencia",
    centro: "Institut français de Valencia",
    direccion: "C/ Moro Zeit, 6",
    web: "https://www.institutfrancais.es/valencia",
  },
  {
    ciudad: "Zaragoza",
    centro: "Institut français de Zaragoza",
    direccion: "C/ Zurita, 18",
    web: "https://www.institutfrancais.es/zaragoza",
  },
  {
    ciudad: "Málaga",
    centro: "Institut français de Málaga",
    direccion: "C/ Duquesa de Parcent, 7",
    web: "https://www.institutfrancais.es/malaga",
  },
];

const CONVOCATORIAS = [
  { periodo: "Enero / Febrero 2026", estado: "Matrícula cerrada" },
  { periodo: "Abril / Mayo 2026", estado: "Consultar centro" },
  { periodo: "Junio / Julio 2026", estado: "Consultar centro" },
  { periodo: "Noviembre 2026", estado: "Consultar centro" },
];

export default function CalendarioExamenesPage() {
  return (
    <div style={{ background: "#faf7f2", minHeight: "100vh" }}>
      {/* Hero */}
      <section style={{ paddingTop: "4rem", paddingBottom: "2.5rem" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 1.25rem", textAlign: "center" }}>
          <h1
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 800,
              color: "#1e2d4a",
              lineHeight: 1.2,
              marginBottom: "1rem",
            }}
          >
            Calendario de exámenes DELF y DALF en España 2026
          </h1>
          <p style={{ fontSize: "1.1rem", color: "#3d4a5c", maxWidth: 640, margin: "0 auto" }}>
            Fechas, centros oficiales y toda la información que necesitas para
            inscribirte en los exámenes oficiales de francés del Institut français.
          </p>
        </div>
      </section>

      {/* Aviso importante */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 1.25rem 2rem" }}>
        <div
          style={{
            background: "rgba(57, 93, 159, 0.08)",
            border: "1px solid rgba(57, 93, 159, 0.15)",
            borderRadius: "0.75rem",
            padding: "1.25rem 1.5rem",
            display: "flex",
            gap: "0.75rem",
            alignItems: "flex-start",
          }}
        >
          <span style={{ fontSize: "1.25rem", flexShrink: 0, marginTop: 2 }}>
            &#9432;
          </span>
          <div>
            <p style={{ fontSize: "0.95rem", color: "#1e2d4a", fontWeight: 600, marginBottom: "0.25rem" }}>
              Aviso importante
            </p>
            <p style={{ fontSize: "0.9rem", color: "#3d4a5c", lineHeight: 1.6 }}>
              Las fechas exactas las publica cada centro. Consulta el Institut
              français de tu ciudad para conocer las convocatorias disponibles y
              los plazos de inscripción.
            </p>
            <a
              href="https://www.institutfrancais.es"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "0.5rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#395D9F",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              institutfrancais.es &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Niveles disponibles */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 1.25rem 2.5rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#1e2d4a", marginBottom: "1rem" }}>
          Niveles disponibles
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {["DELF A1", "DELF A2", "DELF B1", "DELF B2", "DALF C1", "DALF C2"].map((n) => (
            <span
              key={n}
              style={{
                display: "inline-block",
                padding: "0.4rem 0.9rem",
                borderRadius: "2rem",
                fontSize: "0.85rem",
                fontWeight: 600,
                background: n.startsWith("DALF") ? "rgba(229, 0, 70, 0.08)" : "rgba(57, 93, 159, 0.08)",
                color: n.startsWith("DALF") ? "#E50046" : "#395D9F",
              }}
            >
              {n}
            </span>
          ))}
        </div>
      </section>

      {/* Convocatorias habituales */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 1.25rem 2.5rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#1e2d4a", marginBottom: "1rem" }}>
          Convocatorias habituales 2026
        </h2>
        <div
          style={{
            background: "#ffffff",
            borderRadius: "0.75rem",
            border: "1px solid rgba(30, 45, 74, 0.08)",
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "rgba(57, 93, 159, 0.05)" }}>
                <th
                  style={{
                    textAlign: "left",
                    padding: "0.75rem 1rem",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "#1e2d4a",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Periodo
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "0.75rem 1rem",
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: "#1e2d4a",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Estado
                </th>
              </tr>
            </thead>
            <tbody>
              {CONVOCATORIAS.map((c, i) => (
                <tr
                  key={c.periodo}
                  style={{
                    borderTop: i > 0 ? "1px solid rgba(30, 45, 74, 0.06)" : undefined,
                  }}
                >
                  <td style={{ padding: "0.75rem 1rem", fontSize: "0.9rem", fontWeight: 600, color: "#1e2d4a" }}>
                    {c.periodo}
                  </td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        padding: "0.2rem 0.6rem",
                        borderRadius: "1rem",
                        background:
                          c.estado === "Matrícula cerrada"
                            ? "rgba(239, 68, 68, 0.1)"
                            : "rgba(57, 93, 159, 0.08)",
                        color:
                          c.estado === "Matrícula cerrada" ? "#dc2626" : "#395D9F",
                      }}
                    >
                      {c.estado}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: "0.8rem", color: "#5f6b78", marginTop: "0.5rem" }}>
          * Fechas aproximadas. Cada centro publica su calendario propio.
        </p>
      </section>

      {/* Tabla de centros */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 1.25rem 2.5rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#1e2d4a", marginBottom: "1rem" }}>
          Centros oficiales del Institut français en España
        </h2>
        <div
          style={{
            background: "#ffffff",
            borderRadius: "0.75rem",
            border: "1px solid rgba(30, 45, 74, 0.08)",
            overflow: "hidden",
          }}
        >
          {/* Desktop table */}
          <div className="hidden md:block">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "rgba(57, 93, 159, 0.05)" }}>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "0.75rem 1rem",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "#1e2d4a",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Ciudad
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "0.75rem 1rem",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "#1e2d4a",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Dirección
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "0.75rem 1rem",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "#1e2d4a",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Web
                  </th>
                </tr>
              </thead>
              <tbody>
                {CENTROS.map((c, i) => (
                  <tr
                    key={c.ciudad}
                    style={{
                      borderTop: i > 0 ? "1px solid rgba(30, 45, 74, 0.06)" : undefined,
                    }}
                  >
                    <td
                      style={{
                        padding: "0.75rem 1rem",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        color: "#1e2d4a",
                      }}
                    >
                      {c.ciudad}
                    </td>
                    <td
                      style={{
                        padding: "0.75rem 1rem",
                        fontSize: "0.875rem",
                        color: "#3d4a5c",
                      }}
                    >
                      {c.direccion}
                    </td>
                    <td style={{ padding: "0.75rem 1rem" }}>
                      <a
                        href={c.web}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          color: "#395D9F",
                          textDecoration: "underline",
                          textUnderlineOffset: "2px",
                        }}
                      >
                        Ver web
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden" style={{ padding: "0.5rem" }}>
            {CENTROS.map((c, i) => (
              <div
                key={c.ciudad}
                style={{
                  padding: "0.75rem",
                  borderTop: i > 0 ? "1px solid rgba(30, 45, 74, 0.06)" : undefined,
                }}
              >
                <p style={{ fontWeight: 700, fontSize: "0.95rem", color: "#1e2d4a" }}>
                  {c.centro}
                </p>
                <p style={{ fontSize: "0.85rem", color: "#3d4a5c", marginTop: "0.15rem" }}>
                  {c.direccion}
                </p>
                <a
                  href={c.web}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    marginTop: "0.35rem",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#395D9F",
                    textDecoration: "underline",
                    textUnderlineOffset: "2px",
                  }}
                >
                  Ver web del centro &rarr;
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ¿Cuándo inscribirse? */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 1.25rem 2.5rem" }}>
        <div
          style={{
            background: "#ffffff",
            borderRadius: "0.75rem",
            border: "1px solid rgba(30, 45, 74, 0.08)",
            padding: "1.5rem",
          }}
        >
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1e2d4a", marginBottom: "0.75rem" }}>
            ¿Cuándo inscribirse?
          </h2>
          <p style={{ fontSize: "0.95rem", color: "#3d4a5c", lineHeight: 1.7, marginBottom: "0.75rem" }}>
            La inscripción cierra generalmente <strong>6-8 semanas antes del
            examen</strong>. Si tienes fecha límite por oposiciones o visado,
            planifica con al menos <strong>3 meses de antelación</strong>.
          </p>
          <p style={{ fontSize: "0.95rem", color: "#3d4a5c", lineHeight: 1.7 }}>
            Los precios varían según el nivel (entre 100 € y 200 € aproximadamente).
            Cada centro puede tener tarifas ligeramente distintas. Consulta la web de
            tu centro para ver los precios exactos y el formulario de inscripción.
          </p>
        </div>
      </section>

      {/* Sección EOI */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 1.25rem 2.5rem" }}>
        <div
          style={{
            background: "#ffffff",
            borderRadius: "0.75rem",
            border: "1px solid rgba(30, 45, 74, 0.08)",
            padding: "1.5rem",
          }}
        >
          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1e2d4a", marginBottom: "0.75rem" }}>
            Exámenes de francés en la EOI
          </h2>
          <p style={{ fontSize: "0.95rem", color: "#3d4a5c", lineHeight: 1.7, marginBottom: "0.75rem" }}>
            Las Escuelas Oficiales de Idiomas también certifican el nivel de francés
            con sus propios exámenes oficiales, reconocidos en España para oposiciones
            y trámites administrativos.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.75rem" }}>
            {["A2", "B1", "B2", "C1", "C2"].map((n) => (
              <span
                key={n}
                style={{
                  display: "inline-block",
                  padding: "0.3rem 0.7rem",
                  borderRadius: "2rem",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  background: "rgba(30, 45, 74, 0.06)",
                  color: "#1e2d4a",
                }}
              >
                EOI {n}
              </span>
            ))}
          </div>

          <p style={{ fontSize: "0.95rem", color: "#3d4a5c", lineHeight: 1.7, marginBottom: "1rem" }}>
            <strong>Convocatorias:</strong> generalmente en junio (ordinaria) y
            septiembre (extraordinaria).
          </p>

          {/* Diferencia DELF vs EOI */}
          <div
            style={{
              background: "rgba(30, 45, 74, 0.03)",
              borderRadius: "0.5rem",
              padding: "1rem 1.25rem",
              marginBottom: "1rem",
            }}
          >
            <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#1e2d4a", marginBottom: "0.5rem" }}>
              Diferencia con el DELF/DALF:
            </p>
            <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: "0.9rem", color: "#3d4a5c", lineHeight: 1.8 }}>
              <li>
                <strong>EOI:</strong> reconocido en España, gratuito para matriculados
              </li>
              <li>
                <strong>DELF/DALF:</strong> reconocido internacionalmente, validez permanente
              </li>
            </ul>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
            <a
              href="https://www.educacionfpydeportes.gob.es/contenidos/estudiantes/ensenanzas-idiomas.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#395D9F",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              Web oficial EOI &rarr;
            </a>
            <Link
              href="/contacto"
              style={{
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#E50046",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              ¿DELF o EOI? Pregúntanos &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Buscador dinámico (si hay datos en BD) */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 1.25rem 2.5rem" }}>
        <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#1e2d4a", marginBottom: "1rem" }}>
          Buscar convocatorias por centro y nivel
        </h2>
        <ExamCalendar />
      </section>

      {/* CTA final */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 1.25rem 3rem" }}>
        <div
          style={{
            background: "#ffffff",
            borderRadius: "0.75rem",
            border: "1px solid rgba(30, 45, 74, 0.08)",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#1e2d4a", marginBottom: "0.5rem" }}>
            Prepárate con tiempo
          </h2>
          <p style={{ fontSize: "0.95rem", color: "#3d4a5c", maxWidth: 500, margin: "0 auto 1.25rem" }}>
            Una sesión de diagnóstico te ayuda a saber exactamente en qué nivel
            presentarte y qué trabajar antes del examen.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.75rem" }}>
            <Link
              href="/contratar?producto=diagnostico"
              style={{
                display: "inline-block",
                background: "#E50046",
                color: "#ffffff",
                fontWeight: 700,
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                textDecoration: "none",
                fontSize: "0.95rem",
                transition: "background 0.2s",
              }}
            >
              Reservar sesión diagnóstico
            </Link>
            <Link
              href="/examenes"
              style={{
                display: "inline-block",
                border: "1.5px solid #1e2d4a",
                color: "#1e2d4a",
                fontWeight: 600,
                padding: "0.75rem 1.5rem",
                borderRadius: "0.5rem",
                textDecoration: "none",
                fontSize: "0.95rem",
              }}
            >
              Hacer un simulacro gratis
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
