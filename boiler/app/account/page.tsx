'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '../../lib/store';
import { ShoppingBag, ClipboardList, FileText, Heart, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export default function CustomerDashboardPage() {
  const { orders, quotes, wishlist, user } = useAppStore();

  const activeOrders = orders.slice(0, 3);
  const pendingQuotes = quotes.filter((q) => q.status === 'quoted' || q.status === 'pending');

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Welcome, {user.fullName}</h2>
          <p className="text-xs text-slate-500 mt-1">
            Managing equipment procurement for <strong className="text-slate-800">{user.companyName}</strong> (GSTIN: {user.gstin})
          </p>
        </div>
        <Link
          href="/request-quote"
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition"
        >
          Submit New RFQ Quote
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm space-y-1">
          <ShoppingBag className="w-5 h-5 text-sky-600" />
          <span className="text-slate-500 text-[11px] block uppercase font-bold">Total Orders</span>
          <strong className="text-2xl font-black text-slate-900 font-mono">{orders.length}</strong>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm space-y-1">
          <ClipboardList className="w-5 h-5 text-amber-500" />
          <span className="text-slate-500 text-[11px] block uppercase font-bold">Active RFQs</span>
          <strong className="text-2xl font-black text-slate-900 font-mono">{quotes.length}</strong>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm space-y-1">
          <FileText className="w-5 h-5 text-emerald-600" />
          <span className="text-slate-500 text-[11px] block uppercase font-bold">GST Invoices</span>
          <strong className="text-2xl font-black text-slate-900 font-mono">{orders.length}</strong>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm space-y-1">
          <Heart className="w-5 h-5 text-rose-500" />
          <span className="text-slate-500 text-[11px] block uppercase font-bold">Wishlist Items</span>
          <strong className="text-2xl font-black text-slate-900 font-mono">{wishlist.length}</strong>
        </div>
      </div>

      {/* Pending Quotes Alert Banner */}
      {pendingQuotes.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-amber-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" /> Quotes Awaiting Customer Response ({pendingQuotes.length})
            </h3>
            <Link href="/account/quotes" className="text-xs font-bold text-amber-900 underline">
              View All Quotes
            </Link>
          </div>

          <div className="space-y-2">
            {pendingQuotes.map((q) => (
              <div key={q.id} className="bg-white p-3 rounded-xl border border-amber-200 flex items-center justify-between text-xs">
                <div>
                  <strong className="text-slate-900 font-mono">{q.quoteNumber}</strong> - {q.productName}
                  <span className="text-slate-500 block text-[11px]">
                    Status: <span className="font-bold text-amber-700 capitalize">{q.status}</span> | Quoted Total: {q.grandTotal ? formatPrice(q.grandTotal) : 'Under Review'}
                  </span>
                </div>
                <Link
                  href={`/account/quotes/${q.id}`}
                  className="px-3 py-1.5 bg-slate-900 text-white rounded-lg font-bold text-[11px] hover:bg-slate-800 transition"
                >
                  Review Quote
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Orders List */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-base text-slate-900">Recent Equipment Orders</h3>
          <Link href="/account/orders" className="text-xs font-bold text-sky-700 hover:underline flex items-center gap-1">
            View All Orders <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3 text-xs">
          {activeOrders.map((ord) => (
            <div key={ord.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 font-mono font-bold text-slate-900 text-sm">
                  {ord.orderNumber}
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded capitalize">
                    {ord.orderStatus.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Placed on {new Date(ord.createdAt).toLocaleDateString('en-IN')} | Items: {ord.items.length}
                </p>
              </div>

              <div className="text-right">
                <span className="font-mono font-black text-slate-900 text-sm block">
                  {formatPrice(ord.grandTotal)}
                </span>
                <Link
                  href={`/account/orders/${ord.id}`}
                  className="text-sky-700 font-bold hover:underline text-[11px] block mt-0.5"
                >
                  Track Dispatch Live &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
