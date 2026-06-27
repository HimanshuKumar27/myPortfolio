import { projects } from '../data/projects.js';

/**
   * Renders the portfolio projects cards into the specified DOM container.
   * @param {string} containerId - The ID of the target container element.
   */
export function renderProjects(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = projects.map(project => {
    const liveDemoHtml = project.liveUrl
      ? `<a href="${project.liveUrl}" target="_blank" rel="noopener noreferrer"
            class="text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-200 font-medium inline-flex items-center gap-1.5 transition">
            <i data-lucide="external-link" class="w-4 h-4"></i> Live Demo
          </a>`
      : `<span class="text-teal-600/40 dark:text-slate-500/40 font-medium inline-flex items-center gap-1.5 cursor-not-allowed select-none" title="Live demo not available for this project">
            <i data-lucide="external-link" class="w-4 h-4"></i> Live Demo
          </span>`;

    return `
      <div class="reveal card flex flex-col justify-between text-left">
        <div>
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
    `;
  }).join('');
}
