import { HubSources } from "@/components/ModestHub";
import { hubMetadata } from "@/data/new-hubs";

export const metadata = hubMetadata("rs", "sources");

export default function Page() {
  return <HubSources code="rs" />;
}
