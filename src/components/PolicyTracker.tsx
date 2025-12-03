import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown, DollarSign, Users, BarChart3 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface MetricCardProps {
  title: string;
  current: string | number;
  target: string | number;
  icon: React.ReactNode;
  color: string;
  trend?: 'up' | 'down';
  solution?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  current, 
  target, 
  icon, 
  color,
  trend,
  solution
}) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const isGreen = color === '[#1daa62]';
  const borderClass = isGreen ? 'border-[#1daa62]/20' : 'border-[#ef8636]/20';
  const textClass = isGreen ? 'text-[#1daa62]' : 'text-[#ef8636]';
  const iconBgClass = isGreen ? 'bg-[#1daa62]/20' : 'bg-[#ef8636]/20';
  const cardBgClass = isGreen ? 'bg-gradient-to-br from-[#1daa62]/5 to-white' : 'bg-gradient-to-br from-[#ef8636]/5 to-white';

  return (
    <Card className={`relative overflow-hidden border-2 ${borderClass} hover:shadow-xl transition-all duration-300 ${cardBgClass}`}>
      <CardContent className="p-4 md:p-8">
        <div className="flex items-start justify-between mb-4 md:mb-6">
          <div className="flex items-center gap-2 md:gap-4">
            <div className={`w-12 h-12 md:w-16 md:h-16 ${iconBgClass} rounded-xl flex items-center justify-center shadow-md flex-shrink-0`}>
              {icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs md:text-base font-bold text-gray-800 uppercase tracking-wide mb-1 break-words">{title}</p>
              {trend && (
                <div className="flex items-center gap-2">
                  {trend === 'up' ? (
                    <TrendingUp className={`w-3 h-3 md:w-4 md:h-4 ${textClass} flex-shrink-0`} />
                  ) : (
                    <TrendingDown className={`w-3 h-3 md:w-4 md:h-4 ${textClass} flex-shrink-0`} />
                  )}
                  <span className="text-xs text-gray-600 font-medium">vs last quarter</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-6 mb-4 md:mb-6">
          <div className="bg-white/60 rounded-xl p-3 md:p-4 border border-gray-200">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 md:mb-2">{t('tracker.current')}</p>
            <p className={`text-xl md:text-4xl font-bold ${textClass} leading-tight break-words`}>{current}</p>
          </div>
          <div className="bg-white/60 rounded-xl p-3 md:p-4 border border-gray-200">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 md:mb-2">{t('tracker.target')}</p>
            <p className={`text-xl md:text-4xl font-bold ${textClass} leading-tight break-words`}>{target}</p>
          </div>
        </div>

        {solution && (
          <div className="mt-6 pt-6 border-t-2 border-gray-200">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between text-left group hover:bg-white/50 rounded-lg p-3 -m-3 transition-colors"
            >
              <span className={`text-base font-bold ${textClass}`}>{t('tracker.fix')}</span>
              {isExpanded ? (
                <ChevronUp className={`w-5 h-5 ${textClass} group-hover:scale-110 transition-transform`} />
              ) : (
                <ChevronDown className={`w-5 h-5 ${textClass} group-hover:scale-110 transition-transform`} />
              )}
            </button>
            {isExpanded && (
              <div className="mt-4 text-xs md:text-sm text-gray-700 leading-relaxed animate-in slide-in-from-top-2 duration-200 bg-white/40 rounded-lg p-3 md:p-4">
                {solution}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const PolicyTracker: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section id="tracker" className="py-16 -mt-8 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-8 border border-gray-100 transform -translate-y-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-4">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl md:text-3xl font-bold text-sdp-dark mb-2 break-words">{t('tracker.title')}</h2>
              <p className="text-sm md:text-base text-gray-600 break-words">{t('tracker.subtitle')}</p>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#ef8636]/10 rounded-full border border-[#ef8636]/20">
              <span className="w-2 h-2 bg-[#ef8636] rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-[#ef8636]">{t('tracker.live')}</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <MetricCard
              title="Inflation Rate"
              current="28.92%"
              target="12%"
              icon={<TrendingUp className="w-6 h-6 text-[#ef8636]" />}
              color="[#ef8636]"
              trend="down"
              solution="SDP will implement fiscal discipline, reduce government spending, strengthen the Naira through export diversification, and invest in local production to reduce import dependency. We'll also establish price stabilization mechanisms for essential commodities."
            />
            
            <MetricCard
              title="Unemployment Rate"
              current="4.7%"
              target="2.8%"
              icon={<Users className="w-6 h-6 text-[#1daa62]" />}
              color="[#1daa62]"
              trend="down"
              solution="SDP will create 5 million jobs through massive investment in agriculture, manufacturing, and technology sectors. We'll establish youth entrepreneurship programs, vocational training centers, and public works programs. Our focus will be on supporting SMEs and attracting foreign direct investment."
            />
            
            <MetricCard
              title="GDP Growth Rate"
              current="2.7%"
              target="6.0%"
              icon={<BarChart3 className="w-6 h-6 text-[#ef8636]" />}
              color="[#ef8636]"
              trend="up"
              solution="SDP will boost GDP growth by investing in infrastructure (power, roads, rail), supporting local manufacturing, promoting agricultural value chains, and creating an enabling environment for businesses. We'll also focus on digital economy and renewable energy sectors."
            />
            
            <MetricCard
              title="Exchange Rate (NGN/USD)"
              current="₦1,350"
              target="₦650"
              icon={<DollarSign className="w-6 h-6 text-[#1daa62]" />}
              color="[#1daa62]"
              trend="down"
              solution="SDP will stabilize the Naira by increasing foreign exchange earnings through export promotion, reducing import bills via local production, attracting foreign investment, and maintaining healthy foreign reserves. We'll implement a managed float system with clear monetary policy frameworks."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

