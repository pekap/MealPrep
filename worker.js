import { mediterraneanPlan } from "./data-mediterranean.js";
import { mexicanPlan } from "./data-mexican.js";
import { airFryerPlan } from "./data-air-fryer.js";

const seedPlans = { mediterranean: mediterraneanPlan, mexican: mexicanPlan, air: airFryerPlan };
// Bump when the bundled plan data changes and the DB copy should be refreshed.
const SEED_VERSION = "3";
const json = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });

async function ensureSeed(env) {
  const row = await env.DB.prepare("SELECT value FROM meta WHERE key = 'seed_version'").first().catch(() => null);
  if (row?.value === SEED_VERSION) return;
  await env.DB.batch([
    ...Object.entries(seedPlans).map(([id, data]) =>
      env.DB.prepare(
        "INSERT INTO plans (id, data, updated_at) VALUES (?1, ?2, datetime('now')) ON CONFLICT(id) DO UPDATE SET data = ?2, updated_at = datetime('now')"
      ).bind(id, JSON.stringify(data))
    ),
    env.DB.prepare(
      "INSERT INTO meta (key, value) VALUES ('seed_version', ?1) ON CONFLICT(key) DO UPDATE SET value = ?1"
    ).bind(SEED_VERSION),
  ]);
}

async function handleApi(request, url, env) {
  const { pathname, searchParams } = url;

  if (pathname === "/api/plans" && request.method === "GET") {
    await ensureSeed(env);
    const { results } = await env.DB.prepare("SELECT id, data FROM plans").all();
    return json(Object.fromEntries(results.map(r => [r.id, JSON.parse(r.data)])));
  }

  const planUpdate = pathname.match(/^\/api\/plans\/([a-z0-9-]+)$/);
  if (planUpdate && request.method === "PUT") {
    let body;
    try { body = await request.json(); } catch { return json({ error: "invalid JSON" }, 400); }
    if (!body || typeof body !== "object") return json({ error: "plan body must be an object" }, 400);
    await env.DB.prepare(
      "INSERT INTO plans (id, data, updated_at) VALUES (?1, ?2, datetime('now')) ON CONFLICT(id) DO UPDATE SET data = ?2, updated_at = datetime('now')"
    ).bind(planUpdate[1], JSON.stringify(body)).run();
    return json({ ok: true, id: planUpdate[1] });
  }

  if (pathname === "/api/checks" && request.method === "GET") {
    const plan = searchParams.get("plan");
    if (!plan) return json({ error: "plan is required" }, 400);
    const { results } = await env.DB.prepare("SELECT kind, item FROM checks WHERE plan = ?1").bind(plan).all();
    return json({
      shop: results.filter(r => r.kind === "shop").map(r => r.item),
      steps: results.filter(r => r.kind === "step").map(r => r.item),
    });
  }

  if (pathname === "/api/checks" && request.method === "PUT") {
    let body;
    try { body = await request.json(); } catch { return json({ error: "invalid JSON" }, 400); }
    const { plan, kind, index, done } = body ?? {};
    if (typeof plan !== "string" || !["shop", "step"].includes(kind) || !Number.isInteger(index)) {
      return json({ error: "expected { plan, kind: shop|step, index, done }" }, 400);
    }
    await (done
      ? env.DB.prepare("INSERT OR IGNORE INTO checks (plan, kind, item) VALUES (?1, ?2, ?3)").bind(plan, kind, index)
      : env.DB.prepare("DELETE FROM checks WHERE plan = ?1 AND kind = ?2 AND item = ?3").bind(plan, kind, index)
    ).run();
    return json({ ok: true });
  }

  if (pathname === "/api/checks" && request.method === "DELETE") {
    const plan = searchParams.get("plan");
    const kind = searchParams.get("kind");
    if (!plan || !["shop", "step"].includes(kind)) return json({ error: "plan and kind=shop|step are required" }, 400);
    await env.DB.prepare("DELETE FROM checks WHERE plan = ?1 AND kind = ?2").bind(plan, kind).run();
    return json({ ok: true });
  }

  return json({ error: "not found" }, 404);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      try { return await handleApi(request, url, env); }
      catch (error) { return json({ error: String(error) }, 500); }
    }
    return env.ASSETS.fetch(request);
  },
};
