import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientScripts from "@/components/ClientScripts";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ClientScripts />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
