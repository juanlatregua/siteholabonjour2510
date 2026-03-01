import type { Metadata } from "next";
import { regions } from "@/data/regions/regions";
import FranceMap from "@/components/la-carte/FranceMap";
import PassportStamps from "@/components/la-carte/PassportStamps";
import RegionCard from "@/components/la-carte/RegionCard";

export const metadata: Metadata = {
  title: "La Carte — Regiones de Francia | HolaBonjour",
  description: "Explora las 13 regiones de Francia.",
};

export default function LaCartePage() {
  return (
    <div className="vie-section min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="vie-heading text-3xl font-bold sm:text-4xl">
          La Carte de France
        </h1>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--vie-navy)" }}
        >
          Explora las 13 regiones metropolitanas de Francia. Completa el quiz
          de cada region para ganar un sello en tu pasaporte.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* Left column: Map + Passport */}
          <div className="space-y-6">
            <FranceMap regions={regions} />
            <PassportStamps />
          </div>

          {/* Right column: Region cards */}
          <div className="space-y-3">
            <h2 className="vie-heading text-xl font-semibold">
              Regiones
            </h2>
            <div className="space-y-3">
              {regions.map((region) => (
                <RegionCard key={region.slug} region={region} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
