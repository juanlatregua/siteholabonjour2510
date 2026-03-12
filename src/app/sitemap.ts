import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog-posts";
import { films } from "@/data/films/films";
import { recipes } from "@/data/recipes/recipes";
import { regions } from "@/data/regions/regions";
import { scenarios } from "@/data/scenarios/scenarios";

const BASE_URL = "https://holabonjour.es";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Blog posts
  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/recursos/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  // Le cinéma — film pages
  const filmEntries: MetadataRoute.Sitemap = films.map((film) => ({
    url: `${BASE_URL}/le-cinema/${film.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  // La cuisine — recipe pages
  const recipeEntries: MetadataRoute.Sitemap = recipes.map((recipe) => ({
    url: `${BASE_URL}/la-cuisine/${recipe.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  // La carte — region pages
  const regionEntries: MetadataRoute.Sitemap = regions.map((region) => ({
    url: `${BASE_URL}/la-carte/${region.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  // Le jeu — scenario pages
  const scenarioEntries: MetadataRoute.Sitemap = scenarios.map((scenario) => ({
    url: `${BASE_URL}/le-jeu/${scenario.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  // Calendario exámenes — level pages
  const examCalendarSlugs = ["delf-a1", "delf-a2", "delf-b1", "delf-b2", "dalf-c1", "dalf-c2"];
  const examCalendarEntries: MetadataRoute.Sitemap = examCalendarSlugs.map((slug) => ({
    url: `${BASE_URL}/calendario-examenes/${slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    // ── Main pages ──
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/cursos`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/cursos/conversacion`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/cursos/frances-empresas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/cursos/intensivos`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/cursos/clases-particulares`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/empresas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contratar`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/tarifas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/test-de-nivel`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/contacto`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/sobre-nosotros`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/preguntas-frecuentes`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/opiniones`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/colabora`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/confirmacion`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },

    // ── Preparación DELF/DALF ──
    { url: `${BASE_URL}/preparacion-delf-dalf`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/preparacion-delf-dalf/a1`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/preparacion-delf-dalf/a2`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/preparacion-delf-dalf/b1`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/preparacion-delf-dalf/b2`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/preparacion-delf-dalf/c1`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/preparacion-delf-dalf/c2`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    // ── Préparateurs ──
    { url: `${BASE_URL}/preparateurs`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },

    // ── Exámenes y simuladores ──
    { url: `${BASE_URL}/examenes`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/examen-delf-a1`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/examen-delf-a2`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/correccion-ia`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/calendario-examenes`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...examCalendarEntries,

    // ── Recursos ──
    { url: `${BASE_URL}/recursos`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/recursos/guia-delf-dalf`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/recursos/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...blogEntries,
    { url: `${BASE_URL}/recursos/descargas`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/recursos/enlaces-utiles`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },

    // ── Le Côté Vie ──
    { url: `${BASE_URL}/le-marche`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/la-carte`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...regionEntries,
    { url: `${BASE_URL}/le-cinema`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...filmEntries,
    { url: `${BASE_URL}/la-cuisine`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...recipeEntries,
    { url: `${BASE_URL}/le-mot-du-jour`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/le-jeu`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...scenarioEntries,

    // ── Legal ──
    { url: `${BASE_URL}/aviso-legal`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/politica-de-privacidad`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/politica-de-cookies`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
