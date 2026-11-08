"""Check every local link target, title and trust footer in the static export.
External sites and client-side query/fragment state aren't fetched.
"""
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
import re, html, json, collections
ROOT=Path('out')
missing=collections.defaultdict(list)
titles=collections.defaultdict(list)
footer_missing=[]
count=0
required=['/about/','/contact/','/privacy/','/terms/','/about/#editorial-methods']
# Cloudflare Worker routes aren't in the Pages artifact. The existing Worker
# endpoint was separately fetched on 7 Nov 2026 and returned HTTP 200 JSON.
WORKER_ROUTES={'/il-live/il-2026-knesset/results.json'}
cache={}
for p in ROOT.rglob('*.html'):
    h=p.read_text()
    if not re.search(r'<head\b',h,re.I): continue
    if re.search(r'http-equiv=["\']refresh["\']',h,re.I): continue
    count+=1
    rel=p.relative_to(ROOT).as_posix()
    route='/'+(rel[:-10] if rel.endswith('index.html') else rel)
    t=re.search(r'<title>(.*?)</title>',h,re.S|re.I)
    if t and route not in ["/404.html", "/404/"]: titles[html.unescape(t[1])].append(route)
    elif not t: missing['MISSING TITLE'].append(route)
    footer=' '.join(re.findall(r'<footer\b[^>]*>(.*?)</footer>',h,re.S|re.I))
    if any(f'href="{href}"' not in footer for href in required): footer_missing.append(route)
    for link in set(re.findall(r'<a\b[^>]*\bhref=["\']([^"\']*)',h,re.I)):
        url=urlsplit(urljoin('https://mapthegeneral.com'+route,html.unescape(link)))
        if url.scheme not in ['http','https'] or url.hostname not in ['mapthegeneral.com','www.mapthegeneral.com']: continue
        target=unquote(url.path)
        if target not in cache:
            f=ROOT/target.lstrip('/')
            cache[target]=target in WORKER_ROUTES or f.is_file() or (f/'index.html').is_file() or (f.with_suffix('.html')).is_file()
        if not cache[target] and len(missing[target])<3: missing[target].append(route)
dups={k:v for k,v in titles.items() if len(v)>1}
report={'documents':count,'unique_targets':len(cache),'missing_targets':dict(missing),'duplicate_titles':dups,'missing_trust_footer':footer_missing}
Path('.publisher-audit').mkdir(exist_ok=True)
Path('.publisher-audit/navigation.json').write_text(json.dumps(report,indent=2))
print(json.dumps({k:v for k,v in report.items() if k not in ['duplicate_titles','missing_trust_footer','missing_targets']},indent=2))
print('Missing targets:',json.dumps(dict(missing),indent=2)[:15000])
print('Duplicate title groups:',len(dups),json.dumps(dict(list(dups.items())[:10]),indent=2))
print('Missing trust footer:',len(footer_missing),footer_missing[:10])
raise SystemExit(bool(missing or dups or footer_missing))
