'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ShoppingBag, Search } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';
import CartDrawer from '@/components/cart/CartDrawer';

const navLinks = [
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'Our Story' },
  { href: '/care-guide', label: 'Care Guide' },
  { href: '/faq', label: 'FAQ' },
  { href: '/about#contact', label: 'Contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const { getItemCount, openCart } = useCartStore();
  const itemCount = isMounted ? getItemCount() : 0;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const isHome = pathname === '/';

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-40 transition-all duration-300',
          isScrolled || !isHome
            ? 'bg-brand-dark/95 backdrop-blur-md shadow-lg py-3'
            : 'bg-transparent py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 border-2 border-brand-gold rounded-sm flex items-center justify-center group-hover:bg-brand-gold transition-colors">
                <span className="font-display text-brand-gold group-hover:text-white text-sm font-bold transition-colors">B</span>
              </div>
              <span className="font-display text-xl text-white tracking-wide">
                Brana <span className="text-brand-gold">Leather</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-body tracking-wide transition-colors hover:text-brand-gold',
                    pathname === link.href ? 'text-brand-gold' : 'text-white/80'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-white/80 hover:text-brand-gold transition-colors"
                aria-label="Search products"
              >
                <Search size={20} />
              </button>
              <button
                onClick={openCart}
                className="relative p-2 text-white/80 hover:text-brand-gold transition-colors"
                aria-label={`Shopping cart, ${itemCount} items`}
              >
                <ShoppingBag size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-gold text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {itemCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden p-2 text-white/80 hover:text-brand-gold transition-colors"
                aria-label="Toggle menu"
              >
                {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {searchOpen && (
            <div className="mt-4 animate-fade-in">
              <form action="/shop" method="get" className="relative">
                <input
                  type="search"
                  name="q"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search leather goods..."
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-brand-gold font-body"
                  autoFocus
                />
              </form>
            </div>
          )}
        </div>

        {isMobileOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-white/10 animate-fade-in" aria-label="Mobile navigation">
            <div className="flex flex-col gap-1 pt-4 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-3 rounded-md text-base font-body transition-colors',
                    pathname === link.href
                      ? 'bg-brand-gold/20 text-brand-gold'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <CartDrawer />
    </>
  );
}
