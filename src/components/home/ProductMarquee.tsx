import Image from 'next/image';
import Link from 'next/link';
import { products } from '@/lib/products';
import { formatPrice } from '@/lib/utils';

export default function ProductMarquee() {
  const showcase = products.slice(0, 16);
  const loopItems = [...showcase, ...showcase];

  return (
    <section className="bg-brand-dark py-6 border-y border-white/10 overflow-hidden">
      <div className="mb-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-brand-gold text-xs sm:text-sm tracking-[0.25em] uppercase font-body">
          Trending Pieces
        </p>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex w-max animate-marquee gap-4 sm:gap-6 pr-4 sm:pr-6">
          {loopItems.map((product, index) => (
            <Link
              key={`${product.id}-${index}`}
              href={`/product/${product.slug}`}
              className="group flex w-[260px] sm:w-[300px] flex-shrink-0 items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 hover:border-brand-gold/60 hover:bg-white/10 transition-colors"
            >
              <div className="relative h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-md bg-black/20">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate font-display text-base text-white group-hover:text-brand-gold transition-colors">
                  {product.name}
                </p>
                <p className="font-body text-sm text-white/70">{formatPrice(product.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

