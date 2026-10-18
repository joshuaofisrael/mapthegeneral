import Link from "@/components/AnchorLink";
import { GapNote } from "@/components/GapNote";
import { TurkeyFrame } from "@/app/tr/turkey-frame";
import { formatNumber } from "@/data/tr/format";
import { asTrLang } from "@/data/tr/lang";
import { otherLang, provincePath, turkeyHome, turkeyMetadata } from "@/data/tr/metadata";
import { LinkGrid } from "@/components/LinkGrid";
import {
  constituenciesInProvince,
  constituencyPath,
  districtPath,
  districtsInProvince,
} from "@/data/tr/level2";
import { PROVINCES, constituencyBand, provinceBySlug, provinceNeighbors } from "@/data/tr/provinces";
import { sourceById, sourcesById } from "@/data/tr/sources";
import { ui } from "@/data/tr/ui";
import { notFound } from "next/navigation";

const ysk = sourceById("ysk-home");

export function generateStaticParams() {
  return ["tr", "en"].flatMap((lang) => PROVINCES.map((province) => ({ lang, province: province.slug })));
}
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; province: string }>;
}) {
  const { lang: raw, province: slug } = await params;
  const lang = asTrLang(raw);
  const province = provinceBySlug(slug);
  if (!province) return {};
  return turkeyMetadata({
    title: province.name,
    description:
      lang === "tr"
        ? `${province.name}: TÜİK 2025 nüfusu ve 2023 milletvekili sayısı. 2028 oy günü basılmamıştır. Resmî olmayan bilgi.`
        : `${province.name}: 2025 TÜİK population and the 2023 deputy count. The 2028 polling day is not printed. Unofficial information.`,
    path: provincePath(lang, slug),
    lang,
    alternatePath: provincePath(otherLang(lang), slug),
  });
}

export default async function ProvincePage({
  params,
}: {
  params: Promise<{ lang: string; province: string }>;
}) {
  const { lang: raw, province: slug } = await params;
  const lang = asTrLang(raw);
  const province = provinceBySlug(slug);
  if (!province) notFound();
  const copy = ui(lang);
  const tr = lang === "tr";
  const path = provincePath(lang, slug);
  const neighbors = provinceNeighbors(slug);
  const band = constituencyBand(province.deputies2023);
  const districts = districtsInProvince(slug);
  const cevres = constituenciesInProvince(slug);

  return (
    <TurkeyFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.turkey, path: "/tr/" },
        { name: tr ? "Türkiye" : "Turkey", path: turkeyHome(lang) },
        { name: province.name, path },
      ]}
      eyebrow={tr ? "İl" : "Province"}
      title={province.name}
      lede={
        province.metropolitan
          ? tr
            ? "6360 sayılı Kanunun 1. maddesinde adı geçen büyükşehir belediyesi."
            : "Named in article 1 of Law 6360 as a metropolitan municipality."
          : tr
            ? "6360 sayılı Kanunun 1. maddesindeki büyükşehir listesinde yok."
            : "Not in the metropolitan list in article 1 of Law 6360."
      }
      officeHref={ysk.url}
      officeLabel="Yüksek Seçim Kurulu"
      sources={sourcesById([
        "tuik-2025",
        "tuik-duyuru",
        "ysk-istatistik",
        "kanun-2839",
        "kanun-6360",
        "anayasa",
        "kanun-6271",
        "kanun-2972",
        "ysk-2023-94",
        "ysk-2023-1565",
        "ysk-2024-2367",
        "ysk-2024-liste2",
        "ysk-2024-liste3",
      ])}
    >
      <dl className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.population}</dt>
          <dd className="mt-1 font-serif text-2xl">{formatNumber(province.population, lang)}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {tr
              ? "TÜİK, İstatistiklerle Türkiye 2025, tablo 1.4. Kaynak satırı ADNKS 2025."
              : "TÜİK, İstatistiklerle Türkiye 2025, table 1.4. The source line is ADNKS 2025."}
          </dd>
        </div>
        <div className="rounded-xl border border-line bg-paper-card p-4">
          <dt className="text-xs font-semibold uppercase tracking-wide text-ink-muted">{copy.deputies}</dt>
          <dd className="mt-1 font-serif text-2xl">{province.deputies2023}</dd>
          <dd className="mt-1 text-sm text-ink-muted">
            {tr
              ? "Yüksek Seçim Kurulu seçim istatistikleri, tablo 2.6, 2023 sütunu. 2028 dağıtımı bu sayfada yok."
              : "Supreme Election Council election statistics, table 2.6, 2023 column. The 2028 allocation is not on this page."}
          </dd>
        </div>
      </dl>

      <section className="prose-legal">
        <h2>{tr ? "Seçim çevresi" : "Constituency"}</h2>
        <p>
          {tr
            ? `2839 sayılı Kanunun 4. maddesi, çıkaracağı milletvekili sayısı 18’e kadar olan ili bir seçim çevresi sayar; 19’dan 35’e kadar olan ili ikiye, 36 ve daha fazla olan ili üçe böler. Bu ilin 2023 milletvekili sayısı ${province.deputies2023} olduğu için bu kural ${band === 1 ? "bir" : band === 2 ? "iki" : "üç"} çevre tarif eder. Numaralı çevrelerin hangi ilçelerden oluştuğu bu sayfada yok.`
            : `Article 4 of Law 2839 counts a province electing up to 18 deputies as one constituency, divides a province electing 19 to 35 into two, and divides a province electing 36 or more into three. This province’s 2023 deputy count is ${province.deputies2023}, so that rule describes ${band === 1 ? "one constituency" : band === 2 ? "two constituencies" : "three constituencies"}. The districts inside each numbered constituency are not on this page.`}
        </p>
        <h2>{tr ? "Son ve sonraki milletvekili seçimi" : "Last and next parliamentary election"}</h2>
        <p>
          {tr
            ? "Birlikte yapılan önceki Cumhurbaşkanı seçimi ve 28. Dönem Milletvekili Genel Seçimi 14 Mayıs 2023 Pazar günüdür. Kurulun 2023/94 sayılı kararı, 2023/90 sayılı kararla bu günün belirlendiğini aktarır. İl düzeyindeki oy dökümü bu sayfada kopyalanmaz."
            : "The previous joint presidential election and 28th-term parliamentary general election was Sunday, 14 May 2023. Decision 2023/94 records that decision 2023/90 set that day. The province-level vote table is not copied here."}
        </p>
        <p>
          <Link className="text-navy underline" href={`${turkeyHome(lang)}elections/2028/`}>
            {tr ? "2028 seçim sayfası" : "Page for the 2028 elections"}
          </Link>
        </p>
        <GapNote label={copy.gap} text={copy.nextDayGap} />
        <h2>{tr ? "Mahalli idare" : "Local administration"}</h2>
        <p>
          {province.metropolitan
            ? tr
              ? "6360 sayılı Kanunun 1. maddesinin 5. fıkrası, 1, 2 ve 4. fıkralarda sayılan illerde il özel idaresinin tüzel kişiliğinin kaldırıldığını söyler. Bu il o listelerdedir."
              : "Article 1(5) of Law 6360 says the special provincial administration’s legal personality is removed in the provinces named in paragraphs 1, 2, and 4. This province is in those lists."
            : tr
              ? "Bu il, 6360 sayılı Kanunun 1. maddesindeki büyükşehir listesinde yoktur. Anayasanın 127. maddesi, ilin seçilmiş karar organını mahallî idareler arasında sayar. Bu sayfa il genel meclisinin üye sayısını kopyalamaz."
              : "This province is not in the metropolitan list in article 1 of Law 6360. Article 127 of the Constitution counts the province’s elected decision-making body among local administrations. This page does not copy the size of the provincial council."}
        </p>
        <p>
          {tr
            ? "Son mahalli idareler genel seçimi, 2023/1565 sayılı kararın yazdığı gibi, 31 Mart 2024 Pazar günüdür."
            : "The last local general election, as decision 2023/1565 states, was Sunday, 31 March 2024."}
        </p>
        <GapNote label={copy.gap} text={copy.mayorGap} />
        <GapNote label={copy.gap} text={copy.governorGap} />
        <GapNote label={copy.gap} text={copy.localNextGap} />
        <GapNote label={copy.gap} text={copy.lowerTierGap} />
        <GapNote label={copy.gap} text={copy.candidateGap} />
      </section>

      <LinkGrid
        heading={tr ? "İlçeler" : "Districts"}
        items={districts.map((district) => ({
          href: districtPath(lang, slug, district.slug),
          title: district.name,
          detail: district.mayor ? district.mayor.name : tr ? "Başkan adı yok" : "No mayor name",
        }))}
      />
      <LinkGrid
        heading={tr ? "Seçim çevreleri" : "Constituencies"}
        items={cevres.map((row) => ({
          href: constituencyPath(lang, row.slug),
          title: row.name,
          detail: tr ? `${row.seats2023} sandalye, 2023` : `${row.seats2023} seats, 2023`,
        }))}
      />

      <section>
        <h2 className="font-serif text-2xl font-semibold">{copy.alphaNearby}</h2>
        <ul className="mt-3 space-y-2 text-sm">
          {neighbors.prev && (
            <li>
              <Link className="text-navy underline" href={provincePath(lang, neighbors.prev.slug)}>
                {neighbors.prev.name}
              </Link>
            </li>
          )}
          {neighbors.next && (
            <li>
              <Link className="text-navy underline" href={provincePath(lang, neighbors.next.slug)}>
                {neighbors.next.name}
              </Link>
            </li>
          )}
        </ul>
      </section>
    </TurkeyFrame>
  );
}
