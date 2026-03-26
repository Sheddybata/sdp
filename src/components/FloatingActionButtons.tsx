import React, { useState, useEffect } from 'react';
import { Users, Heart, HandHeart, X, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const DEFAULT_REGISTRATION_URL = 'https://socialdemocraticparty.app';
/** E.164 without + for wa.me links */
const DEFAULT_WHATSAPP_E164 = '2347043979165';
const WHATSAPP_DISPLAY = '+234 704 397 9165';

interface FloatingActionButtonsProps {
  /** Party registration / membership portal */
  registrationUrl?: string;
  /** WhatsApp number (digits only, country code, no +) */
  whatsappNumber?: string;
}

export const FloatingActionButtons: React.FC<FloatingActionButtonsProps> = ({
  registrationUrl = DEFAULT_REGISTRATION_URL,
  whatsappNumber = DEFAULT_WHATSAPP_E164,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasSeenPulse, setHasSeenPulse] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [giveOpen, setGiveOpen] = useState(false);
  const [giveAmount, setGiveAmount] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsExpanded(false);
      }
    };

    const seenPulse = localStorage.getItem('sdp-seen-pulse');
    if (!seenPulse && window.scrollY > 300) {
      setHasSeenPulse(false);
      setTimeout(() => {
        setHasSeenPulse(true);
        localStorage.setItem('sdp-seen-pulse', 'true');
      }, 2000);
    } else {
      setHasSeenPulse(true);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parsedAmount = Number.parseFloat(giveAmount.replace(/,/g, ''));
  const amountValid = Number.isFinite(parsedAmount) && parsedAmount >= 100;

  const openWhatsAppWithAmount = () => {
    if (!amountValid) return;
    const formatted = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(parsedAmount);
    const text = [
      `Hello, I would like to give ${formatted} to the Social Democratic Party.`,
      'Please share the official SDP-designated account details for this donation.',
      'I understand I should only send money to an SDP official account.',
    ].join('\n\n');
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setGiveOpen(false);
    setIsExpanded(false);
    setGiveAmount('');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <Dialog open={giveOpen} onOpenChange={setGiveOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Give to SDP</DialogTitle>
            <DialogDescription>
              Enter how much you plan to give. You will be taken to WhatsApp ({WHATSAPP_DISPLAY}) to complete the next
              steps with our team.
            </DialogDescription>
          </DialogHeader>
          <div
            className="flex gap-3 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-950"
            role="alert"
          >
            <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" aria-hidden />
            <p>
              <span className="font-semibold">Important:</span> Send money only to an{' '}
              <span className="font-semibold">SDP-designated official account</span>. Do not transfer to personal
              accounts unless you have verified them through official SDP channels.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="give-amount">Amount (NGN)</Label>
            <Input
              id="give-amount"
              type="number"
              inputMode="decimal"
              min={100}
              step={100}
              placeholder="e.g. 5000"
              value={giveAmount}
              onChange={(e) => setGiveAmount(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Minimum ₦100. You can adjust the message in WhatsApp before sending.</p>
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={() => setGiveOpen(false)}>
              Cancel
            </Button>
            <Button
              type="button"
              className="bg-[#1daa62] hover:bg-[#1daa62]/90"
              disabled={!amountValid}
              onClick={openWhatsAppWithAmount}
            >
              Continue on WhatsApp
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isExpanded && (
        <div className="flex flex-col gap-3 mb-2 animate-in slide-in-from-bottom-4 duration-300">
          <a
            href={registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsExpanded(false)}
            className="bg-[#ef8636] hover:bg-[#ef8636]/90 text-white shadow-xl hover:shadow-2xl h-14 px-6 rounded-full flex items-center gap-3 transition-all transform hover:scale-105 no-underline"
          >
            <Users className="w-5 h-5" />
            <span className="font-semibold">Join the Party</span>
          </a>

          <Button
            type="button"
            onClick={() => {
              setGiveOpen(true);
              setIsExpanded(false);
            }}
            className="bg-[#ef8636] hover:bg-[#ef8636]/90 text-white shadow-xl hover:shadow-2xl h-14 px-6 rounded-full flex items-center gap-3 transition-all transform hover:scale-105"
          >
            <Heart className="w-5 h-5" />
            <span className="font-semibold">Give</span>
          </Button>

          <a
            href={registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsExpanded(false)}
            className="bg-[#ef8636] hover:bg-[#ef8636]/90 text-white shadow-xl hover:shadow-2xl h-14 px-6 rounded-full flex items-center gap-3 transition-all transform hover:scale-105 no-underline"
          >
            <HandHeart className="w-5 h-5" />
            <span className="font-semibold">Volunteer</span>
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className={`relative w-16 h-16 rounded-full bg-[#ef8636] hover:bg-[#ef8636]/90 text-white shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 ${
          !hasSeenPulse ? 'animate-pulse' : ''
        }`}
        aria-label="Quick actions"
      >
        {isExpanded ? (
          <X className="w-6 h-6" />
        ) : (
          <HandHeart className="w-6 h-6" />
        )}
        {!hasSeenPulse && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" aria-hidden />
        )}
      </button>
    </div>
  );
};
