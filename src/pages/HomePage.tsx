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
            loading="lazy"
            decoding="async"
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
  const [candidateImageError, setCandidateImageError] = useState(false);
  
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

      {/* Presidential Candidate Spotlight - Redesigned for Authority & Impact */}
      <section id="presidential-candidate" className="py-24 bg-white relative overflow-hidden">
        {/* Designer touches: Subtile pattern overlays or gradients */}
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-[#01a85a]/5 to-transparent rounded-bl-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-gradient-to-tr from-[#f48735]/5 to-transparent rounded-tr-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-start mb-12">
            {/* Left Column: Image & Quick Stats */}
            <div className="w-full lg:w-2/5 lg:sticky lg:top-24">
              <div className="relative group">
                {/* Image Frame with Designer Border */}
                <div className="absolute -inset-4 border-2 border-dashed border-[#01a85a]/20 rounded-[2rem] transition-transform duration-500 group-hover:scale-105"></div>
                
                <div className="relative rounded-[1.5rem] overflow-hidden shadow-2xl bg-white aspect-[4/5]">
                  {!candidateImageError ? (
                    <img
                      src="/AdewoleAdebayo.jpeg"
                      alt="Prince Adewale Adebayo"
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      onError={() => setCandidateImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">Presidential Candidate</span>
                    </div>
                  )}
                  
                  {/* Floating Identity Label */}
                  <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-md rounded-xl shadow-lg border-l-4 border-[#f48735]">
                    <p className="text-[#01a85a] font-bold text-sm tracking-widest uppercase mb-1">Social Democratic Party</p>
                    <h3 className="text-2xl font-black text-sdp-dark">2027 CANDIDATE</h3>
                  </div>
                </div>
              </div>
              
              {/* Quick Call to Action */}
              <div className="mt-8 flex flex-col gap-4">
                <Button
                  className="w-full h-14 bg-[#01a85a] hover:bg-[#01a85a]/90 text-white text-lg font-bold shadow-xl shadow-[#01a85a]/20 transition-all active:scale-[0.98]"
                  onClick={() => setJoinOpen(true)}
                >
                  Join the Campaign
                </Button>
                <p className="text-center text-sm text-gray-500 font-medium italic">"The Progress we deserve is within our reach."</p>
              </div>
            </div>

            {/* Right Column: Full Narrative Bio */}
            <div className="w-full lg:w-3/5">
              <header className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-16 bg-[#f48735]"></div>
                  <span className="text-[#f48735] font-bold text-lg tracking-[0.2em] uppercase">The Visionary Leader</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-sdp-dark mb-6 leading-tight">
                  Prince Adewale <span className="text-[#01a85a]">Adebayo</span>
                </h2>
                <p className="text-2xl text-gray-600 font-light leading-relaxed">
                  A distinguished Nigerian Lawyer, media mogul, and the architect of a new democratic dawn.
                </p>
              </header>

              <div className="grid gap-10">
                {/* Introduction Section */}
                <div className="prose prose-lg max-w-none text-gray-700">
                  <p className="leading-loose first-letter:text-7xl first-letter:font-black first-letter:text-[#01a85a] first-letter:mr-3 first-letter:float-left">
                    Adewole Adebayo is a Nigerian Lawyer and Founder of KAFTAN TV. He is currently running for President of Nigeria under the Social Democratic Party, championing a roadmap for national renewal and economic empowerment.
                  </p>
                </div>

                {/* Structured Bio Blocks */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-gray-50 border-l-4 border-[#01a85a] hover:bg-white hover:shadow-xl transition-all duration-300">
                    <h4 className="text-sm font-bold text-[#01a85a] uppercase tracking-widest mb-3">Education</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Born Ondo City, 1972. Alumni of Obafemi Awolowo University (Law). Graduate of the Nigerian Law School and New York Bar Exam. Licensed to practice in Australia, Canada, UK, and multiple U.S. jurisdictions.
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-gray-50 border-l-4 border-[#f48735] hover:bg-white hover:shadow-xl transition-all duration-300">
                    <h4 className="text-sm font-bold text-[#f48735] uppercase tracking-widest mb-3">Media & Enterprise</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Founded Adewole Adebayo & Co., House of Law in 2002. Established <span className="font-bold">KAFTAN TV</span> in 2016, building a continental platform for African narratives and public discourse.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Achievement Sections - Re-aligned to cover space below the image/bio */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 group">
              <div className="flex items-center gap-4 mb-6">
                <span className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-[#01a85a] text-white font-black text-lg group-hover:scale-110 transition-transform">01</span>
                <h3 className="text-2xl font-bold text-sdp-dark">Legal Eminence</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                Began his career as a litigation lawyer at Tunji Abayomi and Co. He notably represented Continental Transfert Technique Limited in the landmark constitutional case against the Federal Government regarding CERPAC fee collections.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 group">
              <div className="flex items-center gap-4 mb-6">
                <span className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-[#f48735] text-white font-black text-lg group-hover:scale-110 transition-transform">02</span>
                <h3 className="text-2xl font-bold text-sdp-dark">Philanthropic Impact</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                A dedicated humanist, Prince Adebayo sponsors nearly 2,000 young Nigerians in domestic and international tertiary institutions, fostering a generation of scholars and empowered citizens.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 group">
              <div className="flex items-center gap-4 mb-6">
                <span className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-[#01a85a] text-white font-black text-lg group-hover:scale-110 transition-transform">03</span>
                <h3 className="text-2xl font-bold text-sdp-dark">Political Stewardship</h3>
              </div>
              <p className="text-gray-600 leading-relaxed text-lg">
                A pivotal figure in the "Third Force," Adebayo transitioned from public affairs commentator to presidential candidate, currently mobilizing for the 2027 general election under the SDP banner.
              </p>
            </div>
          </div>
        </div>
      </section>

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

