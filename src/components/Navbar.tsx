import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavbarProps {
  onDonateClick: () => void;
  activeSection: string;
  setActiveSection: (s: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onDonateClick, activeSection, setActiveSection }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Who We Are', path: '/who-we-are' },
    { name: 'Our Stand', path: '/our-stand' },
    { name: 'E-Membership', path: '/e-membership' },
    { name: 'Election Center', path: '/election-center' },
    { name: 'Media Room', path: '/media-room' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-sdp-dark/95 backdrop-blur-sm shadow-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Desktop Navigation Links / Mobile Menu Button */}
          <div className="flex items-center gap-8">
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {links.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm text-white hover:text-[#ef8636] transition-all duration-300 font-medium relative group ${
                    isActive(link.path) ? 'text-[#ef8636]' : ''
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ef8636]"></span>
                  )}
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#ef8636] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
                </Link>
              ))}
            </div>
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileOpen(!mobileOpen)} 
              className="lg:hidden flex items-center gap-2 text-white px-3 py-2 hover:bg-white/10 rounded-lg transition font-medium"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
              <span className="text-sm font-semibold">Menu</span>
            </button>
          </div>
          
          {/* Right side - Language Switcher and Donate Button */}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <button 
              onClick={onDonateClick} 
              className="hidden lg:flex px-6 py-2.5 bg-[#1daa62] hover:bg-[#1daa62]/90 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl items-center gap-2"
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
        <div className="lg:hidden bg-sdp-dark/98 backdrop-blur-md border-t border-white/10 px-6 py-4 space-y-3">
          {links.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={`block w-full text-left py-3 px-4 rounded-lg transition ${
                isActive(link.path) 
                  ? 'text-[#ef8636] font-semibold bg-[#ef8636]/10' 
                  : 'text-white hover:text-[#ef8636] hover:bg-white/5'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button 
            onClick={() => {
              onDonateClick();
              setMobileOpen(false);
            }} 
            className="w-full px-6 py-3 bg-[#1daa62] hover:bg-[#1daa62]/90 text-white font-semibold rounded-lg transition transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
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