import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import CinematicSection from "@/components/cinematic/CinematicSection";
import GlassCard from "@/components/cinematic/GlassCard";
import GoldButton from "@/components/cinematic/GoldButton";

export const metadata: Metadata = {
  title: "Opiniones de alumnos — HolaBonjour",
  description:
    "Lee las opiniones de nuestros alumnos sobre sus clases de francés con HolaBonjour.",
  alternates: { canonical: "/opiniones" },
  openGraph: {
    title: "Opiniones de alumnos — HolaBonjour",
    description:
      "Lee las opiniones de nuestros alumnos sobre sus clases de francés con HolaBonjour.",
    url: "https://holabonjour.es/opiniones",
    siteName: "HolaBonjour",
    locale: "es_ES",
    type: "website",
  },
};

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-lg" aria-label={`${rating} de 5 estrellas`}>
      {"⭐".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </span>
  );
}

export default async function OpinionesPage() {
  const reviews = await prisma.review.findMany({
    where: { submittedAt: { not: null }, rating: { not: null } },
    orderBy: { submittedAt: "desc" },
    take: 50,
    select: {
      id: true,
      studentName: true,
      rating: true,
      comment: true,
      submittedAt: true,
    },
  });

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length
      : 0;

  const googleReviewsUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL_TJ || null;

  return (
    <CinematicSection className="px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1
            className="mb-4 text-4xl font-bold"
            style={{ color: "#1e2d4a" }}
          >
            Opiniones de nuestros alumnos
          </h1>
          {reviews.length > 0 && (
            <p className="text-lg" style={{ color: "#3d4a5c" }}>
              <span className="font-semibold" style={{ color: "#1e2d4a" }}>
                {avgRating.toFixed(1)}
              </span>{" "}
              de media · {reviews.length} opinión{reviews.length !== 1 ? "es" : ""}
            </p>
          )}
        </div>

        {reviews.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {reviews.map((review) => (
              <GlassCard key={review.id} hover={false}>
                <div className="mb-2">
                  <Stars rating={review.rating!} />
                </div>
                {review.comment && (
                  <p
                    className="mb-3 text-sm leading-relaxed"
                    style={{ color: "#3d4a5c" }}
                  >
                    &ldquo;{review.comment}&rdquo;
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span
                    className="text-sm font-medium"
                    style={{ color: "#1e2d4a" }}
                  >
                    {review.studentName || "Alumno"}
                  </span>
                  <span className="text-xs" style={{ color: "#5f6b78" }}>
                    {review.submittedAt!.toLocaleDateString("es-ES", {
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </GlassCard>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="mb-8 text-lg" style={{ color: "#5f6b78" }}>
              Aún no hay opiniones publicadas. ¡Sé el primero!
            </p>
          </div>
        )}

        {googleReviewsUrl && (
          <div className="mt-12 text-center">
            <p className="mb-4" style={{ color: "#3d4a5c" }}>
              También puedes leer y dejar tu opinión en Google
            </p>
            <a href={googleReviewsUrl} target="_blank" rel="noopener noreferrer">
              <GoldButton>Ver opiniones en Google ⭐</GoldButton>
            </a>
          </div>
        )}
      </div>
    </CinematicSection>
  );
}
