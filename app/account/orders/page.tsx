'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '../../../lib/store';
import { ShoppingBag, Truck, FileText, ArrowRight } from 'lucide-react';

export default function CustomerOrdersPage() {
  const { orders } = useAppStore();

  const formatPrice = (val?: number) => { val = val || 0;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-sky-700" />
          My Orders & Manufacturing History ({orders.length})
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Track production, hydraulic trailer dispatch, and download B2B GST Tax Invoices.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm space-y-3">
          <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="font-bold text-slate-800">No Orders Placed Yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            You do not have any manufacturing orders currently. Browse our equipment catalog to place an order.
          </p>
          <Link href="/products" className="inline-block px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition">
            Browse Catalogue
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((ord) => (
          <div key={ord.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-slate-900">{ord.orderNumber}</span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded capitalize">
                    {(ord.orderStatus || ord.status).replace('_', ' ')}
                  </span>
                  <span className="bg-sky-100 text-sky-800 text-[10px] font-bold px-2 py-0.5 rounded capitalize">
                    Payment: {ord.paymentStatus}
                  </span>
                </div>
                <span className="text-slate-400 text-[11px]">Placed on {new Date(ord.createdAt).toLocaleString('en-IN')}</span>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500 block">Grand Total</span>
                <strong className="font-mono text-base font-black text-amber-600">{formatPrice(ord.grandTotal)}</strong>
              </div>
            </div>

            {/* Line Items */}
            <div className="divide-y divide-slate-100 text-xs">
              {ord.items.map((item, idx) => (
                <div key={idx} className="py-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt="" className="w-10 h-8 object-cover rounded border border-slate-200" />
                    <div>
                      <strong className="text-slate-900 block">{item.name}</strong>
                      <span className="text-slate-400 font-mono text-[10px]">SKU: {item.sku} | Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="font-mono font-bold text-slate-900">{formatPrice(item.totalPrice)}</span>
                </div>
              ))}
            </div>

            {/* Dispatch Tracking Info */}
            {ord.trackingNumber && (
              <div className="bg-slate-900 text-white p-3 rounded-xl text-xs font-mono flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-400" />
                  <span>Carrier: {ord.carrierName} | LR: {ord.lrNumber}</span>
                </div>
                <span className="text-amber-400 font-bold">Tracking: {ord.trackingNumber}</span>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 flex items-center justify-end gap-3 text-xs">
              <Link
                href={`/account/orders/${ord.id}`}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition flex items-center gap-1.5"
              >
                <Truck className="w-3.5 h-3.5 text-amber-400" /> View Live Manufacturing Timeline
              </Link>
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
}
