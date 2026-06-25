import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Brana Leather privacy policy — how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-16 bg-brand-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-neutral">
        <h1 className="font-display text-4xl text-brand-dark mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-brand-gray font-body leading-relaxed">
          <p>Last updated: June 2026</p>
          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3">Information We Collect</h2>
            <p>We collect information you provide directly: name, email, phone number, delivery address, and payment details when you place an order or subscribe to our newsletter.</p>
          </section>
          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3">How We Use Your Information</h2>
            <p>We use your information to process orders, send order confirmations, provide customer support, send marketing communications (with your consent), and improve our services.</p>
          </section>
          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3">Cookies & Analytics</h2>
            <p>We use cookies and Google Analytics to understand how visitors use our site. You can control cookies through your browser settings and our cookie consent banner.</p>
          </section>
          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3">Data Security</h2>
            <p>We implement appropriate security measures to protect your personal information. Payment processing is handled by secure third-party providers (Chapa, Stripe).</p>
          </section>
          <section>
            <h2 className="font-display text-xl text-brand-dark mb-3">Contact</h2>
            <p>For privacy-related questions, contact us at hello@branaleather.com or call 0989977058.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
