import React from 'react';
import { Award } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Badge } from '@/components/ui/badge';
import { RoundedSlideButton } from '@/components/ui/button';
import { certifications } from '@/data/certifications.js';

export function CertificationsSection() {
  return (
    <section id="certifications" className="container mx-auto py-14 sm:py-20 px-4 sm:px-6 text-center">
      <SectionHeading>Certifications</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 justify-center text-left">
        {certifications.map((cert) => (
          <SpotlightCard key={cert.title} className="p-5 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center mb-2 space-x-2">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600 dark:text-teal-400 shrink-0" aria-hidden="true" />
                <h3 className="text-lg sm:text-xl font-semibold text-teal-950 dark:text-slate-100">{cert.title}</h3>
              </div>
              <div className="mb-2">
                <Badge variant="default">{cert.issuer}</Badge>
              </div>
              <p className="text-xs sm:text-sm text-teal-600/80 dark:text-teal-400/80 italic">Issued {cert.date}</p>
              <p className="text-xs sm:text-sm text-teal-800/90 dark:text-slate-300 mt-2 leading-relaxed">
                {cert.description}
              </p>
            </div>
            <div className="mt-4 sm:mt-5">
              <RoundedSlideButton
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="text-xs sm:text-sm py-2 px-4"
              >
                View Certificate
              </RoundedSlideButton>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
