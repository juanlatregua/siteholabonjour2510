import type { Metadata } from "next";
import Link from "next/link";

import { blogPosts } from "@/data/blog-posts";
import GlassCard from "@/components/cinematic/GlassCard";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GoldButton from "@/components/cinematic/GoldButton";
import Particles from "@/components/cinematic/Particles";
import MorphBlob from "@/components/cinematic/MorphBlob";

export const metadata: Metadata = {
  title: "Blog de francés — Gramática, cultura y DELF — HolaBonjour",
  description:
    "Artículos sobre gramática francesa, expresiones, cultura, preparación DELF/DALF y vida en Francia. Contenido para todos los niveles.",
  alternates: { canonical: "/recursos/blog" },
  openGraph: {
    title: "Blog de francés — Gramática, cultura y DELF — HolaBonjour",
    description:
      "Artículos sobre gramática francesa, expresiones, cultura, preparación DELF/DALF y vida en Francia. Contenido para todos los niveles.",
    url: "https://holabonjour.es/recursos/blog",
    siteName: "HolaBonjour",
    locale: "es_ES",
    type: "website",
  },
};

/* ------------------------------------------------------------------ */
/*  HELPERS                                                            */
/* ------------------------------------------------------------------ */

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* ------------------------------------------------------------------ */
/*  CATEGORY FILTERS                                                   */
/* ------------------------------------------------------------------ */

const categories = [
  { key: "all", icon: "📚", label: "Todos" },
  { key: "delf-dalf", icon: "🎓", label: "DELF/DALF" },
  { key: "gramatica", icon: "✏️", label: "Gramática" },
  { key: "expresiones", icon: "💬", label: "Expresiones" },
  { key: "cultura", icon: "🇫🇷", label: "Cultura" },
];

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function BlogPage() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden flex items-center justify-center min-h-[60vh] px-6"
        style={{
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
          color: "var(--cin-text)",
        }}
      >
        <Particles count={40} color="#e8b865" />
        <MorphBlob
          size={400}
          color="#e8b865"
          position={{ top: "-10%", left: "-5%" }}
        />
        <MorphBlob
          size={300}
          color="#3b82f6"
          position={{ bottom: "-10%", right: "-5%" }}
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-gold)",
            }}
          >
            Notre blog
          </h1>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Artículos sobre gramática, cultura, exámenes y vida en Francia.
          </p>
        </div>
      </section>

      {/* Category badges */}
      <CinematicSection className="pt-14 pb-4 px-6">
        <div className="mx-auto max-w-5xl flex items-center justify-center gap-3 flex-wrap">
          {categories.map((cat) => (
            <span
              key={cat.key}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium"
              style={{
                background:
                  cat.key === "all"
                    ? "rgba(232,184,101,0.2)"
                    : "rgba(255,255,255,0.06)",
                color:
                  cat.key === "all" ? "#e8b865" : "rgba(255,255,255,0.6)",
                border:
                  cat.key === "all"
                    ? "1px solid rgba(232,184,101,0.4)"
                    : "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {cat.icon} {cat.label}
            </span>
          ))}
        </div>
      </CinematicSection>

      {/* Article grid */}
      <CinematicSection className="py-14 px-6">
        <div className="mx-auto max-w-5xl grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/recursos/blog/${post.slug}`}
              style={{ textDecoration: "none" }}
            >
              <GlassCard>
                <div className="text-3xl mb-4">{post.heroEmoji}</div>

                {/* Badges row */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
                    style={{
                      background: "rgba(232,184,101,0.15)",
                      color: "#e8b865",
                      border: "1px solid rgba(232,184,101,0.3)",
                    }}
                  >
                    {post.categoryLabel}
                  </span>
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold"
                    style={{
                      background: "rgba(59,130,246,0.15)",
                      color: "#93bbfc",
                      border: "1px solid rgba(59,130,246,0.3)",
                    }}
                  >
                    {post.level}
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="text-lg font-bold mb-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--cin-gold)",
                  }}
                >
                  {post.title}
                </h2>

                {/* Description */}
                <p
                  className="text-sm leading-relaxed mb-3"
                  style={{ color: "rgba(255,255,255,0.6)" }}
                >
                  {post.description.length > 120
                    ? post.description.slice(0, 120) + "..."
                    : post.description}
                </p>

                {/* Meta */}
                <p
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  {post.readingMinutes} min de lectura &middot;{" "}
                  {formatDate(post.publishedAt)}
                </p>
              </GlassCard>
            </Link>
          ))}
        </div>
      </CinematicSection>

      {/* CTA */}
      <CinematicSection className="py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <GlassCard hover={false}>
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--cin-gold)",
              }}
            >
              &iquest;Quieres mejorar tu franc&eacute;s?
            </h2>
            <p
              className="text-base mb-8 leading-relaxed max-w-xl mx-auto"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              Descubre tu nivel actual con nuestro test gratuito o ponte en
              contacto con nosotros para diseñar un plan de estudio
              personalizado.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <GoldButton href="/test-de-nivel">
                Haz el test de nivel
              </GoldButton>
              <GoldButton href="/contacto" variant="outline">
                Contáctanos
              </GoldButton>
            </div>
          </GlassCard>
        </div>
      </CinematicSection>
    </div>
  );
}
