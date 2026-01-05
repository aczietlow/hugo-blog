const doc = document.documentElement;
const bank = window.localStorage;

(function initColorModes() {
  "use strict";

  const LIGHT = "lit";
  const DARK = "dim";
  const STORAGE_KEY = "colorMode";
  const CSS_VAR = "--color-mode";
  const DATA_ATTR = "data-mode";


  function readCssMode() {

    const raw = getComputedStyle(doc).getPropertyValue(CSS_VAR) || "";
    const mode = raw.replace(/"/g, "").trim();
    return mode === LIGHT || mode === DARK ? mode : "";
  }

  function getCurrentMode() {
    const attr = doc.getAttribute(DATA_ATTR);
    if (attr === LIGHT || attr === DARK) return attr;

    const stored = bank.getItem(STORAGE_KEY);
    if (stored === LIGHT || stored === DARK) return stored;

    const css = readCssMode();
    if (css) return css;

    return LIGHT;
  }

  function setMode(mode) {
    if (mode !== LIGHT && mode !== DARK) return;
    doc.setAttribute(DATA_ATTR, mode);
    bank.setItem(STORAGE_KEY, mode);
  }

  function toggleMode() {
    const current = getCurrentMode();
    const next = current === DARK ? LIGHT : DARK;
    setMode(next);
    return next;
  }

  // Apply initial mode from storage (if present) or CSS fallback
  setMode(getCurrentMode());

  document.addEventListener("click", (event) => {
    const toggleEl = event.target?.closest?.(".color_choice");
    if (!toggleEl) return;

    toggleEl.classList.add("color_animate");
    toggleMode();
  });
})();
