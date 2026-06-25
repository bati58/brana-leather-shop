import type { Product, Category, Material, SortOption, FilterState } from '@/types';

const IMG = (id: string, w = 800) =>
  `https://images.unsplash.com/${id}?w=${w}&q=80&fit=crop`;

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
    images: [
      IMG('photo-1614252237536-bc5935eb1e89'),
      IMG('photo-1533867610401-7625fa8c8de4'),
      IMG('photo-1614252237536-bc5935eb1e89', 400),
      IMG('photo-1549298916-b41d501d3772'),
    ],
    hoverImage: IMG('photo-1549298916-b41d501d3772'),
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
    images: [
      IMG('photo-1551028719-00167b16eac5'),
      IMG('photo-1520975916093-0df45c780c64'),
      IMG('photo-1591047139829-d91aecb6caea'),
      IMG('photo-1521223260152-fd5e720b0142'),
    ],
    hoverImage: IMG('photo-1520975916093-0df45c780c64'),
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
    images: [
      IMG('photo-1627123424574-724758594e93'),
      IMG('photo-1606761568499-6d2451b23c66'),
      IMG('photo-1590874103328-eac38a683ce7'),
      IMG('photo-1627123424574-724758594e93', 400),
    ],
    hoverImage: IMG('photo-1606761568499-6d2451b23c66'),
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
    images: [
      IMG('photo-1547949006-1cc1a64d488d'),
      IMG('photo-1553062407-98eeb64c6a62'),
      IMG('photo-1491637639811-60e2756cc1c7'),
      IMG('photo-1622560480605-d83c85127dd2'),
    ],
    hoverImage: IMG('photo-1553062407-98eeb64c6a62'),
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
    images: [
      IMG('photo-1624222247344-550fb60583fd'),
      IMG('photo-1553062407-98eeb64c6a62', 600),
      IMG('photo-1624222247344-550fb60583fd', 400),
      IMG('photo-1590874103328-eac38a683ce7'),
    ],
    hoverImage: IMG('photo-1624222247344-550fb60583fd', 400),
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
    images: [
      IMG('photo-1638243384920-80b47f0f5c78'),
      IMG('photo-1608256246200-53e635b5b65f'),
      IMG('photo-1549298916-b41d501d3772'),
      IMG('photo-1614252237536-bc5935eb1e89'),
    ],
    hoverImage: IMG('photo-1608256246200-53e635b5b65f'),
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
    images: [
      IMG('photo-1591047139829-d91aecb6caea'),
      IMG('photo-1521223260152-fd5e720b0142'),
      IMG('photo-1551028719-00167b16eac5'),
      IMG('photo-1520975916093-0df45c780c64'),
    ],
    hoverImage: IMG('photo-1521223260152-fd5e720b0142'),
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
    images: [
      IMG('photo-1606761568499-6d2451b23c66'),
      IMG('photo-1627123424574-724758594e93'),
      IMG('photo-1590874103328-eac38a683ce7'),
      IMG('photo-1606761568499-6d2451b23c66', 400),
    ],
    hoverImage: IMG('photo-1590874103328-eac38a683ce7'),
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
    images: [
      IMG('photo-1553062407-98eeb64c6a62'),
      IMG('photo-1547949006-1cc1a64d488d'),
      IMG('photo-1491637639811-60e2756cc1c7'),
      IMG('photo-1622560480605-d83c85127dd2'),
    ],
    hoverImage: IMG('photo-1491637639811-60e2756cc1c7'),
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
    images: [
      IMG('photo-1533867610401-7625fa8c8de4'),
      IMG('photo-1614252237536-bc5935eb1e89'),
      IMG('photo-1549298916-b41d501d3772'),
      IMG('photo-1638243384920-80b47f0f5c78'),
    ],
    hoverImage: IMG('photo-1533867610401-7625fa8c8de4'),
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
    images: [
      IMG('photo-1624222247344-550fb60583fd', 600),
      IMG('photo-1624222247344-550fb60583fd'),
      IMG('photo-1553062407-98eeb64c6a62', 600),
      IMG('photo-1590874103328-eac38a683ce7'),
    ],
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
    images: [
      IMG('photo-1590874103328-eac38a683ce7'),
      IMG('photo-1627123424574-724758594e93'),
      IMG('photo-1606761568499-6d2451b23c66'),
      IMG('photo-1590874103328-eac38a683ce7', 400),
    ],
    hoverImage: IMG('photo-1627123424574-724758594e93'),
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
