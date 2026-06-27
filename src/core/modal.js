export class ModalManager {
  constructor({ openBtnId, modalId, closeBtnId, contentId, iframeId, onOpen }) {
    this.openBtn = document.getElementById(openBtnId);
    this.modal = document.getElementById(modalId);
    this.closeBtn = document.getElementById(closeBtnId);
    this.content = document.getElementById(contentId);
    this.iframe = document.getElementById(iframeId);
    this.onOpen = onOpen;
    this.init();
  }

  init() {
    if (!this.modal) return;

    if (this.openBtn) {
      this.openBtn.addEventListener('click', () => this.open());
    }

    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
        this.close();
      }
    });
  }

  open() {
    if (!this.modal || !this.content) return;

    // Lazy load the PDF from data-src
    if (this.iframe && !this.iframe.src && this.iframe.dataset.src) {
      this.iframe.src = this.iframe.dataset.src;
    }

    this.modal.classList.remove('hidden');
    // Force browser reflow to trigger CSS transitions
    void this.modal.offsetWidth;
    this.modal.classList.replace('opacity-0', 'opacity-100');
    this.content.classList.replace('scale-95', 'scale-100');

    if (typeof this.onOpen === 'function') {
      this.onOpen();
    }
  }

  close() {
    if (!this.modal || !this.content) return;

    this.modal.classList.replace('opacity-100', 'opacity-0');
    this.content.classList.replace('scale-100', 'scale-95');

    setTimeout(() => {
      this.modal.classList.add('hidden');
    }, 300); // Sync with CSS transition durations
  }
}
