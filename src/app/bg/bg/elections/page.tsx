import { BgElectionsIndex, bgHubMetadata } from "@/components/BgHub";

export const metadata = bgHubMetadata("elections", "bg");

export default function Page() {
  return <BgElectionsIndex />;
}
