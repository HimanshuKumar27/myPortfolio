import { skills } from '../data/skills.js';

/**
   * Renders the skills grid cards into the specified DOM container.
   * @param {string} containerId - The ID of the target container element.
   */
export function renderSkills(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = skills.map(skill => `
    <div class="reveal card flex flex-col items-center">
      <i class="${skill.iconClass} text-5xl" aria-hidden="true"></i>
      <span class="mt-2 font-medium">${skill.name}</span>
    </div>
  `).join('');
}
