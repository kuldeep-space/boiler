'use client';

import React, { useState } from 'react';
import { useAppStore } from '../../../lib/store';
import { Coupon } from '../../../lib/types';
import { Tag, Plus, CheckCircle2 } from 'lucide-react';

export default function AdminCouponsPage() {
  const { coupons, saveCoupon } = useAppStore();

  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'percentage' | 'fixed'>('percentage');
  const [value, setValue] = useState(10);
  const [minOrderValue, setMinOrderValue] = useState(50000);
  const [maxDiscount, setMaxDiscount] = useState(25000);

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const newC: Coupon = {
      id: `c-${Date.now()}`,
      code: code.toUpperCase(),
      description,
      type,
      value: Number(value),
      minOrderValue: Number(minOrderValue),
      maxDiscount: Number(maxDiscount),
      validUntil: '2026-12-31',
      usageCount: 0,
      isActive: true
    };
    saveCoupon(newC);
    setCode('');
    setDescription('');
    alert(`Coupon ${newC.code} created!`);
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <Tag className="w-5 h-5 text-amber-500" />
          Discounts & B2B Coupon Rules ({coupons.length})
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Configure percentage discounts, fixed order rebates, minimum order thresholds, and tier limits.
        </p>
      </div>

      <form onSubmit={handleCreateCoupon} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-xs">
        <h3 className="font-extrabold text-slate-900 text-sm border-b pb-2">Create New B2B Coupon Code</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Coupon Code *</label>
            <input type="text" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="BOILER15" className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono uppercase font-bold" required />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Discount Type *</label>
            <select value={type} onChange={(e) => setType(e.target.value as 'percentage' | 'fixed')} className="w-full p-2.5 bg-slate-50 border rounded-xl font-bold">
              <option value="percentage">Percentage OFF (%)</option>
              <option value="fixed">Fixed Flat OFF (₹)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Value ({type === 'percentage' ? '%' : '₹'}) *</label>
            <input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono font-bold" required />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-bold text-slate-700 mb-1">Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="10% Off on Boiler Accessories" className="w-full p-2.5 bg-slate-50 border rounded-xl" required />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Min Order Value (₹)</label>
            <input type="number" value={minOrderValue} onChange={(e) => setMinOrderValue(Number(e.target.value))} className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono" required />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button type="submit" className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl text-xs hover:bg-slate-800 transition">
            Create Coupon
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {coupons.map((c) => (
          <div key={c.id} className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-mono font-extrabold text-sm text-amber-600 bg-amber-50 px-2.5 py-1 rounded border border-amber-200">{c.code}</span>
              <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded">Active</span>
            </div>
            <p className="font-bold text-slate-900">{c.description}</p>
            <p className="text-slate-500 font-mono text-[11px]">
              Min Order: {formatPrice(c.minOrderValue)} | Used: {c.usageCount} times
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
