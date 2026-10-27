import { HubElections } from "@/components/ModestHub";
import { bgHubMetadata } from "@/components/BgHub";

export const metadata = bgHubMetadata("elections", "en");

export default function Page() {
  return <HubElections code="bg" />;
}
