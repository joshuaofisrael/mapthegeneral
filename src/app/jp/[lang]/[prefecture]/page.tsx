import Link from "next/link";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { JapanFrame } from "../../frame";
import { formatNumber } from "../../../../../data/jp/format";
import { hcFor, smdsIn } from "../../../../../data/jp/level2";
import { blockPath, districtsIndexPath, hcPath, japanHome, prefecturePath, smdPath } from "../../../../../data/jp/paths";
import { blockById, censusNeighbors, prefectureBySlug, PREFECTURES } from "../../../../../data/jp/places";
import { sourceById, sourcesById } from "../../../../../data/jp/sources";
import type { Lang } from "../../../../../data/jp/types";
import { kindLabel, ui } from "../../../../../data/jp/ui";
import { japanMetadata } from "../../../../../data/jp/seo";

export function generateStaticParams() {
  return (["ja", "en"] as const).flatMap((lang) =>
    PREFECTURES.map((prefecture) => ({ lang, prefecture: prefecture.slug })),
  );
}
export const dynamicParams = false;

function asLang(value: string): Lang {
  if (value !== "ja" && value !== "en") notFound();
  return value;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; prefecture: string }>;
}) {
  const { lang: raw, prefecture: slug } = await params;
  const lang = asLang(raw);
  const prefecture = prefectureBySlug(slug);
  if (!prefecture) return {};
  return japanMetadata({
    title: prefecture.officialName,
    description:
      lang === "ja"
        ? `${prefecture.officialName}: 人口速報、衆議院の小選挙区、参議院の選挙区。非公式の情報です。`
        : `${prefecture.officialName}: preliminary population, House single-member districts, and the Councillors’ district. Unofficial information.`,
    path: prefecturePath(lang, slug),
    lang,
    alternatePath: prefecturePath(lang === "ja" ? "en" : "ja", slug),
  });
}

export default async function PrefecturePage({
  params,
}: {
  params: Promise<{ lang: string; prefecture: string }>;
}) {
  const { lang: raw, prefecture: slug } = await params;
  const lang = asLang(raw);
  const prefecture = prefectureBySlug(slug);
  if (!prefecture) notFound();
  const copy = ui(lang);
  const ja = lang === "ja";
  const path = prefecturePath(lang, slug);
  const block = blockById(prefecture.blockId);
  const partner = prefecture.councillorsWith ? prefectureBySlug(prefecture.councillorsWith) : undefined;
  const neighbors = censusNeighbors(slug);
  const districts = smdsIn(slug);
  const councillors = hcFor(slug);
  const office = sourceById("soumu-senkyo");
  return (
    <JapanFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.japan, path: "/jp/" },
        { name: ja ? "日本" : "Japan", path: japanHome(lang) },
        { name: prefecture.officialName, path },
      ]}
      eyebrow={kindLabel(prefecture.kind, lang)}
      title={prefecture.officialName}
      lede={ja ? undefined : prefecture.englishName}
      officeHref={office.url}
      officeLabel="総務省"
      sources={sourcesById(["census-outline", "census-results", "soumu-kinds", "soumu-guide", "constitution", "koukyo", "shugiin-members", "sangiin-hireiku"])}
    >
      <dl className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.population}</dt>
          <dd className="mt-1 font-serif text-2xl">{formatNumber(prefecture.population, lang)}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {ja
              ? "2025年10月1日。人口速報集計の概要（令和8年5月29日）。確定数ではありません。"
              : "1 October 2025. Preliminary outline of 29 May 2026. Not the later final count."}
          </dd>
        </div>
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            {ja ? "衆議院比例代表" : "House proportional block"}
          </dt>
          <dd className="mt-1 font-serif text-2xl">{block.nameJa}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {ja
              ? `総務省の表の定数は ${formatNumber(block.seats, lang)} 人です。このブロック全体の定数で、この都道府県だけの定数ではありません。`
              : `The Ministry’s table gives this block ${formatNumber(block.seats, lang)} seats. That is the block, not this prefecture alone.`}
          </dd>
        </div>
      </dl>

      <section className="prose-legal">
        <h2>{ja ? "このページの位置" : "Where this page sits"}</h2>
        <p>
          {ja
            ? "この公開の地域の段は都道府県です。その下の市区町村は、まだページにしていません。衆議院の小選挙区と、この都道府県が属する比例代表、参議院の選挙区は、下の一覧から開けます。"
            : "The regional tier in this release is the prefecture. Municipalities do not have pages yet. The single-member districts, the proportional block, and the Councillors’ district are linked below."}
        </p>
        <p>
          {ja
            ? "憲法第92条は、地方公共団体の組織と運営を、地方自治の本旨に基づいて法律で定めるとしています。第93条は、議会を置き、長と議員を住民が直接選挙するとしています。総務省は、都道府県知事と都道府県議会議員、市区町村長と市区町村議会議員を、別々の選挙として説明しています。"
            : "Article 92 says the organisation of local public bodies is fixed by law under the principle of local autonomy. Article 93 says each has an assembly and that residents directly elect the chief executive and the assembly members. The Ministry describes separate elections for prefectural governors, prefectural assembly members, municipal mayors, and municipal assembly members."}
        </p>
        <h2>{ja ? "衆議院の小選挙区" : "Single-member districts"}</h2>
        <ul>
          {districts.map((district) => (
            <li key={district.n}>
              <Link className="text-navy underline" href={smdPath(lang, slug, district.n)}>
                {district.lawHeading}
              </Link>
            </li>
          ))}
        </ul>
        <p>
          <Link className="text-navy underline" href={blockPath(lang, block.id)}>
            {ja ? `比例代表 ${block.nameJa}` : `Proportional district ${block.nameJa}`}
          </Link>
        </p>
        {councillors && (
          <p>
            <Link className="text-navy underline" href={hcPath(lang, councillors.canonical)}>
              {councillors.lawName}
            </Link>
            {councillors.canonical !== slug
              ? ja
                ? "。別表第三の名称の、最初の都道府県の下にページを置いています。"
                : ". The page sits under the first prefecture in the annex name."
              : null}
          </p>
        )}
        <p>
          <Link className="text-navy underline" href={districtsIndexPath(lang)}>
            {ja ? "選挙区の一覧" : "District index"}
          </Link>
        </p>
        {partner && (
          <p>
            {ja
              ? `参議院の選挙区について、総務省は「${prefecture.officialName}」と「${partner.officialName}」を一つの選挙区として書いています。`
              : `For the House of Councillors, the Ministry prints ${prefecture.officialName} and ${partner.officialName} as one electoral district.`}{" "}
            <Link className="text-navy underline" href={prefecturePath(lang, partner.slug)}>
              {partner.officialName}
            </Link>
          </p>
        )}
        <h2>{copy.government}</h2>
        <GapNote label={copy.gap} text={copy.governorGap} />
        <h2>{ja ? "市区町村" : "Municipalities"}</h2>
        <GapNote label={copy.gap} text={copy.localGap} />
      </section>

      <section>
        <h2 className="font-serif text-2xl font-semibold">{copy.censusNearby}</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {neighbors.prev && (
            <li>
              <Link className="text-navy underline" href={prefecturePath(lang, neighbors.prev.slug)}>
                {neighbors.prev.officialName}
              </Link>
            </li>
          )}
          {neighbors.next && (
            <li>
              <Link className="text-navy underline" href={prefecturePath(lang, neighbors.next.slug)}>
                {neighbors.next.officialName}
              </Link>
            </li>
          )}
        </ul>
      </section>
    </JapanFrame>
  );
}
