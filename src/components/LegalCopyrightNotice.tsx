import { COPYRIGHT_NOTICE } from "@/data/legal-entity";

/** The legal-page copyright line. Import this only from the legal pages. */
export function LegalCopyrightNotice() {
  return <p className="mt-10 text-sm leading-6 text-ink">{COPYRIGHT_NOTICE}</p>;
}
