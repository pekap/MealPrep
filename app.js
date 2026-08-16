import { mediterraneanPlan } from "/data-mediterranean.js";
import { mexicanPlan } from "/data-mexican.js";
import { airFryerPlan } from "/data-air-fryer.js";

const plans = { mediterranean: mediterraneanPlan, mexican: mexicanPlan, air: airFryerPlan };
const proteinOptions = {
  turkey: { label: "Turkey", grocery: "Ground turkey", query: "ground turkey 2 lb" },
  beef: { label: "Beef", grocery: "Ground beef (90/10)", query: "lean ground beef 90 10 2 lb" },
};
const categoryLabels = { all: "All", produce: "Produce", fridge: "Fridge", pantry: "Pantry" };

let activePlan = localStorage.getItem("prep-plan") || "mediterranean";
if (!plans[activePlan]) activePlan = "mediterranean";
let activeProtein = localStorage.getItem("prep-protein") || "turkey";
if (!proteinOptions[activeProtein]) activeProtein = "turkey";
let activeFilter = "all";
let checked = loadChecked();
let doneSteps = loadDoneSteps();

function plan() { return plans[activePlan]; }
function loadChecked() { return new Set(JSON.parse(localStorage.getItem(`prep-checked-${activePlan}`) || "[]")); }
function saveChecked() { localStorage.setItem(`prep-checked-${activePlan}`, JSON.stringify([...checked])); }
function loadDoneSteps() { return new Set(JSON.parse(localStorage.getItem(`prep-done-${activePlan}`) || "[]")); }
function saveDoneSteps() { localStorage.setItem(`prep-done-${activePlan}`, JSON.stringify([...doneSteps])); }

async function api(path, options) {
  try { const r = await fetch(path, options); return r.ok ? await r.json() : null; } catch { return null; }
}
function pushCheck(kind, index, done) {
  api("/api/checks", { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify({ plan: activePlan, kind, index, done }) });
}
async function syncChecks() {
  const remote = await api(`/api/checks?plan=${activePlan}`);
  if (!remote) return;
  checked = new Set(remote.shop); saveChecked();
  doneSteps = new Set(remote.steps); saveDoneSteps();
  renderShopping(); renderTimeline();
}
async function syncPlans() {
  const remote = await api("/api/plans");
  if (!remote) return;
  Object.keys(plans).forEach(key => { if (remote[key]) plans[key] = remote[key]; });
  renderAll();
}
function adapt(value) {
  if (activePlan !== "mediterranean" || activeProtein === "turkey" || typeof value !== "string") return value;
  return value.replaceAll("Turkey", "Beef").replaceAll("turkey", "beef").replaceAll("165°F", "160°F");
}
function currentMeal(data) {
  return { ...data, name: adapt(data.name), tags: data.tags.map(adapt), description: adapt(data.description), method: adapt(data.method) };
}
function currentShopping() {
  return plan().shopping.map(item => activePlan === "mediterranean" && item[1] === "Ground turkey"
    ? [item[0], proteinOptions[activeProtein].grocery, item[2], proteinOptions[activeProtein].query]
    : item);
}
function formatTime(seconds) { return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`; }
function frameLink(frame) { return `${frame.video}&t=${frame.seconds}s`; }
function pickMacros(macros) {
  if (!macros) return null;
  return activePlan === "mediterranean" && activeProtein === "beef" && macros.beef ? macros.beef : macros;
}
function macroLine(macros) {
  const mm = pickMacros(macros);
  return mm ? `<p class="meal-macros">${mm.kcal} kcal · ${mm.p}P · ${mm.c}C · ${mm.f}F</p>` : "";
}

function renderPlanToggle() {
  document.querySelector("#planToggle").innerHTML = Object.entries(plans).map(([key, item]) =>
    `<button class="plan-option ${key === activePlan ? "active" : ""}" type="button" data-plan="${key}" aria-pressed="${key === activePlan}">${item.shortLabel}</button>`
  ).join("");
}

function renderStatic() {
  const p = plan();
  document.title = `${p.label} — Prep Week`;
  document.querySelector("#heroTitle").textContent = p.title;
  document.querySelector("#heroCopy").textContent = p.copy;
  document.querySelector("#proteinNote").textContent = activePlan === "mediterranean" && activeProtein === "beef"
    ? "Beef mode updates the plan, safety temperature, and shopping list. Frames still show Mike’s original turkey build."
    : p.note;
  document.querySelector("#formulaList").innerHTML = p.formula.map(([n, label]) => `<div class="formula-line"><strong>${n}</strong><span>${adapt(label)}</span></div>`).join("");
  document.querySelector("#formulaPlus").textContent = p.formulaPlus;
  document.querySelector("#prepMinutes").textContent = p.prepMinutes;
  document.querySelector("#coreCount").textContent = p.coreCount;
  document.querySelector("#weekNote").textContent = p.weekNote;
  document.querySelector("#componentHeading").textContent = p.componentHeading;
  document.querySelector("#freezeCopy").textContent = adapt(p.freezeCopy);
  document.querySelector("#prepHeading").textContent = `Cook tonight · ${p.prepMinutes} min`;
  document.querySelector("#prepEquipment").textContent = p.equipment;
  document.querySelector("#methodNote").textContent = p.methodNote;
  document.querySelector("#proteinControl").classList.toggle("hidden", activePlan !== "mediterranean");
  const a = p.aside;
  document.querySelector("#prepAside").innerHTML = `
    <div class="aside-card important"><p class="aside-kicker">THE EFFICIENCY MOVE</p><h3>${adapt(a.title)}</h3><p>${adapt(a.copy)}</p></div>
    <div class="aside-card"><p class="aside-kicker">STORE IT RIGHT</p><ul>${a.storage.map(x => `<li>${adapt(x)}</li>`).join("")}</ul></div>
    <div class="aside-card air-card"><span class="air-icon">↯</span><div><p class="aside-kicker">AIR FRYER CARD</p><p>${a.air.map(x => `<b>${adapt(x)}</b>`).join("<br>")}</p></div></div>`;
}

function renderProteinToggle() {
  document.querySelector("#proteinToggle").innerHTML = Object.entries(proteinOptions).map(([key, option]) =>
    `<button class="protein-option ${activeProtein === key ? "active" : ""}" type="button" data-protein="${key}" aria-pressed="${activeProtein === key}">${option.label}</button>`
  ).join("");
}

function renderWeek() {
  document.querySelector("#weekGrid").innerHTML = plan().meals.map((d, i) => `
    <article class="day-card"><div class="day-top"><strong>${d[0]}</strong><span>AUG ${d[1]}</span></div>
    ${slot("Lunch", d[2], i, 2)}${slot("Dinner", d[3], i, 3)}</article>`).join("");
  const footnote = document.querySelector("#macroFootnote");
  footnote.textContent = plan().macroNote || "";
  footnote.classList.toggle("hidden", !plan().macroNote);
}

function slot(label, data, index, key) {
  const m = currentMeal(data);
  return `<div class="meal-slot">
    <a class="meal-visual" href="${frameLink(m.frame)}" target="_blank" rel="noreferrer" aria-label="Watch source at ${formatTime(m.frame.seconds)}">
      <img src="${m.frame.image}" alt="${m.frame.alt}" loading="lazy"><span><b>VIDEO FRAME</b>${formatTime(m.frame.seconds)} ↗</span>
    </a>
    <div class="meal-slot-copy"><div><span class="meal-label">${label}</span><h3>${m.name}</h3>${macroLine(m.macros)}</div>
      <div class="meal-details"><div class="meal-tags">${m.tags.slice(0, 2).map(t => `<span>${t}</span>`).join("")}</div><button class="build-button" data-day="${index}" data-meal="${key}" aria-label="View ${m.name} details">↗</button></div>
    </div></div>`;
}

function renderComponents() {
  document.querySelector("#componentGrid").innerHTML = plan().components.map(c => {
    const mm = pickMacros(c[4]);
    const macros = mm ? `<p class="component-macros">${mm.kcal} kcal · ${mm.p}P · ${mm.c}C · ${mm.f}F <small>per portion</small></p>` : "";
    return `<article class="component-card"><div class="component-number">${c[0]}</div><h3>${adapt(c[1])}</h3><p>${adapt(c[2])}</p>${macros}<div class="component-meta">${c[3].map(x => `<span>${x}</span>`).join("")}</div></article>`;
  }).join("");
}

function renderTimeline() {
  const p = plan();
  renderOrderNotes();
  if (!p.prepTonight) {
    document.querySelector("#timeline").innerHTML = p.timeline.map(t =>
      `<li class="timeline-item"><span class="timeline-count"></span><div class="timeline-copy"><h3>${t[1]}</h3><p>${adapt(t[2])}</p></div><span class="timeline-time">${t[0]}</span></li>`
    ).join("");
    renderPrepProgress();
    return;
  }
  document.querySelector("#timeline").innerHTML = p.prepTonight.map((s, i) => {
    const done = doneSteps.has(i);
    return `<li class="timeline-item prep-step ${done ? "done" : ""}">
      <button class="step-check" type="button" data-step="${i}" aria-pressed="${done}" aria-label="Mark step ${i + 1} ${done ? "not done" : "done"}">${done ? "✓" : ""}</button>
      <div class="timeline-copy">
        <div class="step-head"><h3>${adapt(s.title)}</h3><span class="step-mins">~${s.mins} min</span></div>
        <ol class="step-actions">${s.actions.map(a => `<li>${adapt(a)}</li>`).join("")}</ol>
        <p class="step-tip"><b>TIP</b> ${adapt(s.tip)}</p>
        <div class="step-items">${s.items.map(x => `<span>${adapt(x)}</span>`).join("")}</div>
      </div>
      <div class="step-side">
        <span class="timeline-time">${s.time}</span>
        <a class="step-frame" href="${frameLink(s.frame)}" target="_blank" rel="noreferrer" aria-label="Watch this step in the source video at ${formatTime(s.frame.seconds)}">
          <img src="${s.frame.image}" alt="${s.frame.alt}" loading="lazy"><span>${formatTime(s.frame.seconds)} ↗</span>
        </a>
      </div>
    </li>`;
  }).join("");
  renderPrepProgress();
}

function renderOrderNotes() {
  const host = document.querySelector("#prepNotes");
  const data = plan().orderNotes;
  host.classList.toggle("hidden", !data);
  host.innerHTML = data ? `<p class="order-notes-label">${data.label}</p><ul>${data.notes.map(n => `<li>${n}</li>`).join("")}</ul>` : "";
}

function renderPrepProgress() {
  const steps = plan().prepTonight;
  const progress = document.querySelector("#prepProgress");
  const reset = document.querySelector("#prepReset");
  progress.classList.toggle("hidden", !steps);
  reset.classList.toggle("hidden", !steps || !doneSteps.size);
  if (!steps) return;
  const left = steps.reduce((sum, s, i) => sum + (doneSteps.has(i) ? 0 : s.mins), 0);
  progress.textContent = doneSteps.size === steps.length ? "Done — the week is prepped" : `${doneSteps.size} of ${steps.length} · ~${left} min left`;
}

function renderRecipes() {
  document.querySelector("#recipeGrid").innerHTML = plan().recipes.map(r => {
    const beefNote = activePlan === "mediterranean" && activeProtein === "beef" && r[0].toLowerCase().includes("turkey")
      ? `<p class="swap-note">Beef adaptation · the linked source uses turkey. Cook ground beef to 160°F.</p>` : "";
    const sourceVideo = r[6] || plan().video;
    const sourceLabel = r[6] ? `OTHER VIDEO · ${formatTime(r[5])} ↗` : `SOURCE · ${formatTime(r[5])} ↗`;
    return `<details class="recipe-card"><summary><span>${adapt(r[0])}</span><span class="method-chip">${r[1]}</span></summary>
      <div class="recipe-body"><p>${adapt(r[2])}</p>${beefNote}<div class="recipe-ingredients">${r[3].map(x => `<span>${adapt(x)}</span>`).join("")}</div>
      <ol class="recipe-steps">${r[4].map(x => `<li>${adapt(x)}</li>`).join("")}</ol><a class="recipe-source" target="_blank" rel="noreferrer" href="${sourceVideo}&t=${r[5]}s">${sourceLabel}</a></div></details>`;
  }).join("");
}

function renderFilters() {
  document.querySelector("#filterGroup").innerHTML = Object.entries(categoryLabels).map(([key, label]) =>
    `<button class="filter-button ${activeFilter === key ? "active" : ""}" data-filter="${key}" type="button">${label}</button>`
  ).join("");
}

function renderShopping() {
  const all = currentShopping();
  const visible = all.map((item, index) => ({ item, index })).filter(({ item }) => activeFilter === "all" || item[0] === activeFilter);
  document.querySelector("#shoppingList").innerHTML = visible.map(({ item, index }) => {
    const [category, name, qty, query] = item;
    const done = checked.has(index);
    const href = `https://www.amazon.com/s?k=${encodeURIComponent(query)}&i=amazonfresh`;
    return `<div class="shop-row ${done ? "checked" : ""}"><input id="shop-${activePlan}-${index}" type="checkbox" data-index="${index}" ${done ? "checked" : ""}>
      <label class="shop-name" for="shop-${activePlan}-${index}">${name}<small>${qty} · ${categoryLabels[category]}</small></label><a class="amazon-link" href="${href}" target="_blank" rel="noreferrer">Fresh ↗</a></div>`;
  }).join("");
  document.querySelector("#remainingCount").textContent = all.length - checked.size;
}

function renderSources() {
  document.querySelector("#sourceGrid").innerHTML = plan().sources.map(s => `<article class="source-card"><div class="source-media"><img src="${s.image}" alt="Captured frame from ${s.title}"><span class="source-year">${s.year}</span></div>
    <div class="source-copy"><h3>${s.title}</h3><p>${s.note}</p><div class="timestamp-list">${s.times.map(([label, sec]) => `<a target="_blank" rel="noreferrer" href="${s.video}&t=${sec}s">${label}</a>`).join("")}</div>
    <div class="source-footer"><a target="_blank" rel="noreferrer" href="${s.video}">Watch video ↗</a><a target="_blank" rel="noreferrer" href="${s.doc}">Recipe doc ↗</a></div></div></article>`).join("");
}

function openMeal(dayIndex, key) {
  const d = plan().meals[dayIndex];
  const m = currentMeal(d[key]);
  document.querySelector("#dialogLabel").textContent = `${d[0]} · ${key === 2 ? "lunch" : "dinner"}`;
  document.querySelector("#dialogTitle").textContent = m.name;
  document.querySelector("#dialogImage").src = m.frame.image;
  document.querySelector("#dialogImage").alt = m.frame.alt;
  document.querySelector("#dialogSource").href = frameLink(m.frame);
  document.querySelector("#dialogSourceLabel").textContent = `Source video · ${formatTime(m.frame.seconds)} ↗`;
  document.querySelector("#dialogDescription").textContent = m.description;
  const mm = pickMacros(m.macros);
  document.querySelector("#dialogMacros").innerHTML = mm
    ? `<div><strong>${mm.kcal}</strong><span>kcal</span></div><div><strong>${mm.p}g</strong><span>protein</span></div><div><strong>${mm.c}g</strong><span>carbs</span></div><div><strong>${mm.f}g</strong><span>fat</span></div>`
    : "";
  document.querySelector("#dialogBuild").innerHTML = m.tags.map(t => `<span>${t}</span>`).join("");
  document.querySelector("#dialogMethod").innerHTML = `<b>Fast finish</b><br>${m.method}`;
  document.querySelector("#mealDialog").showModal();
}

function renderAll() {
  renderPlanToggle(); renderStatic(); renderProteinToggle(); renderWeek(); renderComponents(); renderTimeline(); renderRecipes(); renderFilters(); renderShopping(); renderSources();
  if (typeof activeTheme !== "undefined" && activeTheme === "swift" && swiftModule) swiftModule.refreshSwift();
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message; toast.classList.add("show");
  clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove("show"), 1800);
}

document.addEventListener("click", event => {
  const build = event.target.closest(".build-button");
  if (build) openMeal(Number(build.dataset.day), Number(build.dataset.meal));
  const filter = event.target.closest(".filter-button");
  if (filter) { activeFilter = filter.dataset.filter; renderFilters(); renderShopping(); }
  const planButton = event.target.closest(".plan-option");
  if (planButton && planButton.dataset.plan !== activePlan) {
    activePlan = planButton.dataset.plan; localStorage.setItem("prep-plan", activePlan);
    activeFilter = "all"; checked = loadChecked(); doneSteps = loadDoneSteps(); renderAll(); syncChecks(); window.scrollTo({ top: 0, behavior: "smooth" }); showToast(`${plan().label} week loaded`);
  }
  const stepCheck = event.target.closest(".step-check");
  if (stepCheck) {
    const index = Number(stepCheck.dataset.step);
    const done = !doneSteps.has(index);
    done ? doneSteps.add(index) : doneSteps.delete(index);
    saveDoneSteps(); pushCheck("step", index, done); renderTimeline();
  }
  if (event.target.closest("#prepReset")) {
    doneSteps = new Set(); saveDoneSteps(); api(`/api/checks?plan=${activePlan}&kind=step`, { method: "DELETE" });
    renderTimeline(); showToast("Prep progress reset");
  }
  const protein = event.target.closest(".protein-option");
  if (protein && protein.dataset.protein !== activeProtein) {
    activeProtein = protein.dataset.protein; localStorage.setItem("prep-protein", activeProtein);
    renderStatic(); renderProteinToggle(); renderWeek(); renderComponents(); renderTimeline(); renderRecipes(); renderShopping(); showToast(`Protein changed to ${proteinOptions[activeProtein].grocery}`);
  }
});

document.querySelector("#shoppingList").addEventListener("change", event => {
  if (!event.target.matches("input[type='checkbox']")) return;
  const index = Number(event.target.dataset.index);
  event.target.checked ? checked.add(index) : checked.delete(index);
  saveChecked(); pushCheck("shop", index, event.target.checked); renderShopping();
});
document.querySelector("#copyList").addEventListener("click", async () => {
  const list = currentShopping().filter((_, i) => !checked.has(i)).map(([, name, qty]) => `${name} — ${qty}`).join("\n");
  await navigator.clipboard.writeText(list); showToast("Remaining list copied");
});
document.querySelector(".dialog-close").addEventListener("click", () => document.querySelector("#mealDialog").close());
document.querySelector("#mealDialog").addEventListener("click", event => { if (event.target === event.currentTarget) event.currentTarget.close(); });
const themeNames = { minimal: "Minimal", dark: "Dark", swift: "Taylor’s Version", mono: "Mono" };
function readThemeCookie() {
  return document.cookie.split("; ").find(row => row.startsWith("prep-theme="))?.split("=")[1];
}
function writeThemeCookie(theme) {
  document.cookie = `prep-theme=${theme}; max-age=31536000; path=/; samesite=lax`;
}
// Priority: ?theme= in the link → cookie → legacy localStorage → default.
const urlTheme = new URLSearchParams(location.search).get("theme");
let activeTheme = [urlTheme, readThemeCookie(), localStorage.getItem("prep-theme")].find(t => themeNames[t]) || "minimal";
let swiftModule = null;

async function applyTheme(theme) {
  const previous = activeTheme;
  activeTheme = theme;
  writeThemeCookie(theme);
  localStorage.setItem("prep-theme", theme);
  const url = new URL(location);
  url.searchParams.set("theme", theme);
  history.replaceState(null, "", url);
  document.body.dataset.theme = theme;
  document.querySelector("#themeLabel").textContent = themeNames[theme];
  document.querySelectorAll("[data-theme-pick]").forEach(b => b.classList.toggle("active", b.dataset.themePick === theme));
  if (theme === "swift") {
    swiftModule ??= await import("./swift.js");
    swiftModule.enableSwift();
  } else if (previous === "swift" && swiftModule) {
    swiftModule.disableSwift();
  }
}

const themeMenu = document.querySelector("#themeMenu");
document.querySelector("#themeToggle").addEventListener("click", event => {
  event.stopPropagation();
  const open = themeMenu.classList.toggle("hidden");
  document.querySelector("#themeToggle").setAttribute("aria-expanded", String(!open));
});
themeMenu.addEventListener("click", event => {
  const pick = event.target.closest("[data-theme-pick]");
  if (!pick) return;
  themeMenu.classList.add("hidden");
  applyTheme(pick.dataset.themePick);
});
document.addEventListener("click", () => themeMenu.classList.add("hidden"));

renderAll();
applyTheme(activeTheme);
syncPlans().then(syncChecks);
