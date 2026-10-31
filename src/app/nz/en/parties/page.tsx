import { NzArticle } from "@/components/NzArticle";
import { pageMetadata } from "@/lib/metadata";
import lists from "@/data/candidates/nz-general-2026.json";
import seats from "@/data/candidates/nz-electorates-2026.json";

const PATH = "/nz/en/parties/";
const PDF = "https://vote.nz/assets/pagecomponent-file-files/Party-lists-for-the-2026-General-Election.pdf";

export const metadata = pageMetadata({
  title: "New Zealand parties 2026: who is on the party vote",
  description:
    "The 17 registered parties on the 2026 New Zealand party vote, how many electorates each contests, and how MMP turns party votes into seats. Official sources.",
  path: PATH,
});

export default function Page() {
  const contested = new Map<string, number>();
  for (const c of seats.candidates) contested.set(c.committee, (contested.get(c.committee) ?? 0) + 1);
  const parties = lists.candidates.map((p) => p.name);
  const href = new Map(lists.candidates.map((p) => [p.name, p.links?.[0]?.href ?? PDF]));
  const independents = contested.get("Independent") ?? 0;
  const unregistered = [...contested.keys()].filter((k) => k !== "Independent" && !parties.includes(k)).length;
  return (
    <NzArticle
      path={PATH}
      crumb="Parties"
      eyebrow="New Zealand · 7 November 2026"
      title="Parties on the party vote, 2026 general election"
      lede={`${parties.length} registered parties are seeking the party vote. Listed alphabetically, as the Electoral Commission lists them.`}
      updated="31 October 2026."
      cites={[
        { label: lists.source.label.en, href: lists.source.url },
        { label: "Chief Electoral Officer, party lists for the 2026 General Election (PDF)", href: PDF },
        { label: seats.source.label.en, href: seats.source.url },
        { label: "Electoral Commission, about MMP", href: "https://elections.nz/democracy-in-nz/what-is-mmp/" },
      ]}
    >
      <p>
        New Zealand uses mixed member proportional representation (MMP). The party vote is the one that sets the
        overall shape of Parliament. A party that wins at least 5 in every 100 party votes, or wins at least one
        electorate, shares in the list seats. Seats are then divided in proportion to party votes using the
        Sainte-Laguë formula. Parliament normally has 120 members; if a party wins more electorates than its party
        vote share would give it, the extra seats are kept and Parliament gets bigger for that term (an overhang).
      </p>
      <p>
        The table shows each registered party and how many of the 71 electorates it has a candidate in, counted from
        the Commission’s electorate candidates file. A party can win list seats without standing in any electorate,
        and the count says nothing about its chances. There are also {independents} independent electorate candidates
        and {unregistered} smaller groups standing only in electorates; they are not on the party vote and are listed
        on the <a href="/nz/en/electorates/">electorates page</a>.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Party (party vote)</th>
            <th scope="col">Electorates contested</th>
          </tr>
        </thead>
        <tbody>
          {parties.map((p) => (
            <tr key={p}>
              <td><a href={href.get(p)} rel="noopener">{p}</a></td>
              <td>{contested.get(p) ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Each party’s full list of candidates, in list order, is in the Chief Electoral Officer’s{" "}
        <a href={PDF} rel="noopener">party lists file</a>. The order matters: list seats go to the people highest on the
        list who have not already won an electorate. This page does not reproduce or rank the lists.
      </p>
    </NzArticle>
  );
}
