import type { Metadata } from "next";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientScripts from "@/components/ClientScripts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.holabonjour.es"),
  title: {
    default: "Preparacion online DELF/DALF | HolaBonjour",
    template: "%s | HolaBonjour",
  },
  description:
    "Plataforma online de frances orientada a examenes oficiales DELF y DALF: prueba de nivel, itinerario recomendado y preparacion en directo.",
  alternates: {
    canonical: "/",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-white text-[#1f2937]">
        <ClientScripts />
        <a className="skip-link" href="#main-content">
          Saltar al contenido principal
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
