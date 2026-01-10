import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SkipForward, SkipBack, ListVideo, Clock } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface Video {
  id: string;
  title: string;
  image: string;
  date: string;
}

const videos: Video[] = [
  {
    id: "EDsaiPhwLUw",
    title: "I Have Informed The SDP That I Will Be Running For the Presidency Again in 2027",
    image: "/sdp tv/presidency.png",
    date: "2 months ago",
  },
  {
    id: "yAEEenFAmRc",
    title: "PRINCE ADEWOLE ADEBAYO INTERACTS WITH THE COMPATRIOTS IN ABUJA",
    image: "/sdp tv/interaction.png",
    date: "2 years ago",
  },
  {
    id: "SbGbbUmaH2A",
    title: "PRINCE ADEWOLE ADEBAYO'S FULL SPEECH, QUESTIONS AND ANSWER SESSIONS WITH NACCIMA",
    image: "/sdp tv/presidency.png", // Fallback for naccima.png
    date: "3 years ago",
  },
  {
    id: "qUxPECq6lvI",
    title: "2023 Election: S.D.P. Presidential Candidate Pledges To Fight Corruption",
    image: "/sdp tv/fightcorruption.png",
    date: "3 years ago",
  },
  {
    id: "-sVpCLpdoXQ",
    title: "SDP welcome defectors ahead of 2027 election",
    image: "/sdp tv/sdpwelcome.png",
    date: "9 months ago",
  },
  {
    id: "QmAuwlY9dcM",
    title: "FULL SPEECH OF THE PRESIDENTIAL CANDIDATE OF SDP AT THE EVANGELICAL REFORMED CHURCH OF CHRIST",
    image: "/sdp tv/reformed.png",
    date: "3 years ago",
  },
  {
    id: "oMKuZNwpBls",
    title: "FULL SPEECH OF PRINCE ADEWOLE ADEBAYO AT THE CHRISTIAN COUNCIL OF NIGERIA GENERAL ASSEMBLY.",
    image: "/sdp tv/christaincouncil.png",
    date: "3 years ago",
  },
  {
    id: "5k-nCb7oJ8Q",
    title: "The Social Democratic Party (SDP) Presidential Candidate on State of the Nation",
    image: "/sdp tv/nation.png",
    date: "9 months ago",
  },
  {
    id: "8tMmd9yr3Qw",
    title: "ARE THERE FACTION IN SOCIAL DEMOCRATIC PARTY (SDP)?",
    image: "/sdp tv/factionsinsdp.png",
    date: "4 months ago",
  },
  {
    id: "MG2Xl10hCS8",
    title: "How Tinubu's Govt Is Enabling Insecurity In Nigeria - SDP's Adebayo",
    image: "/sdp tv/insecurity.png",
    date: "1 month ago",
  },
  {
    id: "RWhl2Uo_dJ8",
    title: "Nigeria Needs a Righteous Leader - SDP’s Adebayo | PRESIDENTIAL ELECTION",
    image: "/sdp tv/leader.png",
    date: "2 years ago",
  },
  {
    id: "u-fy2I5l300",
    title: "2023: SDP Presidential Candidate, Adebayo Meets CAN, Reveal Roadmap for Nigeria",
    image: "/sdp tv/can.png",
    date: "3 years ago",
  },
  {
    id: "7oIbshxfdw4",
    title: "2027: SDP Won’t Make APC, PDP’s Mistakes – Adebayo",
    image: "/sdp tv/nomistake.png",
    date: "9 months ago",
  },
  {
    id: "B_be8UdefV8",
    title: "SDP Leader Adebayo Exposes Tinubu, Boko Haram - Warns Nnamdi Kanu's Case Would Backfire On Nigeria",
    image: "/sdp tv/sendtinibuhome.png",
    date: "1 month ago",
  },
  {
    id: "vpjAVFa_F5g",
    title: "MKO Abiola - SDP Campaign 1993 (Nigeria)",
    image: "/sdp tv/mkosdp.png",
    date: "11 years ago",
  },
];

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export const SDPTVPlayer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef<any>(null);
  const iframeRef = useRef<HTMLDivElement>(null);

  // Preload all images for a smoother experience
  useEffect(() => {
    videos.forEach((video) => {
      const img = new Image();
      img.src = video.image;
    });
  }, []);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      }
    } else if (window.YT && window.YT.Player) {
      createPlayer(videos[currentIndex].id);
    }

    window.onYouTubeIframeAPIReady = () => {
      createPlayer(videos[currentIndex].id);
    };

    return () => {
      // Don't destroy player here if we want it to persist across some re-renders
      // but if the component unmounts, we should.
    };
  }, []);

  const createPlayer = (videoId: string) => {
    if (window.YT && window.YT.Player) {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 1,
          rel: 0,
          modestbranding: 1,
          playsinline: 1,
          enablejsapi: 1,
          origin: window.location.origin,
          widget_referrer: window.location.href,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    }
  };

  const onPlayerReady = (event: any) => {
    event.target.playVideo();
    setIsPlaying(true);
  };

  const onPlayerStateChange = (event: any) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      handleNext();
    } else if (event.data === window.YT.PlayerState.PLAYING) {
      setIsPlaying(true);
    } else if (event.data === window.YT.PlayerState.PAUSED) {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (playerRef.current && playerRef.current.loadVideoById) {
      playerRef.current.loadVideoById(videos[currentIndex].id);
    }
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const handleVideoSelect = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 bg-slate-50 p-4 rounded-xl shadow-inner">
      {/* Main Player Section */}
      <div className="flex-1">
        <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-2xl relative">
          <div id="youtube-player" className="w-full h-full"></div>
        </div>
        
        <div className="mt-6">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-xl lg:text-2xl font-bold text-sdp-dark mb-2 leading-tight">
                {videos[currentIndex].title}
              </h2>
              <div className="flex items-center gap-4 text-gray-500 text-sm">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {videos[currentIndex].date}
                </span>
                <span className="px-2 py-0.5 bg-sdp-green/10 text-sdp-green rounded text-xs font-semibold uppercase whitespace-nowrap">
                  SDP TV Exclusive
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 self-center sm:self-start">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handlePrev}
                className="rounded-full border-sdp-green text-sdp-green hover:bg-sdp-green hover:text-white transition-all w-10 h-10 lg:w-12 lg:h-12"
              >
                <SkipBack className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleNext}
                className="rounded-full border-sdp-green text-sdp-green hover:bg-sdp-green hover:text-white transition-all w-10 h-10 lg:w-12 lg:h-12"
              >
                <SkipForward className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Program Guide / Playlist Section */}
      <div className="w-full lg:w-96 flex flex-col gap-4">
        <div className="flex items-center gap-2 px-2">
          <ListVideo className="w-5 h-5 text-sdp-green" />
          <h3 className="font-bold text-lg text-sdp-dark">Program Guide</h3>
          <span className="ml-auto text-xs font-medium text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
            {currentIndex + 1} / {videos.length}
          </span>
        </div>
        
        <ScrollArea className="h-[500px] pr-4">
          <div className="flex flex-col gap-3">
            {videos.map((video, index) => (
              <button
                key={video.id}
                onClick={() => handleVideoSelect(index)}
                className={cn(
                  "flex gap-3 p-2 rounded-lg transition-all text-left hover:bg-white group border border-transparent",
                  currentIndex === index 
                    ? "bg-white shadow-md border-sdp-green/20" 
                    : "hover:border-gray-200"
                )}
              >
                <div className="relative flex-shrink-0 w-28 aspect-video rounded-md overflow-hidden bg-gray-200">
                  <img 
                    src={video.image} 
                    alt={video.title} 
                    loading={index < 4 ? "eager" : "lazy"}
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/sdp tv/presidency.png';
                    }}
                  />
                  {currentIndex === index && (
                    <div className="absolute inset-0 bg-sdp-green/40 flex items-center justify-center">
                      <div className="flex gap-1 items-end h-3">
                        <div className="w-1 bg-white animate-[bounce_1s_infinite_0.1s]"></div>
                        <div className="w-1 bg-white animate-[bounce_1s_infinite_0.3s]"></div>
                        <div className="w-1 bg-white animate-[bounce_1s_infinite_0.5s]"></div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-col justify-between py-1 flex-1 min-w-0">
                  <h4 className={cn(
                    "text-xs font-bold line-clamp-2 leading-tight transition-colors",
                    currentIndex === index ? "text-sdp-green" : "text-gray-800 group-hover:text-sdp-green"
                  )}>
                    {video.title}
                  </h4>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-gray-500">
                      {video.date}
                    </span>
                    {currentIndex === index && (
                      <span className="text-[9px] font-bold text-sdp-green animate-pulse">
                        NOW PLAYING
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

