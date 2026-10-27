import Link from "@/components/AnchorLink";
import { VerifiedCandidate } from "@/components/VerifiedCandidate";
import { CountryGuide } from "@/components/CountryGuide";
import { RouteHero } from "@/components/CountryHero";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ContentTrust } from "@/components/ContentTrust";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { IlResultsCard } from "@/components/IlResultsLinks";
import { SourceList } from "@/components/SourceList";
import { countryGuide } from "@/data/guides/copy";
import { countryAccent } from "@/data/heroes";
import { HUBS, hubCopy, hubEn, hubHome, type HubCode, type HubKind } from "@/data/new-hubs";
import { faqJsonLd } from "@/lib/format";
import { breadcrumbJsonLd } from "@/lib/metadata";
import type { CSSProperties, ReactNode } from "react";

function Frame({
  code,
  path,
  crumbs,
  kind,
  children,
}: {
  code: HubCode;
  path: string;
  crumbs: { name: string; path: string }[];
  kind: Exclude<HubKind, "chooser">;
  children: ReactNode;
}) {
  const hub = HUBS[code];
  const copy = hubCopy(code, kind);
  return (
    <article
      lang="en"
      className="country-article"
      data-country={code}
      style={{ "--country-accent": countryAccent(code) } as CSSProperties}
    >
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs
        items={crumbs.map((item, index) => ({
          href: index === crumbs.length - 1 ? undefined : item.path,
          label: item.name,
        }))}
      />
      <RouteHero country={code} path={path} />
      <PageHeader eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} />
      {code === "il" && <IlResultsCard />}
      <ContentTrust
        updated={["br","rs","il"].includes(code) ? "26 October 2026" : "23 October 2026"}
        pagePath={path}
        officeHref={hub.officeHref}
        officeLabel={hub.officeLabel}
      />
      <div className="mt-8 space-y-8">{children}</div>
      <SourceList sources={hub.sources} heading="Sources" />
    </article>
  );
}

export function HubChooser({ code }: { code: HubCode }) {
  const hub = HUBS[code];
  const copy = hubCopy(code, "chooser");
  const path = hubHome(code);
  return (
    <div>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: hub.name, path },
        ])}
      />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: hub.name }]} />
      <PageHeader eyebrow={hub.name} title={hub.name} lede={copy.lede} />
      {code === "il" && <IlResultsCard />}
      <ContentTrust updated={["br","rs","il"].includes(code) ? "26 October 2026" : "23 October 2026"} pagePath={path} officeHref={hub.officeHref} officeLabel={hub.officeLabel} />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        <li
          className="country-card rounded-xl border border-line bg-paper-card p-5"
          style={{ borderTopColor: countryAccent(code) }}
        >
          <h2 className="font-serif text-2xl font-semibold">
            <Link className="hover:text-navy" href={hubEn(code)}>
              English
            </Link>
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-muted">{hub.blurb}</p>
        </li>
        {code === "il" && (
          <li className="country-card rounded-xl border border-line bg-paper-card p-5" style={{ borderTopColor: countryAccent(code) }} lang="he" dir="rtl">
            <h2 className="font-serif text-2xl font-semibold">
              <Link className="hover:text-navy" href="/il/he/elections/knesset-2026/">
                עברית
              </Link>
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink-muted">
              הבחירות לכנסת ה-26, 27 באוקטובר 2026.{" "}
              <Link className="text-navy underline" href="/il/he/results/">
                תוצאות
              </Link>
            </p>
          </li>
        )}
        {code === "rs" && (
          <li className="country-card rounded-xl border border-line bg-paper-card p-5" style={{ borderTopColor: countryAccent(code) }} lang="sr">
            <h2 className="font-serif text-2xl font-semibold">
              <Link className="hover:text-navy" href="/rs/sr/elections/narodna-skupstina-2026/">
                Srpski
              </Link>
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink-muted">
              Narodna skupština, 25. oktobar 2026.{" "}
              <Link className="text-navy underline" href="/rs/sr/elections/predsednicki-2026/">
                Predsednički izbori, datum nije raspisan
              </Link>
            </p>
          </li>
        )}
        {code === "br" && (
          <li className="country-card rounded-xl border border-line bg-paper-card p-5" style={{ borderTopColor: countryAccent(code) }} lang="pt">
            <h2 className="font-serif text-2xl font-semibold">
              <Link className="hover:text-navy" href="/br/pt/elections/geral-2026/">
                Português
              </Link>
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink-muted">Eleição geral de 2026, 4 e 25 de outubro. Totais do TSE.</p>
          </li>
        )}
      </ul>
    </div>
  );
}

export function HubNational({ code }: { code: HubCode }) {
  const hub = HUBS[code];
  const path = hubEn(code);
  return (
    <Frame
      code={code}
      kind="national"
      path={path}
      crumbs={[
        { name: "Home", path: "/" },
        { name: hub.name, path },
      ]}
    >
      <CountryGuide code={code} lang="en" />
      <p className="text-sm">
        <Link className="text-navy underline" href={hubEn(code, "elections")}>
          Elections
        </Link>
        {" · "}
        <Link className="text-navy underline" href={hubEn(code, "faq")}>
          Questions
        </Link>
        {" · "}
        <Link className="text-navy underline" href={hubEn(code, "sources")}>
          Sources
        </Link>
      </p>
    </Frame>
  );
}

type Row = { name: ReactNode; votes: string; pct: string; note?: string; key?: string };

function ResultTable({ caption, rows, pctLabel }: { caption: string; rows: Row[]; pctLabel: string }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <caption className="mb-2 text-left font-semibold">{caption}</caption>
        <thead>
          <tr>
            <th className="py-1 pr-4">Candidate or list</th>
            <th className="py-1 pr-4 text-right">Votes</th>
            <th className="py-1 pr-4 text-right">{pctLabel}</th>
            <th className="py-1">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, index) => (
            <tr key={r.key ?? (typeof r.name === "string" ? r.name : index)} className="border-t border-line">
              <td className="py-1 pr-4">{r.name}</td>
              <td className="py-1 pr-4 text-right tabular-nums">{r.votes}</td>
              <td className="py-1 pr-4 text-right tabular-nums">{r.pct}</td>
              <td className="py-1">{r.note ?? ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const BR_R2 = "https://resultados.tse.jus.br/oficial/ele2026/6258/dados/br/br-c0001-e006258-u.json";
const BR_R1 = "https://resultados.tse.jus.br/oficial/ele2026/6257/dados/br/br-c0001-e006257-u.json";

function BrazilBody() {
  return (
    <>
      <p>
        <strong>Official result.</strong> All figures below are from the{" "}
        <a href="https://resultados.tse.jus.br/oficial/app/index.html" rel="noopener noreferrer">
          Tribunal Superior Eleitoral (TSE) results service
        </a>
        , read on 26 October 2026. The{" "}
        <a href={BR_R2} rel="noopener noreferrer">second-round national file</a> was generated at 23:26 Brasília time on
        25 October 2026 with 100% of 499,248 polling sections counted. Percentages are of valid votes.
      </p>
      <ResultTable
        caption="President, second round, 25 October 2026 (TSE, 100% of sections)"
        pctLabel="% valid"
        rows={[
          {
            key: "lula-r2",
            name: <VerifiedCandidate listId="br-president-2026" name="Luiz Inácio Lula da Silva" />,
            votes: "64,256,232",
            pct: "51.79%",
            note: "Elected (TSE)",
          },
          {
            key: "flavio-r2",
            name: <VerifiedCandidate listId="br-president-2026" name="Flávio Bolsonaro" />,
            votes: "59,826,041",
            pct: "48.21%",
          },
        ]}
      />
      <p>
        Second round, per the TSE: electorate 158,745,502; votes cast 128,236,074 (80.78%); abstentions 30,509,005;
        valid votes 124,082,273; blank votes 1,430,496.
      </p>
      <ResultTable
        caption="President, first round, 4 October 2026 (TSE), candidates above 2% of valid votes"
        pctLabel="% valid"
        rows={[
          {
            key: "flavio-r1",
            name: <VerifiedCandidate listId="br-president-2026" name="Flávio Bolsonaro" />,
            votes: "56,104,503",
            pct: "47.03%",
            note: "To runoff",
          },
          {
            key: "lula-r1",
            name: <VerifiedCandidate listId="br-president-2026" name="Luiz Inácio Lula da Silva" />,
            votes: "53,879,538",
            pct: "45.16%",
            note: "To runoff",
          },
          {
            key: "cury",
            name: <VerifiedCandidate listId="br-president-2026" name="Augusto Cury" />,
            votes: "—",
            pct: "2.89%",
          },
          {
            key: "renan",
            name: <VerifiedCandidate listId="br-president-2026" name="Renan Santos" />,
            votes: "—",
            pct: "2.24%",
          },
          {
            key: "caiado",
            name: <VerifiedCandidate listId="br-president-2026" name="Ronaldo Caiado" />,
            votes: "—",
            pct: "2.18%",
          },
        ]}
      />
      <p>
        First round, per the{" "}
        <a href={BR_R1} rel="noopener noreferrer">TSE first-round national file</a>: votes cast 125,275,835 (78.92%);
        valid votes 119,300,788. Other candidates received under 2% each and are listed in the TSE file. State races are
        not covered. This site publishes no polls.
      </p>
    </>
  );
}

function SerbiaBody() {
  return (
    <>
      <p>
        <strong>Preliminary results, not final.</strong> Figures are from the{" "}
        <a href="https://www.rik.parlament.gov.rs/542645/rezultati/" rel="noopener noreferrer">
          Republic Electoral Commission (RIK) results page
        </a>{" "}
        as of 10:25 Belgrade time on 26 October 2026, when 8,135 of 8,392 polling stations had been processed. RIK labels
        them preliminary. Final results are the total report RIK publishes in the Official Gazette. Percentages are of
        voters who voted, as RIK shows them. Seats are not shown until RIK assigns them.
      </p>
      <ResultTable
        caption="National Assembly, 25 October 2026 — RIK preliminary, lists above 0.6%"
        pctLabel="% of voters"
        rows={[
          { name: "Studentska lista – Studenti pobeđuju (Student List – Students Win)", votes: "2,246,423", pct: "52.65%" },
          { name: "Aleksandar Vučić – Ujedinjena Srbija (United Serbia)", votes: "1,673,241", pct: "39.22%" },
          { name: "Ivica Dačić – Faktor stabilnosti (SPS coalition)", votes: "92,532", pct: "2.17%" },
          { name: "Autentična desnica (Authentic Right)", votes: "—", pct: "0.90%" },
          { name: "Alliance of Vojvodina Hungarians (VMSZ), minority list", votes: "—", pct: "0.81%" },
          { name: "Albanian coalition, minority list", votes: "—", pct: "0.65%" },
        ]}
      />
      <p>
        RIK preliminary totals: 6,451,292 registered voters; 4,269,403 voted (68.81%); 4,211,697 valid ballots; 55,107
        invalid ballots. Other lists are on the RIK page. Lists below 3% win seats only if RIK confirms national-minority
        status, as described on the{" "}
        <a href="https://www.rik.parlament.gov.rs/tekst/77/o-izborima-za-narodne-poslanike.php" rel="noopener noreferrer">
          RIK page on National Assembly elections
        </a>
        . RIK content is licensed CC BY-NC-ND 3.0 RS.
      </p>
    </>
  );
}

function IsraelBody() {
  return (
    <>
      <p>
        The{" "}
        <a href="https://www.gov.il/en/pages/knesset26-date" rel="noopener noreferrer">
          Central Elections Committee
        </a>{" "}
        set Tuesday 27 October 2026 (16 Heshvan 5787) as election day for the 26th Knesset.
      </p>
      <p>
        The Knesset has 120 seats. According to the{" "}
        <a href="https://www.gov.il/en/pages/election-about-info" rel="noopener noreferrer">
          Committee’s page on elections in Israel
        </a>
        , a candidate list needs 3.25% of the votes cast to win seats, and lists that pass share the seats in proportion
        to their votes.
      </p>
      <p>
        This page contains no polls, forecasts or exit polls. Results will come from the{" "}
        <a href="https://www.bechirot.gov.il/home/" rel="noopener noreferrer">
          Central Elections Committee
        </a>
        , and none are shown here until the Committee publishes them.
      </p>
    </>
  );
}

export function HubElections({ code }: { code: HubCode }) {
  const hub = HUBS[code];
  const guide = countryGuide(code, "en");
  return (
    <Frame
      code={code}
      kind="elections"
      path={hubEn(code, "elections")}
      crumbs={[
        { name: "Home", path: "/" },
        { name: hub.name, path: hubEn(code) },
        { name: "Elections", path: hubEn(code, "elections") },
      ]}
    >
      <ul className="space-y-4">
        {guide?.elections.map((item) => (
          <li key={item.name}>
            {item.href ? (
              <Link className="font-serif text-xl font-semibold text-navy hover:underline" href={item.href}>
                {item.name}
              </Link>
            ) : (
              <p className="font-serif text-xl font-semibold">{item.name}</p>
            )}
            {item.detail ? <p className="mt-1 text-sm leading-6 text-ink-muted">{item.detail}</p> : null}
          </li>
        ))}
      </ul>
    </Frame>
  );
}

function ElectionBody({ code }: { code: HubCode }) {
  if (code === "ie") {
    return (
      <>
        <p>
          The{" "}
          <a href="https://www.electoralcommission.ie/general-elections/" rel="noopener noreferrer">
            general-elections page
          </a>{" "}
          says the most recent general election was on Friday 29 November 2024. It says a general election has to take
          place at least every five years, that the Taoiseach can ask the President to dissolve the Dáil, and that once
          the Dáil is dissolved a general election has to be held within 30 days. The Polling Day Order is set by the
          Minister for Housing, Local Government and Heritage. No name of any officeholder is repeated here.
        </p>
        <p>
          This page does not calculate a latest legal day from 29 November 2024. The Commission page does not print
          that day as a polling day.
        </p>
        <p>
          The political-advertising page says this Commission does not regulate paid political ads placed on platforms,
          social media or search engines, and that Part V of the Electoral Reform Act 2022 has not been commenced. This
          site publishes no paid political advertising. Other parts of the Act were not section-checked.
        </p>
      </>
    );
  }
  if (code === "no") {
    return (
      <>
        <p>
          The{" "}
          <a href="https://www.valg.no/om-valg/valgene-i-norge/stortingsvalg/" rel="noopener noreferrer">
            Storting page
          </a>
          , published 21 May 2026, says an election is held every four years in September and that the next one is in
          September 2029. It does not name the day.
        </p>
        <p>
          The same page walks through early voting from 1 July, advance voting from 11 August, and an election day of
          Monday 8 September, and it states the age condition as the end of 2025. Those dates sit in that walk-through.
          They are not printed as the September 2029 timetable, so this page does not adopt them for 2029.
        </p>
        <p>
          The Directorate’s{" "}
          <a href="https://valgmedarbeiderportalen.valg.no/artikler/regelverksendringer-ny-valglov" rel="noopener noreferrer">
            note on the new election act
          </a>{" "}
          says section 21-8 does not allow results to be published before 21:00 on election day, including forecasts
          based on surveys on election day or the day before. Lovdata was not opened. This site publishes no count and
          no such forecast.
        </p>
      </>
    );
  }
  if (code === "br") return <BrazilBody />;
  if (code === "rs") return <SerbiaBody />;
  if (code === "il") return <IsraelBody />;
  return (
    <>
      <p>
        The{" "}
        <a
          href="https://val.se/english/future-elections/2026-elections---the-riksdag-and-regional-and-municipal-councils"
          rel="noopener noreferrer"
        >
          future-elections page
        </a>
        , published 16 October 2026, says the next elections to the Riksdag and to regional and municipal councils will
        be held on Sunday 8 September 2030, every four years on the second Sunday in September. The address of that
        page still contains “2026-elections”, and some of its questions still say 2026. This page follows the dated
        statement of 8 September 2030.
      </p>
      <p>
        Early voting, on that page, runs from 18 days before election day through election day. The page does not print
        the opening date of that window for 2030, and this site does not calculate it. Assigned locations are open from
        08:00 to 20:00 on election day.
      </p>
      <p>
        The authority’s{" "}
        <a
          href="https://www.val.se/download/18.7faaad3f1a0b0c300e4282/1789822515986/beslutsprotokoll-resultat-riksdagen-2026.pdf"
          rel="noopener noreferrer"
        >
          Riksdag result protocol
        </a>{" "}
        records the previous Riksdag election as 13 September 2026. This site does not copy the party figures in that
        protocol. No poll-publication ban was found on the English pages read. The election act was not read section by
        section.
      </p>
    </>
  );
}

export function HubElection({ code }: { code: HubCode }) {
  const hub = HUBS[code];
  const path = hubEn(code, `elections/${hub.electionSlug}`);
  return (
    <Frame
      code={code}
      kind="election"
      path={path}
      crumbs={[
        { name: "Home", path: "/" },
        { name: hub.name, path: hubEn(code) },
        { name: "Elections", path: hubEn(code, "elections") },
        { name: hub.electionName, path },
      ]}
    >
      <div className="prose-legal space-y-4">
        <ElectionBody code={code} />
      </div>
      <p className="text-sm">
        <Link className="text-navy underline" href={hubEn(code)}>
          How the system works
        </Link>
      </p>
    </Frame>
  );
}

export function HubFaq({ code }: { code: HubCode }) {
  const hub = HUBS[code];
  const guide = countryGuide(code, "en");
  const items = (guide?.faq ?? []).map((item) => ({ question: item.q, answer: item.a }));
  return (
    <Frame
      code={code}
      kind="faq"
      path={hubEn(code, "faq")}
      crumbs={[
        { name: "Home", path: "/" },
        { name: hub.name, path: hubEn(code) },
        { name: "Questions", path: hubEn(code, "faq") },
      ]}
    >
      <JsonLd data={faqJsonLd(items)} />
      <dl className="space-y-4">
        {items.map((item) => (
          <div key={item.question}>
            <dt className="font-semibold">{item.question}</dt>
            <dd className="mt-1 text-sm leading-6 text-ink-muted">{item.answer}</dd>
          </div>
        ))}
      </dl>
    </Frame>
  );
}

export function HubSources({ code }: { code: HubCode }) {
  const hub = HUBS[code];
  return (
    <Frame
      code={code}
      kind="sources"
      path={hubEn(code, "sources")}
      crumbs={[
        { name: "Home", path: "/" },
        { name: hub.name, path: hubEn(code) },
        { name: "Sources", path: hubEn(code, "sources") },
      ]}
    >
      <p className="text-sm leading-6 text-ink-muted">
        This hub does not republish an electoral register, a candidate list, or a photograph of a person. Municipality
        pages are not part of this release.
      </p>
    </Frame>
  );
}
