import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface Section {
  id: string;
  label: string;
  path: string;
}

const sections: Section[] = [
  { id: 'hero', label: 'Home', path: '/' },
  { id: 'tracker', label: 'Shadow Gov', path: '/' },
  { id: 'wins', label: 'Latest Wins', path: '/' },
  { id: 'why', label: 'Why SDP', path: '/' },
  { id: 'testimonials', label: 'Testimonials', path: '/' },
  { id: 'activity', label: 'Activity', path: '/' }
];

const ScrollIndicator: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsVisible(false);
      return;
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            setIsVisible(true);
            break;
          }
        }
      }

      // Hide if at top
      if (window.scrollY < 100) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100; // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  if (location.pathname !== '/' || !isVisible) {
    return null;
  }

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
      <div className="bg-white/95 backdrop-blur-md rounded-full p-2 shadow-2xl border border-gray-200">
        <div className="flex flex-col gap-2">
          {sections.map((section) => {
            const element = document.getElementById(section.id);
            if (!element) return null;

            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-[#ef8636] scale-125'
                    : 'bg-gray-300 hover:bg-[#ef8636]/50'
                }`}
                aria-label={`Scroll to ${section.label}`}
                title={section.label}
              >
                {activeSection === section.id && (
                  <div className="absolute -left-8 top-1/2 -translate-y-1/2 whitespace-nowrap">
                    <div className="bg-sdp-dark text-white text-xs px-2 py-1 rounded">
                      {section.label}
                    </div>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-l-4 border-l-sdp-dark border-b-4 border-b-transparent"></div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ScrollIndicator;



