import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { tools } from '@/data/tools.js';

export function ToolsSection() {
  return (
    <section id="tools" className="container mx-auto py-20 px-6 text-center section-lazy">
      <SectionHeading>Tools & Technology</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        {tools.map((tool) => {
          let iconHtml = null;

          if (tool.type === 'devicon') {
            iconHtml = <i className={`${tool.iconClass} text-5xl`} aria-hidden="true" />;
          } else if (tool.type === 'image') {
            const imgClass =
              tool.name === 'Antigravity'
                ? 'w-12 h-12 rounded-lg object-cover shadow-sm border border-teal-200/30'
                : tool.name === 'GitHub' || tool.name === 'Vercel'
                ? 'w-12 h-12 dark:invert'
                : 'w-12 h-12';

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
              className="flex flex-col items-center justify-center p-6"
            >
              {iconHtml}
              <span className="mt-3 font-medium">{tool.name}</span>
            </SpotlightCard>
          );
        })}
      </div>
    </section>
  );
}
