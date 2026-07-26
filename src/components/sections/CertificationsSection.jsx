import React from 'react';
import { Award } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Badge } from '@/components/ui/badge';
import { certifications } from '@/data/certifications.js';

export function CertificationsSection() {
  return (
    <section id="certifications" className="container mx-auto py-20 px-6 text-center section-lazy">
      <SectionHeading>Certifications</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center text-left">
        {certifications.map((cert) => (
          <SpotlightCard key={cert.title} className="p-6">
            <div className="flex items-center mb-2 space-x-2">
              <Award className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" aria-hidden="true" />
              <h3 className="text-xl font-semibold text-teal-950 dark:text-slate-100">{cert.title}</h3>
            </div>
            <div className="mb-2">
              <Badge variant="default">{cert.issuer}</Badge>
            </div>
            <p className="text-sm text-teal-600/80 dark:text-teal-400/80 italic">Issued {cert.date}</p>
            <p className="text-teal-800/90 dark:text-slate-300 text-sm mt-2 leading-relaxed">
              {cert.description}
            </p>
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
            >
              View Certificate
            </a>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
