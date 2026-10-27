// Point the mapthegeneral.com Worker route at /il-live/* only, and fail open
// when the Workers Free daily request limit is hit. Uses the Cloudflare API
// token already stored for CI. Does not print the token.
//
//   CLOUDFLARE_API_TOKEN=... node scripts/il-live/configure-route.mjs
//
// Account eb5337d92c40df7b3d6b65229981163a hosts mapthegeneral.com.

const API = "https://api.cloudflare.com/client/v4";
const ACCOUNT = process.env.CLOUDFLARE_ACCOUNT_ID || "eb5337d92c40df7b3d6b65229981163a";
const NARROW = "mapthegeneral.com/il-live/*";
const TOKEN =
  process.env.CLOUDFLARE_API_TOKEN ||
  process.env.CF_API_TOKEN ||
  process.env.CLOUDFLARE_TOKEN ||
  process.env.WRANGLER_API_TOKEN ||
  "";

function summarize(route) {
  return {
    id: route.id,
    pattern: route.pattern,
    script: route.script ?? null,
    request_limit_fail_open: route.request_limit_fail_open ?? null,
  };
}

function onThisHost(pattern) {
  return typeof pattern === "string" && pattern.includes("mapthegeneral.com");
}

function coversMoreThanIlLive(pattern) {
  return onThisHost(pattern) && !pattern.includes("/il-live/");
}

async function cf(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok || body.success === false) {
    const errors = body.errors || body;
    throw new Error(`${options.method || "GET"} ${path} -> ${res.status} ${JSON.stringify(errors)}`);
  }
  return body.result;
}

async function putRoute(zoneId, route, pattern) {
  const payload = {
    pattern,
    script: route.script,
    request_limit_fail_open: true,
  };
  try {
    return await cf(`/zones/${zoneId}/workers/routes/${route.id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  } catch (error) {
    const message = String(error.message || error);
    if (!message.includes("request_limit_fail_open") && !message.includes("unknown")) throw error;
    return cf(`/zones/${zoneId}/workers/routes/${route.id}`, {
      method: "PUT",
      body: JSON.stringify({ pattern, script: route.script, request_limit_failure_mode: "fail_open" }),
    });
  }
}

async function main() {
  if (!TOKEN) {
    console.error("No Cloudflare API token (CLOUDFLARE_API_TOKEN / CF_API_TOKEN / CLOUDFLARE_TOKEN / WRANGLER_API_TOKEN).");
    process.exit(1);
  }
  const zones = await cf(`/zones?name=mapthegeneral.com&account.id=${ACCOUNT}`);
  const zone = (Array.isArray(zones) ? zones : []).find((item) => item.name === "mapthegeneral.com") || zones?.[0];
  if (!zone?.id) throw new Error("mapthegeneral.com zone was not returned for this token");
  const zoneId = zone.id;
  const before = await cf(`/zones/${zoneId}/workers/routes`);
  const routes = Array.isArray(before) ? before : [];
  console.log("BEFORE", JSON.stringify(routes.map(summarize), null, 2));

  const hostRoutes = routes.filter((route) => onThisHost(route.pattern));
  if (hostRoutes.length === 0) {
    console.error("No Worker routes on mapthegeneral.com. Nothing was changed.");
    process.exit(1);
  }

  const keeper =
    hostRoutes.find((route) => route.pattern === NARROW) ||
    hostRoutes.find((route) => typeof route.pattern === "string" && route.pattern.includes("/il-live/")) ||
    hostRoutes.find((route) => coversMoreThanIlLive(route.pattern));
  if (!keeper?.script) throw new Error("The host route has no script name; refusing to rewrite it");

  const updated = await putRoute(zoneId, keeper, NARROW);
  console.log("UPDATED", JSON.stringify(summarize(updated)));

  for (const route of hostRoutes) {
    if (route.id === keeper.id) continue;
    if (coversMoreThanIlLive(route.pattern) || (typeof route.pattern === "string" && route.pattern.includes("/il-live/"))) {
      await cf(`/zones/${zoneId}/workers/routes/${route.id}`, { method: "DELETE" });
      console.log("DELETED", JSON.stringify(summarize(route)));
    }
  }

  const after = await cf(`/zones/${zoneId}/workers/routes`);
  console.log("AFTER", JSON.stringify((Array.isArray(after) ? after : []).map(summarize), null, 2));
  const live = (Array.isArray(after) ? after : []).filter((route) => onThisHost(route.pattern));
  const ok =
    live.length === 1 &&
    live[0].pattern === NARROW &&
    (live[0].request_limit_fail_open === true || live[0].request_limit_failure_mode === "fail_open");
  if (!ok) {
    console.error("Route is not exactly mapthegeneral.com/il-live/* with fail open.");
    process.exit(1);
  }
  console.log("Route is mapthegeneral.com/il-live/* and fails open.");
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
