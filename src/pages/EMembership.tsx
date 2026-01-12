import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Upload, MapPin, User, Download, Eye, CreditCard } from 'lucide-react';
import QRCode from 'qrcode';
import { getStates, getLGAsByState, getWardsByLGA } from '@/data/nigeria-locations';
import { supabase } from '@/lib/supabase';

declare global {
  interface Window {
    FlutterwaveCheckout: (options: any) => void;
  }
}

type NigeriaWardsByState = Record<string, Record<string, string[]>>;
type MembershipRecord = {
  memberId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dob: string;
  joinDate: string;
  voterRegNo: string;
  state: string;
  lga: string;
  ward: string;
  createdAt: string;
};

const EMembership: React.FC = () => {
  const wardsJsonUrl = '/nigeria-wards.json';
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [registrationCompleted, setRegistrationCompleted] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    dob: '',
    state: '',
    lga: '',
    ward: '',
    joinDate: new Date().toISOString().slice(0, 10),
    voterRegNo: '',
    memberId: '',
    profilePhoto: null as File | null
  });
  const [badgePreview, setBadgePreview] = useState<string | null>(null);
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [wardsByState, setWardsByState] = useState<NigeriaWardsByState | null>(null);
  const [searchMemberId, setSearchMemberId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<MembershipRecord | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const states = getStates();

  useEffect(() => {
    let isMounted = true;
    fetch(wardsJsonUrl)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!isMounted) return;
        setWardsByState(data);
      })
      .catch(() => {
        // If JSON isn't present or fails to load, we fall back to the built-in generated wards.
        if (!isMounted) return;
        setWardsByState(null);
      });
    
    // Load Flutterwave script
    const script = document.createElement('script');
    script.src = 'https://checkout.flutterwave.com/v3.js';
    script.async = true;
    document.body.appendChild(script);

    // Pre-load party logo for faster badge generation
    loadImage('/sdplogo.jpg', 'anonymous')
      .then(img => setLogoImg(img))
      .catch(err => console.error('Logo pre-load failed:', err));

    return () => {
      isMounted = false;
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const normalizeKey = (value: string) => {
    return value
      .trim()
      .toUpperCase()
      .replace(/\s+/g, ' ')
      .replace(/[’']/g, "'")
      .replace(/\s*\/\s*/g, '/')
      .replace(/\s*-\s*/g, '-');
  };
  
  // Get LGAs for selected state
  const lgas = useMemo(() => {
    return formData.state ? getLGAsByState(formData.state) : [];
  }, [formData.state]);

  // Get Wards for selected LGA
  const wards = useMemo(() => {
    if (!formData.state || !formData.lga) return [];

    // Prefer the PDF-extracted ward list if available
    const stateKey = normalizeKey(formData.state);
    const lgaKey = normalizeKey(formData.lga);
    const pdfWards = wardsByState?.[stateKey]?.[lgaKey];
    if (pdfWards && pdfWards.length > 0) return pdfWards;

    // Fallback to the built-in generated ward list
    return getWardsByLGA(formData.state, formData.lga);
  }, [formData.state, formData.lga, wardsByState]);

  const handleInputChange = (field: string, value: string) => {
    if (field === 'state') {
      // Reset LGA and Ward when state changes
      setFormData(prev => ({ ...prev, state: value, lga: '', ward: '' }));
    } else if (field === 'lga') {
      // Reset Ward when LGA changes
      setFormData(prev => ({ ...prev, lga: value, ward: '' }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, profilePhoto: file }));
    }
  };

  const loadImage = (src: string, crossOrigin: string | null = null): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      if (crossOrigin) img.crossOrigin = crossOrigin;
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
      img.src = src;
    });
  };

  const formatMonthYear = (isoDate: string) => {
    if (!isoDate) return '';
    const d = new Date(isoDate);
    if (Number.isNaN(d.getTime())) return isoDate;
    return d.toLocaleDateString(undefined, { month: 'long', year: 'numeric' }).toUpperCase();
  };

  const wrapText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
    maxLines = 2
  ) => {
    const words = (text || '-').split(' ');
    let line = '';
    let lines = 0;
    for (let n = 0; n < words.length; n++) {
      const testLine = line ? `${line} ${words[n]}` : words[n];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && line) {
        ctx.fillText(line, x, y);
        y += lineHeight;
        lines++;
        line = words[n];
        if (lines >= maxLines - 1) break;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
    return y + lineHeight;
  };

  const normalizeMemberId = (value: string) => value.trim().toUpperCase().replace(/\s+/g, '');

  const saveToRegistry = async (record: MembershipRecord) => {
    try {
      // Save to Supabase (Centralized)
      const { error } = await supabase
        .from('members')
        .upsert({
          member_id: normalizeMemberId(record.memberId),
          first_name: record.firstName,
          last_name: record.lastName,
          phone: record.phone,
          email: record.email,
          dob: record.dob,
          join_date: record.joinDate,
          voter_reg_no: record.voterRegNo,
          state: record.state,
          lga: record.lga,
          ward: record.ward,
          created_at: record.createdAt
        }, { onConflict: 'member_id' });
      
      if (error) {
        console.error('Supabase save error:', error);
        throw error;
      }
    } catch (e) {
      console.error('Save to registry failed:', e);
      throw e;
    }
  };

  const findInRegistry = async (memberId: string): Promise<MembershipRecord | null> => {
    try {
      const normalizedId = normalizeMemberId(memberId);
      
      // Query Supabase (Source of Truth)
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('member_id', normalizedId)
        .single();
      
      if (data && !error) {
        return {
          memberId: data.member_id,
          firstName: data.first_name,
          lastName: data.last_name,
          phone: data.phone,
          email: data.email,
          dob: data.dob,
          joinDate: data.join_date,
          voterRegNo: data.voter_reg_no,
          state: data.state,
          lga: data.lga,
          ward: data.ward,
          createdAt: data.created_at
        };
      }
      return null;
    } catch {
      return null;
    }
  };

  const handleFinalSubmit = async () => {
    setIsProcessing(true);
    try {
      const currentMemberId = formData.memberId || `SDP-${formData.firstName.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-6)}`;
      
      const record: MembershipRecord = {
        memberId: currentMemberId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        dob: formData.dob,
        joinDate: formData.joinDate,
        voterRegNo: formData.voterRegNo,
        state: formData.state,
        lga: formData.lga,
        ward: formData.ward,
        createdAt: new Date().toISOString()
      };

      await saveToRegistry(record);
      setFormData(prev => ({ ...prev, memberId: currentMemberId }));
      setRegistrationCompleted(true);
      setStep(4);
      // Generate badge immediately after registration
      setTimeout(() => generateBadge(), 100);
    } catch (e: any) {
      console.error('Registration error:', e);
      alert(`Registration failed: ${e.message || 'Check your internet or database connection'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayment = () => {
    if (!window.FlutterwaveCheckout) {
      alert('Payment system is still loading. Please wait a moment.');
      return;
    }

    setIsProcessing(true);

    window.FlutterwaveCheckout({
      public_key: import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK_TEST-your-key',
      tx_ref: `SDP-MEM-${Date.now()}`,
      amount: 100,
      currency: 'NGN',
      payment_options: 'card, banktransfer, ussd',
      customer: {
        email: formData.email,
        phone_number: formData.phone,
        name: `${formData.firstName} ${formData.lastName}`,
      },
      customizations: {
        title: 'SDP Membership Fee',
        description: 'Payment for digital membership card',
        logo: 'https://sdp.org.ng/sdplogo.jpg',
      },
      callback: (data: any) => {
        setIsProcessing(false);
        if (data.status === 'successful') {
          setPaymentVerified(true);
          generateBadge();
        } else {
          alert('Payment was not successful. Please try again.');
        }
      },
      onclose: () => {
        setIsProcessing(false);
      },
    });
  };

  const generateBadge = async () => {
    if (!canvasRef.current || !formData.profilePhoto) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Card size (roughly 1011x638 is 85.6mm x 53.98mm @300dpi)
    canvas.width = 1011;
    canvas.height = 638;

    // Ensure stable member ID for this session
    const currentMemberId = formData.memberId || `SDP-${formData.firstName.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-6)}`;
    if (!formData.memberId) {
      setFormData(prev => ({ ...prev, memberId: currentMemberId }));
    }

    const GREEN = '#01a85a';
    const ORANGE = '#f48735';

    const objectUrl = URL.createObjectURL(formData.profilePhoto);
    try {
      // Parallelize QR generation and Photo loading
      const qrPromise = QRCode.toDataURL(currentMemberId, {
        margin: 1,
        width: 220,
        color: { dark: '#111827', light: '#ffffff' }
      });
      const photoPromise = loadImage(objectUrl, 'anonymous');
      
      const [qrDataUrl, photoImg] = await Promise.all([qrPromise, photoPromise]);
      const qrImg = await loadImage(qrDataUrl, null);

      // Background
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Outer border
      ctx.strokeStyle = GREEN;
      ctx.lineWidth = 10;
      ctx.strokeRect(5, 5, canvas.width - 10, canvas.height - 10);

      // Header
      ctx.fillStyle = GREEN;
      ctx.fillRect(0, 0, canvas.width, 120);

      // Logo (top-left) - Use pre-loaded logo if available
      const logoW = 110;
      const logoH = 90;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(24, 16, logoW + 16, logoH + 16);
      
      if (logoImg) {
        ctx.drawImage(logoImg, 32, 24, logoW, logoH);
      } else {
        // Fallback if pre-load failed
        const fallbackLogo = await loadImage('/sdplogo.jpg', 'anonymous');
        ctx.drawImage(fallbackLogo, 32, 24, logoW, logoH);
      }
      
      ctx.strokeStyle = ORANGE;
      ctx.lineWidth = 4;
      ctx.strokeRect(24, 16, logoW + 16, logoH + 16);

      // Party title (center)
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.font = 'bold 42px Arial';
      ctx.fillText('SOCIAL DEMOCRATIC PARTY', canvas.width / 2 + 80, 55);
      ctx.font = 'bold 34px Arial';
      ctx.fillText('SDP', canvas.width / 2 + 80, 98);

      // Orange strip title
      ctx.fillStyle = ORANGE;
      ctx.fillRect(0, 120, canvas.width, 70);
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 34px Arial';
      ctx.fillText('DIGITAL MEMBERSHIP CARD', canvas.width / 2, 168);

      // Column layout (Photo left, text middle, QR right)
      const photoX = 60;
      const photoY = 220;
      const photoW = 220;
      const photoH = 280;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(photoX - 12, photoY - 12, photoW + 24, photoH + 24);
      ctx.strokeStyle = GREEN;
      ctx.lineWidth = 6;
      ctx.strokeRect(photoX - 12, photoY - 12, photoW + 24, photoH + 24);

      // Cover-crop photo into the rect
      const srcAR = photoImg.width / photoImg.height;
      const dstAR = photoW / photoH;
      let sx = 0, sy = 0, sw = photoImg.width, sh = photoImg.height;
      if (srcAR > dstAR) {
        // Wider -> crop left/right
        sw = photoImg.height * dstAR;
        sx = (photoImg.width - sw) / 2;
      } else {
        // Taller -> crop top/bottom
        sh = photoImg.width / dstAR;
        sy = (photoImg.height - sh) / 2;
      }
      ctx.drawImage(photoImg, sx, sy, sw, sh, photoX, photoY, photoW, photoH);

      // QR panel (right)
      const qrX = canvas.width - 290;
      const qrY = 365;
      const qrSize = 190;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(qrX - 12, qrY - 12, qrSize + 24, qrSize + 24);
      ctx.strokeStyle = ORANGE;
      ctx.lineWidth = 6;
      ctx.strokeRect(qrX - 12, qrY - 12, qrSize + 24, qrSize + 24);
      ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

      // Middle text block (stacked fields like the reference: label on top, value under it)
      const infoX = photoX + photoW + 50;
      const infoMaxX = qrX - 50;
      const infoW = Math.max(240, infoMaxX - infoX);
      let y = 245;

      ctx.textAlign = 'left';
      ctx.fillStyle = '#111827';
      ctx.font = 'bold 38px Arial';
      y = wrapText(
        ctx,
        `${formData.firstName.toUpperCase()} ${formData.lastName.toUpperCase()}`,
        infoX,
        y,
        infoW,
        44,
        2
      );

      // Membership ID inline (label + value on the same line, auto-fit to avoid overlap/cut)
      ctx.save();
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = ORANGE;

      const memberIdLabel = 'Membership ID:';
      const labelFontSize = 24;
      const valueFontStart = 28;
      const valueFontMin = 18;
      const labelToValueGapPx = 12;

      ctx.font = `bold ${labelFontSize}px Arial`;
      const memberIdLabelW = ctx.measureText(memberIdLabel).width;
      const memberIdValueX = infoX + memberIdLabelW + labelToValueGapPx;
      const memberIdValueW = Math.max(80, infoX + infoW - memberIdValueX);

      const ellipsize = (text: string, maxWidth: number) => {
        const ellipsis = '…';
        if (ctx.measureText(text).width <= maxWidth) return text;
        let t = text;
        while (t.length > 0 && ctx.measureText(t + ellipsis).width > maxWidth) {
          t = t.slice(0, -1);
        }
        return t.length ? t + ellipsis : ellipsis;
      };

      // Draw label
      ctx.font = `bold ${labelFontSize}px Arial`;
      ctx.fillText(memberIdLabel, infoX, y);

      // Fit value to remaining width by reducing font size; fallback to ellipsis
      let valueFontSize = valueFontStart;
      ctx.font = `bold ${valueFontSize}px Arial`;
      while (valueFontSize > valueFontMin && ctx.measureText(currentMemberId).width > memberIdValueW) {
        valueFontSize -= 1;
        ctx.font = `bold ${valueFontSize}px Arial`;
      }
      let memberIdToDraw = currentMemberId;
      if (ctx.measureText(memberIdToDraw).width > memberIdValueW) {
        memberIdToDraw = ellipsize(memberIdToDraw, memberIdValueW);
      }
      ctx.font = `bold ${valueFontSize}px Arial`;
      ctx.fillText(memberIdToDraw, memberIdValueX, y);

      ctx.restore();

      // advance y (single-line block)
      y += 42;
      y += 14; // spacing before stacked fields

      const colGap = 28;
      const colW = Math.max(150, Math.floor((infoW - colGap) / 2));
      const col1X = infoX;
      const col2X = infoX + colW + colGap;

      const labelFont = 'bold 16px Arial';
      const valueFont = 'bold 22px Arial';
      const labelColor = '#6b7280';
      const valueColor = '#111827';
      // Vertical rhythm tuning (label on top, value below, consistent gaps)
      const labelLineHeight = 18;
      const labelToValueGap = 6;
      const valueLineHeight = 26;
      const rowGap = 14;

      const stackedField = (
        x: number,
        startY: number,
        label: string,
        value: string,
        width: number,
        maxLines = 1
      ) => {
        ctx.save();
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';

        ctx.fillStyle = labelColor;
        ctx.font = labelFont;
        ctx.fillText(label.toUpperCase(), x, startY);

        ctx.fillStyle = valueColor;
        ctx.font = valueFont;
        const valueY = startY + labelLineHeight + labelToValueGap;
        const endY = wrapText(ctx, value || '-', x, valueY, width, valueLineHeight, maxLines);

        ctx.restore();
        return endY;
      };

      const stackedRow = (
        left: { label: string; value: string; maxLines?: number } | null,
        right: { label: string; value: string; maxLines?: number } | null
      ) => {
        const rowStartY = y;
        const leftEndY = left
          ? stackedField(col1X, rowStartY, left.label, left.value, colW, left.maxLines ?? 1)
          : rowStartY;
        const rightEndY = right
          ? stackedField(col2X, rowStartY, right.label, right.value, colW, right.maxLines ?? 1)
          : rowStartY;
        y = Math.max(leftEndY, rightEndY) + rowGap;
      };

      // Stacked fields (ordered as requested: State → LGA → Ward → Member Since → Voter Reg No)
      stackedRow(
        { label: 'State', value: (formData.state || '').toUpperCase(), maxLines: 1 },
        { label: 'Tel', value: formData.phone, maxLines: 1 }
      );
      stackedRow(
        { label: 'LGA', value: (formData.lga || '').toUpperCase(), maxLines: 2 },
        { label: 'Member Since', value: formatMonthYear(formData.joinDate), maxLines: 1 }
      );
      stackedRow(
        { label: 'Ward', value: (formData.ward || '').toUpperCase(), maxLines: 2 },
        { label: 'Voter Reg No', value: (formData.voterRegNo || '').toUpperCase(), maxLines: 2 }
      );

      // Footer stripe
      ctx.fillStyle = GREEN;
      ctx.fillRect(0, canvas.height - 18, canvas.width, 18);
      ctx.fillStyle = ORANGE;
      ctx.fillRect(0, canvas.height - 36, canvas.width, 18);

      // Convert to data URL for preview
      setBadgePreview(canvas.toDataURL('image/png'));

      // Persist record for verification/search (already handled in handleFinalSubmit)
    } catch (e) {
      alert('Failed to generate badge. Please try again.');
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  };

  const downloadBadge = () => {
    if (!badgePreview) return;
    
    const link = document.createElement('a');
    link.download = `SDP-Badge-${formData.firstName}-${formData.lastName}.png`;
    link.href = badgePreview;
    link.click();
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
                  <div>
                    <Label htmlFor="joinDate">Join Date *</Label>
                    <Input
                      id="joinDate"
                      type="date"
                      value={formData.joinDate}
                      onChange={(e) => handleInputChange('joinDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="voterRegNo">Voter Registration Number</Label>
                    <Input
                      id="voterRegNo"
                      value={formData.voterRegNo}
                      onChange={(e) => handleInputChange('voterRegNo', e.target.value)}
                      placeholder="Enter your voter registration number"
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
                  {formData.state && lgas.length > 0 && (
                    <div>
                      <Label htmlFor="lga">Local Government Area (LGA) *</Label>
                      <Select value={formData.lga} onValueChange={(value) => handleInputChange('lga', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your LGA" />
                        </SelectTrigger>
                        <SelectContent>
                          {lgas.map(lga => (
                            <SelectItem key={lga} value={lga}>{lga}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  {formData.lga && wards.length > 0 && (
                    <div>
                      <Label htmlFor="ward">Ward *</Label>
                      <Select value={formData.ward} onValueChange={(value) => handleInputChange('ward', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your ward" />
                        </SelectTrigger>
                        <SelectContent>
                          {wards.map(ward => (
                            <SelectItem key={ward} value={ward}>{ward}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  <div className="flex gap-4">
                    <Button onClick={prevStep} variant="outline" className="flex-1">
                      Back
                    </Button>
                    <Button onClick={nextStep} className="flex-1 bg-[#ef8636] hover:bg-[#ef8636]/90" disabled={!formData.ward}>
                      Continue to Photo
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Profile Photo */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-6">
                    <User className="w-6 h-6 text-[#ef8636]" />
                    <h3 className="text-xl font-bold">Step 3: Profile Photo</h3>
                  </div>
                  
                  <div>
                    <Label htmlFor="profilePhoto">Profile Photo *</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      {formData.profilePhoto ? (
                        <div className="space-y-4">
                          <img 
                            src={URL.createObjectURL(formData.profilePhoto)} 
                            alt="Profile preview" 
                            className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-[#1daa62]"
                          />
                          <p className="text-sm text-gray-600">{formData.profilePhoto.name}</p>
                        </div>
                      ) : (
                        <>
                          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-sm text-gray-600 mb-2">Upload your profile photo</p>
                        </>
                      )}
                      <Input
                        id="profilePhoto"
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Label htmlFor="profilePhoto">
                        <Button type="button" variant="outline" asChild>
                          <span>{formData.profilePhoto ? 'Change Photo' : 'Choose File'}</span>
                        </Button>
                      </Label>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button onClick={prevStep} variant="outline" className="flex-1">
                      Back
                    </Button>
                    <Button 
                      onClick={handleFinalSubmit} 
                      className="flex-1 bg-[#01a85a] hover:bg-[#01a85a]/90" 
                      disabled={!formData.profilePhoto || isProcessing}
                    >
                      {isProcessing ? 'Saving...' : 'Complete Registration'}
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Success & Optional Badge Payment */}
              {step === 4 && (
                <div className="space-y-6 text-center">
                  <div className="flex flex-col items-center justify-center space-y-4 mb-8">
                    <div className="w-20 h-20 bg-[#1daa62]/20 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-12 h-12 text-[#1daa62]" />
                    </div>
                    <h3 className="text-3xl font-bold text-sdp-dark">Registration Successful!</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                      Welcome to the SDP! Your membership has been registered in the national database.
                    </p>
                    <div className="bg-gray-100 px-4 py-2 rounded-lg">
                      <p className="text-sm text-gray-500">Your Membership ID:</p>
                      <p className="text-xl font-black text-sdp-dark tracking-wider">{formData.memberId}</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-8">
                    <h4 className="text-xl font-bold mb-4">Your Digital Membership Card</h4>
                    <p className="text-gray-600 mb-6 text-sm">
                      Your official SDP Digital Membership Card has been generated. You can download it below.
                    </p>
                    
                    <div className="space-y-4">
                      <canvas ref={canvasRef} className="hidden" />
                      {badgePreview ? (
                        <Card className="bg-gradient-to-br from-[#1daa62]/10 to-[#0d7a4a]/10 border-[#1daa62]">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                              <Eye className="w-5 h-5 text-[#1daa62]" />
                              Your Digital Badge
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="flex justify-center">
                              <img 
                                src={badgePreview} 
                                alt="Digital Badge" 
                                className="max-w-full h-auto rounded-lg shadow-lg border-4 border-white"
                              />
                            </div>
                            <Button 
                              onClick={downloadBadge} 
                              className="w-full bg-[#ef8636] hover:bg-[#ef8636]/90 font-bold"
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download Badge (FREE)
                            </Button>
                          </CardContent>
                        </Card>
                      ) : (
                        <div className="text-center py-8">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#1daa62] mx-auto mb-4"></div>
                          <p className="text-sm text-gray-500">Generating your card...</p>
                        </div>
                      )}
                    </div>

                    <div className="mt-8 p-4 bg-orange-50 rounded-lg border border-orange-100">
                      <h5 className="font-bold text-orange-800 mb-2">Support the Party</h5>
                      <p className="text-sm text-orange-700 mb-4">
                        While the ID card is free, you can support our grassroots mission with a small donation.
                      </p>
                      <Button 
                        onClick={handlePayment} 
                        variant="outline"
                        className="w-full border-[#ef8636] text-[#ef8636] hover:bg-[#ef8636] hover:text-white"
                        disabled={isProcessing}
                      >
                        {isProcessing ? 'Processing...' : 'Optional: Support with ₦100'}
                      </Button>
                    </div>
                  </div>

                  <Button 
                    onClick={() => window.location.href = '/'} 
                    variant="link" 
                    className="text-gray-500 hover:text-sdp-dark"
                  >
                    Return to Home Page
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Verify / Search Membership */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <Card>
            <CardHeader>
              <CardTitle>Verify Membership</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
                <div>
                  <Label htmlFor="searchMemberId">Membership ID</Label>
                  <Input
                    id="searchMemberId"
                    value={searchMemberId}
                    onChange={(e) => setSearchMemberId(e.target.value)}
                    placeholder="e.g. SDP-ABC-123456"
                  />
                </div>
                <Button
                  className="bg-[#01a85a] hover:bg-[#01a85a]/90"
                  disabled={isSearching}
                  onClick={async () => {
                    if (!searchMemberId.trim()) return;
                    setSearchAttempted(true);
                    setIsSearching(true);
                    try {
                      const found = await findInRegistry(searchMemberId);
                      setSearchResult(found);
                    } finally {
                      setIsSearching(false);
                    }
                  }}
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </Button>
              </div>

              {searchAttempted && (
                <div className="rounded-lg border bg-white p-4">
                  <p className="text-sm text-gray-600">Membership ID</p>
                  <p className="text-lg font-bold text-sdp-dark">{normalizeMemberId(searchMemberId) || '-'}</p>

                  {isSearching ? (
                    <div className="mt-4 flex items-center justify-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#01a85a]"></div>
                      <span className="ml-3 text-sm text-gray-500">Verifying in national database...</span>
                    </div>
                  ) : searchResult ? (
                    <div className="mt-4 grid gap-2 text-sm text-gray-700 sm:grid-cols-2">
                      <div><span className="font-semibold">Name:</span> {searchResult.firstName} {searchResult.lastName}</div>
                      <div><span className="font-semibold">Phone:</span> {searchResult.phone}</div>
                      <div className="sm:col-span-2"><span className="font-semibold">Voter Reg No:</span> {searchResult.voterRegNo || '-'}</div>
                      <div><span className="font-semibold">State:</span> {searchResult.state}</div>
                      <div><span className="font-semibold">LGA:</span> {searchResult.lga}</div>
                      <div className="sm:col-span-2"><span className="font-semibold">Ward:</span> {searchResult.ward}</div>
                      <div><span className="font-semibold">Member Since:</span> {formatMonthYear(searchResult.joinDate)}</div>
                    </div>
                  ) : (
                    <p className="mt-3 text-sm text-red-600 font-medium">
                      Member ID not found. Please ensure the ID is correct or contact your ward chairman.
                    </p>
                  )}
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

      <Footer showPastMembers={false} />
    </div>
  );
};

export default EMembership;

