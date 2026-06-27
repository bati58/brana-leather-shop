import type { Category, Subcategory } from '@/types';
import { productImageUrl } from '@/lib/cloudinary';

/** Product slug → category (verified against catalog-products.ts) */
export const PRODUCT_CATEGORY: Record<string, Category> = {
  // Footwear (8)
  'heritage-oxford-shoes': 'footwear',
  'derby-brogue-shoes': 'footwear',
  'monk-strap-shoes': 'footwear',
  'womens-leather-flats': 'footwear',
  'artisan-leather-sandals': 'footwear',
  'loafers-classic': 'footwear',
  'chelsea-boots': 'footwear',
  'handcrafted-moccasins': 'footwear',
  // Bags (8)
  'artisan-shoulder-bag': 'bags',
  'classic-handbag': 'bags',
  'leather-tote-bag': 'bags',
  'crossbody-saddle-bag': 'bags',
  'leather-backpack': 'bags',
  'messenger-bag': 'bags',
  'weekender-duffle-bag': 'bags',
  'evening-clutch': 'bags',
  // Belts (4)
  'handcrafted-leather-belt': 'belts',
  'reversible-belt': 'belts',
  'womens-slim-belt': 'belts',
  'braided-leather-belt': 'belts',
  // Small leather goods (6)
  'artisan-bifold-wallet': 'small-leather-goods',
  'zip-around-wallet': 'small-leather-goods',
  'card-holder-wallet': 'small-leather-goods',
  'coin-purse-key-organizer': 'small-leather-goods',
  'travel-passport-wallet': 'small-leather-goods',
  'leather-keychain': 'small-leather-goods',
  // Clothing & accessories (8)
  'classic-leather-jacket': 'clothing-accessories',
  'bomber-jacket': 'clothing-accessories',
  'vintage-rider-jacket': 'clothing-accessories',
  'suede-trucker-jacket': 'clothing-accessories',
  'heritage-leather-vest': 'clothing-accessories',
  'leather-cap': 'clothing-accessories',
  'artisan-leather-gloves': 'clothing-accessories',
  'handcrafted-watch-strap': 'clothing-accessories',
  // Home & office (5)
  'leather-journal-cover': 'home-office',
  'desk-organizer-tray': 'home-office',
  'leather-coasters-set': 'home-office',
  'leather-photo-frame': 'home-office',
  'leather-cushion-cover': 'home-office',
  // Gifts (3)
  'engraved-gift-wallet': 'gifts',
  'executive-gift-set': 'gifts',
  'personalized-tote-gift': 'gifts',
};

/** Subcategory fallback when slug is missing from the map */
const SUBCATEGORY_REPRESENTATIVE: Record<Subcategory, string> = {
  'mens-dress-shoes': 'heritage-oxford-shoes',
  'womens-heels-flats': 'womens-leather-flats',
  sandals: 'artisan-leather-sandals',
  loafers: 'loafers-classic',
  boots: 'chelsea-boots',
  moccasins: 'handcrafted-moccasins',
  'shoulder-bags': 'artisan-shoulder-bag',
  'handbags-purses': 'classic-handbag',
  'tote-bags': 'leather-tote-bag',
  'crossbody-bags': 'crossbody-saddle-bag',
  backpacks: 'leather-backpack',
  'laptop-briefcases': 'messenger-bag',
  'travel-duffel-bags': 'weekender-duffle-bag',
  'clutch-bags': 'evening-clutch',
  'mens-formal-belts': 'handcrafted-leather-belt',
  'mens-casual-belts': 'reversible-belt',
  'womens-belts': 'womens-slim-belt',
  'wide-fashion-belts': 'braided-leather-belt',
  'bifold-trifold-wallets': 'artisan-bifold-wallet',
  'card-holders': 'card-holder-wallet',
  'coin-purses': 'coin-purse-key-organizer',
  'passport-holders': 'travel-passport-wallet',
  keychains: 'leather-keychain',
  'leather-jackets': 'classic-leather-jacket',
  'leather-vests': 'heritage-leather-vest',
  'caps-hats': 'leather-cap',
  gloves: 'artisan-leather-gloves',
  'watch-straps': 'handcrafted-watch-strap',
  'notebook-covers': 'leather-journal-cover',
  'desk-accessories': 'desk-organizer-tray',
  coasters: 'leather-coasters-set',
  'photo-frames': 'leather-photo-frame',
  'cushion-covers': 'leather-cushion-cover',
  'engraved-wallets': 'engraved-gift-wallet',
  'gift-sets': 'executive-gift-set',
  'personalized-bags': 'personalized-tote-gift',
};

/** Representative product slug per category — used for category cards & marketing */
export const CATEGORY_HERO_SLUG: Record<Category, string> = {
  footwear: 'heritage-oxford-shoes',
  bags: 'leather-tote-bag',
  belts: 'handcrafted-leather-belt',
  'small-leather-goods': 'artisan-bifold-wallet',
  'clothing-accessories': 'classic-leather-jacket',
  'home-office': 'leather-journal-cover',
  gifts: 'executive-gift-set',
};

const MARKETING_IMAGE_SLUG = {
  shoes: 'heritage-oxford-shoes',
  shoe: 'artisan-leather-sandals',
  bag: 'artisan-shoulder-bag',
  jacket: 'classic-leather-jacket',
  pouch: 'artisan-bifold-wallet',
  classic: 'handcrafted-leather-belt',
} as const;

/** Primary product image from local files or Cloudinary CDN */
export function productImagesFor(slug: string, subcategory: Subcategory): string[] {
  const resolved = PRODUCT_CATEGORY[slug] ? slug : SUBCATEGORY_REPRESENTATIVE[subcategory];
  return [productImageUrl(resolved, { width: 800, crop: 'fill' })];
}

/** Category / marketing hero images */
export function categoryHeroImage(category: Category, width = 900): string {
  const slug = CATEGORY_HERO_SLUG[category];
  return productImageUrl(slug, { width, crop: 'fill' });
}

export function leatherMarketingImage(key: keyof typeof MARKETING_IMAGE_SLUG, width = 900): string {
  return productImageUrl(MARKETING_IMAGE_SLUG[key], { width, crop: 'fill' });
}
