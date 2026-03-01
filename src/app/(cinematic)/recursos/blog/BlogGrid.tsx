"use client";

import { useState } from "react";
import Link from "next/link";
import type { BlogPost } from "@/data/blog-posts";
import GlassCard from "@/components/cinematic/GlassCard";
import CinematicSection from "@/components/cinematic/CinematicSection";

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
/*  CATEGORIES                                                         */
/* ------------------------------------------------------------------ */

const categories = [
  { key: "all", icon: "\u{1F4DA}", label: "Todos" },
  { key: "delf-dalf", icon: "\u{1F393}", label: "DELF/DALF" },
  { key: "gramatica", icon: "\u270F\uFE0F", label: "Gramática" },
  { key: "expresiones", icon: "\u{1F4AC}", label: "Expresiones" },
  { key: "cultura", icon: "\u{1F1EB}\u{1F1F7}", label: "Cultura" },
];

/* ------------------------------------------------------------------ */
/*  COMPONENT                                                          */
/* ------------------------------------------------------------------ */

interface BlogGridProps {
  blogPosts: BlogPost[];
}

export default function BlogGrid({ blogPosts }: BlogGridProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <>
      {/* Category badges */}
      <CinematicSection className="pt-14 pb-4 px-6">
        <div className="mx-auto max-w-5xl flex items-center justify-center gap-3 flex-wrap">
          {categories.map((cat) => {
            const isActive = cat.key === activeCategory;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer"
                style={{
                  background: isActive
                    ? "rgba(232,184,101,0.2)"
                    : "rgba(255,255,255,0.06)",
                  color: isActive ? "#e8b865" : "rgba(255,255,255,0.6)",
                  border: isActive
                    ? "1px solid rgba(232,184,101,0.4)"
                    : "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {cat.icon} {cat.label}
              </button>
            );
          })}
        </div>
      </CinematicSection>

      {/* Article grid */}
      <CinematicSection className="py-14 px-6">
        <div className="mx-auto max-w-5xl grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.length === 0 ? (
            <p
              className="col-span-full text-center py-12 text-sm"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              No hay artículos en esta categoría todavía.
            </p>
          ) : (
            filtered.map((post) => (
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
            ))
          )}
        </div>
      </CinematicSection>
    </>
  );
}
