import type { Metadata } from "next";
import { absoluteUrl, SITE } from "@/data/site";
import type { DeLang } from "./types";

export function dePageMetadata(input: {
  title: string;
  description: string;
  path: string;
  lang?: DeLang;
  alternatePath?: string;
}): Metadata {
  const url = absoluteUrl(input.path);
  const languages: Record<string, string> | undefined =
    input.lang && input.alternatePath
      ? {
          de: absoluteUrl(input.lang === "de" ? input.path : input.alternatePath),
          en: absoluteUrl(input.lang === "en" ? input.path : input.alternatePath),
          "x-default": absoluteUrl(input.lang === "en" ? input.path : input.alternatePath),
        }
      : undefined;

  const socialTitle = `${input.title} · ${SITE.name}`;

  return {
    title: input.title,
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
      locale: input.lang === "de" ? "de_DE" : "en_US",
    },
    twitter: {
      card: "summary",
      title: socialTitle,
      description: input.description,
    },
  };
}
