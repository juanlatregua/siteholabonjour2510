import type { Metadata } from "next";
import { films } from "@/data/films/films";
import FilmGrid from "@/components/le-cinema/FilmGrid";

export const metadata: Metadata = {
  title: "Le Cinema — Aprende frances con peliculas | HolaBonjour",
  description:
    "Descubre el cine frances y aprende vocabulario y cultura a traves de peliculas clasicas y contemporaneas.",
};

export default function LeCinemaPage() {
  return (
    <div className="vie-section min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="vie-heading text-3xl font-bold sm:text-4xl">
          Le Cinema
        </h1>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--vie-navy)" }}
        >
          Aprende frances a traves del septimo arte.
        </p>
        <div className="mt-8">
          <FilmGrid films={films} />
        </div>
      </div>
    </div>
  );
}
