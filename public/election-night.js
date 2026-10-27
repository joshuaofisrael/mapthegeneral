/* Election-night countdown and official count. No figures before data-opens. */
(function () {
  if (window.__mtgNight) return;
  window.__mtgNight = true;
  var POLL_MS = 60000;

  function opensMs(section) {
    var ms = Date.parse(section.getAttribute("data-opens") || "");
    return Number.isFinite(ms) ? ms : NaN;
  }

  function visible(section, now) {
    var open = opensMs(section);
    return Number.isFinite(open) && now >= open;
  }

  function pollUrl(base, now) {
    if (!base) return "";
    var join = base.indexOf("?") >= 0 ? "&" : "?";
    return base + join + "t=" + Math.floor(now / POLL_MS);
  }

  function stamp(ms, tz) {
    if (!Number.isFinite(ms)) return "";
    try {
      var parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: tz || "UTC",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
        numberingSystem: "latn",
      }).formatToParts(new Date(ms));
      var hour = "";
      var minute = "";
      for (var i = 0; i < parts.length; i++) {
        if (parts[i].type === "hour") hour = parts[i].value;
        if (parts[i].type === "minute") minute = parts[i].value;
      }
      return hour && minute ? hour + ":" + minute : "";
    } catch (error) {
      return "";
    }
  }

  function validDoc(data, id) {
    return Boolean(data && data.election === id && Array.isArray(data.results));
  }

  function prefer(prev, next) {
    if (!prev || !Array.isArray(prev.results) || prev.results.length === 0) return next;
    if (!Array.isArray(next.results) || next.results.length === 0) return prev;
    var a = prev.fetchedAt ? Date.parse(prev.fetchedAt) : 0;
    var b = next.fetchedAt ? Date.parse(next.fetchedAt) : 0;
    return b >= a ? next : prev;
  }

  function clear(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  function node(tag, text, style) {
    var el = document.createElement(tag);
    if (text != null) el.textContent = text;
    if (style) el.setAttribute("style", style);
    return el;
  }

  function formatVotes(value, locale) {
    if (typeof value !== "number" || !Number.isFinite(value)) return "–";
    try {
      return value.toLocaleString(locale || "en-GB");
    } catch (error) {
      return String(value);
    }
  }

  function renderCountdown(root, section, now) {
    clear(root);
    var left = Math.max(0, opensMs(section) - now);
    var bits = [
      Math.floor(left / 86400000),
      Math.floor(left / 3600000) % 24,
      Math.floor(left / 60000) % 60,
      Math.floor(left / 1000) % 60,
    ];
    var units = (section.getAttribute("data-units") || "days|hours|min|sec").split("|");
    var wrap = node("div", null, "text-align:center;border:1px solid #d5dde6;border-radius:12px;padding:16px;background:#fff");
    wrap.appendChild(
      node(
        "p",
        section.getAttribute("data-countdown") || "",
        "margin:0;font-size:0.8rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#1e4a73",
      ),
    );
    var row = node("div", null, "display:flex;justify-content:center;gap:8px;margin-top:12px");
    row.setAttribute("dir", "ltr");
    for (var i = 0; i < bits.length; i++) {
      var box = node("div", null, "min-width:4.2rem;background:#143251;color:#fff;border-radius:8px;padding:8px 10px;text-align:center");
      box.appendChild(node("div", String(bits[i]).padStart(2, "0"), "font-size:1.6rem;font-weight:700;font-variant-numeric:tabular-nums"));
      box.appendChild(node("div", units[i] || "", "font-size:0.75rem;opacity:0.8"));
      row.appendChild(box);
    }
    wrap.appendChild(row);
    wrap.appendChild(
      node("p", section.getAttribute("data-countdown-note") || "", "margin:12px auto 0;max-width:36rem;font-size:0.92rem;color:#4a5568"),
    );
    root.appendChild(wrap);
  }

  function usableRow(row) {
    if (!row || typeof row.name !== "string" || !row.name.trim()) return false;
    if (row.votes != null && (typeof row.votes !== "number" || !Number.isFinite(row.votes))) return false;
    if (row.share != null && (typeof row.share !== "number" || !Number.isFinite(row.share))) return false;
    return true;
  }

  function renderBoard(root, section, doc, stale) {
    clear(root);
    var gate = node("div");
    gate.setAttribute("data-election-gate", section.getAttribute("data-night-id") || "");
    var tz = section.getAttribute("data-tz") || "UTC";
    var locale = section.getAttribute("data-locale") || "en-GB";
    var updatedMs = doc && doc.sourceUpdated ? Date.parse(doc.sourceUpdated) : NaN;
    var fetchedMs = doc && doc.fetchedAt ? Date.parse(doc.fetchedAt) : NaN;
    var ms = Number.isFinite(updatedMs) ? updatedMs : fetchedMs;
    var hm = stamp(ms, tz);
    if (hm) {
      var template = Number.isFinite(updatedMs)
        ? section.getAttribute("data-updated") || "Last updated {time}"
        : section.getAttribute("data-fetched") || "Last fetched {time}";
      var tzLabel = section.getAttribute("data-tz-label") || "";
      var line = template.replace("{time}", hm) + (tzLabel ? " " + tzLabel : "");
      var stampNode = node("p", line, "margin:0 0 8px;font-weight:700;color:#143251");
      stampNode.setAttribute("data-night-stamp", Number.isFinite(updatedMs) ? "updated" : "fetched");
      gate.appendChild(stampNode);
    }
    var rows = (doc && Array.isArray(doc.results) ? doc.results : []).filter(usableRow);
    if (stale) {
      var staleText = rows.length ? section.getAttribute("data-stale") : section.getAttribute("data-stale-empty");
      if (staleText) gate.appendChild(node("p", staleText, "margin:0 0 8px;padding:8px 12px;background:#e8eef5;border-radius:8px"));
    }
    if (!rows.length) {
      gate.appendChild(node("p", section.getAttribute("data-awaiting") || "", "margin:0;padding:12px;background:#e8eef5;border-radius:8px"));
      root.appendChild(gate);
      return;
    }
    var finalStage = doc && doc.stage === "final";
    gate.appendChild(node("p", (finalStage ? section.getAttribute("data-final") : section.getAttribute("data-preliminary")) || "", "margin:0 0 8px;font-weight:700"));
    if (!finalStage) {
      var note = section.getAttribute("data-note");
      if (note) gate.appendChild(node("p", note, "margin:0 0 8px;color:#4a5568;font-size:0.92rem"));
    }
    var href = section.getAttribute("data-source-href");
    var label = section.getAttribute("data-source-label");
    if (href && label) {
      var link = document.createElement("a");
      link.href = href;
      link.rel = "noopener noreferrer";
      link.textContent = label;
      var holder = node("p", null, "margin:0 0 8px;font-size:0.92rem");
      holder.appendChild(link);
      gate.appendChild(holder);
    }
    var table = document.createElement("table");
    var head = document.createElement("tr");
    [section.getAttribute("data-col-name"), section.getAttribute("data-col-votes"), section.getAttribute("data-col-share")].forEach(function (title) {
      head.appendChild(node("th", title || ""));
    });
    var thead = document.createElement("thead");
    thead.appendChild(head);
    table.appendChild(thead);
    var body = document.createElement("tbody");
    rows.forEach(function (row) {
      var tr = document.createElement("tr");
      tr.appendChild(node("td", row.name));
      tr.appendChild(node("td", formatVotes(row.votes, locale)));
      var share = typeof row.share === "number" ? formatVotes(row.share, locale) + "%" : "–";
      tr.appendChild(node("td", share));
      body.appendChild(tr);
    });
    table.appendChild(body);
    gate.appendChild(table);
    root.appendChild(gate);
  }

  async function pull(url, now) {
    var res = await fetch(pollUrl(url, now), { signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error("HTTP " + res.status);
    return res.json();
  }

  function setup(section) {
    var root = section.querySelector("[data-night-root]");
    if (!root) return;
    var id = section.getAttribute("data-night-id") || "";
    var state = { doc: null, stale: false };

    function paint() {
      var now = Date.now();
      if (!visible(section, now)) {
        renderCountdown(root, section, now);
        return;
      }
      renderBoard(root, section, state.doc, state.stale);
    }

    async function load() {
      var now = Date.now();
      if (!visible(section, now)) return;
      var fresh = false;
      try {
        var primary = await pull(section.getAttribute("data-feed") || "", now);
        if (validDoc(primary, id)) {
          state.doc = prefer(state.doc, primary);
          fresh = true;
        }
      } catch (error) {
        fresh = false;
      }
      if (!fresh) {
        try {
          var raw = await pull(section.getAttribute("data-raw") || "", now);
          if (validDoc(raw, id)) {
            state.doc = prefer(state.doc, raw);
            fresh = true;
          }
        } catch (error) {
          fresh = false;
        }
      }
      if (fresh) {
        state.stale = false;
        paint();
        return;
      }
      try {
        var snapRes = await fetch(section.getAttribute("data-snapshot") || "");
        if (snapRes.ok) {
          var snap = await snapRes.json();
          if (validDoc(snap, id)) state.doc = prefer(state.doc, snap);
        }
      } catch (error) {
        /* keep the last good document */
      }
      state.stale = true;
      paint();
    }

    paint();
    window.setInterval(paint, 1000);
    load();
    window.setInterval(load, POLL_MS);
  }

  document.querySelectorAll("[data-night-id]").forEach(setup);
})();
