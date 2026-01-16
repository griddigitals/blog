(() => {
  const qs = sel => document.querySelector(sel);
  const qsa = sel => Array.from(document.querySelectorAll(sel));
  const body = document.body;

  // -----------------------------
  // HELPERS
  // -----------------------------
  function preventScroll(toggle) {
    body.classList.toggle('no-scroll', toggle);
  }

  function resetDropdowns(container) {
    container.querySelectorAll('.dropdown').forEach(d => {
      d.classList.remove('open');

      const header = d.querySelector('.dropdown-header');
      header?.classList.remove('active');

      const arrow = d.querySelector('.arrow-btn');
      if (arrow) arrow.textContent = '▶';

      const content = d.querySelector('.dropdown-content');
      if (content) content.style.display = 'none';
    });
  }

  // -----------------------------
  // MOBILE NAV
  // -----------------------------
  const hamburger = qs('#hamburger');
  const mobileClose = qs('#mobileClose');
  const mobileMenu = qs('#mobileMenu');
  const mainPanel = qs('.main-panel');
  const nestedPanels = qsa('.nested-panel');
  const mobileLinks = qsa('.mobile-link');
  const backButtons = qsa('.back-btn');
  const panelCloseBtns = qsa('.panel-close');

  function resetAllPanels() {
    mobileMenu?.setAttribute('aria-hidden', 'true');
    mobileMenu?.classList.remove('open');
    hamburger?.setAttribute('aria-expanded', 'false');
    preventScroll(false);

    mainPanel?.classList.remove('active');

    nestedPanels.forEach(p => {
      p.classList.remove('active');
      p.setAttribute('aria-hidden', 'true');
      resetDropdowns(p);
    });
  }

  function openMobileMenu() {
    mobileMenu?.setAttribute('aria-hidden', 'false');
    mobileMenu?.classList.add('open');
    hamburger?.setAttribute('aria-expanded', 'true');
    preventScroll(true);

    mainPanel?.classList.add('active');

    nestedPanels.forEach(p => {
      p.classList.remove('active');
      p.setAttribute('aria-hidden', 'true');
      resetDropdowns(p);
    });
  }

  hamburger?.addEventListener('click', openMobileMenu);
  mobileClose?.addEventListener('click', resetAllPanels);

  mobileMenu?.addEventListener('click', e => {
    if (e.target === mobileMenu) resetAllPanels();
  });

  mobileLinks.forEach(link => {
    const targetId = link.dataset.target;
    if (!targetId) return;

    const panel = qs(`#${targetId}`);

    link.addEventListener('click', e => {
      e.preventDefault();
      mainPanel?.classList.remove('active');
      panel?.classList.add('active');
      panel?.setAttribute('aria-hidden', 'false');
      if (panel) resetDropdowns(panel);
    });

    const arrowBtn = link.querySelector('.arrow-btn');
    arrowBtn?.addEventListener('click', e => {
      e.preventDefault();
      link.click();
    });
  });

  backButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const panel = btn.closest('.nested-panel');
      if (!panel) return;

      resetDropdowns(panel);
      panel.classList.remove('active');
      panel.setAttribute('aria-hidden', 'true');
      mainPanel?.classList.add('active');
    });
  });

  panelCloseBtns.forEach(btn =>
    btn.addEventListener('click', resetAllPanels)
  );

  nestedPanels.forEach(panel => {
    panel.querySelectorAll('.dropdown-header').forEach(header => {
      const dropdown = header.closest('.dropdown');
      const arrow = header.querySelector('.arrow-btn');

      header.addEventListener('click', () => {
        const isOpen = dropdown.classList.contains('open');
        resetDropdowns(panel);

        if (!isOpen) {
          dropdown.classList.add('open');
          header.classList.add('active');
          if (arrow) arrow.textContent = '▼';

          const content = dropdown.querySelector('.dropdown-content');
          if (content) content.style.display = 'flex';
        }
      });
    });
  });

  // -----------------------------
  // RESPONSIVE CLEANUP
  // -----------------------------
  let lastIsMobile = window.innerWidth < 900;
  window.addEventListener('resize', () => {
    const isMobile = window.innerWidth < 900;
    if (lastIsMobile && !isMobile) resetAllPanels();
    lastIsMobile = isMobile;
  });

  // -----------------------------
  // DESKTOP NAV (MEGA PANELS)
  // -----------------------------
  const navItems = qsa('.nav-item');

  navItems.forEach(item => {
    item.setAttribute('aria-expanded', 'false');

    const label = item.querySelector('.nav-label');
    const arrow = item.querySelector('.arrow');
    const panelId = item.dataset.panel;
    const panel = panelId
      ? qs(`#${panelId}`)
      : item.querySelector('.mega-panel');

    function closePanel() {
      item.classList.remove('active');
      item.setAttribute('aria-expanded', 'false');
      panel?.setAttribute('aria-hidden', 'true');
    }

    function openPanel() {
      navItems.forEach(n => {
        n.classList.remove('active');
        n.setAttribute('aria-expanded', 'false');

        const pid = n.dataset.panel;
        const p = pid
          ? qs(`#${pid}`)
          : n.querySelector('.mega-panel');

        p?.setAttribute('aria-hidden', 'true');
      });

      item.classList.add('active');
      item.setAttribute('aria-expanded', 'true');
      panel?.setAttribute('aria-hidden', 'false');
    }

    label?.addEventListener('click', e => {
      e.stopPropagation();
      item.classList.contains('active') ? closePanel() : openPanel();
    });

    arrow?.addEventListener('click', e => {
      e.stopPropagation();
      item.classList.contains('active') ? closePanel() : openPanel();
    });
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.nav-glass')) {
      navItems.forEach(item => {
        item.classList.remove('active');
        item.setAttribute('aria-expanded', 'false');

        const pid = item.dataset.panel;
        const panel = pid
          ? qs(`#${pid}`)
          : item.querySelector('.mega-panel');

        panel?.setAttribute('aria-hidden', 'true');
      });
    }
  });

  // -----------------------------
  // GLOBAL ESC (NAV ONLY)
  // -----------------------------
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      resetAllPanels();

      navItems.forEach(item => {
        item.classList.remove('active');
        item.setAttribute('aria-expanded', 'false');

        const pid = item.dataset.panel;
        const panel = pid
          ? qs(`#${pid}`)
          : item.querySelector('.mega-panel');

        panel?.setAttribute('aria-hidden', 'true');
      });
    }
  });

})();
