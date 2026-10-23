import type { MetadataRoute } from "next";
import { SITE } from "@/data/site";

export const dynamic = "force-static";

/**
 * AdSense fetches ads with Mediapartners-Google. AdsBot-Google checks ad landing pages.
 * These groups are allow-all so a later wildcard disallow cannot hide the site from them.
 */
const ADSENSE_CRAWLERS = ["Mediapartners-Google", "AdsBot-Google", "AdsBot-Google-Mobile"];

/** Search and AI crawlers are allowed, matching the sibling site's robots list. */
const AI_AND_SEARCH_CRAWLERS = [
  "OAI-SearchBot",
  "ChatGPT-User",
  "GPTBot",
  "PerplexityBot",
  "Perplexity-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "Amazonbot",
  "anthropic-ai",
  "CCBot",
  "Bytespider",
  "Meta-ExternalAgent",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...ADSENSE_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
      ...AI_AND_SEARCH_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
      { userAgent: "*", allow: "/" },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
