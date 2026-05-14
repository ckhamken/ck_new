// ============================================================================
// Photography Page JavaScript
// ============================================================================

// ── STAGE 1: HERO ROTATOR ─────────────────────────────────────────────────

const slides  = document.querySelectorAll('.hero-slide');
const dots    = document.querySelectorAll('.hero-dot');
const titleEl = document.getElementById('hero-photo-title');
const metaEl  = document.getElementById('hero-photo-meta');
let heroIdx = 0;
let heroTimer;

function goToSlide(n) {
  slides[heroIdx].classList.remove('active');
  dots[heroIdx].classList.remove('active');
  heroIdx = ((n % slides.length) + slides.length) % slides.length;
  slides[heroIdx].classList.add('active');
  dots[heroIdx].classList.add('active');
  titleEl.style.opacity = '0';
  metaEl.style.opacity  = '0';
  setTimeout(() => {
    titleEl.textContent   = slides[heroIdx].dataset.title;
    metaEl.textContent    = slides[heroIdx].dataset.meta;
    titleEl.style.opacity = '1';
    metaEl.style.opacity  = '1';
  }, 300);
}

function startHero() {
  heroTimer = setInterval(() => goToSlide(heroIdx + 1), 6000);
}

dots.forEach(d => d.addEventListener('click', () => {
  clearInterval(heroTimer);
  goToSlide(parseInt(d.dataset.idx));
  startHero();
}));

startHero();

// ── STAGE 2 & 3: FILTER & LIGHTBOX ────────────────────────────────────────

const filterTabs = document.querySelectorAll('.filter-tab');
const cards      = document.querySelectorAll('.photo-card');

function getVisibleCards() {
  return [...cards].filter(c => !c.classList.contains('hidden'));
}

filterTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    filterTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const f = tab.dataset.filter;
    cards.forEach(c => {
      c.classList.toggle('hidden', f !== 'all' && c.dataset.category !== f);
    });
  });
});

// ── Lightbox ─────────────────────────────────────────────────────────────

const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lb-img');
const lbTitle  = document.getElementById('lb-title');
const lbMeta   = document.getElementById('lb-meta');
let lbIdx = 0;

function openLightbox(card) {
  const visible = getVisibleCards();
  lbIdx = visible.indexOf(card);
  showLbSlide(lbIdx);
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function showLbSlide(n) {
  const visible = getVisibleCards();
  lbIdx = ((n % visible.length) + visible.length) % visible.length;
  const c = visible[lbIdx];
  lbImg.src         = c.querySelector('img').src;
  lbImg.alt         = c.dataset.title;
  lbTitle.textContent = c.dataset.title;
  lbMeta.textContent  = c.dataset.meta;
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

cards.forEach(c => c.addEventListener('click', () => openLightbox(c)));
document.getElementById('lb-close').addEventListener('click', closeLightbox);
document.getElementById('lb-prev').addEventListener('click', () => showLbSlide(lbIdx - 1));
document.getElementById('lb-next').addEventListener('click', () => showLbSlide(lbIdx + 1));
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  showLbSlide(lbIdx - 1);
  if (e.key === 'ArrowRight') showLbSlide(lbIdx + 1);
});