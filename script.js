// ── Navbar Scroll Effect ──
const navbar = document.getElementById('navbar');
const scrollTop = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  scrollTop.classList.toggle('visible', window.scrollY > 400);
});

// ── Hamburger Menu ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ── Active Nav Link on Scroll ──
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
  const scrollPos = window.scrollY + 120;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < top + height) {
      navItems.forEach(a => {
        a.classList.remove('active');
        if (a.getAttribute('href') === '#' + id) a.classList.add('active');
      });
    }
  });
}
window.addEventListener('scroll', updateActiveNav);

// ── Scroll to Top ──
scrollTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Scroll Animations (Intersection Observer) ──
const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger animation delay for siblings
      const siblings = entry.target.parentElement.querySelectorAll('.animate-on-scroll');
      let delay = 0;
      siblings.forEach((sib, i) => {
        if (sib === entry.target) delay = i * 100;
      });
      setTimeout(() => entry.target.classList.add('visible'), delay);
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// ── Skill Bar Fill on Scroll ──
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      fill.style.width = fill.dataset.width;
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-fill').forEach(bar => {
  bar.style.width = '0%';
  skillObserver.observe(bar);
});

// ── Counter Animation ──
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          el.textContent = target + '+';
          clearInterval(timer);
        } else {
          el.textContent = Math.floor(current) + '+';
        }
      }, 16);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => counterObserver.observe(el));

// ── Typing Effect for Hero Title ──
const heroTitle = document.getElementById('heroTitle');
if (heroTitle) {
  const roles = [
    'AI/ML Developer',
    'Backend Engineer',
    'Competitive Programmer',
    'Cloud Enthusiast'
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const current = roles[roleIndex];
    if (isDeleting) {
      heroTitle.textContent = current.substring(0, charIndex--);
      if (charIndex < 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeEffect, 400);
        return;
      }
    } else {
      heroTitle.textContent = current.substring(0, charIndex++);
      if (charIndex > current.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
      }
    }
    setTimeout(typeEffect, isDeleting ? 40 : 80);
  }

  // Start after initial load
  setTimeout(() => {
    heroTitle.textContent = '';
    typeEffect();
  }, 1500);
}

// ── Contact Form ──
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subject = document.getElementById('contactSubject').value;
    const message = document.getElementById('contactMessage').value;

    // mailto fallback
    const mailtoLink = `mailto:omveerahirwaroo@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Contact')}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    window.open(mailtoLink, '_blank');

    contactForm.reset();
    const btn = contactForm.querySelector('button[type="submit"]');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
    btn.style.background = '#10B981';
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.background = '';
    }, 3000);
  });
}

// ── Smooth Parallax for Hero ──
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  if (hero) {
    const scrolled = window.scrollY;
    const heroImg = document.querySelector('.hero-image-wrapper');
    if (heroImg && scrolled < window.innerHeight) {
      heroImg.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
  }
});

// ── Particle effect in hero (subtle floating dots) ──
function createParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: rgba(59,130,246,${Math.random() * 0.3 + 0.1});
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      animation: float ${Math.random() * 4 + 3}s ease-in-out infinite;
      animation-delay: ${Math.random() * 3}s;
      pointer-events: none;
    `;
    hero.appendChild(particle);
  }
}
createParticles();
