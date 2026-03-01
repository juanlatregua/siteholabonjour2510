import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { recipes, getRecipeBySlug } from "@/data/recipes/recipes";
import Badge from "@/components/ui/Badge";
import IngredientList from "@/components/la-cuisine/IngredientList";
import LevelSelector from "@/components/la-cuisine/LevelSelector";
import RecipeQuiz from "@/components/la-cuisine/RecipeQuiz";

export function generateStaticParams() {
  return recipes.map((recipe) => ({ slug: recipe.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) return { title: "Receta no encontrada | HolaBonjour" };

  return {
    title: `${recipe.title} — La Cuisine | HolaBonjour`,
    description: `Aprende a hacer ${recipe.title} en frances. Receta con ingredientes bilingues e instrucciones adaptadas a tu nivel CEFR.`,
  };
}

const difficultyVariant: Record<string, "success" | "warning" | "danger"> = {
  Facil: "success",
  Intermedio: "warning",
  Avanzado: "danger",
};

export default async function RecipeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    image: recipe.image,
    prepTime: `PT${recipe.prepTime.replace(/\s/g, "").toUpperCase()}`,
    cookTime: `PT${recipe.cookTime.replace(/\s/g, "").toUpperCase().replace("HORAS", "H").replace("HORA", "H")}`,
    recipeYield: `${recipe.servings} porciones`,
    recipeIngredient: recipe.ingredients.map(
      (i) => `${i.quantity} ${i.spanish}`
    ),
    recipeInstructions: recipe.steps.map((s, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      text: s.spanish,
    })),
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
              <h1 className="vie-heading text-3xl font-bold sm:text-4xl">
                {recipe.title}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span>Prep: {recipe.prepTime}</span>
                <span>Coccion: {recipe.cookTime}</span>
                <span>{recipe.servings} porciones</span>
              </div>
            </div>
            <Badge variant={difficultyVariant[recipe.difficulty] ?? "default"}>
              {recipe.difficulty}
            </Badge>
          </div>
        </div>

        {/* Ingredients */}
        <section className="mb-10">
          <h2 className="vie-heading text-xl font-semibold">Ingredients</h2>
          <div className="mt-4">
            <IngredientList ingredients={recipe.ingredients} />
          </div>
        </section>

        {/* Steps */}
        <section className="mb-10">
          <h2 className="vie-heading text-xl font-semibold">
            Etapes / Pasos
          </h2>
          <div className="mt-4 space-y-3">
            {recipe.steps.map((step, idx) => (
              <div
                key={idx}
                className="vie-card flex gap-4 rounded-xl p-4"
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: "var(--vie-wine)" }}
                >
                  {idx + 1}
                </span>
                <div>
                  <p
                    className="text-sm font-medium"
                    style={{ color: "var(--vie-bleu)" }}
                  >
                    {step.french}
                  </p>
                  <p className="mt-1 text-sm text-gray-600">{step.spanish}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Level Selector - Versions */}
        <section className="mb-10">
          <h2 className="vie-heading text-xl font-semibold">
            Instrucciones por nivel
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Selecciona tu nivel CEFR para leer la receta adaptada.
          </p>
          <div className="mt-4">
            <LevelSelector versions={recipe.versions} />
          </div>
        </section>

        {/* Cultural Note */}
        <section className="mb-10">
          <h2 className="vie-heading text-xl font-semibold">Note culturelle</h2>
          <div
            className="mt-4 vie-card rounded-xl p-5"
            style={{ borderLeft: "4px solid var(--vie-gold)" }}
          >
            <p className="text-sm leading-relaxed text-gray-700">
              {recipe.culturalNote}
            </p>
          </div>
        </section>

        {/* Quiz */}
        <section className="mb-10">
          <h2 className="vie-heading text-xl font-semibold">Quiz</h2>
          <div className="mt-4">
            <RecipeQuiz quiz={recipe.quiz} recipeTitle={recipe.title} />
          </div>
        </section>
      </div>
    </div>
  );
}
