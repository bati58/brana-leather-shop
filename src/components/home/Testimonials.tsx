'use client';

import { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/lib/products';
import { instagramUrl, siteConfig } from '@/lib/site-config';

export default function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={20} className="text-brand-gold fill-brand-gold" />
            ))}
          </div>
          <p className="font-display text-2xl text-brand-dark">4.9 ★ — over 200 happy customers</p>
        </div>

        <div className="max-w-2xl mx-auto relative min-h-[200px]">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className={`transition-all duration-500 ${
                i === active
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4 absolute inset-0 pointer-events-none'
              }`}
            >
              <div className="bg-white rounded-lg p-8 shadow-sm border border-brand-dark/5 text-center">
                <Quote size={32} className="text-brand-gold/30 mx-auto mb-4" />
                <p className="font-body text-brand-dark text-lg leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div>
                  <p className="font-display text-brand-dark">{t.name}</p>
                  <p className="text-brand-gray text-sm">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === active ? 'bg-brand-gold' : 'bg-brand-dark/20'
              }`}
              aria-label={`View testimonial ${i + 1}`}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-brand-gray font-body text-sm mb-4">Follow our journey</p>
          <a
            href={instagramUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-tan transition-colors font-body font-medium"
          >
            Follow {siteConfig.name} on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
