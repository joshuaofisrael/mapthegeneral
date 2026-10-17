import type { Metadata } from "next";
import { absoluteUrl, SITE } from "@/data/site";
import type { KrLang } from "./types";

export function krPageMetadata(input: {
  title: string;
  description: string;
  path: string;
  lang: KrLang;
  alternatePath: string;
}): Metadata {
  const url = absoluteUrl(input.path);
  const ko = absoluteUrl(input.lang === "ko" ? input.path : input.alternatePath);
  const en = absoluteUrl(input.lang === "en" ? input.path : input.alternatePath);
  const socialTitle = `${input.title} · ${SITE.name}`;
  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: url,
      languages: { ko, en, "x-default": en },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: socialTitle,
      description: input.description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: input.lang === "ko" ? "ko_KR" : "en_US",
    },
    twitter: {
      card: "summary",
      title: socialTitle,
      description: input.description,
    },
  };
}
