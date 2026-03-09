import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{ backgroundColor: "#faf7f2" }}
      className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center"
    >
      <p className="mb-2 text-6xl font-bold text-[#1e2d4a]">404</p>
      <h1 className="mb-3 text-2xl font-bold text-[#1e2d4a]">
        Page introuvable
      </h1>
      <p className="mb-8 max-w-md text-[#5f6b78]">
        La p&aacute;gina que buscas no existe o ha sido movida.
      </p>
      <div className="flex gap-3">
        <Link
          href="/"
          className="rounded-lg bg-[#E50046] px-6 py-3 font-semibold text-white transition hover:bg-[#c7003d]"
        >
          Volver al inicio
        </Link>
        <Link
          href="/contacto"
          className="rounded-lg border border-[#d1d5db] px-6 py-3 font-semibold text-[#1e2d4a] transition hover:bg-[#f0ede6]"
        >
          Contacto
        </Link>
      </div>
    </div>
  );
}
