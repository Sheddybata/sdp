import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Users, Heart } from 'lucide-react';

const ElectionCenter: React.FC = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedOffice, setSelectedOffice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const states = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  const offices = [
    'President',
    'Governor',
    'Senator',
    'House of Representatives',
    'State House of Assembly',
    'Local Government Chairman'
  ];

  const sampleCandidate = {
    name: 'Aliyu Musa',
    office: 'House of Representatives',
    constituency: 'Kano Municipal',
    state: 'Kano',
    bio: 'A dedicated public servant with 15 years of experience in community development and governance.',
    platform: 'Focus on education, healthcare, and infrastructure development for Kano Municipal.'
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        onDonateClick={() => {}} 
        activeSection=""
        setActiveSection={() => {}}
      />
      <Breadcrumbs />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 text-white relative" style={{ backgroundImage: 'url(/electioncenter.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h1 className="text-5xl font-bold mb-4">Election Center</h1>
          <p className="text-xl text-white/90">The 2027 Engine - Find Your Candidates</p>
        </div>
      </section>

      {/* Candidate Finder */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <Users className="w-8 h-8 text-[#ef8636]" />
            <h2 className="text-3xl font-bold text-sdp-dark">Candidate Finder</h2>
          </div>
          
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-semibold mb-2 block">Select State</label>
                  <Select value={selectedState} onValueChange={setSelectedState}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a state" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map(state => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-2 block">Select Office</label>
                  <Select value={selectedOffice} onValueChange={setSelectedOffice}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose an office" />
                    </SelectTrigger>
                    <SelectContent>
                      {offices.map(office => (
                        <SelectItem key={office} value={office}>{office}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full bg-[#ef8636] hover:bg-[#ef8636]/90">
                <Search className="w-4 h-4 mr-2" />
                Find Candidates
              </Button>
            </CardContent>
          </Card>

          {/* Candidate Profile Display */}
          {selectedState && selectedOffice && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-[#ef8636]/10 rounded-full flex items-center justify-center">
                    <Users className="w-12 h-12 text-[#ef8636]" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Meet {sampleCandidate.name}</CardTitle>
                    <p className="text-gray-600">Running for {sampleCandidate.office} in {sampleCandidate.constituency}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mb-6">
                  <div>
                    <h3 className="font-bold mb-2">Biography</h3>
                    <p className="text-gray-600">{sampleCandidate.bio}</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Campaign Platform</h3>
                    <p className="text-gray-600">{sampleCandidate.platform}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-[#ef8636] hover:bg-[#ef8636]/90">
                    <Heart className="w-4 h-4 mr-2" />
                    Volunteer for {sampleCandidate.name}
                  </Button>
                  <Button variant="outline" className="border-[#1daa62] text-[#1daa62] hover:bg-[#1daa62] hover:text-white">
                    Donate to Campaign
                  </Button>
                  <Button variant="outline">
                    Share Campaign
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Polling Unit Locator */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="w-8 h-8 text-[#1daa62]" />
            <h2 className="text-3xl font-bold text-sdp-dark">Polling Unit Locator</h2>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <p className="text-gray-600 mb-6">
                Find your polling unit and connect with SDP Party Agents in your area. 
                Integration with INEC data provides accurate location information.
              </p>
              <div className="flex gap-4 mb-6">
                <Input
                  placeholder="Enter your address, ward, or LGA..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button className="bg-[#1daa62] hover:bg-[#1daa62]/90">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Interactive map will display here</p>
                <p className="text-sm text-gray-500 mt-2">Showing SDP Party Agents and Polling Units</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Grassroots Map */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center text-sdp-dark">Grassroots Map</h2>
          <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
            Visual representation of SDP presence across Nigeria. See our state-by-state breakdown and ward-level coverage.
          </p>
          <Card>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-4 gap-4">
                {['Lagos', 'Kano', 'Rivers', 'Abuja'].map((state, index) => (
                  <div key={index} className="text-center p-4 bg-[#ef8636]/10 rounded-lg">
                    <p className="font-bold text-sdp-dark mb-2">{state}</p>
                    <p className="text-sm text-gray-600">36 Wards Covered</p>
                    <p className="text-xs text-[#1daa62] mt-1">Active</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 bg-gray-100 rounded-lg p-8 text-center">
                <p className="text-gray-600">Interactive Nigeria map visualization will display here</p>
                <p className="text-sm text-gray-500 mt-2">Showing SDP presence across all 36 states + FCT</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ElectionCenter;

