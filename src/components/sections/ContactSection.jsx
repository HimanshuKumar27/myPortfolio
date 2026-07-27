import React from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

export function ContactSection() {
  const contactItems = [
    {
      label: '365himanshukumar@gmail.com',
      href: 'mailto:365himanshukumar@gmail.com',
      icon: <img src="https://cdn.simpleicons.org/gmail" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" alt="Gmail" loading="lazy" width="24" height="24" />,
    },
    {
      label: '365himanshukumar',
      href: 'https://www.linkedin.com/in/365himanshukumar/',
      icon: (
        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 fill-[#0A66C2] shrink-0">
          <title>LinkedIn</title>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: '+91-7011121740',
      href: 'tel:+917011121740',
      icon: <img src="https://cdn.simpleicons.org/whatsapp" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" alt="WhatsApp" loading="lazy" width="24" height="24" />,
    },
    {
      label: 'HimanshuKumar27',
      href: 'https://github.com/HimanshuKumar27',
      icon: <img src="https://cdn.simpleicons.org/github" className="w-5 h-5 sm:w-6 sm:h-6 dark:invert shrink-0" alt="GitHub" loading="lazy" width="24" height="24" />,
    },
    {
      label: 'great_himanshu_27',
      href: 'https://www.instagram.com/great_himanshu_27/',
      icon: <img src="https://cdn.simpleicons.org/instagram" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" alt="Instagram" loading="lazy" width="24" height="24" />,
    },
    {
      label: 'greathimanshu27',
      href: 'https://x.com/greathimanshu27',
      icon: <img src="https://cdn.simpleicons.org/x" className="w-5 h-5 sm:w-6 sm:h-6 dark:invert shrink-0" alt="X (Twitter)" loading="lazy" width="24" height="24" />,
    },
  ];

  return (
    <section id="contact" className="container mx-auto py-14 sm:py-20 px-4 sm:px-6 text-center section-lazy">
      <SectionHeading>Get in Touch</SectionHeading>
      <p className="mb-6 sm:mb-8 text-sm sm:text-lg dark:text-slate-300">Feel free to connect with me through the following:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-6 justify-center">
        {contactItems.map((item) => (
          <SpotlightCard
            key={item.label}
            className="flex items-center space-x-3 p-3.5 sm:p-4 min-w-0"
          >
            {item.icon}
            <a
              href={item.href}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="hover:underline text-xs sm:text-sm text-teal-900 dark:text-slate-200 truncate"
            >
              {item.label}
            </a>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
