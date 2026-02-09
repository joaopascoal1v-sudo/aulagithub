(function () {
  const root = document.documentElement;
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menu mobile
  const menuBtn = document.querySelector("[data-menu='toggle']");
  const menu = document.getElementById("menu");
  function setMenu(open) {
    if (!menuBtn || !menu) return;
    menu.classList.toggle("is-open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
  }
  menuBtn?.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  document.addEventListener("click", (e) => {
    if (!menu || !menuBtn) return;
    const within = menu.contains(e.target) || menuBtn.contains(e.target);
    if (!within) setMenu(false);
  });

  // Contraste
  const savedContrast = localStorage.getItem("contrast");
  if (savedContrast === "on") root.dataset.contrast = "on";
  document.querySelector("[data-contrast='toggle']")?.addEventListener("click", () => {
    const on = root.dataset.contrast === "on";
    root.dataset.contrast = on ? "off" : "on";
    localStorage.setItem("contrast", on ? "off" : "on");
  });

  // Tamanho da fonte (escala)
  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
  const savedScale = parseFloat(localStorage.getItem("fontScale") || "1");
  root.style.setProperty("--fontScale", String(clamp(savedScale, 0.9, 1.25)));

  document.querySelector("[data-font='inc']")?.addEventListener("click", () => {
    const current = parseFloat(getComputedStyle(root).getPropertyValue("--fontScale")) || 1;
    const next = clamp(current + 0.05, 0.9, 1.25);
    root.style.setProperty("--fontScale", String(next));
    localStorage.setItem("fontScale", String(next));
  });

  document.querySelector("[data-font='dec']")?.addEventListener("click", () => {
    const current = parseFloat(getComputedStyle(root).getPropertyValue("--fontScale")) || 1;
    const next = clamp(current - 0.05, 0.9, 1.25);
    root.style.setProperty("--fontScale", String(next));
    localStorage.setItem("fontScale", String(next));
  });
})();
