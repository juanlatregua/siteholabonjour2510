import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/zona-alumno/", "/zona-profesor/", "/api/", "/iniciar-sesion", "/verificar-email", "/error"],
    },
    sitemap: "https://holabonjour.es/sitemap.xml",
  };
}
