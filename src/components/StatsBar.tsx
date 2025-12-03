import React, { useState, useEffect } from 'react';

interface StatsBarProps {
  supporters: number;
  volunteers: number;
  raised: number;
}

export const StatsBar: React.FC<StatsBarProps> = ({ supporters, volunteers, raised }) => {
  const [counts, setCounts] = useState({ s: 0, v: 0, r: 0 });

  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        s: Math.floor(supporters * progress),
        v: Math.floor(volunteers * progress),
        r: Math.floor(raised * progress)
      });
      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [supporters, volunteers, raised]);

  const stats = [
    { label: 'Supporters', value: counts.s.toLocaleString(), suffix: '+' },
    { label: 'Volunteers', value: counts.v.toLocaleString(), suffix: '' },
    { label: 'Raised', value: `$${(counts.r / 1000000).toFixed(1)}M`, suffix: '' }
  ];

  return (
    <section className="bg-blue-900 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-3 gap-8 text-center text-white">
          {stats.map(stat => (
            <div key={stat.label}>
              <div className="text-3xl md:text-5xl font-bold">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-blue-200 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};