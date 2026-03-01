import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import HeroAnimations from "@/components/cinematic/HeroAnimations";
import GlassCard from "@/components/cinematic/GlassCard";
import PassportStamp from "@/components/cinematic/PassportStamp";
import GoldButton from "@/components/cinematic/GoldButton";
import CinematicSection from "@/components/cinematic/CinematicSection";
import SceneGradient from "@/components/cinematic/SceneGradient";
import { team } from "@/data/team";

export const metadata: Metadata = {
  title: "Aprende francés online | HolaBonjour",
  description:
    "Academia online de francés: clases en directo con profesores nativos, preparación DELF/DALF, y método inmersivo. Descubre tu nivel con nuestro test gratuito.",
};

/* ─── Data ─── */

const valueProps = [
  {
    title: "Examens officiels DELF/DALF",
    description:
      "Preparación específica para cada nivel del examen oficial con simulaciones y seguimiento docente.",
  },
  {
    title: "Apprentissage immersif",
    description:
      "Le Côté Vie: aprende francés a través del cine, la gastronomía, los juegos y la cultura.",
  },
  {
    title: "Cours en direct",
    description:
      "Sesiones online con profesores nativos franceses. Grupos reducidos o clases particulares.",
  },
];

const courseTypes = [
  {
    emoji: "\uD83C\uDF93",
    title: "Préparation DELF/DALF",
    description: "Todos los niveles, de A1 a C2",
    href: "/cursos/preparacion-delf-dalf",
  },
  {
    emoji: "\uD83D\uDCAC",
    title: "Conversation",
    description: "Practica con profesores nativos",
    href: "/cursos/conversacion",
  },
  {
    emoji: "\uD83D\uDCBC",
    title: "Français pour entreprises",
    description: "Programas corporativos a medida",
    href: "/cursos/frances-empresas",
  },
  {
    emoji: "\u26A1",
    title: "Intensifs",
    description: "Programas intensivos para avanzar rápido",
    href: "/cursos/intensivos",
  },
  {
    emoji: "\uD83C\uDFAF",
    title: "Cours particuliers",
    description: "Sesiones individuales adaptadas",
    href: "/cursos/clases-particulares",
  },
];

const testimonials = [
  {
    quote:
      "La prueba me dio un nivel realista y supe exactamente qué preparar para presentarme al DELF B1.",
    author: "Elena M.",
  },
  {
    quote:
      "Me gustó que todo fuese online y con pasos claros. Pasé de dudas a plan de estudio en el mismo día.",
    author: "Carlos R.",
  },
  {
    quote:
      "El enfoque en exámenes oficiales y simulacros con tiempo real marca la diferencia.",
    author: "Laura P.",
  },
];

const coteVieItems = [
  {
    title: "Le Marché",
    description: "Vocabulario práctico del mercado y la vida cotidiana.",
    href: "/le-marche",
    accent: "#f0a500",
  },
  {
    title: "La Carte",
    description: "Explora la geografía y cultura de Francia.",
    href: "/la-carte",
    accent: "#6ec6ca",
  },
  {
    title: "Le Cinéma",
    description: "Aprende francés a través del cine francófono.",
    href: "/le-cinema",
    accent: "#c77dba",
  },
  {
    title: "La Cuisine",
    description: "Recetas y vocabulario gastronómico francés.",
    href: "/la-cuisine",
    accent: "#6ec6ca",
  },
  {
    title: "Le Mot du Jour",
    description: "Una palabra nueva cada día para ampliar tu vocabulario.",
    href: "/le-mot-du-jour",
    accent: "#e8b865",
  },
  {
    title: "Le Jeu",
    description: "Juegos interactivos para practicar jugando.",
    href: "/le-jeu",
    accent: "#f0a500",
  },
];

/* Team avatar color palette */
const teamColors = ["#e8b865", "#6ec6ca", "#c77dba", "#f0a500"];

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

/* ─── Page ─── */

const CinematicHomePage = () => {
  return (
    <div
      style={{
        background: "#1a1a2e",
        color: "#f1f5f9",
        minHeight: "100vh",
      }}
    >
      {/* ── Section 1: Hero ── */}
      <section>
        <HeroAnimations />
      </section>

      {/* ── Section 2: Value Props ── */}
      <CinematicSection>
        <div
          style={{
            maxWidth: "1100px",
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
              color: "#f1f5f9",
            }}
          >
            Pourquoi choisir <span style={{ color: "#e8b865" }}>HolaBonjour</span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {valueProps.map((prop) => (
              <GlassCard key={prop.title}>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "#e8b865",
                    marginBottom: "0.75rem",
                  }}
                >
                  {prop.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    color: "rgba(241, 245, 249, 0.8)",
                    margin: 0,
                  }}
                >
                  {prop.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* ── Section 3: Le Voyage Teaser ── */}
      <CinematicSection>
        <div
          style={{
            maxWidth: "720px",
            margin: "0 auto",
            padding: "4rem 1rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              position: "relative",
              background: "rgba(20, 24, 37, 0.8)",
              border: "1px solid rgba(232, 184, 101, 0.3)",
              borderRadius: "1.2rem",
              padding: "3rem 2rem",
              backdropFilter: "blur(12px)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "1.5rem",
                right: "1.5rem",
                opacity: 0.6,
              }}
            >
              <PassportStamp level="B1" animated={false} />
            </div>

            <p
              style={{
                fontSize: "0.8rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#e8b865",
                marginBottom: "0.5rem",
              }}
            >
              Test de nivel
            </p>

            <h2
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                fontWeight: 700,
                color: "#f1f5f9",
                marginBottom: "1rem",
              }}
            >
              Le Voyage
            </h2>

            <p
              style={{
                fontSize: "1.05rem",
                lineHeight: 1.6,
                color: "rgba(241, 245, 249, 0.75)",
                marginBottom: "2rem",
                maxWidth: "480px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Descubre tu nivel de francés con nuestro test inmersivo
            </p>

            <GoldButton href="/test-de-nivel">Empezar el viaje</GoldButton>
          </div>
        </div>
      </CinematicSection>

      {/* ── Section 4: Course Overview ── */}
      <CinematicSection>
        <div
          style={{
            maxWidth: "1100px",
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
              color: "#f1f5f9",
            }}
          >
            Nos <span style={{ color: "#e8b865", fontStyle: "italic" }}>formations</span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {courseTypes.map((course) => (
              <Link
                key={course.title}
                href={course.href}
                style={{ textDecoration: "none" }}
              >
                <GlassCard>
                  <div
                    style={{
                      fontSize: "1.8rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {course.emoji}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1.15rem",
                      fontWeight: 700,
                      color: "#e8b865",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {course.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.9rem",
                      lineHeight: 1.5,
                      color: "rgba(241, 245, 249, 0.7)",
                      margin: 0,
                    }}
                  >
                    {course.description}
                  </p>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* ── Section 5: Testimonials ── */}
      <CinematicSection>
        <div
          style={{
            maxWidth: "1100px",
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
              color: "#f1f5f9",
            }}
          >
            Ce qu&apos;ils disent{" "}
            <span style={{ color: "#e8b865" }}>de nous</span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {testimonials.map((testimonial) => (
              <GlassCard key={testimonial.author}>
                <div
                  style={{
                    color: "#e8b865",
                    fontSize: "1.1rem",
                    letterSpacing: "0.1em",
                    marginBottom: "0.75rem",
                  }}
                >
                  {"\u2605\u2605\u2605\u2605\u2605"}
                </div>
                <blockquote
                  style={{
                    margin: 0,
                    padding: 0,
                    fontSize: "1rem",
                    lineHeight: 1.65,
                    color: "rgba(241, 245, 249, 0.85)",
                    fontStyle: "italic",
                    marginBottom: "1.25rem",
                  }}
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <p
                  style={{
                    margin: 0,
                    fontSize: "0.88rem",
                    fontWeight: 600,
                    color: "#e8b865",
                  }}
                >
                  &mdash; {testimonial.author}
                </p>
              </GlassCard>
            ))}
          </div>

          {/* Google Reviews badge */}
          <p
            style={{
              textAlign: "center",
              marginTop: "2rem",
              fontSize: "0.95rem",
              color: "rgba(241, 245, 249, 0.6)",
            }}
          >
            <span style={{ color: "#e8b865" }}>{"\u2605"}</span> 4.5/5 &middot;
            Google Reviews
          </p>
        </div>
      </CinematicSection>

      {/* ── Section 6: Votre équipe ── */}
      <CinematicSection>
        <div
          style={{
            maxWidth: "900px",
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
              color: "#f1f5f9",
            }}
          >
            Votre <span style={{ color: "#e8b865" }}>équipe</span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {team.map((member, idx) => (
              <GlassCard key={member.name}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  {/* Circular avatar with initials */}
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      background: teamColors[idx % teamColors.length],
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "1.1rem",
                      color: "#1a1a2e",
                      flexShrink: 0,
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    {getInitials(member.name)}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        color: "#f1f5f9",
                        marginBottom: "0.15rem",
                      }}
                    >
                      {member.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "#e8b865",
                        margin: 0,
                        fontWeight: 600,
                      }}
                    >
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Credentials badges */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.4rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  {member.credentials.map((cred) => (
                    <span
                      key={cred}
                      style={{
                        fontSize: "0.72rem",
                        fontWeight: 600,
                        padding: "0.2rem 0.6rem",
                        borderRadius: "999px",
                        background: "rgba(232, 184, 101, 0.12)",
                        border: "1px solid rgba(232, 184, 101, 0.25)",
                        color: "#e8b865",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {cred}
                    </span>
                  ))}
                </div>

                {/* Bio */}
                <p
                  style={{
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                    color: "rgba(241, 245, 249, 0.75)",
                    margin: 0,
                  }}
                >
                  {member.bio}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </CinematicSection>

      {/* ── Section 7: Le Côté Vie Preview ── */}
      <CinematicSection>
        <div
          style={{
            maxWidth: "1100px",
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
              marginBottom: "0.75rem",
              color: "#f1f5f9",
            }}
          >
            Apprendre le fran&ccedil;ais, c&apos;est{" "}
            <span style={{ color: "#e8b865" }}>vivre la France</span>
          </h2>
          <p
            style={{
              textAlign: "center",
              fontSize: "1.05rem",
              color: "rgba(241, 245, 249, 0.7)",
              marginBottom: "3rem",
              maxWidth: "560px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Vive el francés más allá de las clases. Cultura, cine, gastronomía y
            juegos.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "1rem",
            }}
          >
            {coteVieItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    position: "relative",
                    background: "rgba(30, 28, 24, 0.6)",
                    border: `1px solid ${item.accent}33`,
                    borderRadius: "0.9rem",
                    padding: "1.5rem 1.2rem",
                    backdropFilter: "blur(8px)",
                    transition:
                      "border-color 0.2s ease, transform 0.2s ease",
                    cursor: "pointer",
                  }}
                >
                  {/* Gratuit badge */}
                  <span
                    style={{
                      position: "absolute",
                      top: "0.75rem",
                      right: "0.75rem",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "999px",
                      background: `${item.accent}22`,
                      border: `1px solid ${item.accent}44`,
                      color: item.accent,
                    }}
                  >
                    Gratuit
                  </span>

                  <h3
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: item.accent,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      lineHeight: 1.5,
                      color: "rgba(241, 245, 249, 0.65)",
                      margin: 0,
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* CTA below grid */}
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <GoldButton href="/le-marche" variant="outline">
              Explorer l&apos;&eacute;cosyst&egrave;me &rarr;
            </GoldButton>
          </div>
        </div>
      </CinematicSection>

      {/* ── Section 8: Final CTA ── */}
      <CinematicSection>
        <SceneGradient />
        <div
          style={{
            maxWidth: "720px",
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
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              fontWeight: 700,
              marginBottom: "1rem",
              color: "#f1f5f9",
            }}
          >
            Pr&ecirc;t &agrave; commencer{" "}
            <span style={{ color: "#e8b865" }}>?</span>
          </h2>
          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.6,
              color: "rgba(241, 245, 249, 0.75)",
              marginBottom: "2.5rem",
              maxWidth: "520px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Reserva tu clase de prueba, escríbenos por WhatsApp o envíanos un
            email.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <GoldButton href="/test-de-nivel">
                Faire le test de niveau &rarr;
              </GoldButton>
              <a
                href="https://wa.me/34685070304"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "12px 28px",
                  borderRadius: 12,
                  background: "rgba(37, 211, 102, 0.15)",
                  border: "2px solid rgba(37, 211, 102, 0.5)",
                  color: "#25d366",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  transition: "background 0.25s ease",
                  fontFamily: "var(--font-heading)",
                  letterSpacing: "0.01em",
                  cursor: "pointer",
                }}
              >
                Classe d&apos;essai gratuite
              </a>
            </div>

            <p
              style={{
                fontSize: "0.9rem",
                color: "rgba(241, 245, 249, 0.6)",
                marginTop: "0.5rem",
              }}
            >
              Email:{" "}
              <a
                href="mailto:info@holabonjour.es"
                style={{ color: "#e8b865", textDecoration: "none" }}
              >
                info@holabonjour.es
              </a>
            </p>
          </div>
        </div>
      </CinematicSection>
    </div>
  );
};

export default CinematicHomePage;
