import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
  const states = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onDonateClick={() => {}} 
        activeSection=""
        setActiveSection={() => {}}
      />
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 text-white relative" style={{ backgroundImage: 'url(/contact.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-white/90">National & State Offices - Get in Touch</p>
        </div>
      </section>

      {/* National Secretariat */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="w-8 h-8 text-[#ef8636]" />
            <h2 className="text-3xl font-bold text-sdp-dark">National Secretariat</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Office Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#ef8636] mt-1" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-gray-600">
                      SDP National Secretariat<br />
                      Plot 1234, Central Business District<br />
                      Abuja, FCT, Nigeria
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#1daa62] mt-1" />
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-gray-600">+234 800 SDP HELP (737-4357)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#ef8636] mt-1" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-gray-600">info@sdp.org.ng</p>
                  </div>
                </div>
                <div>
                  <p className="font-semibold mb-2">Office Hours</p>
                  <p className="text-gray-600">
                    Monday - Friday: 9:00 AM - 5:00 PM<br />
                    Saturday: 10:00 AM - 2:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Location Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Google Maps embed will display here</p>
                    <p className="text-sm text-gray-500 mt-2">SDP National Secretariat, Abuja</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* State Chapter Directory */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center text-sdp-dark">State Chapter Directory</h2>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            Connect with SDP leadership in your state. All 36 states + FCT represented.
          </p>
          
          <div className="mb-6">
            <Input 
              placeholder="Search by state or chairman name..." 
              className="max-w-md mx-auto"
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {states.slice(0, 12).map((state, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <h3 className="font-bold text-sdp-dark mb-2">{state}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Chairman:</span> [Name]
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <Phone className="w-3 h-3 inline mr-1" />
                    +234 XXX XXX XXXX
                  </p>
                  <p className="text-sm text-gray-600">
                    <Mail className="w-3 h-3 inline mr-1" />
                    {state.toLowerCase().replace(' ', '')}@sdp.org.ng
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button variant="outline">View All 36 States + FCT</Button>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center text-sdp-dark">Send Us a Message</h2>
          <Card>
            <CardContent className="p-6">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" placeholder="Your full name" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" required />
                  </div>
                </div>
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <select
                    id="category"
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="membership">Membership Inquiry</option>
                    <option value="media">Media Inquiry</option>
                    <option value="partnership">Partnership</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    placeholder="Your message..."
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-[#ef8636] hover:bg-[#ef8636]/90">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <Button
          size="lg"
          className="rounded-full bg-[#1daa62] hover:bg-[#1daa62]/90 shadow-lg"
          onClick={() => window.open('https://wa.me/2348007374357', '_blank')}
        >
          <MessageCircle className="w-5 h-5 mr-2" />
          WhatsApp Help
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;

