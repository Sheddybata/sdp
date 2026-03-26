import React from 'react';
import {
  Zap,
  Home,
  Factory,
  Briefcase,
  GraduationCap,
  Shield,
  Scale,
  Download,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const manifestoItems: {
  icon: React.ComponentType<{ className?: string }>;
  titleKey: string;
  imagePath: string;
}[] = [
  { icon: Zap, titleKey: 'energy', imagePath: '/Core Principles/energy.png' },
  { icon: Home, titleKey: 'rural', imagePath: '/Core Principles/Rural Development.png' },
  { icon: Factory, titleKey: 'mining', imagePath: '/Core Principles/MiningandPetrochemicals.png' },
  { icon: Briefcase, titleKey: 'labor', imagePath: '/Core Principles/LaborEmploymentandWages.png' },
  { icon: GraduationCap, titleKey: 'education', imagePath: '/Core Principles/Education.png' },
  { icon: Shield, titleKey: 'defense', imagePath: '/Core Principles/Defense.png' },
  { icon: Scale, titleKey: 'police', imagePath: '/Core Principles/Police.png' },
];

/** Core Principles / Original Manifesto grid — shared by Home and Who We Are */
export const ManifestoPrinciplesSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <>
      <div className="text-center mb-10 md:mb-12">
        <span className="inline-block px-4 py-2 bg-[#ef8636]/10 text-[#ef8636] rounded-full text-sm font-semibold mb-4">
          {t('who.manifesto.badge')}
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-sdp-dark">{t('who.manifesto.title')}</h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">{t('who.manifesto.subtitle')}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {manifestoItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card
              key={index}
              className="relative hover:shadow-xl transition-all duration-300 border-0 shadow-lg group overflow-hidden min-h-[220px] sm:min-h-[260px]"
            >
              <img
                src={item.imagePath}
                alt={t(`who.manifesto.${item.titleKey}`)}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 backdrop-blur-md bg-white/30 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform border border-white/40">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-lg" />
                </div>
                <h3 className="text-lg sm:text-xl text-white font-bold drop-shadow-lg mb-1 sm:mb-2">
                  {t(`who.manifesto.${item.titleKey}`)}
                </h3>
                <p className="text-white/95 text-sm leading-relaxed drop-shadow line-clamp-4 sm:line-clamp-none">
                  {t(`who.manifesto.${item.titleKey}Desc`)}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <a href="/SDP Manifesto 2018.pdf" download="SDP Manifesto 2018.pdf">
          <Button className="bg-[#1daa62] hover:bg-[#1daa62]/90">
            <Download className="w-4 h-4 mr-2" />
            Download Manifesto (PDF)
          </Button>
        </a>
      </div>
    </>
  );
};
