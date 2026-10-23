import { GapNote } from "@/components/GapNote";
import { CanadaFrame } from "@/app/ca/_components/CanadaFrame";
import { asCaLang } from "@/data/ca/lang";
import { REGISTERED_PARTIES } from "@/data/ca/parties";
import { canadaHome } from "@/data/ca/paths";
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
    title: lang === "fr" ? "Partis au Canada" : "Canada parties",
    description:
      lang === "fr"
        ? "Partis politiques enregistrés imprimés par Élections Canada le 17 octobre 2026. Ce n’est pas une liste de candidatures pour 2029."
        : "Registered political parties printed by Elections Canada on 17 October 2026. This is not a list of candidacies for 2029.",
    path: `${canadaHome(lang)}parties/`,
    lang,
  });
}

export default async function PartiesPage({ params }: { params: Promise<{ lang: string }> }) {
  const lang = asCaLang((await params).lang);
  const copy = ui(lang);
  const fr = lang === "fr";
  const path = `${canadaHome(lang)}parties/`;
  const office = sourceById("ec-parties");
  return (
    <CanadaFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.canada, path: "/ca/" },
        { name: "Canada", path: canadaHome(lang) },
        { name: copy.parties, path },
      ]}
      title={fr ? "Partis enregistrés" : "Registered parties"}
      lede={
        fr
          ? "Élections Canada écrit que le registre est mis à jour lorsqu’il reçoit un rapport écrit signé par le chef du parti. Les noms ci-dessous sont ceux de la liste « Registered Political Parties » lue le 17 octobre 2026."
          : "Elections Canada says the registry is updated on receipt of a written report signed by the leader of the party. The names below are the ones in the “Registered Political Parties” list read on 17 October 2026."
      }
      officeHref={office.url}
      officeLabel="Elections Canada"
      sources={sourcesById(["ec-parties", "cea-56-1", "ec-briefing"])}
    >
      <GapNote label={copy.gap} text={copy.candidateGap} />
      <div className="prose-legal">
        <p>
          {fr
            ? "L’inscription au registre n’est pas une candidature. Cette page ne copie ni les sièges sociaux, ni les téléphones, ni les agents officiels, ni les partis radiés."
            : "Registration is not a candidacy. This page does not copy headquarters, telephone numbers, chief agents, or deregistered parties."}
        </p>
      </div>
      <table className="fact-table">
        <thead>
          <tr>
            <th scope="col">{fr ? "Nom imprimé" : "Printed name"}</th>
            <th scope="col">{fr ? "Chef imprimé" : "Printed leader"}</th>
          </tr>
        </thead>
        <tbody>
          {REGISTERED_PARTIES.map((party) => (
            <tr key={party.name}>
              <td>{party.name}</td>
              <td>{party.leader}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </CanadaFrame>
  );
}
