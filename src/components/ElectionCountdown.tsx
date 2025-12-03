import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Vote, AlertCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface ElectionCountdownProps {
  electionDate: Date;
  onRegisterClick?: () => void;
}

export const ElectionCountdown: React.FC<ElectionCountdownProps> = ({ electionDate, onRegisterClick }) => {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);
  const [animating, setAnimating] = useState<{ days: boolean; hours: boolean; minutes: boolean; seconds: boolean }>({
    days: false,
    hours: false,
    minutes: false,
    seconds: false
  });
  const prevTimeRef = useRef<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setMounted(true);
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = electionDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        const newTime = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        };

        const prevTime = prevTimeRef.current;

        // Detect which values changed and trigger animation
        const newAnimating = {
          days: newTime.days !== prevTime.days,
          hours: newTime.hours !== prevTime.hours,
          minutes: newTime.minutes !== prevTime.minutes,
          seconds: newTime.seconds !== prevTime.seconds
        };

        setAnimating(newAnimating);
        setTimeLeft(newTime);
        prevTimeRef.current = newTime;
        
        // Show urgency if less than 30 days
        setIsUrgent(newTime.days < 30);

        // Reset animation flags after animation completes
        setTimeout(() => {
          setAnimating({ days: false, hours: false, minutes: false, seconds: false });
        }, 600);
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsUrgent(true);
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [electionDate]);

  if (!mounted) {
    return null;
  }

  const TimeUnit: React.FC<{ 
    value: number; 
    labelKey: string; 
    isUrgent?: boolean;
    isAnimating?: boolean;
  }> = ({ value, labelKey, isUrgent, isAnimating }) => (
    <div className="flex flex-col items-center group">
      <div className={`relative w-14 h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-[#ef8636] rounded-lg md:rounded-xl flex items-center justify-center shadow-lg mb-1 md:mb-2 transition-all duration-300 overflow-hidden ${
        isUrgent ? 'animate-pulse' : ''
      } group-hover:scale-105 group-hover:shadow-xl`}>
        {/* Subtle glow effect - reduced */}
        <div className="absolute inset-0 bg-[#ef8636] rounded-lg md:rounded-xl blur-md opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
        <span className={`relative text-lg md:text-2xl lg:text-3xl font-bold text-white tracking-tight ${
          isAnimating ? 'animate-flip' : ''
        }`}>
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="text-[10px] md:text-xs font-semibold text-white/90 uppercase tracking-wide text-center px-1">
        {t(labelKey)}
      </span>
    </div>
  );

  return (
    <Card className="border-0 shadow-2xl overflow-hidden relative group">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="/Why SDP/TrueFederalism.png" 
          alt="True Federalism" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            target.parentElement!.style.backgroundColor = '#ef8636';
          }}
        />
        {/* Enhanced overlays for better readability - reduced opacity for more image visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-sdp-dark/70 via-sdp-dark/60 to-sdp-dark/70"></div>
        <div className="absolute inset-0 bg-[#ef8636]/7"></div>
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ef8636]/5 to-transparent animate-shimmer"></div>
      </div>
      
      <CardContent className="relative z-10 p-4 md:p-8 lg:p-12 text-white">
        {/* Header Section */}
        <div className="text-center mb-6 md:mb-10">
          <div className="flex items-center justify-center gap-2 mb-2 md:mb-3 flex-wrap">
            <h3 className="text-xl md:text-3xl lg:text-4xl font-black drop-shadow-xl break-words">{t('election.title')}</h3>
            {isUrgent && (
              <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-[#ef8636] animate-pulse flex-shrink-0" />
            )}
          </div>
          <p className="text-sm md:text-base lg:text-lg text-white/95 font-medium drop-shadow-md px-2">
            {t('election.subtitle')}
          </p>
        </div>

        {/* Countdown Display */}
        <div className="flex items-center justify-center gap-1 md:gap-2 lg:gap-4 mb-6 md:mb-10 flex-wrap">
          <TimeUnit 
            value={timeLeft.days} 
            labelKey="election.days" 
            isUrgent={isUrgent && timeLeft.days < 7}
            isAnimating={animating.days}
          />
          <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white/80 pb-4 md:pb-6">:</div>
          <TimeUnit 
            value={timeLeft.hours} 
            labelKey="election.hours"
            isAnimating={animating.hours}
          />
          <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white/80 pb-4 md:pb-6">:</div>
          <TimeUnit 
            value={timeLeft.minutes} 
            labelKey="election.minutes"
            isAnimating={animating.minutes}
          />
          <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white/80 pb-4 md:pb-6">:</div>
          <TimeUnit 
            value={timeLeft.seconds} 
            labelKey="election.seconds"
            isAnimating={animating.seconds}
          />
        </div>

        {/* Call to Action Section */}
        <div className="flex flex-col items-center pt-4 md:pt-8 border-t-2 border-white/30 gap-4 md:gap-6">
          <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-center">
            <Clock className="w-5 h-5 md:w-6 md:h-6 text-[#ef8636] drop-shadow-md flex-shrink-0" />
            <div className="text-center">
              <p className="text-xs md:text-sm font-semibold text-white/90 uppercase tracking-wide mb-1">{t('election.date')}</p>
              <p className="text-sm md:text-lg lg:text-xl font-bold text-white drop-shadow-md break-words px-2">
                {electionDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
          
          {onRegisterClick && (
            <Button
              onClick={onRegisterClick}
              className="bg-white text-[#ef8636] hover:bg-white/90 font-bold text-sm md:text-base px-6 md:px-8 py-4 md:py-6 rounded-xl shadow-2xl hover:shadow-[#ef8636]/50 transition-all transform hover:scale-105 flex items-center gap-2 group w-full md:w-auto"
            >
              <Vote className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" />
              <span className="break-words">Register to Vote</span>
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
        </div>

        {/* Urgency Message */}
        {isUrgent && timeLeft.days < 30 && (
          <div className="mt-4 md:mt-6 p-3 md:p-4 bg-[#ef8636]/20 backdrop-blur-md rounded-xl border-2 border-[#ef8636]/40 flex items-start md:items-center gap-2 md:gap-3 animate-pulse-slow">
            <AlertCircle className="w-4 h-4 md:w-5 md:h-5 text-[#ef8636] flex-shrink-0 mt-0.5 md:mt-0" />
            <p className="text-xs md:text-sm font-semibold text-white break-words">
              {timeLeft.days < 7 
                ? '⚠️ Less than a week remaining! Make sure you\'re registered to vote.'
                : '⏰ Election day is approaching fast. Register now to make your voice heard!'}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

