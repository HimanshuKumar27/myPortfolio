lucide.createIcons();

    // Mobile menu toggle
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

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

    // Resume Modal
    const viewResumeBtn = document.getElementById('viewResumeBtn');
    const resumeModal = document.getElementById('resumeModal');
    const closeModal = document.getElementById('closeModal');

    viewResumeBtn.addEventListener('click', () => {
      resumeModal.classList.remove('hidden');
      lucide.createIcons(); // Reinitialize icons for modal
    });

    closeModal.addEventListener('click', () => {
      resumeModal.classList.add('hidden');
    });

    // Close modal when clicking outside
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        resumeModal.classList.add('hidden');
      }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !resumeModal.classList.contains('hidden')) {
        resumeModal.classList.add('hidden');
      }
    });