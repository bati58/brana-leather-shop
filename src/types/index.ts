export type Category =
  | 'bags'
  | 'footwear'
  | 'belts'
  | 'small-leather-goods'
  | 'clothing-accessories'
  | 'home-office'
  | 'gifts';

export type Subcategory =
  | 'shoulder-bags'
  | 'handbags-purses'
  | 'tote-bags'
  | 'crossbody-bags'
  | 'backpacks'
  | 'laptop-briefcases'
  | 'travel-duffel-bags'
  | 'clutch-bags'
  | 'mens-dress-shoes'
  | 'womens-heels-flats'
  | 'sandals'
  | 'loafers'
  | 'boots'
  | 'moccasins'
  | 'mens-formal-belts'
  | 'mens-casual-belts'
  | 'womens-belts'
  | 'wide-fashion-belts'
  | 'bifold-trifold-wallets'
  | 'card-holders'
  | 'coin-purses'
  | 'passport-holders'
  | 'keychains'
  | 'leather-jackets'
  | 'leather-vests'
  | 'caps-hats'
  | 'gloves'
  | 'watch-straps'
  | 'notebook-covers'
  | 'desk-accessories'
  | 'coasters'
  | 'photo-frames'
  | 'cushion-covers'
  | 'engraved-wallets'
  | 'gift-sets'
  | 'personalized-bags';

export type Material = 'full-grain' | 'top-grain' | 'suede' | 'nubuck';

export interface ProductVariant {
  size?: string;
  color: string;
  colorHex: string;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  priceUsd?: number;
  category: Category;
  subcategory: Subcategory;
  material: Material;
  images: string[];
  hoverImage?: string;
  badge?: 'new' | 'bestseller' | 'last-one';
  variants: ProductVariant[];
  details: {
    materials: string;
    build: string;
    sizing: string;
    care: string;
    shipping: string;
  };
  featured?: boolean;
  createdAt: string;
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  size?: string;
  color: string;
  quantity: number;
  maxStock: number;
}

export interface Customer {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

export type DeliveryMethod = 'pickup' | 'delivery';

export type PaymentMethod = 'chapa' | 'telebirr' | 'cbe' | 'cod' | 'stripe';

export interface Order {
  id: string;
  items: CartItem[];
  customer: Customer;
  deliveryMethod: DeliveryMethod;
  paymentMethod: PaymentMethod;
  subtotal: number;
  shipping: number;
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface FilterState {
  categories: Category[];
  subcategories: Subcategory[];
  priceRange: [number, number];
  materials: Material[];
  sizes: string[];
  colors: string[];
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'bestselling';
