import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-[rgba(30,45,74,0.08)] bg-white p-8 text-center shadow-lg">
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "rgba(229,0,70,0.06)",
          border: "2px solid rgba(229,0,70,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 1.25rem",
          fontSize: "1.75rem",
        }}
      >
        ✉️
      </div>
      <h2 className="mb-2 text-xl font-semibold text-[#1e2d4a]">
        Revisa tu email
      </h2>
      <p className="text-sm text-[#3d4a5c] leading-relaxed mb-4">
        Te hemos enviado un enlace de acceso. Haz clic en el enlace del email
        para entrar a tu cuenta.
      </p>
      <p className="text-xs text-[#5f6b78] mb-6">
        Si no lo ves, revisa la carpeta de spam o correo no deseado.
      </p>
      <Link
        href="/iniciar-sesion"
        style={{
          display: "inline-block",
          padding: "10px 24px",
          borderRadius: 10,
          border: "1.5px solid rgba(30,45,74,0.2)",
          color: "#1e2d4a",
          fontSize: "0.85rem",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Volver a intentarlo
      </Link>
    </div>
  );
}
