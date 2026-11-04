import { OddsMeter } from "@/components/OddsMeter";
import { IlResultsPage, ilResultsMetadata } from "@/components/IlResultsPage";

export const metadata = ilResultsMetadata("en");

export default function Page() {
  return (
    <>
      <IlResultsPage lang="en" />
      <div className="mx-auto max-w-site px-4"><OddsMeter slug="who-will-be-the-next-prime-minister-of-israel-after-the-next-election" title="next Israeli prime minister" /></div>
    </>
  );
}
