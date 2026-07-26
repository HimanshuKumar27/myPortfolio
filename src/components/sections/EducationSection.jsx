import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card, CardContent } from '@/components/ui/card';
import { education } from '@/data/education.js';

export function EducationSection() {
  return (
    <section id="education" className="container mx-auto py-20 px-6 text-center section-lazy">
      <SectionHeading>Education</SectionHeading>
      <div className="space-y-6">
        {education.map((edu) => (
          <Card key={edu.degree} className="reveal card w-full md:w-3/4 mx-auto text-center border-teal-200/60 dark:border-teal-800/60">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-teal-950 dark:text-slate-100">{edu.degree}</h3>
              <p className="text-teal-600 dark:text-teal-400 font-medium mt-1">{edu.institution}</p>
              <p className="italic text-sm text-teal-800/70 dark:text-slate-400 mt-1">{edu.location}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
