import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';

interface DonateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DonorInfo {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

declare global {
  interface Window {
    FlutterwaveCheckout: (options: any) => void;
  }
}

export const DonateModal: React.FC<DonateModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [amount, setAmount] = useState(500);
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [donorInfo, setDonorInfo] = useState<DonorInfo>({
    email: '',
    firstName: '',
    lastName: '',
    phone: ''
  });
  const [errors, setErrors] = useState<Partial<DonorInfo>>({});
  const amounts = [500, 1000, 2500, 5000, 10000];

  // Flutterwave public key
  const FLUTTERWAVE_PUBLIC_KEY = import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK_TEST-your-key';

  // Load Flutterwave script
  useEffect(() => {
    if (isOpen && !window.FlutterwaveCheckout) {
      const script = document.createElement('script');
      script.src = 'https://checkout.flutterwave.com/v3.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, [isOpen]);

  const formatAmount = (value: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(value);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<DonorInfo> = {};
    
    if (!donorInfo.email || !donorInfo.email.includes('@')) {
      newErrors.email = t('donate.form.emailInvalid');
    }
    if (!donorInfo.firstName.trim()) {
      newErrors.firstName = `${t('donate.form.firstName')} ${t('donate.form.required')}`;
    }
    if (!donorInfo.lastName.trim()) {
      newErrors.lastName = `${t('donate.form.lastName')} ${t('donate.form.required')}`;
    }
    if (!donorInfo.phone || donorInfo.phone.length < 10) {
      newErrors.phone = t('donate.form.phoneInvalid');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateReference = (): string => {
    return `SDP_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  const handlePayment = () => {
    if (!validateForm()) {
      return;
    }

    if (!window.FlutterwaveCheckout) {
      alert(t('donate.error.loading'));
      return;
    }

    if (amount < 100) {
      alert(t('donate.error.minAmount'));
      return;
    }

    setIsProcessing(true);

    const reference = generateReference();

    window.FlutterwaveCheckout({
      public_key: FLUTTERWAVE_PUBLIC_KEY,
      tx_ref: reference,
      amount: amount,
      currency: 'NGN',
      payment_options: 'card, banktransfer, ussd',
      customer: {
        email: donorInfo.email,
        phone_number: donorInfo.phone,
        name: `${donorInfo.firstName} ${donorInfo.lastName}`,
      },
      customizations: {
        title: 'SDP Donation',
        description: 'Campaign Donation for Social Democratic Party',
        logo: 'https://sdp.org.ng/sdplogo.jpg',
      },
      callback: (response: any) => {
        setIsProcessing(false);
        if (response.status === 'successful') {
          // Payment successful
          setStep(3); // Success step
          console.log('Payment successful:', response.tx_ref);
        } else {
          alert(t('donate.error.failed'));
        }
      },
      onclose: () => {
        setIsProcessing(false);
      }
    });
  };

  const handleInputChange = (field: keyof DonorInfo, value: string) => {
    setDonorInfo(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const resetForm = () => {
    setStep(1);
    setDonorInfo({ email: '', firstName: '', lastName: '', phone: '' });
    setErrors({});
    setIsProcessing(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto">
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Step 1: Select Amount */}
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold text-sdp-dark mb-2">{t('donate.title')}</h2>
            <p className="text-gray-600 mb-6">{t('donate.subtitle')}</p>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {amounts.map(a => (
                <button 
                  key={a} 
                  onClick={() => setAmount(a)} 
                  className={`py-3 rounded-lg font-bold transition ${
                    amount === a 
                      ? 'bg-[#ef8636] text-white shadow-lg' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                  }`}
                >
                  ₦{a.toLocaleString()}
                </button>
              ))}
              <Input 
                type="number" 
                placeholder={t('donate.form.otherAmount')} 
                className="col-span-3 text-center" 
                value={amount && !amounts.includes(amount) ? amount : ''}
                onChange={e => {
                  const value = Number(e.target.value);
                  if (value >= 100) setAmount(value);
                }} 
                min="100"
              />
            </div>
            <button 
              onClick={() => setStep(2)} 
              disabled={amount < 100}
              className="w-full py-4 bg-[#ef8636] hover:bg-[#ef8636]/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-lg transition shadow-lg hover:shadow-xl"
            >
              {t('donate.continue')} {formatAmount(amount)}
            </button>
          </>
        )}

        {/* Step 2: Donor Information & Payment */}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold text-sdp-dark mb-2">{t('donate.step2.title')}</h2>
            <p className="text-gray-600 mb-6">{t('donate.step2.amount')} <span className="font-bold text-[#ef8636]">{formatAmount(amount)}</span></p>
            
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-sm font-semibold">{t('donate.form.firstName')} *</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={donorInfo.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={errors.firstName ? 'border-red-500' : ''}
                    placeholder={t('donate.form.firstName')}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-sm font-semibold">{t('donate.form.lastName')} *</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={donorInfo.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={errors.lastName ? 'border-red-500' : ''}
                    placeholder={t('donate.form.lastName')}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-sm font-semibold">{t('donate.form.email')} *</Label>
                <Input
                  id="email"
                  type="email"
                  value={donorInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={errors.email ? 'border-red-500' : ''}
                  placeholder={t('donate.form.email')}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="phone" className="text-sm font-semibold">{t('donate.form.phone')} *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={donorInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={errors.phone ? 'border-red-500' : ''}
                  placeholder={t('donate.form.phone')}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                onClick={() => setStep(1)} 
                className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition"
              >
                {t('donate.form.back')}
              </button>
              <button 
                onClick={handlePayment}
                disabled={isProcessing}
                className="flex-1 py-3 bg-[#ef8636] hover:bg-[#ef8636]/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-lg transition shadow-lg hover:shadow-xl"
              >
                {isProcessing ? t('donate.form.processing') : `${t('donate.form.pay')} ${formatAmount(amount)}`}
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              {t('donate.form.secure')}
            </p>
          </>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="text-center py-8">
            <div className="w-20 h-20 bg-[#1daa62]/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-[#1daa62]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-sdp-dark mb-2">{t('donate.success.title')}</h3>
            <p className="text-gray-600 mb-4">{t('donate.success.message')}</p>
            <p className="text-sm text-gray-500 mb-6">
              {t('donate.success.email')} <span className="font-semibold">{donorInfo.email}</span>
            </p>
            <button 
              onClick={handleClose} 
              className="mt-6 px-8 py-3 bg-[#ef8636] hover:bg-[#ef8636]/90 text-white rounded-lg font-bold shadow-lg hover:shadow-xl transition"
            >
              {t('donate.success.close')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};