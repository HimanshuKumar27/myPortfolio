import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, MonitorOff, Sparkles, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RoundedSlideButton } from '@/components/ui/button';
import { projects } from '@/data/projects.js';

function ProjectMediaCard({ project }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative group w-full rounded-2xl border border-teal-200/80 dark:border-teal-800/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl p-3 sm:p-4 transition-all duration-500 hover:shadow-teal-500/10">
      {/* Background Glow */}
      <div className="absolute -inset-1 bg-linear-to-r from-teal-500/20 via-emerald-500/20 to-teal-600/20 rounded-2xl blur-xl opacity-40 group-hover:opacity-75 transition duration-500 -z-10" />

      {/* Header Info */}
      <div className="flex items-center justify-between mb-3 px-2 pt-1">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-teal-800 dark:text-teal-300">
            Preview
          </span>
        </div>
        <span className="text-xs font-mono font-bold text-teal-600/70 dark:text-teal-400/70">
          {project.title}
        </span>
      </div>

      {/* Screenshot Container */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-teal-950/10 dark:bg-slate-950/60 border border-teal-100/60 dark:border-teal-800/40">
        {!loaded && !error && (
          <div className="absolute inset-0 bg-linear-to-r from-teal-100/40 via-teal-200/50 to-teal-100/40 dark:from-slate-800/60 dark:via-slate-700/60 dark:to-slate-800/60 animate-pulse" />
        )}

        {error || !project.screenshot ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-400">
            <MonitorOff className="w-10 h-10 text-teal-500/50" />
            <span className="text-xs font-medium">Preview Unavailable</span>
          </div>
        ) : (
          <a
            href={project.liveUrl || project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={-1}
          >
            <img
              src={project.screenshot}
              alt={`${project.title} screenshot`}
              className={`w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 ${
                loaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
            />
          </a>
        )}
      </div>
    </div>
  );
}

export function ProjectsSection() {
  // Automatically trigger screenshot requests for all projects as soon as the website opens
  useEffect(() => {
    projects.forEach((project) => {
      if (project.screenshot) {
        const img = new Image();
        img.src = project.screenshot;
      }
    });
  }, []);
  return (
    <section id="projects" className="container mx-auto py-20 px-6 text-center">
      <SectionHeading className="mb-16 sm:mb-24">Projects</SectionHeading>

      {/* Hover.dev Swap Column Layout (Alternating Columns on Scroll) */}
      <div className="space-y-24 sm:space-y-36">
        {projects.map((project, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={project.title}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left"
            >
              {/* Media Image Column */}
              <div
                className={`lg:col-span-6 ${
                  isEven ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <ProjectMediaCard project={project} />
              </div>

              {/* Text Description Column */}
              <div
                className={`lg:col-span-6 ${
                  isEven ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="space-y-5 p-2 sm:p-4">
                  {/* Title */}
                  <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-teal-950 dark:text-slate-100 leading-tight">
                    {project.title}
                  </h3>

                  {/* Description Paragraph (scrolls smoothly alongside image) */}
                  <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-teal-100 dark:border-teal-800/40">
                    {project.liveUrl ? (
                      <RoundedSlideButton
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="primary"
                        className="py-2.5 px-5 text-sm"
                      >
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </RoundedSlideButton>
                    ) : (
                      <span className="text-xs text-slate-400 italic">No Live Link</span>
                    )}

                    <RoundedSlideButton
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outline"
                      className="py-2.5 px-5 text-sm"
                    >
                      <Github className="w-4 h-4" /> View Source Code <ArrowUpRight className="w-3.5 h-3.5" />
                    </RoundedSlideButton>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
