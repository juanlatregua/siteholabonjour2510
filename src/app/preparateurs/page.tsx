import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PreparateursFilter from "./PreparateursFilter";

export const metadata: Metadata = {
  title: "Nuestros préparateurs DELF/DALF",
  description:
    "Descubre nuestros préparateurs certificados para preparar tus exámenes DELF y DALF. Clases individuales por Zoom.",
  alternates: { canonical: "/preparateurs" },
};

export default async function PreparateursPage() {
  const profiles = await prisma.preparateurProfile.findMany({
    where: { status: "ACTIVE" },
    include: { reviews: true },
    orderBy: { avgRating: "desc" },
  });

  const serialized = profiles.map((p) => ({
    id: p.id,
    slug: p.slug,
    displayName: p.displayName,
    bio: p.bio,
    photo: p.photo,
    languages: p.languages,
    specialties: p.specialties,
    levels: p.levels,
    hourlyRate: p.hourlyRate,
    avgRating: p.avgRating,
    reviewCount: p.reviews.length,
    certificationVerified: p.certificationVerified,
  }));

  return (
    <div style={{ background: "#faf7f2", color: "#1e2d4a", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "3rem 1.5rem" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: 800,
            fontFamily: "var(--font-display)",
            marginBottom: "0.5rem",
          }}
        >
          Nuestros préparateurs
        </h1>
        <p style={{ fontSize: "1rem", color: "#5f6b78", marginBottom: "2rem" }}>
          Profesionales certificados para preparar tus exámenes DELF y DALF.
        </p>
        <PreparateursFilter profiles={serialized} />
      </div>
    </div>
  );
}
