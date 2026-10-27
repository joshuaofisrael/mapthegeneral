import { HubSources } from "@/components/ModestHub";
import { bgHubMetadata } from "@/components/BgHub";

export const metadata = bgHubMetadata("sources", "en");

export default function Page() {
  return <HubSources code="bg" />;
}
