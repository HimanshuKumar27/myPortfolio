import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { tools } from '@/data/tools.js';

export function ToolsSection() {
  return (
    <section id="tools" className="container mx-auto py-16 sm:py-20 px-4 sm:px-6 text-center">
      <SectionHeading>Tools & Technology</SectionHeading>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 justify-center">
        {tools.map((tool) => {
          let iconHtml = null;

          if (tool.type === 'devicon') {
            iconHtml = <i className={`${tool.iconClass} text-4xl sm:text-5xl`} aria-hidden="true" />;
          } else if (tool.type === 'image') {
            const imgClass =
              tool.name === 'Antigravity'
                ? 'w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover shadow-sm border border-teal-200/30'
                : tool.name === 'GitHub' || tool.name === 'Vercel'
                ? 'w-10 h-10 sm:w-12 sm:h-12 dark:invert object-contain'
                : 'w-10 h-10 sm:w-12 sm:h-12 object-contain';

            iconHtml = (
              <img
                src={tool.imageUrl}
                className={imgClass}
                alt={`${tool.name} Logo`}
                loading="lazy"
                width="48"
                height="48"
              />
            );
          }

          return (
            <SpotlightCard
              key={tool.name}
              className="flex flex-col items-center justify-center p-5 sm:p-6 transition-transform transform hover:-translate-y-1"
            >
              {iconHtml}
              <span className="mt-2.5 text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200">
                {tool.name}
              </span>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}
