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
              className="w-full flex items-center rounded-2xl overflow-hidden px-3 py-1.5 transition-all duration-200"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid rgba(183, 198, 194, 0.4)',
                boxShadow: '0 4px 12px -2px rgba(23, 30, 25, 0.04)',
              }}
            >
              <Search className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: '#b7c6c2' }} />
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
                className="ml-1 px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider text-white transition-all duration-200 hover:bg-[#a80010]"
                style={{ backgroundColor: '#ca0013' }}
              >
                Go
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
            href="/account/wishlist"
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

          {/* Cart */}
          <Link
            href="/cart"
            className="relative p-2 sm:p-2.5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
            title="Shopping Cart"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid rgba(183, 198, 194, 0.3)',
              boxShadow: '0 4px 12px -2px rgba(23, 30, 25, 0.04)',
              color: '#171e19',
            }}
          >
            <ShoppingCart className="w-4 h-4" />
            {mounted && cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 min-w-[18px] h-[18px] text-white text-[9px] font-black rounded-full flex items-center justify-center px-1 shadow-sm"
                style={{ backgroundColor: '#ca0013' }}
              >
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Account */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-1.5 sm:gap-2 p-1 sm:p-1.5 sm:pr-3 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid rgba(183, 198, 194, 0.3)',
                boxShadow: '0 4px 12px -2px rgba(23, 30, 25, 0.04)',
                color: '#171e19',
              }}
            >
              <div
                className="w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs text-white"
                style={{ backgroundColor: '#171e19' }}
              >
                {mounted && user?.fullName ? user.fullName.charAt(0) : 'P'}
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-[11px] font-extrabold leading-tight truncate max-w-[90px]" style={{ color: '#171e19' }}>
                  {mounted && user?.companyName ? user.companyName.split(' ')[0] : 'Account'}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#b7c6c2' }}>
                  {mounted && user?.role ? user.role : 'Customer'}
                </p>
              </div>
              <ChevronDown className="w-3 h-3 ml-0.5 hidden sm:inline" style={{ color: '#b7c6c2' }} />
            </button>

            {userDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-56 rounded-3xl py-2 z-50 text-xs shadow-xl animate-fade-in"
                onMouseLeave={() => setUserDropdownOpen(false)}
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(183, 198, 194, 0.3)',
                  boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.15)',
                  color: '#171e19',
                }}
              >
                <div
                  className="px-4 py-3 mx-2 mb-1 rounded-2xl"
                  style={{
                    backgroundColor: '#eeebe3',
                    border: '1px solid rgba(183, 198, 194, 0.25)',
                  }}
                >
                  <p className="font-extrabold text-[12px]" style={{ color: '#171e19' }}>
                    {user.companyName}
                  </p>
                  <p className="text-[11px] truncate text-gray-500 font-medium">{user.email}</p>
                  <p className="text-[10px] font-mono mt-0.5 font-bold" style={{ color: '#ca0013' }}>
                    GSTIN: {user.gstin}
                  </p>
                </div>

                {[
                  { href: '/account', icon: User, label: 'Account Dashboard' },
                  { href: '/account/orders', icon: FileText, label: 'My Orders' },
                  { href: '/account/quotes', icon: ClipboardList, label: 'My RFQ Quotations', badge: pendingQuotesCount },
                  { href: '/account/invoices', icon: FileText, label: 'B2B GST Invoices' },
                ].map(({ href, icon: Icon, label, badge }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center justify-between px-4 py-2 mx-2 rounded-xl transition-all duration-200 font-bold hover:bg-[#eeebe3]"
                    style={{ color: '#171e19' }}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-gray-400" />
                      {label}
                    </span>
                    {badge && badge > 0 && (
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full text-white" style={{ backgroundColor: '#ca0013' }}>
                        {badge}
                      </span>
                    )}
                  </Link>
                ))}

                <div className="my-1 mx-2 h-px bg-gray-100" />
                <Link
                  href="/login"
                  onClick={() => setUserDropdownOpen(false)}
                  className="flex items-center gap-2 px-4 py-2 mx-2 rounded-xl font-bold transition-colors hover:bg-red-50"
                  style={{ color: '#ca0013' }}
                >
                  Sign Out
                </Link>
              </div>
            )}
          </div>

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
              className="px-4 py-2 rounded-2xl text-xs font-black uppercase text-white"
              style={{ backgroundColor: '#ca0013' }}
            >
              Search
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
            Contact Factory
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

          <div className="grid grid-cols-2 gap-1.5 pb-2">
            {[
              { href: '/', label: 'HOME' },
              { href: '/products', label: 'CATALOGUE' },
              { href: '/about', label: 'ABOUT US' },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-2xl font-black text-xs transition-colors hover:bg-[#eeebe3] text-[#171e19] flex items-center justify-between"
              >
                <span>{label}</span>
              </Link>
            ))}
          </div>

          <div className="pt-2 border-t border-[#b7c6c2]/20 space-y-2">
            <a
              href={`tel:${COMPANY_DETAILS.phone}`}
              className="flex items-center justify-center gap-2 py-3 rounded-2xl font-black text-xs bg-[#eeebe3] text-[#171e19]"
            >
              <PhoneCall className="w-4 h-4 text-[#ca0013]" />
              Call Factory: {COMPANY_DETAILS.phone}
            </a>

            <Link
              href="/request-quote"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-3 text-center rounded-2xl font-black text-xs text-white"
              style={{ backgroundColor: '#ca0013' }}
            >
              REQUEST CUSTOM QUOTATION
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
