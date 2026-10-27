import type { Metadata } from "next";
import { absoluteUrl, SITE } from "@/data/site";
import { socialImageMetadata, socialImageUrl } from "@/lib/social";

/** Canonical, hreflang and a large social image for a page outside the es/en helper. */
export function bilingualMetadata(input: {
  title: string;
  description: string;
  path: string;
  /** hreflang code to a site path. Include x-default. */
  languages: Record<string, string>;
  locale: string;
  image?: { url: string; width: number; height: number; alt: string };
}): Metadata {
  const url = absoluteUrl(input.path);
  const languages: Record<string, string> = {};
  for (const [code, path] of Object.entries(input.languages)) languages[code] = absoluteUrl(path);
  const images = input.image ? [input.image] : socialImageMetadata(input.path);
  const imageUrl = input.image?.url ?? socialImageUrl(input.path);
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: url, languages },
    robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
    openGraph: {
      title: `${input.title} · ${SITE.name}`,
      description: input.description,
      url,
      siteName: SITE.name,
      type: "website",
      locale: input.locale,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${input.title} · ${SITE.name}`,
      description: input.description,
      images: [imageUrl],
    },
  };
}
