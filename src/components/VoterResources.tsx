import React, { useState, useEffect } from 'react';

export const VoterResources: React.FC = () => {
  const electionDate = new Date('2026-11-03');
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = electionDate.getTime() - now.getTime();
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const resources = [
    { title: 'Register to Vote', desc: 'Check your registration status or register online', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { title: 'Find Polling Location', desc: 'Locate your nearest voting center', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' },
    { title: 'Absentee Ballot', desc: 'Request your mail-in ballot today', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { title: 'Voter ID Requirements', desc: 'Know what ID you need to vote', icon: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0' }
  ];

  return (
    <section className="py-20 bg-red-600 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Make Your Voice Heard</h2>
          <p className="text-xl text-red-100">Everything you need to participate in our democracy.</p>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8 mb-12">
          <h3 className="text-center text-2xl font-bold mb-6">Countdown to Election Day</h3>
          <div className="flex justify-center gap-8">
            {[['days', countdown.days], ['hours', countdown.hours], ['minutes', countdown.mins]].map(([label, val]) => (
              <div key={label as string} className="text-center">
                <div className="text-5xl md:text-7xl font-bold">{val}</div>
                <div className="text-red-200 uppercase tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map(r => (
            <button key={r.title} className="bg-white text-blue-900 rounded-xl p-6 text-left hover:transform hover:scale-105 transition-all shadow-lg group">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-600 transition">
                <svg className="w-6 h-6 text-red-600 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={r.icon} />
                </svg>
              </div>
              <h4 className="font-bold text-lg mb-2">{r.title}</h4>
              <p className="text-gray-600 text-sm">{r.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};