import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { Button } from '@/components/ui/button';

export function HeroSection({ onOpenResume }) {
  return (
    <section id="home" className="hero-section">
      {/* Fixed Floating Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="bg-blob bg-blob-1 -top-20 -left-20" />
        <div className="bg-blob bg-blob-2 top-1/3 -right-40" />
        <div className="bg-blob bg-blob-3 bottom-10 left-1/4" />
      </div>

      {/* Profile Image */}
      <img
        src="/assets/profile_image.webp"
        alt="Himanshu Kumar"
        width="192"
        height="192"
        fetchPriority="high"
        decoding="async"
        className="reveal relative z-10 mb-6 profile-img"
      />

      {/* Typing Effect Title */}
      <h1 className="reveal text-5xl md:text-7xl font-bold font-display tracking-tight text-teal-950 dark:text-slate-100 mb-4 relative z-10 min-h-16 flex items-center justify-center">
        <span>Hi, I'm&nbsp;</span>
        <TypeAnimation
          sequence={[
            'Himanshu Kumar',
            2000,
          ]}
          wrapper="span"
          speed={40}
          className="text-teal-600 dark:text-teal-400"
          repeat={Infinity}
        />
      </h1>

      <p className="reveal text-lg md:text-xl max-w-2xl dark:text-slate-300 relative z-10">
        Front-End Developer || Focused On Modern Tech Skills
      </p>

      <Button
        variant="gradient"
        size="lg"
        onClick={onOpenResume}
        className="reveal relative z-10 mt-6"
      >
        View Resume
      </Button>
    </section>
  );
}
