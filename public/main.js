import { services, whyUs, testimonials } from './data.js';

/** Escapa HTML para evitar rotura de layout y XSS al insertar texto en innerHTML */
function escapeHtml(str) {
  if (str == null || typeof str !== 'string') return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/** Llama a lucide.createIcons() de forma segura; se puede invocar varias veces sin problema */
function safeCreateIcons() {
  try {
    if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
      lucide.createIcons();
    }
  } catch (e) {
    if (typeof console !== 'undefined' && console.warn) {
      console.warn('[Lucide] createIcons:', e);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  safeCreateIcons();
  initMobileMenu();

  renderServices();
  renderWhyUs();
  renderTestimonials();
  safeCreateIcons();

  initAnimations();

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('¡Gracias! Tu mensaje ha sido enviado exitosamente. Nos contactaremos pronto.');
      contactForm.reset();
    });
  }
});

function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const iconMenu = document.getElementById('icon-menu');
  const iconClose = document.getElementById('icon-close');
  const navLinks = document.querySelectorAll('.nav-link-mobile');

  if (!toggle || !menu) return;

  function openMenu() {
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Cerrar menú');
    if (iconMenu) iconMenu.classList.add('hidden');
    if (iconClose) iconClose.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
    if (iconMenu) iconMenu.classList.remove('hidden');
    if (iconClose) iconClose.classList.add('hidden');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('is-open');
    if (isOpen) closeMenu();
    else openMenu();
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => closeMenu());
  });

  // Cerrar al hacer clic fuera del menú
  document.addEventListener('click', (e) => {
    if (!menu.classList.contains('is-open')) return;
    if (!menu.contains(e.target) && !toggle.contains(e.target)) closeMenu();
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) closeMenu();
  });
}

function renderServices() {
  const container = document.getElementById('services-grid');
  if (!container || !Array.isArray(services)) return;

  try {
    services.forEach((service) => {
      const title = escapeHtml(service.title);
      const description = escapeHtml(service.description);
      const color = typeof service.color === 'string' ? service.color : 'bg-blue-50 text-blue-600';
      const icon = typeof service.icon === 'string' ? service.icon : 'box';

      const card = document.createElement('div');
      card.className =
        'service-card bg-white p-8 rounded-3xl border border-slate-100 flex flex-col items-start gap-4';
      card.innerHTML =
        '<div class="w-14 h-14 ' +
        color +
        ' rounded-2xl flex items-center justify-center mb-2">' +
        '<i data-lucide="' + escapeHtml(icon) + '" class="w-7 h-7"></i></div>' +
        '<h4 class="text-xl font-bold text-slate-900">' + title + '</h4>' +
        '<p class="text-slate-500 leading-relaxed">' + description + '</p>' +
        '<a href="#contacto" class="text-sm font-semibold text-blue-600 mt-auto flex items-center gap-1 hover:gap-2 transition-all">' +
        'Saber más <i data-lucide="chevron-right" class="w-4 h-4"></i></a>';
      container.appendChild(card);
    });
  } catch (e) {
    if (typeof console !== 'undefined' && console.error) console.error('renderServices:', e);
  }
}

function renderWhyUs() {
  const container = document.getElementById('features-list');
  if (!container || !Array.isArray(whyUs)) return;

  try {
    whyUs.forEach((item) => {
      const title = escapeHtml(item.title);
      const description = escapeHtml(item.description);
      const icon = typeof item.icon === 'string' ? item.icon : 'circle';

      const feature = document.createElement('div');
      feature.className = 'flex gap-5 group';
      feature.innerHTML =
        '<div class="shrink-0 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300">' +
        '<i data-lucide="' + escapeHtml(icon) + '" class="w-5 h-5 text-blue-400 group-hover:text-white transition-colors"></i></div>' +
        '<div><h4 class="text-xl font-bold mb-1">' + title + '</h4>' +
        '<p class="text-slate-400 leading-relaxed">' + description + '</p></div>';
      container.appendChild(feature);
    });
  } catch (e) {
    if (typeof console !== 'undefined' && console.error) console.error('renderWhyUs:', e);
  }
}

function renderTestimonials() {
  const container = document.getElementById('testimonials-container');
  if (!container || !Array.isArray(testimonials)) return;

  const starIcon = '<i data-lucide="star" class="w-4 h-4 fill-orange-400 text-orange-400"></i>';
  const starsHtml = starIcon + starIcon + starIcon + starIcon + starIcon;

  try {
    const list = testimonials.length > 0 ? testimonials.concat(testimonials) : [];
    list.forEach((item) => {
      const text = escapeHtml(item.text);
      const author = escapeHtml(item.author || '');
      const position = escapeHtml(item.position || 'Cliente Satisfecho');
      const initial = author ? author.charAt(0).toUpperCase() : '?';

      const card = document.createElement('div');
      card.className =
        'w-[400px] shrink-0 bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col gap-6';
      card.innerHTML =
        '<div class="flex gap-1">' + starsHtml + '</div>' +
        '<p class="text-slate-700 italic">"' + text + '"</p>' +
        '<div class="flex items-center gap-4 mt-auto">' +
        '<div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-sm">' + escapeHtml(initial) + '</div>' +
        '<div><p class="font-bold text-sm text-slate-900">' + author + '</p>' +
        '<p class="text-xs text-slate-500">' + position + '</p></div></div>';
      container.appendChild(card);
    });
  } catch (e) {
    if (typeof console !== 'undefined' && console.error) console.error('renderTestimonials:', e);
  }
}

function initAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const fadeUps = document.querySelectorAll('section > div');
  fadeUps.forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none'
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    });
  });

  const heroTargets = document.querySelectorAll('#inicio h1, #inicio p, #inicio .flex');
  if (heroTargets.length > 0) {
    gsap.from(heroTargets, {
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      ease: 'power3.out'
    });
  }
}

