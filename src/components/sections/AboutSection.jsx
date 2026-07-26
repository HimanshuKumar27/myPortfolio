import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';

export function AboutSection() {
  return (
    <section id="about" className="container mx-auto py-20 px-6 text-center section-lazy">
      <SectionHeading>About Me</SectionHeading>
      <p className="reveal text-lg leading-relaxed max-w-3xl mx-auto dark:text-slate-300">
        A Front-End Developer passionate about building responsive and user-friendly websites. I focus on web
        technologies like HTML, CSS, JavaScript, TailwindCSS, and other frameworks. I've also gained certifications in web
        development and modern tools. <br /><br />
        I enjoy learning new technologies, and continuously improving my skills to grow as a developer. I'm eager to connect with other programmers and industry professionals to learn and grow in the field of web development.
      </p>
    </section>
  );
}
