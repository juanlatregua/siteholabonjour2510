import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { scenarios, getScenarioBySlug } from "@/data/scenarios/scenarios";
import GameEngine from "@/components/le-jeu/GameEngine";
import Badge from "@/components/ui/Badge";

export function generateStaticParams() {
  return scenarios.map((s) => ({ scenario: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ scenario: string }>;
}): Promise<Metadata> {
  const { scenario: slug } = await params;
  const scenario = getScenarioBySlug(slug);
  if (!scenario) {
    return { title: "Escenario no encontrado" };
  }
  return {
    title: `${scenario.title} (${scenario.level}) — Le Jeu | HolaBonjour`,
    description: scenario.description,
  };
}

const levelVariants: Record<string, "info" | "success" | "warning" | "danger"> = {
  A2: "info",
  B1: "success",
  B2: "warning",
  C1: "danger",
};

export default async function ScenarioPage({
  params,
}: {
  params: Promise<{ scenario: string }>;
}) {
  const { scenario: slug } = await params;
  const scenario = getScenarioBySlug(slug);

  if (!scenario) {
    notFound();
  }

  return (
    <div className="vie-section min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-10">
        {/* Breadcrumb */}
        <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link
            href="/le-jeu"
            className="underline transition-colors hover:text-gray-700"
          >
            Le Jeu
          </Link>
          <span>/</span>
          <span style={{ color: "var(--vie-navy)" }}>{scenario.title}</span>
          <Badge
            variant={levelVariants[scenario.level] ?? "info"}
            className="ml-1"
          >
            {scenario.level}
          </Badge>
        </nav>

        {/* Game engine */}
        <GameEngine scenario={scenario} />

        {/* Back link */}
        <div className="mt-8">
          <Link
            href="/le-jeu"
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
            Volver a Le Jeu
          </Link>
        </div>
      </div>
    </div>
  );
}
