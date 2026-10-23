import Link from "@/components/AnchorLink";
import { reportErrorHref } from "@/data/site";
import { INFORMATIONAL_NOTE } from "@/lib/legal-footer";

/** The sentence is fixed: "Unofficial information. Confirm with your official election office." */
export function ContentTrust({
  updated,
  pagePath,
  officeHref,
  officeLabel,
  copy,
}: {
  updated: string;
  pagePath: string;
  officeHref: string;
  officeLabel: string;
  /** Optional translation for non-English pages. English is used when omitted. */
  copy?: { updated: string; before: string; link: string; after: string; report: string };
}) {
  if (copy) {
    return (
      <div className="rounded-lg border border-line bg-paper-card px-4 py-3 text-sm leading-6 text-ink">
        <p>
          <span className="font-semibold">
            {copy.updated}: {updated}.
          </span>{" "}
          {copy.before}
          <a className="font-medium text-navy underline underline-offset-2" href={officeHref} rel="noopener noreferrer">
            {copy.link}
            <span className="sr-only"> ({officeLabel})</span>
          </a>
          {copy.after}
        </p>
        <p className="mt-1">
          <Link className="font-medium text-navy underline underline-offset-2" href={reportErrorHref(pagePath)}>
            {copy.report}
          </Link>
        </p>
        <p className="mt-1" lang="en">
          {INFORMATIONAL_NOTE}
        </p>
      </div>
    );
  }
  return (
    <div className="rounded-lg border border-line bg-paper-card px-4 py-3 text-sm leading-6 text-ink">
      <p>
        <span className="font-semibold">Last updated: {updated}.</span> Unofficial information. Confirm
        with your{" "}
        <a className="font-medium text-navy underline underline-offset-2" href={officeHref} rel="noopener noreferrer">
          official election office
          <span className="sr-only"> ({officeLabel})</span>
        </a>
        .
      </p>
      <p className="mt-1">
        <Link className="font-medium text-navy underline underline-offset-2" href={reportErrorHref(pagePath)}>
          Report an error
        </Link>
      </p>
      <p className="mt-1" lang="en">
        {INFORMATIONAL_NOTE}
      </p>
    </div>
  );
}
