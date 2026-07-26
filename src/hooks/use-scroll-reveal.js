import { useEffect } from 'react';

export function useScrollReveal(dependency) {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length === 0) return;

    // Immediately activate elements already in the viewport
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('active');
      }
    });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px',
      }
    );

    revealElements.forEach(el => {
      if (!el.classList.contains('active')) {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [dependency]);
}
