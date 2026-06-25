import { CategoryCard } from '@/components/shop/ProductCard';
import { categoryCounts } from '@/lib/products';

const categories = [
  {
    title: 'Shoes',
    slug: 'shoes',
    image: 'https://images.unsplash.com/photo-1614252237536-bc5935eb1e89?w=800&q=80&fit=crop',
  },
  {
    title: 'Jackets',
    slug: 'jackets',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80&fit=crop',
  },
  {
    title: 'Wallets & Bags',
    slug: 'wallets',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80&fit=crop',
  },
];

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.slug}
              title={cat.title}
              count={categoryCounts[cat.slug as keyof typeof categoryCounts] || 0}
              image={cat.image}
              href={`/shop/${cat.slug}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
