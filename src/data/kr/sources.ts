import type { SourceRef } from "./types";

const READ = "2026-10-17";

export const SOURCES: SourceRef[] = [
  {
    id: "election-act-34",
    name: "공직선거법 제34조(선거일). 시행 2026. 10. 2. 법률 제22052호, 2026. 9. 29., 일부개정. 국가법령정보센터",
    url: "https://www.law.go.kr/lsLinkCommonInfo.do?lsJoLnkSeq=1027660375",
    readOn: READ,
  },
  {
    id: "election-act-22052",
    name: "공직선거법 제정·개정문. 법률 제22052호(2026. 9. 29.)와 법률 제21754호(2026. 6. 2.)의 공포문. 국가법령정보센터",
    url: "https://www.law.go.kr/LSW/lsRvsDocListP.do?chrClsCd=010202&lsId=001725&lsRvsGubun=all",
    readOn: READ,
  },
  {
    id: "special-act-21446",
    name: "전남광주통합특별시 설치를 위한 특별법. 시행 2026. 7. 1. 법률 제21446호, 2026. 3. 5., 제정. 국가법령정보센터 제정·개정문",
    url: "https://www.law.go.kr/LSW/lsRvsDocListP.do?chrClsCd=010202&lsId=015064&lsRvsGubun=all",
    readOn: READ,
  },
  {
    id: "assembly-members",
    name: "대한민국 국회, 국회의원 선출 (의원수 300인, 지역구 254인, 비례대표 46인, 임기 4년)",
    url: "https://www.assembly.go.kr/portal/main/contents.do?menuNo=600153",
    readOn: READ,
  },
  {
    id: "assembly-term-22",
    name: "국회회의록, 제22대(2024.05.30.~2028.05.29.)",
    url: "https://record.assembly.go.kr/assembly/mnts/total/22.do",
    readOn: READ,
  },
  {
    id: "nec-local-2026",
    name: "중앙선거관리위원회, 제9회 전국동시지방선거 주요사무일정 (실시일 2026-06-03)",
    url: "https://www.nec.go.kr/site/nec/ex/bbs/View.do?bcIdx=289351&cbIdx=1104",
    readOn: READ,
  },
  {
    id: "nec-president-2025",
    name: "중앙선거관리위원회 선거통계시스템, 제21대 대통령선거 (2025년 6월 3일)",
    url: "http://info.nec.go.kr/main/showDocument.xhtml?electionId=0020250603&topMenuId=EP",
    readOn: READ,
  },
  {
    id: "nec-home",
    name: "중앙선거관리위원회",
    url: "https://www.nec.go.kr/",
    readOn: READ,
  },
  {
    id: "mois-district-2025",
    name: "행정안전부, 지방자치단체 행정구역 및 인구 현황 (2025. 12. 31. 현재). 게시일 2026. 7. 24.",
    url: "https://www.mois.go.kr/frt/bbs/type001/commonSelectBoardArticle.do?bbsId=BBSMSTR_000000000055&nttId=128138",
    readOn: READ,
  },
];

const byId = new Map(SOURCES.map((source) => [source.id, source]));

export function sourceById(id: string): SourceRef {
  const source = byId.get(id);
  if (!source) throw new Error(`Missing Korea source ${id}`);
  return source;
}

export function sourcesById(ids: string[]): SourceRef[] {
  return ids.map((id) => sourceById(id));
}
