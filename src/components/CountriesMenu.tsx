"use client";

import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, type FocusEvent as ReactFocusEvent, type KeyboardEvent as ReactKeyboardEvent } from "react";
import {
  countriesLabel,
  languageFromPath,
  pathWithinHub,
  withSlash,
  type CountryHubLink,
} from "@/data/country-nav";

/**
 * Native disclosure. The country links are in the HTML, so the control works
 * without JavaScript. The panel is absolutely positioned and does not change
 * the header height. Arrow keys, Escape and click-outside are enhancements.
 */
export function CountriesMenu({ hubs, menuId }: { hubs: readonly CountryHubLink[]; menuId: string }) {
  const pathname = usePathname() || "/";
  const lang = languageFromPath(pathname);
  const label = countriesLabel(lang);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const listId = useId();
  const active = hubs.some((hub) => pathWithinHub(pathname, hub.href));

  useEffect(() => {
    const el = detailsRef.current;
    if (!el) return;

    function onKey(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape" && el?.open) {
        el.open = false;
        el.querySelector("summary")?.focus();
      }
    }

    function onPointer(event: PointerEvent) {
      if (!el?.open) return;
      if (!el.contains(event.target as Node)) el.open = false;
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  function onBlur(event: ReactFocusEvent<HTMLDetailsElement>) {
    const el = detailsRef.current;
    if (!el?.open) return;
    const next = event.relatedTarget;
    if (next instanceof Node && el.contains(next)) return;
    el.open = false;
  }

  function onKeyDown(event: ReactKeyboardEvent<HTMLDetailsElement>) {
    const el = detailsRef.current;
    if (!el) return;
    const links = [...el.querySelectorAll<HTMLAnchorElement>("a")];
    if (!links.length) return;

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      el.open = true;
      const index = links.indexOf(document.activeElement as HTMLAnchorElement);
      const next =
        event.key === "ArrowDown"
          ? (links[index + 1] ?? links[0])
          : (links[index - 1] ?? links[links.length - 1]);
      next.focus();
      return;
    }

    if (!el.open) return;
    if (event.key === "Home") {
      event.preventDefault();
      links[0].focus();
    } else if (event.key === "End") {
      event.preventDefault();
      links[links.length - 1].focus();
    }
  }

  return (
    <details ref={detailsRef} id={menuId} className="countries-menu" onKeyDown={onKeyDown} onBlur={onBlur}>
      <summary
        lang={lang}
        aria-controls={listId}
        className={`countries-summary ${active ? "font-semibold text-navy" : "text-ink-muted hover:text-navy"}`}
      >
        {label}
        <span aria-hidden="true" className="countries-chevron">
          ▾
        </span>
      </summary>
      <ul id={listId} className="countries-panel" aria-label={label}>
        {hubs.map((hub) => {
          const current = withSlash(pathname) === hub.href;
          return (
            <li key={hub.code}>
              <a
                href={hub.href}
                lang={hub.lang}
                dir={hub.dir}
                aria-current={current ? "page" : undefined}
                className={`countries-link ${current ? "font-semibold text-navy" : "text-ink hover:bg-navy-wash hover:text-navy"}`}
                onClick={() => {
                  if (detailsRef.current) detailsRef.current.open = false;
                }}
              >
                {hub.name}
              </a>
            </li>
          );
        })}
      </ul>
    </details>
  );
}
