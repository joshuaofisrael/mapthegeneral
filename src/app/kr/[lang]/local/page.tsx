import Link from "@/components/AnchorLink";
import { LinkGrid } from "@/components/LinkGrid";
import { KoreaFrame } from "@/app/kr/frame";
import { BOOK_LOCAL_COUNT, ROSTER_ONLY_COUNT, unitsInRegion } from "@/data/kr/level2";
import { krPageMetadata } from "@/data/kr/metadata";
import { alphaRegions } from "@/data/kr/places";
import { asKrLang, formatKrNumber, krHome, krRoot, localPath, regionPath, sectionPath } from "@/data/kr/paths";
import { sourcesById } from "@/data/kr/sources";
import { ui } from "@/data/kr/ui";

export function generateStaticParams() {
  return [{ lang: "ko" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asKrLang((await params).lang);
  const path = `${krHome(lang)}local/`;
  return krPageMetadata({
    title: lang === "ko" ? "시·군·구" : "Si, gun, and gu",
    description:
      lang === "ko"
        ? "행정안전부 7-5의 기초자치단체 226곳과, 당선인명부에만 있는 인천 이름 3곳."
        : "226 basic governments from section 7-5, plus 3 Incheon names that appear only on the winner roster.",
    path,
    lang,
    alternatePath: `${krHome(lang === "ko" ? "en" : "ko")}local/`,
  });
}

export default async function LocalIndexPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asKrLang((await params).lang);
  const ko = lang === "ko";
  const copy = ui(lang);
  const path = `${krHome(lang)}local/`;
  return (
    <KoreaFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.korea, path: krRoot() },
        { name: ko ? "대한민국" : "South Korea", path: krHome(lang) },
        { name: ko ? "시·군·구" : "Si, gun, and gu", path },
      ]}
      title={ko ? "시·군·구" : "Si, gun, and gu"}
      lede={
        ko
          ? `7-5의 기초자치단체 ${formatKrNumber(BOOK_LOCAL_COUNT, lang)}곳. 당선인명부에만 있는 이름 ${formatKrNumber(ROSTER_ONLY_COUNT, lang)}곳. 인천광역시 중구와 동구는 법률 제20161호에 따라 2026년 7월 1일 폐지되어 이 목록에 페이지가 없습니다.`
          : `${formatKrNumber(BOOK_LOCAL_COUNT, lang)} basic governments in section 7-5. ${formatKrNumber(ROSTER_ONLY_COUNT, lang)} names that appear only on the winner roster. Incheon’s 중구 and 동구 were abolished on 1 July 2026 under Law No. 20161 and have no page here.`
      }
      officeHref="https://www.nec.go.kr/"
      officeLabel="중앙선거관리위원회"
      sources={sourcesById(["mois-district-2025", "nec-winners-2026", "nec-local-2026"])}
    >
      <p className="text-sm">
        <Link className="text-navy underline" href={krHome(lang)}>
          {ko ? "대한민국" : "South Korea"}
        </Link>
        {" · "}
        <Link className="text-navy underline" href={sectionPath(lang, "constituencies")}>
          {ko ? "국회의원 지역구" : "Constituencies"}
        </Link>
      </p>
      {alphaRegions().map((region) => (
        <LinkGrid
          key={region.slug}
          heading={region.officialName}
          items={unitsInRegion(region.slug).map((unit) => ({
            href: localPath(lang, region.slug, unit.slug),
            title: unit.name,
            detail: unit.inBook ? (ko ? "7-5" : "Section 7-5") : ko ? "당선인명부" : "Winner roster",
          }))}
        />
      ))}
      <p className="text-sm">
        {ko ? "이 목록에 기초자치단체가 없는 상위 단체: " : "Upper-level governments with no basic government in this list: "}
        <Link className="text-navy underline" href={regionPath(lang, "sejong")}>
          세종특별자치시
        </Link>
        {" · "}
        <Link className="text-navy underline" href={regionPath(lang, "jeju")}>
          제주특별자치도
        </Link>
      </p>
    </KoreaFrame>
  );
}
