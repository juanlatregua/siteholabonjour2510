export default function VerifyEmailPage() {
  return (
    <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
      <div className="mb-4 text-4xl">📨</div>
      <h2 className="mb-2 text-xl font-semibold text-white">Revisa tu email</h2>
      <p className="text-sm text-white/50 leading-relaxed">
        Te hemos enviado un enlace de acceso. Haz clic en el enlace del email
        para entrar en tu zona. Si no lo ves, revisa la carpeta de spam.
      </p>
    </div>
  );
}
