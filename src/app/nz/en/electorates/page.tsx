import { NzArticle } from "@/components/NzArticle";
import { pageMetadata } from "@/lib/metadata";
import data from "@/data/candidates/nz-electorates-2026.json";

const PATH = "/nz/en/electorates/";
const MAORI = new Set(["Hauraki-Waikato", "Ikaroa-Rāwhiti", "Tāmaki Makaurau", "Te Tai Hauāuru", "Te Tai Tokerau", "Te Tai Tonga", "Waiariki"]);

export const metadata = pageMetadata({
  title: "New Zealand electorates 2026: all 71 and their candidates",
  description:
    "Every electorate in the 7 November 2026 New Zealand general election, general and Māori, with each nominated candidate and party from the Electoral Commission list.",
  path: PATH,
});

function slug(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function display(name: string) {
  const [sur, given] = name.split(", ");
  if (!given) return name;
  const s = sur.charAt(0) + sur.slice(1).toLowerCase().replace(/([ -'])(\p{L})/gu, (_, a, b) => a + b.toUpperCase());
  return `${given} ${s}`;
}

export default function Page() {
  const groups = new Map<string, typeof data.candidates>();
  for (const c of data.candidates) groups.set(c.electorate, [...(groups.get(c.electorate) ?? []), c]);
  const names = [...groups.keys()];
  const general = names.filter((n) => !MAORI.has(n));
  const maori = names.filter((n) => MAORI.has(n));
  const counts = names.map((n) => groups.get(n)!.length);
  const most = names[counts.indexOf(Math.max(...counts))];
  const fewest = names[counts.indexOf(Math.min(...counts))];
  const block = (list: string[]) =>
    list.map((n) => (
      <section key={n} id={slug(n)}>
        <h3>{n}</h3>
        <p>{groups.get(n)!.length} candidates, in the order of the Commission file:</p>
        <ul>
          {groups.get(n)!.map((c) => (
            <li key={c.name}>
              {display(c.name)} — {c.committee}
            </li>
          ))}
        </ul>
      </section>
    ));
  return (
    <NzArticle
      path={PATH}
      crumb="Electorates"
      eyebrow="New Zealand · 7 November 2026"
      title="Electorates and candidates, 2026 general election"
      lede={`All ${names.length} electorates: ${general.length} general and ${maori.length} Māori, with ${data.candidates.length} electorate candidates in total.`}
      updated="31 October 2026."
      cites={[
        { label: data.source.label.en, href: data.source.url },
        { label: "Electoral Commission, candidate and party lists released", href: "https://elections.nz/media-and-news/2026/candidate-and-party-lists-released" },
        { label: "Electoral Commission, electorate maps", href: "https://elections.nz/democracy-in-nz/historical-events/boundary-review-2025/electorate-maps" },
      ]}
    >
      <p>
        Each voter in New Zealand has two votes. The electorate vote picks the local member of Parliament for one
        electorate, and whoever gets the most votes there wins the seat. The party vote, counted nationally, decides
        how many seats each party gets overall. This page covers the electorate vote. For the party vote, see{" "}
        <a href="/nz/en/parties/">parties on the party vote</a>.
      </p>
      <p>
        A voter on the Māori electoral roll votes in one of the seven Māori electorates, which overlap the general
        electorates on the map. Everyone else votes in a general electorate. The lists below come from the
        Commission’s electorate candidates spreadsheet, read on {data.source.readOn}. Names are shown given name first;
        party names are as printed. {most} has the longest ballot ({Math.max(...counts)} names) and {fewest} the
        shortest ({Math.min(...counts)}). Listing a name here is not an endorsement.
      </p>
      <p>
        To find your electorate, use the Commission’s address lookup on vote.nz. On election night, electorate counts
        appear on electionresults.govt.nz from 7:00 pm; see <a href="/nz/en/results-night/">how results night works</a>.
      </p>
      <h2>General electorates</h2>
      {block(general)}
      <h2>Māori electorates</h2>
      {block(maori)}
    </NzArticle>
  );
}
