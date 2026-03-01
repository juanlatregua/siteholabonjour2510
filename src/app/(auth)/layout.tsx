import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0f1b33] px-4">
      <Link href="/" className="mb-8 text-2xl font-light tracking-widest text-white/50 uppercase">
        HolaBonjour
      </Link>
      {children}
    </div>
  );
}
