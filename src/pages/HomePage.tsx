import React, { useMemo, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { JoinModal } from '@/components/JoinModal';
import { DonateModal } from '@/components/DonateModal';
import FloatingStatsBar from '@/components/FloatingStatsBar';
import { PolicyTracker } from '@/components/PolicyTracker';
import { ElectionCountdown } from '@/components/ElectionCountdown';
import { FloatingActionButtons } from '@/components/FloatingActionButtons';
import { EndorsementsSection } from '@/components/EndorsementsSection';
import { PastMembersSection } from '@/components/PastMembersSection';
import { ProductsSection } from '@/components/ProductsSection';
import { SDPTVPlayer } from '@/components/SDPTVPlayer';
import { EMembershipSection } from '@/components/EMembershipSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight, BarChart3 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMemberCount } from '@/hooks/useMemberCount';
import { stateChairmen } from '@/data/state-chairmen';
import { Link } from 'react-router-dom';
import { ACTIVITIES } from '@/data/activities';
import { ManifestoPrinciplesSection } from '@/components/ManifestoPrinciplesSection';

// Why Card Component
const WhyCard: React.FC<{
  title: string;
  description: string;
  imagePath: string;
  color: string;
}> = ({ title, description, imagePath, color }) => {
  const [imageError, setImageError] = useState(false);
  const isGreen = color === '[#1daa62]';
  const hoverBgClass = isGreen ? 'hover:from-[#1daa62]/5' : 'hover:from-[#ef8636]/5';
  const hoverTextClass = isGreen ? 'group-hover:text-[#1daa62]' : 'group-hover:text-[#ef8636]';
  const hoverBorderClass = isGreen ? 'hover:border-[#1daa62]/20' : 'hover:border-[#ef8636]/20';
  const fallbackBgClass = isGreen ? 'bg-gradient-to-br from-[#1daa62]/20 to-[#1daa62]/10' : 'bg-gradient-to-br from-[#ef8636]/20 to-[#ef8636]/10';
  const iconColorClass = isGreen ? 'text-[#1daa62]' : 'text-[#ef8636]';
  const badgeBgClass = isGreen ? 'bg-[#1daa62]' : 'bg-[#ef8636]';

  return (
    <div className={`text-center group cursor-pointer p-4 sm:p-8 rounded-2xl bg-white hover:bg-gradient-to-br ${hoverBgClass} hover:to-transparent transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-100 ${hoverBorderClass}`}>
      <div className="relative mb-4 sm:mb-6">
        <div className="relative w-full max-w-[320px] aspect-[4/3] mx-auto mb-4 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-[1.02] bg-gray-50 flex items-center justify-center">
          {imagePath && !imageError ? (
            <img
              src={imagePath}
              alt={title}
              className="w-full h-full object-contain object-center p-2 sm:p-3 group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
              decoding="async"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className={`w-full h-full ${fallbackBgClass} flex items-center justify-center`}>
              <svg className={`w-16 h-16 ${iconColorClass}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className={`absolute -top-2 -right-2 w-6 h-6 ${badgeBgClass} rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg`}></div>
      </div>
      <h3 className={`text-2xl font-bold mb-4 text-sdp-dark ${hoverTextClass} transition-colors`}>{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

const ActivityCard: React.FC<{
  title: string;
  category: string;
  image: string;
  description: string;
}> = ({ title, category, image, description }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden flex flex-col h-full">
      <div className="relative h-44 sm:h-52 shrink-0 overflow-hidden bg-gray-100">
        {!imageError ? (
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            decoding="async"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1daa62]/30 to-[#ef8636]/30" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-3 left-3 right-3">
          <span className="inline-block px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[#1daa62] rounded-full text-[10px] sm:text-xs font-semibold shadow-sm">
            {category}
          </span>
        </div>
      </div>
      <CardContent className="p-4 sm:p-6 flex flex-col flex-1">
        <h3 className="text-base sm:text-lg font-bold mb-2 text-sdp-dark group-hover:text-[#ef8636] transition-colors leading-snug line-clamp-3">
          {title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-5 sm:line-clamp-6 flex-1">{description}</p>
      </CardContent>
    </Card>
  );
};

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const { count: memberCount } = useMemberCount();
  const [joinOpen, setJoinOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [candidateImageError, setCandidateImageError] = useState(false);
  const [chairmanSearch, setChairmanSearch] = useState('');
  
  // Next general election date (February 2027)
  const electionDate = new Date('2027-02-25T08:00:00');
  const matchedChairmen = useMemo(() => {
    const query = chairmanSearch.trim().toLowerCase();
    if (!query) return [];
    return stateChairmen.filter((entry) => (
      entry.state.toLowerCase().includes(query) ||
      entry.chairman.toLowerCase().includes(query) ||
      entry.zone.toLowerCase().includes(query)
    ));
  }, [chairmanSearch]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onDonateClick={() => setDonateOpen(true)} 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      
      <FloatingStatsBar members={memberCount} states={36} year={2027} />
      <FloatingActionButtons />
      
      {/* Hero Section */}
      <section id="hero">
        <Hero 
          onJoinClick={() => setJoinOpen(true)} 
          onDonateClick={() => setDonateOpen(true)}
          supporterCount={memberCount}
        />
      </section>

      {/* How Better Government — intro card (metrics follow in PolicyTracker) */}
      <section className="py-6 sm:py-8 md:py-10 bg-gradient-to-br from-[#1daa62]/10 via-white to-[#ef8636]/8 border-y border-gray-100/90 px-0 sm:px-4 md:px-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl border border-gray-200/90 bg-white/95 shadow-md p-5 sm:p-6 md:p-8 flex flex-col sm:flex-row gap-5 sm:gap-6 md:items-start">
            <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#1daa62]/12 flex items-center justify-center border border-[#1daa62]/25">
              <BarChart3 className="w-7 h-7 text-[#1daa62]" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-sdp-dark mb-2">{t('tracker.title')}</h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{t('tracker.subtitle')}</p>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed border-l-2 border-[#ef8636] pl-3">
                {t('tracker.lead')}
              </p>
            </div>
          </div>
        </div>
      </section>
      <PolicyTracker />

      {/* Presidential Candidate Spotlight - Hidden until after primaries */}
      {/* 
      <section id="presidential-candidate" className="py-24 bg-white relative overflow-hidden">
        ... (section content hidden) ...
      </section>
      */}

      {/* SDP TV Section */}
      <section id="sdp-tv" className="py-16 md:py-24 bg-white px-0 sm:px-4 md:px-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10 md:mb-16">
            <span className="inline-block px-4 py-2 bg-sdp-green/10 text-sdp-green rounded-full text-sm font-semibold mb-4">
              {t('sdptv.badge')}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-sdp-dark">{t('sdptv.title')}</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-0">
              {t('sdptv.subtitle')}
            </p>
          </div>
          <div className="bg-gray-50 p-3 sm:p-6 md:p-10 rounded-none sm:rounded-2xl md:rounded-[2.5rem] shadow-xl border-y sm:border border-gray-100 -mx-0 sm:mx-0">
            <SDPTVPlayer />
          </div>
        </div>
      </section>

      {/* E-Membership Section */}
      <EMembershipSection />

      {/* Activities */}
      <section id="activities" className="py-16 md:py-20 bg-gray-50 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-14">
            <span className="inline-block px-4 py-2 bg-[#1daa62]/10 text-[#1daa62] rounded-full text-sm font-semibold mb-4">
              {t('wins.achievements')}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-sdp-dark">{t('wins.title')}</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              {t('wins.subtitle')}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {ACTIVITIES.slice(0, 3).map((item) => (
              <ActivityCard
                key={item.id}
                title={item.title}
                category={item.category ?? t('wins.categoryDefault')}
                image={item.image}
                description={item.body}
              />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Button asChild className="w-full sm:w-auto min-w-[200px] bg-[#1daa62] hover:bg-[#1daa62]/90 text-white rounded-xl px-8">
              <Link to="/media-room?tab=activities" className="inline-flex items-center justify-center gap-2">
                {t('wins.viewAll')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why SDP? Block - Icon Based */}
      <section id="why" className="py-20 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ef8636]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1daa62]/5 rounded-full blur-3xl"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#ef8636]/10 text-[#ef8636] rounded-full text-sm font-semibold mb-4">
              {t('why.values')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sdp-dark">{t('why.title')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('why.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <WhyCard
              title={t('why.social')}
              description={t('why.social.desc')}
              imagePath="/Why SDP/SocialJustice.png"
              color="[#ef8636]"
            />
            <WhyCard
              title={t('why.federalism')}
              description={t('why.federalism.desc')}
              imagePath="/Why SDP/TrueFederalism.png"
              color="[#1daa62]"
            />
            <WhyCard
              title={t('why.youth')}
              description={t('why.youth.desc')}
              imagePath="/Why SDP/YouthInclusion.png"
              color="[#ef8636]"
            />
          </div>
        </div>
      </section>

      {/* Core Principles / Original Manifesto */}
      <section id="manifesto-home" className="py-14 md:py-16 bg-gray-50 scroll-mt-28 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <ManifestoPrinciplesSection />
        </div>
      </section>

      {/* Products Section */}
      <ProductsSection />

      {/* Election Countdown */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <ElectionCountdown 
            electionDate={electionDate}
            onRegisterClick={() => window.open('/election-center', '_blank')}
          />
        </div>
      </section>

      {/* Endorsements Section */}
      <EndorsementsSection />

      <PastMembersSection variant="standalone" />

      {/* Footer Pre-Emptive - Find Ward Chairman */}
      <section className="py-20 bg-gradient-to-br from-sdp-dark via-sdp-dark/95 to-sdp-dark text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ef8636]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1daa62]/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('footer.find')}</h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {t('footer.subtitle')}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input 
                  type="text" 
                  placeholder={t('action.search')} 
                  className="pl-12 bg-white/20 border-white/30 text-white placeholder:text-gray-300 h-14 text-lg focus:bg-white/30 focus:border-white/50"
                  value={chairmanSearch}
                  onChange={(e) => setChairmanSearch(e.target.value)}
                />
              </div>
              <Button className="bg-[#ef8636] hover:bg-[#ef8636]/90 text-white h-14 px-8 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all">
                <Search className="w-5 h-5 mr-2" />
                {t('action.search')}
              </Button>
            </div>
            {chairmanSearch.trim() && (
              <div className="mt-6 space-y-3">
                {matchedChairmen.length > 0 ? (
                  matchedChairmen.slice(0, 6).map((entry) => (
                    <div
                      key={entry.state}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 rounded-xl bg-white/10 border border-white/20 px-4 py-3"
                    >
                      <p className="text-sm sm:text-base text-white">
                        <span className="font-semibold">{entry.state}:</span> {entry.chairman}
                      </p>
                      <p className="text-sm text-[#1daa62] font-semibold">{entry.phone}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-300">No chairman record found for this search.</p>
                )}
              </div>
            )}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#1daa62]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>36 States + FCT</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#1daa62]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>774 Local Governments</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#1daa62]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>8,809 Wards</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer showPastMembers={false} />
      <JoinModal isOpen={joinOpen} onClose={() => setJoinOpen(false)} />
      <DonateModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />
    </div>
  );
};

export default HomePage;

