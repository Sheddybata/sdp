import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  image?: string;
  text: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Amina Mohammed',
    role: 'Youth Leader',
    location: 'Lagos State',
    text: 'SDP represents the change we\'ve been waiting for. Their commitment to youth inclusion and social justice gives me hope for Nigeria\'s future.',
    rating: 5
  },
  {
    id: 2,
    name: 'Dr. Ibrahim Musa',
    role: 'Community Leader',
    location: 'Kano State',
    text: 'The party\'s focus on true federalism and grassroots development is exactly what Nigeria needs. I\'m proud to be part of this movement.',
    rating: 5
  },
  {
    id: 3,
    name: 'Chinwe Okafor',
    role: 'Business Owner',
    location: 'Abia State',
    text: 'SDP\'s economic policies make sense. They understand the challenges facing small businesses and have concrete plans to support us.',
    rating: 5
  },
  {
    id: 4,
    name: 'Hassan Bello',
    role: 'Farmer',
    location: 'Nasarawa State',
    text: 'The fertilizer distribution program by SDP Nasarawa shows they care about agriculture. This is the kind of practical support we need.',
    rating: 5
  },
  {
    id: 5,
    name: 'Fatima Abdullahi',
    role: 'Teacher',
    location: 'Kaduna State',
    text: 'Education reform is crucial, and SDP has the most comprehensive plan I\'ve seen. They understand what our schools need.',
    rating: 5
  },
  {
    id: 6,
    name: 'Emeka Nwankwo',
    role: 'Tech Entrepreneur',
    location: 'Enugu State',
    text: 'The party\'s vision for digital infrastructure and youth empowerment aligns with my values. SDP is building for the future.',
    rating: 5
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-[#ef8636]/10 text-[#ef8636] rounded-full text-sm font-semibold mb-4">
            What People Say
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-sdp-dark">Testimonials & Endorsements</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear from Nigerians across the country who believe in SDP's vision for a better Nigeria
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg group">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#ef8636] text-[#ef8636]" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-[#ef8636]/30 mb-4" />
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="border-t pt-4">
                  <p className="font-bold text-sdp-dark">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-xs text-[#1daa62] mt-1">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;



