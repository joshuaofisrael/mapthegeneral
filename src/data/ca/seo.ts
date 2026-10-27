import type { Metadata } from "next";
import { absoluteUrl, SITE } from "@/data/site";
import { socialImageMetadata, socialImageUrl } from "@/lib/social";
import { otherLangPath } from "./paths";
import type { CaLang } from "./types";

export function caMetadata(input: {
  title: string;
  description: string;
  path: string;
  lang: CaLang;
}): Metadata {
  const url = absoluteUrl(input.path);
  const enPath = input.lang === "en" ? input.path : otherLangPath(input.path, "en");
  const frPath = input.lang === "fr" ? input.path : otherLangPath(input.path, "fr");
  const socialTitle = `${input.title} · ${SITE.name}`;
  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: url,
      languages: {
        en: absoluteUrl(enPath),
        fr: absoluteUrl(frPath),
        "x-default": absoluteUrl(enPath),
      },
    },
    robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    openGraph: {
      title: socialTitle,
      description: input.description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: input.lang === "fr" ? "fr_CA" : "en_CA",
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
