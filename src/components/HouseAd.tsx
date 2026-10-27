"use client";

import { usePathname } from "next/navigation";
import { houseAdHtml, isEmbedRoute, languageFromRoute } from "@/lib/house-ad";

/**
 * Compact banner under the header, rendered with the page so hydration keeps
 * it. The offer comes from the path, the same way the static-page stamp
 * chooses it. The Israel results embed stays empty.
 */
export function HouseAd() {
  const pathname = usePathname() || "/";
  const route = pathname.endsWith("/") ? pathname : `${pathname}/`;
  if (isEmbedRoute(route)) return null;
  return (
    <div
      className="house-ad-slot"
      dangerouslySetInnerHTML={{ __html: houseAdHtml(route, languageFromRoute(route)) }}
    />
  );
}
