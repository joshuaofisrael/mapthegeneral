import type { Metadata } from "next";
import { absoluteUrl, SITE } from "@/data/site";
import { socialImageMetadata, socialImageUrl } from "@/lib/social";

/** English-only hreflang. The UK brief publishes /gb/en/. */
export function gbMetadata(input: { title: string; description: string; path: string }): Metadata {
  const url = absoluteUrl(input.path);
  const socialTitle = `${input.title} · ${SITE.name}`;
  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        "x-default": url,
      },
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: socialTitle,
      description: input.description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: "en_GB",
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
