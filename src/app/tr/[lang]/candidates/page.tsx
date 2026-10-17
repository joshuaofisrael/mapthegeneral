import Link from "@/components/AnchorLink";
import { GapNote } from "@/components/GapNote";
import { TurkeyFrame } from "@/app/tr/turkey-frame";
import { asTrLang } from "@/data/tr/lang";
import { otherLang, provincePath, turkeyHome, turkeyMetadata } from "@/data/tr/metadata";
import { alphaProvinces } from "@/data/tr/provinces";
import { sourceById, sourcesById } from "@/data/tr/sources";
import { ui } from "@/data/tr/ui";

const ysk = sourceById("ysk-home");

export function generateStaticParams() {
  return [{ lang: "tr" }, { lang: "en" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asTrLang((await params).lang);
  const path = `${turkeyHome(lang)}candidates/`;
  return turkeyMetadata({
    title: lang === "tr" ? "Adaylar" : "Candidates",
    description:
      lang === "tr"
        ? "2028 aday listesi bu sürümde yok. İller, 2023 milletvekili çevrelerinin üst birimidir."
        : "There is no 2028 candidate list in this release. The provinces are the units above the 2023 parliamentary constituencies.",
    path,
    lang,
    alternatePath: `${turkeyHome(otherLang(lang))}candidates/`,
  });
}

export default async function CandidatesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asTrLang((await params).lang);
  const copy = ui(lang);
  const path = `${turkeyHome(lang)}candidates/`;
  const tr = lang === "tr";
  const provinces = alphaProvinces();
  return (
    <TurkeyFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.turkey, path: "/tr/" },
        { name: tr ? "Türkiye" : "Turkey", path: turkeyHome(lang) },
        { name: copy.candidates, path },
      ]}
      title={tr ? "Adaylar" : "Candidates"}
      lede={
        tr
          ? "Bu sürümde aday kartı yoktur. 2028 listesi okunmuş bir Yüksek Seçim Kurulu ilanında yoktur."
          : "There are no candidate profiles in this release. No Supreme Election Council proclamation that was read contains a 2028 list."
      }
      officeHref={ysk.url}
      officeLabel="Yüksek Seçim Kurulu"
      sources={sourcesById(["kanun-6271", "kanun-2839", "ysk-home"])}
    >
      <GapNote label={copy.gap} text={copy.candidateGap} />
      <section>
        <h2 className="font-serif text-2xl font-semibold">{tr ? "İller" : "Provinces"}</h2>
        <p className="mt-2 text-sm text-ink-muted">
          {tr
            ? "Her il sayfası, 2023 milletvekili sayısını ve 2839 sayılı Kanunun 4. maddesindeki çevre kuralını yazar. Numaralı çevrelerin ilçe listesi yoktur."
            : "Each province page states the 2023 deputy count and the constituency rule in article 4 of Law 2839. The district list of each numbered constituency is not there."}
        </p>
        <ul className="mt-4 columns-1 gap-x-8 text-sm sm:columns-2 lg:columns-3">
          {provinces.map((province) => (
            <li key={province.slug} className="mb-1">
              <Link className="text-navy underline" href={provincePath(lang, province.slug)}>
                {province.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </TurkeyFrame>
  );
}
