// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ===== GLOBAL VARIABLES =====
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// ===== UTILITIES =====
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ===== WORD SPLIT HELPER =====
function splitWords(selector) {
  document.querySelectorAll(selector).forEach(el => {
    const words = el.innerText.split(' ');
    el.innerHTML = words.map(w => 
      `<span style="display:inline-block;overflow:hidden;vertical-align:bottom">
        <span class="word-inner" style="display:inline-block">${w}&nbsp;</span>
      </span>`
    ).join('');
  });
}

// ===== CURSOR GLOW =====
const cursorGlow = document.getElementById('cursor-glow');

document.addEventListener('mousemove', (e) => {
  cursorGlow.style.left = e.clientX + 'px';
  cursorGlow.style.top = e.clientY + 'px';
});

// Expand cursor glow on interactive elements
document.querySelectorAll('a, button, .project-card, .highlight-card, .contact-link, .tech-chip').forEach(el => {
  el.addEventListener('mouseenter', () => cursorGlow.classList.add('expanded'));
  el.addEventListener('mouseleave', () => cursorGlow.classList.remove('expanded'));
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function updateThemeIcon() {
  themeToggle.textContent = isDarkMode ? '☾' : '☀';
}

function applyTheme() {
  if (isDarkMode) {
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
  }
  updateThemeIcon();
  ScrollTrigger.refresh();
}

themeToggle.addEventListener('click', () => {
  isDarkMode = !isDarkMode;
  localStorage.setItem('darkMode', isDarkMode);
  applyTheme();
});

// Apply theme on load
applyTheme();

// ===== NAVIGATION SCROLL =====
const nav = document.getElementById('nav');

function handleNavScroll() {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll);

// ===== PROGRESS BAR =====
gsap.to('#progress-bar', {
  width: '100%',
  ease: 'none',
  scrollTrigger: {
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.3
  }
});

// ===== NAV ENTRANCE ANIMATION =====
gsap.from('#nav', {
  y: -20,
  opacity: 0,
  duration: 1,
  delay: 0.2
});

gsap.from('.nav-center a', {
  y: -20,
  opacity: 0,
  duration: 0.8,
  stagger: 0.08,
  delay: 0.4
});

gsap.from('.nav-right button', {
  y: -20,
  opacity: 0,
  duration: 0.8,
  stagger: 0.08,
  delay: 0.6
});

// ===== HERO ENTRANCE ANIMATIONS =====
gsap.from('.hero-eyebrow', {
  y: -30,
  opacity: 0,
  duration: 1,
  delay: 0.3
});

gsap.from('.hero-status', {
  y: -30,
  opacity: 0,
  duration: 1,
  delay: 0.4
});

gsap.from('.hero-title .line', {
  y: 60,
  opacity: 0,
  duration: 1,
  stagger: 0.15,
  ease: 'power3.out',
  delay: 0.5
});

gsap.from('.hero-tags', {
  y: 20,
  opacity: 0,
  duration: 0.8,
  delay: 1.1
});

gsap.from('.scroll-cue', {
  opacity: 0,
  duration: 1,
  delay: 1.5
});

// ===== WORD SPLIT ANIMATIONS =====
splitWords('.section-heading');

// About section heading animation
gsap.fromTo('#about .word-inner',
  { y: '110%' },
  {
    y: '0%',
    duration: 0.8,
    stagger: 0.08,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#about',
      start: 'top 75%'
    }
  }
);

// Projects section heading animation
gsap.fromTo('#projects .word-inner',
  { y: '110%' },
  {
    y: '0%',
    duration: 0.8,
    stagger: 0.08,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#projects',
      start: 'top 75%'
    }
  }
);

// Skills section heading animation
gsap.fromTo('#skills .word-inner',
  { y: '110%' },
  {
    y: '0%',
    duration: 0.8,
    stagger: 0.08,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#skills',
      start: 'top 75%'
    }
  }
);

// Experience section heading animation
gsap.fromTo('#experience .word-inner',
  { y: '110%' },
  {
    y: '0%',
    duration: 0.8,
    stagger: 0.08,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#experience',
      start: 'top 75%'
    }
  }
);

// ===== ABOUT PARALLAX BLOBS =====
gsap.to('.blob-1', {
  y: -140,
  ease: 'none',
  scrollTrigger: {
    trigger: '#about',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1.5
  }
});

gsap.to('.blob-2', {
  y: -70,
  x: 30,
  ease: 'none',
  scrollTrigger: {
    trigger: '#about',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 2.5
  }
});

// ===== ABOUT CARDS ANIMATION =====
gsap.from('.highlight-card', {
  x: 40,
  opacity: 0,
  duration: 0.8,
  stagger: 0.1,
  scrollTrigger: {
    trigger: '#about',
    start: 'top 75%'
  }
});

// ===== PROJECTS ANIMATIONS =====
// Featured project
gsap.from('.project-card.featured', {
  y: 60,
  opacity: 0,
  duration: 0.9,
  scrollTrigger: {
    trigger: '#projects',
    start: 'top 80%'
  }
});

// Other projects
gsap.from('.project-card:not(.featured)', {
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.12,
  scrollTrigger: {
    trigger: '#projects',
    start: 'top 80%'
  }
});

// Project curtain reveal
gsap.fromTo('.project-visual::after',
  { scaleX: 1 },
  {
    scaleX: 0,
    duration: 0.8,
    ease: 'power3.inOut',
    transformOrigin: 'right',
    scrollTrigger: {
      trigger: '#projects',
      start: 'top 70%',
      once: true
    }
  }
);

// ===== 3D CARD TILT =====
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateY = ((x - centerX) / centerX) * 6;
    const rotateX = -((y - centerY) / centerY) * 6;
    
    card.style.transform = `perspective(900px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale3d(1.02, 1.02, 1.02)`;
  });
  
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.08s linear';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
    card.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
  });
});

// ===== TERMINAL TYPING ANIMATION =====
const skills = [
  { name: 'react_nextjs', pct: 92, bars: 12 },
  { name: 'nodejs_express', pct: 88, bars: 11 },
  { name: 'mongodb', pct: 85, bars: 11 },
  { name: 'sql', pct: 82, bars: 10 },
  { name: 'typescript', pct: 78, bars: 10 },
  { name: 'docker_devops', pct: 70, bars: 9 }
];

function typeTerminal() {
  const terminalContent = document.getElementById('terminal-content');
  const cursor = document.querySelector('.cursor');
  let lineIndex = 0;
  let charIndex = 0;
  let currentLine = '';
  
  function typeLine() {
    if (lineIndex < skills.length) {
      const skill = skills[lineIndex];
      const targetLine = `> ${skill.name.padEnd(20)} ${skill.pct.toString().padStart(3)}%  ${'█'.repeat(skill.bars)}${'░'.repeat(13 - skill.bars)}`;
      
      if (charIndex < targetLine.length) {
        currentLine = targetLine.substring(0, charIndex + 1);
        terminalContent.innerHTML = skills.slice(0, lineIndex).join('\n') + '\n' + currentLine;
        charIndex++;
        setTimeout(typeLine, 16);
      } else {
        lineIndex++;
        charIndex = 0;
        currentLine = '';
        setTimeout(typeLine, 100);
      }
    } else {
      // Type final status line
      const statusLine = '> status: all systems ready ✓';
      if (charIndex < statusLine.length) {
        currentLine = statusLine.substring(0, charIndex + 1);
        terminalContent.innerHTML = skills.map(s => 
          `> ${s.name.padEnd(20)} ${s.pct.toString().padStart(3)}%  ${'█'.repeat(s.bars)}${'░'.repeat(13 - s.bars)}`
        ).join('\n') + '\n' + currentLine;
        charIndex++;
        setTimeout(typeLine, 16);
      } else {
        // Make status line green
        terminalContent.innerHTML = skills.map(s => 
          `> ${s.name.padEnd(20)} ${s.pct.toString().padStart(3)}%  ${'█'.repeat(s.bars)}${'░'.repeat(13 - s.bars)}`
        ).join('\n') + '\n' + '<span style="color: #E8D5B0">> status: all systems ready ✓</span>';
      }
    }
  }
  
  typeLine();
}

// Start terminal animation when skills section is in view
ScrollTrigger.create({
  trigger: '#skills',
  start: 'top 60%',
  once: true,
  onEnter: typeTerminal
});

// ===== TECH CHIPS ANIMATION =====
gsap.from('.tech-chip', {
  scale: 0.85,
  opacity: 0,
  duration: 0.6,
  stagger: 0.05,
  scrollTrigger: {
    trigger: '#skills',
    start: 'top 70%'
  }
});

// ===== EXPERIENCE TIMELINE =====
// Timeline line growth
gsap.fromTo('#experience .timeline::before',
  { scaleY: 0 },
  {
    scaleY: 1,
    transformOrigin: 'top center',
    ease: 'none',
    scrollTrigger: {
      trigger: '#experience',
      start: 'top 70%',
      end: 'bottom 80%',
      scrub: 1
    }
  }
);

// Timeline items
gsap.from('.timeline-item', {
  x: -50,
  opacity: 0,
  duration: 0.7,
  stagger: 0.15,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.timeline',
    start: 'top 75%'
  }
});

// ===== CONTACT SECTION ANIMATIONS =====
gsap.from('.contact-left', {
  x: -50,
  opacity: 0,
  duration: 0.9,
  scrollTrigger: {
    trigger: '#contact',
    start: 'top 75%'
  }
});

gsap.from('.contact-right', {
  x: 50,
  opacity: 0,
  duration: 0.9,
  delay: 0.15,
  scrollTrigger: {
    trigger: '#contact',
    start: 'top 75%'
  }
});

// ===== CONTACT FORM =====
document.querySelector('.contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);
  
  // Here you would normally send the data to a server
  console.log('Form submitted:', data);
  
  // Show success message
  const submitBtn = e.target.querySelector('.submit-btn');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Message Sent!';
  submitBtn.style.background = '#4ade80';
  
  // Reset form
  e.target.reset();
  
  // Reset button after 3 seconds
  setTimeout(() => {
    submitBtn.textContent = originalText;
    submitBtn.style.background = '';
  }, 3000);
});

// ===== SMOOTH SCROLL FOR NAVIGATION LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== BACK TO TOP =====
document.querySelector('.back-to-top').addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ===== REDUCED MOTION =====
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.globalTimeline.timeScale(0);
}

// ===== REFRESH SCROLLTRIGGER =====
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});

window.addEventListener('resize', debounce(() => {
  ScrollTrigger.refresh();
}, 200));

// ===== ABOUT SCROLL VIDEO PLACEHOLDER =====
/* ── ABOUT SCROLL VIDEO ─────────────────────
   To enable when frames are ready:
   const ABOUT_FRAMES      = 180;
   const ABOUT_FRAMES_PATH = "public/about-frames/frame_";
   const ABOUT_FRAMES_EXT  = ".jpg";
   Preload into aboutFrames[] array on load.
   ScrollTrigger pinned section in #about-video-section
   scrub progress → frameIndex → ctx.drawImage()
   ─────────────────────────────────────────── */
