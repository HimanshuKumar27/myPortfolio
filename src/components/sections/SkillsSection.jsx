import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { skills } from '@/data/skills.js';

export function SkillsSection() {
  return (
    <section id="skills" className="container mx-auto py-16 sm:py-20 px-4 sm:px-6 text-center">
      <SectionHeading>Skills</SectionHeading>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 justify-center">
        {skills.map((skill) => (
          <SpotlightCard
            key={skill.name}
            className="flex flex-col items-center justify-center p-5 sm:p-6 transition-transform transform hover:-translate-y-1"
          >
            {skill.imageUrl ? (
              <img
                src={skill.imageUrl}
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                alt={`${skill.name} Logo`}
                loading="lazy"
                width="48"
                height="48"
              />
            ) : (
              <i className={`${skill.iconClass} text-4xl sm:text-5xl`} aria-hidden="true" />
            )}
            <span className="mt-2.5 text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200">
              {skill.name}
            </span>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
