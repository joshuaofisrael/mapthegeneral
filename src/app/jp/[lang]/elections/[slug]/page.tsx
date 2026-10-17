import Link from "next/link";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { JapanFrame } from "../../../frame";
import { japanHome } from "../../../../../../data/jp/paths";
import { sourceById, sourcesById } from "../../../../../../data/jp/sources";
import type { Lang } from "../../../../../../data/jp/types";
import { ui } from "../../../../../../data/jp/ui";
import { japanMetadata } from "../../../../../../data/jp/seo";

const SLUGS = ["shuugiin-2026", "sangiin-2025", "kokusei-next"] as const;
type Slug = (typeof SLUGS)[number];

export function generateStaticParams() {
  return (["ja", "en"] as const).flatMap((lang) => SLUGS.map((slug) => ({ lang, slug })));
}
export const dynamicParams = false;

function asLang(value: string): Lang {
  if (value !== "ja" && value !== "en") notFound();
  return value;
}

function asSlug(value: string): Slug {
  if (!SLUGS.includes(value as Slug)) notFound();
  return value as Slug;
}

const COPY = {
  "shuugiin-2026": {
    ja: {
      title: "第51回衆議院議員総選挙",
      description: "2026年2月8日の衆議院議員総選挙。解散は2026年1月23日。非公式の情報です。",
    },
    en: {
      title: "51st House of Representatives election",
      description: "House of Representatives election of 8 February 2026. Dissolved on 23 January 2026. Unofficial information.",
    },
  },
  "sangiin-2025": {
    ja: {
      title: "第27回参議院議員通常選挙",
      description: "2025年7月20日の参議院議員通常選挙。公示は2025年7月3日。非公式の情報です。",
    },
    en: {
      title: "27th House of Councillors election",
      description: "House of Councillors election of 20 July 2025. Proclaimed on 3 July 2025. Unofficial information.",
    },
  },
  "kokusei-next": {
    ja: {
      title: "次の国政選挙",
      description: "次の衆議院議員総選挙と参議院議員通常選挙。投票日の公示はありません。非公式の情報です。",
    },
    en: {
      title: "Next national election",
      description: "The next House of Representatives and House of Councillors elections. No polling day has been proclaimed. Unofficial information.",
    },
  },
} as const;

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug: rawSlug } = await params;
  const lang = asLang(raw);
  const slug = asSlug(rawSlug);
  const path = `${japanHome(lang)}elections/${slug}/`;
  const text = COPY[slug][lang];
  return japanMetadata({
    title: text.title,
    description: text.description,
    path,
    lang,
    alternatePath: `${japanHome(lang === "ja" ? "en" : "ja")}elections/${slug}/`,
  });
}

export default async function ElectionPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug: rawSlug } = await params;
  const lang = asLang(raw);
  const slug = asSlug(rawSlug);
  const copy = ui(lang);
  const ja = lang === "ja";
  const path = `${japanHome(lang)}elections/${slug}/`;
  const office = sourceById(slug === "sangiin-2025" ? "sangiin" : "shugiin");
  return (
    <JapanFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.japan, path: "/jp/" },
        { name: ja ? "日本" : "Japan", path: japanHome(lang) },
        { name: copy.elections, path: `${japanHome(lang)}elections/` },
        { name: COPY[slug][lang].title, path },
      ]}
      title={COPY[slug][lang].title}
      officeHref={office.url}
      officeLabel={slug === "sangiin-2025" ? "参議院" : "衆議院"}
      sources={sourcesById(
        slug === "kokusei-next"
          ? ["constitution", "soumu-guide", "soumu-kinds", "shugiin-list", "sangiin-218", "shugiin-sessions"]
          : slug === "shuugiin-2026"
            ? ["shugiin-list", "shugiin-sessions", "constitution", "soumu-kinds", "soumu-guide"]
            : ["sangiin-218", "soumu-hc-2025", "constitution", "soumu-kinds", "soumu-guide"],
      )}
    >
      {slug === "shuugiin-2026" && <Shuugiin lang={lang} />}
      {slug === "sangiin-2025" && <Sangiin lang={lang} />}
      {slug === "kokusei-next" && <NextElection lang={lang} />}
      <p className="text-sm">
        <Link className="text-navy underline" href={`${japanHome(lang)}results/`}>
          {copy.results}
        </Link>
        {" · "}
        <Link className="text-navy underline" href={`${japanHome(lang)}candidates/`}>
          {copy.candidates}
        </Link>
      </p>
    </JapanFrame>
  );
}

function Shuugiin({ lang }: { lang: Lang }) {
  const ja = lang === "ja";
  return (
    <section className="prose-legal">
      <h2>{ja ? "一覧表に書いてあること" : "What the House list prints"}</h2>
      <ul>
        <li>
          {ja
            ? "第51回。解散された国会は第220回（常会）。解散の年月日は令和8年1月23日。"
            : "51st election. The dissolved Diet is the 220th (ordinary session). The dissolution date is 23 January 2026."}
        </li>
        <li>{ja ? "総選挙の期日は令和8年2月8日。" : "The election date is 8 February 2026."}</li>
        <li>
          {ja
            ? "総選挙後の国会は第221回（特別会）。召集日は令和8年2月18日。"
            : "The Diet after the election is the 221st (special session). It was convoked on 18 February 2026."}
        </li>
      </ul>
      <p>
        {ja
          ? "会期一覧は、第220回国会の会期終了の欄を「令和8年1月23日 解散」としています。第222回（臨時会）の召集日は令和8年10月5日、会期は69日で、終了日の欄は読んだ時点では空欄でした。"
          : "The session list marks the end of the 220th Diet as a dissolution on 23 January 2026. It lists the 222nd (extraordinary) session as convoked on 5 October 2026 for 69 days, and the end-date cell was empty when the page was read."}
      </p>
      <p>
        {ja
          ? "憲法第45条は、衆議院議員の任期を4年とし、解散のときはその期間が満了する前に終わると書いています。第54条は、解散の日から40日以内に総選挙を行い、その選挙の日から30日以内に国会を召集する、としています。総務省の定数の説明は、小選挙区289人と比例代表176人です。"
          : "Article 45 says the term of members of the House of Representatives is four years, and that a dissolution ends the term before it expires. Article 54 says a general election is held within 40 days of dissolution and the Diet is convoked within 30 days of the election. The Ministry’s account of the size is 289 single-member seats and 176 proportional seats."}
      </p>
      <GapNote
        label={ui(lang).gap}
        text={
          ja
            ? "党派別の当選人数は、このページでは転記しません。2026年10月17日に読んだ衆議院の一覧表は、期日を載せて、開票の表は載せていません。"
            : "Party seat totals are not copied here. The House list read on 17 October 2026 prints the date and does not print a results table."
        }
      />
    </section>
  );
}

function Sangiin({ lang }: { lang: Lang }) {
  const ja = lang === "ja";
  return (
    <section className="prose-legal">
      <h2>{ja ? "概観に書いてあること" : "What the House overview prints"}</h2>
      <p>
        {ja
          ? "参議院の国会概観は、第27回通常選挙が令和7年7月3日に公示され、7月20日に執行された、と書いています。総務省の発表資料の見出しも「令和7年7月20日執行」です。"
          : "The House of Councillors overview says the 27th ordinary election was proclaimed on 3 July 2025 and held on 20 July 2025. The Ministry’s results index is headed as held on 20 July 2025."}
      </p>
      <p>
        {ja
          ? "同じ概観は、改選数124と、東京都選挙区で通常選挙と合わせて行われた補欠選挙1を書いています。憲法第46条は、参議院議員の任期を6年とし、3年ごとに半数を改選するとしています。総務省は、解散がないこと、定数248（比例100、選挙区148）、選挙区が45であることの説明を別の資料に書いています。"
          : "The same overview prints 124 seats at the ordinary election and one by-election in the Tokyo district held with it. Article 46 says the term is six years and half the members are elected every three years. Other Ministry material describes no dissolution, a house of 248 (100 proportional, 148 from districts), and 45 districts."}
      </p>
      <p>
        {ja
          ? "概観は、議員の任期満了を令和10年7月25日と令和13年7月28日に分けて書いています。党派別の表は結果のページに、概観が総務省の結果調から作ったと書いている数字だけを転記します。"
          : "The overview splits members by term end: 25 July 2028 and 28 July 2031. The party table is on the results page, and only as the figures the overview says were compiled from the Ministry’s results report."}
      </p>
    </section>
  );
}

function NextElection({ lang }: { lang: Lang }) {
  const ja = lang === "ja";
  const copy = ui(lang);
  return (
    <section className="prose-legal">
      <h2>{ja ? "衆議院" : "House of Representatives"}</h2>
      <p>
        {ja
          ? "直近の総選挙は令和8年2月8日です。憲法第45条の任期は4年で、解散があればそれより前に終わります。総務省の案内の表は、任期満了による総選挙を任期が終わる日の前30日以内、解散による総選挙を解散の日から40日以内とし、衆議院の公示は投票日の少なくとも12日前、としています。"
          : "The latest general election was on 8 February 2026. Article 45 sets a four-year term, which ends sooner if the House is dissolved. The table in the Ministry’s guide places an expiry election within 30 days before the term ends, a dissolution election within 40 days of dissolution, and the House proclamation at least 12 days before polling day."}
      </p>
      <GapNote label={copy.gap} text={copy.nextElectionGap} />
      <p>
        {ja
          ? "衆議院の総選挙一覧表は、第51回の期日を載せ、その回の議員の任期が終わる日は載せていません。このページは、選挙の日から4年を数えて投票日にしません。"
          : "The House election list prints the date of the 51st election and does not print the day the members elected that day leave office. This page does not count four years from the election and call the result a polling day."}
      </p>
      <h2>{ja ? "参議院" : "House of Councillors"}</h2>
      <p>
        {ja
          ? "参議院の概観は、一部の議員の任期満了を令和10年7月25日、別の一部を令和13年7月28日としています。総務省の案内の表は、参議院の任期満了による選挙を任期が終わる日の前30日以内とし、公示は投票日の少なくとも17日前としています。同じ「選挙の種類」のページは、参議院に解散はない、と書いています。"
          : "The House of Councillors overview gives 25 July 2028 as the term end for one group of members and 28 July 2031 for the other. The table in the Ministry’s guide places an expiry election within 30 days before the term ends, and the proclamation at least 17 days before polling day. The Ministry’s page on kinds of elections says the House of Councillors is not dissolved."}
      </p>
      <p>
        {ja
          ? "案内の表のとおりに読むと、令和10年7月25日に任期が終わる議員の通常選挙は、その日の前30日以内です。このページは、その幅の中から1日を選びません。"
          : "Read as that table is printed, the ordinary election for the members whose term ends on 25 July 2028 falls within the 30 days before that date. This page does not pick one day inside that window."}
      </p>
      <p>
        <Link className="text-navy underline" href={`${japanHome(lang)}elections/shuugiin-2026/`}>
          {ja ? "第51回の記録" : "Record of the 51st election"}
        </Link>
        {" · "}
        <Link className="text-navy underline" href={`${japanHome(lang)}elections/sangiin-2025/`}>
          {ja ? "第27回の記録" : "Record of the 27th election"}
        </Link>
      </p>
    </section>
  );
}
