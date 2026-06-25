'use client';

import Image from 'next/image';
import Link from 'next/link';

const placeholderPosts = [
  'photo-1611930022073-bf02e42f1f2a',
  'photo-1520975869011-6a7f9be6dbd7',
  'photo-1520975916093-0df45c780c64',
  'photo-1521223260152-fd5e720b0142',
  'photo-1551028719-00167b16eac5',
  'photo-1627123424574-724758594e93',
];

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
              Latest from @branalethr
            </h2>
            <p className="text-brand-gray font-body mt-3">
              A quick look at new leather drops, workshop moments, and styling ideas.
            </p>
          </div>
          <Link
            href="https://instagram.com/branalethr"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 text-brand-gold hover:text-brand-tan transition-colors font-body font-medium"
          >
            Follow for updates →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {placeholderPosts.slice(0, 6).map((id, i) => (
            <a
              key={id}
              href="https://instagram.com/branalethr"
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden rounded-lg border border-brand-dark/5 bg-white group"
              aria-label={`Instagram post ${i + 1} (demo preview)`}
            >
              <Image
                src={`https://images.unsplash.com/${id}?w=700&q=80&fit=crop`}
                alt="Brana Leather Instagram preview"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
            </a>
          ))}
        </div>

        <div className="sm:hidden mt-6 text-center">
          <Link
            href="https://instagram.com/branalethr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-tan transition-colors font-body font-medium"
          >
            Follow for updates →
          </Link>
        </div>
      </div>
    </section>
  );
}

