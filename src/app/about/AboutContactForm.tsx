'use client';

import { useState } from 'react';
import { Input, Textarea } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastProvider';

export default function AboutContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        showToast('Message sent! We\'ll get back to you soon.');
        setForm({ name: '', email: '', message: '' });
      } else {
        showToast('Failed to send message. Please try again.', 'error');
      }
    } catch {
      showToast('Failed to send message. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-brand-dark/5 p-8">
      <h3 className="font-display text-2xl text-brand-dark mb-6">Get in Touch</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Textarea
          label="Message"
          required
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        <Button type="submit" className="w-full" size="lg" isLoading={isSubmitting}>
          Send Message
        </Button>
      </form>
    </div>
  );
}
