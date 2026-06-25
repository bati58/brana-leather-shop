import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/layout/CookieConsent';
import { ToastProvider } from '@/components/ui/ToastProvider';
import Analytics from '@/components/layout/Analytics';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Brana Leather | Premium Handcrafted Leather Goods — Ethiopia',
    template: '%s | Brana Leather',
  },
  description:
    'Premium handcrafted leather goods from Bishoftu, Ethiopia. Shoes, jackets, wallets, bags & belts — 100% genuine leather, built to last a lifetime.',
  keywords: [
    'leather goods Ethiopia',
    'handcrafted leather',
    'leather shoes Bishoftu',
    'premium leather wallet',
    'Ethiopian leather',
    'Brana Leather',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Brana Leather',
    title: 'Brana Leather | Raw Authenticity, Refined Design',
    description:
      'Handcrafted premium leather goods from Bishoftu, Ethiopia. 100% genuine leather.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Analytics />
        <ToastProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <CookieConsent />
        </ToastProvider>
      </body>
    </html>
  );
}
