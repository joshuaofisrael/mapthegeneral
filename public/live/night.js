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
    var finalStage = doc.status === "final" || doc.stage === "final";
    var heading = finalStage ? cfg.finalLabel : cfg.preliminary;
    var gate = el("div", "");
    gate.setAttribute("data-election-gate", cfg.id || "");
    gate.appendChild(el("h3", heading));
    if (when) gate.appendChild(el("p", when));
    gate.appendChild(el("p", cfg.source));
    var rows = Array.isArray(doc.results) ? doc.results : [];
    if (!rows.length) {
      gate.appendChild(el("p", cfg.awaiting));
      var wait = el("p", "");
      wait.appendChild(officialLink());
      gate.appendChild(wait);
      board.appendChild(gate);
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
    gate.appendChild(table);
    var p = el("p", "");
    p.appendChild(officialLink());
    gate.appendChild(p);
    board.appendChild(gate);
  }

  function acceptable(doc) {
    if (!doc || !Array.isArray(doc.results)) return false;
    if (doc.election && doc.election !== cfg.id) return false;
    if (doc.id && doc.id !== cfg.id) return false;
    return true;
  }

  function pull(url) {
    var join = url.indexOf("?") >= 0 ? "&" : "?";
    return fetch(url + join + "t=" + Math.floor(Date.now() / 60000), { cache: "no-store" }).then(function (res) {
      if (!res.ok) throw new Error("status");
      return res.json();
    });
  }

  function heldClosed() {
    if (cfg.pollingExtended === true) return true;
    if (cfg.requiresConfirmation === true && cfg.votingEnded !== true) return true;
    return false;
  }

  function freshEnough(doc) {
    if (!doc || !Array.isArray(doc.results) || doc.results.length === 0) return true;
    var ms = Date.parse(doc.fetchedAt || "");
    if (!Number.isFinite(ms)) return false;
    return Date.now() - ms <= 15 * 60 * 1000;
  }

  function showClosed() {
    if (Date.now() < opens) {
      countdown(Date.now());
      return;
    }
    showFallback(cfg.closedNote || cfg.countdownNote || cfg.fallback);
  }

  function load() {
    if (Date.now() < opens || heldClosed()) {
      showClosed();
      return;
    }
    var url = cfg.feed;
    if (!url) {
      showFallback(cfg.fallback);
      return;
    }
    pull(url)
      .then(function (doc) {
        if (Date.now() < opens || heldClosed()) {
          showClosed();
          return;
        }
        if (!acceptable(doc) || !freshEnough(doc)) {
          showFallback(cfg.fallback);
          return;
        }
        showRows(doc);
      })
      .catch(function () {
        showFallback(cfg.fallback);
      });
  }

  // The feed is requested only from the two Israel results pages. Elsewhere
  // the countdown is local and nothing is fetched.
  var path = location.pathname.replace(/\/+$/, "") || "/";
  if (path !== "/il/en/results" && path !== "/il/he/results") {
    showClosed();
    window.setInterval(function () {
      showClosed();
    }, 1000);
    return;
  }
  load();
  window.setInterval(load, 60000);
})();
