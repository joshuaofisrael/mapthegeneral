import Link from "@/components/AnchorLink";
import { reportErrorHref } from "@/data/site";

/** The sentence is fixed: "Unofficial information. Confirm with your official election office." */
export function ContentTrust({
  updated,
  pagePath,
  officeHref,
  officeLabel,
}: {
  updated: string;
  pagePath: string;
  officeHref: string;
  officeLabel: string;
}) {
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
    </div>
  );
}
