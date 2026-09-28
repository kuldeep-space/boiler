'use client';

import React from 'react';
import { useAppStore } from '../../../lib/store';
import { Layers, Plus } from 'lucide-react';

export default function AdminCategoriesPage() {
  const { categories } = useAppStore();

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-sky-700" />
            Equipment Categories & Default HSN Codes ({categories.length})
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Organize boilers, thermic fluid heaters, auxiliaries, and valves into product hierarchies.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900">{cat.name}</h3>
              <span className="bg-slate-900 text-amber-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                HSN {cat.hsnCodeDefault}
              </span>
            </div>
            <p className="text-xs text-slate-500 line-clamp-2">{cat.description}</p>
            <div className="pt-2 border-t text-[11px] text-slate-400 flex justify-between font-mono">
              <span>GST Rate: {cat.gstRateDefault}%</span>
              <span>Products: {cat.productCount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
