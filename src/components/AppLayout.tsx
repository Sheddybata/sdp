import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { StatsBar } from './StatsBar';
import { IssuesSection } from './IssuesSection';
import { CandidatesSection } from './CandidatesSection';
import { EventsSection } from './EventsSection';
import { DonationSection } from './DonationSection';
import { VolunteerSection } from './VolunteerSection';
import { NewsSection } from './NewsSection';
import { VoterResources } from './VoterResources';
import { Endorsements } from './Endorsements';
import { Testimonials } from './Testimonials';
import { Footer } from './Footer';
import { JoinModal } from './JoinModal';
import { DonateModal } from './DonateModal';

const AppLayout: React.FC = () => {
  const [joinOpen, setJoinOpen] = useState(false);
  const [donateOpen, setDonateOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onDonateClick={() => setDonateOpen(true)} 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <Hero 
        onJoinClick={() => setJoinOpen(true)} 
        onDonateClick={() => setDonateOpen(true)}
        supporterCount={247893}
      />
      <StatsBar supporters={247893} volunteers={18542} raised={12500000} />
      <IssuesSection />
      <CandidatesSection />
      <Testimonials />
      <Endorsements />
      <EventsSection />
      <DonationSection raised={12500000} goal={20000000} />
      <VolunteerSection />
      <NewsSection />
      <VoterResources />
      <Footer />
      <JoinModal isOpen={joinOpen} onClose={() => setJoinOpen(false)} />
      <DonateModal isOpen={donateOpen} onClose={() => setDonateOpen(false)} />
    </div>
  );
};

export default AppLayout;