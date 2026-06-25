import type { PaymentMethod } from '@/types';

/**
 * Central business, payment & social config.
 * Override via .env.local — see .env.example
 */

const activePaymentsRaw =
  process.env.NEXT_PUBLIC_ACTIVE_PAYMENT_METHODS || 'telebirr,cbe,cod';

export const siteConfig = {
  name: 'Brana Leather',
  tagline: 'Raw Authenticity, Refined Design',
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE || '0989977058',
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'batidev01@gmail.com',
  address: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || 'Bishoftu (Seven Lake City), Ethiopia',
  storeHours: {
    weekdays: 'Mon–Sat: 9:00 AM – 6:00 PM',
    sunday: 'Sunday: Closed',
  },
  notifications: {
    email: process.env.NOTIFICATION_EMAIL || 'batidev01@gmail.com',
    from: process.env.EMAIL_FROM || 'Brana Leather <onboarding@resend.dev>',
  },
  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || 'bati_jano',
    telegram: process.env.NEXT_PUBLIC_TELEGRAM_HANDLE || 'CME_1CE',
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '251989977058',
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || '',
    tiktok: process.env.NEXT_PUBLIC_TIKTOK_HANDLE || '',
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  shipping: {
    freeThreshold: Number(process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD || 10000),
    standardFee: Number(process.env.NEXT_PUBLIC_SHIPPING_FEE || 500),
    domesticEta: '1–5 business days',
    pickupEta: 'Same day (Bishoftu workshop)',
  },
} as const;

export const PAYMENT_METHOD_OPTIONS: {
  id: PaymentMethod;
  label: string;
  description: string;
}[] = [
  {
    id: 'telebirr',
    label: 'Telebirr',
    description: 'Pay with Ethio Telecom mobile wallet via secure checkout',
  },
  {
    id: 'cbe',
    label: 'CBE Birr',
    description: 'Pay with Commercial Bank of Ethiopia mobile banking',
  },
  {
    id: 'cod',
    label: 'Cash on Delivery',
    description: 'Pay when your order arrives at your door or at pickup',
  },
  {
    id: 'chapa',
    label: 'Chapa',
    description: 'Card, bank transfer, and mobile money (enable when ready)',
  },
  {
    id: 'stripe',
    label: 'Stripe (International)',
    description: 'Visa & Mastercard for international customers',
  },
];

export function getActivePaymentMethods() {
  const active = new Set(
    activePaymentsRaw.split(',').map((m) => m.trim()) as PaymentMethod[]
  );
  return PAYMENT_METHOD_OPTIONS.filter((m) => active.has(m.id));
}

export function getActivePaymentBadges() {
  return getActivePaymentMethods().map((m) => m.label);
}

export function instagramUrl(handle = siteConfig.social.instagram) {
  const clean = handle.replace(/^@/, '').replace(/^https?:\/\/(www\.)?instagram\.com\//, '');
  return `https://instagram.com/${clean}`;
}

export function telegramUrl(handle = siteConfig.social.telegram) {
  const clean = handle.replace(/^@/, '').replace(/^https?:\/\/(www\.)?t\.me\//, '');
  return `https://t.me/${clean}`;
}

export function whatsappUrl(message?: string, number = siteConfig.social.whatsapp) {
  let digits = number.replace(/\D/g, '');
  if (digits.startsWith('0')) digits = `251${digits.slice(1)}`;
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function paymentMethodLabel(method: PaymentMethod): string {
  return PAYMENT_METHOD_OPTIONS.find((m) => m.id === method)?.label ?? method;
}

export function calculateShipping(
  subtotal: number,
  deliveryMethod: 'pickup' | 'delivery'
): number {
  if (deliveryMethod === 'pickup') return 0;
  if (subtotal >= siteConfig.shipping.freeThreshold) return 0;
  return siteConfig.shipping.standardFee;
}
