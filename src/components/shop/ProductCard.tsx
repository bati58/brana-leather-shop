'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useCartStore } from '@/store/cartStore';
import { useToast } from '@/components/ui/ToastProvider';
import { formatPrice } from '@/lib/utils';
import { SUBCATEGORY_LABELS } from '@/lib/categories';
import Badge from '@/components/ui/Badge';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  showQuickAdd?: boolean;
}

export default function ProductCard({ product, showQuickAdd = true }: ProductCardProps) {
  const { addItem } = useCartStore();
  const { showToast } = useToast();

  const defaultVariant = product.variants[0];
  const totalStock = product.variants.reduce((sum, v) => sum + v.stock, 0);
  const isOutOfStock = totalStock === 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: defaultVariant.size,
      color: defaultVariant.color,
      maxStock: defaultVariant.stock,
    });
    showToast(`${product.name} added to cart`);
  };

  const hoverSrc =
    product.images[1] && product.images[1] !== product.images[0] ? product.images[1] : null;

  return (
    <Link href={`/product/${product.slug}`} className="group block">
      <article className="bg-white rounded-lg overflow-hidden border border-brand-dark/5 transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1">
        <div className="relative aspect-[3/4] overflow-hidden bg-brand-cream">
          <Image
            src={product.images[0]}
            alt={`${product.name} - handmade leather ${product.category} from Ethiopia`}
            fill
            className="object-cover transition-opacity duration-300 group-hover:opacity-0"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {hoverSrc && (
            <Image
              src={hoverSrc}
              alt={`${product.name} — alternate view`}
              fill
              className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}
          {product.badge && (
            <div className="absolute top-3 left-3">
              <Badge variant={product.badge} />
            </div>
          )}
          {showQuickAdd && (
            <button
              onClick={handleQuickAdd}
              disabled={isOutOfStock}
              className="absolute bottom-3 left-3 right-3 py-2.5 bg-brand-gold text-white text-sm font-medium rounded opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand-tan disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
            </button>
          )}
        </div>
        <div className="p-4">
          <p className="text-xs text-brand-gray font-body mb-1 line-clamp-1">
            {SUBCATEGORY_LABELS[product.subcategory]}
          </p>
          <h3 className="font-display text-base text-brand-dark group-hover:text-brand-gold transition-colors line-clamp-1">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <p className="font-body text-brand-gold font-medium">{formatPrice(product.price)}</p>
            {product.priceUsd && (
              <p className="text-xs text-brand-gray">{formatPrice(product.priceUsd, 'USD')}</p>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

export function CategoryCard({
  title,
  count,
  image,
  href,
}: {
  title: string;
  count: number;
  image: string;
  href: string;
}) {
  return (
    <Link href={href} className="group relative block overflow-hidden rounded-lg aspect-[4/5]">
      <Image
        src={image}
        alt={`${title} - Brana Leather collection`}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
        sizes="(max-width: 768px) 100vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="font-display text-2xl text-white mb-1">{title}</h3>
        <p className="text-white/60 text-sm font-body mb-3">{count} items</p>
        <span className="inline-flex items-center gap-1 text-brand-gold text-sm font-medium group-hover:gap-2 transition-all">
          Shop Now <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}
