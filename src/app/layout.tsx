import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { SiteShell } from "@/components/SiteShell";
import { SITE } from "@/data/site";
import { GoogleAnalyticsHead } from "@/components/GoogleAnalytics";
import { ADSENSE_CLIENT, ADSENSE_SCRIPT_SRC } from "@/lib/adsense";
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
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  publisher: SITE.name,
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
};

const ORG_ID = `${SITE.url}/#organization`;

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: SITE.name,
  url: `${SITE.url}/`,
  description: SITE.description,
  parentOrganization: {
    "@type": "Organization",
    name: "Joshua Israel Ventures LLC",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.streetAddress,
    addressLocality: SITE.locality,
    addressRegion: SITE.region,
    postalCode: SITE.postalCode,
    addressCountry: SITE.addressCountry,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: `${SITE.url}/`,
  description: SITE.description,
  inLanguage: ["en", "es", "pl", "fr", "it", "de"],
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
      <head>
        <meta name="google-adsense-account" content={ADSENSE_CLIENT} />
        <script async src={ADSENSE_SCRIPT_SRC} crossOrigin="anonymous" />
        <GoogleAnalyticsHead />
      </head>
      <body className={`${sourceSans.variable} ${sourceSerif.variable} font-sans`}>
        <JsonLd data={[organizationJsonLd, websiteJsonLd]} />
        <SiteShell>{children}</SiteShell>
        <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "eed148cc698d4ff8a35fe047439cc7ca"}'></script>
      </body>
    </html>
  );
}
