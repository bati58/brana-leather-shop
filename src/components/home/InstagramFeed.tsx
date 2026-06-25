'use client';

import Image from 'next/image';
import Link from 'next/link';
import { instagramUrl, siteConfig } from '@/lib/site-config';
import { instagramFeedImages } from '@/lib/marketing-images';

const igUrl = instagramUrl();

export default function InstagramFeed() {
  return (
    <section className="py-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-brand-gold font-body text-sm tracking-[0.2em] uppercase mb-2">
              Instagram
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-brand-dark">
              Workshop &amp; Style
            </h2>
            <p className="text-brand-gray font-body mt-3">
              A quick look at new leather drops, workshop moments, and styling ideas.
            </p>
          </div>
          <Link
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 text-brand-gold hover:text-brand-tan transition-colors font-body font-medium"
          >
            Follow on Instagram →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {instagramFeedImages.map((src, i) => (
            <a
              key={src}
              href={igUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden rounded-lg border border-brand-dark/5 bg-white group"
              aria-label={`View ${siteConfig.name} on Instagram`}
            >
              <Image
                src={src}
                alt={`Brana Leather workshop and style ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
            </a>
          ))}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <Link
            href={igUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-tan transition-colors font-body font-medium"
          >
            Follow on Instagram →
          </Link>
        </div>
      </div>
    </section>
  );
}
