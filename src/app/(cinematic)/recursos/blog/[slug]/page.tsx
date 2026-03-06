import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import { blogPosts } from "@/data/blog-posts";
import GlassCard from "@/components/cinematic/GlassCard";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GoldButton from "@/components/cinematic/GoldButton";
import Particles from "@/components/cinematic/Particles";
import MorphBlob from "@/components/cinematic/MorphBlob";

/* ------------------------------------------------------------------ */
/*  TYPES                                                              */
/* ------------------------------------------------------------------ */

type Props = { params: Promise<{ slug: string }> };

/* ------------------------------------------------------------------ */
/*  STATIC GENERATION                                                  */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

/* ------------------------------------------------------------------ */
/*  SEO — dynamic metadata                                             */
/* ------------------------------------------------------------------ */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Artículo no encontrado | HolaBonjour" };
  }

  return {
    title: `${post.title} | Blog HolaBonjour`,
    description: post.description,
    alternates: { canonical: `/recursos/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | Blog HolaBonjour`,
      description: post.description,
      url: `https://holabonjour.es/recursos/blog/${post.slug}`,
      siteName: "HolaBonjour",
      locale: "es_ES",
      type: "article",
    },
  };
}

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
/*  PROSE STYLES                                                       */
/* ------------------------------------------------------------------ */

const proseStyles = `
  .prose-content p {
    color: #3d4a5c;
    line-height: 1.8;
    margin-bottom: 1.25rem;
    font-size: 1.05rem;
  }
  .prose-content ul,
  .prose-content ol {
    color: #3d4a5c;
    margin-bottom: 1.25rem;
    padding-left: 1.5rem;
    line-height: 1.8;
  }
  .prose-content li {
    margin-bottom: 0.5rem;
  }
  .prose-content strong {
    color: #E50046;
    font-weight: 600;
  }
  .prose-content em {
    color: #1e2d4a;
    font-style: italic;
  }
  .prose-content a {
    color: #E50046;
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color 0.2s ease;
  }
  .prose-content a:hover {
    color: #E50046;
  }
  .prose-content blockquote {
    border-left: 4px solid #E50046;
    padding: 1rem 1.25rem;
    margin: 1.5rem 0;
    background: rgba(229,0,70,0.04);
    border-radius: 0 12px 12px 0;
    color: #6b7280;
    font-style: italic;
  }
  .prose-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
  }
  .prose-content th {
    text-align: left;
    padding: 0.75rem 1rem;
    border-bottom: 2px solid rgba(229,0,70,0.4);
    color: #E50046;
    font-weight: 600;
    font-size: 0.9rem;
  }
  .prose-content td {
    padding: 0.65rem 1rem;
    border-bottom: 1px solid rgba(30,45,74,0.08);
    color: #3d4a5c;
    font-size: 0.95rem;
  }
  .prose-content h3 {
    color: #E50046;
    font-family: var(--font-display);
    font-size: 1.35rem;
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
  }
  .prose-content h4 {
    color: #1e2d4a;
    font-weight: 600;
    font-size: 1.1rem;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }
  .prose-content code {
    background: rgba(30,45,74,0.06);
    padding: 0.15rem 0.4rem;
    border-radius: 4px;
    font-size: 0.9em;
    color: #E50046;
  }
  .prose-content pre {
    background: rgba(30,45,74,0.04);
    padding: 1rem 1.25rem;
    border-radius: 12px;
    overflow-x: auto;
    margin: 1.25rem 0;
  }
  .prose-content pre code {
    background: none;
    padding: 0;
  }
`;

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  /* Related articles — up to 3, same category first */
  const related = blogPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      if (a.category === post.category && b.category !== post.category)
        return -1;
      if (b.category === post.category && a.category !== post.category)
        return 1;
      return 0;
    })
    .slice(0, 3);

  /* JSON-LD Article Schema */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Organization",
      name: "HolaBonjour",
    },
    publisher: {
      "@type": "Organization",
      name: "HolaBonjour",
      url: "https://holabonjour.es",
    },
    datePublished: post.publishedAt,
    inLanguage: "es",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://holabonjour.es/recursos/blog/${post.slug}`,
    },
  };

  return (
    <div>
      {/* Prose styles */}
      <style dangerouslySetInnerHTML={{ __html: proseStyles }} />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ============================================================ */}
      {/* HERO                                                         */}
      {/* ============================================================ */}
      <section
        className="relative overflow-hidden flex items-center justify-center min-h-[60vh] px-6"
        style={{
          background: "#faf7f2",
          color: "var(--cin-text)",
        }}
      >
        <Particles count={40} color="#E50046" />
        <MorphBlob
          size={400}
          color="#E50046"
          position={{ top: "-10%", left: "-5%" }}
        />
        <MorphBlob
          size={300}
          color="#3b82f6"
          position={{ bottom: "-10%", right: "-5%" }}
        />

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          {/* Breadcrumbs */}
          <nav
            className="mb-8 text-sm"
            style={{ color: "#6b7280" }}
            aria-label="Breadcrumb"
          >
            <ol className="flex items-center justify-center gap-2 flex-wrap">
              <li>
                <Link
                  href="/"
                  className="hover:underline"
                  style={{ color: "#6b7280" }}
                >
                  HolaBonjour
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/recursos"
                  className="hover:underline"
                  style={{ color: "#6b7280" }}
                >
                  Recursos
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/recursos/blog"
                  className="hover:underline"
                  style={{ color: "#6b7280" }}
                >
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li style={{ color: "#3d4a5c" }}>
                {post.title}
              </li>
            </ol>
          </nav>

          {/* Hero emoji */}
          <div className="text-5xl mb-6">{post.heroEmoji}</div>

          {/* Badges row */}
          <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
            {/* Category badge */}
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(229,0,70,0.15)",
                color: "#E50046",
                border: "1px solid rgba(229,0,70,0.3)",
              }}
            >
              {post.categoryLabel}
            </span>

            {/* Level badge */}
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                background: "rgba(57,93,159,0.08)",
                color: "#395D9F",
                border: "1px solid rgba(57,93,159,0.2)",
              }}
            >
              {post.level}
            </span>

            {/* Reading time */}
            <span
              className="text-xs"
              style={{ color: "#6b7280" }}
            >
              {post.readingMinutes} min de lectura
            </span>

            {/* Date */}
            <span
              className="text-xs"
              style={{ color: "#6b7280" }}
            >
              {formatDate(post.publishedAt)}
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--cin-accent)",
            }}
          >
            {post.title}
          </h1>

          {/* Description */}
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#3d4a5c" }}
          >
            {post.description}
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* ARTICLE BODY                                                 */}
      {/* ============================================================ */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-3xl">
          {post.sections.map((section, idx) => (
            <div key={idx} className="mb-14">
              <h2
                className="text-2xl md:text-3xl font-bold mb-6"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--cin-accent)",
                }}
              >
                {section.heading}
              </h2>
              <div
                className="prose-content"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            </div>
          ))}
        </div>
      </CinematicSection>

      {/* ============================================================ */}
      {/* RELATED ARTICLES                                             */}
      {/* ============================================================ */}
      {related.length > 0 && (
        <CinematicSection className="py-20 px-6">
          <div className="mx-auto max-w-5xl">
            <h2
              className="text-3xl md:text-4xl font-bold text-center mb-14"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--cin-accent)",
              }}
            >
              Más artículos
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((relPost) => (
                <Link
                  key={relPost.slug}
                  href={`/recursos/blog/${relPost.slug}`}
                  style={{ textDecoration: "none" }}
                >
                  <GlassCard>
                    <div className="text-3xl mb-4">{relPost.heroEmoji}</div>
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{
                          background: "rgba(229,0,70,0.15)",
                          color: "#E50046",
                          border: "1px solid rgba(229,0,70,0.3)",
                        }}
                      >
                        {relPost.categoryLabel}
                      </span>
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold"
                        style={{
                          background: "rgba(57,93,159,0.08)",
                          color: "#395D9F",
                          border: "1px solid rgba(57,93,159,0.2)",
                        }}
                      >
                        {relPost.level}
                      </span>
                    </div>
                    <h3
                      className="text-lg font-bold mb-2"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--cin-accent)",
                      }}
                    >
                      {relPost.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: "#6b7280" }}
                    >
                      {relPost.description.length > 120
                        ? relPost.description.slice(0, 120) + "..."
                        : relPost.description}
                    </p>
                    <p
                      className="text-xs mt-3"
                      style={{ color: "#9ca3af" }}
                    >
                      {relPost.readingMinutes} min &middot;{" "}
                      {formatDate(relPost.publishedAt)}
                    </p>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </div>
        </CinematicSection>
      )}

      {/* ============================================================ */}
      {/* CTA                                                          */}
      {/* ============================================================ */}
      <CinematicSection className="py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <GlassCard hover={false}>
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--cin-accent)",
              }}
            >
              &iquest;Quieres mejorar tu franc&eacute;s?
            </h2>
            <p
              className="text-base mb-8 leading-relaxed max-w-xl mx-auto"
              style={{ color: "#6b7280" }}
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
