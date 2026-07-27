import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, MonitorOff, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RoundedSlideButton } from '@/components/ui/button';
import { projects } from '@/data/projects.js';

function ProjectMediaCard({ project }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative group w-full rounded-2xl border border-teal-200/80 dark:border-teal-800/60 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl p-2.5 sm:p-4 transition-all duration-500 hover:shadow-teal-500/10">
      {/* Background Glow */}
      <div className="absolute -inset-1 bg-linear-to-r from-teal-500/20 via-emerald-500/20 to-teal-600/20 rounded-2xl blur-xl opacity-40 group-hover:opacity-75 transition duration-500 -z-10" />

      {/* Header Info */}
      <div className="flex items-center justify-between mb-2.5 px-1.5 pt-1">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-emerald-500" />
          </span>
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-teal-800 dark:text-teal-300">
            Preview
          </span>
        </div>
        <span className="text-[10px] sm:text-xs font-mono font-bold text-teal-600/70 dark:text-teal-400/70 truncate max-w-37.5 sm:max-w-none">
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
            <MonitorOff className="w-8 h-8 sm:w-10 sm:h-10 text-teal-500/50" />
            <span className="text-[10px] sm:text-xs font-medium">Preview Unavailable</span>
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

function ProjectTextCard({ project }) {
  return (
    <div className="w-full space-y-4 sm:space-y-5 p-4 sm:p-8 rounded-2xl border border-teal-200/60 dark:border-teal-800/60 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl text-left">
      <h3 className="text-xl sm:text-3xl lg:text-4xl font-extrabold font-display text-teal-950 dark:text-slate-100 leading-tight">
        {project.title}
      </h3>

      <p className="text-xs sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
        {project.description}
      </p>

      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 pt-3.5 border-t border-teal-100 dark:border-teal-800/40">
        {project.liveUrl ? (
          <RoundedSlideButton
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            className="py-2 px-3.5 sm:py-2.5 sm:px-5 text-xs sm:text-sm"
          >
            <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Live Demo
          </RoundedSlideButton>
        ) : (
          <span className="text-xs text-slate-400 italic">No Live Link</span>
        )}

        <RoundedSlideButton
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          className="py-2 px-3.5 sm:py-2.5 sm:px-5 text-xs sm:text-sm"
        >
          <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> View Source <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </RoundedSlideButton>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Pre-fetch screenshot URLs on mount
  useEffect(() => {
    projects.forEach((project) => {
      if (project.screenshot) {
        const img = new Image();
        img.src = project.screenshot;
      }
    });
  }, []);

  // Desktop opposite scroll calculation
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalHeight = rect.height - window.innerHeight;
      if (totalHeight <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalHeight));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalProjects = projects.length;
  const activeStep = scrollProgress * (totalProjects - 1);

  return (
    <section id="projects" className="py-14 sm:py-20 px-4 sm:px-6 text-center">
      <SectionHeading className="mb-12 sm:mb-24">Projects</SectionHeading>

      {/* Desktop View: Hover.dev Opposite Scroll Content (Sticky Runway + Opposite Direction Motion per Pair) */}
      <div ref={containerRef} className="hidden lg:block relative h-[320vh]">
        <div className="sticky top-24 h-[80vh] overflow-hidden flex items-center justify-center">
          <div className="w-full max-w-6xl grid grid-cols-12 gap-12 items-center relative h-full">
            {/* Left Column: Project Text Descriptions (Moves UPWARDS into view) */}
            <div className="col-span-6 relative h-full flex items-center justify-center">
              {projects.map((project, index) => {
                const delta = index - activeStep;
                const translateY = delta * 120; // Enters from +120%, exits to -120% (moves UP)
                const opacity = Math.max(0, 1 - Math.abs(delta) * 1.3);

                return (
                  <div
                    key={`text-${project.title}`}
                    style={{
                      transform: `translateY(${translateY}%)`,
                      opacity: opacity,
                      pointerEvents: opacity > 0.5 ? 'auto' : 'none',
                      transition: 'transform 0.12s ease-out, opacity 0.12s ease-out'
                    }}
                    className="absolute inset-x-0 flex items-center justify-center"
                  >
                    <ProjectTextCard project={project} />
                  </div>
                );
              })}
            </div>

            {/* Right Column: Project Screenshots (Moves DOWNWARDS in OPPOSITE direction into view) */}
            <div className="col-span-6 relative h-full flex items-center justify-center">
              {projects.map((project, index) => {
                const delta = index - activeStep;
                const translateY = -delta * 120; // Enters from -120%, exits to +120% (moves DOWN)
                const opacity = Math.max(0, 1 - Math.abs(delta) * 1.3);

                return (
                  <div
                    key={`media-${project.title}`}
                    style={{
                      transform: `translateY(${translateY}%)`,
                      opacity: opacity,
                      pointerEvents: opacity > 0.5 ? 'auto' : 'none',
                      transition: 'transform 0.12s ease-out, opacity 0.12s ease-out'
                    }}
                    className="absolute inset-x-0 flex items-center justify-center"
                  >
                    <ProjectMediaCard project={project} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / Tablet View: Responsive Card List */}
      <div className="lg:hidden space-y-12 sm:space-y-16 max-w-2xl mx-auto">
        {projects.map((project) => (
          <div key={`mobile-${project.title}`} className="space-y-4 sm:space-y-6">
            <ProjectMediaCard project={project} />
            <ProjectTextCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}
