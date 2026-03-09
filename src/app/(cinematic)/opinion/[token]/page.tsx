import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import OpinionForm from "./OpinionForm";

export const metadata: Metadata = {
  title: "Tu opinión — HolaBonjour",
  robots: { index: false, follow: false },
};

export default async function OpinionPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const review = await prisma.review.findUnique({
    where: { token },
    select: { studentName: true, submittedAt: true, token: true },
  });

  if (!review) notFound();

  const googleReviewsUrl = process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL_TJ || null;

  if (review.submittedAt) {
    return (
      <div
        style={{ backgroundColor: "#faf7f2" }}
        className="flex min-h-[60vh] items-center justify-center px-4 py-16"
      >
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-md">
          <div className="mb-4 text-5xl">🙏</div>
          <h1 className="mb-2 text-2xl font-bold text-[#1e2d4a]">
            ¡Ya recibimos tu opinión!
          </h1>
          <p className="mb-6 text-[#3d4a5c]">
            Gracias por tomarte el tiempo, {review.studentName?.split(" ")[0] || "alumno"}.
          </p>
          {googleReviewsUrl && (
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-lg bg-[#E50046] px-6 py-3 font-semibold text-white transition hover:bg-[#c7003d]"
            >
              Déjanos también tu opinión en Google ⭐
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{ backgroundColor: "#faf7f2" }}
      className="flex min-h-[60vh] items-center justify-center px-4 py-16"
    >
      <OpinionForm
        token={review.token}
        studentName={review.studentName || ""}
        googleReviewsUrl={googleReviewsUrl}
      />
    </div>
  );
}
