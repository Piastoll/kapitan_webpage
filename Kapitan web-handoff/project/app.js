/* Kapitan — app logic */
(function() {
  const D = window.KAPITAN_DATA;

  /* --------- router ---------- */
  const pages = {
    "": "landing",
    "#": "landing",
    "#landing": "landing",
    "#burger": "burger",
    "#kebs": "kebs"
  };
  function route() {
    const hash = window.location.hash || "#landing";
    // section anchors inside pages
    const root = hash.split("-")[0];
    let active = pages[root] || "landing";
    // if hash is "#burger-menu" type, treat root as burger/kebs
    if (hash.startsWith("#burger")) active = "burger";
    else if (hash.startsWith("#kebs")) active = "kebs";
    else active = pages[hash] || "landing";

    document.querySelectorAll(".page").forEach(p => {
      const on = p.id === active;
      p.classList.toggle("is-active", on);
      if (on) { p.hidden = false; } else { p.hidden = true; }
    });

    // scroll: if anchor like #burger-menu, scroll to section
    if (hash.includes("-")) {
      requestAnimationFrame(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
    closeDrawer();
  }
  window.addEventListener("hashchange", route);

  /* --------- drawer ---------- */
  const drawer = document.getElementById("drawer");
  const scrim = document.querySelector(".drawer__scrim");
  function openDrawer() {
    drawer.classList.add("is-open");
    scrim.classList.add("is-open");
    drawer.setAttribute("aria-hidden", "false");
  }
  function closeDrawer() {
    drawer.classList.remove("is-open");
    scrim.classList.remove("is-open");
    drawer.setAttribute("aria-hidden", "true");
  }
  document.querySelectorAll("[data-drawer-open]").forEach(b => b.addEventListener("click", openDrawer));
  document.querySelectorAll("[data-drawer-close]").forEach(b => b.addEventListener("click", closeDrawer));
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeDrawer(); });

  /* --------- render menu (burger) ---------- */
  const menuMount = document.getElementById("menu-mount");
  if (menuMount) {
    menuMount.innerHTML = D.menuBurger.map(cat => `
      <section class="menu-cat ${cat.compact ? 'menu-cat--compact' : ''}">
        <div class="menu-cat__head">
          <h3 class="menu-cat__title">${cat.title}</h3>
          <span class="menu-cat__tag">${cat.tag}</span>
        </div>
        <ul class="menu-list">
          ${cat.items.map(it => `
            <li class="menu-item ${cat.compact ? 'menu-item--simple' : ''}">
              <span class="menu-item__name">${it.name}</span>
              <span class="menu-item__price">${it.price}</span>
              ${it.desc ? `<span class="menu-item__desc">${it.desc}</span>` : ''}
            </li>
          `).join('')}
        </ul>
      </section>
    `).join('');
  }

  /* --------- delivery cards ---------- */
  function renderDelivery(mountId) {
    const mount = document.getElementById(mountId);
    if (!mount) return;
    mount.innerHTML = D.delivery.map(card => `
      <article class="del-card ${card.lede ? 'del-card__lede' : ''}">
        <span class="del-card__num">${(D.delivery.indexOf(card)+1).toString().padStart(2,'0')}</span>
        <div class="del-card__icon">${card.icon}</div>
        <h3>${card.title}</h3>
        <p>${card.body}</p>
        ${card.meta.length ? `
          <ul class="del-card__meta">
            ${card.meta.map(m => `<li><span>${m.k}</span><b>${m.v}</b></li>`).join('')}
          </ul>` : ''}
        ${card.cta ? `<a class="del-card__cta" href="${card.cta.href}">${card.cta.label} →</a>` : ''}
      </article>
    `).join('');

    // Pyszne.pl card injected at the end
    mount.innerHTML += `
      <article class="del-card">
        <span class="del-card__num">04</span>
        <div class="del-card__icon">▶</div>
        <h3>Zamów przez Pyszne.pl</h3>
        <p>Wolisz klikać zamiast gadać? Żaden problem. Znajdziesz nas w aplikacji Pyszne.pl — kilka ruchów palcem i Kapitan płynie do Ciebie z zestawem.</p>
        <a class="del-card__cta" href="${D.shared.social.pyszne}" target="_blank" rel="noopener">Otwórz Pyszne.pl →</a>
      </article>`;
  }
  renderDelivery("delivery-mount");
  renderDelivery("delivery-mount-kebs");

  /* --------- pillars ---------- */
  function renderPillars(mountId) {
    const mount = document.getElementById(mountId);
    if (!mount) return;
    mount.innerHTML = D.pillars.map(p => `
      <li class="about-pillar">
        <span class="about-pillar__ico">${p.ico}</span>
        <div>
          <h4>${p.title}</h4>
          <p>${p.body}</p>
        </div>
      </li>
    `).join('');
  }
  renderPillars("about-mount");
  renderPillars("about-mount-kebs");

  /* --------- contact card ---------- */
  function renderContact(mountId, brand) {
    const mount = document.getElementById(mountId);
    if (!mount) return;
    const data = D[brand];
    mount.innerHTML = `
      <h3>${brand === 'burger' ? 'Kapitan Burger' : 'Kapitan Kebs'}</h3>
      <ul class="contact__list">
        <li>
          <span class="ico">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          </span>
          <div><span class="lbl">Adres</span><span class="val">${data.address}</span></div>
        </li>
        <li>
          <span class="ico">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 14"/></svg>
          </span>
          <div><span class="lbl">Godziny otwarcia</span><span class="val">${data.hours}</span></div>
        </li>
        <li>
          <span class="ico">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13 1 .37 1.96.72 2.88a2 2 0 0 1-.45 2.11L8.09 10.09a16 16 0 0 0 6 6l1.38-1.38a2 2 0 0 1 2.11-.45c.92.35 1.88.59 2.88.72A2 2 0 0 1 22 16.92z"/></svg>
          </span>
          <div><span class="lbl">Telefon · zamówienia</span><span class="val"><a href="tel:${data.phone.replace(/\s/g,'')}">${data.phone}</a></span></div>
        </li>
        <li>
          <span class="ico">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
          </span>
          <div><span class="lbl">E-mail</span><span class="val"><a href="mailto:${D.shared.email}">${D.shared.email}</a></span></div>
        </li>
      </ul>
    `;
  }
  renderContact("contact-mount-burger", "burger");
  renderContact("contact-mount-kebs", "kebs");

  /* --------- drawer links ---------- */
  function buildDrawer() {
    const linksEl = document.getElementById("drawer-links");
    // figure out which brand is active
    const activePage = document.querySelector(".page.is-active");
    const brand = activePage && activePage.id === "kebs" ? "kebs" : "burger";
    linksEl.innerHTML = D.navLinks.map(l => `
      <li><a href="#${brand}-${l.id}"><span>${l.label}</span><span class="num">${l.num}</span></a></li>
    `).join('');
    // close drawer + smooth nav on click
    linksEl.querySelectorAll("a").forEach(a => a.addEventListener("click", e => {
      // allow hashchange to run
      setTimeout(closeDrawer, 50);
    }));
  }
  // rebuild drawer each open so brand context is right
  document.querySelectorAll("[data-drawer-open]").forEach(b => b.addEventListener("click", buildDrawer));
  buildDrawer();

  /* --------- intersection reveal ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".section, .hero__inner > *").forEach(el => {
    el.classList.add("reveal");
    io.observe(el);
  });

  /* --------- initial route ---------- */
  route();
})();
