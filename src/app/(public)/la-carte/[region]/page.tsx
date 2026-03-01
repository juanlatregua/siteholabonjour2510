import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { regions, getRegionBySlug } from "@/data/regions/regions";
import RegionQuiz from "@/components/la-carte/RegionQuiz";

export function generateStaticParams() {
  return regions.map((r) => ({ region: r.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ region: string }>;
}): Promise<Metadata> {
  const { region: slug } = await params;
  const region = getRegionBySlug(slug);
  if (!region) {
    return { title: "Region no encontrada" };
  }
  return {
    title: `${region.name} — La Carte | HolaBonjour`,
    description: region.description,
  };
}

export default async function RegionDetailPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region: slug } = await params;
  const region = getRegionBySlug(slug);

  if (!region) {
    notFound();
  }

  return (
    <div className="vie-section min-h-screen">
      <div className="mx-auto max-w-4xl px-4 py-10">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-500">
          <Link
            href="/la-carte"
            className="underline transition-colors hover:text-gray-700"
          >
            La Carte
          </Link>
          <span className="mx-2">/</span>
          <span style={{ color: "var(--vie-navy)" }}>{region.name}</span>
        </nav>

        {/* Header */}
        <div className="flex items-start gap-4">
          <div
            className="mt-1.5 h-5 w-5 shrink-0 rounded-full"
            style={{ backgroundColor: region.color }}
            aria-hidden="true"
          />
          <div>
            <h1 className="vie-heading text-3xl font-bold sm:text-4xl">
              {region.name}
            </h1>
            <p
              className="mt-1 text-sm font-medium"
              style={{ color: "var(--vie-wine)" }}
            >
              Capital: {region.capital} &middot; Poblacion: {region.population}
            </p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="vie-card p-5">
            <h3
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--vie-navy)" }}
            >
              Descripcion
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              {region.description}
            </p>
          </div>
          <div className="vie-card p-5">
            <h3
              className="text-sm font-semibold uppercase tracking-wider"
              style={{ color: "var(--vie-navy)" }}
            >
              Description (FR)
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600 italic">
              {region.descriptionFr}
            </p>
          </div>
        </div>

        {/* Specialties */}
        <section className="mt-8">
          <h2 className="vie-heading text-xl font-semibold">
            Especialidades
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {region.specialties.map((s) => (
              <span
                key={s}
                className="inline-block rounded-full px-3 py-1 text-sm font-medium"
                style={{
                  background: "var(--vie-gold-light)",
                  color: "var(--vie-navy)",
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* Vocab table */}
        <section className="mt-8">
          <h2 className="vie-heading text-xl font-semibold">
            Vocabulario de la region
          </h2>
          <div className="mt-3 overflow-hidden rounded-xl border">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "var(--vie-navy)", color: "white" }}>
                  <th className="px-4 py-2.5 text-left font-semibold">
                    Francais
                  </th>
                  <th className="px-4 py-2.5 text-left font-semibold">
                    Espanol
                  </th>
                  <th className="hidden px-4 py-2.5 text-left font-semibold sm:table-cell">
                    Contexto
                  </th>
                </tr>
              </thead>
              <tbody>
                {region.vocab.map((v, idx) => (
                  <tr
                    key={v.french}
                    className={idx % 2 === 0 ? "bg-white" : ""}
                    style={{
                      background:
                        idx % 2 === 0 ? "white" : "var(--vie-cream)",
                    }}
                  >
                    <td
                      className="px-4 py-2.5 font-semibold"
                      style={{
                        fontFamily: "var(--font-display)",
                        color: "var(--vie-bleu)",
                      }}
                    >
                      {v.french}
                    </td>
                    <td className="px-4 py-2.5 text-gray-600">{v.spanish}</td>
                    <td className="hidden px-4 py-2.5 text-gray-500 italic sm:table-cell">
                      {v.context}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Fun Facts */}
        <section className="mt-8">
          <h2 className="vie-heading text-xl font-semibold">
            Datos curiosos
          </h2>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {region.funFacts.map((fact) => (
              <div key={fact.title} className="vie-card p-4">
                <h4
                  className="font-semibold"
                  style={{
                    fontFamily: "var(--font-display)",
                    color: "var(--vie-navy)",
                  }}
                >
                  {fact.title}
                </h4>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">
                  {fact.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <section className="mt-8">
          <h2 className="vie-heading mb-4 text-xl font-semibold">
            Quiz de la region
          </h2>
          <RegionQuiz quiz={region.quiz} regionName={region.name} />
        </section>

        {/* Back link */}
        <div className="mt-8">
          <Link
            href="/la-carte"
            className="inline-flex items-center gap-1 text-sm font-medium transition-colors"
            style={{ color: "var(--vie-bleu)" }}
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
            Volver a La Carte
          </Link>
        </div>
      </div>
    </div>
  );
}
