import { HubSources } from "@/components/ModestHub";
import { hubMetadata } from "@/data/new-hubs";

export const metadata = hubMetadata("ie", "sources");

export default function Page() {
  return <HubSources code="ie" />;
}
