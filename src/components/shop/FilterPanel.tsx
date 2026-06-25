'use client';

import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { cn, formatPrice, CATEGORY_LABELS, MATERIAL_LABELS } from '@/lib/utils';
import { ALL_SIZES, ALL_COLORS, PRICE_RANGE } from '@/lib/products';
import type { FilterState, Category, Material } from '@/types';

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  productCount: number;
}

const CATEGORIES: Category[] = ['shoes', 'jackets', 'wallets', 'bags', 'belts'];
const MATERIALS: Material[] = ['full-grain', 'top-grain', 'suede', 'nubuck'];

export default function FilterPanel({ filters, onChange, productCount }: FilterPanelProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCategory = (cat: Category) => {
    const cats = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    onChange({ ...filters, categories: cats });
  };

  const toggleMaterial = (mat: Material) => {
    const mats = filters.materials.includes(mat)
      ? filters.materials.filter((m) => m !== mat)
      : [...filters.materials, mat];
    onChange({ ...filters, materials: mats });
  };

  const toggleSize = (size: string) => {
    const sizes = filters.sizes.includes(size)
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];
    onChange({ ...filters, sizes });
  };

  const toggleColor = (color: string) => {
    const colors = filters.colors.includes(color)
      ? filters.colors.filter((c) => c !== color)
      : [...filters.colors, color];
    onChange({ ...filters, colors });
  };

  const clearFilters = () => {
    onChange({
      categories: [],
      priceRange: PRICE_RANGE,
      materials: [],
      sizes: [],
      colors: [],
    });
  };

  const activeFilterCount =
    filters.categories.length +
    filters.materials.length +
    filters.sizes.length +
    filters.colors.length +
    (filters.priceRange[0] !== PRICE_RANGE[0] || filters.priceRange[1] !== PRICE_RANGE[1] ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg text-brand-dark">Filters</h3>
        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-brand-gold hover:text-brand-tan transition-colors font-body"
          >
            Clear all
          </button>
        )}
      </div>

      <div>
        <h4 className="font-body text-sm font-medium text-brand-dark mb-3 uppercase tracking-wider">
          Category
        </h4>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat)}
                onChange={() => toggleCategory(cat)}
                className="w-4 h-4 rounded border-brand-dark/30 text-brand-gold focus:ring-brand-gold"
              />
              <span className="text-sm font-body text-brand-gray group-hover:text-brand-dark transition-colors">
                {CATEGORY_LABELS[cat]}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-body text-sm font-medium text-brand-dark mb-3 uppercase tracking-wider">
          Price Range
        </h4>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={PRICE_RANGE[0]}
            max={PRICE_RANGE[1]}
            step={500}
            value={filters.priceRange[1]}
            onChange={(e) =>
              onChange({ ...filters, priceRange: [filters.priceRange[0], Number(e.target.value)] })
            }
            className="w-full accent-brand-gold"
          />
        </div>
        <p className="text-sm text-brand-gray mt-1 font-body">
          Up to {formatPrice(filters.priceRange[1])}
        </p>
      </div>

      <div>
        <h4 className="font-body text-sm font-medium text-brand-dark mb-3 uppercase tracking-wider">
          Material
        </h4>
        <div className="space-y-2">
          {MATERIALS.map((mat) => (
            <label key={mat} className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.materials.includes(mat)}
                onChange={() => toggleMaterial(mat)}
                className="w-4 h-4 rounded border-brand-dark/30 text-brand-gold focus:ring-brand-gold"
              />
              <span className="text-sm font-body text-brand-gray group-hover:text-brand-dark transition-colors">
                {MATERIAL_LABELS[mat]}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-body text-sm font-medium text-brand-dark mb-3 uppercase tracking-wider">
          Size
        </h4>
        <div className="flex flex-wrap gap-2">
          {ALL_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => toggleSize(size)}
              className={cn(
                'px-3 py-1.5 text-xs font-body border rounded transition-colors',
                filters.sizes.includes(size)
                  ? 'border-brand-gold bg-brand-gold text-white'
                  : 'border-brand-dark/20 text-brand-gray hover:border-brand-gold'
              )}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-body text-sm font-medium text-brand-dark mb-3 uppercase tracking-wider">
          Color
        </h4>
        <div className="flex flex-wrap gap-2">
          {ALL_COLORS.map((color) => (
            <button
              key={color}
              onClick={() => toggleColor(color)}
              className={cn(
                'px-3 py-1.5 text-xs font-body border rounded transition-colors',
                filters.colors.includes(color)
                  ? 'border-brand-gold bg-brand-gold text-white'
                  : 'border-brand-dark/20 text-brand-gray hover:border-brand-gold'
              )}
            >
              {color}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden flex items-center gap-2 px-4 py-2 border border-brand-dark/20 rounded-md text-sm font-body text-brand-dark hover:border-brand-gold transition-colors mb-4"
      >
        <SlidersHorizontal size={16} />
        Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
      </button>

      <aside className="hidden lg:block w-64 flex-shrink-0">
        <FilterContent />
      </aside>

      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="fixed bottom-0 left-0 right-0 z-50 bg-brand-cream rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <span className="font-body text-sm text-brand-gray">{productCount} products</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close filters">
                <X size={24} />
              </button>
            </div>
            <FilterContent />
            <button
              onClick={() => setMobileOpen(false)}
              className="w-full mt-6 py-3 bg-brand-gold text-white rounded-md font-body font-medium"
            >
              Show {productCount} Products
            </button>
          </div>
        </>
      )}
    </>
  );
}

export function ActiveFilters({
  filters,
  onChange,
}: {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}) {
  const tags: { label: string; remove: () => void }[] = [];

  filters.categories.forEach((cat) =>
    tags.push({
      label: CATEGORY_LABELS[cat],
      remove: () =>
        onChange({ ...filters, categories: filters.categories.filter((c) => c !== cat) }),
    })
  );
  filters.materials.forEach((mat) =>
    tags.push({
      label: MATERIAL_LABELS[mat],
      remove: () =>
        onChange({ ...filters, materials: filters.materials.filter((m) => m !== mat) }),
    })
  );
  filters.sizes.forEach((size) =>
    tags.push({
      label: `Size ${size}`,
      remove: () => onChange({ ...filters, sizes: filters.sizes.filter((s) => s !== size) }),
    })
  );
  filters.colors.forEach((color) =>
    tags.push({
      label: color,
      remove: () => onChange({ ...filters, colors: filters.colors.filter((c) => c !== color) }),
    })
  );

  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tags.map((tag) => (
        <span
          key={tag.label}
          className="inline-flex items-center gap-1 px-3 py-1 bg-brand-gold/10 text-brand-dark text-sm rounded-full font-body"
        >
          {tag.label}
          <button onClick={tag.remove} className="hover:text-brand-gold" aria-label={`Remove ${tag.label} filter`}>
            <X size={14} />
          </button>
        </span>
      ))}
    </div>
  );
}
