import React, { useState } from 'react';

export const VolunteerSection: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: '' });
  const [submitted, setSubmitted] = useState(false);
  const interests = ['Phone Banking', 'Canvassing', 'Social Media', 'Event Planning', 'Data Entry', 'Local Organizing'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.name && form.email && form.interest) {
      setSubmitted(true);
    }
  };

  return (
    <section id="volunteer" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-blue-900 mb-6">Join Our Team</h2>
            <p className="text-xl text-gray-600 mb-8">Volunteers are the backbone of our movement. Whether you have an hour or a day, there's a place for you.</p>
            <div className="grid grid-cols-2 gap-4">
              {interests.map(i => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-800">{i}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">Welcome to the Team!</h3>
                <p className="text-gray-600">We'll be in touch soon with next steps.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-2xl font-bold text-blue-900 mb-4">Sign Up to Volunteer</h3>
                <input type="text" placeholder="Full Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                <input type="email" placeholder="Email Address" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
                <select value={form.interest} onChange={e => setForm({...form, interest: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required>
                  <option value="">Select Interest</option>
                  {interests.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
                <button type="submit" className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition">Join the Movement</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};