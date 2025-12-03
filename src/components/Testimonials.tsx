import React, { useState, useEffect } from 'react';

const testimonials = [
  { id: 1, name: "Maria G.", location: "Ohio", quote: "For the first time, I feel like a party actually represents working families like mine." },
  { id: 2, name: "James T.", location: "Michigan", quote: "Their healthcare plan would change everything for my community. This is what leadership looks like." },
  { id: 3, name: "Sarah L.", location: "Pennsylvania", quote: "I've never been politically active before, but this movement inspired me to volunteer." },
  { id: 4, name: "Robert M.", location: "Wisconsin", quote: "Finally, politicians who listen to veterans and follow through on their promises." }
];

export const Testimonials: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-800 to-blue-900 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Voices of the Movement</h2>
        <div className="relative min-h-[200px]">
          {testimonials.map((t, i) => (
            <div key={t.id} className={`absolute inset-0 transition-opacity duration-500 ${i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <svg className="w-12 h-12 text-red-500 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
              <p className="text-2xl md:text-3xl font-light mb-6 italic">"{t.quote}"</p>
              <p className="font-bold text-lg">{t.name}</p>
              <p className="text-blue-300">{t.location}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`w-3 h-3 rounded-full transition ${i === current ? 'bg-red-500' : 'bg-white/30 hover:bg-white/50'}`} />
          ))}
        </div>
      </div>
    </section>
  );
};