(() => {
  const menuToggle = document.querySelector('.home-menu-toggle');
  const mobileNav = document.querySelector('.home-mobile-nav');
  const mobileLinks = document.querySelectorAll('.home-mobile-nav a');
  const trackedCallLinks = document.querySelectorAll('[data-track-call]');
  const trackedEstimateLinks = document.querySelectorAll('[data-track-estimate]');
  const form = document.querySelector('[data-contact-form]');
  const formStatus = document.querySelector('.home-form__status');

  function setMenuOpen(isOpen) {
    if (!menuToggle || !mobileNav) {
      return;
    }

    menuToggle.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    mobileNav.hidden = !isOpen;
    mobileNav.classList.toggle('is-open', isOpen);
  }

  if (menuToggle && mobileNav) {
    setMenuOpen(false);

    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      setMenuOpen(!isOpen);
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => setMenuOpen(false));
    });
  }

  trackedCallLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.trackPhoneClick) {
        window.trackPhoneClick({ label: 'contact_call' });
      }
    });
  });

  trackedEstimateLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.trackEstimateStart) {
        window.trackEstimateStart({ label: 'contact_estimate' });
      }
    });
  });

  if (!form || !formStatus) {
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    const payload = new URLSearchParams();
    const spamGuard = window.formSpamGuard;

    if (spamGuard && spamGuard.formDataHasLink(formData)) {
      formStatus.innerHTML = spamGuard.quietSuccessHtml();
      formStatus.classList.add('is-visible');
      formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      form.reset();
      return;
    }

    formData.forEach((value, key) => {
      payload.append(key, value instanceof File ? value.name : String(value));
    });

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: payload.toString()
      });

      const html = await response.text();
      formStatus.innerHTML = html;
      formStatus.classList.add('is-visible');
      formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      if (/alert-success|Email Sent Successfully/i.test(html)) {
        form.reset();
        if (window.trackLeadConversion) {
          window.trackLeadConversion({ source: 'contact_form', leadType: 'quote_request' });
        }
      }
    } catch (error) {
      formStatus.innerHTML = '<div class="alert alert-error">Error processing request.</div>';
      formStatus.classList.add('is-visible');
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Send quote request';
      }
    }
  });
})();
