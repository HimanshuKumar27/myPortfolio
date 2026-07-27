import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { useScrollProgress } from '@/hooks/use-scroll-progress';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const scrollProgress = useScrollProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  const isClickScrollingRef = useRef(false);
  const clickTimerRef = useRef(null);

  const navItems = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Tools', href: '#tools', id: 'tools' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Certifications', href: '#certifications', id: 'certifications' },
    { label: 'Education', href: '#education', id: 'education' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  const scrollToSection = (id) => {
    isClickScrollingRef.current = true;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    setActiveSection(id);

    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        const offsetPosition = el.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }

    clickTimerRef.current = setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 900);
  };

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

  // Precise section scroll tracking
  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'tools', 'projects', 'certifications', 'education', 'contact'];

    const handleScrollTracking = () => {
      // Ignore scroll tracking during programmatic click smooth scroll
      if (isClickScrollingRef.current) return;

      // If user is near top of page, highlight home
      if (window.scrollY < 100) {
        setActiveSection('home');
        return;
      }

      const scrollPosition = window.scrollY + 140;

      // Find the furthest section that we have scrolled past
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollTracking, { passive: true });
    handleScrollTracking();
    return () => window.removeEventListener('scroll', handleScrollTracking);
  }, []);

  return (
    <header className="header-fixed">
      {/* Scroll Progress Bar */}
      <div
        id="scrollProgress"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
      <nav className="container mx-auto flex justify-between items-center py-3.5 px-6">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('home');
          }}
          className={`nav-logo ${isScrolled ? 'scrolled' : ''}`}
          aria-label="Home"
        >
          <div className="nav-logo-text text-2xl font-bold font-display tracking-tight text-teal-600 dark:text-teal-400">
            HK
          </div>
          <div className="nav-logo-img">
            <img
              src="/assets/profile_image.webp"
              alt="Himanshu Kumar"
              width="38"
              height="38"
              loading="lazy"
            />
          </div>
        </a>

        {/* Hover.dev Slide Tabs (Desktop Navigation) */}
        <SlideTabs navItems={navItems} activeSection={activeSection} onSelectTab={scrollToSection} />

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-teal-950 dark:text-teal-50 w-10 h-10"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown (Center Aligned) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-teal-200/60 dark:border-teal-800/60 transition-all duration-300 text-center">
          <ul className="flex flex-col items-center justify-center space-y-5 px-6 py-8 text-xl nav-links">
            {navItems.map((item) => (
              <li key={item.href} className="w-full text-center">
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setMobileMenuOpen(false);
                    scrollToSection(item.id);
                  }}
                  className={`inline-block text-center transition-all duration-200 hover:text-teal-600 dark:hover:text-teal-400 hover:scale-105 ${
                    activeSection === item.id
                      ? 'text-teal-600 dark:text-teal-400 font-bold scale-105'
                      : 'text-slate-700 dark:text-slate-200'
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

{/* Hover.dev SlideTabs Component */}
function SlideTabs({ navItems, activeSection, onSelectTab }) {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const tabRefs = useRef({});

  const resetToActive = () => {
    const activeEl = tabRefs.current[activeSection];
    if (activeEl) {
      setPosition({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        opacity: 1,
      });
    }
  };

  useEffect(() => {
    resetToActive();
  }, [activeSection]);

  return (
    <ul
      onMouseLeave={resetToActive}
      className="hidden md:flex relative w-fit rounded-full border border-teal-200/60 dark:border-teal-800/60 bg-white/40 dark:bg-slate-900/40 p-1.5 backdrop-blur-md shadow-sm items-center"
    >
      {navItems.map((item) => {
        const isActive = activeSection === item.id;
        return (
          <Tab
            key={item.id}
            item={item}
            isActive={isActive}
            setPosition={setPosition}
            onSelectTab={onSelectTab}
            ref={(el) => (tabRefs.current[item.id] = el)}
          />
        );
      })}

      {/* Sliding Cursor Pill */}
      <Cursor position={position} />
    </ul>
  );
}

const Tab = React.forwardRef(({ item, isActive, setPosition, onSelectTab }, ref) => {
  const handleScroll = (e) => {
    e.preventDefault();
    onSelectTab(item.id);
  };

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { offsetWidth } = ref.current;
        setPosition({
          left: ref.current.offsetLeft,
          width: offsetWidth,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer"
    >
      <a
        href={item.href}
        onClick={handleScroll}
        className={`block px-4 py-2 text-[16px] font-medium transition-colors duration-200 ${
          isActive
            ? 'text-teal-700 dark:text-teal-300 font-bold'
            : 'text-slate-600 dark:text-slate-300 hover:text-teal-900 dark:hover:text-white'
        }`}
      >
        {item.label}
      </a>
    </li>
  );
});

Tab.displayName = 'Tab';

function Cursor({ position }) {
  return (
    <div
      style={{
        left: `${position.left}px`,
        width: `${position.width}px`,
        opacity: position.opacity,
      }}
      className="absolute z-0 h-9.5 rounded-full bg-teal-500/20 dark:bg-teal-400/25 border border-teal-500/40 dark:border-teal-400/40 transition-all duration-300 ease-out pointer-events-none"
    />
  );
}
