import Link from "@/components/AnchorLink";
import { TurkeyFrame } from "@/app/tr/turkey-frame";
import { asTrLang } from "@/data/tr/lang";
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
  const path = `${turkeyHome(lang)}elections/`;
  return turkeyMetadata({
    title: lang === "tr" ? "Seçimler" : "Elections",
    description:
      lang === "tr"
        ? "Türkiye sayfalarındaki seçim dizini. Bir sonraki olağan Cumhurbaşkanı ve milletvekili seçimi 2028’dedir."
        : "Index of elections on the Turkey pages. The next ordinary presidential and parliamentary elections fall in 2028.",
    path,
    lang,
    alternatePath: `${turkeyHome(otherLang(lang))}elections/`,
  });
}

export default async function ElectionsIndex({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asTrLang((await params).lang);
  const copy = ui(lang);
  const path = `${turkeyHome(lang)}elections/`;
  const tr = lang === "tr";
  return (
    <TurkeyFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.turkey, path: "/tr/" },
        { name: tr ? "Türkiye" : "Turkey", path: turkeyHome(lang) },
        { name: copy.elections, path },
      ]}
      title={copy.elections}
      lede={
        tr
          ? "Bu sürüm, 2028’deki olağan Cumhurbaşkanı ve milletvekili seçiminin sayfasını yayımlar. Oy gününü yazmaz."
          : "This release publishes the page for the ordinary presidential and parliamentary elections in 2028. It does not print the polling day."
      }
      officeHref={ysk.url}
      officeLabel="Yüksek Seçim Kurulu"
      sources={sourcesById(["anayasa", "kanun-6271", "ysk-2023-94", "ysk-home"])}
    >
      <ul className="space-y-3">
        <li>
          <Link className="font-serif text-xl font-semibold text-navy hover:underline" href={`${path}2028/`}>
            {tr ? "Cumhurbaşkanı ve milletvekili seçimi, 2028" : "Presidential and parliamentary elections, 2028"}
          </Link>
          <p className="mt-1 text-sm text-ink-muted">
            {tr
              ? "Anayasa madde 77 ve 6271 sayılı Kanun madde 3. Oy günü basılmamıştır."
              : "Constitution article 77 and Law 6271 article 3. The polling day is not printed."}
          </p>
        </li>
      </ul>
      <p className="text-sm">
        <Link className="text-navy underline" href={`${turkeyHome(lang)}results/`}>
          {tr ? "14 Mayıs ve 28 Mayıs 2023 ilanı" : "The 14 May and 28 May 2023 proclamations"}
        </Link>
      </p>
    </TurkeyFrame>
  );
}
