import Link from 'next/link';
import { Instagram, Facebook, Send, MessageCircle, Clock } from 'lucide-react';
import {
  siteConfig,
  instagramUrl,
  telegramUrl,
  whatsappUrl,
  getActivePaymentBadges,
} from '@/lib/site-config';

const quickLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/care-guide', label: 'Care Guide' },
  { href: '/about#contact', label: 'Contact' },
  { href: '/faq', label: 'FAQ' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' },
];

function getSocialLinks() {
  const links: { href: string; label: string; icon: typeof Instagram }[] = [
    { href: instagramUrl(), label: 'Instagram', icon: Instagram },
    { href: telegramUrl(), label: 'Telegram', icon: Send },
    { href: whatsappUrl(), label: 'WhatsApp', icon: MessageCircle },
  ];
  if (siteConfig.social.facebook) {
    links.push({ href: siteConfig.social.facebook, label: 'Facebook', icon: Facebook });
  }
  return links;
}

export default function Footer() {
  const socialLinks = getSocialLinks();
  const phoneTel = `+${siteConfig.social.whatsapp.replace(/\D/g, '')}`;

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
              <p>{siteConfig.address}</p>
              <p>
                <a href={`tel:${phoneTel}`} className="hover:text-brand-gold transition-colors">
                  {siteConfig.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-brand-gold transition-colors">
                  {siteConfig.email}
                </a>
              </p>
              <p className="flex items-start gap-2 pt-1">
                <Clock size={14} className="text-brand-gold mt-0.5 flex-shrink-0" />
                <span>
                  {siteConfig.storeHours.weekdays}
                  <br />
                  {siteConfig.storeHours.sunday}
                </span>
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
              {getActivePaymentBadges().map((method) => (
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
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-white/40 text-sm font-body">
            Handcrafted with pride in Ethiopia 🇪🇹
          </p>
        </div>
      </div>
    </footer>
  );
}
