import Link from "@/components/AnchorLink";
import { GapNote } from "@/components/GapNote";
import { LinkGrid } from "@/components/LinkGrid";
import { KoreaFrame } from "@/app/kr/frame";
import {
  ADMIN_SI_TOTAL,
  BASIC_LOCAL_TOTAL,
  DONG_TOTAL,
  EUP_MYEON_DONG_TOTAL,
  EUP_TOTAL,
  GU_TOTAL,
  GUN_TOTAL,
  MYEON_TOTAL,
  NON_AUTO_GU_TOTAL,
  REGIONS,
  SI_TOTAL,
  alphaRegions,
} from "@/data/kr/places";
import { asKrLang, constituencyIndexPath, formatKrDate, formatKrNumber, krHome, krRoot, localIndexPath, naElectionPath, regionPath, sectionPath } from "@/data/kr/paths";
import { sourceById, sourcesById } from "@/data/kr/sources";
import { ui } from "@/data/kr/ui";
import { krPageMetadata } from "@/data/kr/metadata";

const nec = sourceById("nec-home");

export function generateStaticParams() {
  return [{ lang: "ko" }, { lang: "en" }];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asKrLang((await params).lang);
  const path = krHome(lang);
  return krPageMetadata({
    title: lang === "ko" ? "대한민국" : "South Korea",
    description:
      lang === "ko"
        ? "2028년 4월 12일 국회의원선거, 상급 지방자치단체 16곳. 비공식 정보입니다."
        : "National Assembly election of 12 April 2028 and 16 upper-level local governments. Unofficial information.",
    path,
    lang,
    alternatePath: krHome(lang === "ko" ? "en" : "ko"),
  });
}

export default async function KoreaNationalPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asKrLang((await params).lang);
  const copy = ui(lang);
  const path = krHome(lang);
  const ko = lang === "ko";
  const sources = sourcesById([
    "election-act-34",
    "election-act-22052",
    "special-act-21446",
    "assembly-members",
    "assembly-term-22",
    "nec-local-2026",
    "nec-president-2025",
    "mois-district-2025",
    "nec-winners-2026",
    "nec-na-2024-districts",
    "assembly-member-search",
  ]);

  return (
    <KoreaFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.korea, path: krRoot() },
        { name: ko ? "대한민국" : "South Korea", path },
      ]}
      eyebrow={ko ? "국회의원선거 · 2028년 4월 12일" : "National Assembly · 12 April 2028"}
      title={ko ? "대한민국" : "South Korea"}
      lede={
        ko
          ? "국회회의록이 적는 제22대 임기 만료일과 공직선거법 제34조를 적용하면, 다음 임기만료 국회의원선거의 선거일은 2028년 4월 12일입니다."
          : "Applying the 22nd-term expiry date printed by the National Assembly minutes index and article 34 of the Public Official Election Act gives 12 April 2028 as the polling day of the next National Assembly election held because the term is expiring."
      }
      officeHref={nec.url}
      officeLabel="중앙선거관리위원회"
      sources={sources}
    >
      <section className="prose-legal">
        <h2>{ko ? "다음 국회의원선거" : "Next National Assembly election"}</h2>
        <p>
          {ko
            ? `국회회의록의 제22대 색인은 임기를 2024.05.30.~2028.05.29.로 적습니다. 공직선거법 제34조제1항제2호는 국회의원선거의 선거일을 임기만료일 전 50일 이후 첫 번째 수요일로 정합니다. 2028년 5월 29일의 50일 전은 2028년 4월 9일, 일요일이고, 그 이후 첫 번째 수요일은 ${formatKrDate("2028-04-12", lang)}입니다.`
            : `The National Assembly minutes index prints the 22nd term as 2024.05.30.–2028.05.29. Article 34(1)2 of the Public Official Election Act sets the National Assembly polling day as the first Wednesday from the day 50 days before the term expires. Fifty days before 29 May 2028 is Sunday 9 April 2028. The first Wednesday from that day is ${formatKrDate("2028-04-12", lang)}.`}
        </p>
        <p>
          {ko
            ? "같은 조 제2항은 그 선거일이 민속절이나 공휴일인 때, 또는 그 전날이나 다음 날이 공휴일인 때에는 다음 주 수요일로 한다고 적습니다. 2028년 공휴일표를 읽지 않았으므로 이 페이지는 그 연기를 적용하지 않습니다. 제1항으로 얻은 날짜를 적습니다."
            : "Paragraph 2 of the same article says the day moves to the Wednesday of the next week when the polling day is a folk holiday or a public holiday, or when the day before or the day after is a public holiday. No 2028 public-holiday table was read, so this page does not apply that postponement. It prints the day given by paragraph 1."}
        </p>
        <p>
          <Link className="text-navy underline" href={naElectionPath(lang)}>
            {ko ? "이 선거의 페이지" : "Page for this election"}
          </Link>
        </p>
        <h2>{ko ? "국회" : "National Assembly"}</h2>
        <p>
          {ko
            ? "국회가 게시한 국회의원 선출 표는 임기 4년, 의원수 300인(지역구 254인, 비례대표 46인)이라고 적습니다. 선거권과 피선거권은 만 18세 이상이라고 적습니다. 선거통계시스템의 제22대 지역구 목록은 254개 이름입니다. 2026년 10월 18일 열린국회정보 검색은 지역구 253행과 비례대표 46행입니다. 이름은 지역구 페이지에 있습니다."
            : "The National Assembly’s member-election table says the term is four years and the chamber has 300 members (254 from constituencies and 46 proportional representatives). It says the voting age and the age to stand are 18. The election-statistics list for the 22nd term has 254 constituency names. The National Assembly search on 18 October 2026 returned 253 constituency rows and 46 proportional rows. The names are on the constituency pages."}
        </p>
        <h2>{ko ? "대통령과 국무총리" : "President and Prime Minister"}</h2>
        <p>
          {ko
            ? "2026년 9월 29일 법률 제22052호 공직선거법 일부개정법률 공포문은 대통령 이재명, 국무총리 한성숙이라고 적습니다. 같은 제정·개정문 목록에서 2026년 6월 2일 법률 제21754호의 공포문은 국무총리 김민석이라고 적습니다. 이 페이지는 그 문서에 인쇄된 이름을 전합니다. 2026년 10월 17일의 국무위원 명단으로 삼지는 않습니다."
            : "The promulgation of Act No. 22052 of 29 September 2026, amending the Public Official Election Act, prints President 이재명 and Prime Minister 한성숙. In the same list of promulgations, Act No. 21754 of 2 June 2026 prints Prime Minister 김민석. This page reports the names those instruments print. It does not treat them as a list of ministers in office on 17 October 2026."}
        </p>
        <p>
          {ko
            ? "중앙선거관리위원회 선거통계시스템은 제21대 대통령선거를 2025년 6월 3일로 표시합니다. 다음 대통령선거의 달력 날짜는 여기에 계산하지 않습니다. 제34조제1항제1호가 그 규칙을 정합니다."
            : "The National Election Commission’s election-statistics system heads the 21st presidential election as 3 June 2025. The calendar day of the next presidential election is not calculated here. Article 34(1)1 states the rule."}
        </p>
        <h2>{ko ? "최근 지방선거" : "Latest local elections"}</h2>
        <p>
          {ko
            ? "중앙선거관리위원회의 제9회 전국동시지방선거 주요사무일정은 실시일을 2026-06-03으로 적습니다. 당선인명부의 구·시·군의 장선거는 227행입니다. 성명과 정당은 시·군·구 페이지에 있고, 생년월일과 주소는 옮기지 않습니다."
            : "The National Election Commission’s schedule for the 9th nationwide simultaneous local elections prints the polling day as 2026-06-03. The winner roster has 227 rows for the election of heads of si, gun, and gu. Name and party are on the si, gun, and gu pages. Birth date and address are not copied."}
        </p>
        <GapNote label={copy.gap} text={copy.nextLocalGap} />
        <h2>{ko ? "행정구역" : "Administrative areas"}</h2>
        <p>
          {ko
            ? `행정안전부 책자 「지방자치단체 행정구역 및 인구 현황」(2025. 12. 31. 현재)의 1-1 총괄은 시·군·구 ${formatKrNumber(BASIC_LOCAL_TOTAL, lang)}(시 ${formatKrNumber(SI_TOTAL, lang)}, 군 ${formatKrNumber(GUN_TOTAL, lang)}, 구 ${formatKrNumber(GU_TOTAL, lang)}), 행정시 ${formatKrNumber(ADMIN_SI_TOTAL, lang)}, 자치구가 아닌 구 ${formatKrNumber(NON_AUTO_GU_TOTAL, lang)}, 읍·면·동 ${formatKrNumber(EUP_MYEON_DONG_TOTAL, lang)}(읍 ${formatKrNumber(EUP_TOTAL, lang)}, 면 ${formatKrNumber(MYEON_TOTAL, lang)}, 동 ${formatKrNumber(DONG_TOTAL, lang)})을 적습니다. 같은 표의 합계 줄은 계(17)이라고 적고, 각주는 특별시 1, 광역시 6, 특별자치시 1, 도 6, 특별자치도 3이라고 적습니다. 목차의 시·도별 장은 16개이고, 그중 하나가 전남광주통합특별시입니다.`
            : `Table 1-1 of the Ministry of the Interior and Safety book Administrative areas and population of local governments (as of 31 December 2025) prints ${formatKrNumber(BASIC_LOCAL_TOTAL, lang)} si, gun, and gu (si ${formatKrNumber(SI_TOTAL, lang)}, gun ${formatKrNumber(GUN_TOTAL, lang)}, gu ${formatKrNumber(GU_TOTAL, lang)}), ${formatKrNumber(ADMIN_SI_TOTAL, lang)} administrative si, ${formatKrNumber(NON_AUTO_GU_TOTAL, lang)} gu that are not autonomous, and ${formatKrNumber(EUP_MYEON_DONG_TOTAL, lang)} eup, myeon, and dong (eup ${formatKrNumber(EUP_TOTAL, lang)}, myeon ${formatKrNumber(MYEON_TOTAL, lang)}, dong ${formatKrNumber(DONG_TOTAL, lang)}). The total line of that table prints 계(17). Its note prints one special city, six metropolitan cities, one special self-governing city, six provinces, and three special self-governing provinces. The table of contents has 16 metropolitan and provincial chapters, one of them 전남광주통합특별시.`}
        </p>
        <p>
          {ko
            ? "머리말은 전남광주통합특별시가 2026. 7. 1. 출범했고, 1장과 2장에서는 기존 광주광역시와 전라남도 통계를 합산해 적었다고 합니다. 법률 제21446호 전남광주통합특별시 설치를 위한 특별법은 2026년 7월 1일부터 시행한다고 적고, 통합특별시의 장과 의원 선거는 그 전에 실시하는 임기만료 지방선거의 선거일에 하며, 폐지되는 지방자치단체의 장과 의원 선거는 하지 않는다고 적습니다."
            : "The preface says 전남광주통합특별시 launched on 1 July 2026 and that chapters 1 and 2 add the former Gwangju Metropolitan City and Jeollanam-do figures together. Act No. 21446, the special act establishing that city, says it takes effect on 1 July 2026, that the election of its head and councillors is held on the polling day of the term-expiry local elections held before that date, and that elections for the heads and councillors of the abolished local governments are not held."}
        </p>
        <GapNote label={copy.gap} text={copy.populationGap} />
        <GapNote label={copy.gap} text={copy.localPagesGap} />
        <GapNote label={copy.gap} text={copy.postcodeGap} />
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-2xl font-semibold">{ko ? "후보자, 정당, 결과" : "Candidates, parties, and results"}</h2>
        <GapNote label={copy.gap} text={copy.candidateGap} />
        <p className="text-sm">
          <Link className="text-navy underline" href={sectionPath(lang, "parties")}>
            {copy.parties}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={sectionPath(lang, "candidates")}>
            {copy.candidates}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={sectionPath(lang, "results")}>
            {copy.results}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={sectionPath(lang, "faq")}>
            {copy.faq}
          </Link>
          {" · "}
          <Link className="text-navy underline" href={sectionPath(lang, "sources")}>
            {copy.sources}
          </Link>
        </p>
      </section>

      <p className="text-sm">
        <Link className="text-navy underline" href={localIndexPath(lang)}>
          {ko ? "시·군·구" : "Si, gun, and gu"}
        </Link>
        {" · "}
        <Link className="text-navy underline" href={constituencyIndexPath(lang)}>
          {ko ? "국회의원 지역구" : "National Assembly constituencies"}
        </Link>
      </p>
      <LinkGrid
        heading={copy.regions}
        items={alphaRegions().map((region) => ({
          href: regionPath(lang, region.slug),
          title: region.officialName,
          detail: ko ? region.kindKo : region.kindEn,
        }))}
      />
      <p className="text-sm text-ink-muted">
        {ko
          ? `목차의 장 ${formatKrNumber(REGIONS.length, lang)}개. 배열은 한글 가나다순입니다.`
          : `${formatKrNumber(REGIONS.length, lang)} chapters from the table of contents, listed in Korean alphabetical order.`}
      </p>
    </KoreaFrame>
  );
}
