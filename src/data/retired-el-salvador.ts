/**
 * Published El Salvador URLs. GitHub Pages cannot send an HTTP 301, so the
 * build writes a noindex meta-refresh page at each path. The paths stay out
 * of the sitemap.
 */
export const RETIRED_EL_SALVADOR_PATHS = [
  "/sv/",
  "/sv/es/",
  "/sv/en/",
  "/sv/es/elections/generales-2027/",
  "/sv/en/elections/general-2027/",
] as const;
