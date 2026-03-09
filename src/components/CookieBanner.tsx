"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "hb_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const dismiss = (consent: "accepted" | "essential") => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, consent);
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-[rgba(30,45,74,0.08)] bg-white/95 px-4 py-3 text-xs text-[#3d4a5c] shadow-[0_-4px_12px_rgba(0,0,0,0.08)]">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl">
          Utilizamos cookies técnicas para el correcto funcionamiento de la web
          y, en su caso, herramientas de análisis anónimo de uso. Puedes obtener
          más información en nuestra{" "}
          <Link
            href="/politica-de-privacidad"
            className="font-semibold text-[#395D9F] hover:underline"
          >
            política de privacidad
          </Link>{" "}
          y en la{" "}
          <Link
            href="/politica-de-cookies"
            className="font-semibold text-[#395D9F] hover:underline"
          >
            política de cookies
          </Link>
          .
        </p>
        <div className="mt-1 flex gap-2 sm:mt-0">
          <button
            onClick={() => dismiss("essential")}
            className="rounded-2xl border border-[#d1d5db] bg-white px-4 py-2 text-[11px] font-semibold text-[#3d4a5c] hover:bg-[#f0ede6] cursor-pointer"
          >
            Solo necesarias
          </button>
          <button
            onClick={() => dismiss("accepted")}
            className="rounded-2xl bg-[#395D9F] px-4 py-2 text-[11px] font-semibold text-white hover:bg-[#2e4d85] cursor-pointer"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
