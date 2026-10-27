import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SPONSOR_CHECKOUT_URL } from "@/data/sponsorship";
import { SITE } from "@/data/site";
import { breadcrumbJsonLd } from "@/lib/metadata";

const COPY = {
  en: {
    eyebrow: "Sponsorship",
    title: "Book the banner",
    lede: "One exclusive sponsor on the homepage and every country hub, from 3 November 2026 at 00:00 Eastern Time to 6 November 2026 at 23:59 Eastern Time. The price is $1,000.",
    termsTitle: "Terms",
    where:
      "shows the banner on the homepage and on each country hub. It does not appear in the Israel results embed. One sponsor occupies the slot for the whole window.",
    terms: [
      "One exclusive banner across the site from 3 Nov 00:00 ET to 6 Nov 23:59 ET.",
      "Non-political businesses only: no candidates, parties, campaigns or issue advocacy in any country.",
      "Ads are reviewed and labelled 'Sponsored'.",
      "A full refund if not approved.",
      "No traffic guarantees.",
    ],
    pay: "Pay $1,000",
    after:
      "Payment is collected by Stripe. The banner runs only after the ad is approved. If it is not approved, the fee is refunded in full. The fee is for the placement. It is not a promise of visits.",
    home: "Home",
    crumb: "Advertise",
  },
  es: {
    eyebrow: "Patrocinio",
    title: "Reserve el banner",
    lede: "Un patrocinador exclusivo en la portada y en cada portal de país, del 3 de noviembre de 2026 a las 00:00 (hora del Este) al 6 de noviembre de 2026 a las 23:59 (hora del Este). El precio es $1,000.",
    termsTitle: "Condiciones",
    where:
      "muestra el banner en la portada y en cada portal de país. No aparece en el widget de resultados de Israel. Un solo patrocinador ocupa el espacio durante el periodo completo.",
    terms: [
      "Un banner exclusivo en el conjunto del sitio, del 3 de noviembre a las 00:00 ET al 6 de noviembre a las 23:59 ET.",
      "Solo negocios no políticos: ni candidaturas, ni partidos, ni campañas, ni defensa de causas, en ningún país.",
      "Los anuncios se revisan y se etiquetan como «Patrocinado».",
      "Reembolso completo si no se aprueba.",
      "Sin garantías de tráfico.",
    ],
    pay: "Pagar $1,000",
    after:
      "El pago lo cobra Stripe. El banner se publica solo si el anuncio se aprueba. Si no se aprueba, la tarifa se reembolsa por completo. La tarifa es por el espacio. No es una promesa de visitas.",
    home: "Inicio",
    crumb: "Anunciar",
  },
} as const;

export function AdvertiseOffer({ lang }: { lang: "en" | "es" }) {
  const copy = COPY[lang];
  const path = lang === "es" ? "/advertise/es" : "/advertise";
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: copy.home, path: "/" },
          { name: copy.crumb, path },
        ])}
      />
      <p className="mb-4 text-sm text-ink-muted">
        <Link className={lang === "es" ? "font-semibold text-ink" : "text-navy underline"} href="/advertise/es/">
          Español
        </Link>
        <span aria-hidden="true"> · </span>
        <Link className={lang === "en" ? "font-semibold text-ink" : "text-navy underline"} href="/advertise/">
          English
        </Link>
      </p>
      <Breadcrumbs items={[{ href: "/", label: copy.home }, { label: copy.crumb }]} />
      <PageHeader eyebrow={copy.eyebrow} title={copy.title} lede={copy.lede} />
      <div className="prose-legal">
        <p>
          {SITE.name} {copy.where}
        </p>
        <h2>{copy.termsTitle}</h2>
        <ul>
          {copy.terms.map((term) => (
            <li key={term}>{term}</li>
          ))}
        </ul>
        <p>{copy.after}</p>
        <p>
          <a className="sponsor-pay" href={SPONSOR_CHECKOUT_URL}>
            {copy.pay}
          </a>
        </p>
      </div>
    </div>
  );
}
