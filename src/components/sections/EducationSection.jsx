import React from 'react';
import { GraduationCap, Laptop, BookOpen, Award, School, MapPin } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { education } from '@/data/education.js';

const iconsMap = [
  GraduationCap,
  Laptop,
  BookOpen,
  Award,
  School
];

const accentGradients = [
  'from-teal-500/15 via-emerald-500/10 to-teal-600/15 border-teal-500/40 dark:border-teal-400/30',
  'from-cyan-500/15 via-teal-500/10 to-blue-600/15 border-cyan-500/40 dark:border-cyan-400/30',
  'from-emerald-500/15 via-teal-500/10 to-green-600/15 border-emerald-500/40 dark:border-emerald-400/30',
  'from-blue-500/15 via-indigo-500/10 to-teal-600/15 border-blue-500/40 dark:border-blue-400/30',
  'from-indigo-500/15 via-purple-500/10 to-teal-600/15 border-indigo-500/40 dark:border-indigo-400/30',
];

const badgeColors = [
  'bg-teal-500/15 text-teal-700 dark:text-teal-300 border-teal-400/30',
  'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-400/30',
  'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-400/30',
  'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-400/30',
  'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-400/30',
];

const getBadgeText = (degree) => {
  if (degree.includes('Diploma')) return 'Diploma';
  if (degree.includes('O\' Level')) return 'Certification';
  if (degree.includes('Bachelor')) return 'Graduation';
  if (degree.includes('Intermediate')) return 'Class 12th';
  if (degree.includes('High School')) return 'Class 10th';
  return 'Education';
};

export function EducationSection() {
  return (
    <section id="education" className="container mx-auto py-16 sm:py-20 px-4 sm:px-6 text-center">
      <SectionHeading>Education</SectionHeading>
      <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-10 sm:mb-12 text-base sm:text-lg">
        My academic journey and qualifications in computer science and web technologies.
      </p>

      {/* Sticky Stacking Cards Container (Hover.dev style) */}
      <div className="relative max-w-4xl mx-auto space-y-6 sm:space-y-8 pb-12">
        {education.map((edu, index) => {
          const IconComponent = iconsMap[index % iconsMap.length];
          const gradientStyle = accentGradients[index % accentGradients.length];
          const badgeStyle = badgeColors[index % badgeColors.length];
          const stickyTopOffset = 80 + index * 20;

          return (
            <div
              key={edu.degree}
              style={{ top: `${stickyTopOffset}px` }}
              className={`sticky rounded-2xl border bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-2xl transition-all duration-300 transform origin-top bg-linear-to-br ${gradientStyle}`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 text-left">
                <div className="space-y-2.5 sm:space-y-3 flex-1">
                  {/* Category / Institution Badge */}
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                    <span className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold border ${badgeStyle}`}>
                      <IconComponent className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      {getBadgeText(edu.degree)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
                      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-500" />
                      {edu.location}
                    </span>
                  </div>

                  {/* Degree Title */}
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-display text-teal-950 dark:text-slate-100 leading-snug">
                    {edu.degree}
                  </h3>

                  {/* Institution Details */}
                  <p className="text-sm sm:text-base lg:text-lg font-medium text-teal-700 dark:text-teal-300 flex items-center gap-2">
                    <BuildingIcon className="w-4 h-4 text-teal-500 shrink-0" />
                    {edu.institution}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function BuildingIcon(props) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );
}
