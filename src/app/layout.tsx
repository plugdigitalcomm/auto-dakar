import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Police d'accent pour les titres : empattements géométriques, registre premium.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AutoDakar — Vente de voitures neuves et d'occasion au Sénégal",
  description:
    "AutoDakar, la plateforme premium de vente de voitures neuves et d'occasion au Sénégal.",
  metadataBase: new URL("https://autodakar.sn"),
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "AutoDakar",
  url: "https://autodakar.sn",
  logo: "https://autodakar.sn/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+221-77-000-00-00",
    contactType: "customer service",
    areaServed: "SN",
    availableLanguage: "French",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
