import { projects } from '../data/projects.js';

/**
 * Renders the portfolio projects cards into the specified DOM container.
 * Each card includes a live screenshot preview above the project description.
 * @param {string} containerId - The ID of the target container element.
 */
export function renderProjects(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  // IntersectionObserver: fires network request only when a card is
  // 300 px away from entering the viewport — zero wasted requests on load.
  const observeScreenshots = () => {
    const imgs = container.querySelectorAll('img[data-src]');
    if (!imgs.length) return;

    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      });
    }, { rootMargin: '300px 0px' });

    imgs.forEach(img => io.observe(img));
  };

  container.innerHTML = projects.map(project => {
    const liveDemoHtml = project.liveUrl
      ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer"
            class="text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-200 font-medium inline-flex items-center gap-1.5 transition">
            <i data-lucide="external-link" class="w-4 h-4"></i> Live Demo
          </a>`
      : `<span class="text-teal-600/40 dark:text-slate-500/40 font-medium inline-flex items-center gap-1.5 cursor-not-allowed select-none" title="Live demo not available for this project">
            <i data-lucide="external-link" class="w-4 h-4"></i> Live Demo
          </span>`;



    // Screenshot block — shimmer while loading, fallback icon when unavailable
    // Uses data-src (not src) so the browser fires zero network requests until
    // the IntersectionObserver below brings the card near the viewport.
    const screenshotHtml = project.screenshot
      ? `<div class="project-screenshot-wrapper">
            <div class="project-screenshot-shimmer"></div>
            <a href="${project.liveUrl || project.githubUrl}" target="_blank" rel="noopener noreferrer" tabindex="-1" aria-hidden="true">
              <img
                data-src="${project.screenshot}"
                alt="${project.title} screenshot"
                class="project-screenshot-img"
                decoding="async"
                fetchpriority="low"
                onload="this.previousElementSibling.style.display='none'"
                onerror="this.closest('.project-screenshot-wrapper').innerHTML='<div class=\'project-screenshot-fallback\'><svg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'1.5\'><rect x=\'2\' y=\'3\' width=\'20\' height=\'14\' rx=\'2\'/><path d=\'M8 21h8M12 17v4\'/></svg><span>Preview Unavailable</span></div>'"
              />
            </a>
          </div>`
      : `<div class="project-screenshot-wrapper">
           <div class="project-screenshot-fallback">
             <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
               <rect x="2" y="3" width="20" height="14" rx="2"/>
               <path d="M8 21h8M12 17v4"/>
             </svg>
             <span>No Preview Available</span>
           </div>
         </div>`;

    return `
      <div class="reveal card-glass spotlight-card project-card flex flex-col text-left">
        <div class="spotlight-card-glow"></div>
        ${screenshotHtml}
        <div class="project-card-body flex flex-col flex-1">
          <div class="flex-1">
            <h3 class="text-xl font-semibold mb-2 text-center md:text-left">${project.title}</h3>
            <p class="text-teal-800/90 dark:text-slate-300 mb-4">${project.description}</p>
          </div>
          <div class="flex items-center justify-between mt-auto border-t border-teal-100/50 dark:border-teal-800/30 pt-4">
            ${liveDemoHtml}
            <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer"
              class="text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-200 font-medium inline-flex items-center gap-1.5 transition">
              <i data-lucide="github" class="w-4 h-4"></i> View on GitHub
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Wire up lazy-loader after innerHTML is set
  observeScreenshots();
}
