import type { Metadata } from "next";
import Link from "next/link";
import {
  officialExamWindows,
  trainingTracks,
  type CEFRLevel,
} from "@/lib/delf-dalf";
import { feiAllLevels, getFeiLevelResources } from "@/lib/fei-resources";

export const metadata: Metadata = {
  title: "Preparación online DELF/DALF",
  description:
    "Programas de preparación online para DELF y DALF con ruta por nivel y orientación por convocatorias oficiales.",
  alternates: {
    canonical: "/preparacion-delf-dalf",
  },
};

const orderedLevels: CEFRLevel[] = ["A1", "A2", "B1", "B2", "C1", "C2"];

const isCEFRLevel = (value: string | undefined): value is CEFRLevel => {
  return Boolean(value && orderedLevels.includes(value as CEFRLevel));
};

export default async function PreparacionDelfDalfPage({
  searchParams,
}: {
  searchParams: Promise<{ nivel?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const selectedLevel = isCEFRLevel(resolvedSearchParams.nivel)
    ? resolvedSearchParams.nivel
    : undefined;

  const targetedResources = selectedLevel
    ? getFeiLevelResources(selectedLevel)
    : undefined;

  const resourceGroups = targetedResources
    ? [targetedResources]
    : feiAllLevels;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-2xl bg-[#0b3c6f] px-6 py-8 text-white">
        <h1 className="text-3xl font-bold sm:text-4xl">Preparación oficial DELF/DALF</h1>
        <p className="mt-3 max-w-3xl text-sm text-blue-100 sm:text-base">
          Planes formativos diseñados para candidatos a certificación oficial. Trabajamos estructura de
          examen, corrección estratégica y simulacros con tiempos reales.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {orderedLevels.map((level) => {
          const track = trainingTracks[level];
          const highlighted = selectedLevel === level;

          return (
            <article
              key={level}
              className={`rounded-2xl border p-5 shadow-sm ${
                highlighted
                  ? "border-emerald-400 bg-emerald-50"
                  : "border-gray-200 bg-white"
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-[#0f5da0]">Nivel {track.level}</p>
              <h2 className="mt-2 text-xl font-bold text-gray-900">{track.exam}</h2>
              <p className="mt-2 text-sm text-gray-700">{track.mode}</p>
              <p className="mt-1 text-sm text-gray-700">Carga recomendada: {track.weeklyLoad}</p>

              <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-gray-700">
                {track.focus.map((focusLine) => (
                  <li key={focusLine}>{focusLine}</li>
                ))}
              </ul>

              <p className="mt-4 text-sm font-medium text-gray-900">{track.outcome}</p>
            </article>
          );
        })}
      </section>

      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900">Recursos oficiales FEI por nivel</h2>
        <p className="mt-2 text-sm text-gray-700">
          Enlaces directos a materiales oficiales de ejemplo publicados por France Education international.
          Se utilizan como referencia de formato y entrenamiento.
        </p>

        {selectedLevel && (
          <p className="mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-900">
            Mostrando recursos recomendados para nivel <strong>{selectedLevel}</strong>.
            <Link href="/preparacion-delf-dalf" className="ml-2 font-semibold underline">
              Ver todos
            </Link>
          </p>
        )}

        <div className="mt-6 space-y-4">
          {resourceGroups.map((group) => (
            <details
              key={group.level}
              open={Boolean(selectedLevel)}
              className="rounded-xl border border-blue-100 bg-blue-50/40 p-4"
            >
              <summary className="cursor-pointer text-sm font-semibold text-[#0b3c6f]">
                {group.level} · {group.exam} · {group.counts.total} recursos ({group.counts.documents} documentos / {group.counts.audios} audios)
              </summary>

              <p className="mt-3 text-xs text-gray-600">
                Fuente oficial: {" "}
                <a
                  href={group.sourcePage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline"
                >
                  {group.sourcePage}
                </a>
              </p>

              <ul className="mt-3 space-y-2">
                {group.resources.map((resource) => (
                  <li key={resource.url} className="text-sm text-gray-800">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#0f5da0] underline"
                    >
                      {resource.label}
                    </a>
                    <span className="ml-2 text-xs uppercase text-gray-500">
                      {resource.type} · {resource.role}
                    </span>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-gray-900">Calendario orientativo de convocatorias</h2>
        <p className="mt-2 text-sm text-gray-700">
          Fechas sujetas a publicación de cada centro examinador. Recomendamos confirmar convocatoria en la
          red oficial de France Education international antes de cerrar matrícula.
        </p>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {officialExamWindows.map((window) => (
            <article key={window.period} className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
              <h3 className="text-sm font-semibold text-[#0b3c6f]">{window.period}</h3>
              <p className="mt-1 text-sm text-gray-700">{window.note}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
