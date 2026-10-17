import Link from "@/components/AnchorLink";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { KoreaFrame } from "@/app/kr/frame";
import { krPageMetadata } from "@/data/kr/metadata";
import {
  alphaRegionNeighbors,
  regionBySlug,
  REGIONS,
} from "@/data/kr/places";
import {
  asKrLang,
  formatKrNumber,
  krHome,
  krRoot,
  officeHref,
  regionPath,
  sectionPath,
} from "@/data/kr/paths";
import { sourceById, sourcesById } from "@/data/kr/sources";
import { ui } from "@/data/kr/ui";

export function generateStaticParams() {
  return ["ko", "en"].flatMap((lang) => REGIONS.map((region) => ({ lang, region: region.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string; region: string }> }) {
  const { lang: raw, region: slug } = await params;
  const lang = asKrLang(raw);
  const region = regionBySlug(slug);
  if (!region) return {};
  const path = regionPath(lang, slug);
  return krPageMetadata({
    title: region.officialName,
    description:
      lang === "ko"
        ? `${region.officialName}: 행정안전부 총괄표의 구역 수와 2026년 6월 3일 지방선거. 비공식 정보입니다.`
        : `${region.officialName}: unit counts from the Interior Ministry summary table and the local elections of 3 June 2026. Unofficial information.`,
    path,
    lang,
    alternatePath: regionPath(lang === "ko" ? "en" : "ko", slug),
  });
}

export default async function RegionPage({ params }: { params: Promise<{ lang: string; region: string }> }) {
  const { lang: raw, region: slug } = await params;
  const lang = asKrLang(raw);
  const region = regionBySlug(slug);
  if (!region) notFound();
  const copy = ui(lang);
  const ko = lang === "ko";
  const path = regionPath(lang, slug);
  const neighbors = alphaRegionNeighbors(slug);
  const nec = sourceById("nec-local-2026");
  const count = (value: number) => formatKrNumber(value, lang);
  const sourceIds = ["mois-district-2025", "nec-local-2026", "election-act-34"];
  if (slug === "jeonnam-gwangju") sourceIds.push("special-act-21446");
  if (slug === "jeonbuk") sourceIds.push("mois-district-2025");

  return (
    <KoreaFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.korea, path: krRoot() },
        { name: ko ? "대한민국" : "South Korea", path: krHome(lang) },
        { name: region.officialName, path },
      ]}
      eyebrow={ko ? region.kindKo : region.kindEn}
      title={region.officialName}
      lede={ko ? "행정안전부 책자 1-1 총괄과 7-5 사무소 소재지." : "Table 1-1 and section 7-5 of the Interior Ministry book."}
      officeHref={nec.url}
      officeLabel="중앙선거관리위원회"
      sources={sourcesById([...new Set(sourceIds)])}
    >
      <dl className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.kind}</dt>
          <dd className="mt-1 font-serif text-2xl">{ko ? region.kindKo : region.kindEn}</dd>
          <dd className="mt-1 text-sm text-ink-muted">{region.officialName}</dd>
        </div>
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.basic}</dt>
          <dd className="mt-1 font-serif text-2xl">{region.basicTotal === null ? "—" : count(region.basicTotal)}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {ko
              ? `시 ${count(region.si)} · 군 ${count(region.gun)} · 구 ${count(region.gu)}`
              : `Si ${count(region.si)} · gun ${count(region.gun)} · gu ${count(region.gu)}`}
          </dd>
        </div>
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.below}</dt>
          <dd className="mt-1 font-serif text-2xl">{count(region.eup + region.myeon + region.dong)}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {ko
              ? `읍 ${count(region.eup)} · 면 ${count(region.myeon)} · 동 ${count(region.dong)}`
              : `Eup ${count(region.eup)} · myeon ${count(region.myeon)} · dong ${count(region.dong)}`}
          </dd>
        </div>
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            {ko ? "행정시 · 자치구가 아닌 구" : "Administrative si and non-autonomous gu"}
          </dt>
          <dd className="mt-1 text-sm leading-6">
            {ko
              ? `행정시 ${count(region.adminSi)}. 자치구가 아닌 구 ${count(region.nonAutoGu)}. 총괄표에서 빈칸인 수는 0으로 더했습니다.`
              : `Administrative si ${count(region.adminSi)}. Gu that are not autonomous ${count(region.nonAutoGu)}. A blank cell in the summary table is added here as zero.`}
          </dd>
        </div>
      </dl>

      <section className="prose-legal">
        <h2>{copy.office}</h2>
        <p>
          {ko
            ? "아래 주소와 우편번호와 홈페이지 칸은 같은 책자 7-5에 인쇄된 문자열입니다. 칸 제목은 홈페이지(www.-.-.-)입니다. 링크는 인쇄된 호스트 앞에 https://만 붙입니다."
            : "The address, postcode, and homepage cell below are the strings printed in section 7-5 of the same book. The column heading is 홈페이지(www.-.-.-). The link adds only https:// in front of the printed host."}
        </p>
        <ul>
          {region.offices.map((office) => (
            <li key={`${office.label}-${office.postcode}`}>
              {office.label}. {office.address}. {office.postcode}.{" "}
              <a href={officeHref(office.host)} rel="noopener noreferrer">
                {office.host}
              </a>
            </li>
          ))}
        </ul>
        {slug === "jeonnam-gwangju" && (
          <p>
            {ko
              ? "7-5는 전남광주통합특별시라는 한 줄을 두지 않고, 광주광역시와 전라남도를 각각 적습니다. 총괄표는 전남광주통합특별시 아래에 그 두 이름을 다시 적고, 광주광역시는 구 5와 동 96, 전라남도는 시 5, 군 17, 읍 33, 면 196, 동 68이라고 적습니다. 법률 제21446호는 2026년 7월 1일 시행이고, 폐지되는 단체의 장 선거와 의원 선거는 하지 않는다고 적습니다."
              : "Section 7-5 does not print one row named 전남광주통합특별시. It prints 광주광역시 and 전라남도 separately. The summary table prints those two names under 전남광주통합특별시: 광주광역시 has 5 gu and 96 dong, and 전라남도 has 5 si, 17 gun, 33 eup, 196 myeon, and 68 dong. Act No. 21446 takes effect on 1 July 2026 and says elections for the heads and councillors of the abolished governments are not held."}
          </p>
        )}
        {slug === "sejong" && (
          <p>
            {ko
              ? "총괄표의 시·군·구 칸은 세종특별자치시에서 비어 있습니다. 읍 1, 면 9, 동 14는 적혀 있습니다."
              : "The si, gun, and gu cells for 세종특별자치시 are blank in the summary table. The table does print 1 eup, 9 myeon, and 14 dong."}
          </p>
        )}
        {slug === "jeju" && (
          <p>
            {ko
              ? "총괄표는 제주특별자치도의 시·군·구 칸을 비워 두고 행정시 2를 적습니다. 읍 7, 면 5, 동 31도 적습니다. 각주는 전북특별자치도의 시행일을 2024. 1. 18.로 적습니다. 그 각주는 제주 줄에 있지 않습니다."
              : "The summary table leaves the si, gun, and gu cells for 제주특별자치도 blank and prints 2 administrative si. It also prints 7 eup, 5 myeon, and 31 dong. A note on the table prints 18 January 2024 as the effective date of 전북특별자치도. That note is not on the Jeju row."}
          </p>
        )}
        {slug === "jeonbuk" && (
          <p>
            {ko
              ? "총괄표 각주는 전북특별자치도(2024. 1. 18. 시행)라고 적습니다."
              : "A note on the summary table prints 전북특별자치도 (effective 18 January 2024)."}
          </p>
        )}
        <h2>{ko ? "최근 선거" : "Latest election"}</h2>
        <p>
          {ko
            ? "중앙선거관리위원회는 제9회 전국동시지방선거 실시일을 2026-06-03으로 적습니다."
            : "The National Election Commission prints 2026-06-03 as the polling day of the 9th nationwide simultaneous local elections."}
        </p>
        <GapNote label={copy.gap} text={copy.officeholderGap} />
        <h2>{ko ? "다음 선거" : "Next election"}</h2>
        <GapNote label={copy.gap} text={copy.nextLocalGap} />
        <GapNote label={copy.gap} text={copy.populationGap} />
        <GapNote label={copy.gap} text={copy.localPagesGap} />
      </section>

      <p className="text-sm">
        <Link className="text-navy underline" href={sectionPath(lang, "results")}>
          {copy.results}
        </Link>
        {" · "}
        <Link className="text-navy underline" href={krHome(lang)}>
          {ko ? "대한민국" : "South Korea"}
        </Link>
      </p>

      <section>
        <h2 className="font-serif text-2xl font-semibold">{copy.alphaNearby}</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {neighbors.prev && (
            <li>
              <Link className="text-navy underline" href={regionPath(lang, neighbors.prev.slug)}>
                {neighbors.prev.officialName}
              </Link>
            </li>
          )}
          {neighbors.next && (
            <li>
              <Link className="text-navy underline" href={regionPath(lang, neighbors.next.slug)}>
                {neighbors.next.officialName}
              </Link>
            </li>
          )}
        </ul>
      </section>
    </KoreaFrame>
  );
}
