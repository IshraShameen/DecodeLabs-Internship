// =============================================================
// Blueprint Studio — basic state management & interactivity
// Vanilla JS only, no frameworks.
// =============================================================

document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initMobileNav();
  initWorkFilter();
  initContactForm();
});

/** Footer year, always current. */
function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

/** Mobile navigation toggle — accessible open/close state. */
function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu after a nav link is chosen (mobile).
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/** Filter project cards by category — simple client-side state. */
function initWorkFilter() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.work-card');
  const emptyState = document.getElementById('empty-state');
  if (!buttons.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      const filter = btn.dataset.filter;
      let visibleCount = 0;

      cards.forEach((card) => {
        const match = filter === 'all' || card.dataset.category === filter;
        card.hidden = !match;
        if (match) visibleCount += 1;
      });

      if (emptyState) emptyState.hidden = visibleCount !== 0;
    });
  });
}

/** Contact form — inline validation, no page reload, no backend call. */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const status = document.getElementById('form-status');
  const fields = [
    { input: form.name, errorId: 'name-error', message: 'Please enter your name.' },
    { input: form.email, errorId: 'email-error', message: 'Please enter a valid email address.' },
    { input: form.message, errorId: 'message-error', message: 'Tell me a little about the project.' },
  ];

  fields.forEach(({ input }) => {
    input.addEventListener('blur', () => {
      input.dataset.touched = 'true';
      validateField(input);
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    let isValid = true;

    fields.forEach(({ input }) => {
      input.dataset.touched = 'true';
      if (!validateField(input)) isValid = false;
    });

    if (!isValid) {
      status.textContent = 'Please fix the highlighted fields before sending.';
      status.style.color = '#B3453A';
      return;
    }

    // No backend is wired up yet — this simulates a successful send.
    status.style.color = '';
    status.textContent = `Thanks, ${form.name.value.trim()}! Your message is ready to send — connect this form to your backend or a form service to deliver it.`;
    form.reset();
    fields.forEach(({ input, errorId }) => {
      delete input.dataset.touched;
      document.getElementById(errorId).textContent = '';
    });
  });

  function validateField(input) {
    const errorEl = document.getElementById(`${input.id}-error`);
    const valid = input.checkValidity();
    if (errorEl) {
      errorEl.textContent = valid ? '' : fields.find((f) => f.input === input).message;
    }
    return valid;
  }
}
