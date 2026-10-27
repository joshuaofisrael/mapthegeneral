/**
 * New Zealand polling-day freeze.
 * 00:00–19:00 NZDT on 7 November 2026
 * = 11:00 on 6 November to 06:00 on 7 November, London (GMT).
 * Pages stay up. Content, IndexNow, and homepage promotion do not move.
 */
export const NZ_FREEZE_START = "2026-11-06T11:00:00Z";
export const NZ_FREEZE_END = "2026-11-07T06:00:00Z";
export const NZ_WINDOW_ID = "nz-2026-11-07";

export function nzFreezeActive(now = Date.now()): boolean {
  return now >= Date.parse(NZ_FREEZE_START) && now < Date.parse(NZ_FREEZE_END);
}

export function nzPromotionAllowed(now = Date.now()): boolean {
  return !nzFreezeActive(now);
}

/** IndexNow may list this URL. New Zealand paths are dropped during the freeze. */
export function indexNowUrlAllowed(url: string, now = Date.now()): boolean {
  if (!nzFreezeActive(now)) return true;
  try {
    const path = new URL(url).pathname;
    return path !== "/nz" && !path.startsWith("/nz/");
  } catch {
    return !url.includes("/nz/");
  }
}
