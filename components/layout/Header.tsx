'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppStore } from '../../lib/store';
import { COMPANY_DETAILS } from '../../lib/sampleData';
import {
  Search,
  ShoppingCart,
  User,
  FileText,
  PhoneCall,
  ShieldCheck,
  ChevronDown,
  Menu,
  X,
  ClipboardList,
  Heart,
  Headphones,
  MapPin,
  Flame,
} from 'lucide-react';

export const Header: React.FC = () => {
  const router = useRouter();
  const { cart, wishlist, user, quotes } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const pendingQuotesCount = quotes.filter(
    (q) => q.status === 'quoted' || q.status === 'pending'
  ).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
      setMobileSearchOpen(false);
    }
  };

  return (
    <header
      className="sticky top-0 z-40 transition-all duration-300 backdrop-blur-md"
      style={{
        backgroundColor: scrolled ? 'rgba(238, 235, 227, 0.96)' : '#eeebe3',
        borderBottom: '1px solid rgba(183, 198, 194, 0.3)',
        boxShadow: scrolled ? '0 10px 30px -10px rgba(23, 30, 25, 0.08)' : 'none',
      }}
    >
      {/* ── Main Brand & Controls Bar ─────────────────────── */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 sm:py-3 flex items-center justify-between gap-3">

        {/* Brand Logo (Left) */}
        <Link href="/" className="flex items-center flex-shrink-0 group py-0.5">
          <img
            src="/images/herologo.png"
            alt="Pandey Ji Iron Works"
            className="h-8 sm:h-10 md:h-11 w-auto max-w-[150px] sm:max-w-[200px] object-contain transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </Link>

        {/* All Controls Placed to the Right */}
        <div className="flex items-center gap-1.5 sm:gap-3 ml-auto">

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center relative w-60 xl:w-72">
            <div
              className="w-full flex items-center rounded-2xl overflow-hidden pl-3.5 pr-1.5 py-1.5 transition-all duration-200"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid rgba(183, 198, 194, 0.4)',
                boxShadow: '0 4px 12px -2px rgba(23, 30, 25, 0.04)',
              }}
            >
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search boilers, 5 TPH..."
                className="w-full bg-transparent text-xs font-semibold outline-none placeholder:text-[#b7c6c2]"
                style={{ color: '#171e19' }}
              />
              <button
                type="submit"
                aria-label="Search"
                className="ml-1 p-1.5 rounded-xl text-white transition-all duration-200 hover:bg-[#a80010] flex items-center justify-center flex-shrink-0 cursor-pointer"
                style={{ backgroundColor: '#ca0013' }}
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Mobile Search Toggle Button */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="lg:hidden p-2 sm:p-2.5 rounded-2xl transition-all duration-200"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid rgba(183, 198, 194, 0.3)',
              color: '#171e19',
            }}
            title="Search"
            aria-label="Toggle search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="relative p-2 sm:p-2.5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
            title="Wishlist"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid rgba(183, 198, 194, 0.3)',
              boxShadow: '0 4px 12px -2px rgba(23, 30, 25, 0.04)',
              color: '#171e19',
            }}
          >
            <Heart className="w-4 h-4" />
            {mounted && wishlist.length > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-sm"
                style={{ backgroundColor: '#ca0013' }}
              >
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Query only - Cart & Account removed */}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 sm:p-2.5 rounded-2xl transition-all duration-200"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid rgba(183, 198, 194, 0.3)',
              color: '#171e19',
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile Search Bar Expandable Drawer ─────────── */}
      {mobileSearchOpen && (
        <div className="lg:hidden px-3 py-2 border-t border-[#b7c6c2]/20 bg-white animate-fade-in">
          <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
            <div
              className="flex-1 flex items-center rounded-2xl overflow-hidden px-3 py-2"
              style={{
                backgroundColor: '#eeebe3',
                border: '1px solid rgba(183, 198, 194, 0.4)',
              }}
            >
              <Search className="w-4 h-4 mr-2 flex-shrink-0 text-[#b7c6c2]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search boilers, 5 TPH..."
                className="w-full bg-transparent text-xs font-semibold outline-none"
                style={{ color: '#171e19' }}
                autoFocus
              />
            </div>
            <button
              type="submit"
              aria-label="Search"
              className="p-2.5 rounded-2xl text-white flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: '#ca0013' }}
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* ── Desktop Nav Bar ─────────────────────────────── */}
      <nav
        className="hidden md:block border-t"
        style={{
          backgroundColor: '#eeebe3',
          borderColor: 'rgba(183, 198, 194, 0.25)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-1 text-xs font-extrabold tracking-wide py-1.5">
          {[
            { href: '/', label: 'HOME' },
            { href: '/products', label: 'PRODUCT CATALOGUE' },
            { href: '/about', label: 'ABOUT US' },
          ].map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-3.5 py-1.5 rounded-xl transition-all duration-200 font-extrabold text-[11px] tracking-wider hover:text-[#ca0013] hover:bg-white/60 whitespace-nowrap"
              style={{ color: '#171e19' }}
            >
              {label}
            </Link>
          ))}

          <Link
            href="/contact"
            className="ml-auto px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider text-white transition-all duration-200 hover:bg-[#a80010] whitespace-nowrap"
            style={{
              backgroundColor: '#ca0013',
              boxShadow: '0 4px 12px -2px rgba(202, 0, 19, 0.3)',
            }}
          >
            Contact Us
          </Link>
        </div>
      </nav>

      {/* ── Mobile Drawer Navigation ───────────────────── */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-t px-4 py-5 space-y-2 animate-fade-in shadow-xl"
          style={{
            backgroundColor: '#ffffff',
            borderColor: 'rgba(183, 198, 194, 0.3)',
          }}
        >
          <form onSubmit={handleSearchSubmit} className="mb-3">
            <div
              className="flex items-center rounded-2xl overflow-hidden px-3 py-2.5"
              style={{
                backgroundColor: '#eeebe3',
                border: '1px solid rgba(183, 198, 194, 0.4)',
              }}
            >
              <Search className="w-4 h-4 mr-2" style={{ color: '#b7c6c2' }} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search boilers..."
                className="w-full bg-transparent text-sm outline-none font-semibold"
                style={{ color: '#171e19' }}
              />
            </div>
          </form>

          <div className="grid grid-cols-3 gap-1.5 pb-2">
            {[
              { href: '/', label: 'HOME' },
              { href: '/products', label: 'CATALOGUE' },
              { href: '/about', label: 'ABOUT US' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-2 rounded-2xl font-black text-xs text-center transition-colors hover:bg-[#eeebe3] text-[#171e19]"
              >
                <span>{label}</span>
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-[#b7c6c2]/20 space-y-2">
            <div className="flex flex-col gap-1.5 py-2.5 px-3 rounded-2xl bg-[#eeebe3] text-[#171e19] text-xs font-black">
              <span className="text-[10px] uppercase font-bold text-slate-500">Call Us:</span>
              <div className="flex items-center justify-around gap-2">
                <a href={`tel:${COMPANY_DETAILS.phone}`} className="flex items-center gap-1 text-[#ca0013]">
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>{COMPANY_DETAILS.phone}</span>
                </a>
                <span className="text-slate-300">|</span>
                <a href={`tel:${COMPANY_DETAILS.phone2}`} className="flex items-center gap-1 text-[#ca0013]">
                  <span>{COMPANY_DETAILS.phone2}</span>
                </a>
              </div>
            </div>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 text-center rounded-2xl font-black text-xs text-white"
              style={{ backgroundColor: '#ca0013' }}
            >
              CONTACT US / INQUIRY
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
