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
          className="text-xs text-[#1daa62] hover:text-[#158a50] transition-all duration-300 font-medium relative group whitespace-nowrap"
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
            className={`text-xs text-[#1daa62] hover:text-[#158a50] transition-all duration-300 font-medium flex items-center gap-0.5 whitespace-nowrap ${
              isActive(item.path) ? 'text-[#ef8636]' : ''
            }`}
          >
            {item.name}
            <ChevronDown className={`w-3 h-3 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          {isOpen && (
            <div className="absolute top-full left-0 mt-1 py-2 min-w-[200px] bg-white border border-gray-200 rounded-lg shadow-xl z-50">
              {item.children!.map((child) =>
                child.isExternal ? (
                  <a
                    key={`${child.name}-${child.path}`}
                    href={child.path}
                    download={child.download}
                    onClick={() => setOpenDropdown(null)}
                    className="block px-4 py-2.5 text-sm text-[#1daa62] hover:text-[#158a50] hover:bg-[#1daa62]/8 transition"
                  >
                    {child.name}
                  </a>
                ) : (
                  <Link
                    key={`${child.name}-${child.path}`}
                    to={child.path}
                    onClick={() => setOpenDropdown(null)}
                    className="block px-4 py-2.5 text-sm text-[#1daa62] hover:text-[#158a50] hover:bg-[#1daa62]/8 transition"
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
        className={`text-xs text-[#1daa62] hover:text-[#158a50] transition-all duration-300 font-medium relative group flex-shrink-0 whitespace-nowrap ${
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
          className="block w-full text-left py-3 px-4 rounded-lg transition text-[#1daa62] hover:text-[#158a50] hover:bg-[#1daa62]/8"
        >
          {item.name}
        </a>
      );
    }

    if (hasChildren) {
      return (
        <div key={item.name} className="space-y-1">
          <div className="py-2 px-4 text-[#1daa62] text-sm font-medium">{item.name}</div>
          {item.children!.map((child) =>
            child.isExternal ? (
              <a
                key={`${child.name}-${child.path}`}
                href={child.path}
                download={child.download}
                onClick={() => setMobileOpen(false)}
                className="block w-full text-left py-2.5 pl-8 pr-4 rounded-lg transition text-[#1daa62] hover:text-[#158a50] hover:bg-[#1daa62]/8 text-sm"
              >
                {child.name}
              </a>
            ) : (
              <Link
                key={`${child.name}-${child.path}`}
                to={child.path}
                onClick={() => setMobileOpen(false)}
                className="block w-full text-left py-2.5 pl-8 pr-4 rounded-lg transition text-[#1daa62] hover:text-[#158a50] hover:bg-[#1daa62]/8 text-sm"
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
            : 'text-[#1daa62] hover:text-[#158a50] hover:bg-[#1daa62]/8'
        }`}
      >
        {item.name}
      </Link>
    );
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-sm shadow-md border-b border-gray-200/90">
      <div className="max-w-7xl mx-auto px-3 md:px-4 h-14 flex items-center w-full">
        <div className="flex items-center justify-between gap-2 w-full min-w-0">
          {/* Left - Nav links (tablet and up: single line) */}
          <div className="flex items-center min-w-0 flex-1">
            <div ref={navLinksRef} className="hidden md:flex items-center gap-2 lg:gap-3 flex-nowrap whitespace-nowrap overflow-visible py-0.5 -mx-1 px-1">
              {navItems.map((item) => renderLink(item))}
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center gap-2 rounded-xl border border-[#1daa62]/25 bg-white px-2.5 py-1.5 text-[#1daa62] shadow-sm transition font-medium hover:bg-[#1daa62]/[0.06] hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1daa62]/40 focus-visible:ring-offset-2"
            >
              <svg className="w-6 h-6 text-[#1daa62]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
              <span className="text-sm font-semibold text-[#1daa62]">Menu</span>
            </button>
          </div>

          {/* Right - Language & Donate — no outer “card” wrapper (avoids double layer behind controls) */}
          <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={onDonateClick}
              className="hidden md:flex px-3 lg:px-4 py-2 text-[#1daa62] hover:text-white hover:bg-[#1daa62] font-semibold rounded-lg transition-all transform hover:scale-[1.02] shadow-sm hover:shadow-md items-center gap-1.5 text-xs border border-[#1daa62] bg-white"
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
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
          {navItems.map((item) => renderMobileLink(item))}
          <button
            type="button"
            onClick={() => {
              onDonateClick();
              setMobileOpen(false);
            }}
            className="w-full mt-4 px-6 py-3 border border-[#1daa62] text-[#1daa62] hover:bg-[#1daa62] hover:text-white font-semibold rounded-lg transition flex items-center justify-center gap-2"
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
