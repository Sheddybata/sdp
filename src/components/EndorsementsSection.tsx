import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Endorsement {
  name: string;
  type: 'organization' | 'individual';
  role?: string;
  logo?: string;
  quote?: string;
}

// Helper function to get image path from endorsement name
const getEndorsementImagePath = (name: string): string => {
  const imageMap: { [key: string]: string } = {
    'Nigerian Labour Congress': 'NigeriaLabourCongress.png',
    'National Association of Nigerian Students': 'nationalassociationofnigerianstudents.jpg',
    'Nigerian Medical Association': 'NigerianMedicalAssociation.png',
    'All Farmers Association of Nigeria': 'AllFarmersAssociationofNigeria.jpg',
    'Chartered Institute of Bankers of Nigeria': 'CharteredInstituteofBankersofNigeria.jpg',
    'Nigerian Bar Association': 'NigerianBarAssociation.jpg',
    'Dr. Ngozi Okonjo-Iweala': 'DrNgoziOkonjoIweala.jpg',
    'Prof. Wole Soyinka': 'ProfWoleSoyinka.png',
    'Alhaji Atiku Abubakar': 'AlhajiAtikuAbubakar.jpg'
  };
  const filename = imageMap[name];
  return filename ? `/endorsement and partners/${filename}` : '';
};

const endorsements: Endorsement[] = [
  {
    name: 'Nigerian Labour Congress',
    type: 'organization',
    role: 'National Workers Union',
    quote: 'SDP represents the interests of working Nigerians.'
  },
  {
    name: 'National Association of Nigerian Students',
    type: 'organization',
    role: 'Student Union',
    quote: 'SDP champions youth inclusion and education reform.'
  },
  {
    name: 'Nigerian Medical Association',
    type: 'organization',
    role: 'Professional Association',
    quote: 'SDP\'s healthcare policies align with our vision for universal healthcare.'
  },
  {
    name: 'All Farmers Association of Nigeria',
    type: 'organization',
    role: 'Agricultural Union',
    quote: 'SDP understands the needs of Nigerian farmers.'
  },
  {
    name: 'Chartered Institute of Bankers of Nigeria',
    type: 'organization',
    role: 'Professional Body',
    quote: 'SDP\'s economic policies will stabilize the financial sector.'
  },
  {
    name: 'Nigerian Bar Association',
    type: 'organization',
    role: 'Legal Professional Body',
    quote: 'SDP is committed to the rule of law and judicial independence.'
  },
  {
    name: 'Dr. Ngozi Okonjo-Iweala',
    type: 'individual',
    role: 'Former Finance Minister',
    quote: 'SDP\'s economic vision aligns with sustainable development goals.'
  },
  {
    name: 'Prof. Wole Soyinka',
    type: 'individual',
    role: 'Nobel Laureate',
    quote: 'SDP represents a genuine alternative for Nigeria\'s future.'
  },
  {
    name: 'Alhaji Atiku Abubakar',
    type: 'individual',
    role: 'Former Vice President',
    quote: 'SDP has a proven track record of good governance.'
  }
];

export const EndorsementsSection: React.FC = () => {
  const { t } = useLanguage();
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  const handleImageError = (name: string) => {
    setImageErrors(prev => ({ ...prev, [name]: true }));
  };
  
  return (
    <section id="endorsements" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-sdp-dark">{t('endorsements.title')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('endorsements.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {endorsements.map((endorsement, index) => {
            const imagePath = getEndorsementImagePath(endorsement.name);
            const hasImageError = imageErrors[endorsement.name];
            
            return (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden ${
                      endorsement.type === 'organization' 
                        ? 'bg-gradient-to-br from-[#ef8636]/20 to-[#ef8636]/10' 
                        : 'bg-gradient-to-br from-[#1daa62]/20 to-[#1daa62]/10'
                    }`}>
                      {imagePath && !hasImageError ? (
                        <img
                          src={imagePath}
                          alt={endorsement.name}
                          className="w-full h-full object-cover"
                          onError={() => handleImageError(endorsement.name)}
                        />
                      ) : (
                        <>
                          {endorsement.type === 'organization' ? (
                            <Users className={`w-6 h-6 ${endorsement.type === 'organization' ? 'text-[#ef8636]' : 'text-[#1daa62]'}`} />
                          ) : (
                            <Award className={`w-6 h-6 ${endorsement.type === 'organization' ? 'text-[#ef8636]' : 'text-[#1daa62]'}`} />
                          )}
                        </>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1 text-sdp-dark group-hover:text-[#ef8636] transition-colors">
                        {endorsement.name}
                      </h3>
                      {endorsement.role && (
                        <p className="text-sm text-[#1daa62] font-semibold mb-2">{endorsement.role}</p>
                      )}
                    </div>
                  </div>
                  {endorsement.quote && (
                    <p className="text-gray-600 text-sm leading-relaxed italic">
                      "{endorsement.quote}"
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Logos Slideshow - Only Organizations */}
        <div className="mt-12 pt-12 border-t border-gray-200">
          <h3 className="text-2xl font-bold text-center mb-8 text-sdp-dark">{t('endorsements.partners')}</h3>
          
          {/* Filter only organizations */}
          {(() => {
            const organizations = endorsements.filter(e => e.type === 'organization');
            
            return (
              <div className="relative overflow-hidden mask-gradient">
                {/* Slideshow Container */}
                <div className="flex animate-scroll gap-8 items-center will-change-transform">
                  {/* First set of logos */}
                  {organizations.map((endorsement, index) => {
                    const imagePath = getEndorsementImagePath(endorsement.name);
                    const hasImageError = imageErrors[endorsement.name];
                    
                    return (
                      <div
                        key={`first-${index}`}
                        className="flex-shrink-0 w-40 h-40 bg-white rounded-xl flex items-center justify-center p-4 hover:scale-110 transition-transform shadow-md hover:shadow-xl border border-gray-100"
                      >
                        {imagePath && !hasImageError ? (
                          <img
                            src={imagePath}
                            alt={endorsement.name}
                            className="w-full h-full object-contain"
                            onError={() => handleImageError(endorsement.name)}
                          />
                        ) : (
                          <div className="text-center">
                            <div className="w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#ef8636]/20 to-[#ef8636]/10">
                              <Users className="w-6 h-6 text-[#ef8636]" />
                            </div>
                            <p className="text-xs font-semibold text-gray-700 text-center leading-tight">
                              {endorsement.name.split(' ').slice(0, 2).join(' ')}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {/* Duplicate set for seamless loop */}
                  {organizations.map((endorsement, index) => {
                    const imagePath = getEndorsementImagePath(endorsement.name);
                    const hasImageError = imageErrors[endorsement.name];
                    
                    return (
                      <div
                        key={`second-${index}`}
                        className="flex-shrink-0 w-40 h-40 bg-white rounded-xl flex items-center justify-center p-4 hover:scale-110 transition-transform shadow-md hover:shadow-xl border border-gray-100"
                      >
                        {imagePath && !hasImageError ? (
                          <img
                            src={imagePath}
                            alt={endorsement.name}
                            className="w-full h-full object-contain"
                            onError={() => handleImageError(endorsement.name)}
                          />
                        ) : (
                          <div className="text-center">
                            <div className="w-12 h-12 mx-auto mb-2 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#ef8636]/20 to-[#ef8636]/10">
                              <Users className="w-6 h-6 text-[#ef8636]" />
                            </div>
                            <p className="text-xs font-semibold text-gray-700 text-center leading-tight">
                              {endorsement.name.split(' ').slice(0, 2).join(' ')}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
};

