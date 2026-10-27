import { HubNational } from "@/components/ModestHub";
import { bgHubMetadata } from "@/components/BgHub";

export const metadata = bgHubMetadata("national", "en");

export default function Page() {
  return <HubNational code="bg" />;
}
