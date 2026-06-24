// Earth Retreat Foundation — shared scripts

// Mobile menu
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', navLinks.classList.contains('open'));
  });
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

// Rotating hero phrases (home page)
const rotator = document.querySelector('[data-rotate]');
if (rotator) {
  const phrases = JSON.parse(rotator.dataset.rotate);
  let i = 0;
  const renderPhrase = () => {
    rotator.textContent = window.ERFI18n ? window.ERFI18n.translate(phrases[i]) : phrases[i];
  };
  document.addEventListener('erf:languagechange', renderPhrase);
  renderPhrase();
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced && phrases.length > 1) {
    setInterval(() => {
      i = (i + 1) % phrases.length;
      rotator.style.opacity = 0;
      setTimeout(() => {
        renderPhrase();
        rotator.style.opacity = 1;
      }, 350);
    }, 4200);
    rotator.style.transition = 'opacity .35s ease';
  }
}

// Scroll reveal
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Animated counters in stats band
const counters = document.querySelectorAll('[data-count]');
const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const dur = 1200;
    const start = performance.now();
    const step = now => {
      const p = Math.min((now - start) / dur, 1);
      el.textContent = Math.round(target * p) + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    countObs.unobserve(el);
  });
}, { threshold: 0.4 });
counters.forEach(el => countObs.observe(el));

// Contact form (front-end only)
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const note = document.querySelector('#form-note');
    note.textContent = 'Thank you — your message has been recorded. Connect this form to your email or backend to receive submissions.';
    note.style.color = '#3E7C59';
    form.reset();
  });
}
