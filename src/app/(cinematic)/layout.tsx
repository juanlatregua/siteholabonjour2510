import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientScripts from "@/components/ClientScripts";

export default function CinematicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientScripts />
      <Header variant="cinematic" />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
