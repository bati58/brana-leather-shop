import type { Category, Subcategory } from '@/types';

export interface SubcategoryDef {
  slug: Subcategory;
  label: string;
}

export interface CategoryDef {
  slug: Category;
  label: string;
  emoji: string;
  description: string;
  subcategories: SubcategoryDef[];
}

export const CATALOG: CategoryDef[] = [
  {
    slug: 'bags',
    label: 'Bags',
    emoji: '👜',
    description: 'Handcrafted carryalls for every occasion — from daily commutes to weekend travel.',
    subcategories: [
      { slug: 'shoulder-bags', label: 'Shoulder Bags' },
      { slug: 'handbags-purses', label: 'Handbags / Purses' },
      { slug: 'tote-bags', label: 'Tote Bags' },
      { slug: 'crossbody-bags', label: 'Crossbody Bags' },
      { slug: 'backpacks', label: 'Backpacks' },
      { slug: 'laptop-briefcases', label: 'Laptop Bags / Briefcases' },
      { slug: 'travel-duffel-bags', label: 'Travel Duffel Bags' },
      { slug: 'clutch-bags', label: 'Clutch Bags' },
    ],
  },
  {
    slug: 'footwear',
    label: 'Footwear',
    emoji: '👞',
    description: 'Premium leather shoes and sandals — dress, casual, and everyday comfort.',
    subcategories: [
      { slug: 'mens-dress-shoes', label: "Men's Dress Shoes" },
      { slug: 'womens-heels-flats', label: "Women's Heels / Flats" },
      { slug: 'sandals', label: 'Sandals' },
      { slug: 'loafers', label: 'Loafers' },
      { slug: 'boots', label: 'Boots' },
      { slug: 'moccasins', label: 'Moccasins' },
    ],
  },
  {
    slug: 'belts',
    label: 'Belts',
    emoji: '👔',
    description: 'Single-piece leather belts with solid brass buckles — formal to fashion-forward.',
    subcategories: [
      { slug: 'mens-formal-belts', label: "Men's Formal Belts" },
      { slug: 'mens-casual-belts', label: "Men's Casual Belts" },
      { slug: 'womens-belts', label: "Women's Belts" },
      { slug: 'wide-fashion-belts', label: 'Wide Fashion Belts' },
    ],
  },
  {
    slug: 'small-leather-goods',
    label: 'Small Leather Goods',
    emoji: '👛',
    description: 'Wallets, card holders, and everyday essentials that age beautifully.',
    subcategories: [
      { slug: 'bifold-trifold-wallets', label: 'Wallets (Bifold, Trifold)' },
      { slug: 'card-holders', label: 'Card Holders' },
      { slug: 'coin-purses', label: 'Coin Purses' },
      { slug: 'passport-holders', label: 'Passport Holders' },
      { slug: 'keychains', label: 'Keychains / Key Holders' },
    ],
  },
  {
    slug: 'clothing-accessories',
    label: 'Clothing & Accessories',
    emoji: '🧥',
    description: 'Jackets, gloves, and leather accents for a complete Brana look.',
    subcategories: [
      { slug: 'leather-jackets', label: 'Leather Jackets' },
      { slug: 'leather-vests', label: 'Leather Vests' },
      { slug: 'caps-hats', label: 'Caps / Hats' },
      { slug: 'gloves', label: 'Gloves' },
      { slug: 'watch-straps', label: 'Watch Straps' },
    ],
  },
  {
    slug: 'home-office',
    label: 'Home & Office',
    emoji: '🪑',
    description: 'Leather touches for your desk, home, and workspace.',
    subcategories: [
      { slug: 'notebook-covers', label: 'Notebook / Journal Covers' },
      { slug: 'desk-accessories', label: 'Desk Accessories' },
      { slug: 'coasters', label: 'Coasters' },
      { slug: 'photo-frames', label: 'Photo Frames' },
      { slug: 'cushion-covers', label: 'Cushion Covers' },
    ],
  },
  {
    slug: 'gifts',
    label: 'Gift Items',
    emoji: '🎁',
    description: 'Personalized and curated leather gifts for every occasion.',
    subcategories: [
      { slug: 'engraved-wallets', label: 'Custom Engraved Wallets' },
      { slug: 'gift-sets', label: 'Gift Sets (Wallet + Belt + Keychain)' },
      { slug: 'personalized-bags', label: 'Personalized Bags' },
    ],
  },
];

export const ALL_CATEGORIES: Category[] = CATALOG.map((c) => c.slug);

export const CATEGORY_LABELS: Record<Category, string> = Object.fromEntries(
  CATALOG.map((c) => [c.slug, c.label])
) as Record<Category, string>;

export const SUBCATEGORY_LABELS: Record<Subcategory, string> = Object.fromEntries(
  CATALOG.flatMap((c) => c.subcategories.map((s) => [s.slug, s.label]))
) as Record<Subcategory, string>;

export function getCategoryDef(slug: Category): CategoryDef | undefined {
  return CATALOG.find((c) => c.slug === slug);
}

export function getSubcategoriesFor(category: Category): SubcategoryDef[] {
  return getCategoryDef(category)?.subcategories ?? [];
}

/** Legacy shop URLs → new category slugs */
export const LEGACY_CATEGORY_REDIRECTS: Record<string, Category> = {
  shoes: 'footwear',
  jackets: 'clothing-accessories',
  wallets: 'small-leather-goods',
  accessories: 'clothing-accessories',
};
