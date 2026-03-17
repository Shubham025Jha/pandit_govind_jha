// ── HAMBURGER MENU ──
function toggleMenu() {
  document.getElementById('nav-links')?.classList.toggle('open');
}

// Expose for inline onclick handlers (existing markup)
window.toggleMenu = toggleMenu;

// Close menu on nav click
document.querySelectorAll('.nav-links a').forEach((a) => {
  a.addEventListener('click', () => {
    document.getElementById('nav-links')?.classList.remove('open');
  });
});

// ── SCROLL ANIMATIONS ──
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  },
  { threshold: 0.1 },
);

document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

// ── ACTIVE NAV HIGHLIGHT ON SCROLL ──
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((s) => {
    if (window.scrollY >= s.offsetTop - 80) current = s.id;
  });
  document.querySelectorAll('.nav-links a').forEach((a) => {
    a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--gold-lt)' : '';
  });
});

// ── MODAL CLOSE (no-op safe fallback) ──
function closeModal() {
  document.querySelector('.modal-overlay')?.classList.remove('open');
}

window.closeModal = closeModal;

