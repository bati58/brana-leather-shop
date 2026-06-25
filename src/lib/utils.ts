import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, currency: 'ETB' | 'USD' = 'ETB'): string {
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  }
  return new Intl.NumberFormat('en-ET', {
    style: 'currency',
    currency: 'ETB',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `BL-${timestamp}-${random}`;
}

export function getWhatsAppOrderUrl(
  productName: string,
  price: number,
  phone = '0989977058'
): string {
  const message = encodeURIComponent(
    `Hello Brana Leather! I'd like to order: ${productName} (${formatPrice(price)}). Please share availability and payment details.`
  );
  return `https://wa.me/251${phone.replace(/^0/, '')}?text=${message}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

export const CATEGORY_LABELS: Record<string, string> = {
  shoes: 'Shoes',
  jackets: 'Jackets',
  wallets: 'Wallets & Bags',
  bags: 'Bags',
  belts: 'Belts',
  accessories: 'Accessories',
};

export const MATERIAL_LABELS: Record<string, string> = {
  'full-grain': 'Full Grain Leather',
  'top-grain': 'Top Grain Leather',
  suede: 'Suede',
  nubuck: 'Nubuck',
};
