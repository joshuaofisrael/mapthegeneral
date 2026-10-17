import type { Metadata } from "next";
import { absoluteUrl, SITE } from "../../src/data/site";
import type { Lang } from "./types";

export function japanMetadata(input: {
  title: string;
  description: string;
  path: string;
  lang: Lang;
  alternatePath: string;
}): Metadata {
  const url = absoluteUrl(input.path);
  const jaPath = input.lang === "ja" ? input.path : input.alternatePath;
  const enPath = input.lang === "en" ? input.path : input.alternatePath;
  const socialTitle = `${input.title} · ${SITE.name}`;
  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: url,
      languages: {
        ja: absoluteUrl(jaPath),
        en: absoluteUrl(enPath),
        "x-default": absoluteUrl(enPath),
      },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: socialTitle,
      description: input.description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: input.lang === "ja" ? "ja_JP" : "en_US",
    },
    twitter: {
      card: "summary",
      title: socialTitle,
      description: input.description,
    },
  };
}
