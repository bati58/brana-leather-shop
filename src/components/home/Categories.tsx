import { CategoryCard } from '@/components/shop/ProductCard';
import { categoryCounts } from '@/lib/products';
import { categoryImage } from '@/lib/marketing-images';
import { CATALOG } from '@/lib/categories';

export default function Categories() {
  return (
    <section id="categories" className="py-20 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl sm:text-4xl text-brand-dark mb-3">
            Explore Our Collections
          </h2>
          <p className="text-brand-gray font-body max-w-xl mx-auto">
            Each piece tells a story of Ethiopian craftsmanship passed down through generations.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CATALOG.map((cat) => (
            <CategoryCard
              key={cat.slug}
              title={`${cat.emoji} ${cat.label}`}
              count={categoryCounts[cat.slug]}
              image={categoryImage(cat.slug)}
              href={`/shop/${cat.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
