import { services, whyUs, testimonials } from './data.js';

document.addEventListener('DOMContentLoaded', () => {

    lucide.createIcons();


    renderServices();
    renderWhyUs();
    renderTestimonials();


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

function renderServices() {
    const container = document.getElementById('services-grid');
    if (!container) return;

    services.forEach(service => {
        const card = document.createElement('div');
        card.className = 'service-card bg-white p-8 rounded-3xl border border-slate-100 flex flex-col items-start gap-4';
        card.innerHTML = `
            <div class="w-14 h-14 ${service.color} rounded-2xl flex items-center justify-center mb-2">
                <i data-lucide="${service.icon}" class="w-7 h-7"></i>
            </div>
            <h4 class="text-xl font-bold text-slate-900">${service.title}</h4>
            <p class="text-slate-500 leading-relaxed">${service.description}</p>
            <a href="#contacto" class="text-sm font-semibold text-blue-600 mt-auto flex items-center gap-1 hover:gap-2 transition-all">
                Saber más <i data-lucide="chevron-right" class="w-4 h-4"></i>
            </a>
        `;
        container.appendChild(card);
    });
    lucide.createIcons();
}

function renderWhyUs() {
    const container = document.getElementById('features-list');
    if (!container) return;

    whyUs.forEach(item => {
        const feature = document.createElement('div');
        feature.className = 'flex gap-5 group';
        feature.innerHTML = `
            <div class="shrink-0 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300">
                <i data-lucide="${item.icon}" class="w-5 h-5 text-blue-400 group-hover:text-white transition-colors"></i>
            </div>
            <div>
                <h4 class="text-xl font-bold mb-1">${item.title}</h4>
                <p class="text-slate-400 leading-relaxed">${item.description}</p>
            </div>
        `;
        container.appendChild(feature);
    });
    lucide.createIcons();
}

function renderTestimonials() {
    const container = document.getElementById('testimonials-container');
    if (!container) return;


    const displayList = [...testimonials, ...testimonials];

    displayList.forEach(item => {
        const card = document.createElement('div');
        card.className = 'w-[400px] shrink-0 bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col gap-6';
        card.innerHTML = `
            <div class="flex gap-1">
                ${Array(5).fill('<i data-lucide="star" class="w-4 h-4 fill-orange-400 text-orange-400"></i>').join('')}
            </div>
            <p class="text-slate-700 italic">"${item.text}"</p>
            <div class="flex items-center gap-4 mt-auto">
                <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600 text-sm">
                    ${item.author.charAt(0)}
                </div>
                <div>
                    <p class="font-bold text-sm text-slate-900">${item.author}</p>
                    <p class="text-xs text-slate-500">${item.position || 'Cliente Satisfecho'}</p>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
    lucide.createIcons();
}

function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);


    const fadeUps = document.querySelectorAll('section > div');
    fadeUps.forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none none"
            },
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    });


    gsap.from("#inicio h1, #inicio p, #inicio .flex", {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
    });
}
