import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { SDPTVPlayer } from '@/components/SDPTVPlayer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Video, Shield, Upload } from 'lucide-react';

const MediaRoom: React.FC = () => {
  const [whistleblowerData, setWhistleblowerData] = useState({
    report: '',
    category: '',
    files: [] as File[]
  });

  const pressReleases = [
    {
      title: 'SDP Condemns Fuel Price Hike, Proposes Alternative Solutions',
      date: '2025-01-15',
      author: 'National Publicity Secretary',
      excerpt: 'The Social Democratic Party expresses deep concern over the recent fuel price increase...'
    },
    {
      title: 'SDP Calls for Urgent Action on Security Challenges',
      date: '2025-01-10',
      author: 'National Publicity Secretary',
      excerpt: 'The party urges the federal government to take decisive action on rising insecurity...'
    },
    {
      title: 'SDP Launches Grassroots Mobilization Campaign',
      date: '2025-01-05',
      author: 'National Publicity Secretary',
      excerpt: 'The Social Democratic Party today launched a nationwide grassroots mobilization campaign...'
    }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setWhistleblowerData(prev => ({
        ...prev,
        files: Array.from(e.target.files || [])
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle submission
    alert('Your report has been submitted. Reference number: SDP-WB-2025-001');
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
      <section className="pt-32 pb-16 text-white relative" style={{ backgroundImage: 'url(/mediaroom.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h1 className="text-5xl font-bold mb-4">Media Room</h1>
          <p className="text-xl text-white/90">The "Truth" Hub - News, Press Releases & More</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <Tabs defaultValue="press" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="press">Press Releases</TabsTrigger>
            <TabsTrigger value="tv">SDP TV</TabsTrigger>
            <TabsTrigger value="whistleblower">Whistleblower</TabsTrigger>
          </TabsList>

          {/* Press Releases Tab */}
          <TabsContent value="press">
            <div className="flex items-center gap-3 mb-8">
              <FileText className="w-8 h-8 text-[#ef8636]" />
              <h2 className="text-3xl font-bold text-sdp-dark">Press Releases</h2>
            </div>
            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl">{release.title}</CardTitle>
                      <span className="text-sm text-gray-500">{release.date}</span>
                    </div>
                    <p className="text-sm text-[#1daa62] font-semibold">{release.author}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{release.excerpt}</p>
                    <div className="flex gap-4">
                      <Button variant="outline" size="sm">Read More</Button>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* SDP TV Tab */}
          <TabsContent value="tv">
            <div className="flex items-center gap-3 mb-8">
              <Video className="w-8 h-8 text-[#1daa62]" />
              <h2 className="text-3xl font-bold text-sdp-dark">SDP TV</h2>
            </div>
            <p className="text-gray-600 mb-8">
              Watch interviews, speeches, and events featuring Prince Adebayo and other SDP leaders. 
              Our TV player features non-stop programming with an interactive guide.
            </p>
            
            <SDPTVPlayer />
            
            <div className="mt-12 text-center p-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-600 mb-4">Want more? Check out our official YouTube channel for the full archive.</p>
              <Button 
                variant="outline" 
                className="border-sdp-green text-sdp-green hover:bg-sdp-green hover:text-white"
                onClick={() => window.open('https://www.youtube.com/@SDPNigeria', '_blank')}
              >
                View All Videos on YouTube
              </Button>
            </div>
          </TabsContent>

          {/* Whistleblower Tab */}
          <TabsContent value="whistleblower">
            <div className="max-w-3xl mx-auto">
              <Card className="border-2 border-[#ef8636]">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-8 h-8 text-[#ef8636]" />
                    <div>
                      <CardTitle className="text-2xl">See Something? Say Something.</CardTitle>
                      <p className="text-sm text-gray-600 mt-1">Whistleblower Portal</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-green-50 border border-[#1daa62] rounded-lg p-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Shield className="w-6 h-6 text-[#1daa62] flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-[#1daa62] mb-1">Your Privacy is Protected</p>
                        <p className="text-sm text-gray-700">
                          Your identity is encrypted and never shared. All submissions are handled with the utmost confidentiality.
                        </p>
                      </div>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <select
                        id="category"
                        value={whistleblowerData.category}
                        onChange={(e) => setWhistleblowerData(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-lg"
                        required
                      >
                        <option value="">Select a category</option>
                        <option value="corruption">Corruption</option>
                        <option value="security">Security Threat</option>
                        <option value="human-rights">Human Rights Violation</option>
                        <option value="election">Election Malpractice</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="report">Your Report (Anonymous)</Label>
                      <Textarea
                        id="report"
                        value={whistleblowerData.report}
                        onChange={(e) => setWhistleblowerData(prev => ({ ...prev, report: e.target.value }))}
                        placeholder="Describe what you've seen or know. Be as detailed as possible..."
                        rows={8}
                        className="mt-2"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="files">Upload Evidence (Images, Documents)</Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mt-2">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-sm text-gray-600 mb-2">
                          {whistleblowerData.files.length > 0 
                            ? `${whistleblowerData.files.length} file(s) selected`
                            : 'Upload images or documents (optional)'}
                        </p>
                        <Input
                          id="files"
                          type="file"
                          multiple
                          accept="image/*,.pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                        <Label htmlFor="files">
                          <Button type="button" variant="outline" asChild>
                            <span>Choose Files</span>
                          </Button>
                        </Label>
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-[#ef8636] hover:bg-[#ef8636]/90">
                      <Shield className="w-4 h-4 mr-2" />
                      Submit Report Securely
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default MediaRoom;

