const DEFAULT_SITE_URL = "https://mapthegeneral.com";

function publicSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;
  return raw.replace(/\/+$/, "");
}

export const SITE = {
  name: "Map the General",
  tagline: "A global, nonpartisan election guide",
  description:
    "Unofficial, independent election pages for the countries covered so far. Spain’s general election is Sunday, 29 November 2026. Map the General is a brand of Joshua Israel Ventures LLC. Not an official election website.",
  url: publicSiteUrl(),
  brandNote:
    "Map the General is a brand of Joshua Israel Ventures LLC. It is only a brand name: it is not a separate company and not a DBA or fictitious name. All business on and through this site is done by Joshua Israel Ventures LLC.",
  brandSentence: "Map the General is a brand of Joshua Israel Ventures LLC.",
  legalName: "Joshua Israel Ventures LLC",
  entityType: "Florida limited liability company",
  sunbizDocumentNumber: "L26000261819",
  sunbizStatus: "ACTIVE",
  streetAddress: "5640 W Maple Rd, Ste 101",
  locality: "West Bloomfield",
  region: "MI",
  postalCode: "48322",
  addressCountry: "US",
  location: "5640 W Maple Rd, Ste 101, West Bloomfield, MI 48322",
  officialNotUs: "Unofficial information. Confirm with your official election office.",
  lastUpdated: "October 18, 2026",
  lastUpdatedIso: "2026-10-18",
  siblingUrl: "https://mapthemidterms.com",
  siblingName: "Map the Midterms",
} as const;

export const LEGAL_NAV = [
  { href: "/terms/", label: "Terms" },
  { href: "/disclaimer/", label: "Disclaimer" },
  { href: "/privacy/", label: "Privacy" },
  { href: "/copyright/", label: "Copyright" },
  { href: "/advertising/", label: "Advertising" },
  { href: "/imprint/", label: "Legal notice" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
] as const;

export const PRIMARY_NAV = [
  { href: "/es/", label: "Spain" },
  { href: "/search/", label: "Search" },
  { href: "/about/", label: "About" },
] as const;

/** Report-an-error target. The page path is the `url` query on /contact/. */
export function reportErrorHref(path: string): string {
  const trimmed = path.trim();
  const withSlash = trimmed === "/" ? "/" : `${trimmed.replace(/\/+$/, "")}/`;
  return `/contact/?url=${encodeURIComponent(withSlash)}`;
}

/** Apex canonical URL. Directory routes use a trailing slash for GitHub Pages. */
export function absoluteUrl(path: string = "/"): string {
  const base = SITE.url.replace(/\/+$/, "");
  if (!path || path === "/") {
    return `${base}/`;
  }
  const clean = path.replace(/^\/+|\/+$/g, "");
  return `${base}/${clean}/`;
}
