import React from "react";

type TrustReviewsProps = {
  title?: string;
  intro?: string;
  tone?: "light" | "white";
};

const reviewItems = [
  {
    quote:
      "La prueba me dio un nivel realista y supe exactamente que preparar para presentarme al DELF B1.",
    author: "Elena M. · Preparacion B1",
  },
  {
    quote:
      "Me gusto que todo fuese online y con pasos claros. Pase de dudas a plan de estudio en el mismo dia.",
    author: "Carlos R. · Objetivo B2",
  },
  {
    quote:
      "El enfoque en examenes oficiales y simulacros con tiempo real marca la diferencia.",
    author: "Laura P. · Candidata DALF C1",
  },
];

const TrustReviews = ({
  title = "Experiencias reales de alumnos",
  intro = "Opiniones de estudiantes que usaron la prueba orientativa y continuaron preparacion online.",
  tone = "light",
}: TrustReviewsProps) => {
  const sectionClassName =
    tone === "white"
      ? "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
      : "rounded-2xl border border-blue-100 bg-blue-50/70 p-5 sm:p-6";

  const cardClassName =
    tone === "white"
      ? "rounded-xl border border-slate-200 bg-slate-50 p-4"
      : "rounded-xl border border-blue-100 bg-white p-4";

  return (
    <section className={sectionClassName} aria-label="Resenas de alumnos">
      <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{title}</h2>
      <p className="mt-2 text-sm text-slate-700 sm:text-base">{intro}</p>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {reviewItems.map((item) => (
          <article key={item.author} className={cardClassName}>
            <p className="text-sm leading-relaxed text-slate-800"><span aria-hidden="true">&ldquo;</span>{item.quote}<span aria-hidden="true">&rdquo;</span></p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.06em] text-slate-600">
              {item.author}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TrustReviews;
