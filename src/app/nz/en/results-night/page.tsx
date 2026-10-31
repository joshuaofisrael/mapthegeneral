import { NzArticle } from "@/components/NzArticle";
import { pageMetadata } from "@/lib/metadata";

const PATH = "/nz/en/results-night/";

export const metadata = pageMetadata({
  title: "How New Zealand election results night works, 7 November 2026",
  description:
    "When New Zealand results appear on 7 November 2026, what the preliminary count includes, why special votes can change seats, and when official results come on 27 November.",
  path: PATH,
});

export default function Page() {
  return (
    <NzArticle
      path={PATH}
      crumb="How results night works"
      eyebrow="Explainer · New Zealand"
      title="How results night works in New Zealand"
      lede="Voting closes at 7:00 pm on Saturday 7 November 2026. The first numbers follow soon after, but they are preliminary."
      updated="31 October 2026."
      cites={[
        { label: "Electoral Commission, how are general election votes counted?", href: "https://elections.nz/democracy-in-nz/about-elections/how-are-general-election-votes-counted" },
        { label: "Electoral Commission, key dates for the 2026 General Election", href: "https://elections.nz/media-and-news/2026/key-dates-for-2026-general-election" },
        { label: "Vote NZ, what happens after an election?", href: "https://vote.nz/2026-general-election/about/overview/free-and-fair-elections/what-happens-after-the-election" },
        { label: "Electoral Commission, election results site", href: "https://www.electionresults.govt.nz/" },
        { label: "New Zealand Parliament, election 2026 timeline", href: "https://www3.parliament.nz/en/visit-and-learn/parliament-in-election-year/election-2026-timeline/" },
      ]}
    >
      <h2>When the numbers start</h2>
      <p>
        Voting places are open from 9:00 am to 7:00 pm New Zealand daylight time on election day. Nothing is
        released before 7:00 pm. In London that is 6:00 am on Saturday 7 November; on the US East Coast it is 1:00 am
        the same morning. The Electoral Commission posts results progressively on electionresults.govt.nz and also
        feeds them to news outlets, which is why broadcasters and this site show the same figures.
      </p>
      <p>
        The Commission’s targets, which it describes as targets rather than guarantees, are results from half of
        voting places by 10:00 pm and from 95 in every 100 voting places by 11:30 pm New Zealand time.
      </p>
      <h2>Why the early count moves fast</h2>
      <p>
        Advance votes, cast in the two weeks before election day, can be counted behind closed doors from 9:00 am on
        the day at electorate headquarters, with party scrutineers watching. Those totals are held back until voting
        closes. After 7:00 pm staff at each voting place open the boxes and count that day’s votes by hand. New
        Zealand does not use counting machines. Each voting place phones its totals through to headquarters, and they
        are entered into the national results system. Because advance votes are a large share of the total and are
        already counted, a big block of results can appear early in the evening.
      </p>
      <h2>What the preliminary count leaves out</h2>
      <p>
        Election night totals do not include special votes. A special vote is cast by someone not on the printed roll
        at the voting place, such as a voter outside their electorate, an overseas voter, someone on the unpublished
        roll, or someone who enrolled late. Special votes can arrive up to 10 days after election day and each one is
        checked before it is counted. The rolls are also checked for anyone who voted twice. Because of this, the
        Commission says preliminary and official results are not directly comparable.
      </p>
      <p>
        In practice that means close electorates and the last list seat or two can change between election night
        and the final count. Under MMP even a small shift in the party vote can move one seat between parties.
      </p>
      <h2>Official results and after</h2>
      <p>
        The official count starts the day after the election and recounts every voting paper. The Commission expects
        to declare official results on Friday 27 November 2026, and the last day for the return of the writ is 3
        December. Who forms the government is then up to the parties in Parliament; that can take days or weeks of
        negotiation, and it is not something the count itself decides.
      </p>
      <h2>On this site</h2>
      <p>
        The <a href="/nz/en/results/">results page</a> shows the Commission’s party vote figures once they are
        published, labelled preliminary and unofficial with the time they were read. Seat numbers shown here are only
        those the Commission publishes; this site does not project or calculate seats.
      </p>
    </NzArticle>
  );
}
