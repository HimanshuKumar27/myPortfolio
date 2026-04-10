// ===== Wait for all deferred scripts to load =====
// Since scripts are deferred, DOMContentLoaded fires after they're parsed
document.addEventListener('DOMContentLoaded', () => {

  // --- Initialize Lucide Icons ---
  if (window.lucide) {
    lucide.createIcons();
  }

  // --- Mobile Menu Toggle ---
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }


  // --- Dark Mode Toggle ---
  const themeToggleBtn = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      htmlEl.classList.toggle('dark');
      if (htmlEl.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
      // Re-render icons for correct theme visibility
      if (window.lucide) lucide.createIcons();
    });
  }


  // --- Typing Effect (Typed.js) ---
  if (window.Typed && document.querySelector('.typed-text')) {
    new Typed('.typed-text', {
      strings: ["Hi, I'm <span class='text-teal-600 dark:text-teal-400'>Himanshu Kumar</span>"],
      typeSpeed: 80,
      backSpeed: 50,
      backDelay: 2000,
      startDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });
  }


  // --- Scroll Progress Bar (passive listener for performance) ---
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    if (!scrollProgress) return;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = scrollTop / scrollHeight;
    scrollProgress.style.transform = `scaleX(${scrollPercentage})`;
  }, { passive: true });


  // --- Navbar Logo: HK ↔ Profile Pic on scroll ---
  const navLogo = document.getElementById('navLogo');
  const homeSection = document.getElementById('home');

  if (navLogo && homeSection) {
    const logoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLogo.classList.remove('scrolled');
        } else {
          navLogo.classList.add('scrolled');
        }
      });
    }, {
      threshold: 0.15
    });

    logoObserver.observe(homeSection);
  }

  // --- Scroll Reveal Animations ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Stop observing once revealed (saves CPU)
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // --- Active Navigation State ---
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('text-teal-600', 'dark:text-teal-400', 'font-bold');
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('text-teal-600', 'dark:text-teal-400', 'font-bold');
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: "0px"
  });

  sections.forEach(section => navObserver.observe(section));


  // --- Resume Modal (with lazy iframe loading) ---
  const viewResumeBtn = document.getElementById('viewResumeBtn');
  const resumeModal = document.getElementById('resumeModal');
  const closeModalBtn = document.getElementById('closeModal');
  const modalContent = document.getElementById('modalContent');
  const resumeIframe = document.getElementById('resumeIframe');

  function openModal() {
    if (!resumeModal || !modalContent) return;

    // Lazy-load the PDF: set src from data-src on first open
    if (resumeIframe && !resumeIframe.src && resumeIframe.dataset.src) {
      resumeIframe.src = resumeIframe.dataset.src;
    }

    resumeModal.classList.remove('hidden');
    // Trigger reflow to ensure transition works
    void resumeModal.offsetWidth;
    resumeModal.classList.replace('opacity-0', 'opacity-100');
    modalContent.classList.replace('scale-95', 'scale-100');
    if (window.lucide) lucide.createIcons(); // Reinitialize icons for modal
  }

  function hideModal() {
    if (!resumeModal || !modalContent) return;
    resumeModal.classList.replace('opacity-100', 'opacity-0');
    modalContent.classList.replace('scale-100', 'scale-95');
    setTimeout(() => {
      resumeModal.classList.add('hidden');
    }, 300); // Wait for transition to finish
  }

  if (viewResumeBtn) viewResumeBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);

  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        hideModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal && !resumeModal.classList.contains('hidden')) {
      hideModal();
    }
  });

});