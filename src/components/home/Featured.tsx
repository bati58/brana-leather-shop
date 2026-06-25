'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import ProductCard from '@/components/shop/ProductCard';
import { getFeaturedProducts } from '@/lib/products';

export default function Featured() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const products = getFeaturedProducts().slice(0, 6);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl text-brand-dark mb-2">
              Featured Collection
            </h2>
            <p className="text-brand-gray font-body">Our most loved pieces, handcrafted for you.</p>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-brand-dark/20 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-brand-dark/20 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-[280px] sm:w-[300px] snap-start">
              <ProductCard product={product} />
            </div>
          ))}
          <div className="flex-shrink-0 w-[200px] flex items-center justify-center snap-start">
            <Link
              href="/shop"
              className="flex flex-col items-center gap-3 text-brand-gold hover:text-brand-tan transition-colors group"
            >
              <div className="w-16 h-16 rounded-full border-2 border-brand-gold flex items-center justify-center group-hover:bg-brand-gold group-hover:text-white transition-all">
                <ArrowRight size={24} />
              </div>
              <span className="font-body text-sm font-medium">View All</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
