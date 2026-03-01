import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { films, getFilmBySlug } from "@/data/films/films";
import Badge from "@/components/ui/Badge";
import VocabList from "@/components/le-cinema/VocabList";
import CulturalNotes from "@/components/le-cinema/CulturalNotes";
import FilmQuiz from "@/components/le-cinema/FilmQuiz";

export function generateStaticParams() {
  return films.map((film) => ({ slug: film.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const film = getFilmBySlug(slug);
  if (!film) return { title: "Pelicula no encontrada | HolaBonjour" };

  return {
    title: `${film.title} — Le Cinema | HolaBonjour`,
    description: film.synopsis.slice(0, 160),
  };
}

export default async function FilmDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const film = getFilmBySlug(slug);
  if (!film) notFound();

  const levelVariant =
    film.level <= "A2" ? "success" : film.level <= "B2" ? "info" : "warning";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: film.title,
    director: {
      "@type": "Person",
      name: film.director,
    },
    dateCreated: String(film.year),
    genre: film.genre,
    description: film.synopsis,
    image: film.poster,
  };

  return (
    <div className="vie-section min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1
                className="vie-heading text-3xl font-bold sm:text-4xl"
              >
                {film.title}
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                {film.director} · {film.year} · {film.genre}
              </p>
            </div>
            <Badge variant={levelVariant}>{film.level}</Badge>
          </div>
        </div>

        {/* Synopsis */}
        <section className="mb-10">
          <h2 className="vie-heading text-xl font-semibold">Sinopsis</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div
              className="vie-card rounded-xl p-5"
              style={{ borderLeft: "4px solid var(--vie-bleu)" }}
            >
              <p
                className="mb-1 text-xs font-bold uppercase tracking-wide"
                style={{ color: "var(--vie-bleu)" }}
              >
                Francais
              </p>
              <p className="text-sm leading-relaxed text-gray-700">
                {film.synopsisFr}
              </p>
            </div>
            <div
              className="vie-card rounded-xl p-5"
              style={{ borderLeft: "4px solid var(--vie-wine)" }}
            >
              <p
                className="mb-1 text-xs font-bold uppercase tracking-wide"
                style={{ color: "var(--vie-wine)" }}
              >
                Espanol
              </p>
              <p className="text-sm leading-relaxed text-gray-700">
                {film.synopsis}
              </p>
            </div>
          </div>
        </section>

        {/* Vocabulaire */}
        <section className="mb-10">
          <h2 className="vie-heading text-xl font-semibold">Vocabulaire</h2>
          <div className="mt-4">
            <VocabList vocab={film.vocab} />
          </div>
        </section>

        {/* Notes Culturelles */}
        <section className="mb-10">
          <h2 className="vie-heading text-xl font-semibold">
            Notes culturelles
          </h2>
          <div className="mt-4">
            <CulturalNotes notes={film.culturalNotes} />
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <h2 className="vie-heading text-xl font-semibold">Quiz</h2>
          <div className="mt-4">
            <FilmQuiz quiz={film.quiz} filmTitle={film.title} />
          </div>
        </section>
      </div>
    </div>
  );
}
