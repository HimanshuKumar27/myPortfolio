import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { RoundedSlideButton } from '@/components/ui/button';

export function HeroSection({ onOpenResume }) {
  const scrollToContact = (e) => {
    e.preventDefault();
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      const navOffset = 80;
      const elementPosition = contactEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-28 sm:pt-32 pb-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Fixed Floating Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="bg-blob bg-blob-1 -top-20 -left-20" />
        <div className="bg-blob bg-blob-2 top-1/3 -right-40" />
        <div className="bg-blob bg-blob-3 bottom-10 left-1/4" />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Text Column */}
        <div className="lg:col-span-8 text-left">
          {/* Main Giant Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-teal-950 dark:text-slate-50 mb-4 leading-tight sm:leading-none">
            Hi, I'm Himanshu Kumar
            <span className="text-teal-500 dark:text-teal-400 inline-block animate-pulse">.</span>
          </h1>

          {/* Subtitle with Typewriter Role */}
          <h2 className="text-xl sm:text-3xl lg:text-4xl font-medium text-slate-700 dark:text-slate-300 mb-6">
            A{' '}
            <TypeAnimation
              sequence={[
                'Front-End Developer',
                2500,
                'UI Developer',
                2500,
                'Web Technologies Enthusiast',
                2500,
              ]}
              wrapper="span"
              speed={40}
              className="text-teal-600 dark:text-teal-400 font-bold"
              repeat={Infinity}
            />
          </h2>

          {/* Friendly Description Bio */}
          <p className="text-base sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed mb-8">
            Focused on building responsive, modern, and user-friendly web applications. Passionate about clean architecture, performance, and continuous learning. Let's connect!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <RoundedSlideButton onClick={scrollToContact} variant="primary">
              Contact me
            </RoundedSlideButton>
            <RoundedSlideButton onClick={onOpenResume} variant="outline">
              View Resume
            </RoundedSlideButton>
          </div>
        </div>

        {/* Right Profile Image Column */}
        <div className="lg:col-span-4 flex justify-center lg:justify-end">
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-linear-to-r from-teal-500 to-emerald-500 rounded-full blur-xl opacity-50 animate-continuous-zoom" />
            <img
              src="/assets/profile_image.webp"
              alt="Himanshu Kumar"
              width="240"
              height="240"
              fetchPriority="high"
              decoding="async"
              className="relative w-48 h-48 sm:w-60 sm:h-60 lg:w-64 lg:h-64 object-cover rounded-full border-4 border-teal-500/40 dark:border-teal-400/40 shadow-2xl animate-continuous-zoom"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
