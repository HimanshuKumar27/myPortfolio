import { education } from '../data/education.js';

/**
   * Renders the education cards into the specified DOM container.
   * @param {string} containerId - The ID of the target container element.
   */
export function renderEducation(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = education.map(edu => `
    <div class="reveal card w-full md:w-3/4 mx-auto text-center">
      <div>
        <h3 class="text-xl font-semibold">${edu.degree}</h3>
        <p class="text-teal-600 dark:text-teal-400">${edu.institution}</p>
      </div>
      <p class="italic dark:text-slate-400">${edu.location}</p>
    </div>
  `).join('');
}
