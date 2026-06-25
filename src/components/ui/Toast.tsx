'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type?: 'success' | 'error';
}

export default function Toast({ message, isVisible, onClose, type = 'success' }: ToastProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(onClose, 300);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible && !show) return null;

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-[60] flex items-center gap-3 px-5 py-4 rounded-lg shadow-card-hover transition-all duration-300',
        type === 'success' ? 'bg-brand-dark text-white' : 'bg-red-700 text-white',
        show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      )}
      role="alert"
    >
      {type === 'success' ? <CheckCircle size={20} className="text-brand-gold" /> : null}
      <span className="font-body text-sm">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-70 hover:opacity-100" aria-label="Dismiss">
        <X size={16} />
      </button>
    </div>
  );
}
