'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/shop/ProductCard';
import FilterPanel, { ActiveFilters } from '@/components/shop/FilterPanel';
import { filterProducts, PRICE_RANGE } from '@/lib/products';
import type { FilterState, SortOption } from '@/types';

function ShopContent() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get('q') || '';

  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    subcategories: [],
    priceRange: PRICE_RANGE,
    materials: [],
    sizes: [],
    colors: [],
  });
  const [sort, setSort] = useState<SortOption>('newest');

  const products = useMemo(
    () => filterProducts(filters, sort, searchQuery),
    [filters, sort, searchQuery]
  );

  return (
    <div className="pt-24 pb-16 bg-brand-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl text-brand-dark mb-2">
            {searchQuery ? `Results for "${searchQuery}"` : 'Shop Collection'}
          </h1>
          <p className="text-brand-gray font-body">
            {products.length} handcrafted piece{products.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <FilterPanel
            filters={filters}
            onChange={setFilters}
            productCount={products.length}
          />

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <ActiveFilters filters={filters} onChange={setFilters} />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="ml-auto px-4 py-2 border border-brand-dark/20 rounded-md text-sm font-body text-brand-dark bg-white focus:outline-none focus:ring-2 focus:ring-brand-gold"
                aria-label="Sort products"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="bestselling">Bestselling</option>
              </select>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-20">
                <p className="font-display text-xl text-brand-dark mb-2">No products found</p>
                <p className="text-brand-gray font-body mb-6">
                  Try adjusting your filters or browse our full collection.
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      categories: [],
                      subcategories: [],
                      priceRange: PRICE_RANGE,
                      materials: [],
                      sizes: [],
                      colors: [],
                    })
                  }
                  className="text-brand-gold hover:text-brand-tan font-body"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="pt-24 pb-16 min-h-screen bg-brand-cream" />}>
      <ShopContent />
    </Suspense>
  );
}
