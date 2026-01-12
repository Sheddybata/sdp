import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeroProps {
  onJoinClick: () => void;
  onDonateClick: () => void;
  supporterCount: number;
}

// Hero slideshow images
const heroImages = [
  '/hero slideshow/1.png',
  '/hero slideshow/2.png',
  '/hero slideshow/3.png',
  '/hero slideshow/4.png',
  '/hero slideshow/5.png',
  '/hero slideshow/6.png',
  '/hero slideshow/7.png',
  '/hero slideshow/8.png',
  '/hero slideshow/9.png',
  '/hero slideshow/10.png',
  '/hero slideshow/Adewole-Adebayo.jpg'
];

export const Hero: React.FC<HeroProps> = ({ onJoinClick, onDonateClick, supporterCount }) => {
  const { t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        setFadeIn(true);
      }, 500); // Half of transition duration
    }, 3000); // Change image every 3 seconds (faster)

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-32 md:pt-20">
      <div className="absolute inset-0">
        {/* Slideshow Background */}
        <div className="relative w-full h-full">
          {heroImages.map((image, index) => {
            const isCurrent = index === currentImageIndex;
            const isNext = index === (currentImageIndex + 1) % heroImages.length;
            
            // Only render current and next image to save memory and bandwidth
            if (!isCurrent && !isNext) return null;

            return (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isCurrent && fadeIn ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <img
                  src={image}
                  alt={`Hero slide ${index + 1}`}
                  className="w-full h-full object-cover scale-110 animate-zoom"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                  decoding="async"
                />
              </div>
            );
          })}
        </div>
        
        {/* Gradient Overlays - Reduced opacity for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-sdp-dark/60 via-sdp-dark/50 to-sdp-dark/40"></div>
        
        {/* Animated gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#ef8636]/15 via-transparent to-[#1daa62]/15 animate-gradient-shift"></div>
      </div>
      
      {/* Decorative elements with animation */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-[#ef8636]/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#1daa62]/10 rounded-full blur-3xl animate-pulse-slow-delay"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="max-w-3xl">
          {/* Logo and Party Name */}
          <div className="flex items-center gap-3 mb-8 animate-fade-in-up">
            <img 
              src="/sdplogo.jpg" 
              alt="SDP Logo" 
              className="w-16 h-16 object-contain drop-shadow-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                if (!target.nextElementSibling) {
                  const fallback = document.createElement('div');
                  fallback.className = 'w-16 h-16 bg-[#ef8636] rounded-full flex items-center justify-center shadow-lg';
                  fallback.innerHTML = '<span class="text-white font-bold text-xl">SDP</span>';
                  target.parentNode?.appendChild(fallback);
                }
              }}
            />
            <span className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
              Social Democratic Party
            </span>
          </div>
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full mb-6 border border-white/20 animate-fade-in-up-delay">
            <span className="w-2 h-2 bg-[#1daa62] rounded-full animate-pulse"></span>
            <span className="text-sm font-medium text-white">{t('hero.join')} {supporterCount.toLocaleString()}+ {t('hero.members')}</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-6 leading-tight text-white tracking-tight animate-fade-in-up" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
            {t('hero.title')}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ef8636] via-[#ef8636] to-[#1daa62] animate-gradient-text">
              {t('hero.subtitle')}
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-10 text-gray-100 leading-relaxed max-w-2xl font-normal animate-fade-in-up-delay" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
            {t('hero.descriptionText')} <span className="font-semibold text-white">{t('hero.descriptionText2')}</span>, <span className="font-semibold text-white">{t('hero.descriptionText3')}</span>, {t('hero.descriptionText4')} <span className="font-semibold text-white">{t('hero.descriptionText5')}</span>.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-12">
            <button 
              onClick={onJoinClick} 
              className="group px-6 py-3 bg-[#ef8636] hover:bg-[#ef8636]/90 text-white text-base font-semibold rounded-xl transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center gap-2"
            >
              <span>{t('hero.join')}</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <button 
              onClick={onDonateClick} 
              className="group px-6 py-3 bg-[#1daa62] hover:bg-[#1daa62]/90 text-white text-base font-semibold rounded-xl transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl flex items-center gap-2"
            >
              <span>{t('hero.donate')}</span>
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-200">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#1daa62]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{t('hero.trust.verified')}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#1daa62]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{t('hero.trust.coverage')}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#1daa62]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{t('hero.trust.transparent')}</span>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};