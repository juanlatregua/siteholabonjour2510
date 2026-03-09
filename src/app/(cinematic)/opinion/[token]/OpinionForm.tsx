"use client";

import React, { useState } from "react";

interface OpinionFormProps {
  token: string;
  studentName: string;
  googleReviewsUrl: string | null;
}

export default function OpinionForm({ token, studentName, googleReviewsUrl }: OpinionFormProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState(studentName);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating < 1) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/public/opinion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, rating, comment, studentName: name }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Error al enviar");
      }

      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-md">
        <div className="mb-4 text-5xl">🎉</div>
        <h1 className="mb-2 text-2xl font-bold text-[#1e2d4a]">
          ¡Merci beaucoup!
        </h1>
        <p className="mb-6 text-[#3d4a5c]">
          Tu opinión nos ayuda a seguir mejorando.
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
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-2xl bg-white p-8 shadow-md"
    >
      <h1 className="mb-2 text-2xl font-bold text-[#1e2d4a]">
        ¿Qué te pareció tu clase?
      </h1>
      <p className="mb-6 text-sm text-[#5f6b78]">
        Tu opinión nos ayuda a mejorar, {studentName?.split(" ")[0] || "alumno"}.
      </p>

      {/* Star rating */}
      <div className="mb-6 flex justify-center gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="text-4xl transition-transform hover:scale-110"
            aria-label={`${star} estrella${star > 1 ? "s" : ""}`}
          >
            {star <= (hover || rating) ? "⭐" : "☆"}
          </button>
        ))}
      </div>

      {/* Name */}
      <label className="mb-1 block text-sm font-medium text-[#3d4a5c]">
        Tu nombre
      </label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-4 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-[#1e2d4a] outline-none focus:border-[#395D9F] focus:ring-1 focus:ring-[#395D9F]"
        placeholder="Tu nombre"
      />

      {/* Comment */}
      <label className="mb-1 block text-sm font-medium text-[#3d4a5c]">
        Comentario <span className="text-[#5f6b78]">(opcional)</span>
      </label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        className="mb-6 w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-[#1e2d4a] outline-none focus:border-[#395D9F] focus:ring-1 focus:ring-[#395D9F]"
        placeholder="Cuéntanos tu experiencia..."
      />

      {status === "error" && (
        <p className="mb-4 text-center text-sm text-red-600">
          Error al enviar. Inténtalo de nuevo.
        </p>
      )}

      <button
        type="submit"
        disabled={rating < 1 || status === "sending"}
        className="w-full rounded-lg bg-[#E50046] px-6 py-3 font-semibold text-white transition hover:bg-[#c7003d] disabled:opacity-50"
      >
        {status === "sending" ? "Enviando..." : "Enviar opinión"}
      </button>
    </form>
  );
}
