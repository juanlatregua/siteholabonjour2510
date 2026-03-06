import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ExamenesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header variant="cinematic" />
      <main style={{ background: "#F5F7FF", color: "#1a1f36", minHeight: "100vh", fontFamily: "var(--font-nunito), 'Nunito', sans-serif" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
