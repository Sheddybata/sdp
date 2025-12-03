import React from 'react';

const endorsements = [
  { name: 'National Teachers Union', type: 'Organization' },
  { name: 'Environmental Action League', type: 'Organization' },
  { name: 'Small Business Coalition', type: 'Organization' },
  { name: 'Veterans for Progress', type: 'Organization' },
  { name: 'Healthcare Workers United', type: 'Organization' },
  { name: 'Youth Vote Alliance', type: 'Organization' }
];

export const Endorsements: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-2xl font-bold text-blue-900 mb-8">Endorsed By</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {endorsements.map(e => (
            <div key={e.name} className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-bold text-sm text-blue-900">{e.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};