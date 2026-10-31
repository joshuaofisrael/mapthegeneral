import type { Metadata } from "next";
import { NzArticle } from "@/components/NzArticle";
import { pageMetadata } from "@/lib/metadata";
import { NZ_PARTIES, NZ_POLLS, NZ_POLLS_BLACKOUT, NZ_POLLS_LIST, NZ_POLLS_READ_ON, nzAverage } from "@/data/nz-polls";

const PATH = "/nz/en/polls/";
const base = pageMetadata({
  title: "New Zealand election polls 2026: simple polling average",
  description:
    "A simple average of the latest published party-vote poll from each major New Zealand pollster, with fieldwork dates, sample sizes, margins of error and links.",
  path: PATH,
});
export const metadata: Metadata = NZ_POLLS_BLACKOUT ? { ...base, robots: { index: false, follow: true } } : base;

const fmt = (n: number) => n.toFixed(1);

export default function Page() {
  if (NZ_POLLS_BLACKOUT) {
    return (
      <NzArticle path={PATH} crumb="Polls" eyebrow="New Zealand" title="New Zealand polls" lede="Poll figures are not shown around polling day." updated={NZ_POLLS_READ_ON + "."} cites={[]}>
        <p>This page shows no figures from before polling day until voting closes at 7:00 pm New Zealand time on 7 November 2026.</p>
      </NzArticle>
    );
  }
  return (
    <NzArticle
      path={PATH}
      crumb="Polls"
      eyebrow="Polling average · New Zealand"
      title="New Zealand 2026 polls: a simple average"
      lede={`The latest party-vote poll from each of ${NZ_POLLS.length} pollsters, averaged. Polls are estimates, not results.`}
      updated={NZ_POLLS_READ_ON + "."}
      cites={[
        ...NZ_POLLS.map((p) => ({ label: `${p.pollster}, fieldwork ${p.fieldwork}`, href: p.href })),
        { label: "Wikipedia, opinion polling for the 2026 New Zealand general election (used to find the polls)", href: NZ_POLLS_LIST },
      ]}
    >
      <h2>Average of the latest polls</h2>
      <table>
        <thead>
          <tr><th scope="col">Party</th><th scope="col">Average party vote (percent)</th></tr>
        </thead>
        <tbody>
          {NZ_PARTIES.map((p) => (
            <tr key={p.key}><td>{p.name}</td><td>{fmt(nzAverage(p.key))}</td></tr>
          ))}
        </tbody>
      </table>
      <h2>How this average is made</h2>
      <p>
        We take the most recent published poll from each pollster whose fieldwork ended in the 30 days before{" "}
        {NZ_POLLS_READ_ON}, then add up each party’s figure and divide by the number of polls. Every pollster counts
        once and the same, whatever its sample size. We do not adjust for past accuracy, house effects or
        undecided voters, and we do not turn the numbers into seats. Pollsters whose last poll is older than 30 days
        (Roy Morgan and Talbot Mills at the time of reading) are left out, as is a poll circulated to private clients
        rather than published by the pollster. The figures are copied from each pollster’s or publisher’s release.
      </p>
      <h2>Polls in this average</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Pollster</th><th scope="col">Fieldwork</th><th scope="col">Sample</th>
            {NZ_PARTIES.map((p) => <th scope="col" key={p.key}>{p.key}</th>)}
          </tr>
        </thead>
        <tbody>
          {NZ_POLLS.map((poll) => (
            <tr key={poll.pollster}>
              <td><a href={poll.href} rel="noopener">{poll.pollster}</a></td>
              <td>{poll.fieldwork}</td>
              <td>{poll.sample.toLocaleString("en-NZ")}</td>
              {NZ_PARTIES.map((p) => <td key={p.key}>{fmt(poll.figures[p.key])}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Abbreviations: NAT National, LAB Labour, GRN Green, ACT ACT New Zealand, NZF New Zealand First, OPP
        Opportunity, TPM Te Pāti Māori.
      </p>
      <h2>Reading these numbers carefully</h2>
      <p>
        A poll of about 1,000 people has a margin of error of roughly plus or minus 3 points for a party near 50,
        and less for smaller parties, at the usual 95 in 100 confidence level. Differences between parties within a
        few points are often not meaningful. Averaging smooths out some noise but not errors that every pollster
        shares. Polls measure a sample at one moment; they are not results and they are not forecasts. The only
        result is the Electoral Commission’s count from 7:00 pm on 7 November.
      </p>
      <p>
        Under MMP the 5 in 100 party-vote threshold matters, as does winning an electorate. See the{" "}
        <a href="/nz/en/preview/">preview</a> and <a href="/nz/en/parties/">parties</a> pages. Including a party here
        is not an endorsement.
      </p>
      <p>
        New Zealand law bars publishing anything on election day that could influence voters until voting closes, so
        this page shows no figures from before polling day until 7:00 pm New Zealand time on 7 November.
      </p>
    </NzArticle>
  );
}
