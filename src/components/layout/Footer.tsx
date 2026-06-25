import Link from 'next/link';
import { Instagram, Facebook, Send } from 'lucide-react';

const quickLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/care-guide', label: 'Care Guide' },
  { href: '/about#contact', label: 'Contact' },
  { href: '/faq', label: 'FAQ' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
];

const socialLinks = [
  { href: 'https://instagram.com/branalethr', label: 'Instagram', icon: Instagram },
  { href: 'https://facebook.com/branaleather', label: 'Facebook', icon: Facebook },
  { href: 'https://t.me/branaleather', label: 'Telegram', icon: Send },
];

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 border-2 border-brand-gold rounded-sm flex items-center justify-center">
                <span className="font-display text-brand-gold text-sm font-bold">B</span>
              </div>
              <span className="font-display text-xl tracking-wide">
                Brana <span className="text-brand-gold">Leather</span>
              </span>
            </Link>
            <p className="text-white/60 font-body text-sm leading-relaxed">
              Raw authenticity, refined design. Handcrafted premium leather goods from Bishoftu, Ethiopia.
            </p>
          </div>

          <div>
            <h3 className="font-display text-lg text-brand-gold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-brand-gold transition-colors text-sm font-body"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg text-brand-gold mb-4">Contact</h3>
            <address className="not-italic space-y-2 text-sm font-body text-white/60">
              <p>Bishoftu (Seven Lake City)</p>
              <p>Ethiopia</p>
              <p>
                <a href="tel:+251989977058" className="hover:text-brand-gold transition-colors">
                  0989977058
                </a>
              </p>
              <p>
                <a href="mailto:hello@branaleather.com" className="hover:text-brand-gold transition-colors">
                  hello@branaleather.com
                </a>
              </p>
            </address>
          </div>

          <div>
            <h3 className="font-display text-lg text-brand-gold mb-4">Follow Us</h3>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold transition-colors text-white/60"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {['Chapa', 'Telebirr', 'Visa', 'Mastercard'].map((method) => (
                <span
                  key={method}
                  className="px-3 py-1 text-xs border border-white/20 rounded text-white/50 font-body"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm font-body">
            &copy; {new Date().getFullYear()} Brana Leather. All rights reserved.
          </p>
          <p className="text-white/40 text-sm font-body">
            Handcrafted with pride in Ethiopia 🇪🇹
          </p>
        </div>
      </div>
    </footer>
  );
}
