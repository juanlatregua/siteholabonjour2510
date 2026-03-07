import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GlassCard, GoldButton, CinematicSection } from "@/components/cinematic";
import { getLevelData, VALID_LEVELS } from "@/lib/level-content";

interface PageProps {
  params: Promise<{ nivel: string }>;
}

export function generateStaticParams() {
  return VALID_LEVELS.map((nivel) => ({ nivel }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { nivel } = await params;
  const data = getLevelData(nivel);
  if (!data) return {};
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: `/preparacion-delf-dalf/${data.slug}` },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: `https://holabonjour.es/preparacion-delf-dalf/${data.slug}`,
      siteName: "HolaBonjour",
      locale: "es_ES",
      type: "website",
    },
  };
}

export default async function NivelPage({ params }: PageProps) {
  const { nivel } = await params;
  const data = getLevelData(nivel);
  if (!data) notFound();

  const hasSimulacros = data.simulacros.some((s) => s.href !== null);

  return (
    <div style={{ background: "var(--cin-bg)", color: "var(--cin-text)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: `Preparación ${data.frenchName} Online`,
            description: data.metaDescription,
            provider: {
              "@type": "EducationalOrganization",
              name: "HolaBonjour",
              url: "https://holabonjour.es",
            },
            educationalLevel: data.code,
            inLanguage: "fr",
            teaches: `Francés — Preparación ${data.frenchName}`,
            courseMode: "online",
          }),
        }}
      />

      {/* Hero */}
      <CinematicSection className="py-24 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <span
            className="inline-block text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-6"
            style={{
              background: data.badge === "DALF" ? "rgba(57,93,159,0.1)" : "rgba(229,0,70,0.1)",
              color: data.badge === "DALF" ? "#395D9F" : "#E50046",
              border: `1px solid ${data.badge === "DALF" ? "rgba(57,93,159,0.2)" : "rgba(229,0,70,0.2)"}`,
            }}
          >
            {data.badge}
          </span>
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--cin-accent)" }}
          >
            {data.frenchName} — {data.name}
          </h1>
          <p className="text-sm font-medium mb-4" style={{ color: "#6b7280" }}>
            {data.hours} de preparación estimada
          </p>
          <p
            className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8"
            style={{ color: "#3d4a5c" }}
          >
            {data.subtitle}
          </p>
          {hasSimulacros ? (
            <GoldButton href="/examenes">Empezar simulacro gratis</GoldButton>
          ) : (
            <GoldButton href="/test-de-nivel" variant="outline">
              Hacer test de nivel
            </GoldButton>
          )}
        </div>
      </CinematicSection>

      {/* ¿Para quién es este nivel? */}
      <CinematicSection className="py-16 px-6">
        <div className="mx-auto max-w-3xl">
          <h2
            className="text-3xl md:text-4xl font-bold mb-8"
            style={{ fontFamily: "var(--font-display)", color: "var(--cin-accent)" }}
          >
            ¿Para quién es el {data.frenchName}?
          </h2>
          <GlassCard>
            <p className="text-lg leading-relaxed" style={{ color: "#3d4a5c" }}>
              {data.profile}
            </p>
          </GlassCard>
        </div>
      </CinematicSection>

      {/* Estructura del examen */}
      <section className="relative overflow-hidden py-16 px-6" style={{ background: "var(--cin-bg-alt)", color: "var(--cin-text)" }}>
        <div className="relative z-10 mx-auto max-w-4xl">
          <h2
            className="text-3xl md:text-4xl font-bold mb-10"
            style={{ fontFamily: "var(--font-display)", color: "var(--cin-accent)" }}
          >
            Estructura del examen
          </h2>
          <div className="overflow-x-auto">
            <table
              className="w-full text-left"
              style={{ borderCollapse: "separate", borderSpacing: 0 }}
            >
              <thead>
                <tr>
                  {["Prueba", "Duración", "Puntos", "Qué se evalúa"].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                      style={{
                        color: "#6b7280",
                        borderBottom: "2px solid rgba(30,45,74,0.1)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.examStructure.map((row) => (
                  <tr key={row.prueba}>
                    <td
                      className="px-4 py-4 font-semibold"
                      style={{ color: "#1e2d4a", borderBottom: "1px solid rgba(30,45,74,0.06)" }}
                    >
                      {row.prueba}
                    </td>
                    <td
                      className="px-4 py-4"
                      style={{ color: "#3d4a5c", borderBottom: "1px solid rgba(30,45,74,0.06)" }}
                    >
                      {row.duracion}
                    </td>
                    <td
                      className="px-4 py-4 font-semibold"
                      style={{ color: "var(--cin-accent)", borderBottom: "1px solid rgba(30,45,74,0.06)" }}
                    >
                      {row.puntos}
                    </td>
                    <td
                      className="px-4 py-4 text-sm"
                      style={{ color: "#6b7280", borderBottom: "1px solid rgba(30,45,74,0.06)" }}
                    >
                      {row.evalua}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p
            className="mt-6 text-sm font-medium text-center"
            style={{ color: "#6b7280" }}
          >
            {data.examNote}
          </p>
        </div>
      </section>

      {/* Lo que necesitas dominar */}
      <CinematicSection className="py-16 px-6">
        <div className="mx-auto max-w-3xl">
          <h2
            className="text-3xl md:text-4xl font-bold mb-8"
            style={{ fontFamily: "var(--font-display)", color: "var(--cin-accent)" }}
          >
            Lo que necesitas dominar
          </h2>
          <ul className="space-y-3">
            {data.competencies.map((c) => (
              <li key={c} className="flex items-start gap-3">
                <span
                  className="mt-1.5 block h-2 w-2 rounded-full flex-shrink-0"
                  style={{ background: "var(--cin-accent)" }}
                />
                <span className="text-base leading-relaxed" style={{ color: "#3d4a5c" }}>
                  {c}
                </span>
              </li>
            ))}
          </ul>

          {data.specialBlock && (
            <div
              className="mt-10 rounded-2xl p-6"
              style={{
                background: "rgba(229,0,70,0.04)",
                border: "1px solid rgba(229,0,70,0.12)",
              }}
            >
              <h3
                className="text-lg font-bold mb-3"
                style={{ color: "var(--cin-accent)" }}
              >
                {data.specialBlock.title}
              </h3>
              <p className="leading-relaxed" style={{ color: "#3d4a5c" }}>
                {data.specialBlock.text}
              </p>
            </div>
          )}
        </div>
      </CinematicSection>

      {/* Simulacros disponibles */}
      <section className="relative overflow-hidden py-16 px-6" style={{ background: "var(--cin-bg-alt)", color: "var(--cin-text)" }}>
        <div className="relative z-10 mx-auto max-w-3xl">
          <h2
            className="text-3xl md:text-4xl font-bold mb-8"
            style={{ fontFamily: "var(--font-display)", color: "var(--cin-accent)" }}
          >
            Simulacros disponibles
          </h2>
          {!hasSimulacros ? (
            <GlassCard>
              <p className="text-lg mb-4" style={{ color: "#3d4a5c" }}>
                Los simulacros del {data.frenchName} estarán disponibles próximamente.
                Mientras tanto, descubre tu nivel actual con nuestro test gratuito.
              </p>
              <GoldButton href="/test-de-nivel" variant="outline">
                Hacer test de nivel
              </GoldButton>
            </GlassCard>
          ) : (
            <div className="flex flex-col gap-4">
              {data.simulacros.map((sim) => (
                <GlassCard key={sim.label} className="flex items-center justify-between gap-4 flex-wrap">
                  <span
                    className="font-semibold"
                    style={{ color: "#1e2d4a" }}
                  >
                    {sim.label}
                  </span>
                  {sim.href ? (
                    <GoldButton href={sim.href} variant="outline">
                      Empezar
                    </GoldButton>
                  ) : (
                    <span
                      className="text-sm font-medium px-4 py-2 rounded-full"
                      style={{
                        background: "rgba(107,114,128,0.1)",
                        color: "#6b7280",
                      }}
                    >
                      Próximamente
                    </span>
                  )}
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Descriptor MCER */}
      <CinematicSection className="py-16 px-6">
        <div className="mx-auto max-w-3xl">
          <h2
            className="text-3xl md:text-4xl font-bold mb-8"
            style={{ fontFamily: "var(--font-display)", color: "var(--cin-accent)" }}
          >
            Descriptor MCER — Nivel {data.code}
          </h2>
          <div
            className="rounded-2xl p-6"
            style={{
              background: "rgba(57,93,159,0.04)",
              border: "1px solid rgba(57,93,159,0.12)",
            }}
          >
            <p
              className="text-lg leading-relaxed italic"
              style={{ color: "#3d4a5c" }}
            >
              &ldquo;{data.mcerDescriptor}&rdquo;
            </p>
            <p className="mt-4 text-xs font-medium" style={{ color: "#6b7280" }}>
              — Marco Común Europeo de Referencia para las Lenguas (MCER)
            </p>
          </div>

          <h3
            className="text-xl font-bold mt-10 mb-4"
            style={{ fontFamily: "var(--font-display)", color: "#1e2d4a" }}
          >
            Materiales recomendados
          </h3>
          <ul className="space-y-2">
            {data.materials.map((m) => (
              <li key={m} className="flex items-start gap-3">
                <span
                  className="mt-1.5 block h-2 w-2 rounded-full flex-shrink-0"
                  style={{ background: "#395D9F" }}
                />
                <span className="text-sm leading-relaxed" style={{ color: "#3d4a5c" }}>
                  {m}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CinematicSection>

      {/* Programación de 16 semanas — Acordeón */}
      <section className="relative overflow-hidden py-16 px-6" style={{ background: "var(--cin-bg-alt)", color: "var(--cin-text)" }}>
        <div className="relative z-10 mx-auto max-w-4xl">
          <details
            className="group"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(30,45,74,0.08)",
              borderRadius: 16,
            }}
          >
            <summary
              className="cursor-pointer list-none flex items-center justify-between gap-4 px-6 py-5 font-bold select-none"
              style={{ color: "var(--cin-text)", fontFamily: "var(--font-display)" }}
            >
              <span>Programación MCER — {data.code} (16 semanas)</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-open:rotate-180"
                style={{ color: "var(--cin-accent)", flexShrink: 0 }}
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </summary>
            <div className="px-6 pb-6">
              <div className="overflow-x-auto">
                <table
                  className="w-full text-left"
                  style={{ borderCollapse: "separate", borderSpacing: 0 }}
                >
                  <thead>
                    <tr>
                      {["Semanas", "Tema", "Actividades"].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                          style={{
                            color: "#6b7280",
                            borderBottom: "2px solid rgba(30,45,74,0.1)",
                          }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.program.map((row) => (
                      <tr key={row.semanas}>
                        <td
                          className="px-4 py-3 font-semibold whitespace-nowrap"
                          style={{ color: "var(--cin-accent)", borderBottom: "1px solid rgba(30,45,74,0.06)" }}
                        >
                          {row.semanas}
                        </td>
                        <td
                          className="px-4 py-3 font-medium"
                          style={{ color: "#1e2d4a", borderBottom: "1px solid rgba(30,45,74,0.06)" }}
                        >
                          {row.tema}
                        </td>
                        <td
                          className="px-4 py-3 text-sm"
                          style={{ color: "#3d4a5c", borderBottom: "1px solid rgba(30,45,74,0.06)" }}
                        >
                          {row.actividades}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-8 text-center">
                <p className="text-base font-medium mb-4" style={{ color: "#3d4a5c" }}>
                  ¿Prefieres seguir esta programación con Isabelle?
                </p>
                <GoldButton href={`/contratar?producto=diagnostico&nivel=${data.slug}`}>
                  Reservar sesión diagnóstico — 25€
                </GoldButton>
              </div>
            </div>
          </details>
        </div>
      </section>

      {/* CTA final */}
      <CinematicSection className="py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)", color: "var(--cin-accent)" }}
          >
            ¿Quieres prepararte con Isabelle?
          </h2>
          <p className="text-lg mb-2" style={{ color: "#3d4a5c" }}>
            El 100% de los alumnos de Isabelle aprueba desde 2017.
          </p>
          <p className="text-sm mb-8" style={{ color: "#6b7280" }}>
            Sesión diagnóstico — 25€ &middot; Sin compromiso
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GoldButton href={`/contratar?producto=diagnostico&nivel=${data.slug}`}>
              Reservar sesión diagnóstico — 25€
            </GoldButton>
            <GoldButton href={`/contratar?nivel=${data.slug}`} variant="outline">
              Ver packs de preparación
            </GoldButton>
          </div>
        </div>
      </CinematicSection>

      {/* Breadcrumb nav */}
      <CinematicSection className="py-6 px-6">
        <div className="mx-auto max-w-3xl">
          <nav className="text-sm" style={{ color: "#6b7280" }}>
            <Link href="/preparacion-delf-dalf" className="hover:underline" style={{ color: "#395D9F" }}>
              ← Todos los niveles DELF/DALF
            </Link>
          </nav>
        </div>
      </CinematicSection>
    </div>
  );
}
