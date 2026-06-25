'use client';

import { useState, useMemo } from 'react';
import ProductCard from '@/components/shop/ProductCard';
import FilterPanel, { ActiveFilters } from '@/components/shop/FilterPanel';
import { filterProducts, PRICE_RANGE } from '@/lib/products';
import type { FilterState, SortOption, Category, Product } from '@/types';

interface ShopPageClientProps {
  initialCategory: Category;
  categoryLabel: string;
  productCount: number;
  products: Product[];
}

export default function ShopPageClient({
  initialCategory,
  categoryLabel,
}: ShopPageClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [initialCategory],
    priceRange: PRICE_RANGE,
    materials: [],
    sizes: [],
    colors: [],
  });
  const [sort, setSort] = useState<SortOption>('newest');

  const products = useMemo(
    () => filterProducts(filters, sort),
    [filters, sort]
  );

  return (
    <div className="pt-24 pb-16 bg-brand-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl text-brand-dark mb-2">
            {categoryLabel}
          </h1>
          <p className="text-brand-gray font-body">
            {products.length} handcrafted piece{products.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <FilterPanel filters={filters} onChange={setFilters} productCount={products.length} />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <ActiveFilters filters={filters} onChange={setFilters} />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="ml-auto px-4 py-2 border border-brand-dark/20 rounded-md text-sm font-body bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold"
                aria-label="Sort products"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="bestselling">Bestselling</option>
              </select>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
