import React, { useState } from 'react';
import { issues } from '../data/issues';

const icons: Record<string, JSX.Element> = {
  heart: <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>,
  leaf: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93z"/>,
  dollar: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>,
  book: <path d="M12 2l-5.5 9h11z M12 22l5.5-9h-11z"/>,
  scale: <path d="M12 3v18M3 12h18M5.5 6.5l13 13M18.5 6.5l-13 13"/>,
  check: <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>,
  globe: <circle cx="12" cy="12" r="10"/>,
  building: <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>,
  star: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>,
  briefcase: <path d="M20 7h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5z"/>
};

export const IssuesSection: React.FC = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="issues" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Our Platform</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Clear positions on the issues that matter most to American families.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {issues.map(issue => (
            <div key={issue.id} onClick={() => setExpanded(expanded === issue.id ? null : issue.id)} className="bg-white rounded-xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition-all border-l-4 border-red-600">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">{icons[issue.icon]}</svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-blue-900">{issue.title}</h3>
                  <span className="text-sm text-red-600 font-medium">{issue.stats}</span>
                </div>
              </div>
              {expanded === issue.id && <p className="mt-4 text-gray-600 animate-fadeIn">{issue.description}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};