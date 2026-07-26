import React, { useState } from 'react';
import { cn } from '@/lib/utils';

export function SectionHeading({ children, className = '' }) {
  const [displayText, setDisplayText] = useState(children);
  const [isScrambling, setIsScrambling] = useState(false);
  const originalText = children;

  const handleMouseEnter = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    const chars = '!<>-_\\/[]{}—=+*^?#________';
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText(
        originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= originalText.length) {
        clearInterval(interval);
        setDisplayText(originalText);
        setIsScrambling(false);
      }
      iteration += 1 / 2.5;
    }, 25);
  };

  return (
    <h2
      onMouseEnter={handleMouseEnter}
      className={cn(
        'reveal text-4xl font-display font-bold tracking-tight text-teal-950 dark:text-slate-100 mb-6 border-b-2 border-teal-500 dark:border-teal-600 pb-2 inline-block cursor-default select-none',
        className
      )}
    >
      {displayText}
    </h2>
  );
}
