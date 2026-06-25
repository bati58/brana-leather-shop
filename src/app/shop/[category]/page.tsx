import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import ShopPageClient from './ShopPageClient';
import { CATEGORY_LABELS } from '@/lib/utils';
import { getCategoryDef, LEGACY_CATEGORY_REDIRECTS } from '@/lib/categories';
import { getProductsByCategory, categoryCounts } from '@/lib/products';
import type { Category } from '@/types';

export function generateStaticParams() {
  return Object.keys(CATEGORY_LABELS).map((category) => ({ category }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const legacy = LEGACY_CATEGORY_REDIRECTS[params.category];
  const slug = (legacy ?? params.category) as Category;
  const def = getCategoryDef(slug);
  const label = def?.label ?? params.category;
  return {
    title: `${label} — Shop Handcrafted Leather`,
    description:
      def?.description ??
      `Browse our ${label.toLowerCase()} collection. Premium handcrafted leather from Bishoftu, Ethiopia.`,
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const legacy = LEGACY_CATEGORY_REDIRECTS[params.category];
  if (legacy) {
    redirect(`/shop/${legacy}`);
  }

  const def = getCategoryDef(params.category as Category);
  if (!def) {
    notFound();
  }

  const category = params.category as Category;
  const products = getProductsByCategory(category);
  const count = categoryCounts[category];

  return (
    <ShopPageClient
      initialCategory={category}
      categoryLabel={def.label}
      categoryDescription={def.description}
      productCount={count}
      products={products}
    />
  );
}
