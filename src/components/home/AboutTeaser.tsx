import Image from 'next/image';
import Link from 'next/link';

export default function AboutTeaser() {
  return (
    <section id="about" className="py-20 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-brand-gold font-body text-sm tracking-[0.2em] uppercase mb-3">
              Our Story
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-white mb-4">
              Brana means leather — and we protect its heritage.
            </h2>
            <p className="text-white/70 font-body leading-relaxed">
              Brana Leather was founded in Bishoftu (Seven Lake City) with one mission:
              preserve Ethiopian craftsmanship in a modern world. Each piece is inspected by
              artisans and built to age beautifully — naturally.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8">
              <Link href="/about" className="inline-flex">
                <span className="bg-brand-gold text-white px-7 py-3 rounded-md font-body font-medium hover:bg-brand-tan transition-colors inline-flex items-center justify-center">
                  Read the full story
                </span>
              </Link>
              <Link href="/shop" className="inline-flex">
                <span className="border border-white/20 text-white px-7 py-3 rounded-md font-body font-medium hover:border-brand-gold hover:text-brand-gold transition-colors inline-flex items-center justify-center">
                  Shop bestsellers
                </span>
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-white/10">
            <Image
              src="https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=1000&q=80&fit=crop"
              alt="Ethiopian leather artisans at work"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-brand-dark/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

