import { cloudinaryUrl, isCloudinaryConfigured } from '@/lib/cloudinary';
import type { Category } from '@/types';

export const MARKETING_CLOUD_IDS = {
  bags: 'samples/ecommerce/leather-bag-gray',
  footwear: 'samples/ecommerce/shoes',
  belts: 'samples/ecommerce/analog-classic',
  'small-leather-goods': 'samples/ecommerce/accessories-bag',
  'clothing-accessories': 'samples/man-on-a-street',
  'home-office': 'samples/ecommerce/analog-classic',
  gifts: 'samples/ecommerce/accessories-bag',
} as const;

function marketingImage(publicId: string, width = 800): string {
  if (isCloudinaryConfigured()) {
    return cloudinaryUrl(publicId, { width, crop: 'fill' });
  }
  return `/images/products/placeholder.jpg`;
}

export function categoryImage(category: Category): string {
  const id = MARKETING_CLOUD_IDS[category];
  return marketingImage(id, 900);
}

export const instagramFeedImages = [
  'samples/ecommerce/shoes',
  'samples/shoe',
  'samples/ecommerce/leather-bag-gray',
  'samples/ecommerce/accessories-bag',
  'samples/man-on-a-street',
  'samples/people/smiling-man',
].map((id) => marketingImage(id, 700));
