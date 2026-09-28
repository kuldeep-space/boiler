'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';
import { RoleSwitcher } from '../../../components/layout/RoleSwitcher';
import { useAppStore } from '../../../lib/store';
import { CheckCircle2, FileText, Truck, ArrowRight, ShieldCheck, Download, Printer } from 'lucide-react';

export default function OrderConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const orderIdParam = params?.id as string;

  const { orders } = useAppStore();
  const order = orders.find((o) => o.id === orderIdParam || o.orderNumber === orderIdParam) || orders[0];

  const formatPrice = (val?: number) => { val = val || 0;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const stages = [
    { key: 'placed', label: 'Order Placed' },
    { key: 'confirmed', label: 'Payment Confirmed' },
    { key: 'processing', label: 'Processing' },
    { key: 'manufacturing', label: 'Manufacturing / Prep' },
    { key: 'dispatch_ready', label: 'Ready for Dispatch' },
    { key: 'dispatched', label: 'Dispatched (LR)' },
    { key: 'delivered', label: 'Site Delivered' }
  ];

  const currentStageIndex = stages.findIndex((s) => s.key === (order.orderStatus || order.status));

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <RoleSwitcher />
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-10 flex-1 w-full space-y-8">
        {/* Success Header Card */}
        <div className="bg-white border border-emerald-200 rounded-2xl p-8 text-center space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
              B2B Purchase Order Confirmed
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-1">
              Order Ref: <span className="font-mono text-sky-700">{order.orderNumber}</span>
            </h1>
            <p className="text-xs text-slate-600 mt-2 max-w-md mx-auto">
              Your equipment order has been registered at Pune Works. Tax invoice generated under GSTIN {order.gstin}.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition flex items-center gap-2"
            >
              <Printer className="w-4 h-4" /> Print Order Receipt
            </button>
            <Link
              href="/account/invoices"
              className="px-4 py-2.5 bg-sky-600 text-white rounded-xl text-xs font-bold hover:bg-sky-500 transition flex items-center gap-2"
            >
              <FileText className="w-4 h-4" /> View B2B Tax Invoice
            </Link>
          </div>
        </div>

        {/* 7-Stage Live Manufacturing Timeline Tracker */}
        <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-400" /> Live Pan-India Order & Dispatch Tracker
            </h3>
            <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded font-mono uppercase">
              Current Stage: {(order.orderStatus || order.status).replace('_', ' ')}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 pt-2">
            {stages.map((stage, idx) => {
              const isPassed = idx <= currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              return (
                <div key={stage.key} className="flex flex-col items-center text-center space-y-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      isCurrent
                        ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-500/30 font-black'
                        : isPassed
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {idx + 1}
                  </div>
                  <span className={`text-[10px] font-semibold leading-tight ${isPassed ? 'text-slate-200' : 'text-slate-500'}`}>
                    {stage.label}
                  </span>
                </div>
              );
            })}
          </div>

          {order.trackingNumber && (
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 flex flex-wrap justify-between items-center text-xs font-mono text-slate-300 mt-4">
              <div>Carrier: <strong>{order.carrierName}</strong></div>
              <div>LR No: <strong>{order.lrNumber}</strong></div>
              <div>Tracking: <strong className="text-amber-400">{order.trackingNumber}</strong></div>
              <div>Est. Arrival: <strong className="text-emerald-400">{order.estimatedDeliveryDate}</strong></div>
            </div>
          )}
        </div>

        {/* Order Details & Line Items */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">
            Equipment Line Items & Tax Breakdown
          </h3>

          <div className="divide-y divide-slate-100 text-xs">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={item.image} alt="" className="w-12 h-10 object-cover rounded border border-slate-200" />
                  <div>
                    <strong className="text-slate-900 text-sm block">{item.name}</strong>
                    <span className="text-slate-400 font-mono text-[11px]">SKU: {item.sku} | HSN: {item.hsnCode} | Qty: {item.quantity}</span>
                  </div>
                </div>
                <div className="text-right font-mono font-bold text-slate-900">
                  {formatPrice(item.totalPrice)}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Summary */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs text-slate-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <strong className="font-mono text-slate-900">{formatPrice(order.subtotal)}</strong>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Discounts (-)</span>
                <strong className="font-mono">-{formatPrice(order.discountAmount)}</strong>
              </div>
            )}
            <div className="flex justify-between font-semibold">
              <span>Taxable Value</span>
              <strong className="font-mono text-slate-900">{formatPrice(order.taxableAmount)}</strong>
            </div>
            <div className="flex justify-between text-slate-600 font-mono">
              <span>{order.isInterstate ? 'IGST (18%)' : 'CGST (9%) + SGST (9%)'}</span>
              <strong className="text-slate-900">{formatPrice(order.totalGst || 0)}</strong>
            </div>
            <div className="flex justify-between">
              <span>Freight Transport Charge</span>
              <strong className="font-mono text-slate-900">{formatPrice(order.freightAmount || 0)}</strong>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-300 text-base font-black text-slate-900">
              <span>Grand Total</span>
              <span className="text-amber-600 font-mono text-lg">{formatPrice(order.grandTotal)}</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
