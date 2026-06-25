'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice } from '@/lib/utils';
import { calculateShipping, siteConfig } from '@/lib/site-config';
import Button from '@/components/ui/Button';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, clearCart } = useCartStore();
  const subtotal = getSubtotal();
  const shipping = calculateShipping(subtotal, 'delivery');
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="text-center px-4">
          <ShoppingBag size={64} className="text-brand-gray/30 mx-auto mb-6" />
          <h1 className="font-display text-3xl text-brand-dark mb-3">Your cart is empty</h1>
          <p className="text-brand-gray font-body mb-8">
            Discover our handcrafted leather collection
          </p>
          <Link href="/shop">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-brand-cream min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-brand-gray hover:text-brand-gold transition-colors font-body text-sm mb-8"
        >
          <ArrowLeft size={16} /> Continue Shopping
        </Link>

        <h1 className="font-display text-3xl text-brand-dark mb-8">Shopping Cart</h1>

        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.size}-${item.color}`}
              className="flex gap-4 p-4 bg-white rounded-lg border border-brand-dark/5"
            >
              <div className="relative w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-display text-lg text-brand-dark">{item.name}</h3>
                    <p className="text-sm text-brand-gray font-body">
                      {[item.color, item.size].filter(Boolean).join(' · ')}
                    </p>
                  </div>
                  <p className="font-display text-brand-gold">{formatPrice(item.price * item.quantity)}</p>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1, item.size, item.color)}
                    className="w-8 h-8 flex items-center justify-center border border-brand-dark/20 rounded hover:border-brand-gold"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm w-6 text-center font-body">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1, item.size, item.color)}
                    className="w-8 h-8 flex items-center justify-center border border-brand-dark/20 rounded hover:border-brand-gold"
                    aria-label="Increase quantity"
                    disabled={item.quantity >= item.maxStock}
                  >
                    <Plus size={14} />
                  </button>
                  <button
                    onClick={() => removeItem(item.productId, item.size, item.color)}
                    className="ml-auto text-brand-gray hover:text-red-600 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg border border-brand-dark/5 p-6">
          <div className="space-y-3 mb-6">
            <div className="flex justify-between font-body text-sm">
              <span className="text-brand-gray">Subtotal</span>
              <span className="text-brand-dark">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between font-body text-sm">
              <span className="text-brand-gray">Shipping</span>
              <span className="text-brand-dark">
                {shipping === 0 ? 'Free' : formatPrice(shipping)}
              </span>
            </div>
            {subtotal < siteConfig.shipping.freeThreshold && (
              <p className="text-xs text-brand-gray">
                Free shipping on orders over {formatPrice(siteConfig.shipping.freeThreshold)}
              </p>
            )}
            <div className="flex justify-between font-display text-xl pt-3 border-t border-brand-dark/10">
              <span>Total</span>
              <span className="text-brand-gold">{formatPrice(total)}</span>
            </div>
          </div>
          <Link href="/checkout" className="block">
            <Button className="w-full" size="lg">
              Proceed to Checkout
            </Button>
          </Link>
          <button
            onClick={clearCart}
            className="w-full mt-3 text-sm text-brand-gray hover:text-red-600 transition-colors font-body"
          >
            Clear cart
          </button>
        </div>
      </div>
    </div>
  );
}
