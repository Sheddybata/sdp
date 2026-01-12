import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, UserPlus, CreditCard, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'react-router-dom';

export const EMembershipSection: React.FC = () => {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: <CreditCard className="w-6 h-6 text-sdp-orange" />,
      title: 'Digital ID Card',
      description: 'Instant generation of your official digital membership card with a secure QR code.'
    },
    {
      icon: <UserPlus className="w-6 h-6 text-sdp-green" />,
      title: 'Grassroots Access',
      description: 'Directly connect with your local ward and stay updated on party activities in your area.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-sdp-orange" />,
      title: 'Verified Status',
      description: 'Your membership is officially recorded in the national SDP database.'
    }
  ];

  return (
    <section id="e-membership" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-sdp-green/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sdp-orange/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Column: Content */}
          <div className="w-full lg:w-1/2 text-left">
            <span className="inline-block px-4 py-2 bg-sdp-orange/10 text-sdp-orange rounded-full text-sm font-bold mb-6 tracking-wide uppercase">
              Become a Member
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-sdp-dark mb-6 leading-tight">
              Join the <span className="text-sdp-green">E-Membership</span> Portal
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
              Step into the future of political engagement. Our digital membership portal makes it easy for every Nigerian to join the movement for a better nation.
            </p>

            <div className="space-y-6 mb-10">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all duration-300 border border-transparent hover:border-gray-100">
                  <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg shadow-sm flex items-center justify-center">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-sdp-dark mb-1">{benefit.title}</h4>
                    <p className="text-gray-500 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild className="h-14 px-10 bg-sdp-green hover:bg-sdp-green/90 text-white font-bold rounded-xl shadow-xl shadow-sdp-green/20 text-lg">
                <Link to="/e-membership">
                  Register Now
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-14 px-10 border-2 border-gray-200 hover:border-sdp-orange hover:text-sdp-orange font-bold rounded-xl text-lg">
                <Link to="/e-membership">
                  Verify Membership
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Visual Preview */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="/emembership.png" 
                alt="SDP E-Membership Portal" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sdp-dark/60 via-transparent to-transparent"></div>
              
              {/* Floating Badge Mockup */}
              <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border-l-4 border-sdp-orange animate-slide-in">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-sdp-green rounded-full flex items-center justify-center text-white">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-lg font-black text-sdp-dark leading-tight">Generate your membership card within 2 minutes</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background decorative square */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-sdp-orange/10 rounded-3xl -z-10 rotate-12"></div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-sdp-green/10 rounded-full -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

