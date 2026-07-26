import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Github, MonitorOff } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { projects } from '@/data/projects.js';

function ProjectScreenshot({ project }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (!project.screenshot) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '300px 0px' }
    );

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => observer.disconnect();
  }, [project.screenshot]);

  if (!project.screenshot || error) {
    return (
      <div className="project-screenshot-wrapper">
        <div className="project-screenshot-fallback">
          <MonitorOff className="w-10 h-10 text-teal-600/50 dark:text-teal-400/35" />
          <span>{error ? 'Preview Unavailable' : 'No Preview Available'}</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className="project-screenshot-wrapper">
      {!loaded && <div className="project-screenshot-shimmer" />}
      <a
        href={project.liveUrl || project.githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden="true"
      >
        {shouldLoad && (
          <img
            src={project.screenshot}
            alt={`${project.title} screenshot`}
            className="project-screenshot-img"
            decoding="async"
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
        )}
      </a>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="container mx-auto py-20 px-6 text-center section-lazy">
      <SectionHeading>Projects</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
        {projects.map((project) => (
          <SpotlightCard
            key={project.title}
            className="project-card flex flex-col h-full"
          >
            <ProjectScreenshot project={project} />

            <div className="project-card-body flex flex-col flex-1">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 text-center md:text-left text-teal-950 dark:text-slate-100">
                  {project.title}
                </h3>
                <p className="text-teal-800/90 dark:text-slate-300 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex items-center justify-between mt-auto border-t border-teal-100/50 dark:border-teal-800/30 pt-4 text-sm">
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-200 font-medium inline-flex items-center gap-1.5 transition"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                ) : (
                  <span
                    className="text-teal-600/40 dark:text-slate-500/40 font-medium inline-flex items-center gap-1.5 cursor-not-allowed select-none"
                    title="Live demo not available for this project"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </span>
                )}

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 dark:text-teal-400 hover:text-teal-800 dark:hover:text-teal-200 font-medium inline-flex items-center gap-1.5 transition"
                >
                  <Github className="w-4 h-4" /> View on GitHub
                </a>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
