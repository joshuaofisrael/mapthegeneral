"use client";

import { useSearchParams } from "next/navigation";
import { SearchBox } from "./SearchBox";

export function SearchPanel({ postcodeNote }: { postcodeNote: string }) {
  const params = useSearchParams();
  return (
    <SearchBox
      initialQuery={params.get("q") ?? ""}
      placeholder="Spain, Sevilla, Ceuta, municipality"
      postcodeNote={postcodeNote}
    />
  );
}
