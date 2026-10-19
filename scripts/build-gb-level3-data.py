#!/usr/bin/env python3
"""Build src/data/gb/level3.json from the ONS files in /tmp/gb-l3 and the GOV.UK timetable names read on 19 October 2026.

The timetable lists are the named lists on
https://www.gov.uk/government/publications/election-timetable-in-england/election-timetable-in-england
(updated 22 July 2025). A council whose name does not match exactly one ONS name is not assigned by guesswork.
"""

from __future__ import annotations

import json
import re
import unicodedata
from collections import defaultdict
from pathlib import Path

ROOT = Path("/workspace")
SRC = Path("/tmp/gb-l3")
OUT = ROOT / "src/data/gb/level3.json"

READ = "2026-10-19"
READ_LONG = "19 October 2026"
EC_READ = "17 October 2026"


def feats(name: str) -> list[dict]:
    data = json.loads((SRC / name).read_text())
    return [row["attributes"] for row in data["features"]]


def slugify(name: str) -> str:
    text = unicodedata.normalize("NFKD", name)
    text = "".join(ch for ch in text if not unicodedata.combining(ch))
    text = text.replace("&", " and ")
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    return text


def norm(name: str) -> str:
    text = name.replace("’", "'").replace("`", "'")
    text = text.split("(", 1)[0]
    text = unicodedata.normalize("NFKD", text)
    text = "".join(ch for ch in text if not unicodedata.combining(ch))
    text = text.lower().replace(".", "").replace("'", "")
    text = re.sub(r"[^a-z0-9]+", " ", text).strip()
    return text


# Timetable wording that is not the ONS name. Applied only after an exact normalised match fails.
ALIAS = {
    "hull": "kingston upon hull city of",
    "southend": "southend on sea",
    "canterbury city": "canterbury",
    "lancaster city": "lancaster",
    "bristol": "bristol city of",
    "herefordshire": "herefordshire county of",
    "stratford upon avon": "stratford on avon",
    "telford and the wrekin": "telford and wrekin",
}

NAME_NOTES = {
    "hull": "The timetable prints “Hull”. The ONS name is Kingston upon Hull, City of.",
    "southend": "The timetable prints “Southend”. The ONS name is Southend-on-Sea.",
    "canterbury city": "The timetable prints “Canterbury City”. The ONS name is Canterbury.",
    "lancaster city": "The timetable prints “Lancaster City”. The ONS name is Lancaster.",
    "bristol": "The timetable prints “Bristol”. The ONS name is Bristol, City of.",
    "herefordshire": "The timetable prints “Herefordshire”. The ONS name is Herefordshire, County of.",
    "tewkesbury": "The timetable prints “Tewkesbury (North Gloucestershire from December 2024)”. The ONS name is Tewkesbury.",
    "stratford upon avon": "The timetable prints “Stratford upon Avon”. The ONS name is Stratford-on-Avon.",
    "telford and the wrekin": "The timetable prints “Telford and The Wrekin”. The ONS name is Telford and Wrekin.",
}

POSTPONED = {
    "East Sussex",
    "Essex",
    "Hampshire",
    "Norfolk",
    "Suffolk",
    "Surrey",
    "West Sussex",
    "Isle of Wight",
    "Thurrock",
}

COUNTIES = [
    "Cambridgeshire",
    "Derbyshire",
    "Devon",
    "East Sussex",
    "Essex",
    "Gloucestershire",
    "Hampshire",
    "Hertfordshire",
    "Kent",
    "Lancashire",
    "Leicestershire",
    "Lincolnshire",
    "Norfolk",
    "Nottinghamshire",
    "Oxfordshire",
    "Staffordshire",
    "Suffolk",
    "Surrey",
    "Warwickshire",
    "West Sussex",
    "Worcestershire",
]

LONDON = [
    "Barking and Dagenham",
    "Barnet",
    "Bexley",
    "Brent",
    "Bromley",
    "Camden",
    "Croydon",
    "Ealing",
    "Enfield",
    "Greenwich",
    "Hackney",
    "Hammersmith and Fulham",
    "Haringey",
    "Harrow",
    "Havering",
    "Hillingdon",
    "Hounslow",
    "Islington",
    "Kensington and Chelsea",
    "Kingston upon Thames",
    "Lambeth",
    "Lewisham",
    "Merton",
    "Newham",
    "Redbridge",
    "Richmond upon Thames",
    "Southwark",
    "Sutton",
    "Tower Hamlets",
    "Waltham Forest",
    "Wandsworth",
    "Westminster",
]

METRO_THIRDS = [
    "Bolton",
    "Bradford",
    "Bury",
    "Dudley",
    "Gateshead",
    "Kirklees",
    "Knowsley",
    "Leeds",
    "Manchester",
    "Newcastle Upon Tyne",
    "North Tyneside",
    "Oldham",
    "Rochdale",
    "Salford",
    "Sandwell",
    "Sefton",
    "Sheffield",
    "Solihull",
    "South Tyneside",
    "Stockport",
    "Sunderland",
    "Tameside",
    "Trafford",
    "Wakefield",
    "Walsall",
    "Wigan",
    "Wolverhampton",
]

METRO_2027 = ["Liverpool", "Wirral"]
METRO_LGBCE = ["Calderdale", "Coventry"]
METRO_2026 = ["Barnsley", "Birmingham", "St Helens"]

DISTRICT_2027 = [
    "Amber Valley",
    "Arun",
    "Ashfield",
    "Ashford",
    "Babergh",
    "Bassetlaw",
    "Blaby",
    "Bolsover",
    "Boston",
    "Braintree",
    "Breckland",
    "Broadland",
    "Bromsgrove",
    "Broxtowe",
    "Canterbury City",
    "Charnwood",
    "Chelmsford",
    "Chesterfield",
    "Chichester",
    "Cotswold",
    "Dacorum",
    "Dartford",
    "Derbyshire Dales",
    "Dover",
    "East Cambridgeshire",
    "East Devon",
    "East Hampshire",
    "East Hertfordshire",
    "East Lindsey",
    "East Staffordshire",
    "East Suffolk",
    "Eastbourne",
    "Epsom and Ewell",
    "Erewash",
    "Fenland",
    "Folkestone and Hythe",
    "Forest of Dean",
    "Fylde",
    "Gedling",
    "Gravesham",
    "Great Yarmouth",
    "Guildford",
    "Harborough",
    "Hertsmere",
    "High Peak",
    "Hinckley and Bosworth",
    "Horsham",
    "King’s Lynn and West Norfolk",
    "Lancaster City",
    "Lewes",
    "Lichfield",
    "Maldon",
    "Malvern Hills",
    "Mansfield",
    "Melton",
    "Mid Devon",
    "Mid Suffolk",
    "Mid Sussex",
    "New Forest",
    "Newark and Sherwood",
    "North Devon",
    "North East Derbyshire",
    "North Kesteven",
    "North Norfolk",
    "North Warwickshire",
    "North West Leicestershire",
    "Oadby and Wigston",
    "Ribble Valley",
    "Rother",
    "Rushcliffe",
    "Sevenoaks",
    "South Derbyshire",
    "South Hams",
    "South Holland",
    "South Kesteven",
    "South Norfolk",
    "South Oxfordshire",
    "South Ribble",
    "South Staffordshire",
    "Spelthorne",
    "Stafford",
    "Staffordshire Moorlands",
    "Stratford upon Avon",
    "Surrey Heath",
    "Swale",
    "Teignbridge",
    "Tendring",
    "Test Valley",
    "Tewkesbury (North Gloucestershire from December 2024)",
    "Thanet",
    "Tonbridge and Malling",
    "Torridge",
    "Uttlesford",
    "Vale Of White Horse",
    "Warwick",
    "Waverley",
    "Wealden",
    "West Devon",
    "West Lindsey",
    "West Suffolk",
    "Wychavon",
    "Wyre",
    "Wyre Forest",
]

DISTRICT_THIRDS = [
    "Basildon",
    "Basingstoke and Deane",
    "Brentwood",
    "Broxbourne",
    "Burnley",
    "Cambridge",
    "Cannock Chase",
    "Cherwell",
    "Chorley",
    "Colchester",
    "Crawley",
    "Eastleigh",
    "Elmbridge",
    "Epping Forest",
    "Exeter",
    "Harlow",
    "Hart",
    "Havant",
    "Hyndburn",
    "Ipswich",
    "Lincoln",
    "Mole Valley",
    "Norwich",
    "Pendle",
    "Preston",
    "Redditch",
    "Reigate and Banstead",
    "Rochford",
    "Rugby",
    "Runnymede",
    "Rushmoor",
    "St Albans",
    "Stevenage",
    "Tamworth",
    "Tandridge",
    "Three Rivers",
    "Tunbridge Wells",
    "Watford",
    "Welwyn Hatfield",
    "West Lancashire",
    "West Oxfordshire",
    "Winchester",
    "Woking",
    "Worthing",
]

DISTRICT_2028 = [
    "Castle Point",
    "Gloucester",
    "Maidstone",
    "North Hertfordshire",
    "Rossendale",
    "Stroud",
    "Worcester",
]

DISTRICT_2026 = ["Huntingdonshire", "Newcastle-under-Lyme", "South Cambridgeshire"]

DISTRICT_HALVES = [
    "Adur",
    "Cheltenham",
    "Fareham",
    "Gosport",
    "Hastings",
    "Nuneaton and Bedworth",
    "Oxford",
]

UNITARY_2027 = [
    "Bath and North East Somerset",
    "Bedford",
    "Blackpool",
    "Bournemouth, Christchurch and Poole",
    "Bracknell Forest",
    "Brighton and Hove",
    "Central Bedfordshire",
    "Cheshire East",
    "Cheshire West and Chester",
    "Darlington",
    "Derby",
    "East Riding of Yorkshire",
    "Herefordshire",
    "Leicester",
    "Luton",
    "Medway",
    "Middlesbrough",
    "North Lincolnshire",
    "North Somerset",
    "Nottingham",
    "Redcar and Cleveland",
    "Rutland",
    "Slough",
    "South Gloucestershire",
    "Stockton-on-Tees",
    "Stoke-on-Trent",
    "Telford and The Wrekin",
    "Torbay",
    "West Berkshire",
    "Windsor and Maidenhead",
    "York",
]

UNITARY_2027_FROM_2022 = ["Cumberland", "North Yorkshire", "Somerset", "Westmorland and Furness"]

UNITARY_2025 = [
    "Buckinghamshire",
    "Cornwall",
    "County Durham",
    "Isle of Wight",
    "North Northamptonshire",
    "Northumberland",
    "Shropshire",
    "Thurrock",
    "West Northamptonshire",
    "Wiltshire",
]

UNITARY_BRISTOL = ["Bristol", "Warrington"]

UNITARY_THIRDS = [
    "Blackburn with Darwen",
    "Halton",
    "Hartlepool",
    "Hull",
    "Milton Keynes",
    "North East Lincolnshire",
    "Peterborough",
    "Plymouth",
    "Portsmouth",
    "Reading",
    "Southampton",
    "Southend",
    "Swindon",
    "Wokingham",
]

GROUPS: list[tuple[str, str, list[str]]] = [
    ("county-2025", "County council", COUNTIES),
    ("london-2026", "London borough", LONDON),
    ("metro-thirds", "Metropolitan district", METRO_THIRDS),
    ("metro-2027", "Metropolitan district", METRO_2027),
    ("metro-lgbce", "Metropolitan district", METRO_LGBCE),
    ("metro-2026", "Metropolitan district", METRO_2026),
    ("doncaster", "Metropolitan district", ["Doncaster"]),
    ("rotherham", "Metropolitan district", ["Rotherham"]),
    ("district-2027", "District council", DISTRICT_2027),
    ("district-thirds", "District council", DISTRICT_THIRDS),
    ("district-2028", "District council", DISTRICT_2028),
    ("district-2026", "District council", DISTRICT_2026),
    ("district-halves", "District council", DISTRICT_HALVES),
    ("unitary-2027", "Unitary authority", UNITARY_2027),
    ("unitary-2027-from-2022", "Unitary authority", UNITARY_2027_FROM_2022),
    ("unitary-2025", "Unitary authority", UNITARY_2025),
    ("unitary-bristol", "Unitary authority", UNITARY_BRISTOL),
    ("dorset", "Unitary authority", ["Dorset"]),
    ("unitary-thirds", "Unitary authority", UNITARY_THIRDS),
    ("isles-of-scilly", "Isles of Scilly", ["Isles of Scilly"]),
    ("city-of-london", "City of London", ["City of London"]),
]


def may_sentence(year: int) -> str:
    return (
        f"The next year that timetable text names after {READ_LONG} is {year}. "
        f"The Electoral Commission schedule read on {EC_READ} lists English local government in May {year} and does not print a day."
    )


def year_only(year: int) -> str:
    return f"The next year that timetable text names after {READ_LONG} is {year}. It does not print a day."


CYCLE_TEXT: dict[str, tuple[str, str, bool]] = {
    "county-2025": (
        "The GOV.UK election timetable, updated 22 July 2025, says all 21 county councils hold whole-council elections in 2025, 2029 and every 4th year.",
        may_sentence(2029),
        False,
    ),
    "london-2026": (
        "The timetable says all 32 London borough councils hold whole-council elections in 2026, 2030 and every 4th year. The City of London is not in that list.",
        year_only(2030),
        True,
    ),
    "metro-thirds": (
        "The timetable’s named list says these 27 metropolitan district councils elect by thirds in 2026, 2027, 2028 and so on, and that elections are held every year except the county council year. The summary table on the same page prints 2026, 2027, 2029, 2030 and so on for 27 metropolitan districts. This page does not choose which later year is skipped.",
        may_sentence(2027),
        True,
    ),
    "metro-2027": (
        "The timetable says these metropolitan district councils hold whole-council elections in 2027, 2031 and every 4th year.",
        may_sentence(2027),
        False,
    ),
    "metro-lgbce": (
        "The timetable says these metropolitan district councils hold whole-council elections following a Local Government Boundary Commission for England review, reverting to thirds in 2027, 2028 and 2030. It does not print the year of that whole-council election.",
        may_sentence(2027),
        False,
    ),
    "metro-2026": (
        "The timetable says these metropolitan district councils hold whole-council elections in 2026, 2030 and every 4th year.",
        year_only(2030),
        True,
    ),
    "doncaster": (
        "The summary table has a row for Metropolitan District - Doncaster: whole-council elections in 2025, 2029 and every 4th year. Doncaster is not in the named metropolitan lists on the same page.",
        may_sentence(2029),
        False,
    ),
    "rotherham": (
        "The summary table has a row for Metropolitan District - Rotherham: whole-council elections in 2028, 2032 and every 4th year. Rotherham is not in the named metropolitan lists on the same page.",
        may_sentence(2028),
        False,
    ),
    "district-2027": (
        "The timetable says these district councils hold whole-council elections in 2027, 2031 and every 4th year.",
        may_sentence(2027),
        False,
    ),
    "district-thirds": (
        "The timetable’s named list says these district councils elect by thirds in 2026, 2027, 2028 and so on, and that elections are held every year except the county council year. The summary table prints 2026, 2027, 2029, 2030 and so on for 44 districts. This page does not choose which later year is skipped.",
        may_sentence(2027),
        True,
    ),
    "district-2028": (
        "The timetable says these district councils hold whole-council elections in 2028, 2032 and every 4th year.",
        may_sentence(2028),
        False,
    ),
    "district-2026": (
        "The timetable says these district councils hold whole-council elections in 2026, 2030 and every 4th year.",
        year_only(2030),
        True,
    ),
    "district-halves": (
        "The timetable says these district councils elect by halves in 2026, 2028 and every alternate year.",
        may_sentence(2028),
        True,
    ),
    "unitary-2027": (
        "The timetable says these unitary authorities hold whole-council elections in 2027, 2031 and every 4th year.",
        may_sentence(2027),
        False,
    ),
    "unitary-2027-from-2022": (
        "The named list says these four unitary authorities hold whole-council elections in 2027, 2031 and every 4th year. The summary table says four unitary authorities were elected in 2022, then once every 4 years from 2027.",
        may_sentence(2027),
        False,
    ),
    "unitary-2025": (
        "The timetable says these unitary authorities hold whole-council elections in 2025, 2029 and every 4th year.",
        may_sentence(2029),
        False,
    ),
    "unitary-bristol": (
        "The named list says Bristol and Warrington hold whole-council elections in 2028, 2030 and every 4th year. The summary table says two unitary authorities elect in 2028, 2032 and every 4th year. This page does not choose 2030 or 2032.",
        may_sentence(2028),
        False,
    ),
    "dorset": (
        "The summary table has a row for Unitary authority - Dorset: all councillors elected once every 4 years from 2029, following a 5 year gap from 2024, and it prints 2029, 2034 and every 4th year. Dorset is not in the named unitary lists. This page uses that summary row and does not reconcile 2029 then 2034 with every 4th year.",
        may_sentence(2029),
        False,
    ),
    "unitary-thirds": (
        "The timetable’s named list says these unitary authorities elect by thirds in 2026, 2027, 2028 and so on, and that elections are held every year except the county council year. The summary table prints 2026, 2027, 2029, 2030 and so on for 14 unitary authorities. This page does not choose which later year is skipped.",
        may_sentence(2027),
        True,
    ),
    "isles-of-scilly": (
        "The timetable groups the Isles of Scilly and the City of London: whole-council elections in 2025, 2029 and every 4th year.",
        may_sentence(2029),
        False,
    ),
    "city-of-london": (
        "The timetable groups the Isles of Scilly and the City of London: whole-council elections in 2025, 2029 and every 4th year. The City of London is not in the list of 32 London boroughs.",
        may_sentence(2029),
        False,
    ),
    "scotland": (
        f"The Electoral Commission corporate-plan table, read on {EC_READ}, lists Scottish council elections in May 2027 and does not print a day.",
        f"This page treats May 2027 as the next scheduled Scottish council election in that table. It does not print a day.",
        False,
    ),
    "wales": (
        f"The Electoral Commission corporate-plan table, read on {EC_READ}, lists Welsh local government in May 2027 and does not print a day.",
        f"This page treats May 2027 as the next scheduled Welsh local government election in that table. It does not print a day.",
        False,
    ),
    "northern-ireland": (
        f"The Electoral Commission corporate-plan table, read on {EC_READ}, lists Northern Ireland local government in May 2027 and does not print a day.",
        f"This page treats May 2027 as the next scheduled Northern Ireland local government election in that table. It does not print a day.",
        False,
    ),
}

POSTPONE_SENTENCE = (
    " The same page says legislation has postponed the elections scheduled in May 2025 to May 2026 for this council."
)
POSTPONE_NEXT = (
    f" May 2026 is before {READ_LONG}. The timetable still names 2029 and every 4th year, and it does not say that 2029 moves."
)


def nation_of(code: str) -> str:
    prefix = code[:1]
    return {"E": "england", "S": "scotland", "W": "wales", "N": "northern-ireland"}[prefix]


def main() -> None:
    lads = feats("lad.json")
    counties = feats("cty.json")
    regions = {row["RGN25CD"]: row for row in feats("rgn.json")}
    lad_region = {row["LAD25CD"]: row for row in feats("lad-rgn.json")}
    lad_cty = {row["LAD25CD"]: row for row in feats("lad-ctyua.json")}
    cauth_rows = feats("cauth.json")
    lad_cauth_rows = feats("lad-cauth.json")

    by_norm: dict[str, list[dict]] = defaultdict(list)
    for row in lads + counties:
        name = row.get("LAD25NM") or row["CTY25NM"]
        by_norm[norm(name)].append(row)

    assignment: dict[str, dict] = {}
    problems: list[str] = []
    for cycle_id, class_label, names in GROUPS:
        for printed in names:
            key = norm(printed)
            hits = by_norm.get(key) or []
            if len(hits) != 1 and key in ALIAS:
                hits = by_norm.get(ALIAS[key]) or []
            if len(hits) != 1:
                close = [n for n in by_norm if key[:6] in n][:8]
                problems.append(f"{printed!r} -> {len(hits)} hits; close {close}")
                continue
            row = hits[0]
            code = row.get("LAD25CD") or row["CTY25CD"]
            if code in assignment:
                problems.append(f"{printed} double-assigned {code}")
                continue
            assignment[code] = {
                "cycleId": cycle_id,
                "classLabel": class_label,
                "timetableName": printed if norm(printed) != norm(row.get("LAD25NM") or row["CTY25NM"]) else None,
                "nameNote": NAME_NOTES.get(key),
            }

    if problems:
        raise SystemExit("MATCH PROBLEMS\n" + "\n".join(problems))

    english_codes = [row["LAD25CD"] for row in lads if row["LAD25CD"].startswith("E")] + [
        row["CTY25CD"] for row in counties
    ]
    missing = [code for code in english_codes if code not in assignment]
    if missing:
        names = []
        lookup = {row["LAD25CD"]: row["LAD25NM"] for row in lads}
        lookup.update({row["CTY25CD"]: row["CTY25NM"] for row in counties})
        for code in missing:
            names.append(f"{code} {lookup[code]}")
        raise SystemExit("UNASSIGNED\n" + "\n".join(names))

    level2 = json.loads((ROOT / "src/data/gb/level2.json").read_text())
    gss = {seat["gss"] for seat in level2["westminster"]}

    lad_pcon: dict[str, set[str]] = defaultdict(set)
    cty_pcon: dict[str, set[str]] = defaultdict(set)
    lad_split: set[str] = set()
    cty_split: set[str] = set()
    unknown: set[str] = set()
    for row in feats("wards.json"):
        pcon = row["PCON24CD"]
        if pcon not in gss:
            unknown.add(pcon)
        lad_pcon[row["LAD25CD"]].add(pcon)
        cty_pcon[row["CTYUA25CD"]].add(pcon)
        if row.get("SPLIT_WARD") in ("Yes", "TRUE"):
            lad_split.add(row["LAD25CD"])
            cty_split.add(row["CTYUA25CD"])
    if unknown:
        raise SystemExit(f"PCON codes missing from level 2: {sorted(unknown)[:20]}")

    cauth_by_lad: dict[str, dict] = {}
    members: dict[str, list[str]] = defaultdict(list)
    for row in lad_cauth_rows:
        cauth_by_lad[row["LAD25CD"]] = row
        members[row["CAUTH25CD"]].append(row["LAD25CD"])

    mayoral = {
        "E47000001",
        "E47000002",
        "E47000003",
        "E47000004",
        "E47000006",
        "E47000007",
        "E47000008",
        "E47000009",
        "E47000012",
        "E47000013",
        "E47000014",
        "E47000016",
        "E47000017",
    }
    non_mayoral = {"E47000015", "E47000018"}
    seen_cauth = {row["CAUTH25CD"] for row in cauth_rows}
    if seen_cauth != mayoral | non_mayoral:
        raise SystemExit(f"unexpected combined authorities {seen_cauth ^ (mayoral | non_mayoral)}")

    councils = []
    for row in lads:
        code = row["LAD25CD"]
        nation = nation_of(code)
        welsh = row.get("LAD25NMW") or None
        region_row = lad_region.get(code)
        region = regions.get(region_row["RGN25CD"]) if region_row else None
        parent = lad_cty[code]
        county = None
        if parent["CTYUA25CD"] != code and parent["CTYUA25CD"].startswith("E10"):
            county = {
                "code": parent["CTYUA25CD"],
                "name": parent["CTYUA25NM"],
                "slug": slugify(parent["CTYUA25NM"]),
            }
        cauth = cauth_by_lad.get(code)
        cycle = assignment.get(code)
        if nation == "scotland":
            cycle = {"cycleId": "scotland", "classLabel": "Scottish council", "timetableName": None, "nameNote": None}
        elif nation == "wales":
            cycle = {"cycleId": "wales", "classLabel": "Welsh council", "timetableName": None, "nameNote": None}
        elif nation == "northern-ireland":
            cycle = {
                "cycleId": "northern-ireland",
                "classLabel": "Northern Ireland council",
                "timetableName": None,
                "nameNote": None,
            }
        assert cycle is not None
        timetable, next_text, show_2026 = CYCLE_TEXT[cycle["cycleId"]]
        postponed = row["LAD25NM"] in POSTPONED
        if postponed:
            timetable += POSTPONE_SENTENCE
            next_text += POSTPONE_NEXT
            show_2026 = True
        cauth_slug = slugify(cauth["CAUTH25NM"]) if cauth and cauth["CAUTH25CD"] in mayoral else None
        councils.append(
            {
                "code": code,
                "name": row["LAD25NM"],
                "welshName": welsh,
                "slug": slugify(row["LAD25NM"]),
                "nation": nation,
                "kind": "lad",
                "file": "LAD_APR_2025_UK_NC_v2",
                "classLabel": cycle["classLabel"],
                "cycleId": cycle["cycleId"],
                "timetable": timetable,
                "nextText": next_text,
                "show2026Day": show_2026,
                "nameNote": cycle["nameNote"],
                "regionCode": region["RGN25CD"] if region else None,
                "regionName": region["RGN25NM"] if region else None,
                "regionWelsh": region["RGN25NMW"] if region else None,
                "countyCode": county["code"] if county else None,
                "countyName": county["name"] if county else None,
                "countySlug": county["slug"] if county else None,
                "cauthCode": cauth["CAUTH25CD"] if cauth else None,
                "cauthName": cauth["CAUTH25NM"] if cauth else None,
                "cauthMayoral": bool(cauth and cauth["CAUTH25CD"] in mayoral),
                "cauthSlug": cauth_slug,
                "pcon": sorted(lad_pcon[code]),
                "splitWard": code in lad_split,
            }
        )

    # County region from member districts.
    districts_by_county: dict[str, list[dict]] = defaultdict(list)
    for council in councils:
        if council["countyCode"]:
            districts_by_county[council["countyCode"]].append(council)

    for row in counties:
        code = row["CTY25CD"]
        cycle = assignment[code]
        children = districts_by_county[code]
        region_codes = {child["regionCode"] for child in children}
        region_code = next(iter(region_codes)) if len(region_codes) == 1 else None
        region = regions.get(region_code) if region_code else None
        postponed = row["CTY25NM"] in POSTPONED
        timetable, next_text, show_2026 = CYCLE_TEXT[cycle["cycleId"]]
        if postponed:
            timetable += POSTPONE_SENTENCE
            next_text += POSTPONE_NEXT
            show_2026 = True
        councils.append(
            {
                "code": code,
                "name": row["CTY25NM"],
                "welshName": None,
                "slug": slugify(row["CTY25NM"]),
                "nation": "england",
                "kind": "county",
                "file": "CTY_DEC_2025_EN_NC",
                "classLabel": cycle["classLabel"],
                "cycleId": cycle["cycleId"],
                "timetable": timetable,
                "nextText": next_text,
                "show2026Day": show_2026,
                "nameNote": None,
                "regionCode": region["RGN25CD"] if region else None,
                "regionName": region["RGN25NM"] if region else None,
                "regionWelsh": region["RGN25NMW"] if region else None,
                "countyCode": None,
                "countyName": None,
                "countySlug": None,
                "cauthCode": None,
                "cauthName": None,
                "cauthMayoral": False,
                "cauthSlug": None,
                "pcon": sorted(cty_pcon[code]),
                "splitWard": code in cty_split,
                "regionCodes": sorted(code for code in region_codes if code),
            }
        )

    slugs = [council["slug"] for council in councils if council["kind"] == "lad"]
    if len(slugs) != len(set(slugs)):
        raise SystemExit("duplicate LAD slugs")
    county_slugs = [council["slug"] for council in councils if council["kind"] == "county"]
    if len(county_slugs) != len(set(county_slugs)):
        raise SystemExit("duplicate county slugs")

    empty = [council["code"] for council in councils if not council["pcon"]]
    if empty:
        raise SystemExit(f"no Westminster overlap {empty}")

    def mayor(
        code: str,
        name: str,
        factsheet_name: str,
        factsheet_class: str,
        last: str,
        next_year: str,
        timetable: str,
        *,
        heading: str | None = None,
        lgr: bool = False,
        constituents: str | None = None,
        extra_county: str | None = None,
        page: str = "ca",
    ) -> dict:
        member_codes = members.get(code, []) if code else []
        pcon: set[str] = set()
        for member in member_codes:
            pcon |= lad_pcon[member]
        return {
            "code": code,
            "name": name,
            "slug": slugify(name),
            "page": page,
            "factsheetName": factsheet_name,
            "factsheetClass": factsheet_class,
            "lastText": last,
            "nextText": next_year,
            "timetable": timetable,
            "headingNote": heading,
            "lgr": lgr,
            "constituents": constituents,
            "extraCountyCode": extra_county,
            "memberCodes": member_codes,
            "pcon": sorted(pcon),
        }

    heading_two = (
        "The timetable heading says elections for the mayors of these 2 combined authorities are held in 2025, 2029 and every 4th year. "
        "The list under that heading names three authorities: Cambridgeshire and Peterborough, Hull and East Yorkshire, and West of England."
    )
    lgr = (
        "The factsheet says councils in the area have received an invitation to submit proposals for local government reorganisation. "
        "It says the most ambitious timetable is elections to new unitary authorities in May 2027, with those structures coming into being on 1 April 2028. "
        "This page does not treat that sentence as the next election of an existing council."
    )
    mayors = [
        mayor(
            "E47000008",
            "Cambridgeshire and Peterborough",
            "Cambridgeshire and Peterborough Combined Authority (CPCA)",
            "a Mayoral Strategic Authority",
            "The factsheet says the most recent mayoral election was held in May 2025.",
            "The factsheet says the next mayoral election is scheduled for 2029. It does not print a day.",
            "The GOV.UK timetable lists this combined authority among mayors elected in 2025, 2029 and every 4th year. May 2025 is before 19 October 2026.",
            heading=heading_two,
            lgr=True,
            constituents="The factsheet says its constituent councils are Cambridge City, Cambridgeshire County, East Cambridgeshire District, Fenland District, Huntingdonshire District, Peterborough City and South Cambridgeshire District.",
            extra_county="E10000003",
        ),
        mayor(
            "E47000016",
            "Hull and East Yorkshire",
            "Hull and East Yorkshire Combined Authority (HEYCA)",
            "a Mayoral Strategic Authority",
            "The factsheet says the most recent mayoral election was held in May 2025.",
            "The factsheet says the next mayoral election is scheduled for 2029. It does not print a day.",
            "The GOV.UK timetable lists this combined authority among mayors elected in 2025, 2029 and every 4th year. May 2025 is before 19 October 2026.",
            heading=heading_two,
        ),
        mayor(
            "E47000009",
            "West of England",
            "West of England Combined Authority (WECA)",
            "a Mayoral Strategic Authority",
            "The factsheet says the most recent mayoral election was held in May 2025.",
            "The factsheet says the next mayoral election is scheduled for 2029. It does not print a day.",
            "The GOV.UK timetable lists this combined authority among mayors elected in 2025, 2029 and every 4th year. May 2025 is before 19 October 2026.",
            heading=heading_two,
        ),
        mayor(
            "E47000017",
            "Greater Lincolnshire",
            "Greater Lincolnshire Combined County Authority (GLCCA)",
            "a Mayoral Strategic Authority",
            "The factsheet says the most recent mayoral election was held in May 2025.",
            "The factsheet says the next mayoral election is scheduled for 2029. It does not print a day.",
            "The GOV.UK timetable says the election for the mayor for Greater Lincolnshire combined county authority is held in 2025, 2029 and every 4th year. May 2025 is before 19 October 2026.",
            lgr=True,
        ),
        mayor(
            "E47000013",
            "East Midlands",
            "East Midlands Combined County Authority (EMCCA)",
            "a Mayoral Strategic Authority",
            "The factsheet says the most recent mayoral election was in 2024. It does not print the month.",
            "The factsheet says the next mayoral election is scheduled for 2028. It does not print a day.",
            "The GOV.UK timetable says elections for the mayor for East Midlands combined county authority are held in 2028, 2032 and every 4th year.",
            lgr=True,
        ),
        mayor(
            "E47000001",
            "Greater Manchester",
            "Greater Manchester Combined Authority (GMCA)",
            "an Established Mayoral Strategic Authority",
            "The factsheet says the last mayoral election was in May 2024.",
            "The factsheet says the next mayoral election is scheduled for 2028. It does not print a day.",
            "The GOV.UK timetable lists Greater Manchester among combined authorities whose mayors are elected in 2028, 2032 and every 4th year.",
        ),
        mayor(
            "E47000004",
            "Liverpool City Region",
            "Liverpool City Region Combined Authority (LCRCA)",
            "an Established Mayoral Combined Authority",
            "The factsheet says the most recent mayoral election was in May 2024.",
            "The factsheet says the next mayoral election is scheduled for 2028. It does not print a day.",
            "The GOV.UK timetable lists Liverpool City Region among combined authorities whose mayors are elected in 2028, 2032 and every 4th year.",
        ),
        mayor(
            "E47000014",
            "North East",
            "North East Combined Authority (NECA)",
            "an Established Mayoral Strategic Authority",
            "The factsheet says the most recent mayoral election was in May 2024.",
            "The factsheet says the next mayoral election is scheduled for 2028. It does not print a day.",
            "The GOV.UK timetable lists the North East among combined authorities whose mayors are elected in 2028, 2032 and every 4th year.",
        ),
        mayor(
            "E47000006",
            "Tees Valley",
            "Tees Valley Combined Authority",
            "a Mayoral Strategic Authority",
            "The factsheet says the most recent mayoral election was in May 2024.",
            "The factsheet says the next mayoral election is scheduled for 2028. It does not print a day.",
            "The GOV.UK timetable lists Tees Valley among combined authorities whose mayors are elected in 2028, 2032 and every 4th year.",
        ),
        mayor(
            "E47000002",
            "South Yorkshire",
            "South Yorkshire Mayoral Combined Authority (SYMCA)",
            "an Established Mayoral Strategic Authority",
            "The factsheet says the most recent mayoral election was in May 2024.",
            "The factsheet says the next mayoral election is scheduled for 2028. It does not print a day.",
            "The GOV.UK timetable lists South Yorkshire among combined authorities whose mayors are elected in 2028, 2032 and every 4th year.",
        ),
        mayor(
            "E47000007",
            "West Midlands",
            "West Midlands Combined Authority (WMCA)",
            "an Established Mayoral Strategic Authority",
            "The factsheet says the most recent mayoral election was in May 2024.",
            "The factsheet says the next mayoral election is scheduled for 2028. It does not print a day.",
            "The GOV.UK timetable lists the West Midlands among combined authorities whose mayors are elected in 2028, 2032 and every 4th year.",
        ),
        mayor(
            "E47000003",
            "West Yorkshire",
            "West Yorkshire Combined Authority (WYCA)",
            "an Established Mayoral Strategic Authority",
            "The factsheet says the most recent mayoral election was in May 2024.",
            "The factsheet says the next mayoral election is scheduled for 2028. It does not print a day.",
            "The GOV.UK timetable lists West Yorkshire among combined authorities whose mayors are elected in 2028, 2032 and every 4th year.",
        ),
        mayor(
            "E47000012",
            "York and North Yorkshire",
            "York and North Yorkshire Combined Authority (YNYCA)",
            "a Mayoral Strategic Authority",
            "The factsheet says the most recent mayoral election was in May 2024.",
            "The factsheet says the next mayoral election is scheduled for 2028. It does not print a day.",
            "The GOV.UK timetable lists York and North Yorkshire among combined authorities whose mayors are elected in 2028, 2032 and every 4th year.",
        ),
    ]
    gla_pcon = sorted({code for council in councils if council["regionCode"] == "E12000007" for code in council["pcon"]})
    mayors.append(
        {
            "code": None,
            "name": "Greater London Authority",
            "slug": "greater-london-authority",
            "page": "gla",
            "factsheetName": "Greater London Authority (GLA)",
            "factsheetClass": "an Established Mayoral Strategic Authority",
            "lastText": "The factsheet says the most recent Mayor of London election was in May 2024.",
            "nextText": "The factsheet says the next Mayor of London election is scheduled for 2028. It does not print a day. The Electoral Commission schedule read on 17 October 2026 lists the Mayor of London and the London Assembly in May 2028 and does not print a day.",
            "timetable": "The GOV.UK local-election timetable read on 19 October 2026 does not put the Mayor of London in its combined-authority lists.",
            "headingNote": "The factsheet says the London Assembly has 25 members, 14 of which represent constituencies and 11 represent all of London, and that the next Assembly elections take place in 2028. It does not name the members. This guide does not add Assembly constituency pages.",
            "lgr": False,
            "constituents": None,
            "extraCountyCode": None,
            "memberCodes": [council["code"] for council in councils if council["regionCode"] == "E12000007"],
            "pcon": gla_pcon,
            "voteNote": "The Elections Act 2022, section 13 (in force 26 October 2022), changed Mayor of London elections to the simple majority (first-past-the-post) system, and the May 2024 election used it. The English Devolution and Community Empowerment Act 2026 (Royal Assent 29 April 2026), Schedule 30, paragraphs 1 and 2, would return the Mayor of London to the supplementary vote where there are three or more candidates. On 19 October 2026 legislation.gov.uk marked those paragraphs as prospective (not yet in force).",
        }
    )
    for item in mayors:
        if item["page"] != "gla":
            item["voteNote"] = "The English Devolution and Community Empowerment Act 2026 (Royal Assent 29 April 2026), Schedule 30, paragraphs 12 to 19, return combined authority and combined county authority mayors to the supplementary vote where there are three or more candidates. On 19 October 2026 legislation.gov.uk recorded those paragraphs in force from 18 June 2026 under S.I. 2026/656, regulation 2(b), with the savings in regulation 3. Before that, the Elections Act 2022, section 13, used the simple majority (first-past-the-post) system."
        if item["lgr"]:
            item["lgrText"] = lgr
        else:
            item["lgrText"] = None

    omitted = [
        {
            "code": "E47000015",
            "name": "Devon and Torbay",
            "reason": "The factsheet says Devon and Torbay Combined County Authority is a Foundation Strategic Authority and does not have a directly elected mayor. This guide does not give it a mayor page.",
        },
        {
            "code": "E47000018",
            "name": "Lancashire",
            "reason": "The factsheet says Lancashire Combined County Authority is a non-mayoral Foundation Strategic Authority. This guide does not give it a mayor page.",
        },
    ]

    payload = {
        "readOn": READ,
        "councils": councils,
        "mayors": mayors,
        "omittedAuthorities": omitted,
    }
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=1) + "\n")
    prefixes: dict[str, int] = defaultdict(int)
    for council in councils:
        if council["kind"] == "lad":
            prefixes[council["code"][:3]] += 1
    print("councils", len(councils), "lads", sum(1 for c in councils if c["kind"] == "lad"), "counties", sum(1 for c in councils if c["kind"] == "county"))
    print("prefixes", dict(prefixes))
    print("mayors", len(mayors))
    print("bytes", OUT.stat().st_size)
    biggest = max(councils, key=lambda council: len(council["pcon"]))
    print("max pcon", biggest["name"], len(biggest["pcon"]))
    print("gla pcon", len(gla_pcon), "gla members", len(mayors[-1]["memberCodes"]))


if __name__ == "__main__":
    main()
