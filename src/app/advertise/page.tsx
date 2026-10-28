import type { Metadata } from "next";
import { AdvertiseOffer } from "@/components/AdvertiseOffer";
import { SITE, absoluteUrl } from "@/data/site";
import { pageMetadata } from "@/lib/metadata";

const description =
  "Exclusive homepage and country-hub banner for Israel election night, 27–30 Oct 2026, $1,000. Non-political businesses only.";

const base = pageMetadata({
  title: "Advertise",
  description,
  path: "/advertise",
  lang: "en",
  alternatePath: "/advertise/es",
});

export const metadata: Metadata = {
  ...base,
  description,
  alternates: {
    canonical: absoluteUrl("/advertise"),
    languages: {
      en: absoluteUrl("/advertise"),
      es: absoluteUrl("/advertise/es"),
      "x-default": absoluteUrl("/advertise"),
    },
  },
  openGraph: {
    ...base.openGraph,
    description,
    title: `Advertise · ${SITE.name}`,
  },
};

export default function AdvertisePage() {
  return <AdvertiseOffer lang="en" />;
}
