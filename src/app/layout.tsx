import type { Metadata } from "next";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { auth } from "@/lib/auth";
import { Playfair_Display, DM_Sans, Space_Grotesk, DM_Mono, Nunito, JetBrains_Mono } from "next/font/google";
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

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
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
    images: [
      {
        url: "/images/og-holabonjour.jpg",
        width: 1200,
        height: 630,
        alt: "HolaBonjour — Academia de francés online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preparación online DELF/DALF | HolaBonjour",
    description: "Plataforma online de francés orientada a exámenes oficiales DELF y DALF.",
    images: ["/images/og-holabonjour.jpg"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "HolaBonjour",
  "legalName": "HBTJ Consultores Lingüísticos S.L.",
  "url": "https://holabonjour.es",
  "logo": "https://holabonjour.es/images/logo-holabonjour-01.svg",
  "telephone": "+34685070304",
  "email": "info@holabonjour.es",
  "description": "Academia online de francés con profesoras nativas. Clases individuales por Zoom: preparación DELF/DALF, conversación y francés para empresas.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Málaga",
    "addressRegion": "Andalucía",
    "addressCountry": "ES"
  },
  "foundingDate": "2023",
  "knowsLanguage": ["fr", "es", "en"],
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": { "@type": "GeoCoordinates", "latitude": 36.7213, "longitude": -4.4213 },
    "geoRadius": "10000 km"
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${dmSans.variable} ${spaceGrotesk.variable} ${dmMono.variable} ${nunito.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-white text-[#1f2937]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <SessionProvider session={session}>
          <main id="main-content">
            {children}
          </main>
        </SessionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
