import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Upload, CreditCard, MapPin } from 'lucide-react';

const EMembership: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    dob: '',
    state: '',
    lga: '',
    ward: '',
    nin: '',
    pvc: null as File | null
  });

  const states = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT', 'Gombe',
    'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara',
    'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau',
    'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, pvc: e.target.files![0] }));
    }
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
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
      <section className="pt-32 pb-16 text-white relative" style={{ backgroundImage: 'url(/emembership.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h1 className="text-5xl font-bold mb-4">E-Membership</h1>
          <p className="text-xl text-white/90">The "Verified" Portal - Join SDP Today</p>
        </div>
      </section>

      {/* Registration Wizard */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <Card>
            <CardHeader>
              <div className="mb-4">
                <Progress value={(step / 4) * 100} className="h-2" />
                <p className="text-sm text-gray-600 mt-2 text-center">Step {step} of 4</p>
              </div>
              <CardTitle className="text-2xl text-center">Registration Wizard</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-6">
                    <CheckCircle2 className="w-6 h-6 text-[#ef8636]" />
                    <h3 className="text-xl font-bold">Step 1: Basic Information</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="08012345678"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dob">Date of Birth *</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={formData.dob}
                      onChange={(e) => handleInputChange('dob', e.target.value)}
                    />
                  </div>
                  <Button onClick={nextStep} className="w-full bg-[#ef8636] hover:bg-[#ef8636]/90">
                    Continue to Step 2
                  </Button>
                </div>
              )}

              {/* Step 2: Location */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-6">
                    <MapPin className="w-6 h-6 text-[#1daa62]" />
                    <h3 className="text-xl font-bold">Step 2: Location</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    This information is crucial for the "Grassroots Grid" and connecting you with local party activities.
                  </p>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your state" />
                      </SelectTrigger>
                      <SelectContent>
                        {states.map(state => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  {formData.state && (
                    <div>
                      <Label htmlFor="lga">Local Government Area (LGA) *</Label>
                      <Select value={formData.lga} onValueChange={(value) => handleInputChange('lga', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your LGA" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lga1">LGA 1 (Example)</SelectItem>
                          <SelectItem value="lga2">LGA 2 (Example)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  {formData.lga && (
                    <div>
                      <Label htmlFor="ward">Ward *</Label>
                      <Select value={formData.ward} onValueChange={(value) => handleInputChange('ward', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your ward" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ward1">Ward 1 (Example)</SelectItem>
                          <SelectItem value="ward2">Ward 2 (Example)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div className="flex gap-4">
                    <Button onClick={prevStep} variant="outline" className="flex-1">
                      Back
                    </Button>
                    <Button onClick={nextStep} className="flex-1 bg-[#ef8636] hover:bg-[#ef8636]/90" disabled={!formData.ward}>
                      Continue to Step 3
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Upload ID */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Upload className="w-6 h-6 text-[#ef8636]" />
                    <h3 className="text-xl font-bold">Step 3: Upload ID</h3>
                  </div>
                  <div>
                    <Label htmlFor="nin">National Identification Number (NIN) *</Label>
                    <Input
                      id="nin"
                      value={formData.nin}
                      onChange={(e) => handleInputChange('nin', e.target.value)}
                      placeholder="Enter your 11-digit NIN"
                      maxLength={11}
                    />
                  </div>
                  <div>
                    <Label htmlFor="pvc">Permanent Voters Card (PVC) *</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-sm text-gray-600 mb-2">
                        {formData.pvc ? formData.pvc.name : 'Upload your PVC image'}
                      </p>
                      <Input
                        id="pvc"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Label htmlFor="pvc">
                        <Button type="button" variant="outline" asChild>
                          <span>Choose File</span>
                        </Button>
                      </Label>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button onClick={prevStep} variant="outline" className="flex-1">
                      Back
                    </Button>
                    <Button onClick={nextStep} className="flex-1 bg-[#ef8636] hover:bg-[#ef8636]/90" disabled={!formData.nin || !formData.pvc}>
                      Continue to Step 4
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Payment */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-6">
                    <CreditCard className="w-6 h-6 text-[#1daa62]" />
                    <h3 className="text-xl font-bold">Step 4: Payment</h3>
                  </div>
                  <Card className="bg-[#1daa62]/10 border-[#1daa62]">
                    <CardContent className="p-6">
                      <div className="text-center mb-4">
                        <p className="text-3xl font-bold text-[#1daa62]">₦100</p>
                        <p className="text-gray-600">Card Registration Fee</p>
                      </div>
                      <p className="text-sm text-gray-600 text-center mb-6">
                        Secure payment via Paystack. Your information is encrypted and secure.
                      </p>
                      <Button className="w-full bg-[#1daa62] hover:bg-[#1daa62]/90">
                        <CreditCard className="w-4 h-4 mr-2" />
                        Pay with Paystack
                      </Button>
                    </CardContent>
                  </Card>
                  <div className="flex gap-4">
                    <Button onClick={prevStep} variant="outline" className="flex-1">
                      Back
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Member Benefits Preview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center text-sdp-dark">Member Benefits</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Digital ID Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Get your downloadable PNG ID card with QR code for verification.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Referral System</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Invite 5 friends to earn a 'Party Agent' Badge and unlock exclusive benefits.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Exclusive Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Access exclusive content, events, and volunteer opportunities.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EMembership;

