import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Clock } from 'lucide-react';
import AboutContactForm from './AboutContactForm';
import { siteConfig } from '@/lib/site-config';
import { getFeaturedProducts } from '@/lib/products';
import type { Product } from '@/types';

export const metadata: Metadata = {
  title: 'Our Story — About Brana Leather',
  description:
    'Discover the story behind Brana Leather — preserving Ethiopian leather craftsmanship in Bishoftu, Seven Lake City.',
};

const behindScenesProducts: Product[] = [
  getFeaturedProducts().find((p) => p.category === 'footwear'),
  getFeaturedProducts().find((p) => p.category === 'bags'),
  getFeaturedProducts().find((p) => p.category === 'clothing-accessories'),
].filter((p): p is Product => p !== undefined);

const values = [
  {
    title: 'Authenticity',
    description: 'Only genuine leather, no compromises. Every piece comes with a certificate of authenticity.',
    icon: '✦',
  },
  {
    title: 'Craftsmanship',
    description: 'Every piece is individually inspected by master artisans with decades of experience.',
    icon: '◈',
  },
  {
    title: 'Community',
    description: 'Supporting local artisans and sustainable sourcing from Ethiopian tanneries.',
    icon: '◇',
  },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16 bg-brand-cream min-h-screen">
      {/* Brand Narrative */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-brand-gold font-body text-sm tracking-[0.2em] uppercase mb-4">
              Our Story
            </p>
            <h1 className="font-display text-4xl sm:text-5xl text-brand-dark mb-6 leading-tight">
              The Meaning of <span className="text-brand-gold">Brana</span>
            </h1>
            <div className="space-y-4 text-brand-gray font-body leading-relaxed">
              <p>
                &ldquo;Brana&rdquo; draws from the Amharic word for leather — a material that has been
                central to Ethiopian culture for centuries. Our name is a promise: every product
                that leaves our workshop is pure, genuine, and built to honor that heritage.
              </p>
              <p>
                Founded in Bishoftu (Seven Lake City), Brana Leather was born from a simple mission:
                preserve the ancient art of Ethiopian leather craft while bringing it into the
                modern world. We combine traditional hand-stitching techniques passed down through
                generations with contemporary design sensibility.
              </p>
              <p>
                Every stitch tells a story. Every piece carries the soul of the artisan who made it.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] rounded-lg overflow-hidden">
            <Image
              src="/products/leather-journal-cover.jpg"
              alt="Handcrafted leather journal cover by Brana Leather"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-dark py-20 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl text-white text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="text-center p-8 border border-white/10 rounded-lg hover:border-brand-gold/50 transition-colors"
              >
                <span className="text-3xl text-brand-gold mb-4 block">{value.icon}</span>
                <h3 className="font-display text-xl text-white mb-3">{value.title}</h3>
                <p className="text-white/60 font-body text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workshop Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="font-display text-3xl text-brand-dark text-center mb-10">
          Behind the Scenes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {behindScenesProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden"
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <p className="absolute bottom-3 left-3 right-3 font-display text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {product.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-display text-3xl text-brand-dark mb-6">Visit Us</h2>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-brand-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-body text-brand-dark font-medium">Address</p>
                  <p className="text-brand-gray font-body text-sm">{siteConfig.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={20} className="text-brand-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-body text-brand-dark font-medium">Phone</p>
                  <a
                    href={`tel:+${siteConfig.social.whatsapp.replace(/\D/g, '')}`}
                    className="text-brand-gray font-body text-sm hover:text-brand-gold"
                  >
                    {siteConfig.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={20} className="text-brand-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-body text-brand-dark font-medium">Store Hours</p>
                  <p className="text-brand-gray font-body text-sm">
                    {siteConfig.storeHours.weekdays}
                    <br />
                    {siteConfig.storeHours.sunday}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden bg-brand-dark/5">
              <iframe
                src="https://maps.google.com/maps?q=Bishoftu,Ethiopia&output=embed"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                title="Brana Leather location in Bishoftu, Ethiopia"
              />
            </div>
          </div>
          <AboutContactForm />
        </div>
      </section>
    </div>
  );
}
