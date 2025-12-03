import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';

const OurStand: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('economy');

  const whitepapers = [
    {
      title: "The SDP Plan for Fuel Subsidy Removal",
      description: "A comprehensive approach to removing fuel subsidies while protecting vulnerable Nigerians.",
      category: "Economy"
    },
    {
      title: "Agricultural Revolution Roadmap",
      description: "Transforming Nigeria's agricultural sector for food security and economic growth.",
      category: "Agro-Allied"
    },
    {
      title: "Education Reform Framework",
      description: "Rebuilding Nigeria's education system for the 21st century.",
      category: "Education"
    },
    {
      title: "Security Architecture Proposal",
      description: "A new approach to securing Nigeria and protecting all citizens.",
      category: "Security"
    }
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
      <section className="pt-32 pb-16 text-white relative" style={{ backgroundImage: 'url(/ourstand.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h1 className="text-5xl font-bold mb-4">Our Stand</h1>
          <p className="text-xl text-white/90">The Shadow Government Dashboard</p>
        </div>
      </section>

      {/* Manifesto 2.0 - Interactive Tabs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center text-sdp-dark">Manifesto 2.0</h2>
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mb-8">
              <TabsTrigger value="economy">Economy</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="agro-allied">Agro-Allied</TabsTrigger>
              <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
              <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
            </TabsList>
            
            <TabsContent value="economy">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-[#ef8636]">Economy</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-bold mb-4">Our Plan to Stabilize the Naira in 18 Months</h3>
                  <div className="space-y-4 text-gray-600">
                    <p>
                      The SDP proposes a comprehensive economic recovery plan focused on:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Diversification of revenue sources beyond oil</li>
                      <li>Support for local manufacturing and production</li>
                      <li>Strategic foreign exchange management</li>
                      <li>Reduction of import dependency</li>
                      <li>Investment in infrastructure to boost productivity</li>
                    </ul>
                    <p>
                      Through these measures, we aim to stabilize the Naira and create a more resilient economy 
                      that works for all Nigerians, not just the elite.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-[#ef8636]">Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-bold mb-4">A New Security Architecture for Nigeria</h3>
                  <div className="space-y-4 text-gray-600">
                    <p>
                      Our security strategy focuses on:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Community-based policing and intelligence gathering</li>
                      <li>Modern equipment and training for security forces</li>
                      <li>Addressing root causes of insecurity (poverty, unemployment)</li>
                      <li>Regional cooperation and coordination</li>
                      <li>Protection of vulnerable communities</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="education">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-[#ef8636]">Education</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-bold mb-4">Rebuilding Nigeria's Education System</h3>
                  <div className="space-y-4 text-gray-600">
                    <p>
                      Our education reform includes:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Free and compulsory basic education</li>
                      <li>Teacher training and better remuneration</li>
                      <li>Modern curriculum aligned with global standards</li>
                      <li>Technology integration in schools</li>
                      <li>Scholarship programs for disadvantaged students</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="agro-allied">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-[#ef8636]">Agro-Allied</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-bold mb-4">Agricultural Revolution for Food Security</h3>
                  <div className="space-y-4 text-gray-600">
                    <p>
                      Our agricultural transformation plan:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Support for smallholder farmers</li>
                      <li>Access to modern farming equipment and techniques</li>
                      <li>Agricultural extension services</li>
                      <li>Rural infrastructure development</li>
                      <li>Value chain development and agro-processing</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="healthcare">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-[#ef8636]">Healthcare</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-bold mb-4">Universal Healthcare for All Nigerians</h3>
                  <div className="space-y-4 text-gray-600">
                    <p>
                      Our healthcare vision includes:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Universal Health Coverage</li>
                      <li>Primary healthcare strengthening</li>
                      <li>Modern medical facilities and equipment</li>
                      <li>Healthcare worker training and retention</li>
                      <li>Preventive healthcare programs</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="infrastructure">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-[#ef8636]">Infrastructure</CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl font-bold mb-4">Building Nigeria's Future</h3>
                  <div className="space-y-4 text-gray-600">
                    <p>
                      Our infrastructure development plan:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4">
                      <li>Road and rail network expansion</li>
                      <li>Power generation and distribution</li>
                      <li>Water supply and sanitation</li>
                      <li>Digital infrastructure and broadband</li>
                      <li>Housing and urban development</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Solution Room - Whitepaper Library */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="w-8 h-8 text-[#1daa62]" />
            <h2 className="text-3xl font-bold text-sdp-dark">The Solution Room</h2>
          </div>
          <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
            A library of comprehensive policy whitepapers detailing SDP's solutions to Nigeria's most pressing challenges.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {whitepapers.map((paper, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl">{paper.title}</CardTitle>
                  <p className="text-sm text-[#1daa62] font-semibold">{paper.category}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{paper.description}</p>
                  <Button variant="outline" className="w-full border-[#ef8636] text-[#ef8636] hover:bg-[#ef8636] hover:text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Comparisons */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center text-sdp-dark">SDP vs. Current Government</h2>
          <Card>
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left p-4 font-bold">Policy Area</th>
                      <th className="text-left p-4 font-bold text-red-600">Current Government</th>
                      <th className="text-left p-4 font-bold text-[#1daa62]">SDP Position</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-4 font-semibold">Fuel Subsidy</td>
                      <td className="p-4 text-gray-600">Removed without adequate safety nets</td>
                      <td className="p-4 text-gray-600">Gradual removal with social protection programs</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold">Exchange Rate</td>
                      <td className="p-4 text-gray-600">Floating with high volatility</td>
                      <td className="p-4 text-gray-600">Managed float with stabilization measures</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-4 font-semibold">Security</td>
                      <td className="p-4 text-gray-600">Reactive approach</td>
                      <td className="p-4 text-gray-600">Proactive community-based strategy</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurStand;

