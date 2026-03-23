import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ChevronDown } from 'lucide-react';

interface NavbarProps {
  onDonateClick: () => void;
  activeSection: string;
  setActiveSection: (s: string) => void;
}

type NavLink = {
  name: string;
  path: string;
  isExternal?: boolean;
};

type NavItem = NavLink & {
  children?: { name: string; path: string; isExternal?: boolean; download?: string }[];
};

const sdpDocumentChildren = [
  { name: 'SDP Constitution', path: '/who-we-are#constitution' },
  { name: 'SDP Manifesto', path: '/SDP Manifesto 2018.pdf', isExternal: true, download: 'SDP Manifesto 2018.pdf' },
  { name: 'Abridged Manifesto', path: '/who-we-are#abridged-manifesto' },
];

const nationalStructureChildren = [
  { name: 'National Working Committee', path: '/who-we-are#nwc' },
  { name: 'SW National Zonal Committee', path: '/who-we-are#zonal-sw' },
  { name: 'SE National Zonal Committee', path: '/who-we-are#zonal-se' },
  { name: 'SS National Zonal Committee', path: '/who-we-are#zonal-ss' },
  { name: 'NC National Zonal Committee', path: '/who-we-are#zonal-nc' },
  { name: 'NE National Zonal Committee', path: '/who-we-are#zonal-ne' },
  { name: 'NW National Zonal Committee', path: '/who-we-are#zonal-nw' },
];

const navItems: NavItem[] = [
  { name: 'Home', path: '/' },
  { name: 'Who We Are', path: '/who-we-are' },
  { name: 'SDP Docs', path: '/who-we-are', children: sdpDocumentChildren },
  { name: 'Structure', path: '/who-we-are#nwc', children: nationalStructureChildren },
  { name: 'State Chairmen', path: '/contact' },
  { name: 'Our Stand', path: '/our-stand' },
  { name: 'E-Membership', path: 'https://socialdemocraticparty.app', isExternal: true },
  { name: 'Election', path: '/election-center' },
  { name: 'Media', path: '/media-room' },
  { name: 'Contact', path: '/contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onDonateClick, activeSection, setActiveSection }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navLinksRef.current && !navLinksRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => {
    if (path.startsWith('/who-we-are#')) return location.pathname === '/who-we-are';
    return location.pathname === path;
  };

  const renderLink = (item: NavItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const isOpen = openDropdown === item.name;

    if (item.isExternal) {
      return (
        <a
          key={`${item.name}-${item.path}`}
          href={item.path}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-white hover:text-[#ef8636] transition-all duration-300 font-medium relative group whitespace-nowrap"
        >
          {item.name}
          <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#ef8636] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </a>
      );
    }

    if (hasChildren) {
      return (
        <div key={item.name} className="relative flex-shrink-0">
          <button
            onClick={() => setOpenDropdown(isOpen ? null : item.name)}
            className={`text-xs text-white hover:text-[#ef8636] transition-all duration-300 font-medium flex items-center gap-0.5 whitespace-nowrap ${
              isActive(item.path) ? 'text-[#ef8636]' : ''
            }`}
          >
            {item.name}
            <ChevronDown className={`w-3 h-3 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          {isOpen && (
            <div className="absolute top-full left-0 mt-1 py-2 min-w-[200px] bg-sdp-dark border border-white/10 rounded-lg shadow-xl z-50">
              {item.children!.map((child) =>
                child.isExternal ? (
                  <a
                    key={`${child.name}-${child.path}`}
                    href={child.path}
                    download={child.download}
                    onClick={() => setOpenDropdown(null)}
                    className="block px-4 py-2.5 text-sm text-white hover:text-[#ef8636] hover:bg-white/5 transition"
                  >
                    {child.name}
                  </a>
                ) : (
                  <Link
                    key={`${child.name}-${child.path}`}
                    to={child.path}
                    onClick={() => setOpenDropdown(null)}
                    className="block px-4 py-2.5 text-sm text-white hover:text-[#ef8636] hover:bg-white/5 transition"
                  >
                    {child.name}
                  </Link>
                )
              )}
            </div>
          )}
        </div>
      );
    }

    return (
      <Link
        key={`${item.name}-${item.path}`}
        to={item.path}
        className={`text-xs text-white hover:text-[#ef8636] transition-all duration-300 font-medium relative group flex-shrink-0 whitespace-nowrap ${
          isActive(item.path) ? 'text-[#ef8636]' : ''
        }`}
      >
        {item.name}
        {isActive(item.path) && (
          <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#ef8636]" />
        )}
        <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#ef8636] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </Link>
    );
  };

  const renderMobileLink = (item: NavItem) => {
    const hasChildren = item.children && item.children.length > 0;

    if (item.isExternal) {
      return (
        <a
          key={`${item.name}-${item.path}`}
          href={item.path}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMobileOpen(false)}
          className="block w-full text-left py-3 px-4 rounded-lg transition text-white hover:text-[#ef8636] hover:bg-white/5"
        >
          {item.name}
        </a>
      );
    }

    if (hasChildren) {
      return (
        <div key={item.name} className="space-y-1">
          <div className="py-2 px-4 text-white/80 text-sm font-medium">{item.name}</div>
          {item.children!.map((child) =>
            child.isExternal ? (
              <a
                key={`${child.name}-${child.path}`}
                href={child.path}
                download={child.download}
                onClick={() => setMobileOpen(false)}
                className="block w-full text-left py-2.5 pl-8 pr-4 rounded-lg transition text-white hover:text-[#ef8636] hover:bg-white/5 text-sm"
              >
                {child.name}
              </a>
            ) : (
              <Link
                key={`${child.name}-${child.path}`}
                to={child.path}
                onClick={() => setMobileOpen(false)}
                className="block w-full text-left py-2.5 pl-8 pr-4 rounded-lg transition text-white hover:text-[#ef8636] hover:bg-white/5 text-sm"
              >
                {child.name}
              </Link>
            )
          )}
        </div>
      );
    }

    return (
      <Link
        key={`${item.name}-${item.path}`}
        to={item.path}
        onClick={() => setMobileOpen(false)}
        className={`block w-full text-left py-3 px-4 rounded-lg transition ${
          isActive(item.path)
            ? 'text-[#ef8636] font-semibold bg-[#ef8636]/10'
            : 'text-white hover:text-[#ef8636] hover:bg-white/5'
        }`}
      >
        {item.name}
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-sdp-dark/95 backdrop-blur-sm shadow-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-3 md:px-4 py-2 md:py-2.5">
        <div className="flex items-center justify-between gap-2">
          {/* Left - Nav links (tablet and up: single line) */}
          <div className="flex items-center min-w-0 flex-1">
            <div ref={navLinksRef} className="hidden md:flex items-center gap-2 lg:gap-3 flex-nowrap whitespace-nowrap overflow-visible py-0.5 -mx-1 px-1">
              {navItems.map((item) => renderLink(item))}
            </div>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center gap-2 text-white px-3 py-2 hover:bg-white/10 rounded-lg transition font-medium"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
              <span className="text-sm font-semibold">Menu</span>
            </button>
          </div>

          {/* Right - Language & Donate */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <LanguageSwitcher />
            <button
              onClick={onDonateClick}
              className="hidden md:flex px-3 lg:px-4 py-2 bg-[#1daa62] hover:bg-[#1daa62]/90 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl items-center gap-1.5 text-xs"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Donate N500
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-sdp-dark border-t border-white/10 px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
          {navItems.map((item) => renderMobileLink(item))}
          <button
            onClick={() => {
              onDonateClick();
              setMobileOpen(false);
            }}
            className="w-full mt-4 px-6 py-3 bg-[#1daa62] hover:bg-[#1daa62]/90 text-white font-semibold rounded-lg transition transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Donate N500
          </button>
        </div>
      )}
    </nav>
  );
};
