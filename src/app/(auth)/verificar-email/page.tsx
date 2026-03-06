export default function VerifyEmailPage() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-[rgba(30,45,74,0.08)] bg-white p-8 text-center shadow-lg">
      <div className="mb-4 text-4xl">📨</div>
      <h2 className="mb-2 text-xl font-semibold text-[#1e2d4a]">Revisa tu email</h2>
      <p className="text-sm text-[#6b7280] leading-relaxed">
        Te hemos enviado un enlace de acceso. Haz clic en el enlace del email
        para entrar en tu zona. Si no lo ves, revisa la carpeta de spam.
      </p>
    </div>
  );
}
