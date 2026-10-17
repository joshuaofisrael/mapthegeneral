import type { Metadata } from "next";
import { absoluteUrl, SITE } from "../../src/data/site";
import type { Lang } from "./types";

export function franceMetadata(input: {
  title: string;
  description: string;
  path: string;
  lang?: Lang;
  alternatePath?: string;
}): Metadata {
  const url = absoluteUrl(input.path);
  const languages: Record<string, string> | undefined =
    input.lang && input.alternatePath
      ? {
          fr: absoluteUrl(input.lang === "fr" ? input.path : input.alternatePath),
          en: absoluteUrl(input.lang === "en" ? input.path : input.alternatePath),
          "x-default": absoluteUrl(input.lang === "en" ? input.path : input.alternatePath),
        }
      : undefined;
  const socialTitle = `${input.title} · ${SITE.name}`;
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url, languages },
    robots: { index: true, follow: true },
    openGraph: {
      title: socialTitle,
      description: input.description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: input.lang === "fr" ? "fr_FR" : "en_US",
    },
    twitter: {
      card: "summary",
      title: socialTitle,
      description: input.description,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
