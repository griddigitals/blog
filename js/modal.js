(() => {
  const qs = sel => document.querySelector(sel);
  const qsa = sel => Array.from(document.querySelectorAll(sel));
  const body = document.body;

  let lastFocusedElement = null;

  function lockScroll(lock) {
    body.classList.toggle('no-scroll', lock);
  }

  function openModal(modal, focusEl = null) {
    if (!modal) return;
    lastFocusedElement = document.activeElement;

    modal.classList.add('active', 'show');
    modal.setAttribute('aria-hidden', 'false');
    lockScroll(true);

    if (focusEl) {
      setTimeout(() => focusEl.focus(), 150);
    }
  }

  function closeModal(modal) {
    if (!modal) return;

    modal.classList.remove('active', 'show');
    modal.setAttribute('aria-hidden', 'true');
    lockScroll(false);

    if (lastFocusedElement) lastFocusedElement.focus();
  }

  // --------------------------------
  // SUBSCRIBE MODAL
  // --------------------------------
  const subscribeModal = qs('#subscribeModal');
  const subscribeBtns = qsa('.subscribeBtn');
  const subscribeClose = subscribeModal?.querySelector('.modal-close');
  const submitBtn = qs('#subscribeSubmit');
  const emailInput = qs('#subscriberEmail');
  const message = qs('#subscribeMessage');

  subscribeBtns.forEach(btn =>
    btn.addEventListener('click', e => {
      e.preventDefault();
      openModal(subscribeModal, emailInput);
    })
  );

  subscribeClose?.addEventListener('click', () =>
    closeModal(subscribeModal)
  );

  submitBtn?.addEventListener('click', e => {
    e.preventDefault();
    const email = (emailInput?.value || '').trim();

    if (!email || !email.includes('@')) {
      message.textContent = 'Please enter a valid email!';
      message.style.display = 'block';
      return;
    }

    const formData = new FormData();
    formData.append("EMAIL", email);
    formData.append("email_address_check", "");
    formData.append("locale", "en");

    fetch(
      "https://7995bb68.sibforms.com/serve/MUIFANhYqUAM29foTZSrjHsQL0EfpClGluEYE5dBQrFVbDHjJkJUD4HADExbEqdmiXGTznqt3unvuHsIL8dm8R9_HE0iBNOgXeXsSkfQbDDf7hwjw7hz74321OMut-kJJfZe-s7y_XdvblduxhFKsJymUDRXyxv3CIkbeEtR1HYQNAu9tMjw07L-60S8g5eekJEWzDho7V9QJmxikw==",
      { method: "POST", body: formData, mode: "no-cors" }
    )
      .then(() => {
        message.textContent =
          "Thanks for subscribing! You’re now part of Grid Digitals.";
        message.style.display = 'block';
        emailInput.value = '';
        setTimeout(() => closeModal(subscribeModal), 2000);
      })
      .catch(() => {
        message.textContent = "Something went wrong. Please try again.";
        message.style.display = 'block';
      });
  });

  // --------------------------------
  // DONATION MODAL
  // --------------------------------
  const donationModal = qs('#donationModal');
  const openDonation = qs('#openDonationModal');
  const closeDonation = qs('#closeDonationModal');

  openDonation?.addEventListener('click', () =>
    openModal(donationModal)
  );
  closeDonation?.addEventListener('click', () =>
    closeModal(donationModal)
  );

  // --------------------------------
  // COMING SOON MODAL
  // --------------------------------
  const comingSoonModal = qs('#comingSoonPopup');
  const comingSoonClose = qs('.popup-close');
  const comingSoonTriggers = qsa(
    '.category-pill, .coming-soon-trigger'
  );

  comingSoonTriggers.forEach(t =>
    t.addEventListener('click', e => {
      e.preventDefault();
      openModal(comingSoonModal);
    })
  );

  comingSoonClose?.addEventListener('click', () =>
    closeModal(comingSoonModal)
  );

  // --------------------------------
  // OVERLAY + ESC (GLOBAL MODAL HANDLING)
  // --------------------------------
  document.addEventListener('click', e => {
    qsa('.modal, .popup').forEach(modal => {
      if (e.target === modal) closeModal(modal);
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      qsa('.modal.active, .popup.show').forEach(closeModal);
    }
  });
})();
