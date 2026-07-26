import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ToolsSection } from '@/components/sections/ToolsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { CertificationsSection } from '@/components/sections/CertificationsSection';
import { EducationSection } from '@/components/sections/EducationSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ResumeDialog } from '@/components/ui/ResumeDialog';
import { DynamicFavicon } from '@/components/ui/DynamicFavicon';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { useSpotlight } from '@/hooks/use-spotlight';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);

  // Initialize hooks
  useScrollReveal();
  useSpotlight();

  return (
    <div className="bg-linear-to-br from-teal-50 via-white to-teal-100/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 text-teal-800 dark:text-slate-200 font-sans selection:bg-teal-200 selection:text-teal-900 transition-colors duration-300 min-h-screen">
      <DynamicFavicon />
      <Navbar />

      <main>
        <HeroSection onOpenResume={() => setResumeOpen(true)} />
        <AboutSection />
        <SkillsSection />
        <ToolsSection />
        <ProjectsSection />
        <CertificationsSection />
        <EducationSection />
        <ContactSection />
      </main>

      <Footer />

      <ResumeDialog open={resumeOpen} onOpenChange={setResumeOpen} />
    </div>
  );
}
