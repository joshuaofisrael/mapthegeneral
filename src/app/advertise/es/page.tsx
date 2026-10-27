import type { Metadata } from "next";
import { AdvertiseOffer } from "@/components/AdvertiseOffer";
import { SITE, absoluteUrl } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

const description =
  "Un banner exclusivo en la portada y en los portales de país, del 3 al 6 de noviembre de 2026, $1,000. Solo negocios no políticos. Sin garantía de tráfico.";

const base = pageMetadata({
  title: "Anunciar",
  description,
  path: "/advertise/es",
  lang: "es",
  alternatePath: "/advertise",
});

export const metadata: Metadata = {
  ...base,
  description,
  alternates: {
    canonical: absoluteUrl("/advertise/es"),
    languages: {
      en: absoluteUrl("/advertise"),
      es: absoluteUrl("/advertise/es"),
      "x-default": absoluteUrl("/advertise"),
    },
  },
  openGraph: {
    ...base.openGraph,
    description,
    title: `Anunciar · ${SITE.name}`,
  },
};

export default function AdvertiseSpanishPage() {
  return <AdvertiseOffer lang="es" />;
}
