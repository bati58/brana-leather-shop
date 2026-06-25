export type Category = 'shoes' | 'jackets' | 'wallets' | 'bags' | 'belts' | 'accessories';

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
  priceRange: [number, number];
  materials: Material[];
  sizes: string[];
  colors: string[];
}

export type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'bestselling';
