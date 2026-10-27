/**
 * Election-night board. Same-origin feed, last-updated stamp, fallback link.
 * Counts stay off the page until `opens`, including when the feed is early.
 */
(function () {
  var configEl = document.getElementById("night-config");
  var board = document.getElementById("night-board");
  if (!configEl || !board) return;
  var cfg;
  try {
    cfg = JSON.parse(configEl.textContent || "");
  } catch (error) {
    return;
  }
  var opens = Date.parse(cfg.opens);
  if (!Number.isFinite(opens)) return;

  function el(tag, text, className) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function stamp(doc) {
    var raw = doc && (doc.sourceUpdated || doc.fetchedAt);
    var ms = raw ? Date.parse(raw) : NaN;
    if (!Number.isFinite(ms)) return null;
    var formatted;
    try {
      formatted = new Intl.DateTimeFormat("en-GB", {
        timeZone: cfg.timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      }).format(new Date(ms));
    } catch (error) {
      formatted = "";
    }
    if (!formatted) return null;
    var kind = doc && doc.sourceUpdated ? cfg.updated : cfg.fetched;
    return kind + " " + formatted;
  }

  function officialLink() {
    var link = document.createElement("a");
    link.href = cfg.official;
    link.textContent = cfg.officialLabel;
    return link;
  }

  function countdown(now) {
    board.replaceChildren();
    var left = Math.max(0, opens - now);
    var parts = [
      Math.floor(left / 86400000),
      Math.floor(left / 3600000) % 24,
      Math.floor(left / 60000) % 60,
      Math.floor(left / 1000) % 60,
    ];
    board.appendChild(el("h3", cfg.countdown));
    var row = el("p", "");
    parts.forEach(function (value, index) {
      var bit = el("span", String(value) + " " + cfg.units[index]);
      bit.style.marginRight = "0.75rem";
      row.appendChild(bit);
    });
    board.appendChild(row);
    board.appendChild(el("p", cfg.countdownNote));
    var p = el("p", "");
    p.appendChild(officialLink());
    board.appendChild(p);
  }

  function showFallback(message) {
    board.replaceChildren();
    board.appendChild(el("p", message));
    var p = el("p", "");
    p.appendChild(officialLink());
    board.appendChild(p);
  }

  function showRows(doc) {
    board.replaceChildren();
    var when = stamp(doc);
    var heading = doc.status === "final" ? cfg.finalLabel : cfg.preliminary;
    board.appendChild(el("h3", heading));
    if (when) board.appendChild(el("p", when));
    board.appendChild(el("p", cfg.source));
    var rows = Array.isArray(doc.results) ? doc.results : [];
    if (!rows.length) {
      board.appendChild(el("p", cfg.awaiting));
      var wait = el("p", "");
      wait.appendChild(officialLink());
      board.appendChild(wait);
      return;
    }
    var table = document.createElement("table");
    var head = document.createElement("tr");
    [cfg.name, cfg.votes, cfg.share].forEach(function (label) {
      head.appendChild(el("th", label));
    });
    table.appendChild(head);
    rows.forEach(function (row) {
      var tr = document.createElement("tr");
      tr.appendChild(el("td", row && row.name ? String(row.name) : ""));
      tr.appendChild(el("td", row && row.votes != null ? String(row.votes) : ""));
      tr.appendChild(el("td", row && row.share != null ? String(row.share) : ""));
      table.appendChild(tr);
    });
    board.appendChild(table);
    var p = el("p", "");
    p.appendChild(officialLink());
    board.appendChild(p);
  }

  function load() {
    if (Date.now() < opens) {
      countdown(Date.now());
      return;
    }
    fetch(cfg.feed, { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("status");
        return res.json();
      })
      .then(function (doc) {
        if (Date.now() < opens) {
          countdown(Date.now());
          return;
        }
        showRows(doc || {});
      })
      .catch(function () {
        if (Date.now() < opens) countdown(Date.now());
        else showFallback(cfg.fallback);
      });
  }

  load();
  window.setInterval(load, 60000);
})();
