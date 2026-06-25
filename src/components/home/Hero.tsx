'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@/components/ui/Button';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1920&q=80&fit=crop',
    eyebrow: 'Handcrafted in Bishoftu, Ethiopia',
    title: ['Crafted for Legacy.', 'Designed for Modern Life.', 'Worn with Confidence.'],
    subtitle:
      'Discover premium 100% genuine leather shoes, jackets, wallets, and bags made by Ethiopian artisans to age beautifully for years.',
  },
  {
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=1920&q=80&fit=crop',
    eyebrow: 'Premium Ethiopian Craft',
    title: ['Raw Leather.', 'Refined Finish.', 'Timeless Presence.'],
    subtitle:
      'From the workshop to your wardrobe, every piece is stitched with care, character, and uncompromising quality.',
  },
  {
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1920&q=80&fit=crop',
    eyebrow: 'Built to Last a Lifetime',
    title: ['Own Fewer.', 'Choose Better.', 'Wear Brana.'],
    subtitle:
      'Elevate your everyday with durable leather essentials that become more personal and beautiful with every wear.',
  },
];

export default function Hero() {
  const SLIDE_DURATION_MS = 5500;
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const elapsedMsRef = useRef(0);
  const lastFrameTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPaused) {
      lastFrameTimeRef.current = null;
      return;
    }

    let rafId: number;

    const tick = (timestamp: number) => {
      if (lastFrameTimeRef.current === null) {
        lastFrameTimeRef.current = timestamp;
      }

      const delta = timestamp - lastFrameTimeRef.current;
      lastFrameTimeRef.current = timestamp;
      elapsedMsRef.current += delta;

      if (elapsedMsRef.current >= SLIDE_DURATION_MS) {
        elapsedMsRef.current = 0;
        setProgress(0);
        setActiveSlide((prev) => (prev + 1) % heroSlides.length);
      } else {
        setProgress(elapsedMsRef.current / SLIDE_DURATION_MS);
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => window.cancelAnimationFrame(rafId);
  }, [isPaused]);

  const goToNext = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    elapsedMsRef.current = 0;
    setProgress(0);
  };

  const goToPrev = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    elapsedMsRef.current = 0;
    setProgress(0);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 45) {
      if (deltaX < 0) goToNext();
      if (deltaX > 0) goToPrev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {heroSlides.map((slide, index) => (
        <Image
          key={slide.image}
          src={slide.image}
          alt="Premium handcrafted leather goods - Brana Leather Ethiopia"
          fill
          priority={index === 0}
          className={`object-cover transition-opacity duration-1000 ${
            activeSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
          sizes="100vw"
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/70 via-brand-dark/50 to-brand-dark/80" />

      <div className="absolute top-24 right-4 sm:right-6 z-10 rounded-full border border-white/25 bg-black/35 px-3 py-1.5 text-xs text-white/90 font-body tracking-wide">
        Slide {activeSlide + 1} / {heroSlides.length}
      </div>

      <div className="absolute top-16 left-0 right-0 z-10 px-4 sm:px-6">
        <div className="mx-auto max-w-4xl h-[2px] bg-white/20 overflow-hidden rounded-full">
          <div
            className="h-full bg-brand-gold transition-[width] duration-75 ease-linear"
            style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
          />
        </div>
      </div>

      <button
        onClick={goToPrev}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-white/30 bg-black/30 text-white flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-colors"
        aria-label="Previous hero slide"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-white/30 bg-black/30 text-white flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-colors"
        aria-label="Next hero slide"
      >
        <ChevronRight size={20} />
      </button>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
        <p className="text-brand-gold font-body text-sm tracking-[0.3em] uppercase mb-4">
          {heroSlides[activeSlide].eyebrow}
        </p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
          {heroSlides[activeSlide].title[0]}
          <br />
          <span className="text-brand-gold">{heroSlides[activeSlide].title[1]}</span>
          <br />
          {heroSlides[activeSlide].title[2]}
        </h1>
        <p className="font-body text-lg sm:text-xl text-white/70 mb-10 max-w-2xl mx-auto">
          {heroSlides[activeSlide].subtitle}
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

      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveSlide(index);
              setIsPaused(true);
              elapsedMsRef.current = 0;
              setProgress(0);
            }}
            className={`h-1.5 rounded-full transition-all ${
              activeSlide === index ? 'w-8 bg-brand-gold' : 'w-2.5 bg-white/50'
            }`}
            aria-label={`Go to hero slide ${index + 1}`}
          />
        ))}
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
