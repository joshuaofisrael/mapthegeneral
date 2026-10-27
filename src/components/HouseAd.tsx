"use client";

import { usePathname } from "next/navigation";
import { sponsorSlotHtml } from "@/data/sponsorship";
import {
  RANKFOOTPRINT_SAMPLE_SCRIPT_PATH,
  houseAdHtml,
  houseAdIdForRoute,
  isEmbedRoute,
  languageFromRoute,
} from "@/lib/house-ad";

/**
 * Compact banner under the header, with the sponsorship slot directly under
 * it on the homepage and country hubs. The offer comes from the path, the
 * same way the static-page stamp chooses it. RankFootprint pages also load a
 * deferred script that can swap the $1 line for the free-scan wording.
 * The Israel results embed stays empty.
 */
export function HouseAd() {
  const pathname = usePathname() || "/";
  const route = pathname.endsWith("/") ? pathname : `${pathname}/`;
  if (isEmbedRoute(route)) return null;
  const lang = languageFromRoute(route);
  const rankfootprint = houseAdIdForRoute(route) === "rankfootprint";
  return (
    <>
      <div
        className="house-ad-slot"
        dangerouslySetInnerHTML={{ __html: `${houseAdHtml(route, lang)}${sponsorSlotHtml(route, lang)}` }}
      />
      {rankfootprint ? <script defer src={RANKFOOTPRINT_SAMPLE_SCRIPT_PATH} /> : null}
    </>
  );
}
