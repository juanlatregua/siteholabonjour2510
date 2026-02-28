import type { Metadata } from "next";
import { recipes } from "@/data/recipes/recipes";
import RecipeGrid from "@/components/la-cuisine/RecipeGrid";

export const metadata: Metadata = {
  title: "La Cuisine — Aprende frances cocinando | HolaBonjour",
  description:
    "Descubre recetas clasicas francesas y aprende vocabulario culinario en frances con instrucciones adaptadas a tu nivel.",
};

export default function LaCuisinePage() {
  return (
    <div className="vie-section min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="vie-heading text-3xl font-bold sm:text-4xl">
          La Cuisine
        </h1>
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--vie-navy)" }}
        >
          Aprende frances a traves de la gastronomia francesa.
        </p>
        <div className="mt-8">
          <RecipeGrid recipes={recipes} />
        </div>
      </div>
    </div>
  );
}
