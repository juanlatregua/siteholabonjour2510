import type { Metadata } from "next";
import ClassementClient from "./ClassementClient";

export const metadata: Metadata = {
  title: "Classement — Le Marche | HolaBonjour",
  description: "Ranking semanal del quiz de cultura francesa Le Marche.",
};

export default function ClassementPage() {
  return (
    <div className="vie-section min-h-screen">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <h1 className="vie-heading text-3xl font-bold sm:text-4xl">
          Classement
        </h1>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--vie-navy)" }}
        >
          Top 10 de participantes. Compite cada semana por el primer puesto.
        </p>

        <div className="mt-8">
          <ClassementClient />
        </div>

        <div className="mt-8 text-center">
          <a
            href="/le-marche"
            className="text-sm font-medium underline"
            style={{ color: "var(--vie-sage, #8fbc8f)" }}
          >
            Volver al quiz
          </a>
        </div>
      </div>
    </div>
  );
}
