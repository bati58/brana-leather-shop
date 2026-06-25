import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Leather Care Guide — How to Care for Leather Goods',
  description:
    'Learn how to clean, condition, and protect your leather shoes, jackets, wallets, and bags. Expert leather care tips from Brana Leather, Ethiopia.',
  keywords: [
    'how to care for leather shoes Ethiopia',
    'leather conditioning guide',
    'leather care tips',
    'clean leather wallet',
    'protect leather jacket',
  ],
};

const sections = [
  {
    title: 'How to Clean Your Leather Goods',
    content: [
      'Dust and dirt are leather\'s worst enemies. Regular light cleaning prevents buildup that can damage the grain over time.',
      'For everyday cleaning: Wipe with a soft, dry or slightly damp cloth. Always wipe in the direction of the grain.',
      'For deeper cleaning: Use a pH-neutral leather cleaner. Apply a small amount to a soft cloth, work in gentle circular motions, then wipe clean with a dry cloth.',
      'Never use soap, detergent, or household cleaners — these strip natural oils and can permanently damage leather.',
      'For suede and nubuck: Use a dedicated suede brush. Brush in one direction to lift dirt. For stains, use a suede eraser — never water.',
    ],
  },
  {
    title: 'How to Condition and Protect Leather',
    content: [
      'Leather is skin — it needs moisture to stay supple. Conditioning replaces natural oils lost through wear and environmental exposure.',
      'Apply a quality leather conditioner every 1–3 months, depending on use and climate. In dry climates like Ethiopia\'s highlands, condition more frequently.',
      'Test conditioner on a hidden area first. Apply a thin, even coat with a soft cloth. Let absorb for 15 minutes, then buff with a clean cloth.',
      'For protection: Apply a water-repellent spray designed for leather (not silicone-based). Reapply after conditioning.',
      'Shoes benefit from cedar shoe trees — they maintain shape and absorb moisture overnight.',
    ],
  },
  {
    title: 'What to Avoid',
    content: [
      'Water: Excessive water exposure causes staining, warping, and mold. If leather gets wet, pat dry immediately (never rub) and let air dry at room temperature — never use heat.',
      'Heat: Keep leather away from radiators, direct sunlight, and hair dryers. Heat dries out leather and causes cracking.',
      'Chemicals: Avoid alcohol, bleach, acetone, and harsh cleaning products. These dissolve leather\'s natural finish.',
      'Overstuffing: Wallets and bags stretched beyond capacity lose their shape permanently. Use items as intended.',
      'Plastic storage: Never store leather in plastic bags — leather needs to breathe. Use cotton dust bags or pillowcases.',
    ],
  },
  {
    title: 'Seasonal Storage Tips',
    content: [
      'Summer: Store in a cool, dry place away from direct sunlight. Use breathable dust bags. Insert shoe trees in footwear.',
      'Rainy season: Apply extra water-repellent before the rains. Keep silica gel packets in storage areas to control humidity.',
      'Long-term storage: Clean and condition thoroughly before storing. Stuff bags with acid-free tissue paper to maintain shape. Check every few months and recondition if needed.',
      'Travel: Use dedicated leather travel cases. Keep leather items in carry-on luggage when flying to avoid extreme temperature changes in cargo holds.',
    ],
  },
];

export default function CareGuidePage() {
  return (
    <div className="pt-24 pb-16 bg-brand-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
          <p className="text-brand-gold font-body text-sm tracking-[0.2em] uppercase mb-3">
            Expert Guide
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-brand-dark mb-4">
            Leather Care Guide
          </h1>
          <p className="text-brand-gray font-body text-lg leading-relaxed">
            Your Brana Leather piece is built to last a lifetime — with the right care,
            it will only get more beautiful with age. Here&apos;s everything you need to know.
          </p>
        </header>

        <div className="space-y-12">
          {sections.map((section, i) => (
            <article key={section.title} className="bg-white rounded-lg border border-brand-dark/5 p-8">
              <h2 className="font-display text-2xl text-brand-dark mb-4">
                {i + 1}. {section.title}
              </h2>
              <ul className="space-y-3">
                {section.content.map((paragraph, j) => (
                  <li key={j} className="text-brand-gray font-body leading-relaxed flex gap-3">
                    <span className="text-brand-gold mt-1.5 flex-shrink-0">•</span>
                    <span>{paragraph}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-12 p-8 bg-brand-gold-wash rounded-lg text-center">
          <h3 className="font-display text-xl text-brand-dark mb-2">
            Need a leather care kit?
          </h3>
          <p className="text-brand-gray font-body text-sm mb-4">
            We offer premium conditioner and cleaner bundles designed for our leather types.
          </p>
          <Link
            href="/shop"
            className="inline-block text-brand-gold hover:text-brand-tan font-body font-medium transition-colors"
          >
            Shop Accessories →
          </Link>
        </div>
      </div>
    </div>
  );
}
