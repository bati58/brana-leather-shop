'use client';

import Link from 'next/link';
import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal } = useCartStore();
  const subtotal = getSubtotal();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={closeCart}
        aria-hidden="true"
      />
      <div
        className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-brand-cream shadow-2xl animate-slide-in-right flex flex-col"
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between p-6 border-b border-brand-dark/10">
          <h2 className="font-display text-xl text-brand-dark flex items-center gap-2">
            <ShoppingBag size={22} className="text-brand-gold" />
            Your Cart ({items.length})
          </h2>
          <button
            onClick={closeCart}
            className="p-2 hover:bg-brand-dark/5 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag size={48} className="text-brand-gray/30 mb-4" />
              <p className="font-display text-lg text-brand-dark mb-2">Your cart is empty</p>
              <p className="text-brand-gray text-sm mb-6">Discover our handcrafted collection</p>
              <Link href="/shop" onClick={closeCart}>
                <Button>Shop the Collection</Button>
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="flex gap-4 p-3 bg-white rounded-lg border border-brand-dark/5"
                >
                  <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-body text-sm font-medium text-brand-dark truncate">
                      {item.name}
                    </h3>
                    <p className="text-xs text-brand-gray mt-0.5">
                      {[item.color, item.size].filter(Boolean).join(' · ')}
                    </p>
                    <p className="text-sm font-medium text-brand-gold mt-1">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center gap--2 mt-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1, item.size, item.color)
                        }
                        className="w-7 h-7 flex items-center justify-center border border-brand-dark/20 rounded hover:border-brand-gold transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1, item.size, item.color)
                        }
                        className="w-7 h-7 flex items-center justify-center border border-brand-dark/20 rounded hover:border-brand-gold transition-colors"
                        aria-label="Increase quantity"
                        disabled={item.quantity >= item.maxStock}
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => removeItem(item.productId, item.size, item.color)}
                        className="ml-auto text-xs text-brand-gray hover:text-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-brand-dark/10 bg-white">
            <div className="flex justify-between mb-4">
              <span className="font-body text-brand-gray">Subtotal</span>
              <span className="font-display text-lg text-brand-dark">{formatPrice(subtotal)}</span>
            </div>
            <Link href="/checkout" onClick={closeCart} className="block">
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </Link>
            <Link
              href="/cart"
              onClick={closeCart}
              className="block text-center mt-3 text-sm text-brand-gold hover:text-brand-tan transition-colors font-body"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
