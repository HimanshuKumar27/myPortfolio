import { useEffect } from 'react';

export function useSpotlight() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!e.target || typeof e.target.closest !== 'function') return;
      const card = e.target.closest('.spotlight-card');
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
}
