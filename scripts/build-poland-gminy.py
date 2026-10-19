#!/usr/bin/env python3
"""Build data/pl/gminy.json from the official TERC and PKW files read on 2026-10-19.

Inputs (not committed; they contain ward-boundary text):
  /tmp/pl-l3/terc.csv
  /tmp/pl-l3/wybrani.csv
  /tmp/pl-l3/okregi_rady_gmin_csv.zip

The JSON keeps the public-role fields only: TERC identity, the PKW office title,
the elected name, the registering committee, and the sum of „Liczba mandatów”.
"""

from __future__ import annotations

import csv
import json
import re
import unicodedata
import zipfile
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TERC = Path("/tmp/pl-l3/terc.csv")
WYBRANI = Path("/tmp/pl-l3/wybrani.csv")
OKREGI = Path("/tmp/pl-l3/okregi_rady_gmin_csv.zip")
OUT = ROOT / "data" / "pl" / "gminy.json"

KIND_TOKEN = {
    "gmina miejska": "miejska",
    "gmina wiejska": "wiejska",
    "gmina miejsko-wiejska": "miejsko-wiejska",
    "gmina miejska, miasto stołeczne": "stoleczne",
}


def slugify(value: str) -> str:
    text = value.replace("ł", "l").replace("Ł", "L")
    text = unicodedata.normalize("NFD", text)
    text = "".join(ch for ch in text if unicodedata.category(ch) != "Mn")
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    return text


def split_list(blob: str) -> list[str]:
    blob = re.sub(r"\s*stan prawny.*$", "", blob, flags=re.I)
    parts = []
    for part in blob.split(","):
        name = part.strip(" .\u00a0")
        if name:
            parts.append(name)
    return parts


# Senate table still prints the pre-2021 name. Dz.U. 2020 poz. 1331 § 1 renames it.
LAND_ALIAS = {("dolnoslaskie", "jeleniogórski"): "karkonoski"}


def parse_area(area: str) -> tuple[list[str], list[str]]:
    text = area.strip()
    text = re.sub(r"\s*stan prawny.*$", "", text, flags=re.I).strip()
    if re.match(r"obejmujący część obszaru", text):
        return [], []
    text = text.split("oraz część obszaru")[0].strip()
    pows: list[str] = []
    cities: list[str] = []
    match = re.search(r"obszary powiatów:\s*(.+?)(?:\s+oraz\s+miast|$)", text)
    if not match:
        match = re.search(r"obszar powiatu:\s*(.+?)(?:\s+oraz\s+miast|$)", text)
    if match:
        pows = split_list(match.group(1))
    match = re.search(r"miast(?:a)? na prawach powiatu:\s*(.+)$", text)
    if match:
        cities = []
        for name in split_list(match.group(1)):
            pieces = re.split(r"\s+i\s+", name) if " i " in name else [name]
            cities.extend(pieces)
    return pows, cities


def main() -> None:
    powiats = json.loads((ROOT / "data" / "pl" / "powiaty.json").read_text())
    senat = json.loads((ROOT / "data" / "pl" / "senat-okregi.json").read_text())
    sejm = json.loads((ROOT / "data" / "pl" / "sejm-okregi.json").read_text())

    by_code = {(row["woj"], row["pow"]): row for row in powiats}
    by_voj_name: dict[tuple[str, str, str], dict] = {}
    for row in powiats:
        kind = "city" if "prawach powiatu" in row["kind"] else "land"
        by_voj_name[(row["voivodeshipSlug"], kind, row["name"].casefold())] = row

    senat_of: dict[str, int] = {}
    split_codes: set[str] = set()
    for okreg in senat:
        area = okreg["area"]
        if "część obszaru miasta na prawach powiatu" in area:
            city = re.search(r"część obszaru miasta na prawach powiatu\s+([^:]+):", area)
            if not city:
                raise SystemExit(f"unparsed partial area {okreg['num']}: {area}")
            name = city.group(1).strip()
            row = by_voj_name.get((okreg["voivodeshipSlug"], "city", name.casefold()))
            if not row:
                raise SystemExit(f"partial city not in TERC: {okreg['num']} {name}")
            split_codes.add(row["code"])
        pow_names, city_names = parse_area(area)
        for name in pow_names:
            aliased = LAND_ALIAS.get((okreg["voivodeshipSlug"], name.casefold()), name)
            row = by_voj_name.get((okreg["voivodeshipSlug"], "land", aliased.casefold()))
            if not row:
                raise SystemExit(f"Senate okręg {okreg['num']} land name not in TERC: {name}")
            if row["code"] in senat_of:
                raise SystemExit(f"powiat {row['code']} in two Senate okręgi")
            senat_of[row["code"]] = okreg["num"]
        for name in city_names:
            row = by_voj_name.get((okreg["voivodeshipSlug"], "city", name.casefold()))
            if not row:
                raise SystemExit(f"Senate okręg {okreg['num']} city name not in TERC: {name}")
            if row["code"] in senat_of:
                raise SystemExit(f"city {row['code']} in two Senate okręgi")
            senat_of[row["code"]] = okreg["num"]

    missing = [row for row in powiats if row["code"] not in senat_of and row["code"] not in split_codes]
    if missing:
        raise SystemExit("powiats without a Senate okręg: " + ", ".join(row["code"] + " " + row["name"] for row in missing))

    sejm_by_voj: dict[str, list[int]] = defaultdict(list)
    for row in sejm:
        sejm_by_voj[row["voivodeshipSlug"]].append(row["num"])
    sejm_one = {slug: nums[0] for slug, nums in sejm_by_voj.items() if len(nums) == 1}

    winners: dict[str, dict[str, str]] = {}
    with WYBRANI.open(encoding="utf-8-sig", newline="") as handle:
        for row in csv.DictReader(handle, delimiter=";"):
            code = row["TERYT Gminy"].strip()
            if code in winners:
                raise SystemExit(f"duplicate winner {code}")
            winners[code] = {
                "office": row["Wybierany organ"].strip(),
                "elected": row["Wybrany kandydat"].strip(),
                "committee": row["Komitet zgłaszający kandydata"].strip(),
            }

    seats: dict[str, int] = defaultdict(int)
    seat_rows: dict[str, int] = defaultdict(int)
    with zipfile.ZipFile(OKREGI) as archive:
        name = archive.namelist()[0]
        text = archive.read(name).decode("utf-8")
    for row in csv.DictReader(text.splitlines(), delimiter=";"):
        code = row["TERYT Gminy"].strip()
        seats[code] += int(row["Liczba mandatów"])
        seat_rows[code] += 1

    gminas = []
    with TERC.open(encoding="utf-8-sig", newline="") as handle:
        for row in csv.DictReader(handle, delimiter=";"):
            if not row["GMI"] or not row["NAZWA_DOD"].startswith("gmina"):
                continue
            gminas.append(row)

    if len(gminas) != 2479:
        raise SystemExit(f"expected 2479 gminas, got {len(gminas)}")

    grouped: dict[tuple[str, str], list[dict]] = defaultdict(list)
    records = []
    for row in gminas:
        parent = by_code[(row["WOJ"], row["POW"])]
        code = row["WOJ"] + row["POW"] + row["GMI"]
        kind = row["NAZWA_DOD"]
        if kind not in KIND_TOKEN:
            raise SystemExit(f"unknown kind {kind} {code}")
        base = slugify(row["NAZWA"])
        item = {
            "code": code,
            "rodz": row["RODZ"],
            "name": row["NAZWA"],
            "kind": kind,
            "stanNa": row["STAN_NA"],
            "slug": base,
            "woj": row["WOJ"],
            "pow": row["POW"],
            "gmi": row["GMI"],
            "voivodeshipSlug": parent["voivodeshipSlug"],
            "powiatSlug": parent["slug"],
            "powiatCode": parent["code"],
            "office": None,
            "elected": None,
            "committee": None,
            "seats": seats.get(code),
            "seatRows": seat_rows.get(code, 0),
            "senat": senat_of.get(parent["code"]),
            "senatSplit": parent["code"] in split_codes,
            "sejm": sejm_one.get(parent["voivodeshipSlug"]),
        }
        winner = winners.get(code)
        if winner:
            item["office"] = winner["office"] or None
            item["elected"] = winner["elected"] or None
            item["committee"] = winner["committee"] or None
        grouped[(parent["voivodeshipSlug"], parent["slug"])].append(item)
        records.append(item)

    for items in grouped.values():
        counts: dict[str, int] = defaultdict(int)
        for item in items:
            counts[item["slug"]] += 1
        for item in items:
            token = KIND_TOKEN[item["kind"]]
            if counts[item["slug"]] > 1 or item["slug"] == "gminy":
                item["slug"] = f"{item['slug']}-{token}"

    slugs = [(item["voivodeshipSlug"], item["powiatSlug"], item["slug"]) for item in records]
    if len(slugs) != len(set(slugs)):
        raise SystemExit("slug collision")
    if any(item["slug"] == "gminy" for item in records):
        raise SystemExit("reserved slug")

    winner_codes = set(winners)
    gmina_codes = {item["code"] for item in records}
    extra = sorted(winner_codes - gmina_codes)
    missing_winners = sorted(gmina_codes - winner_codes)
    if extra:
        raise SystemExit(f"winners outside TERC: {extra}")

    records.sort(key=lambda item: (item["woj"], item["pow"], item["name"].casefold(), item["rodz"]))
    for item in records:
        item.pop("seatRows")
    OUT.write_text(json.dumps(records, ensure_ascii=False, indent=2) + "\n")

    okr20 = [item["code"] + " " + item["name"] for item in records if item["senat"] == 20]
    print(f"gminas {len(records)}")
    print(f"winners {len(winners)} missing {missing_winners}")
    print(f"with seats {sum(1 for item in records if item['seats'])}")
    print(f"senate assigned {sum(1 for item in records if item['senat'])} split {sum(1 for item in records if item['senatSplit'])}")
    print(f"sejm assigned {sum(1 for item in records if item['sejm'])}")
    print(f"okręg 20 gminas {len(okr20)}")
    print("kinds", {kind: sum(1 for item in records if item["kind"] == kind) for kind in KIND_TOKEN})
    print("bytes", OUT.stat().st_size)


if __name__ == "__main__":
    main()
