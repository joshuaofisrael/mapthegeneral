import Link from "@/components/AnchorLink";
import { alphaCantons } from "../../../data/ch/cantons";
import type { ChLang } from "../../../data/ch/types";
import { cantonPath } from "../../../data/ch/search";
import { ui } from "../../../data/ch/ui";

export function CantonSeatTable({ lang }: { lang: ChLang }) {
  const copy = ui(lang);
  const rows = alphaCantons();
  return (
    <div className="overflow-x-auto">
      <table className="fact-table">
        <thead>
          <tr>
            <th scope="col">{copy.cantons}</th>
            <th scope="col">{copy.nationalCouncil}</th>
            <th scope="col">{copy.councilOfStates}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((canton) => (
            <tr key={canton.slug}>
              <td>
                <Link className="text-navy underline" href={cantonPath(lang, canton.slug)}>
                  {canton.officialName}
                </Link>
              </td>
              <td>
                {canton.nationalCouncil2027}
                {canton.ordinanceName !== canton.officialName ? ` (${canton.ordinanceName})` : ""}
              </td>
              <td>{canton.councilOfStates}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
