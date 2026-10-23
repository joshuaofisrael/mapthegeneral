import type { Metadata } from "next";
import { absoluteUrl, SITE } from "../../src/data/site";
import { socialImageMetadata, socialImageUrl } from "../../src/lib/social";
import type { Lang } from "./types";

export function polandMetadata(input: {
  title: string;
  description: string;
  path: string;
  lang: Lang;
  alternatePath: string;
}): Metadata {
  const url = absoluteUrl(input.path);
  const plPath = absoluteUrl(input.lang === "pl" ? input.path : input.alternatePath);
  const enPath = absoluteUrl(input.lang === "en" ? input.path : input.alternatePath);
  const socialTitle = `${input.title} · ${SITE.name}`;
  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: url,
      languages: {
        pl: plPath,
        en: enPath,
        "x-default": enPath,
      },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: socialTitle,
      description: input.description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: input.lang === "pl" ? "pl_PL" : "en_US",
      images: socialImageMetadata(),
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: input.description,
      images: [socialImageUrl()],
    },
  };
}
