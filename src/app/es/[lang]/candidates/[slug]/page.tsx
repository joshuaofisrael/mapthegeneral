import Link from "@/components/AnchorLink";
import { notFound } from "next/navigation";
import { GapNote } from "@/components/GapNote";
import { SpainFrame } from "@/components/SpainFrame";
import { sourceById, sourcesById } from "@/data/spain/sources";
import { ui } from "@/data/spain/ui";
import { asLang } from "@/lib/lang";
import { pageMetadata } from "@/lib/metadata";
import { spainHome } from "@/lib/routes";

/** Replaced by one page per proclaimed candidacy after the BOE publication. */
const AWAITING_SLUG = "awaiting-proclamation";

export function generateStaticParams() {
  return [
    { lang: "es", slug: AWAITING_SLUG },
    { lang: "en", slug: AWAITING_SLUG },
  ];
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang: raw, slug } = await params;
  const lang = asLang(raw);
  if (slug !== AWAITING_SLUG) return {};
  const path = `${spainHome(lang)}candidates/${slug}/`;
  return pageMetadata({
    title: lang === "es" ? "Sin candidatura proclamada" : "No candidacy proclaimed",
    description:
      lang === "es"
        ? "No hay una candidatura proclamada que fichar. La publicación en el BOE está fechada el 3 de noviembre de 2026 en el calendario de la Junta Electoral Central."
        : "There is no proclaimed candidacy to file. The Central Electoral Board calendar dates BOE publication at 3 November 2026.",
    path,
    lang,
    alternatePath: `${spainHome(lang === "es" ? "en" : "es")}candidates/${slug}/`,
  });
}

export default async function CandidateSlugPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: raw, slug } = await params;
  const lang = asLang(raw);
  if (slug !== AWAITING_SLUG) notFound();
  const copy = ui(lang);
  const es = lang === "es";
  const path = `${spainHome(lang)}candidates/${slug}/`;
  const jec = sourceById("jec-candidaturas");
  return (
    <SpainFrame
      lang={lang}
      path={path}
      crumbs={[
        { name: copy.home, path: "/" },
        { name: copy.spain, path: "/es/" },
        { name: es ? "España" : "Spain", path: spainHome(lang) },
        { name: copy.candidates, path: `${spainHome(lang)}candidates/` },
        { name: es ? "Sin proclamar" : "Not proclaimed", path },
      ]}
      title={es ? "Ninguna candidatura proclamada" : "No candidacy has been proclaimed"}
      lede={
        es
          ? "Esta ficha existe para que la ruta de candidatura no quede vacía. No nombra a ninguna persona."
          : "This page keeps the candidacy route from being empty. It names no person."
      }
      officeHref={jec.url}
      officeLabel="Junta Electoral Central"
      sources={sourcesById(["jec-candidaturas", "jec-calendario", "rd-806-2026"])}
    >
      <GapNote label={copy.gap} text={copy.candidateGap} />
      <p className="text-sm">
        <Link className="text-navy underline" href={`${spainHome(lang)}candidates/`}>
          {copy.candidates}
        </Link>
      </p>
    </SpainFrame>
  );
}
