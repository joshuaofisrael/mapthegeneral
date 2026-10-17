#!/usr/bin/env python3
"""Distil the ministry's 2023 mayors workbook.

Download (read 17 October 2026):
https://concejales.redsara.es/consulta/getAlcaldesLegislatura

The sheet title is "Ficha de Alcaldes de la Legislatura 2023".
The publisher line is "Ministerio de Política Territorial y Memoria Democrática".
The Código INE column is six digits. The first five match INE table 29005.
"""

from __future__ import annotations

import json
import sys
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET

NS = {"m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main"}


def column_index(ref: str) -> int:
    letters = []
    for char in ref:
        if char.isalpha():
            letters.append(char)
        else:
            break
    index = 0
    for char in letters:
        index = index * 26 + ord(char) - 64
    return index - 1


def shared_strings(book: zipfile.ZipFile) -> list[str]:
    root = ET.fromstring(book.read("xl/sharedStrings.xml"))
    values = []
    for item in root.findall("m:si", NS):
        values.append("".join((node.text or "") for node in item.findall(".//m:t", NS)))
    return values


def cell_text(cell: ET.Element, strings: list[str]) -> str:
    kind = cell.get("t")
    value = cell.find("m:v", NS)
    if value is None or value.text is None:
        return ""
    if kind == "s":
        return strings[int(value.text)]
    return value.text


def main() -> None:
    if len(sys.argv) != 3:
        raise SystemExit("usage: extract-mayors.py ficha.xlsx mayors.json")
    book = zipfile.ZipFile(sys.argv[1])
    strings = shared_strings(book)
    sheet = ET.fromstring(book.read("xl/worksheets/sheet1.xml"))
    rows: dict[str, list[str]] = {}
    for row in sheet.findall("m:sheetData/m:row", NS):
        values = [""] * 10
        for cell in row.findall("m:c", NS):
            index = column_index(cell.get("r") or "A1")
            if index < len(values):
                values[index] = cell_text(cell, strings)
        code6 = values[0]
        if not (len(code6) == 6 and code6.isdigit()):
            continue
        code5 = code6[:5]
        if code5 in rows:
            raise SystemExit(f"duplicate municipality {code5}")
        rows[code5] = [code6, values[4], values[5], values[6], values[7], values[8], values[9]]
    Path(sys.argv[2]).write_text(
        json.dumps(rows, ensure_ascii=False, separators=(",", ":")),
        encoding="utf-8",
    )
    print(f"wrote {len(rows)} mayors")


if __name__ == "__main__":
    main()
