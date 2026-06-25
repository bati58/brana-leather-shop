import { Leaf, Hand, Clock, ShieldCheck } from 'lucide-react';

const promises = [
  {
    icon: Leaf,
    title: 'Natural Grain',
    description: 'No synthetics. Ever.',
  },
  {
    icon: Hand,
    title: 'Handcrafted',
    description: 'Stitched by Ethiopian artisans',
  },
  {
    icon: Clock,
    title: 'Built to Age',
    description: 'Gets better with every year',
  },
  {
    icon: ShieldCheck,
    title: 'Certified Authentic',
    description: 'Verified genuine leather',
  },
];

export default function Promise() {
  return (
    <section className="py-20 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl text-white mb-3">
            The Brana Promise
          </h2>
          <p className="text-brand-gold font-body text-lg">100% Pure Leather</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {promises.map((item) => (
            <div
              key={item.title}
              className="text-center group p-6 rounded-lg border border-white/10 hover:border-brand-gold/50 transition-all duration-300 hover:bg-white/5"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-brand-gold/10 flex items-center justify-center group-hover:bg-brand-gold/20 transition-colors">
                <item.icon size={28} className="text-brand-gold" />
              </div>
              <h3 className="font-display text-xl text-white mb-2">{item.title}</h3>
              <p className="text-white/60 font-body text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
