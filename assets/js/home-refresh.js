(() => {
  const menuToggle = document.querySelector('.home-menu-toggle');
  const mobileNav = document.querySelector('.home-mobile-nav');
  const mobileLinks = document.querySelectorAll('.home-mobile-nav a');
  const trackedCallLinks = document.querySelectorAll('[data-track-call]');
  const trackedEstimateLinks = document.querySelectorAll('[data-track-estimate]');
  const projectTrack = document.querySelector('[data-project-track]');
  const projectPrev = document.querySelector('[data-project-prev]');
  const projectNext = document.querySelector('[data-project-next]');
  const lightbox = document.querySelector('[data-home-lightbox]');
  const lightboxImage = lightbox ? lightbox.querySelector('.home-lightbox__image') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.home-lightbox__close') : null;
  const form = document.querySelector('[data-home-form]');
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
        window.trackPhoneClick({ label: 'homepage_call' });
      }
    });
  });

  trackedEstimateLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.trackEstimateStart) {
        window.trackEstimateStart({ label: 'homepage_estimate' });
      }
    });
  });


  function scrollProjects(direction) {
    if (!projectTrack) {
      return;
    }

    const firstSlide = projectTrack.querySelector('.home-project-slide');
    const gap = 16;
    const distance = firstSlide ? firstSlide.getBoundingClientRect().width + gap : projectTrack.clientWidth * 0.9;
    projectTrack.scrollBy({
      left: distance * direction,
      behavior: 'smooth'
    });
  }

  function closeLightbox() {
    if (!lightbox || !lightboxImage) {
      return;
    }

    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    lightboxImage.alt = '';
    document.body.style.overflow = '';
  }

  function openLightbox(src, alt) {
    if (!lightbox || !lightboxImage) {
      return;
    }

    lightboxImage.src = src;
    lightboxImage.alt = alt || 'Project image';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  if (projectPrev) {
    projectPrev.addEventListener('click', () => scrollProjects(-1));
  }

  if (projectNext) {
    projectNext.addEventListener('click', () => scrollProjects(1));
  }

  if (projectTrack) {
    projectTrack.addEventListener('click', (event) => {
      const trigger = event.target.closest('[data-lightbox-src]');
      if (!trigger) {
        return;
      }

      openLightbox(trigger.getAttribute('data-lightbox-src'), trigger.getAttribute('data-lightbox-alt'));
    });
  }

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeLightbox();
      }
    });
  }

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
          window.trackLeadConversion({ source: 'homepage_form', leadType: 'quote_request' });
        }
      }
    } catch (error) {
      formStatus.innerHTML = '<div class="alert alert-error">Error processing request.</div>';
      formStatus.classList.add('is-visible');
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Request on-site quote';
      }
    }
  });
})();
