/** Llama a lucide.createIcons() de forma segura para pintar iconos (servicios, why us, testimonios se renderizan en Astro). */
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
  initAnimationsWhenReady();
  initContactForm();
});

/**
 * Carga GSAP y ScrollTrigger solo tras la primera interacción del usuario (scroll, toque, clic, tecla)
 * para aligerar la carga inicial en móvil 3G/4G. Respeta prefers-reduced-motion.
 */
function initAnimationsWhenReady() {
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  let scheduled = false;
  function onInteraction() {
    if (scheduled) return;
    scheduled = true;
    document.removeEventListener('scroll', onInteraction, { passive: true });
    document.removeEventListener('touchstart', onInteraction, { passive: true });
    document.removeEventListener('click', onInteraction);
    document.removeEventListener('keydown', onInteraction);
    loadGsapThenRunAnimations();
  }

  document.addEventListener('scroll', onInteraction, { passive: true });
  document.addEventListener('touchstart', onInteraction, { passive: true });
  document.addEventListener('click', onInteraction);
  document.addEventListener('keydown', onInteraction);
}

function loadGsapThenRunAnimations() {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    initAnimations();
    return;
  }

  const gsapUrl = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
  const stUrl = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';

  const script1 = document.createElement('script');
  script1.src = gsapUrl;
  script1.async = true;
  script1.onload = () => {
    const script2 = document.createElement('script');
    script2.src = stUrl;
    script2.async = true;
    script2.onload = () => initAnimations();
    document.head.appendChild(script2);
  };
  document.head.appendChild(script1);
}

const FORMSPREE_URL = 'https://formspree.io/f/mkoqjqno';

/** Validación mínima: requeridos y formato email */
function validateContactForm(form) {
  const name = (form.querySelector('[name="name"]') || {}).value;
  const email = (form.querySelector('[name="email"]') || {}).value;
  const message = (form.querySelector('[name="message"]') || {}).value;
  const errors = {};

  if (!name || String(name).trim() === '') errors.name = 'El nombre es obligatorio.';
  if (!email || String(email).trim() === '') {
    errors.email = 'El correo electrónico es obligatorio.';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) errors.email = 'Introduce un correo electrónico válido.';
  }
  if (!message || String(message).trim() === '') errors.message = 'El mensaje es obligatorio.';

  return errors;
}

function showFieldErrors(form, errors) {
  form.querySelectorAll('.contact-error').forEach((el) => {
    el.classList.add('hidden');
    el.textContent = '';
  });
  form.querySelectorAll('.contact-input').forEach((el) => {
    el.classList.remove('border-red-500', 'ring-2', 'ring-red-200');
  });
  Object.keys(errors).forEach((field) => {
    const errEl = form.querySelector('.contact-error[data-for="' + field + '"]');
    const input = form.querySelector('[name="' + field + '"]');
    if (errEl) {
      errEl.textContent = errors[field];
      errEl.classList.remove('hidden');
    }
    if (input) {
      input.classList.add('border-red-500', 'ring-2', 'ring-red-200');
    }
  });
}

function showFormFeedback(form, type, html) {
  const el = document.getElementById('form-feedback');
  if (!el) return;
  el.classList.remove('hidden', 'bg-green-50', 'text-green-800', 'border', 'border-green-200', 'bg-red-50', 'text-red-800', 'border-red-200');
  el.innerHTML = html;
  if (type === 'success') {
    el.classList.add('bg-green-50', 'text-green-800', 'border', 'border-green-200');
  } else {
    el.classList.add('bg-red-50', 'text-red-800', 'border', 'border-red-200');
  }
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function setSubmitLoading(loading) {
  const btn = document.getElementById('contact-submit');
  if (!btn) return;
  const text = btn.querySelector('.btn-text');
  if (loading) {
    btn.disabled = true;
    if (text) text.textContent = 'Enviando...';
  } else {
    btn.disabled = false;
    if (text) text.textContent = 'Enviar mensaje';
  }
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const errors = validateContactForm(form);
    if (Object.keys(errors).length > 0) {
      showFieldErrors(form, errors);
      showFormFeedback(form, 'error', '<strong>Revisa los campos marcados</strong> y corrige los errores.');
      return;
    }
    showFieldErrors(form, {});
    const feedbackEl = document.getElementById('form-feedback');
    if (feedbackEl) feedbackEl.classList.add('hidden');

    setSubmitLoading(true);
    try {
      const formData = new FormData(form);
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && (data.ok === true || res.status === 200)) {
        showFormFeedback(
          form,
          'success',
          '<strong>Mensaje enviado.</strong> Gracias por escribirnos. Nos pondremos en contacto pronto.'
        );
        form.reset();
      } else {
        showFormFeedback(
          form,
          'error',
          data.error || '<strong>No se pudo enviar.</strong> Vuelve a intentarlo más tarde.'
        );
      }
    } catch (err) {
      showFormFeedback(
        form,
        'error',
        '<strong>Error de conexión.</strong> Comprueba tu conexión e inténtalo de nuevo.'
      );
    } finally {
      setSubmitLoading(false);
    }
  });
}

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

function initAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Solo animar secciones que no son el hero; si incluimos #inicio, el ScrollTrigger
  // del contenedor aplica opacity 0 y hace que los botones desaparezcan al activarse.
  const fadeUps = document.querySelectorAll('section:not(#inicio) > div');
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

