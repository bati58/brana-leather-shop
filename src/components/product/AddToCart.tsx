'use client';

import { useState } from 'react';
import { MessageCircle, Ruler } from 'lucide-react';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { useCartStore } from '@/store/cartStore';
import { useToast } from '@/components/ui/ToastProvider';
import { formatPrice, getWhatsAppOrderUrl } from '@/lib/utils';
import { cn } from '@/lib/utils';
import type { Product } from '@/types';

interface AddToCartProps {
  product: Product;
}

export default function AddToCart({ product }: AddToCartProps) {
  const [selectedSize, setSelectedSize] = useState(product.variants[0]?.size || '');
  const [selectedColor, setSelectedColor] = useState(product.variants[0]?.color || '');
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const { addItem } = useCartStore();
  const { showToast } = useToast();

  const sizes = [...new Set(product.variants.map((v) => v.size).filter(Boolean))] as string[];
  const colors = [...new Set(product.variants.map((v) => v.color))];

  const currentVariant = product.variants.find(
    (v) => v.color === selectedColor && (!v.size || v.size === selectedSize)
  ) || product.variants.find((v) => v.color === selectedColor);

  const stock = currentVariant?.stock ?? 0;
  const isOutOfStock = stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize || undefined,
      color: selectedColor,
      maxStock: stock,
    });
    showToast(`${product.name} added to cart`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl sm:text-4xl text-brand-dark mb-2">{product.name}</h1>
        <div className="flex items-baseline gap-3">
          <p className="font-display text-2xl text-brand-gold">{formatPrice(product.price)}</p>
          {product.priceUsd && (
            <p className="text-brand-gray font-body">{formatPrice(product.priceUsd, 'USD')}</p>
          )}
        </div>
      </div>

      {stock > 0 && stock <= 5 && (
        <p className="text-sm font-body text-orange-600 font-medium">
          Only {stock} left in stock!
        </p>
      )}

      {colors.length > 1 && (
        <div>
          <p className="text-sm font-medium text-brand-dark mb-2 font-body">
            Color: <span className="text-brand-gray">{selectedColor}</span>
          </p>
          <div className="flex gap-2">
            {colors.map((color) => {
              const variant = product.variants.find((v) => v.color === color);
              return (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    'w-10 h-10 rounded-full border-2 transition-all',
                    selectedColor === color
                      ? 'border-brand-gold ring-2 ring-brand-gold/30'
                      : 'border-brand-dark/20 hover:border-brand-gold'
                  )}
                  style={{ backgroundColor: variant?.colorHex }}
                  aria-label={`Select ${color}`}
                  title={color}
                />
              );
            })}
          </div>
        </div>
      )}

      {sizes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-brand-dark font-body">Size</p>
            <button
              onClick={() => setSizeGuideOpen(true)}
              className="text-sm text-brand-gold hover:text-brand-tan flex items-center gap-1 font-body"
            >
              <Ruler size={14} /> Size Guide
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const variant = product.variants.find(
                (v) => v.size === size && v.color === selectedColor
              );
              const sizeStock = variant?.stock ?? 0;
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  disabled={sizeStock === 0}
                  className={cn(
                    'px-4 py-2 text-sm font-body border rounded-md transition-colors',
                    selectedSize === size
                      ? 'border-brand-gold bg-brand-gold text-white'
                      : 'border-brand-dark/20 hover:border-brand-gold',
                    sizeStock === 0 && 'opacity-40 cursor-not-allowed line-through'
                  )}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="sticky bottom-4 z-10 space-y-3 bg-brand-cream/95 backdrop-blur-sm p-4 -mx-4 rounded-lg border border-brand-dark/5 lg:static lg:bg-transparent lg:p-0 lg:border-0 lg:mx-0">
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          className="w-full"
          size="lg"
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>
        <a
          href={getWhatsAppOrderUrl(product.name, product.price)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 border-2 border-green-600 text-green-700 rounded-md font-body font-medium hover:bg-green-50 transition-colors"
        >
          <MessageCircle size={20} />
          Order via WhatsApp
        </a>
      </div>

      <Modal isOpen={sizeGuideOpen} onClose={() => setSizeGuideOpen(false)} title="Size Guide">
        <div className="space-y-4 font-body text-sm text-brand-gray">
          {product.category === 'shoes' ? (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-brand-dark">EU</th>
                  <th className="text-left py-2 text-brand-dark">US</th>
                  <th className="text-left py-2 text-brand-dark">CM</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['39', '6.5', '25'],
                  ['40', '7', '25.5'],
                  ['41', '8', '26'],
                  ['42', '9', '27'],
                  ['43', '10', '27.5'],
                  ['44', '11', '28'],
                ].map(([eu, us, cm]) => (
                  <tr key={eu} className="border-b border-brand-dark/5">
                    <td className="py-2">{eu}</td>
                    <td className="py-2">{us}</td>
                    <td className="py-2">{cm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : product.category === 'jackets' ? (
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 text-brand-dark">Size</th>
                  <th className="text-left py-2 text-brand-dark">Chest</th>
                  <th className="text-left py-2 text-brand-dark">Length</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['S', '36"', '27"'],
                  ['M', '38"', '28"'],
                  ['L', '40"', '29"'],
                  ['XL', '42"', '30"'],
                ].map(([size, chest, length]) => (
                  <tr key={size} className="border-b border-brand-dark/5">
                    <td className="py-2">{size}</td>
                    <td className="py-2">{chest}</td>
                    <td className="py-2">{length}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>{product.details.sizing}</p>
          )}
        </div>
      </Modal>
    </div>
  );
}
