import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf7f2] px-4">
      <Link href="/" className="mb-8 text-2xl font-light tracking-widest text-[#1e2d4a]/50 uppercase">
        HolaBonjour
      </Link>
      {children}
    </div>
  );
}
