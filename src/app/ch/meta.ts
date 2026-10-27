import type { Metadata } from "next";
import { absoluteUrl, SITE } from "@/data/site";
import { socialImageMetadata, socialImageUrl } from "@/lib/social";
import { CH_LANGS, type ChLang } from "../../../data/ch/types";

const OG: Record<ChLang, string> = {
  de: "de_CH",
  fr: "fr_CH",
  it: "it_CH",
  en: "en_US",
};

export function chMetadata(input: { title: string; description: string; path: string; lang: ChLang }): Metadata {
  const languages: Record<string, string> = {};
  for (const code of CH_LANGS) {
    languages[code] = absoluteUrl(input.path.replace(/^\/ch\/(de|fr|it|en)\//, `/ch/${code}/`));
  }
  languages["x-default"] = absoluteUrl(input.path.replace(/^\/ch\/(de|fr|it|en)\//, "/ch/de/"));
  const socialTitle = `${input.title} · ${SITE.name}`;
  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: absoluteUrl(input.path),
      languages,
    },
    robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    openGraph: {
      title: socialTitle,
      description: input.description,
      url: absoluteUrl(input.path),
      siteName: SITE.name,
      type: "website",
      locale: OG[input.lang],
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
