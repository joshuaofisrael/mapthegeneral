import type { Metadata } from "next";
import { absoluteUrl, SITE } from "@/data/site";
import type { TrLang } from "./types";

export function turkeyMetadata(input: {
  title: string;
  description: string;
  path: string;
  lang: TrLang;
  alternatePath: string;
}): Metadata {
  const url = absoluteUrl(input.path);
  const tr = absoluteUrl(input.lang === "tr" ? input.path : input.alternatePath);
  const en = absoluteUrl(input.lang === "en" ? input.path : input.alternatePath);
  const socialTitle = `${input.title} · ${SITE.name}`;
  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: url,
      languages: { tr, en, "x-default": en },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: socialTitle,
      description: input.description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: input.lang === "tr" ? "tr_TR" : "en_US",
    },
    twitter: {
      card: "summary",
      title: socialTitle,
      description: input.description,
    },
  };
}

export function turkeyHome(lang: TrLang): string {
  return `/tr/${lang}/`;
}

export function provincePath(lang: TrLang, slug: string): string {
  return `/tr/${lang}/${slug}/`;
}

export function otherLang(lang: TrLang): TrLang {
  return lang === "tr" ? "en" : "tr";
}
