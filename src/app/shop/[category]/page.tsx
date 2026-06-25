import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ShopPageClient from './ShopPageClient';
import { CATEGORY_LABELS } from '@/lib/utils';
import { getProductsByCategory, categoryCounts } from '@/lib/products';
import type { Category } from '@/types';

const validCategories: Category[] = ['shoes', 'jackets', 'wallets', 'bags', 'belts', 'accessories'];

export function generateStaticParams() {
  return validCategories.map((category) => ({ category }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const label = CATEGORY_LABELS[params.category] || params.category;
  return {
    title: `${label} — Shop Handcrafted Leather`,
    description: `Browse our ${label.toLowerCase()} collection. Premium handcrafted leather ${params.category} from Bishoftu, Ethiopia.`,
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  if (!validCategories.includes(params.category as Category)) {
    notFound();
  }

  const category = params.category as Category;
  const products = getProductsByCategory(category);
  const count = categoryCounts[category];

  return (
    <ShopPageClient
      initialCategory={category}
      categoryLabel={CATEGORY_LABELS[category]}
      productCount={count}
      products={products}
    />
  );
}
