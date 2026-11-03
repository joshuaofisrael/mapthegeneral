import Link from "@/components/AnchorLink";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PageHeader } from "@/components/PageHeader";
import { SITE } from "@/data/legal-entity";
import { pageMetadata } from "@/lib/metadata";

export const metadata = {
  ...pageMetadata({
    title: "You're signed up",
    description: `Your signup for election results by email from ${SITE.name} was received.`,
    path: "/updates/thanks",
  }),
  robots: { index: false, follow: true },
};

export default function UpdatesThanksPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Breadcrumbs items={[{ href: "/", label: "Home" }, { label: "Email updates" }]} />
      <PageHeader eyebrow="Email updates" title="You're signed up" lede="We'll email election results and updates. Unsubscribe anytime." />
      <div className="prose-legal">
        <p>
          If something went wrong, go back and try again. See the <Link href="/privacy/#election-updates">privacy policy</Link>{" "}
          for how we use your address.
        </p>
        <p>
          <Link href="/">Back to the home page</Link>
        </p>
      </div>
    </div>
  );
}
