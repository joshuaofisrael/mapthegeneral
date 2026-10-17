import Link from "@/components/AnchorLink";
import { CanadaFrame } from "@/app/ca/_components/CanadaFrame";
import { asCaLang } from "@/data/ca/lang";
import { canadaHome, electionPath } from "@/data/ca/paths";
import { caMetadata } from "@/data/ca/seo";
import { sourceById, sourcesById } from "@/data/ca/sources";
import { ui } from "@/data/ca/ui";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asCaLang((await params).lang);
  return caMetadata({
    title: lang === "fr" ? "Élections au Canada" : "Elections in Canada",
    description:
      lang === "fr"
        ? "Index des élections sur les pages du Canada. La date fédérale fixe lue est le 15 octobre 2029."
        : "Index of elections on the Canada pages. The federal fixed date that was read is 15 October 2029.",
    path: `${canadaHome(lang)}elections/`,
    lang,
  });
}

export default async function ElectionsIndex({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asCaLang((await params).lang);
  const copy = ui(lang);
  const fr = lang === "fr";
  const path = `${canadaHome(lang)}elections/`;
  const office = sourceById("ec-home");
  return (
    <CanadaFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.canada, path: "/ca/" },
        { name: "Canada", path: canadaHome(lang) },
        { name: copy.elections, path },
      ]}
      title={copy.elections}
      lede={
        fr
          ? "Cette livraison publie la date fédérale fixe du 15 octobre 2029. Les dates provinciales et territoriales lues sont sur la page de chaque province ou territoire. Ce n’est pas un calendrier de toutes les élections futures."
          : "This release publishes the federal fixed date of 15 October 2029. Provincial and territorial dates that were read are on each province or territory page. It is not a calendar of every future election."
      }
      officeHref={office.url}
      officeLabel="Elections Canada"
      sources={sourcesById(["ec-briefing", "cea-56-1"])}
    >
      <ul className="space-y-3">
        <li>
          <Link className="font-serif text-xl font-semibold text-navy hover:underline" href={electionPath(lang)}>
            {fr ? "Élection générale fédérale, 15 octobre 2029" : "Federal general election, 15 October 2029"}
          </Link>
          <p className="mt-1 text-sm text-ink-muted">
            {fr ? "Article 56.1 de la Loi électorale du Canada. Pas encore convoquée dans les sources lues." : "Canada Elections Act, section 56.1. Not called in the sources that were read."}
          </p>
        </li>
      </ul>
    </CanadaFrame>
  );
}
