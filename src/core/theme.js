export class ThemeManager {
  constructor(toggleBtnId, onThemeChange) {
    this.toggleBtn = document.getElementById(toggleBtnId);
    this.htmlEl = document.documentElement;
    this.onThemeChange = onThemeChange;
    this.init();
  }

  init() {
    if (!this.toggleBtn) return;
    this.toggleBtn.addEventListener('click', () => this.toggle());
  }

  toggle() {
    this.htmlEl.classList.toggle('dark');
    const isDark = this.htmlEl.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    if (typeof this.onThemeChange === 'function') {
      this.onThemeChange(isDark);
    }
  }

  static getTheme() {
    return localStorage.getItem('theme') || 'light';
  }
}
