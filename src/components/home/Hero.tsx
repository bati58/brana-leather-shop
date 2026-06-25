'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1920&q=80&fit=crop"
        alt="Premium handcrafted leather jacket - Brana Leather Ethiopia"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/50 to-brand-dark/80" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
        <p className="text-brand-gold font-body text-sm tracking-[0.3em] uppercase mb-4">
          Bishoftu, Ethiopia
        </p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
          Brana Leather:{' '}
          <span className="text-brand-gold">Raw Authenticity,</span>
          <br />
          Refined Design.
        </h1>
        <p className="font-body text-lg sm:text-xl text-white/70 mb-10 max-w-2xl mx-auto">
          Handcrafted in Ethiopia. Built to Last a Lifetime.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/shop">
            <Button size="lg">Shop the Collection</Button>
          </Link>
          <a href="#about">
            <Button
              variant="secondary"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-brand-dark"
            >
              Our Story
            </Button>
          </a>
        </div>
      </div>

      <a
        href="#categories"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-brand-gold transition-colors animate-bounce"
        aria-label="Scroll to categories"
      >
        <ChevronDown size={32} />
      </a>
    </section>
  );
}
