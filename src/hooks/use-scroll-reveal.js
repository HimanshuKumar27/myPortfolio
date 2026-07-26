import { useEffect } from 'react';

export function useScrollReveal(dependency) {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length === 0) return;

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
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    revealElements.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [dependency]);
}
