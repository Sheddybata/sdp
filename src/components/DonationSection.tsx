import React, { useState } from 'react';

interface DonationProps {
  raised: number;
  goal: number;
}

export const DonationSection: React.FC<DonationProps> = ({ raised, goal }) => {
  const [amount, setAmount] = useState(50);
  const [recurring, setRecurring] = useState(false);
  const [donated, setDonated] = useState(false);
  const amounts = [25, 50, 100, 250, 500, 1000];
  const progress = Math.min((raised / goal) * 100, 100);

  const handleDonate = () => {
    setDonated(true);
    setTimeout(() => setDonated(false), 3000);
  };

  return (
    <section id="donate" className="py-20 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold mb-4">Power the Movement</h2>
          <p className="text-xl text-blue-200">Every dollar brings us closer to victory.</p>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-2xl p-8">
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span>${raised.toLocaleString()} raised</span>
              <span>Goal: ${goal.toLocaleString()}</span>
            </div>
            <div className="h-4 bg-blue-950 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-6">
            {amounts.map(a => (
              <button key={a} onClick={() => setAmount(a)} className={`py-3 rounded-lg font-bold transition ${amount === a ? 'bg-red-600 text-white' : 'bg-white/20 hover:bg-white/30'}`}>
                ${a}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => setRecurring(!recurring)} className={`w-12 h-6 rounded-full transition ${recurring ? 'bg-red-600' : 'bg-gray-600'}`}>
              <div className={`w-5 h-5 bg-white rounded-full transition-transform ${recurring ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
            <span>Make this a monthly donation</span>
          </div>
          {donated ? (
            <div className="text-center py-4 bg-green-600 rounded-lg font-bold animate-pulse">Thank you for your ${amount} donation!</div>
          ) : (
            <button onClick={handleDonate} className="w-full py-4 bg-red-600 hover:bg-red-700 rounded-lg text-xl font-bold transition transform hover:scale-105">
              Donate ${amount}{recurring ? '/month' : ''}
            </button>
          )}
        </div>
      </div>
    </section>
  );
};