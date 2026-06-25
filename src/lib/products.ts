import type { Product, Category, Material, SortOption, FilterState } from '@/types';
import { ALL_CATEGORIES, SUBCATEGORY_LABELS } from '@/lib/categories';
import { catalogProducts } from '@/lib/catalog-products';

export const products: Product[] = catalogProducts;

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
  const sameSub = products.filter(
    (p) => p.subcategory === product.subcategory && p.id !== product.id
  );
  const sameCat = products.filter(
    (p) => p.category === product.category && p.id !== product.id && p.subcategory !== product.subcategory
  );
  return [...sameSub, ...sameCat].slice(0, limit);
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
        p.category.includes(q) ||
        SUBCATEGORY_LABELS[p.subcategory].toLowerCase().includes(q)
    );
  }

  if (filters.categories.length > 0) {
    result = result.filter((p) => filters.categories.includes(p.category));
  }

  if (filters.subcategories.length > 0) {
    result = result.filter((p) => filters.subcategories.includes(p.subcategory));
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
    text: "The Heritage Oxford shoes are absolutely stunning. You can feel the quality the moment you pick them up. Best leather goods I've found in Ethiopia.",
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
    answer:
      'Every Brana Leather product is made from 100% genuine leather — never bonded, never synthetic. You can identify genuine leather by its natural grain pattern (unique to each piece), the way it develops a rich patina over time, and its distinctive earthy aroma. We provide a certificate of authenticity with every purchase.',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Yes! We ship to the United States, Canada, UK, EU, and across Africa. International orders are processed within 2–3 business days. Shipping costs and delivery times vary by destination. Contact us on WhatsApp for a shipping quote to your country.',
  },
  {
    question: 'What are your return/exchange policies?',
    answer:
      'We offer a 14-day return policy for unworn items in original condition. Exchanges for different sizes are free within Ethiopia. International returns: customer pays return shipping. Custom/bespoke orders are final sale.',
  },
  {
    question: 'How long does delivery take within Ethiopia?',
    answer:
      'Addis Ababa: 1–2 business days. Major cities (Dire Dawa, Hawassa, Bahir Dar, Mekelle): 3–5 business days. Other areas: 5–7 business days. Store pickup in Bishoftu is available same day.',
  },
  {
    question: 'Do you do custom or bespoke orders?',
    answer:
      "Absolutely. We love creating custom pieces — from personalized wallets with initials to bespoke jackets tailored to your measurements. Contact us via WhatsApp or the contact form with your vision, and we'll provide a quote within 48 hours.",
  },
  {
    question: 'How do I find my size?',
    answer:
      "Each product page includes detailed sizing information. For shoes, we use EU sizing (39–45). For jackets, refer to our size chart (S–XL). When in doubt, message us on WhatsApp with your measurements and we'll recommend the perfect fit.",
  },
];

export const categoryCounts: Record<Category, number> = Object.fromEntries(
  ALL_CATEGORIES.map((cat) => [cat, products.filter((p) => p.category === cat).length])
) as Record<Category, number>;

export const ALL_SIZES = ['32', '34', '36', '38', '40', '41', '42', '43', '44', 'S', 'M', 'L', 'XL'];
export const ALL_COLORS = ['Black', 'Brown', 'Tan', 'Cognac'];
export const PRICE_RANGE: [number, number] = [0, 50000];
