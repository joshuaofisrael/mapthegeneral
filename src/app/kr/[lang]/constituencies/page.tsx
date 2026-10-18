import Link from "@/components/AnchorLink";
import { LinkGrid } from "@/components/LinkGrid";
import { KoreaFrame } from "@/app/kr/frame";
import { CONSTITUENCIES, constituenciesInRegion } from "@/data/kr/level2";
import { krPageMetadata } from "@/data/kr/metadata";
import { alphaRegions } from "@/data/kr/places";
import {
  asKrLang,
  constituencyPath,
  formatKrNumber,
  krHome,
  krRoot,
  regionPath,
  sectionPath,
} from "@/data/kr/paths";
import { sourcesById } from "@/data/kr/sources";
import { ui } from "@/data/kr/ui";

export function generateStaticParams() {
  return [{ lang: "ko" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asKrLang((await params).lang);
  const path = `${krHome(lang)}constituencies/`;
  return krPageMetadata({
    title: lang === "ko" ? "국회의원 지역구" : "National Assembly constituencies",
    description:
      lang === "ko"
        ? "제22대 국회의원지역구 254곳. 이름은 중앙선거관리위원회 목록이고, 현직 의원은 열린국회정보 검색입니다."
        : "254 constituencies of the 22nd National Assembly. Names are from the National Election Commission list. Current members are from the National Assembly search.",
    path,
    lang,
    alternatePath: `${krHome(lang === "ko" ? "en" : "ko")}constituencies/`,
  });
}

export default async function ConstituencyIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asKrLang((await params).lang);
  const ko = lang === "ko";
  const copy = ui(lang);
  const path = `${krHome(lang)}constituencies/`;
  const withMember = CONSTITUENCIES.filter((row) => row.member).length;
  return (
    <KoreaFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.korea, path: krRoot() },
        { name: ko ? "대한민국" : "South Korea", path: krHome(lang) },
        { name: ko ? "국회의원 지역구" : "National Assembly constituencies", path },
      ]}
      title={ko ? "국회의원 지역구" : "National Assembly constituencies"}
      lede={
        ko
          ? `선관위 목록 ${formatKrNumber(CONSTITUENCIES.length, lang)}곳. 국회 검색의 지역구 의원 ${formatKrNumber(withMember, lang)}명.`
          : `${formatKrNumber(CONSTITUENCIES.length, lang)} names on the National Election Commission list. ${formatKrNumber(withMember, lang)} constituency members in the National Assembly search.`
      }
      officeHref="https://www.assembly.go.kr/"
      officeLabel="대한민국 국회"
      sources={sourcesById(["nec-na-2024-districts", "nec-na-2024-date", "assembly-member-search", "assembly-members"])}
    >
      <p className="text-sm">
        <Link className="text-navy underline" href={krHome(lang)}>
          {ko ? "대한민국" : "South Korea"}
        </Link>
        {" · "}
        <Link className="text-navy underline" href={sectionPath(lang, "local")}>
          {ko ? "시·군·구" : "Si, gun, and gu"}
        </Link>
      </p>
      {alphaRegions().map((region) => (
        <LinkGrid
          key={region.slug}
          heading={region.officialName}
          items={constituenciesInRegion(region.slug).map((row) => ({
            href: constituencyPath(lang, row.slug),
            title: row.name,
            detail: row.member ? row.member.name : ko ? "검색에 지역구 의원 없음" : "No constituency member in the search",
          }))}
        />
      ))}
      <p className="text-sm text-ink-muted">
        <Link className="text-navy underline" href={regionPath(lang, "gangwon")}>
          강원특별자치도
        </Link>
        {ko
          ? " 의 강릉시는 국회 검색의 지역구 행이 없는 선거구입니다."
          : " includes 강릉시, the constituency with no constituency row in the National Assembly search."}
      </p>
    </KoreaFrame>
  );
}
