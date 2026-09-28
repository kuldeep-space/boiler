'use client';

import React from 'react';
import { useAppStore } from '../../../lib/store';
import { ProductCard } from '../../../components/product/ProductCard';
import { Heart } from 'lucide-react';

export default function CustomerWishlistPage() {
  const { wishlist, products } = useAppStore();
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
          Saved Equipment & Wishlist ({wishlistedProducts.length})
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Quickly access saved boilers, water softeners, and safety valves for future capital expansion.
        </p>
      </div>

      {wishlistedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 border border-slate-200 rounded-2xl text-center space-y-3">
          <Heart className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-900 text-base">No Saved Boilers Yet</h3>
          <p className="text-xs text-slate-500">Click the heart icon on any boiler product card to save it here.</p>
        </div>
      )}
    </div>
  );
}
