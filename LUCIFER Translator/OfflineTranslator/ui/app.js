"use strict";

/* ---------- static data ---------- */

// Lucide-style icon paths (24x24, stroked).
const ICONS = {
  panel: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/>',
  circlePlus: '<circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/>',
  languages: '<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>',
  history: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/>',
  package: '<path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/>',
  cpu: '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>',
  sparkles: '<path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.14-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.14a.5.5 0 0 1 .96 0l1.58 6.14a2 2 0 0 0 1.44 1.44l6.14 1.58a.5.5 0 0 1 0 .96l-6.14 1.58a2 2 0 0 0-1.44 1.44l-1.58 6.14a.5.5 0 0 1-.96 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>',
  folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
  sliders: '<path d="M21 4h-7"/><path d="M10 4H3"/><path d="M21 12h-9"/><path d="M8 12H3"/><path d="M21 20h-5"/><path d="M12 20H3"/><path d="M14 2v4"/><path d="M8 10v4"/><path d="M16 18v4"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
  copy: '<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
  swap: '<path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/>',
  paperclip: '<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
  trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2"/>',
  arrowUp: '<path d="m5 12 7-7 7 7"/><path d="M12 19V5"/>',
  fileText: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  refresh: '<path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
};

// Languages offered in AI mode (the model is told the language by name).
const AI_LANGUAGES = [
  "Arabic", "Bengali", "Bulgarian", "Burmese", "Catalan", "Chinese (Simplified)", "Chinese (Traditional)",
  "Croatian", "Czech", "Danish", "Dutch", "English", "Estonian", "Filipino", "Finnish", "French", "German",
  "Greek", "Hebrew", "Hindi", "Hungarian", "Indonesian", "Italian", "Japanese", "Khmer", "Korean", "Lao",
  "Latvian", "Lithuanian", "Malay", "Nepali", "Norwegian", "Persian", "Polish", "Portuguese",
  "Portuguese (Brazil)", "Romanian", "Russian", "Serbian", "Sinhala", "Slovak", "Slovenian", "Spanish",
  "Swahili", "Swedish", "Tamil", "Thai", "Turkish", "Ukrainian", "Urdu", "Vietnamese",
];

const RECOMMENDED_MODELS = [
  { name: "gemma3:4b", title: "Gemma 3 · 4B", note: "Best balance for most PCs · 140+ languages · ≈3.3 GB download · 8 GB RAM" },
  { name: "gemma3:12b", title: "Gemma 3 · 12B", note: "Most natural results · ≈8 GB download · 16 GB RAM or a graphics card" },
  { name: "qwen2.5:7b", title: "Qwen 2.5 · 7B", note: "Excellent for Chinese ⇄ Arabic and other Asian languages · ≈4.7 GB" },
  { name: "gemma3:1b", title: "Gemma 3 · 1B", note: "Fastest, for older PCs · ≈0.8 GB · noticeably lower quality" },
];

// Always shown as quick buttons, before recently used pairs.
const PINNED_PAIRS = {
  argos: [{ from: "zh", to: "ar" }, { from: "ar", to: "zh" }],
  ai: [{ from: "Chinese (Simplified)", to: "Arabic" }, { from: "Arabic", to: "Chinese (Simplified)" }],
};
const SUGGESTED_PAIRS = { ai: [{ from: "", to: "English" }], argos: [] };

// One-click setups on the Language Packs page (Standard engine).
const FEATURED_BUNDLES = [
  {
    a: "zh", b: "ar", title: "Chinese ⇄ Arabic",
    note: "Installs Chinese ⇄ English and Arabic ⇄ English (4 packs). Chinese ⇄ Arabic is then translated through English automatically.",
  },
];

// Names for languages that aren't installed yet (installed ones come from the backend).
const LANGUAGE_NAMES = { en: "English", zh: "Chinese", ar: "Arabic" };

/* ---------- helpers ---------- */

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const icon = (name) => `<svg class="i" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ""}</svg>`;
const opt = (value, label = value) => `<option value="${esc(value)}">${esc(label)}</option>`;
const newId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
const errText = (e) => (e && (e.message || String(e))) || "Unknown error";
const fmtSize = (bytes) => (!bytes ? "" : bytes >= 1e9 ? `${(bytes / 1e9).toFixed(1)} GB` : `${Math.round(bytes / 1e6)} MB`);

const prefs = {
  get() {
    try { return JSON.parse(localStorage.getItem("lucifer.prefs")) || {}; } catch { return {}; }
  },
  set(patch) {
    try { localStorage.setItem("lucifer.prefs", JSON.stringify({ ...prefs.get(), ...patch })); } catch { /* storage unavailable */ }
  },
};

const el = {
  app: $("#app"), pairs: $("#pairList"), aiDot: $("#aiDot"),
  hero: $("#hero"), heroSub: $("#heroSub"), result: $("#result"), resultTag: $("#resultTag"), resultText: $("#resultText"),
  chips: $("#chips"), cards: $("#cards"),
  from: $("#fromSel"), to: $("#toSel"), tone: $("#toneSel"), live: $("#liveChk"),
  src: $("#src"), count: $("#count"), send: $("#sendBtn"),
  historyList: $("#historyList"),
  aiStatus: $("#aiStatus"), aiList: $("#aiList"),
  packSearch: $("#packSearch"), packStatus: $("#packStatus"), packList: $("#packList"),
  toast: $("#toast"),
};

const state = {
  engine: "argos",
  langs: [], byCode: {}, pairs: [],
  ai: { running: false, version: "", models: [] },
  result: "", reqId: 0, translating: false,
  packs: [], busy: false,
  session: newId(), history: [],
};

let api = null;
let autoTimer = null;
let toastTimer = null;

const nameOf = (code) => state.byCode[code]?.name || LANGUAGE_NAMES[code] || code;
const pairLabel = (from, to) => `${from ? nameOf(from) : "Detect"} → ${nameOf(to)}`;

function toast(message, isError = false) {
  el.toast.textContent = message;
  el.toast.classList.toggle("error", isError);
  el.toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.toast.classList.remove("show"), 2800);
}

/* ---------- views ---------- */

function showView(name) {
  document.querySelectorAll(".view").forEach((v) => v.classList.toggle("active", v.id === `view-${name}`));
  document.querySelectorAll(".nav-item[data-view]").forEach((b) => b.classList.toggle("active", b.dataset.view === name));
  if (name === "packs") loadPacks();
  if (name === "history") loadHistory();
  if (name === "ai") loadAi();
  if (name === "translate") el.src.focus();
}

/* ---------- engine & languages ---------- */

function setEngine(engine, { quiet = false } = {}) {
  state.engine = engine;
  prefs.set({ engine });
  document.querySelectorAll(".seg-btn").forEach((b) => {
    const on = b.dataset.engine === engine;
    b.classList.toggle("active", on);
    b.setAttribute("aria-checked", String(on));
  });
  el.tone.hidden = engine !== "ai";
  el.heroSub.textContent = engine === "ai"
    ? "AI mode translates meaning, tone and idioms like a native speaker — still 100% offline."
    : "Private, offline translation — nothing you type ever leaves this PC.";
  fillLanguageSelects();
  renderChips();
  renderPairs();
  if (engine === "ai" && !quiet && !currentModel()) {
    toast(state.ai.running ? "Download an AI model to start." : "Set up the offline AI engine first.");
    showView("ai");
  }
}

async function loadLanguages() {
  const data = await api.get_languages();
  state.argosError = data.error || "";
  state.langs = data.languages;
  state.pairs = data.pairs;
  state.byCode = Object.fromEntries(state.langs.map((l) => [l.code, l]));
  if (state.engine === "argos") fillLanguageSelects();
  renderPairs();
  renderChips();
}

function fillLanguageSelects() {
  const p = prefs.get();
  if (state.engine === "ai") {
    el.from.innerHTML = `<option value="">Detect language</option>` + AI_LANGUAGES.map((n) => opt(n)).join("");
    el.from.value = AI_LANGUAGES.includes(p.aiFrom) ? p.aiFrom : "";
    el.to.innerHTML = AI_LANGUAGES.map((n) => opt(n)).join("");
    el.to.value = AI_LANGUAGES.includes(p.aiTo) ? p.aiTo : "English";
    el.tone.value = p.tone || "natural";
    return;
  }
  const sources = state.langs.filter((l) => l.targets.length);
  el.from.innerHTML = sources.length ? sources.map((l) => opt(l.code, l.name)).join("") : `<option value="">No languages</option>`;
  const want = [p.from, "en"].find((c) => c && sources.some((l) => l.code === c));
  if (want) el.from.value = want;
  fillTargets([p.to]);
}

function fillTargets(preferred = []) {
  const targets = state.byCode[el.from.value]?.targets || [];
  el.to.innerHTML = targets.length ? targets.map((c) => opt(c, nameOf(c))).join("") : `<option value="">—</option>`;
  const want = preferred.find((c) => c && targets.includes(c));
  if (want) el.to.value = want;
}

function savePair() {
  if (state.engine === "ai") prefs.set({ aiFrom: el.from.value, aiTo: el.to.value, tone: el.tone.value });
  else prefs.set({ from: el.from.value, to: el.to.value });
}

function pairChanged(forceTranslate = false) {
  savePair();
  renderChips();
  renderPairs();
  if (el.src.value.trim() && (forceTranslate || el.live.checked)) translateNow();
}

function setPair(from, to) {
  el.from.value = from;
  if (state.engine === "ai") el.to.value = to;
  else fillTargets([to]);
  pairChanged();
}

function swap() {
  const from = el.from.value, to = el.to.value;
  if (state.engine === "ai") {
    if (!from) return toast("Pick a source language (not “Detect”) to swap.", true);
  } else if (!(state.byCode[to]?.targets || []).includes(from)) {
    return toast(`No ${nameOf(to)} → ${nameOf(from)} pack installed.`, true);
  }
  if (state.result) {
    el.src.value = state.result;
    updateCount();
  }
  el.from.value = to;
  if (state.engine === "ai") el.to.value = from;
  else fillTargets([from]);
  pairChanged(true);
}

function rememberPair(engine, from, to) {
  const recent = (prefs.get().recent || []).filter((r) => !(r.engine === engine && r.from === from && r.to === to));
  recent.unshift({ engine, from, to });
  prefs.set({ recent: recent.slice(0, 12) });
  renderChips();
}

function pairAvailable(engine, from, to) {
  if (engine === "ai") return AI_LANGUAGES.includes(to) && (from === "" || AI_LANGUAGES.includes(from));
  return (state.byCode[from]?.targets || []).includes(to);
}

function renderChips() {
  const engine = state.engine;
  const recent = (prefs.get().recent || []).filter((r) => r.engine === engine && pairAvailable(engine, r.from, r.to));
  const fallback = engine === "ai" ? SUGGESTED_PAIRS.ai : state.pairs.map(([from, to]) => ({ from, to }));
  const seen = new Set();
  const pairs = [...PINNED_PAIRS[engine], ...recent, ...fallback].filter(({ from, to }) => {
    const key = `${from}>${to}`;
    return !seen.has(key) && seen.add(key);
  });
  el.chips.innerHTML = pairs.slice(0, 5).map(({ from, to }) => {
    const ready = pairAvailable(engine, from, to);
    const cls = !ready ? " needs" : from === el.from.value && to === el.to.value ? " active" : "";
    const title = ready ? "" : ` title="Needs language packs — click to install"`;
    return `<button class="chip${cls}" data-from="${esc(from)}" data-to="${esc(to)}"${title}>${icon(ready ? (engine === "ai" ? "sparkles" : "languages") : "download")}${esc(pairLabel(from, to))}</button>`;
  }).join("");
}

function bundleFor(from, to) {
  return FEATURED_BUNDLES.find((b) => (b.a === from && b.b === to) || (b.a === to && b.b === from));
}

function bundleReady(b) {
  return pairAvailable("argos", b.a, b.b) && pairAvailable("argos", b.b, b.a);
}

function installBundle(b) {
  showView("packs");
  packOp(() => api.install_pair(b.a, b.b), `Setting up ${b.title}…`, `${b.title} is ready — works offline now.`);
}

function onChip(from, to) {
  if (pairAvailable(state.engine, from, to)) return setPair(from, to);
  const bundle = bundleFor(from, to);
  if (bundle && confirm(`${pairLabel(from, to)} needs language packs.\n\nDownload them now? (Internet is needed only for this one-time download.)`)) {
    installBundle(bundle);
  }
}

function renderPairs() {
  if (!state.pairs.length) {
    el.pairs.innerHTML = `<div class="pair-empty">No packs installed yet</div>`;
    return;
  }
  el.pairs.innerHTML = state.pairs.map(([from, to]) => {
    const current = state.engine === "argos" && from === el.from.value && to === el.to.value ? " current" : "";
    return `<button class="nav-item${current}" data-from="${esc(from)}" data-to="${esc(to)}">${icon("folder")}<span class="label">${esc(nameOf(from))} → ${esc(nameOf(to))}</span></button>`;
  }).join("");
}

/* ---------- translating ---------- */

function updateCount() {
  const n = el.src.value.length;
  el.count.textContent = `${n.toLocaleString()} character${n === 1 ? "" : "s"}`;
}

function scheduleAuto() {
  clearTimeout(autoTimer);
  if (el.live.checked) autoTimer = setTimeout(translateNow, state.engine === "ai" ? 1400 : 600);
}

function setBusy(on) {
  state.translating = on;
  const ai = state.engine === "ai";
  el.send.classList.toggle("busy", on && !ai);
  el.send.classList.toggle("stop", on && ai);
  el.send.title = on && ai ? "Stop (Esc)" : "Translate (Ctrl+Enter)";
  el.send.setAttribute("aria-label", on && ai ? "Stop translating" : "Translate");
  el.result.classList.toggle("loading", on && !ai);
  el.result.classList.toggle("streaming", on && ai);
}

function setResult(text, to = el.to.value, engine = state.engine) {
  state.result = text;
  const has = Boolean(text);
  el.hero.hidden = has;
  el.result.hidden = !has;
  el.cards.hidden = has;
  el.resultText.textContent = text;
  if (has) el.resultTag.textContent = engine === "ai" ? `${nameOf(to)} · AI` : nameOf(to);
}

function currentModel() {
  const names = state.ai.models.map((m) => m.name);
  const preferred = prefs.get().aiModel;
  return names.includes(preferred) ? preferred : names[0] || "";
}

async function translateNow() {
  clearTimeout(autoTimer);
  const text = el.src.value;
  const id = ++state.reqId;
  if (!text.trim()) {
    setBusy(false);
    setResult("");
    return;
  }
  const engine = state.engine, from = el.from.value, to = el.to.value;
  const model = engine === "ai" ? currentModel() : "";
  if (engine === "ai" && !model) {
    setBusy(false);
    toast("Choose an AI model first.", true);
    showView("ai");
    return;
  }
  if (engine === "argos" && (!from || !to)) {
    setBusy(false);
    toast("Install a language pack first — or switch to AI mode.", true);
    return;
  }

  setBusy(true);
  try {
    const out = engine === "ai"
      ? await api.ai_translate(text, from, to, el.tone.value, model, id)
      : await api.translate(text, from, to, id);
    if (id !== state.reqId || out == null) return;
    setResult(out, to, engine);
    rememberPair(engine, from, to);
    api.save_history({ id: state.session, engine, model, from, to, source: text, result: out, time: Date.now() })
      .catch(() => {});
  } catch (e) {
    if (id === state.reqId) toast(`Translation failed: ${errText(e)}`, true);
  } finally {
    if (id === state.reqId) setBusy(false);
  }
}

function stopTranslation() {
  api.cancel_translation(state.reqId);
  state.reqId++;
  setBusy(false);
  toast("Stopped");
}

function newTranslation() {
  clearTimeout(autoTimer);
  if (state.translating) stopTranslation();
  el.src.value = "";
  updateCount();
  setResult("");
  state.session = newId();
  showView("translate");
}

async function copyText(text) {
  if (!text) return toast("Nothing to copy yet.");
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const t = document.createElement("textarea");
    t.value = text;
    document.body.appendChild(t);
    t.select();
    document.execCommand("copy");
    t.remove();
  }
  toast("Copied to clipboard");
}

async function exportResult() {
  if (!state.result) return toast("Nothing to export yet — translate something first.");
  try {
    const name = await api.save_text(state.result, `translation-${nameOf(el.to.value).replace(/\W+/g, "-").toLowerCase()}.txt`);
    if (name) toast(`Saved ${name}`);
  } catch (e) {
    toast(errText(e), true);
  }
}

async function openFile() {
  try {
    const file = await api.open_text_file();
    if (!file) return;
    showView("translate");
    el.src.value = file.text;
    updateCount();
    state.session = newId();
    toast(`Loaded ${file.name}`);
    translateNow();
  } catch (e) {
    toast(errText(e), true);
  }
}

/* ---------- history ---------- */

function timeAgo(ts) {
  const s = Math.max(0, (Date.now() - ts) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)} min ago`;
  if (s < 86400) return `${Math.floor(s / 3600)} h ago`;
  if (s < 7 * 86400) return `${Math.floor(s / 86400)} d ago`;
  return new Date(ts).toLocaleDateString();
}

function emptyState(iconName, title, text) {
  return `<div class="empty"><div class="row-icon">${icon(iconName)}</div><h3>${esc(title)}</h3><p>${esc(text)}</p></div>`;
}

async function loadHistory() {
  try {
    state.history = await api.get_history();
  } catch (e) {
    toast(errText(e), true);
  }
  renderHistory();
}

function renderHistory() {
  if (!state.history.length) {
    el.historyList.innerHTML = emptyState("history", "No translations yet", "Everything you translate is saved here, on this PC only.");
    return;
  }
  el.historyList.innerHTML = state.history.map((h) => `
    <div class="row history-item" data-id="${esc(h.id)}" role="button" tabindex="0">
      <div class="row-icon">${icon(h.engine === "ai" ? "sparkles" : "languages")}</div>
      <div class="row-main">
        <div class="row-sub">${h.engine === "ai" ? "AI · " : ""}${esc(pairLabel(h.from, h.to))} · ${esc(timeAgo(h.time))}</div>
        <div class="row-title clamp" dir="auto">${esc(h.source)}</div>
        <div class="row-sub clamp" dir="auto">${esc(h.result)}</div>
      </div>
      <button class="icon-btn" data-delete="${esc(h.id)}" title="Delete" aria-label="Delete entry">${icon("trash")}</button>
    </div>`).join("");
}

function openHistory(h) {
  const engine = h.engine === "ai" ? "ai" : "argos";
  setEngine(engine, { quiet: true });
  if (pairAvailable(engine, h.from, h.to)) {
    el.from.value = h.from;
    if (engine === "ai") el.to.value = h.to;
    else fillTargets([h.to]);
  }
  el.src.value = h.source;
  updateCount();
  state.session = h.id;
  setResult(h.result, h.to, engine);
  renderChips();
  showView("translate");
}

/* ---------- long-running operations (packs, AI models) ---------- */

function setOpBusy(on, statusEl, message = "") {
  state.busy = on;
  document.querySelectorAll("#view-packs button, #view-ai button").forEach((b) => { b.disabled = on; });
  statusEl.innerHTML = on ? `<span class="spinner"></span>${esc(message)}` : "";
}

async function runOp(statusEl, work, startMessage, onResult, doneMessage) {
  if (state.busy) return;
  setOpBusy(true, statusEl, startMessage);
  try {
    const result = await work();
    if (result == null) return; // cancelled file dialog
    await onResult(result);
    if (doneMessage) toast(doneMessage);
  } catch (e) {
    toast(errText(e), true);
  } finally {
    setOpBusy(false, statusEl);
    if (statusEl === el.aiStatus) renderAi();
    else renderPacks();
  }
}

/* ---------- AI engine ---------- */

async function loadAi(render = true) {
  try {
    state.ai = await api.ai_status();
  } catch {
    state.ai = { running: false, version: "", models: [] };
  }
  updateAiDot();
  if (render) renderAi();
}

function updateAiDot() {
  el.aiDot.className = "dot" + (state.ai.running && currentModel() ? "" : state.ai.running ? " warn" : " off");
  el.aiDot.parentElement.title = state.ai.running
    ? currentModel() ? `Local AI ready · ${currentModel()}` : "Ollama is running — download a model"
    : "Ollama not found — open AI Engine to set it up";
}

function renderAi() {
  const { running, version, models } = state.ai;
  const current = currentModel();
  const dis = state.busy ? "disabled" : "";
  const pullDis = running && !state.busy ? "" : "disabled";
  let html = running
    ? `<div class="ai-card ok"><div class="row-icon">${icon("check")}</div><div>
         <h3>Ollama ${esc(version)} is running</h3>
         <p>${models.length ? `Translating with <b>${esc(current)}</b>. You can switch models below anytime.` : "Download a model below to start translating."}</p>
       </div></div>`
    : `<div class="ai-card"><div class="row-icon">${icon("cpu")}</div><div>
         <h3>Set up the offline AI (one time)</h3>
         <ol>
           <li>Download and install <b>Ollama for Windows</b> from <code>ollama.com</code>.</li>
           <li>It starts automatically and sits in the system tray.</li>
           <li>Click <b>Check again</b>, then download a model below.</li>
         </ol>
         <p>Only the download needs internet. After that, AI translation runs entirely on this PC.</p>
       </div></div>`;

  if (models.length) {
    html += `<div class="group-label">Installed models · ${models.length}</div>` + models.map((m) => `
      <div class="row">
        <div class="row-icon">${icon("sparkles")}</div>
        <div class="row-main"><div class="row-title">${esc(m.name)}</div><div class="row-sub">${[m.params, fmtSize(m.size)].filter(Boolean).map(esc).join(" · ")}</div></div>
        ${m.name === current ? `<span class="badge-ok">In use</span>` : `<button class="btn" data-use="${esc(m.name)}" ${dis}>Use</button>`}
        <button class="btn danger" data-delete-model="${esc(m.name)}" title="Remove model" aria-label="Remove ${esc(m.name)}" ${dis}>${icon("trash")}</button>
      </div>`).join("");
  }

  const installed = new Set(models.map((m) => m.name));
  const recommended = RECOMMENDED_MODELS.filter((r) => !installed.has(r.name));
  if (recommended.length) {
    html += `<div class="group-label">Recommended for translation</div>` + recommended.map((r) => `
      <div class="row">
        <div class="row-icon">${icon("download")}</div>
        <div class="row-main"><div class="row-title">${esc(r.title)} <span class="row-sub">· ${esc(r.name)}</span></div><div class="row-sub">${esc(r.note)}</div></div>
        <button class="btn primary" data-pull="${esc(r.name)}" ${pullDis}>${icon("download")}Download</button>
      </div>`).join("");
  }

  html += `<div class="group-label">Any other Ollama model</div>
    <div class="custom-pull">
      <label class="search">${icon("search")}<input id="customModel" placeholder="Model name, e.g. llama3.1:8b" aria-label="Model name"></label>
      <button class="btn" data-pull-custom ${pullDis}>${icon("download")}Download</button>
    </div>`;
  el.aiList.innerHTML = html;
}

function pullModel(name) {
  runOp(el.aiStatus, () => api.ai_pull_model(name), `Starting download of ${name}…`, async (ai) => {
    state.ai = ai;
    if (!prefs.get().aiModel) prefs.set({ aiModel: name });
    updateAiDot();
  }, `${name} is ready — AI translation works offline now.`);
}

/* ---------- language packs ---------- */

async function loadPacks() {
  try {
    state.packs = await api.list_packs();
  } catch (e) {
    toast(errText(e), true);
  }
  renderPacks();
}

function renderPacks() {
  const q = el.packSearch.value.trim().toLowerCase();
  const match = (p) => !q || `${p.from_name} ${p.to_name} ${p.from_code} ${p.to_code}`.toLowerCase().includes(q);
  const installed = state.packs.filter((p) => p.installed && match(p));
  const available = state.packs.filter((p) => !p.installed && match(p));
  const dis = state.busy ? "disabled" : "";
  const row = (p) => `
    <div class="row">
      <div class="row-icon">${icon(p.installed ? "check" : "package")}</div>
      <div class="row-main">
        <div class="row-title">${esc(p.from_name)} → ${esc(p.to_name)}</div>
        <div class="row-sub">${esc(p.from_code)} → ${esc(p.to_code)}${p.version ? ` · v${esc(p.version)}` : ""}</div>
      </div>
      ${p.installed
        ? `<button class="btn danger" data-remove="${esc(p.key)}" ${dis}>${icon("trash")}Remove</button>`
        : `<button class="btn primary" data-install="${esc(p.key)}" ${dis}>${icon("download")}Install</button>`}
    </div>`;

  let html = "";
  const bundles = FEATURED_BUNDLES.filter((b) => !q || `${b.title} ${b.a} ${b.b} chinese arabic`.toLowerCase().includes(q));
  if (bundles.length) {
    html += `<div class="group-label">Quick setup</div>` + bundles.map((b) => `
      <div class="row featured">
        <div class="row-icon">${icon("globe")}</div>
        <div class="row-main"><div class="row-title">${esc(b.title)}</div><div class="row-sub">${esc(b.note)}</div></div>
        ${bundleReady(b)
          ? `<span class="badge-ok">Ready</span>`
          : `<button class="btn primary" data-bundle="${esc(b.a)}" ${dis}>${icon("download")}Install</button>`}
      </div>`).join("");
  }
  if (installed.length) html += `<div class="group-label">Installed · ${installed.length}</div>` + installed.map(row).join("");
  if (available.length) html += `<div class="group-label">Available to download · ${available.length}</div>` + available.map(row).join("");
  if (!q && !state.packs.some((p) => !p.installed)) {
    html += `<div class="hint">Click <b>Refresh list</b> to see every downloadable language (needs internet once), or <b>Install from file</b> to add <b>.argosmodel</b> packs copied from another PC.</div>`;
  }
  el.packList.innerHTML = html || emptyState("search", "No matches", "Try another language name or code.");
}

function packOp(work, startMessage, doneMessage) {
  runOp(el.packStatus, work, startMessage, async (packs) => {
    state.packs = packs;
    await loadLanguages();
  }, doneMessage);
}

/* ---------- wiring ---------- */

function bindUI() {
  document.querySelectorAll("[data-icon]").forEach((n) => n.insertAdjacentHTML("afterbegin", icon(n.dataset.icon)));

  document.addEventListener("click", (e) => {
    const viewBtn = e.target.closest("button[data-view]");
    if (viewBtn) showView(viewBtn.dataset.view);
  });

  $("#collapseBtn").addEventListener("click", () => {
    const collapsed = el.app.classList.toggle("collapsed");
    prefs.set({ collapsed });
  });
  $("#newBtn").addEventListener("click", newTranslation);
  $("#promoBtn").addEventListener("click", () => showView("packs"));
  $("#exportBtn").addEventListener("click", exportResult);

  document.querySelectorAll(".seg-btn").forEach((b) => b.addEventListener("click", () => {
    if (state.translating) stopTranslation();
    setEngine(b.dataset.engine);
    if (el.src.value.trim() && el.live.checked && (state.engine === "argos" || currentModel())) translateNow();
  }));

  el.pairs.addEventListener("click", (e) => {
    const b = e.target.closest("[data-from]");
    if (!b) return;
    if (state.engine !== "argos") setEngine("argos", { quiet: true });
    showView("translate");
    setPair(b.dataset.from, b.dataset.to);
  });
  el.chips.addEventListener("click", (e) => {
    const b = e.target.closest("[data-from]");
    if (b) onChip(b.dataset.from, b.dataset.to);
  });

  el.from.addEventListener("change", () => {
    if (state.engine === "argos") fillTargets([el.to.value]);
    pairChanged();
  });
  el.to.addEventListener("change", () => pairChanged());
  el.tone.addEventListener("change", () => pairChanged());
  el.live.addEventListener("change", () => prefs.set({ live: el.live.checked }));
  $("#swapBtn").addEventListener("click", swap);

  el.src.addEventListener("input", () => {
    updateCount();
    scheduleAuto();
  });
  el.src.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      translateNow();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && state.translating && state.engine === "ai") stopTranslation();
  });

  el.send.addEventListener("click", () => (state.translating && state.engine === "ai" ? stopTranslation() : translateNow()));
  $("#openBtn").addEventListener("click", openFile);
  $("#clearBtn").addEventListener("click", newTranslation);
  $("#copySrcBtn").addEventListener("click", () => copyText(state.result));
  $("#copyBtn").addEventListener("click", () => copyText(state.result));
  $("#saveBtn").addEventListener("click", exportResult);

  el.cards.addEventListener("click", (e) => {
    const card = e.target.closest("[data-action]");
    if (!card) return;
    if (card.dataset.action === "ai") setEngine("ai");
    if (card.dataset.action === "open") openFile();
    if (card.dataset.action === "packs") showView("packs");
  });

  // History
  el.historyList.addEventListener("click", async (e) => {
    const del = e.target.closest("[data-delete]");
    if (del) {
      e.stopPropagation();
      await api.delete_history(del.dataset.delete);
      return loadHistory();
    }
    const item = e.target.closest(".history-item");
    const entry = item && state.history.find((h) => h.id === item.dataset.id);
    if (entry) openHistory(entry);
  });
  el.historyList.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.classList.contains("history-item")) e.target.click();
  });
  $("#clearHistoryBtn").addEventListener("click", async () => {
    if (!state.history.length || !confirm("Delete all saved translations?")) return;
    await api.clear_history();
    loadHistory();
  });

  // AI engine
  $("#aiRefreshBtn").addEventListener("click", () => loadAi());
  el.aiList.addEventListener("click", (e) => {
    const use = e.target.closest("[data-use]");
    const del = e.target.closest("[data-delete-model]");
    const pull = e.target.closest("[data-pull]");
    const custom = e.target.closest("[data-pull-custom]");
    if (use) {
      prefs.set({ aiModel: use.dataset.use });
      updateAiDot();
      renderAi();
      toast(`Now translating with ${use.dataset.use}`);
    } else if (del) {
      const name = del.dataset.deleteModel;
      if (!confirm(`Remove ${name} from this PC?`)) return;
      runOp(el.aiStatus, () => api.ai_delete_model(name), `Removing ${name}…`, async (ai) => {
        state.ai = ai;
        updateAiDot();
      }, `Removed ${name}`);
    } else if (pull) {
      pullModel(pull.dataset.pull);
    } else if (custom) {
      const name = $("#customModel").value.trim();
      if (name) pullModel(name);
      else toast("Type a model name first.", true);
    }
  });

  // Language packs
  el.packSearch.addEventListener("input", renderPacks);
  $("#fetchBtn").addEventListener("click", () =>
    packOp(() => api.fetch_index(), "Downloading the list of available packs…", "Pack list updated"));
  $("#fileBtn").addEventListener("click", () =>
    packOp(() => api.install_from_files(), "Installing…", "Language pack installed"));
  el.packList.addEventListener("click", (e) => {
    const install = e.target.closest("[data-install]");
    const remove = e.target.closest("[data-remove]");
    const bundle = e.target.closest("[data-bundle]");
    if (bundle) {
      installBundle(FEATURED_BUNDLES.find((b) => b.a === bundle.dataset.bundle));
    } else if (install) {
      packOp(() => api.install_packs([install.dataset.install]), "Starting download…", "Language pack installed");
    } else if (remove && confirm("Remove this language pack?")) {
      packOp(() => api.remove_packs([remove.dataset.remove]), "Removing…", "Language pack removed");
    }
  });
}

// Called from Python (see Api._call_js).
window.lucifer = {
  progress(message) {
    if (state.busy) el.packStatus.innerHTML = `<span class="spinner"></span>${esc(message)}`;
  },
  aiProgress(message) {
    if (state.busy) el.aiStatus.innerHTML = `<span class="spinner"></span>${esc(message)}`;
  },
  stream(id, text) {
    if (id === state.reqId && state.translating && text) setResult(text);
  },
};

/* ---------- start-up ---------- */

let started = false;

async function start(backend) {
  if (started) return;
  started = true;
  api = backend;
  bindUI();
  const p = prefs.get();
  el.live.checked = p.live !== false;
  if (p.collapsed) el.app.classList.add("collapsed");
  updateCount();
  try {
    await loadLanguages();
  } catch (e) {
    toast(errText(e), true);
  }
  await loadAi(false);
  if (state.argosError) {
    // Standard engine failed to load (details in lucifer.log) - fall back to AI mode.
    setEngine("ai", { quiet: true });
    toast(`Standard engine unavailable (${state.argosError}). AI mode still works.`, true);
  } else {
    setEngine(p.engine === "ai" ? "ai" : "argos", { quiet: true });
  }
  if (state.engine === "argos" && !state.langs.length) {
    showView("packs");
    toast("Welcome! Install a language pack — or switch to AI mode.");
  } else {
    el.src.focus();
  }
}

if (/[?&]demo\b/.test(location.search)) {
  // Browser preview without Python: load a fake backend.
  const script = document.createElement("script");
  script.src = "demo.js";
  script.onload = () => start(window.createDemoApi());
  document.head.appendChild(script);
} else if (window.pywebview && window.pywebview.api) {
  start(window.pywebview.api);
} else {
  window.addEventListener("pywebviewready", () => start(window.pywebview.api), { once: true });
}
