import React, { useState } from 'react';
import { events } from '../data/events';

export const EventsSection: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const types = ['all', 'rally', 'town-hall', 'volunteer', 'fundraiser'];
  const filtered = filter === 'all' ? events : events.filter(e => e.type === filter);

  return (
    <section id="events" className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Upcoming Events</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Join us at rallies, town halls, and volunteer opportunities near you.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {types.map(type => (
            <button key={type} onClick={() => setFilter(type)} className={`px-5 py-2 rounded-full font-medium transition capitalize ${filter === type ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>
              {type === 'all' ? 'All Events' : type.replace('-', ' ')}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(event => (
            <div key={event.id} className="bg-gray-800 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              {event.image && <img src={event.image} alt={event.title} className="w-full h-40 object-cover" />}
              <div className="p-5">
                <span className="text-xs font-semibold text-red-400 uppercase tracking-wide">{event.type.replace('-', ' ')}</span>
                <h3 className="text-lg font-bold mt-2">{event.title}</h3>
                <div className="mt-3 space-y-1 text-sm text-gray-400">
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    {event.date} at {event.time}
                  </p>
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                    {event.location}
                  </p>
                </div>
                <button className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition">RSVP Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};