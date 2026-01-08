document.addEventListener("click", (e) => {
  const copyBtn = e.target.closest(".highlight_copy");
  if (!copyBtn) return;

  const wrapper = copyBtn.closest(".highlight_wrap");
  if (!wrapper) return;

  // Prefer <code>, fallback to <pre> (Chroma-safe)
  const codeEl =
    wrapper.querySelector("pre code") ||
    wrapper.querySelector("pre");

  if (!codeEl) return;

  const text = codeEl.innerText;

  navigator.clipboard.writeText(text).then(() => {
    // Visual feedback
    copyBtn.classList.add("copied");

    // Accessibility feedback (screen readers)
    let live = copyBtn.querySelector('[aria-live]');
    if (!live) {
      live = document.createElement("span");
      live.className = "visually-hidden";
      live.setAttribute("aria-live", "polite");
      live.textContent = "Copied to clipboard";
      copyBtn.appendChild(live);
    } else {
      // retrigger announcement
      live.textContent = "";
      requestAnimationFrame(() => {
        live.textContent = "Copied to clipboard";
      });
    }

    // Reset visual state
    setTimeout(() => {
      copyBtn.classList.remove("copied");
    }, 1200);
  });
});
