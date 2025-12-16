(() => {
  const sidebar = document.getElementById("sidebar");
  const menuBtn = document.getElementById("menuBtn");
  const closeBtn = document.getElementById("closeBtn");
  const progressBar = document.getElementById("progressBar");
  const navLinks = Array.from(document.querySelectorAll(".nav a"));
  const sections = navLinks
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const open = () => sidebar?.classList.add("open");
  const close = () => sidebar?.classList.remove("open");

  menuBtn?.addEventListener("click", open);
  closeBtn?.addEventListener("click", close);
  navLinks.forEach(a => a.addEventListener("click", () => close()));

  // Close when clicking outside on mobile
  document.addEventListener("click", (e) => {
    const isMobile = window.matchMedia("(max-width: 980px)").matches;
    if (!isMobile) return;
    if (!sidebar?.classList.contains("open")) return;
    const inside = sidebar.contains(e.target) || menuBtn?.contains(e.target);
    if (!inside) close();
  });

  // Active section highlighting
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const id = "#" + entry.target.id;
      navLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === id));
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 });

  sections.forEach(sec => obs.observe(sec));

  // Scroll progress
  const onScroll = () => {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct.toFixed(1) + "%";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();