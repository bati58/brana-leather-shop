import type { Metadata } from 'next';
import Accordion from '@/components/ui/Accordion';
import { faqs } from '@/lib/products';
import { whatsappUrl } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Common questions about Brana Leather products, shipping, returns, sizing, and custom orders. Premium leather goods from Ethiopia.',
};

export default function FAQPage() {
  const accordionItems = faqs.map((faq) => ({
    title: faq.question,
    content: faq.answer,
  }));

  return (
    <div className="pt-24 pb-16 bg-brand-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="font-display text-4xl text-brand-dark mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-brand-gray font-body">
            Everything you need to know about Brana Leather products and services.
          </p>
        </header>

        <Accordion items={accordionItems} />

        <div className="mt-12 text-center">
          <p className="text-brand-gray font-body mb-2">Still have questions?</p>
          <a
            href={whatsappUrl('Hi Brana Leather! I have a question about your products.')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-gold hover:text-brand-tan font-body font-medium transition-colors"
          >
            Chat with us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
