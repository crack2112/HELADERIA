/* ============================================================
   ALINA - Heladería y Dulcería Artesanal
   script.js — Main JavaScript
   ============================================================ */

'use strict';

/* ── DOM Ready ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initAOS();
  initNavbar();
  initHeroParticles();
  initProductFilter();
  initContactForm();
  initScrollButtons();
  initNavSmoothClose();
  initLazyFade();
  initSaborHover();
  initGalleryLightEffect();
});

/* ============================================================
   AOS (Animate On Scroll) Initialization
   ============================================================ */
function initAOS() {
  AOS.init({
    duration: 700,
    once: true,
    offset: 60,
    easing: 'ease-out-cubic',
  });
}

/* ============================================================
   NAVBAR — scroll behavior
   ============================================================ */
function initNavbar() {
  const nav = document.getElementById('mainNav');
  if (!nav) return;

  const toggleScrolled = () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', toggleScrolled, { passive: true });
  toggleScrolled(); // run on load
}

/* ============================================================
   HERO PARTICLES — floating emojis
   ============================================================ */
function initHeroParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const emojis = ['🍦', '🍓', '🍫', '🍬', '🍪', '🍨', '🧁', '🍧', '🌸', '✦', '🫐', '🥥'];
  const COUNT  = 18;

  for (let i = 0; i < COUNT; i++) {
    const el = document.createElement('span');
    el.className = 'particle';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    // Random horizontal position
    el.style.left = `${Math.random() * 100}%`;

    // Random size
    const size = 0.7 + Math.random() * 1.3;
    el.style.fontSize = `${size}rem`;

    // Random duration & delay
    const dur   = 10 + Math.random() * 20;
    const delay = -(Math.random() * dur);
    el.style.animationDuration  = `${dur}s`;
    el.style.animationDelay     = `${delay}s`;
    el.style.opacity = (0.1 + Math.random() * 0.25).toString();

    container.appendChild(el);
  }
}

/* ============================================================
   PRODUCT FILTER
   ============================================================ */
function initProductFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items       = document.querySelectorAll('.product-item');
  const grid        = document.getElementById('productGrid');
  if (!filterBtns.length || !items.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      // Temporarily set grid position: relative for absolute hidden items
      items.forEach(item => {
        const cat = item.dataset.category;

        if (filter === 'all' || cat === filter) {
          item.classList.remove('hidden');
          // Trigger reflow for animation
          void item.offsetWidth;
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });
}

/* ============================================================
   CONTACT FORM
   ============================================================ */
function initContactForm() {
  const btn     = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');
  if (!btn || !success) return;

  btn.addEventListener('click', () => {
    // Basic validation
    const name    = document.querySelector('.contact-form-wrap input[type="text"]');
    const email   = document.querySelector('.contact-form-wrap input[type="email"]');
    const message = document.querySelector('.contact-form-wrap textarea');

    if (!name || !email || !message) return;

    const nameVal    = name.value.trim();
    const emailVal   = email.value.trim();
    const messageVal = message.value.trim();

    if (!nameVal || !emailVal || !messageVal) {
      // Shake animation on empty fields
      [name, email, message].forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#e8878a';
          field.style.animation   = 'shake 0.4s ease';
          setTimeout(() => {
            field.style.animation = '';
            field.style.borderColor = '';
          }, 500);
        }
      });
      return;
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailVal)) {
      email.style.borderColor = '#e8878a';
      setTimeout(() => { email.style.borderColor = ''; }, 1500);
      return;
    }

    // Loading state
    btn.disabled    = true;
    btn.innerHTML   = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando...';

    // Simulate sending (replace with real API call)
    setTimeout(() => {
      success.classList.remove('d-none');
    }, 1400);
  });
}

/* ============================================================
   SCROLL BUTTONS — Back to Top & WhatsApp visibility
   ============================================================ */
function initScrollButtons() {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   SMOOTH CLOSE — collapse navbar on mobile link click
   ============================================================ */
function initNavSmoothClose() {
  const navLinks = document.querySelectorAll('#navMenu .nav-link');
  const toggler  = document.querySelector('.navbar-toggler');
  const collapse = document.getElementById('navMenu');

  if (!collapse) return;

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      // Only collapse on mobile
      if (window.innerWidth < 992 && collapse.classList.contains('show')) {
        toggler?.click();
      }
    });
  });
}

/* ============================================================
   LAZY FADE — fade in elements with .lazy-fade class
   ============================================================ */
function initLazyFade() {
  const elements = document.querySelectorAll('.lazy-fade');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('loaded');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   SABOR CARDS — tilt effect on hover
   ============================================================ */
function initSaborHover() {
  const cards = document.querySelectorAll('.sabor-card');
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const cx   = (e.clientX - rect.left) / rect.width  - 0.5;
      const cy   = (e.clientY - rect.top)  / rect.height - 0.5;

      card.style.transform = `
        translateY(-6px) scale(1.03)
        rotateX(${-cy * 10}deg)
        rotateY(${cx * 10}deg)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ============================================================
   GALLERY LIGHT EFFECT — subtle mouse-follow highlight
   ============================================================ */
function initGalleryLightEffect() {
  const items = document.querySelectorAll('.gallery-inner');
  if (!items.length) return;

  items.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const rect = item.getBoundingClientRect();
      const x    = ((e.clientX - rect.left) / rect.width)  * 100;
      const y    = ((e.clientY - rect.top)  / rect.height) * 100;

      item.style.backgroundImage = `
        radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.18) 0%, transparent 60%),
        ${item.style.getPropertyValue('--gbg') || ''}
      `;
    });

    item.addEventListener('mouseleave', () => {
      item.style.backgroundImage = '';
    });
  });
}

/* ============================================================
   HELPER — Add CSS keyframe shake dynamically
   ============================================================ */
(function injectKeyframes() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%,100% { transform: translateX(0); }
      20%      { transform: translateX(-6px); }
      40%      { transform: translateX(6px); }
      60%      { transform: translateX(-4px); }
      80%      { transform: translateX(4px); }
    }
  `;
  document.head.appendChild(style);
})();

/* ============================================================
   ACTIVE NAV LINK — highlight current section in navbar
   ============================================================ */
(function initActiveNav() {
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('#navMenu .nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active-section');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active-section');
          }
        });
      }
    });
  }, { threshold: 0.35, rootMargin: '-80px 0px -30% 0px' });

  sections.forEach(s => observer.observe(s));

  // CSS for active nav
  const style = document.createElement('style');
  style.textContent = `
    #mainNav.scrolled .nav-link.active-section {
      color: var(--rose-dark) !important;
      font-weight: 600;
    }
    #mainNav:not(.scrolled) .nav-link.active-section {
      background: rgba(255,255,255,0.18);
    }
  `;
  document.head.appendChild(style);
})();

/* ============================================================
   SMOOTH COUNT-UP animation for stats (if used)
   ============================================================ */
function countUp(el, target, duration = 1500) {
  let start   = 0;
  const step  = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + (el.dataset.suffix || '');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + (el.dataset.suffix || '');
    }
  }, 16);
}

// Observe counter elements
const counters = document.querySelectorAll('[data-count]');
if (counters.length) {
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        countUp(entry.target, +entry.target.dataset.count);
        countObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => countObs.observe(c));
}

/* ============================================================
   PRODUCT CARD — staggered reveal on filter
   ============================================================ */
document.addEventListener('click', (e) => {
  if (e.target.matches('.filter-btn')) {
    const visibleItems = document.querySelectorAll('.product-item:not(.hidden)');
    visibleItems.forEach((item, i) => {
      item.style.transitionDelay = `${i * 60}ms`;
      setTimeout(() => { item.style.transitionDelay = ''; }, 600 + i * 60);
    });
  }
});

/* ============================================================
   PAGE LOAD — fade in body
   ============================================================ */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });
});
