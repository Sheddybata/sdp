import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface HeroProps {
  onJoinClick: () => void;
  onDonateClick: () => void;
  supporterCount: number;
}

// Hero slideshow images
const heroImages = [
  '/sdp-commitment.jpeg',
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
    <section className="relative flex min-h-[62dvh] items-start justify-center overflow-hidden pt-24 md:min-h-[90vh] md:pt-28">
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
                  className="h-full w-full object-cover animate-zoom max-md:scale-105 md:scale-110 max-md:object-[center_38%]"
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
      
      <div className="relative z-10 mx-auto w-full max-w-7xl -translate-y-2 px-3 sm:px-5 sm:-translate-y-3 md:px-6 md:-translate-y-5 md:pb-16 md:pt-6 lg:-translate-y-6 lg:pb-20 lg:pt-8 pb-8 pt-2 sm:pb-10 sm:pt-3">
        <div className="max-w-3xl">
          {/* Logo and Party Name */}
          <div className="mb-6 flex animate-fade-in-up items-center gap-3 md:mb-8">
        <img 
          src="/sdplogo.jpg" 
          alt="SDP Logo" 
          className="h-14 w-14 object-contain drop-shadow-lg md:h-16 md:w-16"
          loading="eager"
          fetchPriority="high"
          decoding="async"
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
            <span className="text-xl font-bold text-white drop-shadow-lg sm:text-2xl md:text-3xl" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
              Social Democratic Party
            </span>
          </div>
          
          {/* Welcome line */}
          <p className="mb-3 animate-fade-in-up text-sm font-medium text-white/90 md:mb-4 md:text-base">{t('hero.welcome')}</p>
          {/* Badge */}
          <div className="animate-fade-in-up-delay mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-md md:mb-6 md:px-4 md:py-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#1daa62]"></span>
            <span className="text-xs font-medium text-white sm:text-sm">{t('hero.join')} {supporterCount.toLocaleString()}+ {t('hero.members')}</span>
          </div>
          
          {/* Main Headline */}
          <h1 className="mb-4 animate-fade-in-up text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl md:mb-6 md:text-5xl lg:text-5xl" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
            {t('hero.title')}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ef8636] via-[#ef8636] to-[#1daa62] animate-gradient-text">
              {t('hero.subtitle')}
            </span>
          </h1>
          
          {/* Subheadline */}
          <p
            className="animate-fade-in-up-delay mb-6 max-w-2xl font-normal leading-relaxed text-gray-100 text-sm sm:mb-8 sm:text-base md:mb-10 md:text-lg lg:text-xl"
            style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}
          >
            {t('hero.descriptionText')} <span className="font-semibold text-white">{t('hero.descriptionText2')}</span>, <span className="font-semibold text-white">{t('hero.descriptionText3')}</span>, {t('hero.descriptionText4')} <span className="font-semibold text-white">{t('hero.descriptionText5')}</span>.
          </p>
          
          {/* CTA Buttons */}
          <div className="mb-8 flex flex-wrap gap-3 md:mb-12 md:gap-4">
            <a 
              href="https://socialdemocraticparty.app"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex transform items-center gap-2 rounded-xl bg-[#ef8636] px-5 py-2.5 text-sm font-semibold text-white shadow-xl transition-all hover:scale-105 hover:bg-[#ef8636]/90 hover:shadow-2xl sm:text-base md:px-6 md:py-3"
            >
              <span>{t('hero.join')}</span>
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
            <button 
              type="button"
              onClick={onDonateClick} 
              className="group flex transform items-center gap-2 rounded-xl bg-[#1daa62] px-5 py-2.5 text-sm font-semibold text-white shadow-xl transition-all hover:scale-105 hover:bg-[#1daa62]/90 hover:shadow-2xl sm:text-base md:px-6 md:py-3"
            >
              <span>{t('hero.donate')}</span>
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-200 sm:gap-5 md:gap-6 md:text-sm">
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 shrink-0 text-[#1daa62] md:h-5 md:w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{t('hero.trust.verified')}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 shrink-0 text-[#1daa62] md:h-5 md:w-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{t('hero.trust.coverage')}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 shrink-0 text-[#1daa62] md:h-5 md:w-5" fill="currentColor" viewBox="0 0 20 20">
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