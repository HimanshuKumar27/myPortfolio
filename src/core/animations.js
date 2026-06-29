export class AnimationManager {
  constructor({ scrollProgressId, revealElementsSelector, navLogoId, homeSectionId }) {
    this.scrollProgress = document.getElementById(scrollProgressId);
    this.revealElementsSelector = revealElementsSelector;
    this.navLogo = document.getElementById(navLogoId);
    this.homeSection = document.getElementById(homeSectionId);
    this.init();
  }

  init() {
    this.initScrollProgress();
    this.initScrollReveal();
    this.initNavLogoFade();
    this.initSpotlightHover();
    this.initTextScramble();
  }

  initScrollProgress() {
    if (!this.scrollProgress) return;
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
      this.scrollProgress.style.transform = `scaleX(${scrollPercentage})`;
    }, { passive: true });
  }

  initScrollReveal() {
    const revealElements = document.querySelectorAll(this.revealElementsSelector);
    if (revealElements.length === 0) return;

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Save CPU resources by stopping observation
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  initNavLogoFade() {
    if (!this.navLogo || !this.homeSection) return;

    const logoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.navLogo.classList.remove('scrolled');
        } else {
          this.navLogo.classList.add('scrolled');
        }
      });
    }, {
      threshold: 0.15
    });

    logoObserver.observe(this.homeSection);
  }

  initSpotlightHover() {
    // Spotlight cursor tracking using efficient event delegation
    document.addEventListener('mousemove', (e) => {
      if (!e.target || typeof e.target.closest !== 'function') return;
      const card = e.target.closest('.spotlight-card');
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    });
  }

  initTextScramble() {
    // Text scramble animation on hover (common in modern premium portfolios)
    document.addEventListener('mouseover', (e) => {
      if (!e.target || typeof e.target.closest !== 'function') return;
      const el = e.target.closest('.scramble-text');
      if (!el || el.dataset.scrambling === 'true') return;

      el.dataset.scrambling = 'true';
      const originalText = el.dataset.originalText || el.textContent;
      if (!el.dataset.originalText) {
        el.dataset.originalText = originalText;
      }
      
      const chars = '!<>-_\\/[]{}—=+*^?#________';
      let iteration = 0;
      
      const interval = setInterval(() => {
        el.innerHTML = originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        if (iteration >= originalText.length) {
          clearInterval(interval);
          el.textContent = originalText;
          delete el.dataset.scrambling;
        }
        iteration += 1 / 2.5; // Controls the speed of decoding
      }, 25);
    });
  }
}
