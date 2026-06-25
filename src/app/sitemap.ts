import type { MetadataRoute } from 'next';
import { products } from '@/lib/products';

export default function sitemap(): MetadataRoute.Sitemap {
  const productUrls: MetadataRoute.Sitemap = products.map((product) => ({
    url: `https://branaleather.com/product/${product.slug}`,
    lastModified: product.createdAt,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: 'https://branaleather.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://branaleather.com/shop',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://branaleather.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: 'https://branaleather.com/care-guide',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://branaleather.com/faq',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...productUrls,
  ];
}
