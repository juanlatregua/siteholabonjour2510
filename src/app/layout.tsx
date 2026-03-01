import type { Metadata } from "next";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/lib/auth";
import { Playfair_Display, DM_Sans, Space_Grotesk, DM_Mono } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

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
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "HolaBonjour",
    title: "Preparación online DELF/DALF | HolaBonjour",
    description: "Plataforma online de francés orientada a exámenes oficiales DELF y DALF.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Holabonjour_mlg",
    title: "Preparación online DELF/DALF | HolaBonjour",
    description: "Plataforma online de francés orientada a exámenes oficiales DELF y DALF.",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${dmSans.variable} ${spaceGrotesk.variable} ${dmMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-white text-[#1f2937]">
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
