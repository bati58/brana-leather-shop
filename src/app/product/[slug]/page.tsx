import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Gallery from '@/components/product/Gallery';
import AddToCart from '@/components/product/AddToCart';
import Accordion from '@/components/ui/Accordion';
import ProductCard from '@/components/shop/ProductCard';
import { getProductBySlug, getRelatedProducts, products } from '@/lib/products';
import { formatPrice } from '@/lib/utils';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product, 3);

  const accordionItems = [
    { title: 'The Materials', content: product.details.materials },
    { title: 'The Build', content: product.details.build },
    { title: 'Fit & Sizing', content: product.details.sizing },
    { title: 'Care Instructions', content: product.details.care },
    { title: 'Shipping & Returns', content: product.details.shipping },
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    brand: { '@type': 'Brand', name: 'Brana Leather' },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'ETB',
      availability: product.variants.some((v) => v.stock > 0)
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: { '@type': 'Organization', name: 'Brana Leather' },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pt-24 pb-16 bg-brand-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
            <Gallery images={product.images} productName={product.name} />
            <div>
              <AddToCart product={product} />
              <p className="mt-6 text-brand-gray font-body leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

          <div className="mb-16">
            <Accordion items={accordionItems} />
          </div>

          {related.length > 0 && (
            <section>
              <h2 className="font-display text-2xl text-brand-dark mb-6">
                Complete the Look
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
}
