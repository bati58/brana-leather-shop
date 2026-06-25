import type { Metadata } from 'next';
import { siteConfig } from '@/lib/site-config';
import { formatPrice } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Brana Leather terms and conditions, return policy, and purchase agreement.',
};

export default function TermsPage() {
  return (
    <div className="pt-24 pb-16 bg-brand-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl text-brand-dark mb-8">Terms & Conditions</h1>
        <div className="space-y-6 text-brand-gray font-body leading-relaxed">
          <p>Last updated: June 2026</p>
          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3">Orders & Payment</h2>
            <p>All prices are listed in Ethiopian Birr (ETB). International prices in USD are approximate where shown. Payment is accepted via Telebirr, CBE Birr, and cash on delivery. Additional methods may be enabled in future.</p>
          </section>
          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3">Return Policy</h2>
            <p>We offer a 14-day return policy for unworn items in original condition with tags attached. Exchanges for different sizes are free within Ethiopia. Custom and bespoke orders are final sale. Contact us within 14 days of delivery to initiate a return.</p>
          </section>
          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3">Shipping</h2>
            <p>
              Domestic delivery: {siteConfig.shipping.domesticEta}. Store pickup in Bishoftu: {siteConfig.shipping.pickupEta}.
              Free shipping on orders over {formatPrice(siteConfig.shipping.freeThreshold)} within Ethiopia.
              Standard delivery fee: {formatPrice(siteConfig.shipping.standardFee)}.
            </p>
          </section>
          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3">Product Authenticity</h2>
            <p>All Brana Leather products are guaranteed 100% genuine leather. Each purchase includes a certificate of authenticity. We stand behind the quality of every piece we sell.</p>
          </section>
          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3">Contact</h2>
            <p>{siteConfig.name}, {siteConfig.address}. Phone: {siteConfig.phone}. Email: {siteConfig.email}</p>
          </section>
        </div>
      </div>
    </div>
  );
}
