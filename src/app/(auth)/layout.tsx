import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="flex min-h-[calc(100vh-140px)] flex-col items-center justify-center bg-[#faf7f2] px-4">
        <Link href="/" className="mb-8 text-2xl font-light tracking-widest text-[#1e2d4a]/50 uppercase">
          HolaBonjour
        </Link>
        {children}
      </div>
      <Footer />
    </>
  );
}
