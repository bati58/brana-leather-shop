import { leatherMarketingImage } from '@/lib/product-images';
import type { Category } from '@/types';

const CATEGORY_IMAGE_KEY = {
  bags: 'bag',
  footwear: 'shoes',
  belts: 'classic',
  'small-leather-goods': 'pouch',
  'clothing-accessories': 'jacket',
  'home-office': 'pouch',
  gifts: 'bag',
} as const;

export function categoryImage(category: Category): string {
  const key = CATEGORY_IMAGE_KEY[category];
  return leatherMarketingImage(key, 900);
}

/** Instagram grid — distinct leather product shots */
export const instagramFeedImages = [
  leatherMarketingImage('shoes', 700),
  leatherMarketingImage('bag', 700),
  leatherMarketingImage('jacket', 700),
  leatherMarketingImage('pouch', 700),
  leatherMarketingImage('classic', 700),
  leatherMarketingImage('shoe', 700),
];
