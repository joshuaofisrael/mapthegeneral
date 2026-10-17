import { GapNote } from "@/components/GapNote";
import { LinkGrid } from "@/components/LinkGrid";
import { KoreaFrame } from "@/app/kr/frame";
import { krPageMetadata } from "@/data/kr/metadata";
import { alphaRegions } from "@/data/kr/places";
import { asKrLang, krHome, krRoot, regionPath, sectionPath } from "@/data/kr/paths";
import { sourceById, sourcesById } from "@/data/kr/sources";
import { ui } from "@/data/kr/ui";

export function generateStaticParams() {
  return [{ lang: "ko" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asKrLang((await params).lang);
  const path = sectionPath(lang, "candidates");
  return krPageMetadata({
    title: lang === "ko" ? "후보자" : "Candidates",
    description:
      lang === "ko"
        ? "후보자 개인 페이지는 이 배포에 없습니다. 상급 지방자치단체 페이지로 연결합니다."
        : "There are no candidate profiles in this release. The index links to the upper-level local governments.",
    path,
    lang,
    alternatePath: sectionPath(lang === "ko" ? "en" : "ko", "candidates"),
  });
}

export default async function CandidatesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asKrLang((await params).lang);
  const copy = ui(lang);
  const path = sectionPath(lang, "candidates");
  const ko = lang === "ko";
  const nec = sourceById("nec-home");
  return (
    <KoreaFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.korea, path: krRoot() },
        { name: ko ? "대한민국" : "South Korea", path: krHome(lang) },
        { name: copy.candidates, path },
      ]}
      title={ko ? "후보자" : "Candidates"}
      lede={
        ko
          ? "후보자 개인 페이지는 없습니다. 지역구 페이지도 없습니다."
          : "There are no candidate profiles. There are no constituency pages."
      }
      officeHref={nec.url}
      officeLabel="중앙선거관리위원회"
      sources={sourcesById(["nec-home", "assembly-members", "nec-local-2026"])}
    >
      <GapNote label={copy.gap} text={copy.candidateGap} />
      <LinkGrid
        heading={copy.regions}
        items={alphaRegions().map((region) => ({
          href: regionPath(lang, region.slug),
          title: region.officialName,
          detail: ko ? region.kindKo : region.kindEn,
        }))}
      />
    </KoreaFrame>
  );
}
