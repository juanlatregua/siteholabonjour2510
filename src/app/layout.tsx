import type { Metadata } from "next";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.holabonjour.es"),
  title: {
    default: "Preparación online DELF/DALF | HolaBonjour",
    template: "%s | HolaBonjour",
  },
  description:
    "Plataforma online de francés orientada a exámenes oficiales DELF y DALF: prueba de nivel, itinerario recomendado y preparación en directo.",
  alternates: {
    canonical: "/",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col bg-white text-[#1f2937]">
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
