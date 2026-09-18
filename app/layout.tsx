import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Digitalmarketing-Agentur für KMUs in Basel`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Digitalmarketing Agentur Basel",
    "SEO Agentur Basel",
    "Webdesign Basel",
    "Social Media Marketing KMU",
    "KI-Automatisierung Marketing",
    "Online Marketing Schweiz",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  applicationName: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "de_CH",
    url: siteConfig.url,
    title: `${siteConfig.name} — Wo Sichtbarkeit zu Wachstum wird.`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Visiup — Digitalmarketing-Agentur für KMUs in Basel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Wo Sichtbarkeit zu Wachstum wird.`,
    description: siteConfig.description,
    images: ["/images/og-image.svg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    postalCode: siteConfig.address.zip,
    addressLocality: siteConfig.address.city,
    addressCountry: "CH",
  },
  areaServed: {
    "@type": "City",
    name: "Basel",
  },
  sameAs: Object.values(siteConfig.social),
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Webdesign" } },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "Social Media Marketing" },
    },
    {
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: "KI-Automatisierungen" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-CH" className={`${inter.variable} ${manrope.variable}`}>
      <body className="bg-white font-sans text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
