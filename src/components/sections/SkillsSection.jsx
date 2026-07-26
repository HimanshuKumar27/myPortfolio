import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { skills } from '@/data/skills.js';

export function SkillsSection() {
  return (
    <section id="skills" className="container mx-auto py-20 px-6 text-center section-lazy">
      <SectionHeading>Skills</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
        {skills.map((skill) => (
          <SpotlightCard
            key={skill.name}
            className="flex flex-col items-center justify-center p-6"
          >
            <i className={`${skill.iconClass} text-5xl`} aria-hidden="true" />
            <span className="mt-3 font-medium">{skill.name}</span>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
