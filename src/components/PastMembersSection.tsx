import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const formatName = (filename: string): string => {
  const nameWithoutExt = filename.replace(/\.(jpg|jpeg|png)$/i, '');
  return nameWithoutExt
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
};

const pastMembers = [
  'AbdullahiAliyuSumaila.jpg',
  'AbubakarRimi.jpg',
  'AlbertLegogie.jpg',
  'AsiwajuKayodeBlessing.jpg',
  'Atikuabubakar.jpg',
  'BolaTinubu.jpg',
  'BossMustapha.png',
  'DapoSarumi.jpg',
  'FidelisTapgun.png',
  'IyorchiaAyu.jpg',
  'JerryGana.jpg',
  'LamidiAdedibu.jpg',
  'MagajiAbdullahi.png',
  'MohammedArzika.jpg',
  'RabiuMusaKwankwaso.jpg',
  'ShehuYarAdua.jpg',
  'SuleLamido.jpg',
  'TonyAnenih.jpg'
];

export type PastMembersSectionProps = {
  /** Inset card inside dark footer (default) vs full-width strip on homepage */
  variant?: 'footer' | 'standalone';
};

export const PastMembersSection: React.FC<PastMembersSectionProps> = ({ variant = 'footer' }) => {
  const { t } = useLanguage();

  const inner = (
    <>
      <h3 className="text-2xl font-bold mb-8 text-center text-sdp-dark">{t('footer.pastMembers')}</h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4">
        {pastMembers.map((member) => {
          const imagePath = `/past members/${member}`;
          const displayName = formatName(member);
          return (
            <div
              key={member}
              className="flex flex-col items-center group cursor-pointer"
              title={displayName}
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-[#ef8636] transition-all duration-300 mb-2">
                <img
                  src={imagePath}
                  alt={displayName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder.svg';
                  }}
                />
              </div>
              <p className="text-xs text-gray-600 text-center group-hover:text-[#ef8636] transition-colors line-clamp-2">
                {displayName}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );

  if (variant === 'standalone') {
    return (
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6">{inner}</div>
      </section>
    );
  }

  return (
    <div className="mb-16 -mx-6 md:-mx-8 lg:-mx-12 px-6 md:px-8 lg:px-12 py-12 bg-white">
      {inner}
    </div>
  );
};
