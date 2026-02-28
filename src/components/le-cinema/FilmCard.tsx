import Link from "next/link";
import Badge from "@/components/ui/Badge";
import type { Film } from "@/data/films/films";

export default function FilmCard({ film }: { film: Film }) {
  const levelVariant = film.level <= "A2" ? "success" : film.level <= "B2" ? "info" : "warning";
  return (
    <Link href={`/le-cinema/${film.slug}`} className="block">
      <div className="vie-card overflow-hidden p-0">
        <div
          className="flex h-48 items-center justify-center text-4xl"
          style={{
            background: "linear-gradient(135deg, var(--vie-bleu), var(--vie-navy))",
            color: "white",
          }}
        >
          🎬
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3
              className="font-semibold"
              style={{ fontFamily: "var(--font-display)", color: "var(--vie-navy)" }}
            >
              {film.title}
            </h3>
            <Badge variant={levelVariant}>{film.level}</Badge>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {film.director} · {film.year}
          </p>
          <p className="mt-1 text-xs text-gray-400">{film.genre}</p>
        </div>
      </div>
    </Link>
  );
}
