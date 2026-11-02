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

/** Bulgaria pages taken down on 2 November 2026. They refresh to the homepage. */
export const RETIRED_BULGARIA_PATHS = [
  "/bg/",
  "/bg/bg/",
  "/bg/en/",
  "/bg/bg/elections/prezident-2026/",
  "/bg/en/elections/president-2026/",
  "/bg/bg/results/",
  "/bg/en/results/",
] as const;
