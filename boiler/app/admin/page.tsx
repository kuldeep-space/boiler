'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '../../lib/store';
import { 
  TrendingUp, 
  ShoppingBag, 
  ClipboardList, 
  Users, 
  Package, 
  AlertTriangle, 
  ArrowRight, 
  DollarSign, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';

export default function AdminDashboardOverviewPage() {
  const { orders, quotes, products, categories, user } = useAppStore();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.grandTotal : 0), 0);
  const pendingOrders = orders.filter((o) => o.orderStatus !== 'delivered');
  const completedOrders = orders.filter((o) => o.orderStatus === 'delivered');
  const pendingQuotes = quotes.filter((q) => q.status === 'pending');

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
      <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 shadow-md flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-wider block">
            Executive Dashboard
          </span>
          <h2 className="text-2xl font-black mt-1">Commercial Sales & Plant Operations</h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time analytics for Pune Works & Gujarat Works order fulfillment.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/admin/quotes"
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow transition"
          >
            Review {pendingQuotes.length} Pending RFQs
          </Link>
        </div>
      </div>

      {/* Metrics Row 1: Key Financials */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-1">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          <span className="text-slate-500 text-[11px] block uppercase font-bold">Total Confirmed Revenue</span>
          <strong className="text-xl sm:text-2xl font-black text-slate-900 font-mono">
            {formatPrice(totalRevenue)}
          </strong>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-1">
          <ShoppingBag className="w-5 h-5 text-sky-600" />
          <span className="text-slate-500 text-[11px] block uppercase font-bold">Total Orders</span>
          <strong className="text-2xl font-black text-slate-900 font-mono">{orders.length}</strong>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-1">
          <ClipboardList className="w-5 h-5 text-amber-500" />
          <span className="text-slate-500 text-[11px] block uppercase font-bold">RFQ Quotes</span>
          <strong className="text-2xl font-black text-slate-900 font-mono">{quotes.length}</strong>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-1">
          <Package className="w-5 h-5 text-purple-600" />
          <span className="text-slate-500 text-[11px] block uppercase font-bold">Active Equipment SKUs</span>
          <strong className="text-2xl font-black text-slate-900 font-mono">{products.length}</strong>
        </div>
      </div>

      {/* Action Required: Pending RFQ Quotes Grid */}
      {pendingQuotes.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 p-5 rounded-2xl space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-amber-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" /> Pending Quote Requests Requiring Pricing ({pendingQuotes.length})
            </h3>
            <Link href="/admin/quotes" className="text-xs font-bold text-amber-900 underline">
              Open Quotation Desk
            </Link>
          </div>

          <div className="space-y-2">
            {pendingQuotes.map((q) => (
              <div key={q.id} className="bg-white p-3.5 rounded-xl border border-amber-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2 font-mono font-bold text-slate-900">
                    {q.quoteNumber} - {q.companyName}
                    <span className="bg-amber-100 text-amber-900 text-[10px] px-1.5 py-0.2 rounded">
                      GSTIN: {q.gstin}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] mt-0.5">
                    Target: <strong>{q.productName}</strong> ({q.quantity} Unit) | Site: {q.deliveryCity}, {q.deliveryState}
                  </p>
                </div>
                <Link
                  href="/admin/quotes"
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg font-bold text-xs hover:bg-slate-800 transition"
                >
                  Set Price & Send Proposal
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders Table Snapshot */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-base text-slate-900">Recent Customer Orders</h3>
          <Link href="/admin/orders" className="text-xs font-bold text-sky-700 hover:underline flex items-center gap-1">
            Manage All Orders <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-700">
            <thead className="bg-slate-100 font-bold uppercase text-[10px] text-slate-600">
              <tr>
                <th className="p-3">Order Ref</th>
                <th className="p-3">Customer / Company</th>
                <th className="p-3">Grand Total</th>
                <th className="p-3">Payment</th>
                <th className="p-3">Fulfillment Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-slate-900">{ord.orderNumber}</td>
                  <td className="p-3">
                    <strong className="text-slate-900 block">{ord.companyName}</strong>
                    <span className="text-slate-400 font-mono text-[10px]">{ord.gstin}</span>
                  </td>
                  <td className="p-3 font-mono font-bold text-slate-900">{formatPrice(ord.grandTotal)}</td>
                  <td className="p-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded capitalize ${
                        ord.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {ord.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="bg-slate-200 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded capitalize">
                      {(ord.orderStatus || ord.status).replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <Link
                      href="/admin/orders"
                      className="px-3 py-1 bg-slate-900 text-white rounded font-bold text-[11px] hover:bg-slate-800"
                    >
                      Update Status
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
