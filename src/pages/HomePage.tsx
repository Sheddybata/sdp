import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { StatsBar } from '@/components/StatsBar';
import { JoinModal } from '@/components/JoinModal';
import { DonateModal } from '@/components/DonateModal';
import FloatingStatsBar from '@/components/FloatingStatsBar';
import TestimonialsSection from '@/components/TestimonialsSection';
import RecentActivity from '@/components/RecentActivity';
import { PolicyTracker } from '@/components/PolicyTracker';
import { ElectionCountdown } from '@/components/ElectionCountdown';
import { FloatingActionButtons } from '@/components/FloatingActionButtons';
import { EndorsementsSection } from '@/components/EndorsementsSection';
import { ProductsSection } from '@/components/ProductsSection';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

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
    <div className={`text-center group cursor-pointer p-8 rounded-2xl bg-white hover:bg-gradient-to-br ${hoverBgClass} hover:to-transparent transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-100 ${hoverBorderClass}`}>
      <div className="relative mb-6">
        <div className="relative w-48 h-48 mx-auto mb-4 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
          {imagePath && !imageError ? (
            <img
              src={imagePath}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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

// Win Card Component
const WinCard: React.FC<{
  title: string;
  category: string;
  categoryColor: string;
  date: string;
  description: string;
}> = ({ title, category, categoryColor, date, description }) => {
  const [imageError, setImageError] = useState(false);
  const imagePath = getWinImagePath(title);
  const isGreen = categoryColor === '[#1daa62]';
  const fallbackGradient = isGreen
    ? 'bg-gradient-to-br from-[#1daa62] to-[#1daa62]/80'
    : 'bg-gradient-to-br from-[#ef8636] to-[#ef8636]/80';
  const categoryBgClass = isGreen ? 'bg-[#1daa62]/10' : 'bg-[#ef8636]/10';
  const categoryTextClass = isGreen ? 'text-[#1daa62]' : 'text-[#ef8636]';
  const hoverTextClass = isGreen ? 'group-hover:text-[#1daa62]' : 'group-hover:text-[#ef8636]';

  return (
    <Card className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
      <div className="relative h-48 overflow-hidden">
        {imagePath && !imageError ? (
          <img
            src={imagePath}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={`w-full h-full ${fallbackGradient}`}>
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute top-4 right-4 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-3 py-1 ${categoryBgClass} ${categoryTextClass} rounded-full text-xs font-semibold`}>{category}</span>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        <h3 className={`text-xl font-bold mb-3 text-sdp-dark ${hoverTextClass} transition-colors`}>{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};

// Helper function to get image path from card title
const getWinImagePath = (title: string): string => {
  const imageMap: { [key: string]: string } = {
    'Senator Wadada Moves Motion': 'SenatorWadadaMovesMotion.jpg',
    'SDP Nasarawa Distributes Fertilizer': 'SDPNasarawaDistributesFertilizer.jpeg',
    'Party Chairman Visits IDP Camp': 'PartyChairmanVisitsIDPCamp.jpg'
  };
  const filename = imageMap[title];
  return filename ? `/Latest wins/${filename}` : '';
};

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const [joinOpen, setJoinOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  // Next general election date (February 2027)
  const electionDate = new Date('2027-02-25T08:00:00');

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onDonateClick={() => setDonateOpen(true)} 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      
      <FloatingStatsBar members={247893} states={36} year={2027} />
      <FloatingActionButtons
        onJoinClick={() => setJoinOpen(true)}
        onDonateClick={() => setDonateOpen(true)}
        onVolunteerClick={() => setJoinOpen(true)}
      />
      
      {/* Hero Section */}
      <section id="hero">
        <Hero 
          onJoinClick={() => setJoinOpen(true)} 
          onDonateClick={() => setDonateOpen(true)}
          supporterCount={247893}
        />
      </section>

      {/* Policy Tracker Widget */}
      <PolicyTracker />

      {/* Latest Wins - 3 Column Grid */}
      <section id="wins" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-[#1daa62]/10 text-[#1daa62] rounded-full text-sm font-semibold mb-4">
              {t('wins.achievements')}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-sdp-dark">{t('wins.title')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('wins.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <WinCard
              title={t('wins.win1.title')}
              category={t('wins.category.legislative')}
              categoryColor="[#ef8636]"
              date={`2 ${t('wins.date.daysAgo')}`}
              description={t('wins.win1.desc')}
            />
            <WinCard
              title={t('wins.win2.title')}
              category={t('wins.category.agriculture')}
              categoryColor="[#1daa62]"
              date={`5 ${t('wins.date.daysAgo')}`}
              description={t('wins.win2.desc')}
            />
            <WinCard
              title={t('wins.win3.title')}
              category={t('wins.category.humanitarian')}
              categoryColor="[#ef8636]"
              date={`1 ${t('wins.date.weekAgo')}`}
              description={t('wins.win3.desc')}
            />
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-sdp-dark">{t('why.title')}</h2>
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

      {/* Footer Pre-Emptive - Find Ward Chairman */}
      <section className="py-20 bg-gradient-to-br from-sdp-dark via-sdp-dark/95 to-sdp-dark text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ef8636]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#1daa62]/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{t('footer.find')}</h2>
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
                />
              </div>
              <Button className="bg-[#ef8636] hover:bg-[#ef8636]/90 text-white h-14 px-8 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all">
                <Search className="w-5 h-5 mr-2" />
                {t('action.search')}
              </Button>
            </div>
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

      {/* Testimonials Section */}
      <section id="testimonials">
        <TestimonialsSection />
      </section>

      {/* Recent Activity */}
      <section id="activity">
        <RecentActivity />
      </section>

      <Footer />
      <JoinModal isOpen={joinOpen} onClose={() => setJoinOpen(false)} />
      <DonateModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />
    </div>
  );
};

export default HomePage;

