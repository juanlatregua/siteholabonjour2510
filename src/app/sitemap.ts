import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog-posts";

const BASE_URL = "https://holabonjour.es";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${BASE_URL}/recursos/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    // Main pages
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/cursos`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/cursos/preparacion-delf-dalf`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/cursos/conversacion`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/cursos/frances-empresas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/cursos/intensivos`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/cursos/clases-particulares`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/empresas`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/test-de-nivel`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/tarifas`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/contacto`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/sobre-nosotros`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    // Recursos
    { url: `${BASE_URL}/recursos`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/recursos/guia-delf-dalf`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/recursos/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...blogEntries,
    { url: `${BASE_URL}/recursos/descargas`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/recursos/enlaces-utiles`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    // Le Côté Vie
    { url: `${BASE_URL}/le-marche`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/la-carte`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/le-cinema`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/la-cuisine`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/le-mot-du-jour`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE_URL}/le-jeu`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
