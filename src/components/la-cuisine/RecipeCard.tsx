import Link from "next/link";
import Badge from "@/components/ui/Badge";
import type { Recipe } from "@/data/recipes/recipes";

const difficultyVariant: Record<Recipe["difficulty"], "success" | "warning" | "danger"> = {
  Facil: "success",
  Intermedio: "warning",
  Avanzado: "danger",
};

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const levelLabel = recipe.versions[0]?.level ?? "A1";
  const levelVariant = levelLabel <= "A2" ? "success" : levelLabel <= "B2" ? "info" : "warning";

  return (
    <Link href={`/la-cuisine/${recipe.slug}`} className="block">
      <div className="vie-card overflow-hidden p-0">
        <div
          className="flex h-48 items-center justify-center text-4xl"
          style={{
            background: "linear-gradient(135deg, var(--vie-wine), var(--vie-navy))",
            color: "white",
          }}
        >
          🍽️
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3
              className="font-semibold"
              style={{ fontFamily: "var(--font-display)", color: "var(--vie-navy)" }}
            >
              {recipe.title}
            </h3>
            <div className="flex gap-1">
              <Badge variant={difficultyVariant[recipe.difficulty]}>
                {recipe.difficulty}
              </Badge>
              <Badge variant={levelVariant}>{levelLabel}</Badge>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
            <span>Prep: {recipe.prepTime}</span>
            <span>Coccion: {recipe.cookTime}</span>
            <span>{recipe.servings} porciones</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
