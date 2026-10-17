import { GapNote } from "@/components/GapNote";
import { KoreaFrame } from "@/app/kr/frame";
import { krPageMetadata } from "@/data/kr/metadata";
import { asKrLang, krHome, krRoot, sectionPath } from "@/data/kr/paths";
import { sourceById, sourcesById } from "@/data/kr/sources";
import { ui } from "@/data/kr/ui";

export function generateStaticParams() {
  return [{ lang: "ko" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asKrLang((await params).lang);
  const path = sectionPath(lang, "parties");
  return krPageMetadata({
    title: lang === "ko" ? "정당" : "Parties",
    description:
      lang === "ko"
        ? "2026년 10월 17일에 읽은 출처에서 2028년 국회의원선거 후보 명부를 찾지 못했습니다. 이 페이지는 정당을 열거하지 않습니다."
        : "No candidate roll for the 2028 National Assembly election was in the sources read on 17 October 2026. This page does not list parties.",
    path,
    lang,
    alternatePath: sectionPath(lang === "ko" ? "en" : "ko", "parties"),
  });
}

export default async function PartiesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asKrLang((await params).lang);
  const copy = ui(lang);
  const path = sectionPath(lang, "parties");
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
        { name: copy.parties, path },
      ]}
      title={ko ? "정당" : "Parties"}
      lede={
        ko
          ? "이 페이지에서 정당은, 중앙선거관리위원회가 해당 선거의 후보자를 공고한 뒤에야 그 공고에 적힌 이름으로 다룹니다."
          : "On this page a party is named for an election only after the National Election Commission has published the candidates and the name appears in that notice."
      }
      officeHref={nec.url}
      officeLabel="중앙선거관리위원회"
      sources={sourcesById(["nec-home", "election-act-34", "assembly-members"])}
    >
      <GapNote label={copy.gap} text={copy.candidateGap} />
      <div className="prose-legal">
        <p>
          {ko
            ? "정당 등록부와 후보 추천 요건은 요약하지 않습니다. 어떻게 출마하는지도 설명하지 않습니다."
            : "The party register and the rules for nominating a candidate are not summarised. This page does not explain how to stand."}
        </p>
      </div>
    </KoreaFrame>
  );
}
