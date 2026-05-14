// Lightbox
const galleryItems = document.querySelectorAll('.gallery-item');
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lb-img');
const lbCap = document.getElementById('lb-caption');
let lbIdx = 0;
const imgs = Array.from(galleryItems).map(el => ({
  src: el.dataset.src || el.querySelector('img').src,
  cap: el.dataset.caption || ''
}));

function openLb(i) {
  lbIdx = i;
  lbImg.src = imgs[i].src;
  lbCap.textContent = imgs[i].cap;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLb() {
  lb.classList.remove('open');
  document.body.style.overflow = '';
}
function navLb(d) {
  lbIdx = (lbIdx + d + imgs.length) % imgs.length;
  lbImg.src = imgs[lbIdx].src;
  lbCap.textContent = imgs[lbIdx].cap;
}

galleryItems.forEach((el, i) => el.addEventListener('click', () => openLb(i)));
document.getElementById('lb-close').addEventListener('click', closeLb);
document.getElementById('lb-prev').addEventListener('click', () => navLb(-1));
document.getElementById('lb-next').addEventListener('click', () => navLb(1));
lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
document.addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLb();
  if (e.key === 'ArrowLeft') navLb(-1);
  if (e.key === 'ArrowRight') navLb(1);
});