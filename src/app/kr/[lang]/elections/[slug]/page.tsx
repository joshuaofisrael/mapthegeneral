import Link from "@/components/AnchorLink";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { KoreaFrame } from "@/app/kr/frame";
import { krPageMetadata } from "@/data/kr/metadata";
import { NA_ELECTION_SLUG, asKrLang, electionsPath, formatKrDate, krHome, krRoot, naElectionPath, sectionPath } from "@/data/kr/paths";
import { sourceById, sourcesById } from "@/data/kr/sources";
import { ui } from "@/data/kr/ui";

export function generateStaticParams() {
  return [
    { lang: "ko", slug: NA_ELECTION_SLUG },
    { lang: "en", slug: NA_ELECTION_SLUG },
  ];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang = asKrLang(raw);
  if (slug !== NA_ELECTION_SLUG) return {};
  const path = naElectionPath(lang);
  return krPageMetadata({
    title: lang === "ko" ? "국회의원선거, 2028년 4월 12일" : "National Assembly election, 12 April 2028",
    description:
      lang === "ko"
        ? "제22대 임기 만료일과 공직선거법 제34조에서 얻은 2028년 4월 12일. 비공식 정보입니다."
        : "12 April 2028, from the 22nd-term expiry date and article 34 of the Public Official Election Act. Unofficial information.",
    path,
    lang,
    alternatePath: naElectionPath(lang === "ko" ? "en" : "ko"),
  });
}

export default async function ElectionPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang = asKrLang(raw);
  if (slug !== NA_ELECTION_SLUG) notFound();
  const copy = ui(lang);
  const path = naElectionPath(lang);
  const ko = lang === "ko";
  const nec = sourceById("nec-home");
  const day = formatKrDate("2028-04-12", lang);
  return (
    <KoreaFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.korea, path: krRoot() },
        { name: ko ? "대한민국" : "South Korea", path: krHome(lang) },
        { name: copy.elections, path: electionsPath(lang) },
        { name: day, path },
      ]}
      eyebrow={ko ? "임기만료에 의한 선거" : "Election on expiry of the term"}
      title={ko ? "국회의원선거, 2028년 4월 12일" : "National Assembly election of 12 April 2028"}
      lede={
        ko
          ? "이 날짜는 국회회의록에 적힌 제22대 임기 만료일과 공직선거법 제34조제1항제2호로 계산한 것입니다."
          : "This date is calculated from the 22nd-term expiry printed in the National Assembly minutes index and article 34(1)2 of the Public Official Election Act."
      }
      officeHref={nec.url}
      officeLabel="중앙선거관리위원회"
      sources={sourcesById(["election-act-34", "assembly-term-22", "assembly-members", "nec-home"])}
    >
      <section className="prose-legal">
        <h2>{ko ? "조문이 정하는 날" : "The day the article sets"}</h2>
        <p>
          {ko
            ? "2026년 10월 2일 시행 공직선거법(법률 제22052호, 2026. 9. 29. 일부개정) 제34조제1항은 임기만료에 의한 선거의 선거일을 이렇게 적습니다. 대통령선거는 임기만료일 전 70일 이후 첫 번째 수요일. 국회의원선거는 임기만료일 전 50일 이후 첫 번째 수요일. 지방의회의원 및 지방자치단체의 장의 선거는 임기만료일 전 30일 이후 첫 번째 수요일."
            : "Article 34(1) of the Public Official Election Act in force from 2 October 2026 (Act No. 22052, partially amended on 29 September 2026) sets the polling days of elections held because a term is expiring. The presidential election is the first Wednesday from the day 70 days before the term expires. The National Assembly election is the first Wednesday from the day 50 days before the term expires. The election of local councillors and local-government heads is the first Wednesday from the day 30 days before the term expires."}
        </p>
        <ul>
          <li>
            {ko
              ? "국회회의록은 제22대를 2024.05.30.~2028.05.29.로 적습니다. 만료일은 2028년 5월 29일, 월요일입니다."
              : "The minutes index prints the 22nd term as 2024.05.30.–2028.05.29. The expiry date is Monday 29 May 2028."}
          </li>
          <li>
            {ko
              ? "그 50일 전은 2028년 4월 9일, 일요일입니다."
              : "The day 50 days before that is Sunday 9 April 2028."}
          </li>
          <li>
            {ko
              ? `그 이후 첫 번째 수요일은 ${day}입니다.`
              : `The first Wednesday from that day is ${day}.`}
          </li>
        </ul>
        <p>
          {ko
            ? "제34조제2항은 제1항의 선거일이 국민생활과 밀접한 관련이 있는 민속절 또는 공휴일인 때와, 선거일 전날이나 그 다음 날이 공휴일인 때에는 그 다음 주 수요일로 한다고 적습니다. 2028년의 공휴일표를 읽지 않았습니다. 4월 11일, 12일, 13일이 그 항에 해당하는지는 이 페이지가 판단하지 않습니다. 적는 날짜는 제1항의 날짜입니다."
            : "Article 34(2) says that when the day under paragraph 1 is a folk holiday closely tied to daily life or a public holiday, or when the day before or the day after is a public holiday, the election moves to the Wednesday of the next week. No 2028 public-holiday table was read. This page does not decide whether 11, 12, or 13 April falls under that paragraph. The date it prints is the date under paragraph 1."}
        </p>
        <h2>{ko ? "정수" : "Size of the chamber"}</h2>
        <p>
          {ko
            ? "국회 페이지는 의원수를 300인으로 적고, 그 가운데 지역구 254인, 비례대표 46인이라고 적습니다. 지역구는 그 국회의원지역구에서 유효투표의 다수를 얻은 사람을 당선인으로 결정한다고 적습니다. 비례대표는 의석할당정당이 비례대표 국회의원 선거에서 얻은 득표 비율에 따라 배분한다고 적습니다. 별표의 선거구 구역은 옮기지 않습니다."
            : "The National Assembly page says the chamber has 300 members, of whom 254 are constituency members and 46 are proportional members. It says a constituency member is the person with the most valid votes in that constituency. It says proportional seats are distributed by the share of the vote won by parties allocated seats. The annexed table of constituency boundaries is not copied."}
        </p>
      </section>
      <GapNote label={copy.gap} text={copy.candidateGap} />
      <p className="text-sm">
        <Link className="text-navy underline" href={sectionPath(lang, "results")}>
          {copy.results}
        </Link>
        {" · "}
        <Link className="text-navy underline" href={sectionPath(lang, "candidates")}>
          {copy.candidates}
        </Link>
      </p>
    </KoreaFrame>
  );
}
