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
      <div id="stats-bar-trigger" className="h-1"></div>
      <div className="fixed top-[73px] left-0 right-0 z-40 bg-sdp-dark/98 backdrop-blur-md border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[#ef8636]" />
              <div>
                <span className="text-2xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{formatNumber(animatedMembers)}</span>
                <span className="text-sm text-white/95 ml-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Members</span>
              </div>
            </div>
            <div className="hidden md:block w-px h-8 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#1daa62]" />
              <div>
                <span className="text-2xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{states}</span>
                <span className="text-sm text-white/95 ml-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">States + FCT</span>
              </div>
            </div>
            <div className="hidden md:block w-px h-8 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#ef8636]" />
              <div>
                <span className="text-2xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{year}</span>
                <span className="text-sm text-white/95 ml-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Ready</span>
              </div>
            </div>
            <div className="hidden md:block w-px h-8 bg-white/20"></div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#1daa62]" />
              <div>
                <span className="text-2xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">24/7</span>
                <span className="text-sm text-white/95 ml-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingStatsBar;

