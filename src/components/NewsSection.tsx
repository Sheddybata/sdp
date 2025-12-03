import React from 'react';

const news = [
  { id: 1, title: "Forward Party Leads in Latest Polls", date: "Nov 28, 2025", category: "Campaign", excerpt: "New polling shows unprecedented support across key swing states..." },
  { id: 2, title: "Healthcare Plan Endorsed by Nurses Union", date: "Nov 25, 2025", category: "Policy", excerpt: "Major healthcare workers union announces support for universal coverage proposal..." },
  { id: 3, title: "Record Turnout at Philadelphia Rally", date: "Nov 22, 2025", category: "Events", excerpt: "Over 50,000 supporters gathered for the largest rally of the campaign..." },
  { id: 4, title: "Climate Action Plan Released", date: "Nov 20, 2025", category: "Policy", excerpt: "Comprehensive strategy for achieving net-zero emissions by 2050..." },
  { id: 5, title: "Youth Voter Registration Surge", date: "Nov 18, 2025", category: "Campaign", excerpt: "Record numbers of young voters registering ahead of election..." },
  { id: 6, title: "Economic Justice Tour Announced", date: "Nov 15, 2025", category: "Events", excerpt: "10-city tour to highlight fair wage and worker protection policies..." }
];

export const NewsSection: React.FC = () => {
  return (
    <section id="news" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-blue-900 mb-4">Latest News</h2>
            <p className="text-xl text-gray-600">Stay informed on campaign updates and policy announcements.</p>
          </div>
          <button className="hidden md:block px-6 py-3 border-2 border-blue-900 text-blue-900 font-bold rounded-lg hover:bg-blue-900 hover:text-white transition">
            View All News
          </button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map(item => (
            <article key={item.id} className="group cursor-pointer">
              <div className="bg-gradient-to-br from-blue-900 to-blue-700 h-48 rounded-xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-white/30 text-6xl font-bold">{item.category[0]}</span>
              </div>
              <span className="text-sm font-semibold text-red-600">{item.category}</span>
              <h3 className="text-xl font-bold text-blue-900 mt-1 group-hover:text-red-600 transition">{item.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{item.date}</p>
              <p className="text-gray-600 mt-3">{item.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};