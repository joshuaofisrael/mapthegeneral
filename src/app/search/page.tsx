import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { SearchPanel } from "@/components/SearchPanel";
import { ui } from "@/data/spain/ui";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Search",
  description:
    "Search countries, communities, provinces, and municipalities. Matching runs in the browser. Unofficial information.",
  path: "/search",
});

export default function SearchPage() {
  const copy = ui("en");
  return (
    <div className="mx-auto max-w-3xl">
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Search", path: "/search" }])} />
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Search" }]} />
      <PageHeader
        eyebrow="Search"
        title="Search the guide"
        lede="Country, community, and province names. The index file is loaded in your browser."
      />
      <Suspense fallback={<p className="text-sm text-ink-muted">Loading search.</p>}>
        <SearchPanel postcodeNote={copy.postcodeGap} />
      </Suspense>
    </div>
  );
}
