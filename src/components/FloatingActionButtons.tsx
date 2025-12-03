import React, { useState, useEffect } from 'react';
import { Users, Heart, HandHeart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FloatingActionButtonsProps {
  onJoinClick: () => void;
  onDonateClick: () => void;
  onVolunteerClick?: () => void;
}

export const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({
  onJoinClick,
  onDonateClick,
  onVolunteerClick
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasSeenPulse, setHasSeenPulse] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Show buttons after user scrolls down a bit
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    // Check if user has seen the pulse animation before
    const seenPulse = localStorage.getItem('sdp-seen-pulse');
    if (!seenPulse && window.scrollY > 300) {
      setHasSeenPulse(false);
      setTimeout(() => {
        setHasSeenPulse(true);
        localStorage.setItem('sdp-seen-pulse', 'true');
      }, 2000);
    } else {
      setHasSeenPulse(true);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isExpanded && (
        <div className="flex flex-col gap-3 mb-2 animate-in slide-in-from-bottom-4 duration-300">
          <Button
            onClick={() => {
              onJoinClick();
              setIsExpanded(false);
            }}
            className="bg-[#ef8636] hover:bg-[#ef8636]/90 text-white shadow-xl hover:shadow-2xl h-14 px-6 rounded-full flex items-center gap-3 transition-all transform hover:scale-105"
          >
            <Users className="w-5 h-5" />
            <span className="font-semibold">Join the Party</span>
          </Button>
          
          <Button
            onClick={() => {
              onDonateClick();
              setIsExpanded(false);
            }}
            className="bg-[#ef8636] hover:bg-[#ef8636]/90 text-white shadow-xl hover:shadow-2xl h-14 px-6 rounded-full flex items-center gap-3 transition-all transform hover:scale-105"
          >
            <Heart className="w-5 h-5" />
            <span className="font-semibold">Donate</span>
          </Button>
          
          {onVolunteerClick && (
            <Button
              onClick={() => {
                onVolunteerClick();
                setIsExpanded(false);
              }}
              className="bg-[#ef8636] hover:bg-[#ef8636]/90 text-white shadow-xl hover:shadow-2xl h-14 px-6 rounded-full flex items-center gap-3 transition-all transform hover:scale-105"
            >
              <HandHeart className="w-5 h-5" />
              <span className="font-semibold">Volunteer</span>
            </Button>
          )}
        </div>
      )}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`relative w-16 h-16 rounded-full bg-[#ef8636] hover:bg-[#ef8636]/90 text-white shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 ${
          !hasSeenPulse ? 'animate-pulse' : ''
        }`}
        aria-label="Quick actions"
      >
        {isExpanded ? (
          <X className="w-6 h-6" />
        ) : (
          <HandHeart className="w-6 h-6" />
        )}
        {!hasSeenPulse && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></span>
        )}
      </button>
    </div>
  );
};

