import { certifications } from '../data/certifications.js';

/**
   * Renders the certifications cards into the specified DOM container.
   * @param {string} containerId - The ID of the target container element.
   */
export function renderCertifications(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = certifications.map(cert => `
    <div class="reveal card text-left">
      <div class="flex items-center mb-2 space-x-2">
        <i data-lucide="award" class="w-5 h-5 text-teal-600" aria-hidden="true"></i>
        <h3 class="text-xl font-semibold">${cert.title}</h3>
      </div>
      <span class="inline-block bg-teal-500 text-white text-xs font-semibold px-3 py-1 rounded-full mb-2">
        ${cert.issuer}
      </span>
      <p class="text-sm text-teal-600/80 dark:text-teal-400/80 italic">Issued ${cert.date}</p>
      <p class="text-teal-800/90 dark:text-slate-300 text-sm mt-2">
        ${cert.description}
      </p>
      <a href="${cert.link}" target="_blank" rel="noopener noreferrer"
        class="inline-block mt-4 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition">
        View Certificate
      </a>
    </div>
  `).join('');
}
