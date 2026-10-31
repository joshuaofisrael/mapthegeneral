import { NzArticle } from "@/components/NzArticle";
import { pageMetadata } from "@/lib/metadata";

const PATH = "/nz/en/preview/";

export const metadata = pageMetadata({
  title: "New Zealand election 2026 preview: what is being decided",
  description:
    "A nonpartisan preview of New Zealand’s 7 November 2026 general election: the 2023 result, the parties, the MMP thresholds and what to watch on results night.",
  path: PATH,
});

export default function Page() {
  return (
    <NzArticle
      path={PATH}
      crumb="Preview"
      eyebrow="Preview · New Zealand"
      title="New Zealand’s 2026 general election: what is being decided"
      lede="Voters choose the 54th Parliament on Saturday 7 November 2026. Here is the starting point and what decides the outcome."
      updated="31 October 2026."
      cites={[
        { label: "Electoral Commission, 2023 General Election official results", href: "https://www.electionresults.govt.nz/electionresults_2023/" },
        { label: "Electoral Commission, candidate and party lists released", href: "https://elections.nz/media-and-news/2026/candidate-and-party-lists-released" },
        { label: "Electoral Commission, about MMP", href: "https://elections.nz/democracy-in-nz/what-is-mmp/" },
        { label: "Electoral Commission, key dates for the 2026 General Election", href: "https://elections.nz/media-and-news/2026/key-dates-for-2026-general-election" },
        { label: "New Zealand Parliament, election 2026 timeline", href: "https://www3.parliament.nz/en/visit-and-learn/parliament-in-election-year/election-2026-timeline/" },
      ]}
    >
      <h2>The starting point</h2>
      <p>
        At the October 2023 election the National Party won the most seats, and it formed a coalition government with
        ACT New Zealand and New Zealand First, with Christopher Luxon as Prime Minister. Labour, led since 2023 by
        Chris Hipkins, became the largest opposition party, alongside the Green Party and Te Pāti Māori. The official
        2023 results gave Parliament 122 seats rather than the usual 120 because of an overhang: a party won more
        electorates than its party vote share alone would have given it.
      </p>
      <h2>Who is on the ballot</h2>
      <p>
        Seventeen registered parties are seeking the party vote, and 469 candidates are standing across 71
        electorates, 64 general and seven Māori. Our <a href="/nz/en/parties/">parties page</a> lists every party and
        how many electorates each contests, and the <a href="/nz/en/electorates/">electorates page</a> lists every
        candidate by seat.
      </p>
      <h2>What decides the result</h2>
      <p>
        Under MMP the party vote decides how many seats each party gets. The two gates for list seats are winning at
        least 5 in every 100 party votes or winning one electorate. Those rules shape the night: a small party that is
        near the threshold, or that holds a single electorate, can decide whether either main grouping can reach a
        majority. A majority in a 120-seat Parliament is 61, and it rises if there is an overhang.
      </p>
      <p>
        The Māori electorates are worth watching separately, because results there have produced overhangs before.
        Close general electorates matter less for the total size of each party, since list seats top parties up to
        their party vote share, but they decide which individual candidates enter Parliament.
      </p>
      <h2>Polls</h2>
      <p>
        Map the General does not publish opinion poll figures or forecasts for any election. Published polls in New
        Zealand are run by media and research firms, not the Electoral Commission, and they measure a sample, not the
        result. Treat any single poll with caution.
      </p>
      <h2>Key dates</h2>
      <p>
        Advance voting ran from 26 October. All election advertising must end on 6 November, and on election day
        itself nothing that could influence voters may be published until voting closes at 7:00 pm. Preliminary
        results follow from 7:00 pm, and official results are due on 27 November. Read{" "}
        <a href="/nz/en/results-night/">how results night works</a> for the detail.
      </p>
    </NzArticle>
  );
}
