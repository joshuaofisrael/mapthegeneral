#!/usr/bin/env python3
"""Distil INE table 29005 (csv_bd) to the 2025 Total column.

Source file: https://www.ine.es/jaxiT3/files/t/csv_bd/29005.csv
Table page: https://www.ine.es/jaxiT3/Tabla.htm?t=29005

The table heading (read 17 October 2026) is the annual revision of the
municipal register at 1 January of each year. This script keeps period 2025
and sex Total, and checks that the figures add up to the provincial
populations already typed from Real Decreto 1117/2025.
"""

from __future__ import annotations

import json
import re
import sys
from collections import defaultdict
from pathlib import Path


def province_populations(places_path: Path) -> dict[str, int]:
    text = places_path.read_text(encoding="utf-8")
    found = re.findall(r'ineCode: "(\d{2})"[\s\S]*?population: (\d+)', text)
    populations = {code: int(population) for code, population in found}
    if len(populations) != 52:
        raise SystemExit(f"expected 52 INE codes in {places_path}, found {len(populations)}")
    return populations


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("usage: extract-municipalities.py 29005.csv municipalities.json")
    csv_path, out_path = Path(sys.argv[1]), Path(sys.argv[2])
    places = province_populations(Path(__file__).resolve().parents[1] / "src/data/spain/places.ts")
    rows: list[tuple[str, str, int]] = []
    empty: list[tuple[str, str]] = []
    seen: set[str] = set()
    sums: dict[str, int] = defaultdict(int)

    text = csv_path.read_text(encoding="utf-8-sig")
    for index, line in enumerate(text.splitlines()):
        if index == 0:
            header = line.split("\t")
            if header != ["Municipios", "Sexo", "Periodo", "Total"]:
                raise SystemExit(f"unexpected header {header}")
            continue
        municipality, sex, period, total = line.split("\t")
        if sex != "Total" or period != "2025":
            continue
        code, name = municipality[:5], municipality[6:]
        if not (len(code) == 5 and code.isdigit() and municipality[5:6] == " "):
            raise SystemExit(f"unexpected municipality field {municipality!r}")
        if code in seen:
            raise SystemExit(f"duplicate code {code}")
        seen.add(code)
        number = total.strip().strip('"').replace(".", "").replace(",", "")
        if not number.isdigit():
            empty.append((code, name))
            continue
        population = int(number)
        rows.append((code, name, population))
        sums[code[:2]] += population

    mismatches = [
        (code, places.get(code), total)
        for code, total in sorted(sums.items())
        if places.get(code) != total
    ]
    if mismatches:
        raise SystemExit(f"provincial totals do not match Real Decreto 1117/2025: {mismatches}")
    missing = sorted(set(places) - set(sums))
    if missing:
        raise SystemExit(f"no 2025 rows for INE codes {missing}")

    rows.sort(key=lambda item: item[0])
    empty.sort(key=lambda item: item[0])
    payload = {
        "table": "29005",
        "period": "2025",
        "sex": "Total",
        "rows": rows,
        "emptyTotal": empty,
    }
    out_path.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"wrote {len(rows)} municipalities and {len(empty)} empty totals to {out_path}")


if __name__ == "__main__":
    main()
