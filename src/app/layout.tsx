import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { SiteShell } from "@/components/SiteShell";
import { SITE } from "@/data/site";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} · ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  robots: { index: true, follow: true },
};

const ORG_ID = `${SITE.url}/#organization`;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE.legalName,
  legalName: SITE.legalName,
  email: SITE.email,
  url: SITE.url,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.streetAddress,
    addressLocality: SITE.locality,
    addressRegion: SITE.region,
    postalCode: SITE.postalCode,
    addressCountry: SITE.addressCountry,
  },
  identifier: {
    "@type": "PropertyValue",
    name: "Florida Sunbiz Document Number",
    value: SITE.sunbizDocumentNumber,
  },
  brand: {
    "@type": "Brand",
    name: SITE.name,
    url: SITE.url,
  },
  description: `Florida limited liability company that owns and operates informational websites. ${SITE.name} is a brand of ${SITE.legalName}, not a separate company.`,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  alternateName: `${SITE.name} by ${SITE.legalName}`,
  url: `${SITE.url}/`,
  description: SITE.description,
  inLanguage: ["en", "es", "pl"],
  publisher: { "@id": ORG_ID },
  copyrightHolder: { "@id": ORG_ID },
  copyrightYear: 2026,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE.url}/search/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${sourceSans.variable} ${sourceSerif.variable} font-sans`}>
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
