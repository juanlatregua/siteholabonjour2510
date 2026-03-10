import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getProfile(slug: string) {
  return prisma.preparateurProfile.findFirst({
    where: { slug, status: "ACTIVE" },
    include: {
      user: { select: { id: true, name: true, email: true } },
      reviews: { orderBy: { createdAt: "desc" } },
    },
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const profile = await getProfile(slug);
  if (!profile) return { title: "Préparateur no encontrado" };

  return {
    title: `${profile.displayName} — Préparatrice DELF/DALF · HolaBonjour`,
    description: profile.bio,
    alternates: { canonical: `/preparateurs/${slug}` },
    openGraph: {
      title: `${profile.displayName} — Préparatrice DELF/DALF`,
      description: profile.bio,
      url: `https://holabonjour.es/preparateurs/${slug}`,
      siteName: "HolaBonjour",
      locale: "es_ES",
      type: "profile",
    },
  };
}

export default async function PreparateurPage({ params }: Props) {
  const { slug } = await params;
  const profile = await getProfile(slug);
  if (!profile) notFound();

  const avgRating = profile.avgRating ?? (
    profile.reviews.length > 0
      ? profile.reviews.reduce((sum, r) => sum + r.rating, 0) / profile.reviews.length
      : null
  );

  const hourlyEur = (profile.hourlyRate / 100).toFixed(0);

  return (
    <div style={{ background: "#faf7f2", color: "#1e2d4a", minHeight: "100vh" }}>
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "3rem 1.5rem" }}>

        {/* Hero */}
        <div style={{
          display: "flex", gap: "1.5rem", alignItems: "flex-start",
          marginBottom: "2rem",
        }}>
          {profile.photo ? (
            <img
              src={profile.photo} alt={profile.displayName}
              style={{ width: 100, height: 100, borderRadius: "50%", objectFit: "cover", flexShrink: 0 }}
            />
          ) : (
            <div style={{
              width: 100, height: 100, borderRadius: "50%", flexShrink: 0,
              background: "linear-gradient(135deg, #E50046, #6B3FA0)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "2rem", fontWeight: 800, color: "white",
            }}>
              {profile.displayName.charAt(0)}
            </div>
          )}
          <div>
            <h1 style={{ fontSize: "1.75rem", fontWeight: 800, fontFamily: "var(--font-display)", margin: 0 }}>
              {profile.displayName}
            </h1>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
              {profile.certificationVerified && (
                <span style={{
                  fontSize: "0.75rem", padding: "0.2rem 0.65rem",
                  background: "rgba(14,159,110,0.15)", color: "#10b981",
                  borderRadius: "1rem", fontWeight: 600,
                }}>
                  Verificada FEI
                </span>
              )}
              {avgRating !== null && (
                <span style={{
                  fontSize: "0.75rem", padding: "0.2rem 0.65rem",
                  background: "rgba(245,158,11,0.15)", color: "#f59e0b",
                  borderRadius: "1rem", fontWeight: 600,
                }}>
                  {avgRating.toFixed(1)} / 5
                </span>
              )}
              <span style={{
                fontSize: "0.75rem", padding: "0.2rem 0.65rem",
                background: "rgba(57,93,159,0.08)", color: "#395D9F",
                borderRadius: "1rem", fontWeight: 600,
              }}>
                {hourlyEur} €/h
              </span>
            </div>
            <p style={{ fontSize: "0.95rem", color: "#3d4a5c", marginTop: "0.75rem", lineHeight: 1.6 }}>
              {profile.bio}
            </p>
          </div>
        </div>

        {/* Info cards grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
          {/* Niveles */}
          <div style={{
            background: "#ffffff", border: "1px solid rgba(30,45,74,0.08)",
            borderRadius: "0.875rem", padding: "1.25rem",
          }}>
            <p style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", color: "#5f6b78", marginBottom: "0.5rem" }}>Niveles</p>
            <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
              {profile.levels.map((l) => (
                <span key={l} style={{
                  padding: "0.25rem 0.65rem", borderRadius: "0.5rem",
                  background: "rgba(229,0,70,0.12)", color: "#E50046",
                  fontSize: "0.8rem", fontWeight: 700,
                }}>
                  {l}
                </span>
              ))}
            </div>
          </div>

          {/* Idiomas */}
          <div style={{
            background: "#ffffff", border: "1px solid rgba(30,45,74,0.08)",
            borderRadius: "0.875rem", padding: "1.25rem",
          }}>
            <p style={{ fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase", color: "#5f6b78", marginBottom: "0.5rem" }}>Idiomas</p>
            <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap" }}>
              {profile.languages.map((lang) => (
                <span key={lang} style={{
                  padding: "0.25rem 0.65rem", borderRadius: "0.5rem",
                  background: "rgba(57,93,159,0.08)",
                  fontSize: "0.8rem", fontWeight: 600, color: "#395D9F",
                }}>
                  {lang === "es" ? "Español" : lang === "fr" ? "Français" : lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Especialidades */}
        {profile.specialties.length > 0 && (
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem" }}>Especialidades</h2>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {profile.specialties.map((s) => (
                <span key={s} style={{
                  padding: "0.3rem 0.8rem", borderRadius: "1.5rem",
                  background: "rgba(107,63,160,0.08)", color: "#6B3FA0",
                  fontSize: "0.8rem", fontWeight: 600,
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Valoraciones */}
        {profile.reviews.length > 0 && (
          <div style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem" }}>
              Valoraciones ({profile.reviews.length})
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {profile.reviews.map((r) => (
                <div key={r.id} style={{
                  background: "#ffffff", border: "1px solid rgba(30,45,74,0.08)",
                  borderRadius: "0.875rem", padding: "1rem",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
                    <span style={{ color: "#f59e0b", fontWeight: 700, fontSize: "0.85rem" }}>
                      {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                    </span>
                    {r.source === "google" && (
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: "0.25rem",
                        fontSize: "0.65rem", padding: "0.1rem 0.4rem",
                        background: "rgba(57,93,159,0.08)", color: "#5f6b78",
                        borderRadius: "0.25rem", fontWeight: 600,
                      }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.97 10.97 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                        Google
                      </span>
                    )}
                    {r.source === "google" && r.studentId && !r.studentId.startsWith("google-review") && (
                      <span style={{ fontSize: "0.8rem", color: "#5f6b78", fontWeight: 500 }}>
                        — {r.studentId}
                      </span>
                    )}
                  </div>
                  {r.comment && (
                    <p style={{ fontSize: "0.85rem", color: "#3d4a5c", lineHeight: 1.5 }}>
                      {r.comment}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div style={{
          background: "rgba(229,0,70,0.08)", border: "1px solid rgba(229,0,70,0.2)",
          borderRadius: "1rem", padding: "1.5rem", textAlign: "center",
        }}>
          <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            Reserva tu clase con {profile.displayName.split(" ")[0]}
          </h2>
          <p style={{ fontSize: "0.85rem", color: "#5f6b78", marginBottom: "1rem" }}>
            Pack de 4 clases individuales por Zoom · Desde {hourlyEur} €/h
          </p>
          <Link
            href={`/contratar?preparateur=${profile.slug}`}
            style={{
              display: "inline-block", padding: "0.7rem 2rem", borderRadius: "0.75rem",
              background: "#E50046", color: "white", fontWeight: 700, fontSize: "0.95rem",
              textDecoration: "none", transition: "all 0.15s",
            }}
          >
            Reservar clase
          </Link>
        </div>
      </div>
    </div>
  );
}
