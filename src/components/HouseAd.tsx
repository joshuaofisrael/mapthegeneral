"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { sponsorOfferExpired, sponsorSlotHtml } from "@/data/sponsorship";
import { isEmbedRoute, languageFromRoute } from "@/lib/house-ad";

/**
 * Compact banner under the header, with the sponsorship slot directly under
 * it on the homepage and country hubs. The offer comes from the path, the
 * same way the static-page stamp chooses it. RankFootprint copy is the $1
 * sample scan in every language. The Israel results embed stays empty.
 */
export function HouseAd() {
  const pathname = usePathname() || "/";
  const route = pathname.endsWith("/") ? pathname : `${pathname}/`;
  useEffect(() => {
    if (!sponsorOfferExpired()) return;
    document.querySelectorAll("[data-sponsor-slot]").forEach((node) => {
      node.setAttribute("hidden", "");
    });
  }, [route]);
  if (isEmbedRoute(route)) return null;
  const lang = languageFromRoute(route);
  return (
    <div
      className="house-ad-slot"
      dangerouslySetInnerHTML={{ __html: `${sponsorSlotHtml(route, lang)}` }}
    />
  );
}
