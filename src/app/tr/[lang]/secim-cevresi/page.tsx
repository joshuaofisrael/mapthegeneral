import { LinkGrid } from "@/components/LinkGrid";
import { TurkeyFrame } from "@/app/tr/turkey-frame";
import { asTrLang } from "@/data/tr/lang";
import { CONSTITUENCIES, TBMM_LISTED, constituencyPath } from "@/data/tr/level2";
import { otherLang, turkeyHome, turkeyMetadata } from "@/data/tr/metadata";
import { sourceById, sourcesById } from "@/data/tr/sources";
import { ui } from "@/data/tr/ui";

const ysk = sourceById("ysk-home");

export function generateStaticParams() {
  return [{ lang: "tr" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asTrLang((await params).lang);
  const path = `${turkeyHome(lang)}secim-cevresi/`;
  return turkeyMetadata({
    title: lang === "tr" ? "Seçim çevreleri" : "Constituencies",
    description:
      lang === "tr"
        ? "14 Mayıs 2023 seçimindeki 87 TBMM seçim çevresi, sandalye sayıları ve TBMM listesindeki milletvekilleri."
        : "The 87 TBMM constituencies in the 14 May 2023 election, with seat counts and members on the TBMM list.",
    path,
    lang,
    alternatePath: `${turkeyHome(otherLang(lang))}secim-cevresi/`,
  });
}

export default async function ConstituencyIndex({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asTrLang((await params).lang);
  const copy = ui(lang);
  const path = `${turkeyHome(lang)}secim-cevresi/`;
  const tr = lang === "tr";
  const items = [...CONSTITUENCIES].sort((a, b) => a.name.localeCompare(b.name, "tr"));
  return (
    <TurkeyFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.turkey, path: "/tr/" },
        { name: tr ? "Türkiye" : "Turkey", path: turkeyHome(lang) },
        { name: tr ? "Seçim çevreleri" : "Constituencies", path },
      ]}
      eyebrow={tr ? "TBMM" : "TBMM"}
      title={tr ? "Seçim çevreleri" : "Constituencies"}
      lede={
        tr
          ? `YSK açık veri listesi 14 Mayıs 2023 için 87 seçim çevresi basar. Seçilenler dosyası 600 ad sayar. TBMM listesi 18 Ekim 2026’da ${TBMM_LISTED} ad basar.`
          : `The YSK open-data list prints 87 constituencies for 14 May 2023. The elected-member file counts 600 names. The TBMM list read on 18 October 2026 prints ${TBMM_LISTED} names.`
      }
      officeHref={ysk.url}
      officeLabel="Yüksek Seçim Kurulu"
      sources={sourcesById(["ysk-acik-2023-cevre", "ysk-acik-2023-mv", "tbmm-liste"])}
    >
      <LinkGrid
        heading={tr ? "87 çevre" : "87 constituencies"}
        items={items.map((row) => ({
          href: constituencyPath(lang, row.slug),
          title: row.name,
          detail: tr
            ? `${row.provinceName} · ${row.seats2023} sandalye · ${row.members.length} TBMM`
            : `${row.provinceName} · ${row.seats2023} seats · ${row.members.length} on the TBMM list`,
        }))}
      />
    </TurkeyFrame>
  );
}
