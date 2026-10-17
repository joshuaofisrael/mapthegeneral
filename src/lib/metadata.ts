import type { Metadata } from "next";
import { absoluteUrl, SITE } from "@/data/site";
import type { Lang } from "@/data/spain/types";

export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  lang?: Lang;
  /** Other-language path for the same page. Omitted on pages that exist in one language. */
  alternatePath?: string;
}): Metadata {
  const url = absoluteUrl(input.path);
  const languages: Record<string, string> | undefined =
    input.lang && input.alternatePath
      ? {
          es: absoluteUrl(input.lang === "es" ? input.path : input.alternatePath),
          en: absoluteUrl(input.lang === "en" ? input.path : input.alternatePath),
          "x-default": absoluteUrl(input.lang === "en" ? input.path : input.alternatePath),
        }
      : undefined;

  const socialTitle = input.path === "/" ? `${SITE.name} · ${SITE.tagline}` : `${input.title} · ${SITE.name}`;

  return {
    title: input.path === "/" ? { absolute: socialTitle } : input.title,
    description: input.description,
    alternates: {
      canonical: url,
      languages,
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: socialTitle,
      description: input.description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: input.lang === "es" ? "es_ES" : "en_US",
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

export function swapLang(path: string, lang: Lang): string {
  if (path.startsWith("/es/es/") || path.startsWith("/es/en/")) {
    return path.replace(/^\/es\/(es|en)\//, `/es/${lang}/`);
  }
  return path;
}
