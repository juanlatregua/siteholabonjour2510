import type { Metadata } from "next";
import Link from "next/link";
import { CONFIG_NIVELES } from "@/lib/examenes/config-niveles";
import { examenDisponible, tieneAudio } from "@/lib/examenes";
import type { Nivel } from "@/lib/examenes/types";

export const metadata: Metadata = {
  title: "Simuladores oficiales DELF y DALF — HolaBonjour",
  description:
    "Practica con simuladores de exámenes DELF A1, A2, B1, B2 y DALF C1, C2 con temporizador oficial, corrección automática y revisión por profesores nativos.",
  alternates: { canonical: "/examenes" },
};

const BADGE_COLORS: Record<string, { bg: string; border: string; text: string; btn: string }> = {
  emerald: { bg: "#ecfdf5", border: "#a7f3d0", text: "#059669", btn: "#059669" },
  blue: { bg: "#eff6ff", border: "#bfdbfe", text: "#1471B3", btn: "#1471B3" },
  amber: { bg: "#fffbeb", border: "#fde68a", text: "#b45309", btn: "#b45309" },
};

const SECCION_ICONS: Record<string, string> = {
  CO: "🎧",
  CE: "📖",
  PE: "✍️",
  PO: "🗣️",
};

function NivelCard({ nivel }: { nivel: Nivel }) {
  const cfg = CONFIG_NIVELES[nivel];
  if (!cfg) return null;

  const ej1 = examenDisponible(nivel, 1);
  const ej2 = examenDisponible(nivel, 2);
  const disponible = ej1 || ej2;
  const audio1 = ej1 && tieneAudio(nivel, 1);
  const audio2 = ej2 && tieneAudio(nivel, 2);
  const colors = BADGE_COLORS[cfg.colorClase] ?? BADGE_COLORS.blue;

  const isLegacy = nivel === "A1";
  const getLegacyHref = (n: string) => `/examen-delf-${n.toLowerCase()}`;

  return (
    <div
      style={{
        position: "relative",
        background: "#FFFFFF",
        border: `1px solid ${disponible ? "#E2E8F0" : "#F1F5F9"}`,
        borderRadius: "0.75rem",
        padding: "1.5rem",
        opacity: disponible ? 1 : 0.5,
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                fontFamily: "monospace",
                padding: "0.2rem 0.5rem",
                borderRadius: "0.25rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                background: colors.bg,
                border: `1px solid ${colors.border}`,
                color: colors.text,
              }}
            >
              {cfg.diploma}
            </span>
            <span style={{ fontSize: "0.75rem", color: "#5f6b78", fontFamily: "monospace" }}>
              {cfg.duracionTotalMinutos} min
            </span>
          </div>
          <h3 style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-0.02em", color: "#1a1a2e" }}>
            {nivel}
          </h3>
          <p style={{ fontSize: "0.85rem", color: "#5f6b78" }}>{cfg.descripcion}</p>
          <p style={{ fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.15rem" }}>{cfg.descripcionEs}</p>
        </div>
        {!disponible && (
          <span
            style={{
              fontSize: "0.7rem",
              fontFamily: "monospace",
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
              padding: "0.25rem 0.5rem",
              borderRadius: "0.25rem",
              color: "#5f6b78",
            }}
          >
            Próximamente
          </span>
        )}
      </div>

      {/* Sections grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0.4rem",
          marginBottom: "1.25rem",
        }}
      >
        {cfg.secciones.map((s) => (
          <div
            key={s.codigo}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "#F8FAFC",
              borderRadius: "0.35rem",
              padding: "0.4rem 0.6rem",
            }}
          >
            <span style={{ fontSize: "0.85rem" }}>{SECCION_ICONS[s.codigo]}</span>
            <div>
              <div style={{ fontSize: "0.7rem", fontWeight: 500, color: "#374151", lineHeight: 1 }}>
                {s.codigo}
              </div>
              <div style={{ fontSize: "0.65rem", color: "#9ca3af", lineHeight: 1, marginTop: "0.15rem" }}>
                {s.duracion} min
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      {disponible ? (
        <div style={{ display: "flex", gap: "0.5rem" }}>
          {[1, 2].map((n) => {
            const tiene = n === 1 ? ej1 : ej2;
            const audio = n === 1 ? audio1 : audio2;

            if (!tiene) {
              return (
                <div
                  key={n}
                  style={{
                    flex: 1,
                    padding: "0.5rem 0.75rem",
                    borderRadius: "0.35rem",
                    textAlign: "center",
                    fontSize: "0.8rem",
                    color: "#9ca3af",
                    background: "#F8FAFC",
                    border: "1px solid #E2E8F0",
                    cursor: "not-allowed",
                  }}
                >
                  Exemple {n}
                </div>
              );
            }

            const href = isLegacy
              ? getLegacyHref(nivel)
              : `/examenes/${nivel.toLowerCase()}/${n}`;

            return (
              <Link
                key={n}
                href={href}
                style={{
                  flex: 1,
                  padding: "0.5rem 0.75rem",
                  borderRadius: "0.35rem",
                  textAlign: "center",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  background: colors.btn,
                  color: "#fff",
                  textDecoration: "none",
                  transition: "opacity 0.2s",
                }}
              >
                Exemple {n}
                {audio && " 🎧"}
              </Link>
            );
          })}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "0.5rem",
            fontSize: "0.75rem",
            color: "#9ca3af",
            fontFamily: "monospace",
          }}
        >
          — En préparation —
        </div>
      )}
    </div>
  );
}

export default function ExamenesHub() {
  const nivelesDelf: Nivel[] = ["A1", "A2", "B1", "B2"];
  const nivelesDalf: Nivel[] = ["C1", "C2"];

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1rem" }}>
      {/* Hero */}
      <section
        style={{
          position: "relative",
          borderBottom: "1px solid #E2E8F0",
          overflow: "hidden",
          padding: "4rem 0 3rem",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "33%",
            width: 384,
            height: 384,
            background: "rgba(20,113,179,0.04)",
            borderRadius: "50%",
            filter: "blur(48px)",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#F8FAFC",
              border: "1px solid #E2E8F0",
              borderRadius: 999,
              padding: "0.35rem 1rem",
              marginBottom: "1.5rem",
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#1471B3",
              }}
            />
            <span
              style={{
                fontSize: "0.7rem",
                fontFamily: "monospace",
                color: "#5f6b78",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              France Éducation International
            </span>
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: "1rem",
              color: "#1a1a2e",
            }}
          >
            Examens officiels{" "}
            <span style={{ color: "#1471B3" }}>DELF / DALF</span>
          </h1>

          <p
            style={{
              color: "#5f6b78",
              fontSize: "1.05rem",
              maxWidth: 600,
              lineHeight: 1.6,
            }}
          >
            Entraîne-toi avec les sujets démo officiels. Questions interactives,
            correction automatique, chronomètre intégré — exactement comme le jour J.
          </p>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              marginTop: "2rem",
              fontSize: "0.85rem",
              color: "#5f6b78",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <span style={{ color: "#059669" }}>●</span> DELF A1–B2 · 4 compétences
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <span style={{ color: "#b45309" }}>●</span> DALF C1–C2 · Niveau expert
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
              <span style={{ color: "#1471B3" }}>●</span> Audios officiels inclus
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: "3rem 0" }}>
        {/* DELF */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1a1a2e" }}>
              DELF{" "}
              <span style={{ color: "#5f6b78", fontWeight: 400, fontSize: "1rem" }}>
                — Diplôme d&apos;études en langue française
              </span>
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#5f6b78", marginTop: "0.25rem" }}>
              Niveaux A1 à B2 · Certification indépendante et permanente
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1rem",
            }}
          >
            {nivelesDelf.map((n) => (
              <NivelCard key={n} nivel={n} />
            ))}
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid #E2E8F0", marginBottom: "3rem" }} />

        {/* DALF */}
        <div style={{ marginBottom: "3rem" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#1a1a2e" }}>
              DALF{" "}
              <span style={{ color: "#5f6b78", fontWeight: 400, fontSize: "1rem" }}>
                — Diplôme approfondi de langue française
              </span>
            </h2>
            <p style={{ fontSize: "0.85rem", color: "#5f6b78", marginTop: "0.25rem" }}>
              Niveaux C1 et C2 · Maîtrise avancée
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1rem",
              maxWidth: 520,
            }}
          >
            {nivelesDalf.map((n) => (
              <NivelCard key={n} nivel={n} />
            ))}
          </div>
        </div>

        {/* Info note */}
        <div
          style={{
            background: "#F8FAFC",
            border: "1px solid #E2E8F0",
            borderRadius: "0.5rem",
            padding: "1.25rem 1.5rem",
            fontSize: "0.85rem",
            color: "#5f6b78",
            lineHeight: 1.6,
          }}
        >
          <p style={{ fontWeight: 600, color: "#374151", marginBottom: "0.5rem" }}>
            Sobre los sujets démo
          </p>
          <p style={{ margin: 0 }}>
            Los exámenes interactivos están basados en los sujetos démo oficiales de{" "}
            <em>France Éducation International</em>. Los niveles marcados como
            «Próximamente» están en proceso de transcripción. Los audios oficiales se
            sirven directamente desde los archivos MP3 originales.
          </p>
        </div>
      </section>
    </div>
  );
}
