import './styles/main.css';
import { renderSkills } from './components/Skills.js';
import { renderTools } from './components/Tools.js';
import { renderProjects } from './components/Projects.js';
import { renderCertifications } from './components/Certifications.js';
import { renderEducation } from './components/Education.js';

import { IconManager } from './core/icons.js';
import { ThemeManager } from './core/theme.js';
import { NavigationManager } from './core/navigation.js';
import { AnimationManager } from './core/animations.js';
import { ModalManager } from './core/modal.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Render all dynamic UI components
  renderSkills('skills-container');
  renderTools('tools-container');
  renderProjects('projects-container');
  renderCertifications('certifications-container');
  renderEducation('education-container');

  // 2. Initialize Centralized Icon Manager
  IconManager.init();

  // 3. Instantiate theme controller
  new ThemeManager('themeToggle', () => {
    // Re-initialize icons on theme toggle to maintain correct visibility state
    IconManager.init();
  });

  // 4. Instantiate navigation controller (Mobile menu & Viewport scroll spy)
  new NavigationManager({
    menuBtnId: 'menuBtn',
    mobileMenuId: 'mobileMenu',
    navLinksSelector: '.nav-links a',
    sectionsSelector: 'section'
  });

  // 5. Instantiate animation controller (Reveal animations & Scroll indicators)
  new AnimationManager({
    scrollProgressId: 'scrollProgress',
    revealElementsSelector: '.reveal',
    navLogoId: 'navLogo',
    homeSectionId: 'home'
  });

  // 6. Instantiate resume modal controller (with lazy iframe rendering)
  new ModalManager({
    openBtnId: 'viewResumeBtn',
    modalId: 'resumeModal',
    closeBtnId: 'closeModal',
    contentId: 'modalContent',
    iframeId: 'resumeIframe',
    onOpen: () => {
      // Re-initialize icons inside modal
      IconManager.init();
    }
  });

  // 7. Initialize Typing Effect (Typed.js)
  if (window.Typed && document.querySelector('.typed-text')) {
    new window.Typed('.typed-text', {
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
});
