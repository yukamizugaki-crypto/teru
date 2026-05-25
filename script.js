/* ===================================
   中華居酒屋 輝 — script.js
   =================================== */

// --- Mobile Nav Toggle ---
const navToggle = document.getElementById('navToggle');
const siteNav   = document.getElementById('siteNav');

navToggle.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);

  // 親のheader要素もクラスをトグル
  const siteHeader = document.querySelector('.site-header');
  siteHeader.classList.toggle('menu-open', isOpen);

  // Animate hamburger → X
  const spans = navToggle.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    document.body.style.overflow = 'hidden';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
    document.body.style.overflow = '';
  }
});

// Close nav on link click
siteNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('is-open');
    document.querySelector('.site-header').classList.remove('menu-open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
    document.body.style.overflow = '';
  });
});

// --- Header scroll effect ---
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.style.background = 'rgba(13, 8, 8, 0.97)';
    header.style.borderBottomColor = 'rgba(212, 168, 71, 0.35)';
  } else {
    header.style.background = 'rgba(13, 8, 8, 0.88)';
    header.style.borderBottomColor = 'rgba(212, 168, 71, 0.2)';
  }
}, { passive: true });

// --- Scroll Reveal (Intersection Observer) ---
function initReveal() {
  const elements = document.querySelectorAll(
    '.about-text-block, .about-visual, .strip-item, ' +
    '.menu-item, .info-block, .access-header, .contact-inner'
  );

  elements.forEach((el, i) => {
    el.classList.add('reveal');
    // Stagger siblings within the same parent
    const siblings = el.parentElement ? el.parentElement.children : [];
    const idx = Array.from(siblings).indexOf(el);
    if (idx > 0 && idx <= 3) {
      el.classList.add(`reveal-delay-${idx}`);
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

// --- Smooth active nav highlight ---
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.site-nav a[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === `#${id}`
            ? 'var(--gold-lt)'
            : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

// --- ABOUT Section Slider ---
function initAboutSlider() {
  const slides = document.querySelectorAll('.about-slide');
  if (slides.length <= 1) return;

  let currentSlide = 0;
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 5000);
}

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initNavHighlight();
  initAboutSlider();
});
