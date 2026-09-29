'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { RoleSwitcher } from '../../components/layout/RoleSwitcher';
import { ProductCard } from '../../components/product/ProductCard';
import { useAppStore } from '../../lib/store';
import { Heart, ArrowRight, PackageOpen } from 'lucide-react';

export default function WishlistPage() {
  const { products, wishlist } = useAppStore();

  const wishlistedProducts = products.filter((product) =>
    wishlist.includes(product.id)
  );

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#eeebe3' }}>
      <RoleSwitcher />
      <Header />

      {/* Hero Banner */}
      <div className="py-10 sm:py-12 px-4" style={{ backgroundColor: '#171e19' }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#ca0013] animate-pulse" />
              <span
                className="font-mono text-[11px] font-bold uppercase tracking-wider block"
                style={{ color: '#b7c6c2' }}
              >
                Saved Equipment
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-3">
              My Wishlist
              <span
                className="text-xs px-3 py-1 rounded-full font-bold"
                style={{ backgroundColor: '#ca0013', color: '#ffffff' }}
              >
                {wishlistedProducts.length} {wishlistedProducts.length === 1 ? 'Model' : 'Models'}
              </span>
            </h1>
            <p className="text-xs sm:text-sm max-w-xl leading-relaxed mt-1" style={{ color: '#b7c6c2' }}>
              Keep track of industrial boilers, thermic heaters, and khoya machinery you are considering for quotation.
            </p>
          </div>

          <Link
            href="/products"
            className="btn-secondary px-5 py-2.5 text-xs font-bold flex items-center gap-2 rounded-xl"
          >
            Explore Catalogue
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12 flex-1 w-full space-y-6">
        {wishlistedProducts.length > 0 ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-[#6B7280] font-semibold px-1">
              <span>Showing <strong>{wishlistedProducts.length}</strong> saved equipment</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {wishlistedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          /* Empty State */
          <div
            className="p-10 sm:p-16 text-center rounded-[28px] bg-white border border-[#b7c6c2]/30 shadow-sm max-w-2xl mx-auto my-8 space-y-5"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#ca0013]/10 text-[#ca0013] flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-black text-[#171e19]">
                Your Wishlist is Empty
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7280] font-medium max-w-md mx-auto leading-relaxed">
                You haven&apos;t saved any equipment yet. Explore our product catalogue and click the heart icon on any boiler to save it for easy access.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/products"
                className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider"
              >
                <PackageOpen className="w-4 h-4" />
                Browse All Equipment
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
