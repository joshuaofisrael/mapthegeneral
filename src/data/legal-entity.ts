import { SITE as publicSite } from "./site";

/**
 * Legal identity. Import this only from legal pages and the contact form.
 * Client components must not import it: the strings would ship in a shared
 * script, outside the legal pages.
 */
const legalName = "Joshua Israel Ventures LLC";

/** Exact copyright line for the legal pages. Do not place it on other pages or in the site footer. */
export const COPYRIGHT_NOTICE =
  "© 2026 Joshua Israel Ventures LLC. All rights reserved. Map the General is a trade name of Joshua Israel Ventures LLC, a Florida limited liability company.";

export const LEGAL_ENTITY = {
  legalName,
  entityType: "Florida limited liability company",
  sunbizDocumentNumber: "L26000261819",
  sunbizStatus: "ACTIVE",
  brandSentence: `${publicSite.name} is a brand of ${legalName}.`,
  brandNote: `${publicSite.name} is a brand of ${legalName}. It is only a brand name: it is not a separate company and not a DBA or fictitious name. All business on and through this site is done by ${legalName}.`,
} as const;

export const SITE = {
  ...publicSite,
  ...LEGAL_ENTITY,
};
