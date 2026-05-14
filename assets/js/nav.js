// Navigation scroll behavior
// Adds .scrolled class when user scrolls past 60px

const nav = document.getElementById('main-nav');
const hamburger = document.getElementById('nav-hamburger');
const drawer = document.getElementById('nav-drawer');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

// Hamburger toggle
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  drawer.classList.toggle('open');
});

// Close drawer when a link is clicked
drawer.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
  });
});

// Set active nav link based on current page
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll('.nav-center a');

navLinks.forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPath || (currentPath === '/' && href === '/index.html')) {
    link.classList.add('active');
  }
});