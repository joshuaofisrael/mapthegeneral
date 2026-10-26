import { HubSources } from "@/components/ModestHub";
import { hubMetadata } from "@/data/new-hubs";

export const metadata = hubMetadata("il", "sources");

export default function Page() {
  return <HubSources code="il" />;
}
