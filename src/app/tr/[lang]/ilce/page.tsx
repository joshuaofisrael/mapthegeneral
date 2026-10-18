import { LinkGrid } from "@/components/LinkGrid";
import { TurkeyFrame } from "@/app/tr/turkey-frame";
import { asTrLang } from "@/data/tr/lang";
import { DISTRICTS, districtPath } from "@/data/tr/level2";
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
  const path = `${turkeyHome(lang)}ilce/`;
  return turkeyMetadata({
    title: lang === "tr" ? "İlçeler" : "Districts",
    description:
      lang === "tr"
        ? "973 ilçe. 31 Mart 2024 ilçe belediye başkanı, YSK dosyasında varsa. Resmî olmayan bilgi."
        : "973 districts. The 31 March 2024 ilçe belediye başkanı where the YSK file has one. Unofficial information.",
    path,
    lang,
    alternatePath: `${turkeyHome(otherLang(lang))}ilce/`,
  });
}

export default async function DistrictIndex({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asTrLang((await params).lang);
  const copy = ui(lang);
  const path = `${turkeyHome(lang)}ilce/`;
  const tr = lang === "tr";
  const items = [...DISTRICTS].sort((a, b) => a.name.localeCompare(b.name, "tr") || a.provinceName.localeCompare(b.provinceName, "tr"));
  return (
    <TurkeyFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.turkey, path: "/tr/" },
        { name: tr ? "Türkiye" : "Turkey", path: turkeyHome(lang) },
        { name: tr ? "İlçeler" : "Districts", path },
      ]}
      eyebrow={tr ? "İlçe" : "District"}
      title={tr ? "İlçeler" : "Districts"}
      lede={
        tr
          ? "YSK’nın 31 Mart 2024 ilçe belediye başkanı aday sayısı dosyası 973 ilçe basar. Seçilenler dosyası 970 ad basar. Üç iptal edilen ilçe başkansızdır."
          : "The YSK file of 31 March 2024 ilçe belediye başkanı candidate counts prints 973 districts. The elected-candidate file prints 970 names. Three cancelled districts have no mayor name."
      }
      officeHref={ysk.url}
      officeLabel="Yüksek Seçim Kurulu"
      sources={sourcesById(["ysk-2024-ilce-aday", "ysk-acik-2024-baskan", "ysk-2024-liste3"])}
    >
      <LinkGrid
        heading={tr ? "973 ilçe" : "973 districts"}
        items={items.map((district) => ({
          href: districtPath(lang, district.provinceSlug, district.slug),
          title: district.name,
          detail: `${district.provinceName}${district.mayor ? ` · ${district.mayor.name}` : ""}`,
        }))}
      />
    </TurkeyFrame>
  );
}
