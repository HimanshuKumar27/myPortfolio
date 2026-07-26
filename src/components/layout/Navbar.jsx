import React, { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useScrollProgress } from '@/hooks/use-scroll-progress';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const scrollProgress = useScrollProgress();
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Tools', href: '#tools' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const homeEl = document.getElementById('home');
      if (homeEl) {
        const rect = homeEl.getBoundingClientRect();
        setIsScrolled(rect.bottom < 150);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute('id'));
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="header-fixed">
      {/* Scroll Progress Bar */}
      <div
        id="scrollProgress"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      <nav className="container mx-auto flex justify-between items-center py-4 px-6">
        <a
          href="#home"
          className={`nav-logo ${isScrolled ? 'scrolled' : ''}`}
          aria-label="Home"
        >
          <div className="nav-logo-text text-xl font-bold font-display tracking-tight text-teal-600 dark:text-teal-400">
            HK
          </div>
          <div className="nav-logo-img">
            <img
              src="/assets/profile_image.webp"
              alt="Himanshu Kumar"
              width="36"
              height="36"
              loading="lazy"
            />
          </div>
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg nav-links">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`transition-colors duration-200 hover:text-teal-600 dark:hover:text-teal-400 ${
                  activeSection === item.href.substring(1)
                    ? 'text-teal-600 dark:text-teal-400 font-bold'
                    : ''
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className="text-teal-950 dark:text-teal-50 hover:text-teal-600 dark:hover:text-teal-400"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-teal-950 dark:text-teal-50"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-teal-200/60 dark:border-teal-800/60 transition-all duration-300">
          <ul className="flex flex-col space-y-4 px-6 py-6 text-lg nav-links">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block transition-colors hover:text-teal-600 dark:hover:text-teal-400 ${
                    activeSection === item.href.substring(1)
                      ? 'text-teal-600 dark:text-teal-400 font-bold'
                      : ''
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
