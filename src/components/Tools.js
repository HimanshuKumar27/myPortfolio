import { tools } from '../data/tools.js';

/**
   * Renders the tools grid cards into the specified DOM container.
   * @param {string} containerId - The ID of the target container element.
   */
export function renderTools(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = tools.map(tool => {
    let iconHtml = '';
    
    if (tool.type === 'devicon') {
      iconHtml = `<i class="${tool.iconClass} text-5xl" aria-hidden="true"></i>`;
    } else if (tool.type === 'image') {
      const imgClass = tool.name === 'Antigravity'
        ? 'w-12 h-12 rounded-lg object-cover shadow-sm border border-teal-200/30'
        : 'w-12 h-12';
        
      iconHtml = `<img src="${tool.imageUrl}" class="${imgClass}" alt="${tool.name} Logo" loading="lazy" width="48" height="48" />`;
    }

    return `
      <div class="reveal card-glass spotlight-card flex flex-col items-center">
        <div class="spotlight-card-glow"></div>
        ${iconHtml}
        <span class="mt-2 font-medium">${tool.name}</span>
      </div>
    `;
  }).join('');
}
