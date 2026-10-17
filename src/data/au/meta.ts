import type { Metadata } from "next";
import { absoluteUrl } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

/** English-only Australia pages. hreflang points at this URL for en and x-default. */
export function auPageMetadata(input: { title: string; description: string; path: string }): Metadata {
  const url = absoluteUrl(input.path);
  const base = pageMetadata({ ...input, lang: "en" });
  return {
    ...base,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        "x-default": url,
      },
    },
  };
}
