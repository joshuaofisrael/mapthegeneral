import type { Metadata } from "next";
import { absoluteUrl, SITE } from "@/data/site";
import { socialImageMetadata, socialImageUrl } from "@/lib/social";
import type { ItLang } from "./types";

export function italyMetadata(input: {
  title: string;
  description: string;
  path: string;
  lang: ItLang;
  alternatePath: string;
}): Metadata {
  const url = absoluteUrl(input.path);
  const itUrl = absoluteUrl(input.lang === "it" ? input.path : input.alternatePath);
  const enUrl = absoluteUrl(input.lang === "en" ? input.path : input.alternatePath);
  const socialTitle = `${input.title} · ${SITE.name}`;
  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: url,
      languages: { it: itUrl, en: enUrl, "x-default": enUrl },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: socialTitle,
      description: input.description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: input.lang === "it" ? "it_IT" : "en_US",
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
