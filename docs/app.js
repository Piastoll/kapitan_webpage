/* Kapitan — app logic */
(function() {
  const D = window.KAPITAN_DATA;

  /* --------- inline SVG icon set (replaces emoji) ----------
     24x24, stroke=currentColor so they inherit the card colour. */
  const svg = p => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;
  const ICONS = {
    anchor:  svg('<circle cx="12" cy="5" r="2"/><path d="M12 7v13"/><path d="M5 12a7 7 0 0 0 14 0"/><path d="M5 12H3l1.5-2M19 12h2l-1.5-2"/>'),
    scooter: svg('<circle cx="6" cy="17" r="3"/><circle cx="18" cy="17" r="2"/><path d="M9 17h6.5"/><path d="M4 7h4l3.5 8"/><path d="M14 7h3l3 5v3h-2"/>'),
    bag:     svg('<path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8a3 3 0 0 1 6 0"/>'),
    cart:    svg('<circle cx="9" cy="20" r="1.3"/><circle cx="18" cy="20" r="1.3"/><path d="M3 4h2l2.3 11.2a1 1 0 0 0 1 .8h8.3a1 1 0 0 0 1-.8L20.5 8H6"/>'),
    star:    svg('<path d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 17l-5.3 2.6 1-5.8L3.5 9.7l5.9-.9z"/>'),
    flame:   svg('<path d="M12 3c.7 2.6 4.5 4 4.5 8a4.5 4.5 0 0 1-9 0c0-1.4.6-2.4 1.4-3.3.5 1 1.4 1.3 1.4 1.3.3-2.5-.3-4.6 .7-6z"/>'),
    badge:   svg('<circle cx="12" cy="12" r="9"/><path d="M8.5 12.2l2.3 2.3 4.7-4.7"/>'),
    heart:   svg('<path d="M12 20.3l-1.3-1.2C6 14.9 3.5 12.6 3.5 9.6 3.5 7.3 5.2 5.6 7.5 5.6c1.3 0 2.6.6 3.4 1.7l1.1 1.3 1.1-1.3c.8-1.1 2.1-1.7 3.4-1.7 2.3 0 4 1.7 4 4 0 3-2.5 5.3-7.2 9.5z"/>'),
  };
  const icon = key => ICONS[key] || key;   // unknown keys (e.g. "10") render as plain text

  /* --------- router ----------
     Single-page model: one brand visible at a time, switched by the
     sticky toggle. Burger is the default landing brand. */
  function route() {
    const hash = window.location.hash || "#burger";
    const active = hash.startsWith("#kebs") ? "kebs" : "burger";

    document.querySelectorAll(".page").forEach(p => {
      const on = p.id === active;
      p.classList.toggle("is-active", on);
      p.hidden = !on;
    });

    // expose active brand for shared, body-level themed components
    document.body.dataset.brand = active;

    // per-brand document title (helps tabs, bookmarks, share previews)
    document.title = active === "kebs"
      ? "Kapitan Kebs — Berlin Style · Jastrzębia Góra"
      : "Kapitan Burger — Street food · Jastrzębia Góra";

    // keep both toggles in sync (the hidden page's toggle too)
    document.querySelectorAll(".brand-toggle__opt").forEach(a => {
      a.classList.toggle("is-active", a.getAttribute("href") === "#" + active);
    });

    // scroll: if anchor like #burger-menu, scroll to section; else to top
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

  /* --------- render menu (kebs — single signature product) ---------- */
  const menuMountKebs = document.getElementById("menu-mount-kebs");
  if (menuMountKebs && D.menuKebs) {
    const m = D.menuKebs;
    menuMountKebs.innerHTML = `
      <article class="kebs-signature">
        <div class="kebs-signature__head">
          <div>
            <h3 class="kebs-signature__name">${m.name}</h3>
            <span class="kebs-signature__tag">${m.tag}</span>
          </div>
          <span class="kebs-signature__price">${m.price}</span>
        </div>
        <p class="kebs-signature__desc">${m.desc}</p>
        <div class="kebs-choice">
          <span class="kebs-choice__label">Pieczywo · do wyboru</span>
          <ul class="kebs-choice__opts">
            ${m.breads.map(b => `<li class="kebs-chip"><span>${b.name}</span><b>${b.price}</b></li>`).join('')}
          </ul>
        </div>
        <div class="kebs-choice">
          <span class="kebs-choice__label">Sosy autorskie · do wyboru</span>
          <ul class="kebs-choice__opts">
            ${m.sauces.map(s => `<li class="kebs-chip kebs-chip--sauce"><span class="kebs-chip__emoji">${s.emoji}</span><span>${s.name}</span></li>`).join('')}
          </ul>
        </div>
      </article>
    `;
  }

  /* --------- delivery cards ---------- */
  function renderDelivery(mountId) {
    const mount = document.getElementById(mountId);
    if (!mount) return;
    mount.innerHTML = D.delivery.map(card => `
      <article class="del-card ${card.lede ? 'del-card__lede' : ''}">
        <span class="del-card__num">${(D.delivery.indexOf(card)+1).toString().padStart(2,'0')}</span>
        <div class="del-card__icon">${icon(card.icon)}</div>
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
        <div class="del-card__icon">${ICONS.cart}</div>
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
        <span class="about-pillar__ico">${icon(p.ico)}</span>
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

  /* --------- open / closed status badge ---------- */
  const OPEN_HOUR = 12, CLOSE_HOUR = 22;   // "Codziennie 12:00–22:00"
  function renderStatus() {
    const els = document.querySelectorAll("[data-status]");
    if (!els.length) return;
    const now = new Date();
    const h = now.getHours() + now.getMinutes() / 60;
    const isOpen = h >= OPEN_HOUR && h < CLOSE_HOUR;
    const label = isOpen
      ? `Otwarte teraz · do ${CLOSE_HOUR}:00`
      : (h < OPEN_HOUR ? `Zamknięte · otwieramy ${OPEN_HOUR}:00`
                       : `Zamknięte · jutro od ${OPEN_HOUR}:00`);
    els.forEach(el => {
      el.className = "hero__status " + (isOpen ? "is-open" : "is-closed");
      el.innerHTML = `<span class="dot"></span><span>${label}</span>`;
    });
  }
  renderStatus();
  setInterval(renderStatus, 60000);

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
