'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('brana-cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('brana-cookie-consent', 'accepted');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[70] p-4 animate-slide-up">
      <div className="max-w-4xl mx-auto bg-brand-dark text-white rounded-lg shadow-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm font-body text-white/80 flex-1">
          We use cookies to improve your experience and analyze site traffic. By continuing, you agree to our{' '}
          <Link href="/privacy" className="text-brand-gold hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={accept}
            className="px-5 py-2 bg-brand-gold text-white text-sm font-medium rounded-md hover:bg-brand-tan transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
