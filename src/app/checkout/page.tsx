'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Check, ChevronRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { formatPrice, generateOrderId } from '@/lib/utils';
import Button from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useToast } from '@/components/ui/ToastProvider';
import type { DeliveryMethod, PaymentMethod } from '@/types';

const STEPS = ['Cart', 'Details', 'Delivery', 'Payment'];

const paymentMethods: { id: PaymentMethod; label: string; description: string }[] = [
  { id: 'chapa', label: 'Chapa', description: 'Pay with mobile money, bank transfer, or card' },
  { id: 'telebirr', label: 'Telebirr', description: 'Ethio Telecom mobile wallet' },
  { id: 'cbe', label: 'CBE Birr', description: 'Commercial Bank of Ethiopia' },
  { id: 'cod', label: 'Cash on Delivery', description: 'Pay when you receive your order' },
  { id: 'stripe', label: 'Stripe (International)', description: 'Visa, Mastercard for international orders' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const { showToast } = useToast();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);

  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Addis Ababa',
  });
  const [delivery, setDelivery] = useState<DeliveryMethod>('delivery');
  const [payment, setPayment] = useState<PaymentMethod>('chapa');

  const subtotal = getSubtotal();
  const shipping = delivery === 'pickup' ? 0 : subtotal > 10000 ? 0 : 500;
  const total = subtotal + shipping;

  useEffect(() => {
    setIsHydrated(true);
    const params = new URLSearchParams(window.location.search);
    const order = params.get('order');
    if (order) {
      setOrderId(order);
      setStep(4);
    }
  }, []);

  const isConfirmation = step === 4 || !!orderId;

  if (!isHydrated && items.length === 0) {
    return <div className="pt-24 pb-16 min-h-screen bg-brand-cream" />;
  }

  if (items.length === 0 && isHydrated && !isConfirmation) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl text-brand-dark mb-4">No items to checkout</h1>
          <Link href="/shop">
            <Button>Go to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    const newOrderId = generateOrderId();
    setOrderId(newOrderId);

    try {
      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: newOrderId,
          items,
          customer,
          deliveryMethod: delivery,
          paymentMethod: payment,
          subtotal,
          shipping,
          total,
        }),
      });

      if (!orderRes.ok) {
        showToast('Failed to place order. Please try again.', 'error');
        return;
      }

      if (payment === 'cod') {
        clearCart();
        setStep(4);
        router.push(`/checkout?order=${newOrderId}&payment=cod`);
        return;
      }

      const [firstName, ...rest] = customer.name.trim().split(' ');
      const lastName = rest.join(' ') || firstName;

      const paymentRes = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          email: customer.email,
          firstName,
          lastName,
          phone: customer.phone,
          orderId: newOrderId,
          paymentMethod: payment,
        }),
      });

      const paymentData = await paymentRes.json().catch(() => ({}));

      if (!paymentRes.ok || !paymentData.checkout_url) {
        showToast(paymentData?.error || 'Payment initialization failed.', 'error');
        return;
      }

      clearCart();
      window.location.href = paymentData.checkout_url;
    } catch (e) {
      showToast('Something went wrong while placing your order.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isConfirmation) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-brand-cream flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-green-600" />
          </div>
          <h1 className="font-display text-3xl text-brand-dark mb-3">Order Confirmed!</h1>
          <p className="font-body text-sm text-brand-gray mb-5">
            Order number: <span className="font-display text-brand-gold">{orderId}</span>
          </p>
          <p className="text-brand-gray font-body mb-2">
            Thank you for your order. We&apos;ll process it right away and send updates as it moves through delivery.
          </p>
          <a
            href={`https://wa.me/251989977058?text=${encodeURIComponent(
              `Hi Brana Leather! I just placed order ${orderId}. Please confirm status and next steps.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 text-brand-gold hover:text-brand-tan font-body text-sm"
          >
            Get updates on WhatsApp
          </a>
          <div className="mt-8">
            <Link href="/shop"><Button>Continue Shopping</Button></Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-brand-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-3xl text-brand-dark mb-8">Checkout</h1>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-10 overflow-x-auto">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i <= step
                    ? 'bg-brand-gold text-white'
                    : 'bg-brand-dark/10 text-brand-gray'
                }`}
              >
                {i < step ? <Check size={16} /> : i + 1}
              </div>
              <span className={`text-sm font-body hidden sm:inline ${i <= step ? 'text-brand-dark' : 'text-brand-gray'}`}>
                {s}
              </span>
              {i < STEPS.length - 1 && <ChevronRight size={16} className="text-brand-gray mx-1" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 0 && (
              <div className="bg-white rounded-lg border border-brand-dark/5 p-6 space-y-4">
                <h2 className="font-display text-xl text-brand-dark mb-4">Review Your Cart</h2>
                {items.map((item) => (
                  <div key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-4">
                    <div className="relative w-16 h-16 rounded overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" sizes="64px" />
                    </div>
                    <div className="flex-1">
                      <p className="font-body text-sm text-brand-dark">{item.name}</p>
                      <p className="text-xs text-brand-gray">
                        {item.quantity}x · {[item.color, item.size].filter(Boolean).join(', ')}
                      </p>
                    </div>
                    <p className="font-body text-sm text-brand-gold">{formatPrice(item.price * item.quantity)}</p>
                  </div>
                ))}
                <Button onClick={() => setStep(1)} className="w-full mt-4">Continue</Button>
              </div>
            )}

            {step === 1 && (
              <div className="bg-white rounded-lg border border-brand-dark/5 p-6 space-y-4">
                <h2 className="font-display text-xl text-brand-dark mb-4">Your Details</h2>
                <Input label="Full Name" required value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
                <Input label="Phone" type="tel" required placeholder="09xxxxxxxx" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
                <Input label="Email" type="email" required value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
                <Input label="Delivery Address" required value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} />
                <Input label="City" value={customer.city} onChange={(e) => setCustomer({ ...customer, city: e.target.value })} />
                <div className="flex gap-3">
                  <Button variant="secondary" onClick={() => setStep(0)}>Back</Button>
                  <Button onClick={() => setStep(2)} className="flex-1" disabled={!customer.name || !customer.phone || !customer.email || !customer.address}>
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-lg border border-brand-dark/5 p-6 space-y-4">
                <h2 className="font-display text-xl text-brand-dark mb-4">Delivery Method</h2>
                {[
                  { id: 'delivery' as DeliveryMethod, label: 'Home Delivery', desc: 'Delivered to your address (1–5 business days)' },
                  { id: 'pickup' as DeliveryMethod, label: 'Store Pickup', desc: 'Pick up at our Bishoftu workshop (same day)' },
                ].map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      delivery === option.id ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-dark/10 hover:border-brand-gold/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      checked={delivery === option.id}
                      onChange={() => setDelivery(option.id)}
                      className="mt-1 accent-brand-gold"
                    />
                    <div>
                      <p className="font-body font-medium text-brand-dark">{option.label}</p>
                      <p className="text-sm text-brand-gray">{option.desc}</p>
                    </div>
                  </label>
                ))}
                <div className="flex gap-3">
                  <Button variant="secondary" onClick={() => setStep(1)}>Back</Button>
                  <Button onClick={() => setStep(3)} className="flex-1">Continue</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-lg border border-brand-dark/5 p-6 space-y-4">
                <h2 className="font-display text-xl text-brand-dark mb-4">Payment Method</h2>
                {paymentMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-start gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      payment === method.id ? 'border-brand-gold bg-brand-gold/5' : 'border-brand-dark/10 hover:border-brand-gold/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={payment === method.id}
                      onChange={() => setPayment(method.id)}
                      className="mt-1 accent-brand-gold"
                    />
                    <div>
                      <p className="font-body font-medium text-brand-dark">{method.label}</p>
                      <p className="text-sm text-brand-gray">{method.description}</p>
                    </div>
                  </label>
                ))}
                <div className="flex gap-3">
                  <Button variant="secondary" onClick={() => setStep(2)}>Back</Button>
                  <Button onClick={handlePlaceOrder} className="flex-1" isLoading={isSubmitting}>
                    Place Order · {formatPrice(total)}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-brand-dark/5 p-6 sticky top-28">
              <h3 className="font-display text-lg text-brand-dark mb-4">Order Summary</h3>
              <div className="space-y-2 text-sm font-body">
                <div className="flex justify-between">
                  <span className="text-brand-gray">Subtotal ({items.length} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-gray">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between font-display text-lg pt-3 border-t border-brand-dark/10">
                  <span>Total</span>
                  <span className="text-brand-gold">{formatPrice(total)}</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Chapa', 'Telebirr', 'Visa'].map((badge) => (
                  <span key={badge} className="px-2 py-1 text-xs border border-brand-dark/10 rounded text-brand-gray">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
