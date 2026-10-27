"use client";

import { usePathname } from "next/navigation";
import { sponsorSlotHtml } from "@/data/sponsorship";
import { houseAdHtml, isEmbedRoute, languageFromRoute } from "@/lib/house-ad";

/**
 * Compact banner under the header, with the sponsorship slot directly under
 * it on the homepage and country hubs. The offer comes from the path, the
 * same way the static-page stamp chooses it. The Israel results embed stays
 * empty.
 */
export function HouseAd() {
  const pathname = usePathname() || "/";
  const route = pathname.endsWith("/") ? pathname : `${pathname}/`;
  if (isEmbedRoute(route)) return null;
  const lang = languageFromRoute(route);
  return (
    <div
      className="house-ad-slot"
      dangerouslySetInnerHTML={{ __html: `${houseAdHtml(route, lang)}${sponsorSlotHtml(route, lang)}` }}
    />
  );
}
