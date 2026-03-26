import React, { useState, useEffect } from 'react';
import { Users, MapPin, Calendar, TrendingUp } from 'lucide-react';

interface FloatingStatsBarProps {
  members?: number;
  states?: number;
  year?: number;
}

const FloatingStatsBar: React.FC<FloatingStatsBarProps> = ({ 
  members = 247893, 
  states = 36, 
  year = 2027 
}) => {
  const [animatedMembers, setAnimatedMembers] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('stats-bar-trigger');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = members / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(increment * step, members);
      setAnimatedMembers(Math.floor(current));

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedMembers(members);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, members]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M+';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(0) + 'K+';
    }
    return num.toString();
  };

  return (
    <>
      <div id="stats-bar-trigger" className="h-0" aria-hidden />
      <div className="fixed top-14 left-0 right-0 z-40 bg-[#158a50]/98 backdrop-blur-md border-t border-white/10 shadow-md">
        <div className="max-w-7xl mx-auto px-2 sm:px-3 md:px-6 py-2 md:py-2.5">
          <div className="flex flex-nowrap items-center justify-between sm:justify-center gap-1 sm:gap-3 md:gap-8 lg:gap-12 w-full min-w-0 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 shrink-0">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#ef8636] shrink-0" />
              <div className="flex flex-row items-center gap-0.5 sm:gap-1 whitespace-nowrap">
                <span className="text-sm sm:text-lg md:text-2xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-none">{formatNumber(animatedMembers)}</span>
                <span className="text-[10px] sm:text-xs md:text-sm text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-none">Members</span>
              </div>
            </div>
            <div className="w-px h-5 sm:h-6 md:h-8 bg-white/20 shrink-0 self-center" aria-hidden />
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 shrink-0">
              <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#1daa62] shrink-0" />
              <div className="flex flex-row items-center gap-0.5 sm:gap-1 whitespace-nowrap">
                <span className="text-sm sm:text-lg md:text-2xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-none">{states}</span>
                <span className="text-[10px] sm:text-xs md:text-sm text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-none">States + FCT</span>
              </div>
            </div>
            <div className="w-px h-5 sm:h-6 md:h-8 bg-white/20 shrink-0 self-center" aria-hidden />
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 shrink-0">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#ef8636] shrink-0" />
              <div className="flex flex-row items-center gap-0.5 sm:gap-1 whitespace-nowrap">
                <span className="text-sm sm:text-lg md:text-2xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-none">{year}</span>
                <span className="text-[10px] sm:text-xs md:text-sm text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-none">Ready</span>
              </div>
            </div>
            <div className="w-px h-5 sm:h-6 md:h-8 bg-white/20 shrink-0 self-center" aria-hidden />
            <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 shrink-0">
              <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-[#1daa62] shrink-0" />
              <div className="flex flex-row items-center gap-0.5 sm:gap-1 whitespace-nowrap">
                <span className="text-sm sm:text-lg md:text-2xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-none">24/7</span>
                <span className="text-[10px] sm:text-xs md:text-sm text-white/95 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-none">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingStatsBar;

