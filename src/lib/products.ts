import type { Product, Category, Material, SortOption, FilterState } from '@/types';
import { cloudinaryUrl, isCloudinaryConfigured } from '@/lib/cloudinary';

/**
 * Product images — use one of:
 * - Cloudinary path:    'products/heritage-oxford-shoes-01'  (upload to Media Library)
 * - Cloudinary sample:  'samples/ecommerce/shoes'          (demo until you upload)
 * - Local file:         '/images/products/wallet-01.jpg'
 * - Full URL:           'https://...'
 */
function IMG(src: string, w = 800): string {
  if (src.startsWith('http')) {
    return src.includes('?') ? src : `${src}?w=${w}&q=80&fit=crop`;
  }
  if (src.startsWith('/')) return src;
  if (src.startsWith('photo-')) {
    return `https://images.unsplash.com/${src}?w=${w}&q=80&fit=crop`;
  }
  if (isCloudinaryConfigured()) {
    return cloudinaryUrl(src, { width: w });
  }
  return `/images/products/${src.replace(/^products\//, '')}`;
}

/** Category fallbacks until you upload to products/{slug}-01 … -04 in Cloudinary */
function gallery(category: keyof typeof CLOUD) {
  return CLOUD[category].map((id) => IMG(id));
}

/** After uploading real photos — replace gallery() with uploadGallery('product-slug') */
function uploadGallery(slug: string) {
  return [1, 2, 3, 4].map((n) => IMG(`products/${slug}-${String(n).padStart(2, '0')}`));
}

const CLOUD = {
  shoes: ['samples/ecommerce/shoes', 'samples/shoe', 'samples/ecommerce/shoes', 'samples/shoe'],
  jackets: ['samples/man-on-a-street', 'samples/people/smiling-man', 'samples/man-portrait', 'samples/outdoor-woman'],
  wallets: ['samples/ecommerce/accessories-bag', 'samples/ecommerce/analog-classic', 'samples/ecommerce/accessories-bag', 'samples/ecommerce/analog-classic'],
  bags: ['samples/ecommerce/leather-bag-gray', 'samples/ecommerce/accessories-bag', 'samples/ecommerce/leather-bag-gray', 'samples/ecommerce/accessories-bag'],
  belts: ['samples/ecommerce/analog-classic', 'samples/ecommerce/accessories-bag', 'samples/ecommerce/analog-classic', 'samples/ecommerce/accessories-bag'],
  accessories: ['samples/ecommerce/accessories-bag', 'samples/ecommerce/analog-classic', 'samples/ecommerce/accessories-bag', 'samples/ecommerce/analog-classic'],
} as const;

export const products: Product[] = [
  {
    id: '1',
    slug: 'heritage-oxford-shoes',
    name: 'Heritage Oxford Shoes',
    description: 'Hand-stitched full-grain leather oxford shoes with Goodyear welt construction. A timeless classic built for decades of wear.',
    price: 12500,
    priceUsd: 110,
    category: 'shoes',
    material: 'full-grain',
    images: gallery('shoes'),
    hoverImage: IMG('samples/shoe'),
    badge: 'bestseller',
    featured: true,
    variants: [
      { size: '40', color: 'Brown', colorHex: '#8B4513', stock: 5 },
      { size: '41', color: 'Brown', colorHex: '#8B4513', stock: 3 },
      { size: '42', color: 'Brown', colorHex: '#8B4513', stock: 2 },
      { size: '43', color: 'Black', colorHex: '#1A1A1A', stock: 4 },
    ],
    details: {
      materials: 'Premium Ethiopian full-grain cowhide leather upper, vegetable-tanned leather sole, brass eyelets.',
      build: 'Goodyear welt construction, hand-stitched by master artisans in Bishoftu. Blake-stitched leather insole for comfort.',
      sizing: 'Runs true to size. Available in EU sizes 39–45. Width: standard (D).',
      care: 'Apply leather conditioner monthly. Use cedar shoe trees. Polish with neutral cream.',
      shipping: 'Free delivery within Addis Ababa. 3–5 business days nationwide. International shipping available.',
    },
    createdAt: '2025-11-01',
  },
  {
    id: '2',
    slug: 'classic-leather-jacket',
    name: 'Classic Leather Jacket',
    description: 'A rugged yet refined jacket crafted from supple top-grain leather. Designed for the modern Ethiopian professional.',
    price: 28500,
    priceUsd: 250,
    category: 'jackets',
    material: 'top-grain',
    images: gallery('jackets'),
    hoverImage: IMG('samples/people/smiling-man'),
    badge: 'bestseller',
    featured: true,
    variants: [
      { size: 'M', color: 'Black', colorHex: '#1A1A1A', stock: 3 },
      { size: 'L', color: 'Black', colorHex: '#1A1A1A', stock: 2 },
      { size: 'XL', color: 'Brown', colorHex: '#8B4513', stock: 4 },
    ],
    details: {
      materials: 'Top-grain Ethiopian leather, YKK brass zipper, cotton lining.',
      build: 'Reinforced shoulder seams, interior pockets, adjustable waist tabs.',
      sizing: 'Slim fit. Size up for layering. Chest measurements: S(36"), M(38"), L(40"), XL(42").',
      care: 'Wipe with damp cloth. Condition every 2 months. Store on padded hanger.',
      shipping: 'Free delivery within Addis Ababa. 3–5 business days nationwide.',
    },
    createdAt: '2025-10-15',
  },
  {
    id: '3',
    slug: 'artisan-bifold-wallet',
    name: 'Artisan Bifold Wallet',
    description: 'Slim profile bifold wallet with 6 card slots and bill compartment. Ages beautifully with daily use.',
    price: 3200,
    priceUsd: 28,
    category: 'wallets',
    material: 'full-grain',
    images: gallery('wallets'),
    hoverImage: IMG('samples/ecommerce/analog-classic'),
    badge: 'new',
    featured: true,
    variants: [
      { color: 'Tan', colorHex: '#C4956A', stock: 12 },
      { color: 'Brown', colorHex: '#8B4513', stock: 8 },
      { color: 'Black', colorHex: '#1A1A1A', stock: 6 },
    ],
    details: {
      materials: 'Full-grain leather exterior, RFID-blocking lining.',
      build: 'Hand-stitched edges, 6 card slots, 2 bill compartments, ID window.',
      sizing: 'Dimensions: 11cm x 9cm x 1.5cm when closed.',
      care: 'Apply leather balm occasionally. Avoid overstuffing.',
      shipping: 'Ships within 1–2 business days nationwide.',
    },
    createdAt: '2026-01-10',
  },
  {
    id: '4',
    slug: 'weekender-duffle-bag',
    name: 'Weekender Duffle Bag',
    description: 'Spacious handcrafted duffle perfect for weekend getaways. Features reinforced handles and detachable shoulder strap.',
    price: 15800,
    priceUsd: 140,
    category: 'bags',
    material: 'full-grain',
    images: gallery('bags'),
    hoverImage: IMG('samples/ecommerce/accessories-bag'),
    featured: true,
    variants: [
      { color: 'Cognac', colorHex: '#A0522D', stock: 4 },
      { color: 'Black', colorHex: '#1A1A1A', stock: 3 },
    ],
    details: {
      materials: 'Full-grain leather body, solid brass hardware, cotton canvas lining.',
      build: 'Reinforced base, interior zip pocket, detachable adjustable strap.',
      sizing: 'Capacity: 45L. Dimensions: 55cm x 28cm x 28cm.',
      care: 'Clean with leather cleaner. Condition handles regularly.',
      shipping: 'Free delivery within Addis Ababa.',
    },
    createdAt: '2025-12-01',
  },
  {
    id: '5',
    slug: 'handcrafted-leather-belt',
    name: 'Handcrafted Leather Belt',
    description: 'Classic 3.5cm belt with solid brass buckle. Cut from a single piece of premium leather.',
    price: 2800,
    priceUsd: 25,
    category: 'belts',
    material: 'full-grain',
    images: gallery('belts'),
    hoverImage: IMG('samples/ecommerce/analog-classic'),
    badge: 'bestseller',
    variants: [
      { size: '32', color: 'Brown', colorHex: '#8B4513', stock: 8 },
      { size: '34', color: 'Brown', colorHex: '#8B4513', stock: 6 },
      { size: '36', color: 'Black', colorHex: '#1A1A1A', stock: 5 },
    ],
    details: {
      materials: 'Single-piece full-grain leather, solid brass buckle.',
      build: 'Hand-burnished edges, 5 adjustment holes, 3.5cm width.',
      sizing: 'Measure your waist and add 5cm. Available sizes 30–40.',
      care: 'Condition quarterly. Store flat or rolled, never folded.',
      shipping: 'Ships within 1–2 business days.',
    },
    createdAt: '2025-09-20',
  },
  {
    id: '6',
    slug: 'chelsea-boots',
    name: 'Chelsea Boots',
    description: 'Sleek Chelsea boots with elastic side panels. Versatile enough for office or evening wear.',
    price: 14200,
    priceUsd: 125,
    category: 'shoes',
    material: 'full-grain',
    images: gallery('shoes'),
    hoverImage: IMG('samples/ecommerce/shoes'),
    variants: [
      { size: '41', color: 'Black', colorHex: '#1A1A1A', stock: 4 },
      { size: '42', color: 'Black', colorHex: '#1A1A1A', stock: 3 },
      { size: '43', color: 'Brown', colorHex: '#8B4513', stock: 2 },
    ],
    details: {
      materials: 'Full-grain leather upper, leather sole, elastic gussets.',
      build: 'Blake-stitched construction, pull tab, cushioned insole.',
      sizing: 'Runs half size small. Size up if between sizes.',
      care: 'Use boot trees. Condition monthly. Waterproof spray recommended.',
      shipping: '3–5 business days nationwide.',
    },
    createdAt: '2025-11-20',
  },
  {
    id: '7',
    slug: 'bomber-jacket',
    name: 'Leather Bomber Jacket',
    description: 'Modern bomber silhouette in buttery soft leather. Ribbed cuffs and hem for a sporty edge.',
    price: 32000,
    priceUsd: 280,
    category: 'jackets',
    material: 'top-grain',
    images: gallery('jackets'),
    hoverImage: IMG('samples/man-portrait'),
    badge: 'new',
    variants: [
      { size: 'M', color: 'Brown', colorHex: '#8B4513', stock: 2 },
      { size: 'L', color: 'Brown', colorHex: '#8B4513', stock: 3 },
    ],
    details: {
      materials: 'Top-grain leather, ribbed wool cuffs, satin lining.',
      build: 'Two front pockets, interior zip pocket, snap collar.',
      sizing: 'Regular fit. True to size.',
      care: 'Professional cleaning recommended annually.',
      shipping: 'Free delivery within Addis Ababa.',
    },
    createdAt: '2026-01-05',
  },
  {
    id: '8',
    slug: 'card-holder-wallet',
    name: 'Minimalist Card Holder',
    description: 'Ultra-slim card holder for the modern minimalist. Holds 4–6 cards comfortably.',
    price: 1800,
    priceUsd: 16,
    category: 'wallets',
    material: 'full-grain',
    images: gallery('wallets'),
    hoverImage: IMG('samples/ecommerce/accessories-bag'),
    variants: [
      { color: 'Black', colorHex: '#1A1A1A', stock: 15 },
      { color: 'Tan', colorHex: '#C4956A', stock: 10 },
    ],
    details: {
      materials: 'Full-grain leather, hand-stitched.',
      build: '4 card slots, center pocket for folded bills.',
      sizing: 'Dimensions: 10cm x 7cm.',
      care: 'Wipe clean. Condition sparingly.',
      shipping: 'Ships within 1 business day.',
    },
    createdAt: '2025-12-15',
  },
  {
    id: '9',
    slug: 'messenger-bag',
    name: 'Leather Messenger Bag',
    description: 'Professional messenger bag with laptop compartment. Perfect for daily commute.',
    price: 18500,
    priceUsd: 165,
    category: 'bags',
    material: 'full-grain',
    images: gallery('bags'),
    hoverImage: IMG('samples/ecommerce/leather-bag-gray'),
    badge: 'bestseller',
    variants: [
      { color: 'Brown', colorHex: '#8B4513', stock: 5 },
      { color: 'Black', colorHex: '#1A1A1A', stock: 3 },
    ],
    details: {
      materials: 'Full-grain leather, brass buckles, canvas lining.',
      build: 'Fits 15" laptop, multiple organizer pockets, adjustable strap.',
      sizing: 'Dimensions: 38cm x 30cm x 8cm.',
      care: 'Condition monthly. Avoid heavy rain exposure.',
      shipping: 'Free delivery within Addis Ababa.',
    },
    createdAt: '2025-10-01',
  },
  {
    id: '10',
    slug: 'loafers-classic',
    name: 'Classic Leather Loafers',
    description: 'Elegant penny loafers handcrafted for comfort and style. Ideal for business casual.',
    price: 11800,
    priceUsd: 105,
    category: 'shoes',
    material: 'full-grain',
    images: gallery('shoes'),
    hoverImage: IMG('samples/ecommerce/shoes'),
    variants: [
      { size: '40', color: 'Brown', colorHex: '#8B4513', stock: 4 },
      { size: '42', color: 'Brown', colorHex: '#8B4513', stock: 3 },
      { size: '44', color: 'Black', colorHex: '#1A1A1A', stock: 2 },
    ],
    details: {
      materials: 'Full-grain leather, leather sole, cushioned footbed.',
      build: 'Hand-stitched moccasin construction, leather lining.',
      sizing: 'True to size. Standard width.',
      care: 'Use shoe trees. Polish weekly.',
      shipping: '3–5 business days nationwide.',
    },
    createdAt: '2025-11-10',
  },
  {
    id: '11',
    slug: 'reversible-belt',
    name: 'Reversible Leather Belt',
    description: 'Two belts in one — brown on one side, black on the other. Rotating buckle mechanism.',
    price: 3500,
    priceUsd: 30,
    category: 'belts',
    material: 'top-grain',
    images: gallery('belts'),
    variants: [
      { size: '34', color: 'Brown/Black', colorHex: '#8B4513', stock: 7 },
      { size: '36', color: 'Brown/Black', colorHex: '#8B4513', stock: 5 },
    ],
    details: {
      materials: 'Dual-tone top-grain leather, rotating brass buckle.',
      build: 'Reversible design, 3.2cm width.',
      sizing: 'Standard sizing. Add 5cm to waist measurement.',
      care: 'Condition both sides equally.',
      shipping: 'Ships within 1–2 business days.',
    },
    createdAt: '2025-12-20',
  },
  {
    id: '12',
    slug: 'travel-passport-wallet',
    name: 'Travel Passport Wallet',
    description: 'All-in-one travel organizer with passport slot, card pockets, and boarding pass sleeve.',
    price: 4500,
    priceUsd: 40,
    category: 'wallets',
    material: 'full-grain',
    images: gallery('wallets'),
    hoverImage: IMG('samples/ecommerce/accessories-bag'),
    badge: 'last-one',
    featured: true,
    variants: [
      { color: 'Cognac', colorHex: '#A0522D', stock: 1 },
      { color: 'Black', colorHex: '#1A1A1A', stock: 3 },
    ],
    details: {
      materials: 'Full-grain leather, RFID protection.',
      build: 'Passport slot, 4 card pockets, boarding pass sleeve, pen loop.',
      sizing: 'Dimensions: 14cm x 10cm.',
      care: 'Keep dry. Condition before long trips.',
      shipping: 'Ships within 1 business day.',
    },
    createdAt: '2026-01-15',
  },
  {
    id: '13',
    slug: 'derby-brogue-shoes',
    name: 'Derby Brogue Shoes',
    description: 'Perforated brogue detailing on a classic derby last. A distinguished choice for formal events and boardroom meetings.',
    price: 13200,
    priceUsd: 115,
    category: 'shoes',
    material: 'full-grain',
    images: gallery('shoes'),
    hoverImage: IMG('samples/shoe'),
    badge: 'bestseller',
    featured: true,
    variants: [
      { size: '40', color: 'Brown', colorHex: '#8B4513', stock: 4 },
      { size: '41', color: 'Brown', colorHex: '#8B4513', stock: 3 },
      { size: '42', color: 'Black', colorHex: '#1A1A1A', stock: 2 },
      { size: '43', color: 'Black', colorHex: '#1A1A1A', stock: 3 },
    ],
    details: {
      materials: 'Full-grain leather upper with brogue perforations, leather welt, rubber heel cap.',
      build: 'Goodyear welted, cushioned leather insole, hand-finished edges.',
      sizing: 'True to size. EU 40–44 available.',
      care: 'Polish weekly. Use shoe trees after each wear.',
      shipping: '3–5 business days nationwide.',
    },
    createdAt: '2026-02-01',
  },
  {
    id: '14',
    slug: 'monk-strap-shoes',
    name: 'Double Monk Strap Shoes',
    description: 'Contemporary double monk strap shoes with a sleek silhouette. No laces, all style.',
    price: 13800,
    priceUsd: 120,
    category: 'shoes',
    material: 'full-grain',
    images: gallery('shoes'),
    hoverImage: IMG('samples/ecommerce/shoes'),
    badge: 'new',
    variants: [
      { size: '41', color: 'Black', colorHex: '#1A1A1A', stock: 3 },
      { size: '42', color: 'Black', colorHex: '#1A1A1A', stock: 4 },
      { size: '43', color: 'Cognac', colorHex: '#A0522D', stock: 2 },
    ],
    details: {
      materials: 'Full-grain leather, solid brass buckles, leather sole.',
      build: 'Blake-stitched, pull tab, leather lining throughout.',
      sizing: 'Runs true to size. Standard width.',
      care: 'Condition buckles and leather monthly.',
      shipping: '3–5 business days nationwide.',
    },
    createdAt: '2026-02-10',
  },
  {
    id: '15',
    slug: 'vintage-rider-jacket',
    name: 'Vintage Rider Jacket',
    description: 'Asymmetric zip motorcycle jacket with quilted shoulders. Built for riders and urban explorers alike.',
    price: 34500,
    priceUsd: 300,
    category: 'jackets',
    material: 'full-grain',
    images: gallery('jackets'),
    hoverImage: IMG('samples/man-on-a-street'),
    badge: 'bestseller',
    featured: true,
    variants: [
      { size: 'M', color: 'Black', colorHex: '#1A1A1A', stock: 2 },
      { size: 'L', color: 'Black', colorHex: '#1A1A1A', stock: 3 },
      { size: 'XL', color: 'Brown', colorHex: '#8B4513', stock: 1 },
    ],
    details: {
      materials: 'Heavy full-grain leather, YKK asymmetric zipper, polyester quilt lining.',
      build: 'Reinforced elbows, multiple zip pockets, belted hem.',
      sizing: 'Snug fit. Size up for layering over sweaters.',
      care: 'Professional leather cleaning once a year. Condition quarterly.',
      shipping: 'Free delivery within Addis Ababa.',
    },
    createdAt: '2026-01-28',
  },
  {
    id: '16',
    slug: 'suede-trucker-jacket',
    name: 'Suede Trucker Jacket',
    description: 'Western-inspired trucker jacket in buttery suede. Lightweight with signature snap buttons.',
    price: 26500,
    priceUsd: 230,
    category: 'jackets',
    material: 'suede',
    images: gallery('jackets'),
    hoverImage: IMG('samples/outdoor-woman'),
    badge: 'new',
    variants: [
      { size: 'S', color: 'Tan', colorHex: '#C4956A', stock: 2 },
      { size: 'M', color: 'Tan', colorHex: '#C4956A', stock: 3 },
      { size: 'L', color: 'Brown', colorHex: '#8B4513', stock: 2 },
    ],
    details: {
      materials: 'Ethiopian suede, brushed cotton lining, antique brass snaps.',
      build: 'Classic trucker cut, chest flap pockets, adjustable waist tabs.',
      sizing: 'Regular fit. True to size.',
      care: 'Use suede brush only. Avoid water. Professional cleaning recommended.',
      shipping: '3–5 business days nationwide.',
    },
    createdAt: '2026-02-15',
  },
  {
    id: '17',
    slug: 'zip-around-wallet',
    name: 'Zip-Around Wallet',
    description: 'Secure zip-around design with 12 card slots and coin pocket. Keeps everything organized.',
    price: 4200,
    priceUsd: 37,
    category: 'wallets',
    material: 'full-grain',
    images: gallery('wallets'),
    hoverImage: IMG('samples/ecommerce/analog-classic'),
    variants: [
      { color: 'Black', colorHex: '#1A1A1A', stock: 9 },
      { color: 'Brown', colorHex: '#8B4513', stock: 7 },
      { color: 'Cognac', colorHex: '#A0522D', stock: 5 },
    ],
    details: {
      materials: 'Full-grain leather exterior, YKK zip, RFID-blocking lining.',
      build: '12 card slots, 2 bill compartments, zippered coin pocket.',
      sizing: 'Dimensions: 12cm x 10cm x 2cm when closed.',
      care: 'Wipe with dry cloth. Condition zip area lightly.',
      shipping: 'Ships within 1–2 business days.',
    },
    createdAt: '2026-02-05',
  },
  {
    id: '18',
    slug: 'coin-purse-key-organizer',
    name: 'Coin Purse & Key Organizer',
    description: 'Compact coin purse with built-in key ring and card slot. Perfect everyday carry.',
    price: 2200,
    priceUsd: 19,
    category: 'wallets',
    material: 'top-grain',
    images: gallery('wallets'),
    hoverImage: IMG('samples/ecommerce/accessories-bag'),
    badge: 'new',
    variants: [
      { color: 'Tan', colorHex: '#C4956A', stock: 14 },
      { color: 'Black', colorHex: '#1A1A1A', stock: 11 },
    ],
    details: {
      materials: 'Top-grain leather, solid brass key ring, snap closure.',
      build: 'Coin compartment, 1 card slot, key ring attachment.',
      sizing: 'Dimensions: 9cm x 7cm.',
      care: 'Keep dry. Condition edges monthly.',
      shipping: 'Ships within 1 business day.',
    },
    createdAt: '2026-02-18',
  },
  {
    id: '19',
    slug: 'leather-tote-bag',
    name: 'Leather Tote Bag',
    description: 'Oversized open-top tote for work or market days. Structured base keeps its shape.',
    price: 16800,
    priceUsd: 148,
    category: 'bags',
    material: 'full-grain',
    images: gallery('bags'),
    hoverImage: IMG('samples/ecommerce/leather-bag-gray'),
    badge: 'bestseller',
    featured: true,
    variants: [
      { color: 'Cognac', colorHex: '#A0522D', stock: 4 },
      { color: 'Black', colorHex: '#1A1A1A', stock: 3 },
      { color: 'Brown', colorHex: '#8B4513', stock: 2 },
    ],
    details: {
      materials: 'Full-grain leather, reinforced base, cotton canvas lining.',
      build: 'Open top, interior zip pocket, 2 slip pockets, long shoulder straps.',
      sizing: 'Dimensions: 42cm x 35cm x 12cm.',
      care: 'Condition handles monthly. Store stuffed to maintain shape.',
      shipping: 'Free delivery within Addis Ababa.',
    },
    createdAt: '2026-02-08',
  },
  {
    id: '20',
    slug: 'leather-backpack',
    name: 'Leather Backpack',
    description: 'Roll-top leather backpack with padded laptop sleeve. Urban commuter essential.',
    price: 19500,
    priceUsd: 170,
    category: 'bags',
    material: 'full-grain',
    images: gallery('bags'),
    hoverImage: IMG('samples/ecommerce/accessories-bag'),
    badge: 'new',
    variants: [
      { color: 'Brown', colorHex: '#8B4513', stock: 4 },
      { color: 'Black', colorHex: '#1A1A1A', stock: 3 },
    ],
    details: {
      materials: 'Full-grain leather body, brass buckles, padded back panel.',
      build: 'Fits 14" laptop, roll-top closure, front zip pocket, adjustable straps.',
      sizing: 'Capacity: 22L. Dimensions: 45cm x 30cm x 15cm.',
      care: 'Avoid prolonged rain. Condition monthly.',
      shipping: '3–5 business days nationwide.',
    },
    createdAt: '2026-02-20',
  },
  {
    id: '21',
    slug: 'braided-leather-belt',
    name: 'Braided Leather Belt',
    description: 'Hand-braided leather belt with a vintage brass buckle. Adds texture to any outfit.',
    price: 3800,
    priceUsd: 33,
    category: 'belts',
    material: 'full-grain',
    images: gallery('belts'),
    hoverImage: IMG('samples/ecommerce/accessories-bag'),
    variants: [
      { size: '32', color: 'Brown', colorHex: '#8B4513', stock: 5 },
      { size: '34', color: 'Brown', colorHex: '#8B4513', stock: 4 },
      { size: '36', color: 'Tan', colorHex: '#C4956A', stock: 3 },
    ],
    details: {
      materials: 'Braided full-grain leather strips, vintage brass buckle.',
      build: 'Hand-braided, 3.5cm width, 5 adjustment holes.',
      sizing: 'Add 5cm to waist measurement for correct fit.',
      care: 'Condition lightly. Do not fold or crease.',
      shipping: 'Ships within 1–2 business days.',
    },
    createdAt: '2026-02-12',
  },
  {
    id: '22',
    slug: 'leather-keychain',
    name: 'Leather Keychain',
    description: 'Hand-stitched key fob with sturdy snap hook. A small luxury for everyday carry.',
    price: 950,
    priceUsd: 8,
    category: 'accessories',
    material: 'full-grain',
    images: gallery('accessories'),
    hoverImage: IMG('samples/ecommerce/analog-classic'),
    variants: [
      { color: 'Brown', colorHex: '#8B4513', stock: 20 },
      { color: 'Black', colorHex: '#1A1A1A', stock: 18 },
      { color: 'Tan', colorHex: '#C4956A', stock: 15 },
    ],
    details: {
      materials: 'Full-grain leather loop, solid brass snap hook.',
      build: 'Hand-stitched, debossed Brana logo, split ring included.',
      sizing: 'Loop length: 10cm.',
      care: 'Wipe clean. Condition occasionally.',
      shipping: 'Ships within 1 business day.',
    },
    createdAt: '2026-02-22',
  },
  {
    id: '23',
    slug: 'handcrafted-watch-strap',
    name: 'Handcrafted Watch Strap',
    description: 'Replacement leather watch strap with quick-release pins. Fits standard lug widths.',
    price: 2800,
    priceUsd: 25,
    category: 'accessories',
    material: 'full-grain',
    images: gallery('accessories'),
    hoverImage: IMG('samples/ecommerce/accessories-bag'),
    badge: 'bestseller',
    variants: [
      { size: '20mm', color: 'Brown', colorHex: '#8B4513', stock: 8 },
      { size: '22mm', color: 'Brown', colorHex: '#8B4513', stock: 6 },
      { size: '22mm', color: 'Black', colorHex: '#1A1A1A', stock: 7 },
    ],
    details: {
      materials: 'Full-grain leather, stainless steel buckle, quick-release spring bars.',
      build: 'Hand-stitched, padded profile, available in 20mm and 22mm.',
      sizing: 'Measure lug width of your watch. Standard lengths included.',
      care: 'Rotate straps. Condition to prevent cracking.',
      shipping: 'Ships within 1–2 business days.',
    },
    createdAt: '2026-02-14',
  },
  {
    id: '24',
    slug: 'artisan-leather-gloves',
    name: 'Artisan Leather Gloves',
    description: 'Unlined driving gloves in soft lambskin-touch leather. Touchscreen-compatible fingertips.',
    price: 5200,
    priceUsd: 45,
    category: 'accessories',
    material: 'nubuck',
    images: gallery('accessories'),
    hoverImage: IMG('samples/ecommerce/analog-classic'),
    badge: 'last-one',
    featured: true,
    variants: [
      { size: 'M', color: 'Brown', colorHex: '#8B4513', stock: 1 },
      { size: 'L', color: 'Black', colorHex: '#1A1A1A', stock: 3 },
    ],
    details: {
      materials: 'Nubuck leather, elastic wrist, touchscreen-compatible index and thumb.',
      build: 'Unlined for dexterity, hand-cut pattern, reinforced seams.',
      sizing: 'Measure around knuckles: M (19cm), L (21cm).',
      care: 'Brush with suede/nubuck brush. Avoid water.',
      shipping: 'Ships within 1–2 business days.',
    },
    createdAt: '2026-02-25',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
}

export function filterProducts(
  filters: FilterState,
  sort: SortOption,
  search?: string
): Product[] {
  let result = [...products];

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.includes(q)
    );
  }

  if (filters.categories.length > 0) {
    result = result.filter((p) => filters.categories.includes(p.category));
  }

  result = result.filter(
    (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
  );

  if (filters.materials.length > 0) {
    result = result.filter((p) => filters.materials.includes(p.material));
  }

  if (filters.sizes.length > 0) {
    result = result.filter((p) =>
      p.variants.some((v) => v.size && filters.sizes.includes(v.size))
    );
  }

  if (filters.colors.length > 0) {
    result = result.filter((p) =>
      p.variants.some((v) => filters.colors.includes(v.color))
    );
  }

  switch (sort) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'bestselling':
      result.sort((a, b) => {
        const aScore = a.badge === 'bestseller' ? 1 : 0;
        const bScore = b.badge === 'bestseller' ? 1 : 0;
        return bScore - aScore;
      });
      break;
    case 'newest':
    default:
      result.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }

  return result;
}

export const testimonials = [
  {
    id: '1',
    name: 'Daniel T.',
    location: 'Addis Ababa',
    rating: 5,
    text: 'The Heritage Oxford shoes are absolutely stunning. You can feel the quality the moment you pick them up. Best leather goods I\'ve found in Ethiopia.',
  },
  {
    id: '2',
    name: 'Sara M.',
    location: 'Washington DC',
    rating: 5,
    text: 'Ordered a wallet for my husband from the US. Arrived in perfect condition. The craftsmanship rivals anything from Italy. Proud to support Ethiopian artisans.',
  },
  {
    id: '3',
    name: 'Yonas K.',
    location: 'Bishoftu',
    rating: 5,
    text: 'Visited the workshop and saw the artisans at work. Bought a jacket on the spot. Three years later, it still looks better than the day I bought it.',
  },
];

export const faqs = [
  {
    question: 'Is the leather 100% genuine? How can I tell?',
    answer: 'Every Brana Leather product is made from 100% genuine leather — never bonded, never synthetic. You can identify genuine leather by its natural grain pattern (unique to each piece), the way it develops a rich patina over time, and its distinctive earthy aroma. We provide a certificate of authenticity with every purchase.',
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes! We ship to the United States, Canada, UK, EU, and across Africa. International orders are processed within 2–3 business days. Shipping costs and delivery times vary by destination. Contact us on WhatsApp for a shipping quote to your country.',
  },
  {
    question: 'What are your return/exchange policies?',
    answer: 'We offer a 14-day return policy for unworn items in original condition. Exchanges for different sizes are free within Ethiopia. International returns: customer pays return shipping. Custom/bespoke orders are final sale.',
  },
  {
    question: 'How long does delivery take within Ethiopia?',
    answer: 'Addis Ababa: 1–2 business days. Major cities (Dire Dawa, Hawassa, Bahir Dar, Mekelle): 3–5 business days. Other areas: 5–7 business days. Store pickup in Bishoftu is available same day.',
  },
  {
    question: 'Do you do custom or bespoke orders?',
    answer: 'Absolutely. We love creating custom pieces — from personalized wallets with initials to bespoke jackets tailored to your measurements. Contact us via WhatsApp or the contact form with your vision, and we\'ll provide a quote within 48 hours.',
  },
  {
    question: 'How do I find my size?',
    answer: 'Each product page includes detailed sizing information. For shoes, we use EU sizing (39–45). For jackets, refer to our size chart (S–XL). When in doubt, message us on WhatsApp with your measurements and we\'ll recommend the perfect fit.',
  },
];

export const categoryCounts: Record<Category, number> = {
  shoes: products.filter((p) => p.category === 'shoes').length,
  jackets: products.filter((p) => p.category === 'jackets').length,
  wallets: products.filter((p) => p.category === 'wallets').length,
  bags: products.filter((p) => p.category === 'bags').length,
  belts: products.filter((p) => p.category === 'belts').length,
  accessories: products.filter((p) => p.category === 'accessories').length,
};

export const ALL_SIZES = ['32', '34', '36', '38', '40', '41', '42', '43', '44', 'S', 'M', 'L', 'XL'];
export const ALL_COLORS = ['Black', 'Brown', 'Tan', 'Cognac'];
export const PRICE_RANGE: [number, number] = [0, 50000];
