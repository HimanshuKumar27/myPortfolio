import React from 'react';
import { cn } from '@/lib/utils';

export function SpotlightCard({ children, className = '', ...props }) {
  return (
    <div
      className={cn('reveal card-glass spotlight-card', className)}
      {...props}
    >
      <div className="spotlight-card-glow" />
      {children}
    </div>
  );
}
