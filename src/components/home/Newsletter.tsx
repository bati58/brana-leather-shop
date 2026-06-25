'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastProvider';

export default function Newsletter() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, whatsapp }),
      });
      if (res.ok) {
        showToast('Welcome! Check your email for 10% off your first order.');
        setName('');
        setEmail('');
        setWhatsapp('');
      } else {
        showToast('Something went wrong. Please try again.', 'error');
      }
    } catch {
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-brand-gold-wash">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-display text-3xl sm:text-4xl text-brand-dark mb-3">
          Join the Brana Family
        </h2>
        <p className="text-brand-gray font-body mb-8 max-w-lg mx-auto">
          Get 10% off your first order plus exclusive leather care tips delivered to your inbox.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <Input
            label="Name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="WhatsApp (optional)"
            type="tel"
            placeholder="09xxxxxxxx"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />
          <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
            Subscribe & Get 10% Off
          </Button>
        </form>
      </div>
    </section>
  );
}
