import type { SourceRef } from "./types";

const READ = "2026-10-17";
const READ_L2 = "2026-10-18";

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
  {
    id: "nec-winners-2026",
    name: "중앙선거관리위원회, 제9회 전국동시지방선거 당선인명부 (등록일 2026-06-19, 2026. 6. 3. 실시, 국회의원재보궐선거 포함)",
    url: "https://www.nec.go.kr/site/nec/ex/bbs/View.do?bcIdx=327938&cbIdx=1129",
    readOn: READ_L2,
  },
  {
    id: "nec-statistics-terms",
    name: "중앙선거관리위원회 선거통계시스템 이용지침",
    url: "https://info.nec.go.kr/main/help/helpMenu.xhtml?selectedName=copyrightpolicy",
    readOn: READ_L2,
  },
  {
    id: "nec-byelection-2026",
    name: "중앙선거관리위원회 선거통계시스템, 재보궐선거 실시사유 확정상황 (총 4건)",
    url: "https://info.nec.go.kr/main/help/helpMenu.xhtml?selectedName=byelection",
    readOn: READ_L2,
  },
  {
    id: "nec-na-2024-date",
    name: "중앙선거관리위원회 선거통계시스템, 역대선거 (제22대 국회의원선거 투표실시일 2024. 4. 10.)",
    url: "https://info.nec.go.kr/main/main_previous_load.xhtml",
    readOn: READ_L2,
  },
  {
    id: "nec-na-2024-districts",
    name: "중앙선거관리위원회 선거통계시스템, 제22대 국회의원선거 지역구 목록 (electionId 0020240410, electionCode 2)",
    url: "https://info.nec.go.kr/bizcommon/selectbox/selectbox_cityCodeBySgJson.json?electionId=0020240410&electionCode=2",
    readOn: READ_L2,
  },
  {
    id: "assembly-member-search",
    name: "열린국회정보, 제22대 국회의원 검색",
    url: "https://open.assembly.go.kr/portal/assm/search/memberSchPage.do",
    readOn: READ_L2,
  },
  {
    id: "assembly-member-kogl",
    name: "열린국회정보, 국회의원 인적사항 데이터 (이용허락조건 공공누리 출처표시)",
    url: "https://open.assembly.go.kr/portal/data/service/selectServicePage.do/OWSSC6001134T516707",
    readOn: READ_L2,
  },
  {
    id: "assembly-copyright",
    name: "열린국회정보 저작권 정책",
    url: "https://open.assembly.go.kr/portal/policy/copyRightPage.do",
    readOn: READ_L2,
  },
  {
    id: "election-act-108",
    name: "공직선거법 제108조(여론조사의 결과공표금지 등). 시행 2026. 10. 2. 법률 제22052호. 국가법령정보센터",
    url: "https://www.law.go.kr/LSW/lsSideInfoP.do?docCls=jo&joBrNo=00&joNo=0108&lsiSeq=290229&urlMode=lsScJoRltInfoR",
    readOn: READ_L2,
  },
  {
    id: "pipa",
    name: "개인정보 보호법. 국가법령정보센터",
    url: "https://www.law.go.kr/%EB%B2%95%EB%A0%B9/%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4%EB%B3%B4%ED%98%B8%EB%B2%95",
    readOn: READ_L2,
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
