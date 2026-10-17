import Link from "next/link";
import { GapNote } from "@/components/GapNote";
import { LinkGrid } from "@/components/LinkGrid";
import { JapanFrame } from "../frame";
import { formatNumber } from "../../../../data/jp/format";
import { japanHome, prefecturePath } from "../../../../data/jp/paths";
import { BLOCKS, CENSUS_NATIONAL_POPULATION, PREFECTURES } from "../../../../data/jp/places";
import { sourceById, sourcesById } from "../../../../data/jp/sources";
import type { Lang } from "../../../../data/jp/types";
import { ui } from "../../../../data/jp/ui";
import { japanMetadata } from "../../../../data/jp/seo";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [{ lang: "ja" }, { lang: "en" }];
}
export const dynamicParams = false;

function asLang(value: string): Lang {
  if (value !== "ja" && value !== "en") notFound();
  return value;
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  return japanMetadata({
    title: lang === "ja" ? "日本" : "Japan",
    description:
      lang === "ja"
        ? "衆議院と参議院、47都道府県。第51回衆議院議員総選挙は2026年2月8日。非公式の情報です。"
        : "The House of Representatives, the House of Councillors, and 47 prefectures. The 51st general election was on 8 February 2026. Unofficial information.",
    path: japanHome(lang),
    lang,
    alternatePath: japanHome(lang === "ja" ? "en" : "ja"),
  });
}

export default async function JapanNationalPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asLang((await params).lang);
  const copy = ui(lang);
  const ja = lang === "ja";
  const path = japanHome(lang);
  const office = sourceById("soumu-senkyo");
  return (
    <JapanFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.japan, path: "/jp/" },
        { name: ja ? "日本" : "Japan", path },
      ]}
      eyebrow={ja ? "国政 · 衆議院と参議院" : "National · both houses"}
      title={ja ? "日本" : "Japan"}
      lede={
        ja
          ? "衆議院の一覧表は、第51回総選挙の期日を令和8年2月8日と書いています。解散は第220回国会、令和8年1月23日です。"
          : "The House of Representatives list prints 8 February 2026 (Reiwa 8) as the date of the 51st general election. The dissolution is the 220th Diet, 23 January 2026."
      }
      officeHref={office.url}
      officeLabel="総務省"
      sources={sourcesById([
        "constitution",
        "soumu-kinds",
        "soumu-guide",
        "shugiin-list",
        "shugiin-sessions",
        "sangiin-218",
        "soumu-hc-2025",
        "kantei-roster",
        "kantei-designate",
        "census-outline",
        "census-results",
      ])}
    >
      <section className="prose-legal">
        <h2>{ja ? "国会" : "The Diet"}</h2>
        <p>
          {ja
            ? "日本国憲法第41条は、国会を国権の最高機関であり国の唯一の立法機関だとしています。第42条は、国会を衆議院と参議院で構成するとしています。第43条は、両議院を全国民を代表する選挙された議員で組織し、定数は法律で定めるとしています。"
            : "Article 41 of the Constitution says the Diet is the highest organ of state power and the sole law-making organ. Article 42 says the Diet consists of the House of Representatives and the House of Councillors. Article 43 says both houses are made up of elected members representative of all the people, and that the number of members is fixed by law."}
        </p>
        <p>
          {ja
            ? "総務省の「選挙の種類」は、衆議院議員の定数を465人とし、うち289人が小選挙区選出、176人が比例代表選出だと書いています。参議院議員の定数は248人で、うち100人が比例代表選出、148人が選挙区選出です。同じページは、鳥取県・島根県と徳島県・高知県が、それぞれ2県で一つの選挙区だと書いています。"
            : "The Ministry of Internal Affairs and Communications’ page on kinds of elections says the House of Representatives has 465 members, 289 from single-member districts and 176 from proportional representation. It says the House of Councillors has 248 members, 100 proportional and 148 from electoral districts. The same page says Tottori and Shimane form one district, and Tokushima and Kochi form one district."}
        </p>
        <p>
          <Link className="text-navy underline" href={`${path}elections/shuugiin-2026/`}>
            {ja ? "第51回衆議院議員総選挙" : "51st House of Representatives election"}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={`${path}elections/sangiin-2025/`}>
            {ja ? "第27回参議院議員通常選挙" : "27th House of Councillors election"}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={`${path}elections/kokusei-next/`}>
            {ja ? "次の国政選挙" : "Next national election"}
          </Link>
        </p>
      </section>

      <section className="prose-legal">
        <h2>{ja ? "内閣総理大臣" : "Prime Minister"}</h2>
        <p>
          {ja
            ? "首相官邸は、令和8年2月18日の指名で高市早苗が第105代の内閣総理大臣になったと書いています。閣僚名簿の見出しは「第2次高市改造内閣」で、令和8年9月17日発足、令和8年10月15日現在、とあります。名簿の内閣総理大臣の欄は「高市 早苗」です。このページは名簿の他の欄を転記しません。"
            : "The Prime Minister’s Office says Takaichi Sanae was designated the 105th Prime Minister on 18 February 2026. The roster heading is “第2次高市改造内閣”, formed on 17 September 2026, as of 15 October 2026. The Prime Minister row prints 高市 早苗. This page does not copy the other rows."}
        </p>
        <GapNote
          label={copy.gap}
          text={
            ja
              ? "衆議院議長と参議院議長の氏名は、このページでは転記しません。各議院のサイトにあります。"
              : "The names of the Speaker of the House of Representatives and the President of the House of Councillors are not copied here. Each house publishes them."
          }
        />
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">{ja ? "比例代表のブロック" : "Proportional blocks"}</h2>
        <p className="mt-2 text-sm leading-6 text-ink-muted">
          {ja
            ? "定数は総務省の表です。11ブロックの合計は176です。"
            : "The seat numbers are the Ministry’s table. The 11 blocks add up to 176."}
        </p>
        <table className="fact-table mt-3">
          <thead>
            <tr>
              <th scope="col">{ja ? "表の名称" : "Name in the table"}</th>
              <th scope="col">{ja ? "定数" : "Seats"}</th>
            </tr>
          </thead>
          <tbody>
            {BLOCKS.map((block) => (
              <tr key={block.id}>
                <td>{block.nameJa}</td>
                <td>{formatNumber(block.seats, lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="prose-legal">
        <h2>{ja ? "人口" : "Population"}</h2>
        <p>
          {ja
            ? `令和7年国勢調査の人口速報集計は、2025年10月1日現在の全国を ${formatNumber(CENSUS_NATIONAL_POPULATION, lang)} 人としています。概要は令和8年5月29日の公表です。概要は、速報が後日の確定数と一致するとは限らない、と書いています。統計局の結果ページは、人口等基本集計の公表時期を令和8年9月29日としています。このページの数字は、その基本集計のファイルではなく、5月29日の概要の表です。47行の合計は全国の数字と同じです。`
            : `The preliminary count of the 2025 Population Census gives a national population of ${formatNumber(CENSUS_NATIONAL_POPULATION, lang)} at 1 October 2025. The outline is dated 29 May 2026. It says the preliminary count need not match the later final count. The Statistics Bureau’s results page lists 29 September 2026 as the release of the basic population tabulation. The figures here are the 29 May outline, not that later file. The 47 prefecture rows add up to the national figure.`}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-semibold">{ja ? "候補者と結果" : "Candidates and results"}</h2>
        <GapNote label={copy.gap} text={copy.candidateGap} />
        <p className="text-sm">
          <Link className="text-navy underline" href={`${path}parties/`}>{copy.parties}</Link>
          {" · "}
          <Link className="text-navy underline" href={`${path}candidates/`}>{copy.candidates}</Link>
          {" · "}
          <Link className="text-navy underline" href={`${path}results/`}>{copy.results}</Link>
          {" · "}
          <Link className="text-navy underline" href={`${path}faq/`}>{copy.faq}</Link>
          {" · "}
          <Link className="text-navy underline" href={`${path}sources/`}>{copy.sources}</Link>
        </p>
        <GapNote label={copy.gap} text={copy.localGap} />
        <GapNote label={copy.gap} text={copy.postcodeGap} />
      </section>

      <LinkGrid
        heading={copy.prefectures}
        items={PREFECTURES.map((prefecture) => ({
          href: prefecturePath(lang, prefecture.slug),
          title: prefecture.officialName,
          detail: ja ? formatNumber(prefecture.population, lang) : `${prefecture.englishName} · ${formatNumber(prefecture.population, lang)}`,
        }))}
      />
    </JapanFrame>
  );
}
