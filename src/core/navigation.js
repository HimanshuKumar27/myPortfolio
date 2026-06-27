export class NavigationManager {
  constructor({ menuBtnId, mobileMenuId, navLinksSelector, sectionsSelector }) {
    this.menuBtn = document.getElementById(menuBtnId);
    this.mobileMenu = document.getElementById(mobileMenuId);
    this.navLinksSelector = navLinksSelector;
    this.sectionsSelector = sectionsSelector;
    this.init();
  }

  init() {
    this.initMobileMenu();
    this.initScrollSpy();
  }

  initMobileMenu() {
    if (!this.menuBtn || !this.mobileMenu) return;
    
    this.menuBtn.addEventListener('click', () => {
      this.mobileMenu.classList.toggle('hidden');
    });

    const mobileLinks = this.mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        this.mobileMenu.classList.add('hidden');
      });
    });
  }

  initScrollSpy() {
    const sections = document.querySelectorAll(this.sectionsSelector);
    const navLinks = document.querySelectorAll(this.navLinksSelector);
    
    if (sections.length === 0 || navLinks.length === 0) return;

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
  }
}
