import React from 'react';
import { Sparkles, Compass, Code2, Terminal, Cpu, Tv, Quote } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

export function AboutSection() {
  const interests = [
    { label: 'Web Applications', icon: Code2 },
    { label: 'Exploring AI', icon: Cpu },
    { label: 'Automation', icon: Terminal },
    { label: 'Anime & Gaming', icon: Tv },
  ];

  return (
    <section id="about" className="container mx-auto py-14 sm:py-20 px-4 sm:px-6 text-center">
      <SectionHeading>About Me</SectionHeading>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 text-left">
        {/* Left Card: Story & Curiosity */}
        <div className="lg:col-span-7">
          <SpotlightCard className="p-5 sm:p-8 lg:p-10 h-full flex flex-col justify-between border-teal-200/60 dark:border-teal-800/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl shadow-xl">
            <div className="space-y-3.5 sm:space-y-4">
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                <Sparkles className="w-4 h-4 shrink-0" /> Code & Curiosity
              </div>

              <p className="text-sm sm:text-base lg:text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
                Fueled by curiosity, late-night coding sessions, and the occasional{' '}
                <span className="italic font-semibold text-teal-600 dark:text-teal-400">
                  "it worked on the first try"
                </span>{' '}
                miracle. I enjoy building modern web applications, exploring AI, automating boring tasks, and turning random ideas into real projects. When I'm not debugging code (or creating new bugs), you'll probably find me watching anime, exploring the latest tech, gaming, or wondering why a one-line CSS change somehow broke the entire layout.
              </p>
            </div>

            {/* Interest Badges */}
            <div className="mt-6 pt-5 border-t border-teal-100 dark:border-teal-800/40 flex flex-wrap gap-2 sm:gap-3">
              {interests.map((item) => {
                const IconComponent = item.icon;
                return (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-xs font-semibold bg-teal-500/10 text-teal-800 dark:text-teal-300 border border-teal-500/20"
                  >
                    <IconComponent className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                    {item.label}
                  </span>
                );
              })}
            </div>
          </SpotlightCard>
        </div>

        {/* Right Card: Mindset & Goal */}
        <div className="lg:col-span-5 flex flex-col gap-5 sm:gap-6">
          <SpotlightCard className="p-5 sm:p-8 lg:p-10 flex-1 flex flex-col justify-between border-teal-200/60 dark:border-teal-800/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl rounded-2xl shadow-xl">
            <div className="space-y-3.5 sm:space-y-4">
              <div className="flex items-center gap-2 text-teal-600 dark:text-teal-400 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                <Compass className="w-4 h-4 shrink-0" /> Mindset & Goal
              </div>

              <p className="text-sm sm:text-base lg:text-lg text-slate-700 dark:text-slate-200 leading-relaxed">
                I believe learning never really stops—every project teaches something new, every challenge is a chance to improve, and every error message is just another puzzle waiting to be solved. My goal is simple: build products that people enjoy using, keep growing as a developer, and have fun along the way.
              </p>
            </div>
          </SpotlightCard>

          {/* Quote Card */}
          <div className="relative group p-4 sm:p-6 rounded-2xl border border-teal-300/40 dark:border-teal-700/40 bg-linear-to-r from-teal-500/15 via-emerald-500/10 to-cyan-500/15 backdrop-blur-xl shadow-lg">
            <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-teal-500/40 mb-2" />
            <p className="text-xs sm:text-sm lg:text-base italic font-medium text-teal-950 dark:text-slate-100 leading-snug">
              "After all, life is too short for ugly UIs, unoptimized code and for tall peoples."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
