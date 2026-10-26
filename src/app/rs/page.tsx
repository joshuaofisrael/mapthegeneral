import { HubChooser } from "@/components/ModestHub";
import { hubMetadata } from "@/data/new-hubs";

export const metadata = hubMetadata("rs", "chooser");

export default function Page() {
  return <HubChooser code="rs" />;
}
