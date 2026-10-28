import type { Metadata } from "next";
import { absoluteUrl, SITE } from "@/data/site";
import type { Lang } from "@/data/spain/types";
import { socialImageMetadata, socialImageUrl } from "@/lib/social";

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
          "x-default": absoluteUrl(input.lang === "es" ? input.path : input.alternatePath!),
        }
      : undefined;

  const socialTitle = input.path === "/" ? `${SITE.name} · unofficial election guides` : `${input.title} · ${SITE.name}`;
  const locale =
    input.path.startsWith("/mx/") && input.lang === "es"
      ? "es_MX"
      : input.path.startsWith("/au/")
        ? "en_AU"
        : input.path.startsWith("/gb/")
          ? "en_GB"
          : input.lang === "es"
            ? "es_ES"
            : "en_US";

  return {
    title: input.path === "/" ? { absolute: socialTitle } : input.title,
    description: input.description,
    alternates: {
      canonical: url,
      languages,
    },
    robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    openGraph: {
      title: socialTitle,
      description: input.description,
      url,
      siteName: SITE.name,
      type: "website",
      locale,
      images: socialImageMetadata(input.path),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: input.description,
      images: [socialImageUrl(input.path)],
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
