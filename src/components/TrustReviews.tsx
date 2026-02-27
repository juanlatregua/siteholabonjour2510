import React from "react";

type TrustReviewsProps = {
  title?: string;
  intro?: string;
  tone?: "light" | "white";
};

const trustItems = [
  {
    title: "Resenas publicas verificables",
    detail:
      "Consulta opiniones reales en la ficha de Google y revisa la experiencia de alumnos antes de contratar.",
  },
  {
    title: "Proyecto docente con trayectoria",
    detail:
      "HolaBonjour mantiene actividad formativa desde 2017, primero en academia presencial y ahora en formato online.",
  },
  {
    title: "Servicio especializado",
    detail:
      "Preparacion DELF/DALF y conversacion por Zoom con seguimiento personalizado.",
  },
];

const TrustReviews = ({
  title = "Confianza y prueba social",
  intro = "Antes de contratar, puedes verificar opiniones reales y entender como trabajamos hoy en formato online.",
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

  const reviewsUrl =
    process.env.NEXT_PUBLIC_GOOGLE_REVIEWS_URL ||
    "https://www.google.com/search?q=holabonjour+resenas";

  return (
    <section className={sectionClassName} aria-label="Prueba social y confianza">
      <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">{title}</h2>
      <p className="mt-2 text-sm text-slate-700 sm:text-base">{intro}</p>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {trustItems.map((item) => (
          <article key={item.title} className={cardClassName}>
            <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-700">{item.detail}</p>
          </article>
        ))}
      </div>

      <a
        href={reviewsUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#0f5da0] px-5 text-sm font-semibold text-white transition hover:bg-[#0b4d84]"
      >
        Ver resenas reales en Google
      </a>
    </section>
  );
};

export default TrustReviews;
