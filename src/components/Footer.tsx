import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { PastMembersSection } from '@/components/PastMembersSection';

export type FooterProps = {
  showPastMembers?: boolean;
};

export const Footer: React.FC<FooterProps> = ({ showPastMembers = true }) => {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-sdp-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        {showPastMembers && <PastMembersSection variant="footer" />}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/sdplogo.jpg" 
                alt="SDP Logo" 
                className="w-12 h-12 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <span className="font-bold text-xl">Social Democratic Party</span>
            </div>
            <p className="text-gray-400">{t('footer.tagline')}</p>
            <p className="text-gray-400 text-sm mt-3">
              National Secretariat, 17 Nairobi Street, Wuse II, Abuja.<br />
              <a href="mailto:contact@officialsdp.org.ng" className="text-[#ef8636] hover:underline">
                contact@officialsdp.org.ng
              </a>
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/who-we-are" className="hover:text-[#ef8636] transition">{t('nav.about')}</Link></li>
              <li><Link to="/our-stand" className="hover:text-[#ef8636] transition">{t('nav.stand')}</Link></li>
              <li><Link to="/e-membership" className="hover:text-[#ef8636] transition">{t('nav.membership')}</Link></li>
              <li><Link to="/election-center" className="hover:text-[#ef8636] transition">{t('nav.election')}</Link></li>
              <li><Link to="/media-room" className="hover:text-[#ef8636] transition">{t('nav.media')}</Link></li>
              <li><Link to="/contact" className="hover:text-[#ef8636] transition">{t('nav.contact')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">{t('footer.getInvolved')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/e-membership" className="hover:text-[#ef8636] transition">{t('footer.joinParty')}</Link></li>
              <li><button onClick={() => {}} className="hover:text-[#ef8636] transition">{t('action.donate')}</button></li>
              <li><Link to="/election-center" className="hover:text-[#ef8636] transition">{t('action.volunteer')}</Link></li>
              <li><Link to="/election-center" className="hover:text-[#ef8636] transition">{t('footer.findCandidates')}</Link></li>
              <li><Link to="/contact" className="hover:text-[#ef8636] transition">{t('footer.stateChapters')}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">{t('footer.stayUpdated')}</h4>
            {subscribed ? (
              <p className="text-green-400">{t('footer.subscribed')}</p>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={t('footer.emailPlaceholder')} className="w-full px-4 py-3 bg-white/10 rounded-lg focus:ring-2 focus:ring-[#ef8636] outline-none" required />
                <button type="submit" className="w-full py-3 bg-[#ef8636] hover:bg-[#ef8636]/90 rounded-lg font-bold transition">{t('footer.subscribe')}</button>
              </form>
            )}
            <div className="flex gap-4 mt-6">
              {['twitter', 'facebook', 'instagram', 'youtube'].map(s => (
                <button key={s} className="w-10 h-10 bg-white/10 hover:bg-[#ef8636] rounded-full flex items-center justify-center transition">
                  <span className="sr-only">{s}</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/></svg>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <p>{t('footer.copyright')}</p>
          <div className="flex gap-6">
            <button className="hover:text-white transition">{t('footer.privacy')}</button>
            <button className="hover:text-white transition">{t('footer.terms')}</button>
            <button className="hover:text-white transition">{t('footer.accessibility')}</button>
          </div>
        </div>
      </div>
    </footer>
  );
};