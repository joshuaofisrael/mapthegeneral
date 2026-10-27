/* Map the General cookie banner for Google Analytics (Consent Mode v2).
   The Google tag is downloaded only after "Accept". Reject and no choice
   do not load gtag.js and do not send a cookieless hit. The choice is kept
   in localStorage. Any element with data-consent-open reopens the banner.
   Copy follows the page language: the second path segment (/es/en/, /il/he/)
   or, failing that, <html lang>. */
(function () {
  var KEY = "mtg-analytics-consent";
  var COPY = {
    en: {
      aria: "Cookie choices",
      body: "We use Google Analytics cookies to count visits, only if you accept. The Google script loads only after Accept. Cloudflare Web Analytics (cookieless) runs either way. ",
      privacy: "Privacy Policy",
      href: "/privacy/#google-analytics",
      accept: "Accept",
      reject: "Reject",
      choices: "Cookie choices"
    },
    es: {
      aria: "Opciones de cookies",
      body: "Usamos cookies de Google Analytics para contar visitas, solo si acepta. El script de Google se carga solo después de Aceptar. Cloudflare Web Analytics (sin cookies) funciona igual. ",
      privacy: "Política de privacidad",
      href: "/privacy/#google-analytics-es",
      accept: "Aceptar",
      reject: "Rechazar",
      choices: "Opciones de cookies"
    },
    fr: {
      aria: "Choix de cookies",
      body: "Nous utilisons des cookies Google Analytics pour compter les visites, seulement si vous acceptez. Le script Google se charge seulement après Accepter. Cloudflare Web Analytics (sans cookies) fonctionne dans tous les cas. ",
      privacy: "Politique de confidentialité",
      href: "/privacy/#google-analytics-fr",
      accept: "Accepter",
      reject: "Refuser",
      choices: "Choix de cookies"
    },
    de: {
      aria: "Cookie-Auswahl",
      body: "Wir verwenden Google-Analytics-Cookies, um Besuche zu zählen, nur wenn Sie akzeptieren. Das Google-Skript lädt erst nach Akzeptieren. Cloudflare Web Analytics (ohne Cookies) läuft in jedem Fall. ",
      privacy: "Datenschutzerklärung",
      href: "/privacy/#google-analytics-de",
      accept: "Akzeptieren",
      reject: "Ablehnen",
      choices: "Cookie-Auswahl"
    },
    it: {
      aria: "Scelte sui cookie",
      body: "Usiamo cookie di Google Analytics per contare le visite, solo se accetti. Lo script di Google si carica solo dopo Accetta. Cloudflare Web Analytics (senza cookie) funziona in ogni caso. ",
      privacy: "Informativa sulla privacy",
      href: "/privacy/#google-analytics-it",
      accept: "Accetta",
      reject: "Rifiuta",
      choices: "Scelte sui cookie"
    },
    pl: {
      aria: "Ustawienia cookies",
      body: "Używamy plików cookie Google Analytics, aby liczyć odwiedziny, tylko jeśli akceptujesz. Skrypt Google ładuje się dopiero po Akceptuj. Cloudflare Web Analytics (bez plików cookie) działa zawsze. ",
      privacy: "Polityka prywatności",
      href: "/privacy/#google-analytics-pl",
      accept: "Akceptuj",
      reject: "Odrzuć",
      choices: "Ustawienia cookies"
    },
    pt: {
      aria: "Opções de cookies",
      body: "Usamos cookies do Google Analytics para contar visitas, somente se você aceitar. O script do Google é carregado só depois de Aceitar. O Cloudflare Web Analytics (sem cookies) funciona de qualquer forma. ",
      privacy: "Política de privacidade",
      href: "/privacy/#google-analytics",
      accept: "Aceitar",
      reject: "Recusar",
      choices: "Opções de cookies"
    },
    he: {
      aria: "בחירת עוגיות",
      body: "אנחנו משתמשים בעוגיות של Google Analytics כדי לספור ביקורים, רק אם תאשרו. הסקריפט של Google נטען רק אחרי אישור. Cloudflare Web Analytics (בלי עוגיות) פועל בכל מקרה. ",
      privacy: "מדיניות פרטיות",
      href: "/privacy/#google-analytics",
      accept: "אישור",
      reject: "דחייה",
      choices: "בחירת עוגיות"
    },
    sr: {
      aria: "Izbor kolačića",
      body: "Koristimo kolačiće Google Analytics da bismo brojali posete, samo ako prihvatite. Google skripta se učitava tek posle Prihvati. Cloudflare Web Analytics (bez kolačića) radi u svakom slučaju. ",
      privacy: "Politika privatnosti",
      href: "/privacy/#google-analytics",
      accept: "Prihvati",
      reject: "Odbij",
      choices: "Izbor kolačića"
    }
  };

  function read() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function save(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }
  function gtagSafe() {
    if (typeof window.gtag === "function") window.gtag.apply(null, arguments);
  }
  function loadGa() {
    if (window.__mtgGaLoaded) return;
    var id = window.__mtgGaId;
    if (!id) return;
    window.__mtgGaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("consent", "default", {
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      analytics_storage: "denied",
      functionality_storage: "denied",
      personalization_storage: "denied",
      security_storage: "granted",
      wait_for_update: 500
    });
    window.gtag("set", "ads_data_redaction", true);
    window.gtag("set", "url_passthrough", false);
    window.gtag("consent", "update", { analytics_storage: "granted" });
    window.gtag("js", new Date());
    window.gtag("config", id, {
      allow_google_signals: false,
      allow_ad_personalization_signals: false
    });
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(id);
    document.head.appendChild(s);
  }
  function clearGaCookies() {
    var host = location.hostname.replace(/^www\./, "");
    document.cookie.split(";").forEach(function (c) {
      var name = c.split("=")[0].trim();
      if (name === "_ga" || name.indexOf("_ga_") === 0) {
        ["", "; domain=." + host, "; domain=" + host].forEach(function (d) {
          document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/" + d;
        });
      }
    });
  }
  function pageLang() {
    var parts = location.pathname.split("/");
    var segs = [];
    for (var i = 0; i < parts.length; i++) {
      if (parts[i]) segs.push(parts[i].toLowerCase());
    }
    if (segs.length >= 2 && COPY[segs[1]]) return segs[1];
    var htmlLang = (document.documentElement.getAttribute("lang") || "en").toLowerCase().split("-")[0];
    if (COPY[htmlLang]) return htmlLang;
    return "en";
  }
  var css =
    "#mtg-consent{position:fixed;left:0;right:0;bottom:0;z-index:80;background:#fff;color:#111;border-top:2px solid #1f2a44;box-shadow:0 -2px 8px rgba(0,0,0,.12);padding:.75rem 1rem;font:15px/1.45 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}" +
    "#mtg-consent .in{max-width:64rem;margin:0 auto;display:flex;flex-wrap:wrap;gap:.75rem;align-items:center;justify-content:space-between}" +
    "#mtg-consent p{margin:0;flex:1 1 22rem}#mtg-consent a{color:#1f2a44;text-decoration:underline}" +
    "#mtg-consent .b{display:flex;gap:.5rem;flex-wrap:wrap}#mtg-consent button{font:inherit;padding:.45rem 1rem;border-radius:4px;border:2px solid #1f2a44;cursor:pointer;min-height:44px}" +
    "#mtg-consent .acc{background:#1f2a44;color:#fff}#mtg-consent .rej{background:#fff;color:#1f2a44}" +
    "#mtg-consent button:focus-visible{outline:3px solid #b45309;outline-offset:2px}" +
    ".consent-link{background:none;border:0;padding:0;font:inherit;color:inherit;text-decoration:underline;cursor:pointer}";
  function ensureStyle() {
    if (document.getElementById("mtg-consent-css")) return;
    var s = document.createElement("style");
    s.id = "mtg-consent-css";
    s.textContent = css;
    document.head.appendChild(s);
  }
  function close() {
    var el = document.getElementById("mtg-consent");
    if (el && el.parentNode) el.parentNode.removeChild(el);
  }
  function choose(v) {
    save(v);
    if (v === "granted") loadGa();
    else {
      gtagSafe("consent", "update", { analytics_storage: "denied" });
      clearGaCookies();
    }
    close();
  }
  function show(focus) {
    ensureStyle();
    if (document.getElementById("mtg-consent")) return;
    var copy = COPY[pageLang()];
    var box = document.createElement("div");
    box.id = "mtg-consent";
    box.setAttribute("role", "region");
    box.setAttribute("aria-label", copy.aria);
    if (document.documentElement.getAttribute("dir") === "rtl" || pageLang() === "he") {
      box.setAttribute("dir", "rtl");
    }
    box.innerHTML =
      '<div class="in"><p>' + copy.body +
      '<a href="' + copy.href + '">' + copy.privacy + "</a></p>" +
      '<div class="b"><button type="button" class="acc">' + copy.accept + "</button>" +
      '<button type="button" class="rej">' + copy.reject + "</button></div></div>";
    box.querySelector(".acc").addEventListener("click", function () { choose("granted"); });
    box.querySelector(".rej").addEventListener("click", function () { choose("denied"); });
    if (document.body.firstChild) document.body.insertBefore(box, document.body.firstChild);
    else document.body.appendChild(box);
    if (focus) box.querySelector(".acc").focus();
  }
  function ensureFooterControl() {
    var copy = COPY[pageLang()];
    var footers = document.getElementsByTagName("footer");
    var footer = footers.length ? footers[footers.length - 1] : null;
    if (footer && footer.querySelector("[data-consent-open]")) return;
    ensureStyle();
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "consent-link";
    btn.setAttribute("data-consent-open", "1");
    btn.textContent = copy.choices;
    if (!footer) return;
    var holder = document.createElement("div");
    holder.appendChild(btn);
    footer.appendChild(holder);
  }
  document.addEventListener("click", function (e) {
    var t = e.target && e.target.closest ? e.target.closest("[data-consent-open]") : null;
    if (t) { e.preventDefault(); show(true); }
  });
  function isInstantRedirect() {
    return !!document.querySelector('meta[http-equiv="refresh"]');
  }
  function init() {
    var v = read();
    if (v === "granted") loadGa();
    if (isInstantRedirect()) return;
    ensureFooterControl();
    if (v !== "granted" && v !== "denied") show(false);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
