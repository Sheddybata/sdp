import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Users, Award, FileText, History, Target, Lightbulb, Shield, BookOpen, Factory, GraduationCap, Briefcase, Zap, Home, Hammer, Scale, Users2, Heart, Globe, TrendingUp, Loader2, Sparkles, Calendar, Flag, Rocket, Trophy } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// Type for former member
type FormerMember = {
  name: string;
  title: string;
  profile: string;
};

// Component for individual member card with image error handling and loading state
const MemberCard: React.FC<{ member: FormerMember; imagePath: string }> = ({ member, imagePath }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Card className="hover:shadow-2xl transition-all duration-300 border-0 shadow-lg group hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#ef8636]/20 group-hover:border-[#ef8636] transition-all flex-shrink-0 group-hover:scale-110 relative">
            {imageLoading && !imageError && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
              </div>
            )}
            {imagePath && !imageError ? (
              <img
                src={imagePath}
                alt={member.name}
                className="w-full h-full object-cover"
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  setImageError(true);
                  setImageLoading(false);
                }}
                style={{ display: imageLoading ? 'none' : 'block' }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#ef8636]/20 to-[#1daa62]/20 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-[#ef8636]" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1 text-sdp-dark group-hover:text-[#ef8636] transition-colors">
              {member.name}
            </h3>
            <p className="text-sm text-[#1daa62] font-semibold mb-2">{member.title}</p>
          </div>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">{member.profile}</p>
      </CardContent>
    </Card>
  );
};

const WhoWeAre: React.FC = () => {
  const { t } = useLanguage();
  const manifestoItems = [
    {
      icon: Zap,
      titleKey: 'energy',
      imagePath: '/Core Principles/energy.png'
    },
    {
      icon: Home,
      titleKey: 'rural',
      imagePath: '/Core Principles/Rural Development.png'
    },
    {
      icon: Factory,
      titleKey: 'mining',
      imagePath: '/Core Principles/MiningandPetrochemicals.png'
    },
    {
      icon: Briefcase,
      titleKey: 'labor',
      imagePath: '/Core Principles/LaborEmploymentandWages.png'
    },
    {
      icon: GraduationCap,
      titleKey: 'education',
      imagePath: '/Core Principles/Education.png'
    },
    {
      icon: Shield,
      titleKey: 'defense',
      imagePath: '/Core Principles/Defense.png'
    },
    {
      icon: Scale,
      titleKey: 'police',
      imagePath: '/Core Principles/Police.png'
    }
  ];

  const platformItems = [
    {
      icon: Target,
      title: 'Further Democratic Ideas',
      description: 'Advance the democratic principles and values of the SDP.'
    },
    {
      icon: Users2,
      title: 'Third Political Platform',
      description: 'Become the third political platform and attract credible, competent, and dynamic leaders.'
    },
    {
      icon: Shield,
      title: 'Fight Corruption',
      description: 'Fight corruption and enthrone the rule of law.'
    },
    {
      icon: Heart,
      title: 'Gather Patriots',
      description: 'Gather patriotic and social democrats who will represent the people.'
    },
    {
      icon: Lightbulb,
      title: 'Ideological Party',
      description: 'Recreate an ideological party with structured deliverables.'
    },
    {
      icon: Globe,
      title: 'National Party',
      description: 'Form a national party with presence across all states.'
    },
    {
      icon: TrendingUp,
      title: 'Youth Inclusion',
      description: 'Open political space for young Nigerians.'
    },
    {
      icon: Users,
      title: 'Inclusivity',
      description: 'Reflect gender sensitivity and stand with people with disability.'
    },
    {
      icon: Heart,
      title: 'Unify Nigeria',
      description: 'Unify the Nigerian people and give voice and action to their aspirations and desires.'
    }
  ];

  // Helper function to convert display name to filename format
  const getNameToFilename = (name: string): string => {
    const nameMap: { [key: string]: string } = {
      'Atiku Abubakar': 'Atikuabubakar.jpg',
      'Jerry Gana': 'JerryGana.jpg',
      'Abubakar Rimi': 'AbubakarRimi.jpg',
      'Rabiu Musa Kwankwaso': 'RabiuMusaKwankwaso.jpg',
      'Shehu Yar\'Adua': 'ShehuYarAdua.jpg',
      'Abdullahi Aliyu Sumaila': 'AbdullahiAliyuSumaila.jpg',
      'Dapo Sarumi': 'DapoSarumi.jpg',
      'Sule Lamido': 'SuleLamido.jpg',
      'Magaji Abdullahi': 'MagajiAbdullahi.png',
      'Tony Anenih': 'TonyAnenih.jpg',
      'Lamidi Adedibu': 'LamidiAdedibu.jpg',
      'Albert Legogie': 'AlbertLegogie.jpg',
      'Iyorchia Ayu': 'IyorchiaAyu.jpg',
      'Fidelis Tapgun': 'FidelisTapgun.png',
      'Boss Mustapha': 'BossMustapha.png',
      'Bola Tinubu': 'BolaTinubu.jpg',
      'Asiwaju Kayode Blessing': 'AsiwajuKayodeBlessing.jpg',
      'Mohammed Arzika': 'MohammedArzika.jpg'
    };
    return nameMap[name] || '';
  };

  const formerMembers = [
    { name: 'Atiku Abubakar', title: 'Former Vice President of Nigeria', profile: 'Former Vice President and prominent political figure who was a key member of SDP during the Third Republic.' },
    { name: 'Jerry Gana', title: 'Former Minister of Information', profile: 'Returned to SDP in 2018. Former Minister and prominent politician who played significant roles in Nigerian politics.' },
    { name: 'Abubakar Rimi', title: 'Former Governor of Kano State', profile: 'Distinguished politician and former governor who was instrumental in SDP\'s early formation.' },
    { name: 'Rabiu Musa Kwankwaso', title: 'Former Governor of Kano State', profile: 'Former governor and senator who was part of SDP\'s influential membership during the Third Republic.' },
    { name: 'Shehu Yar\'Adua', title: 'Political Leader & Financier', profile: 'Key financier and political leader who garnered significant support in SDP\'s first presidential primary.' },
    { name: 'Abdullahi Aliyu Sumaila', title: 'Political Leader', profile: 'Prominent member of SDP who contributed to the party\'s structure and development.' },
    { name: 'Dapo Sarumi', title: 'Political Leader', profile: 'Active member of SDP during the Third Republic period.' },
    { name: 'Sule Lamido', title: 'Former Governor of Jigawa State', profile: 'Former governor and influential political figure who was part of SDP\'s core membership.' },
    { name: 'Magaji Abdullahi', title: 'Political Leader', profile: 'Key member of SDP who played important roles in party organization.' },
    { name: 'Tony Anenih', title: 'Former Minister of Works', profile: 'Former minister and political strategist who was a significant figure in SDP.' },
    { name: 'Lamidi Adedibu', title: 'Political Leader', profile: 'Influential political figure and key member of SDP during the Third Republic.' },
    { name: 'Albert Legogie', title: 'Political Leader', profile: 'Prominent member of SDP who contributed to the party\'s political activities.' },
    { name: 'Iyorchia Ayu', title: 'Former Senate President', profile: 'Former Senate President and distinguished politician who was part of SDP\'s leadership.' },
    { name: 'Fidelis Tapgun', title: 'Former Governor of Plateau State', profile: 'Former governor who was an active member of SDP during the Third Republic.' },
    { name: 'Boss Mustapha', title: 'Former Secretary to the Government', profile: 'Former SGF and prominent political figure who was part of SDP\'s membership.' },
    { name: 'Bola Tinubu', title: 'President of Nigeria', profile: 'Current President of Nigeria who was a member of SDP during the Third Republic before later political affiliations.' },
    { name: 'Asiwaju Kayode Blessing', title: 'Political Leader', profile: 'Active member of SDP who contributed to the party\'s political activities.' },
    { name: 'Mohammed Arzika', title: 'Political Leader', profile: 'Key figure who contested for party leadership and was instrumental in SDP\'s early organization.' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onDonateClick={() => {}} 
        activeSection=""
        setActiveSection={() => {}}
      />
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 text-white relative" style={{ backgroundImage: 'url(/whoweare.png)', backgroundSize: 'cover', backgroundPosition: 'top', backgroundRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h1 className="text-5xl font-bold mb-4">{t('who.title')}</h1>
          <p className="text-xl text-white/90">{t('who.subtitle')}</p>
        </div>
      </section>

      {/* Party Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <Card className="border-0 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardContent className="p-8">
              <div>
                <h2 className="text-3xl font-bold mb-4 text-sdp-dark">{t('who.about.title')}</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  {t('who.about.text1')} <span className="font-semibold text-[#ef8636]">{t('who.about.text1Highlight')}</span> {t('who.about.text1Cont')}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {t('who.about.text2')} <span className="font-semibold text-[#1daa62]">{t('who.about.text2Highlight')}</span> {t('who.about.text2Cont')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#ef8636] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1daa62] rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#ef8636] to-[#1daa62] rounded-2xl mb-6 shadow-lg">
              <History className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-5xl font-bold mb-4 text-sdp-dark bg-gradient-to-r from-[#ef8636] to-[#1daa62] bg-clip-text text-transparent">
              {t('who.history.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">{t('who.history.subtitle')}</p>
          </div>
          
          <div className="relative">
            {/* Enhanced vertical timeline line with gradient */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1.5 h-full">
              <div className="absolute inset-0 bg-gradient-to-b from-[#ef8636] via-[#ef8636] to-[#1daa62] rounded-full shadow-lg"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#ef8636] via-[#1daa62] to-[#1daa62] rounded-full opacity-50 blur-sm"></div>
            </div>
            {/* Mobile timeline line */}
            <div className="md:hidden absolute left-8 w-1.5 h-full">
              <div className="absolute inset-0 bg-gradient-to-b from-[#ef8636] via-[#ef8636] to-[#1daa62] rounded-full"></div>
            </div>
            
            <div className="space-y-16 md:space-y-20">
              {/* 1989 */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center group">
                <div className="w-full md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                  <Card className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-xl bg-white/90 backdrop-blur-sm group-hover:bg-white">
                    <CardContent className="p-8">
                      <div className="flex items-center md:justify-end gap-4 mb-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-[#ef8636]/10 rounded-full">
                          <Calendar className="w-5 h-5 text-[#ef8636]" />
                          <h3 className="text-3xl font-bold text-[#ef8636]">1989</h3>
                        </div>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed">{t('who.history.1989')}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 z-10 order-1 md:order-2 flex-shrink-0 -translate-x-1/2">
                  <div className="w-4 h-4 bg-[#ef8636] rounded-full border-2 border-white shadow-lg"></div>
                </div>
                <div className="w-full md:w-1/2 md:pl-12 order-3"></div>
              </div>

              {/* 1990 */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center group">
                <div className="w-full md:w-1/2 md:pr-12 order-3"></div>
                <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 z-10 order-1 md:order-2 flex-shrink-0 -translate-x-1/2">
                  <div className="w-4 h-4 bg-[#1daa62] rounded-full border-2 border-white shadow-lg"></div>
                </div>
                <div className="w-full md:w-1/2 md:pl-12 order-2 md:order-3">
                  <Card className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-xl bg-white/90 backdrop-blur-sm group-hover:bg-white">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-[#1daa62]/10 rounded-full">
                          <Calendar className="w-5 h-5 text-[#1daa62]" />
                          <h3 className="text-3xl font-bold text-[#1daa62]">1990</h3>
                        </div>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed">{t('who.history.1990')}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* 1992 */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center group">
                <div className="w-full md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                  <Card className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-xl bg-white/90 backdrop-blur-sm group-hover:bg-white">
                    <CardContent className="p-8">
                      <div className="flex items-center md:justify-end gap-4 mb-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-[#ef8636]/10 rounded-full">
                          <Calendar className="w-5 h-5 text-[#ef8636]" />
                          <h3 className="text-3xl font-bold text-[#ef8636]">1992</h3>
                        </div>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {t('who.history.1992')} <span className="font-bold text-[#ef8636]">{t('who.history.1992Highlight')}</span> {t('who.history.1992Cont')} <span className="font-bold text-[#ef8636]">{t('who.history.1992Highlight2')}</span> {t('who.history.1992Cont2')}
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 z-10 order-1 md:order-2 flex-shrink-0 -translate-x-1/2">
                  <div className="w-4 h-4 bg-[#ef8636] rounded-full border-2 border-white shadow-lg"></div>
                </div>
                <div className="w-full md:w-1/2 md:pl-12 order-3"></div>
              </div>

              {/* 1993 */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center group">
                <div className="w-full md:w-1/2 md:pr-12 order-3"></div>
                <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 z-10 order-1 md:order-2 flex-shrink-0 -translate-x-1/2">
                  <div className="w-4 h-4 bg-[#1daa62] rounded-full border-2 border-white shadow-lg"></div>
                </div>
                <div className="w-full md:w-1/2 md:pl-12 order-2 md:order-3">
                  <Card className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-xl bg-white/90 backdrop-blur-sm group-hover:bg-white">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-[#1daa62]/10 rounded-full">
                          <Calendar className="w-5 h-5 text-[#1daa62]" />
                          <h3 className="text-3xl font-bold text-[#1daa62]">1993</h3>
                        </div>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed">{t('who.history.1993')}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* 2015 - Revival */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center group">
                <div className="w-full md:w-1/2 md:pr-12 md:text-right order-2 md:order-1">
                  <Card className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-xl bg-white/90 backdrop-blur-sm group-hover:bg-white">
                    <CardContent className="p-8">
                      <div className="flex items-center md:justify-end gap-4 mb-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-[#ef8636]/10 rounded-full">
                          <Calendar className="w-5 h-5 text-[#ef8636]" />
                          <h3 className="text-3xl font-bold text-[#ef8636]">2015</h3>
                        </div>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed">{t('who.history.2015')}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 z-10 order-1 md:order-2 flex-shrink-0 -translate-x-1/2">
                  <div className="w-4 h-4 bg-[#ef8636] rounded-full border-2 border-white shadow-lg"></div>
                </div>
                <div className="w-full md:w-1/2 md:pl-12 order-3"></div>
              </div>

              {/* 2025 - Present */}
              <div className="relative flex flex-col md:flex-row items-start md:items-center group">
                <div className="w-full md:w-1/2 md:pr-12 order-3"></div>
                <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 z-10 order-1 md:order-2 flex-shrink-0 -translate-x-1/2">
                  <div className="w-4 h-4 bg-[#1daa62] rounded-full border-2 border-white shadow-lg"></div>
                </div>
                <div className="w-full md:w-1/2 md:pl-12 order-2 md:order-3">
                  <Card className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-[#1daa62]/20 shadow-xl bg-gradient-to-br from-white to-[#1daa62]/5 group-hover:from-white group-hover:to-[#1daa62]/10">
                    <CardContent className="p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#1daa62]/20 to-[#ef8636]/20 rounded-full border border-[#1daa62]/30">
                          <Calendar className="w-5 h-5 text-[#1daa62]" />
                          <h3 className="text-3xl font-bold bg-gradient-to-r from-[#1daa62] to-[#ef8636] bg-clip-text text-transparent">2025</h3>
                          <span className="text-xs font-semibold text-[#1daa62] bg-white px-2 py-1 rounded-full">Present</span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed font-medium">{t('who.history.2025')}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Party Structure */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-sdp-dark">{t('who.structure.title')}</h2>
            <p className="text-lg text-gray-600">{t('who.structure.subtitle')}</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-xl transition-shadow border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-[#ef8636]/20 to-[#ef8636]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#ef8636]" />
                </div>
                <CardTitle className="text-center">{t('who.structure.formation')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">{t('who.structure.formationDesc')}</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-xl transition-shadow border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-[#1daa62]/20 to-[#1daa62]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-[#1daa62]" />
                </div>
                <CardTitle className="text-center">{t('who.structure.leadership')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">{t('who.structure.leadershipDesc')}</p>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-xl transition-shadow border-0 shadow-lg">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-[#ef8636]/20 to-[#ef8636]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-[#ef8636]" />
                </div>
                <CardTitle className="text-center">{t('who.structure.financing')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center">{t('who.structure.financingDesc')}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Original Manifesto */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-[#ef8636]/10 text-[#ef8636] rounded-full text-sm font-semibold mb-4">
              {t('who.manifesto.badge')}
            </span>
            <h2 className="text-4xl font-bold mb-4 text-sdp-dark">{t('who.manifesto.title')}</h2>
            <p className="text-lg text-gray-600">{t('who.manifesto.subtitle')}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {manifestoItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg group overflow-hidden relative">
                  <img 
                    src={item.imagePath} 
                    alt={t(`who.manifesto.${item.titleKey}`)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/5 p-6">
                    <div className="w-16 h-16 backdrop-blur-md bg-white/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-white/40">
                      <Icon className="w-8 h-8 text-white drop-shadow-lg" />
                    </div>
                    <h3 className="text-xl text-white font-bold drop-shadow-lg mb-2">{t(`who.manifesto.${item.titleKey}`)}</h3>
                    <p className="text-white leading-relaxed drop-shadow-lg">{t(`who.manifesto.${item.titleKey}Desc`)}</p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Revival & Platform */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">SDP Revived</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  According to Chief Olu Falae, SDP was revived to address the failings of the two prominent Parties (People's Democratic Party and All Progressive Congress), 
                  and to provide credible alternatives to Nigerians, as the SDP predates both the APC and PDP and has a history of winning elections.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The revived party was formed by a coalition of 13 parties and contested in the 2015 Nigerian general elections, marking its return to active political participation.
                </p>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Our Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  SDP's platform focuses on providing credible alternatives, fighting corruption, and creating an ideological party with structured deliverables. 
                  The party aims to unify the Nigerian people and give voice to their aspirations.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We are committed to opening political space for young Nigerians and reflecting gender sensitivity while standing with people with disabilities.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Platform Items */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-sdp-dark">Platform Objectives</h2>
            <p className="text-lg text-gray-600">Our commitment to Nigeria's future</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {platformItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg group">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#ef8636] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2 text-sdp-dark">{item.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Former Members */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-[#1daa62]/10 text-[#1daa62] rounded-full text-sm font-semibold mb-4">
              {t('who.formerMembers.badge')}
            </span>
            <h2 className="text-4xl font-bold mb-4 text-sdp-dark">{t('who.formerMembers.title')}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {t('who.formerMembers.subtitle')}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {formerMembers.map((member, index) => {
              const filename = getNameToFilename(member.name);
              const imagePath = filename ? `/past members/${filename}` : '';
              return (
                <MemberCard 
                  key={index} 
                  member={member} 
                  imagePath={imagePath}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Current Leadership Structure */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-sdp-dark">Current Leadership Structure</h2>
            <p className="text-lg text-gray-600">The organs that guide SDP today</p>
          </div>
          
          {/* NWC */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-8 h-8 text-[#ef8636]" />
              <h3 className="text-2xl font-bold text-sdp-dark">National Working Committee (NWC)</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-xl transition-shadow border-0 shadow-lg">
                <CardHeader>
                  <div className="w-24 h-24 bg-[#ef8636]/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-[#ef8636]" />
                  </div>
                  <CardTitle className="text-center">Prince Adebayo</CardTitle>
                  <p className="text-center text-sm text-gray-600">National Chairman</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 text-center">Leading SDP's vision for good governance and national development.</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-xl transition-shadow border-0 shadow-lg">
                <CardHeader>
                  <div className="w-24 h-24 bg-[#1daa62]/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-[#1daa62]" />
                  </div>
                  <CardTitle className="text-center">Secretary</CardTitle>
                  <p className="text-center text-sm text-gray-600">National Secretary</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 text-center">Overseeing party administration and coordination.</p>
                </CardContent>
              </Card>
              <Card className="hover:shadow-xl transition-shadow border-0 shadow-lg">
                <CardHeader>
                  <div className="w-24 h-24 bg-[#ef8636]/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-[#ef8636]" />
                  </div>
                  <CardTitle className="text-center">NWC Members</CardTitle>
                  <p className="text-center text-sm text-gray-600">Committee Members</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 text-center">Dedicated leaders working for Nigeria's progress.</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Senate Caucus */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-8 h-8 text-[#1daa62]" />
              <h3 className="text-2xl font-bold text-sdp-dark">Senate Caucus</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="hover:shadow-xl transition-shadow border-0 shadow-lg">
                <CardHeader>
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-[#ef8636]/20">
                    <img 
                      src="/SenatorWadada.jpg" 
                      alt="Senator Wadada" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-center">Senator Wadada</CardTitle>
                  <p className="text-center text-sm text-gray-600">Senator</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 text-center mb-4 leading-relaxed">
                    Sen. Wadada is currently serving as first-term Senator representing Nasarawa West Senatorial District in the 10th National assembly under the platform of the Social Democratic Party (SDP).
                  </p>
                  <Button className="w-full bg-[#ef8636] hover:bg-[#ef8636]/90">View Achievements</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-xl transition-shadow border-0 shadow-lg">
                <CardHeader>
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-[#1daa62]/20">
                    <img 
                      src="/SenatorAkwashiki.jpg" 
                      alt="Senator Akwashiki" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-center">Senator Godiya Akwashiki</CardTitle>
                  <p className="text-center text-sm text-gray-600">Senator</p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 text-center mb-4 leading-relaxed">
                    Godiya Akwashiki (born 3 August 1973) in Angba Iggah of Nasarawa State, Nigeria is a Nigerian politician. He is the current senator representing Nasarawa North senatorial district in Nasarawa State. He was elected into the senate during the 2019 general elections of Nigeria. Akwashiki was re-elected during the 2023 general election. Before being elected into the senate he was the Deputy Speaker of the Nasarawa State House of Assembly.
                  </p>
                  <Button className="w-full bg-[#1daa62] hover:bg-[#1daa62]/90">View Achievements</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Constitution */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="border-0 shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-8 h-8 text-[#ef8636]" />
                <CardTitle className="text-2xl">Party Constitution</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-6">
                Download the official SDP Constitution. This document outlines our party's structure, 
                principles, and governance framework. Transparency is key to building trust.
              </p>
              <Button className="bg-[#ef8636] hover:bg-[#ef8636]/90">
                <Download className="w-4 h-4 mr-2" />
                Download Constitution (PDF)
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WhoWeAre;
