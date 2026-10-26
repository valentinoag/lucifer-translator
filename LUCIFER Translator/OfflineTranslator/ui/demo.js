"use strict";

// Fake backend for previewing the UI in a normal browser (open index.html?demo).
// The real app uses translator.py through pywebview instead.
window.createDemoApi = function createDemoApi() {
  const names = { en: "English", es: "Spanish", fr: "French", de: "German", ja: "Japanese", it: "Italian", ko: "Korean", pt: "Portuguese", zh: "Chinese", ar: "Arabic" };
  const sampleText = /long time|好久不见|منذ زمن/i;
  const installed = new Set(["en->es", "es->en", "en->fr", "fr->en", "en->de", "en->ja"]);
  let indexLoaded = false;
  let cancelledUpTo = 0;
  let history = [];
  const ai = { running: true, version: "0.12.6", models: [{ name: "gemma3:4b", size: 3.3e9, params: "4.3B" }] };
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  const samples = {
    standard: { es: "¡Oye! Tiempo largo sin ver. ¿Cómo has estado? Vamos a agarrar café este fin de semana si eres libre." },
    ai: {
      Spanish: "¡Hola! ¡Cuánto tiempo sin vernos! ¿Qué tal te ha ido? Si estás libre este finde, vamos por un café.",
      Japanese: "久しぶり！元気にしてた？今週末ひまだったら、コーヒーでも飲みに行かない？",
      French: "Salut ! Ça fait une éternité ! Comment tu vas ? Si t'es dispo ce week-end, on se prend un café ?",
      Arabic: "أهلًا! لم أرك منذ زمن طويل، كيف حالك؟ إن كنت متفرغًا في عطلة نهاية الأسبوع، فلنشرب القهوة معًا.",
      "Chinese (Simplified)": "嘿！好久不见，最近怎么样？这周末有空的话，一起喝杯咖啡吧。",
    },
  };

  function languages() {
    const pairs = [...installed].map((k) => k.split("->")).sort();
    const codes = new Set(pairs.flat());
    const direct = (code) => pairs.filter(([f]) => f === code).map(([, t]) => t);
    const langs = [...codes].map((code) => {
      const targets = new Set(direct(code));
      if (code !== "en" && targets.has("en")) direct("en").forEach((t) => t !== code && targets.add(t)); // pivot via English
      return { code, name: names[code], targets: [...targets].sort() };
    }).sort((a, b) => a.name.localeCompare(b.name));
    return { languages: langs, pairs };
  }

  function packs() {
    const keys = new Set(installed);
    if (indexLoaded) Object.keys(names).filter((c) => c !== "en").forEach((c) => { keys.add(`en->${c}`); keys.add(`${c}->en`); });
    return [...keys].map((key) => {
      const [f, t] = key.split("->");
      return { key, from_code: f, to_code: t, from_name: names[f], to_name: names[t], version: "1.9", installed: installed.has(key) };
    }).sort((a, b) => (b.installed - a.installed) || a.from_name.localeCompare(b.from_name) || a.to_name.localeCompare(b.to_name));
  }

  return {
    async get_languages() { return languages(); },
    async translate(text, from, to) {
      await wait(250);
      return samples.standard[to] && sampleText.test(text) ? samples.standard[to] : `[${names[to]}] ${text}`;
    },
    async cancel_translation(id) { cancelledUpTo = Math.max(cancelledUpTo, id); },
    async ai_status() { return JSON.parse(JSON.stringify(ai)); },
    async ai_translate(text, from, to, tone, model, id) {
      const full = (sampleText.test(text) && samples.ai[to]) || `(${to}, ${tone}) ${text}`;
      await wait(400);
      for (let i = 1; i <= full.length; i += 3) {
        if (id <= cancelledUpTo) return null;
        window.lucifer.stream(id, full.slice(0, i));
        await wait(35);
      }
      return full;
    },
    async ai_pull_model(name) {
      for (let p = 0; p <= 100; p += 20) { window.lucifer.aiProgress(`Downloading ${name} - ${p}% of 3.3 GB`); await wait(300); }
      ai.models.push({ name, size: 3.3e9, params: "" });
      return JSON.parse(JSON.stringify(ai));
    },
    async ai_delete_model(name) { ai.models = ai.models.filter((m) => m.name !== name); return JSON.parse(JSON.stringify(ai)); },
    async get_history() { return history; },
    async save_history(entry) { history = [entry, ...history.filter((h) => h.id !== entry.id)]; },
    async delete_history(id) { history = history.filter((h) => h.id !== id); },
    async clear_history() { history = []; },
    async list_packs() { return packs(); },
    async fetch_index() { await wait(600); indexLoaded = true; return packs(); },
    async install_packs(keys) {
      for (const key of keys) { window.lucifer.progress(`Downloading ${key}…`); await wait(700); installed.add(key); }
      return packs();
    },
    async install_pair(a, b) {
      indexLoaded = true;
      for (const key of [`${a}->en`, `en->${b}`, `${b}->en`, `en->${a}`]) {
        if (installed.has(key)) continue;
        window.lucifer.progress(`Downloading ${names[key.split("->")[0]]} → ${names[key.split("->")[1]]}…`);
        await wait(500);
        installed.add(key);
      }
      return packs();
    },
    async install_from_files() { return null; },
    async remove_packs(keys) { keys.forEach((k) => installed.delete(k)); return packs(); },
    async open_text_file() { return { name: "note.txt", text: "Hey! Long time no see — how have you been?\n\nLet's grab coffee this weekend if you're free." }; },
    async save_text() { return "translation.txt"; },
  };
};
