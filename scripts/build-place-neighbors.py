#!/usr/bin/env python3
"""Nearby places from the official lists already in this repo.

The shipped place files do not include coordinates, so this does not invent
distances. Each place links to five other places in the same official parent
area. Where that file prints a population, the five are the largest others.
Otherwise they are the five closest official codes in that area.

Writes src/data/place-nearby.json. Pages that are not in the file are left
without this section. The values are ids the page renderers already know.
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "src" / "data" / "place-nearby.json"
NEAREST = 5


def load(path: str):
    return json.loads((ROOT / path).read_text())


def largest(items: list[dict], id_fn, pop_fn, name_fn) -> dict[str, list[str]]:
    ordered = sorted(items, key=lambda item: (-(pop_fn(item) if pop_fn(item) is not None else -1), name_fn(item), id_fn(item)))
    result: dict[str, list[str]] = {}
    for item in items:
        result[id_fn(item)] = [id_fn(other) for other in ordered if id_fn(other) != id_fn(item)][:NEAREST]
    return result


def closest_codes(items: list[dict], id_fn, code_fn) -> dict[str, list[str]]:
    parsed = [(item, code_fn(item)) for item in items]
    result: dict[str, list[str]] = {}
    for item, code in parsed:
        ranked = sorted(
            parsed,
            key=lambda pair: (abs(pair[1] - code), pair[1], id_fn(pair[0])),
        )
        result[id_fn(item)] = [id_fn(other) for other, _code in ranked if id_fn(other) != id_fn(item)][:NEAREST]
    return result


def index_neighbors(items: list[dict], id_fn, sort_fn) -> dict[str, list[str]]:
    ordered = sorted(items, key=lambda item: (sort_fn(item), id_fn(item)))
    result: dict[str, list[str]] = {}
    for index, item in enumerate(ordered):
        ranked = sorted(range(len(ordered)), key=lambda other: (abs(other - index), other))
        result[id_fn(item)] = [id_fn(ordered[other]) for other in ranked if other != index][:NEAREST]
    return result


def group(items: list[dict], key_fn) -> dict[str, list[dict]]:
    grouped: dict[str, list[dict]] = {}
    for item in items:
        grouped.setdefault(key_fn(item), []).append(item)
    return grouped


def gss_number(code: str) -> int:
    digits = "".join(ch for ch in code if ch.isdigit())
    if not digits:
        raise ValueError(f"No digits in GSS code {code}")
    return int(digits)


def main() -> None:
    nearby: dict[str, list[str]] = {}

    spain = load("src/data/spain/municipalities.json")["rows"]
    for _province, rows in group(
        [{"code": code, "name": name, "pop": pop} for code, name, pop in spain],
        lambda row: row["code"][:2],
    ).items():
        for code, ids in largest(rows, lambda row: row["code"], lambda row: row["pop"], lambda row: row["name"]).items():
            nearby[f"es:{code}"] = ids

    italy = load("src/data/italy/comuni-public.json")["comuni"]
    for rows in group(italy, lambda row: f"{row['regionSlug']}/{row['unitSlug']}").values():
        for code, ids in closest_codes(rows, lambda row: row["code"], lambda row: int(row["code"])).items():
            nearby[f"it:{code}"] = ids

    canada = load("src/data/ca/municipalities.json")
    for rows in group(canada, lambda row: row["cd"]).values():
        for code, ids in closest_codes(rows, lambda row: row["code"], lambda row: int(row["code"])).items():
            nearby[f"ca:{code}"] = ids

    seats = load("src/data/ca/legislature.json")
    for rows in group(seats, lambda row: row["region"]).values():
        for slug, ids in index_neighbors(rows, lambda row: row["slug"], lambda row: row["name"]).items():
            region = rows[0]["region"]
            nearby[f"ca-seat:{region}/{slug}"] = [f"{region}/{item}" for item in ids]

    poland = load("data/pl/gminy.json")
    for rows in group(poland, lambda row: f"{row['voivodeshipSlug']}/{row['powiatSlug']}").values():
        for code, ids in closest_codes(rows, lambda row: row["code"], lambda row: int(row["code"])).items():
            nearby[f"pl:{code}"] = ids

    councils = load("src/data/gb/level3.json")["councils"]

    def gb_group(council: dict) -> str:
        if council["kind"] == "county":
            return "counties"
        if council.get("countyCode"):
            return f"county:{council['countyCode']}"
        return f"{council['nation']}:{council['code'][:3]}"

    for rows in group(councils, gb_group).values():
        for code, ids in closest_codes(rows, lambda row: row["code"], lambda row: gss_number(row["code"])).items():
            nearby[f"gb:{code}"] = ids

    mexico = load("src/data/mx/municipios.json")
    for rows in group(mexico, lambda row: row["code"][:2]).values():
        for code, ids in largest(
            rows,
            lambda row: row["code"],
            lambda row: row["population"],
            lambda row: row["name"],
        ).items():
            nearby[f"mx:{code}"] = ids

    australia = load("src/data/au/level3.json")
    for rows in group(australia["areas"], lambda row: f"{row['jurisdictionSlug']}/{row['group']}").values():
        coded = [row for row in rows if str(row.get("absCode") or "").isdigit()]
        if len(coded) == len(rows) and rows:
            picked = closest_codes(rows, lambda row: row["slug"], lambda row: int(row["absCode"]))
        else:
            picked = index_neighbors(rows, lambda row: row["slug"], lambda row: row["name"])
        for slug, ids in picked.items():
            nearby[f"au-area:{rows[0]['jurisdictionSlug']}/{slug}"] = ids

    for rows in group(australia["districts"], lambda row: row["jurisdictionSlug"]).values():
        coded = [row for row in rows if str(row.get("absCode") or "").isdigit()]
        if coded and len(coded) == len(rows):
            picked = closest_codes(rows, lambda row: row["slug"], lambda row: int(row["absCode"]))
        else:
            picked = index_neighbors(rows, lambda row: row["slug"], lambda row: row["name"])
        for slug, ids in picked.items():
            nearby[f"au-dist:{rows[0]['jurisdictionSlug']}/{slug}"] = ids

    communes = load("data/ch/communes.json")
    for rows in group(communes, lambda row: f"{row['canton']}/{row['districtSlug']}").values():
        for bfs, ids in closest_codes(rows, lambda row: row["bfs"], lambda row: int(row["bfs"])).items():
            nearby[f"ch:{bfs}"] = ids

    madrid = nearby.get("es:28079")
    if not madrid or any(not code.startswith("28") or code == "28079" for code in madrid):
        raise SystemExit(f"Madrid neighbors were {madrid}")
    sample = nearby.get("gb:E07000240")
    if sample is None:
        raise SystemExit("St Albans council is missing from nearby places")

    OUT.write_text(json.dumps(nearby, ensure_ascii=False, separators=(",", ":")))
    print(f"place-nearby: {len(nearby)} places, {OUT.stat().st_size} bytes")


if __name__ == "__main__":
    main()
