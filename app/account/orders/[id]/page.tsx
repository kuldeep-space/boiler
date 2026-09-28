'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '../../../../lib/store';
import { Truck, FileText, Printer, ShieldCheck, MapPin } from 'lucide-react';

export default function OrderDetailsPage() {
  const params = useParams();
  const orderIdParam = params?.id as string;
  const { orders } = useAppStore();

  const order = orders.find((o) => o.id === orderIdParam || o.orderNumber === orderIdParam) || orders[0];

  const formatPrice = (val: number) => {
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

  const currentStageIndex = stages.findIndex((s) => s.key === order.orderStatus);

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 font-mono">
            Order: {order.orderNumber}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Placed on {new Date(order.createdAt).toLocaleString('en-IN')} | B2B Buyer: {order.companyName}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" /> Print
          </button>
          <Link
            href="/account/invoices"
            className="px-3.5 py-2 bg-sky-600 text-white rounded-xl text-xs font-bold hover:bg-sky-500 transition flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" /> B2B GST Invoice
          </Link>
        </div>
      </div>

      {/* 7-Stage Live Manufacturing Timeline */}
      <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 shadow-md space-y-4">
        <h3 className="font-extrabold text-sm text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Truck className="w-4 h-4 text-amber-400" /> 7-Stage Manufacturing & Hydraulic Dispatch Timeline
        </h3>

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
          <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-slate-300 mt-4">
            <div>Carrier: <strong className="text-white">{order.carrierName}</strong></div>
            <div>LR Receipt: <strong className="text-white">{order.lrNumber}</strong></div>
            <div>Tracking: <strong className="text-amber-400">{order.trackingNumber}</strong></div>
            <div>Est. Arrival: <strong className="text-emerald-400">{order.estimatedDeliveryDate}</strong></div>
          </div>
        )}
      </div>

      {/* Address & Items Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-2 text-xs">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 border-b border-slate-100 pb-2">
            <MapPin className="w-4 h-4 text-sky-700" /> Billing Address
          </h4>
          <p className="font-bold text-slate-900">{order.billingAddress.companyName}</p>
          <p className="text-slate-600">{order.billingAddress.street}, {order.billingAddress.city}, {order.billingAddress.state} - {order.billingAddress.pincode}</p>
          <p className="font-mono text-sky-800">GSTIN: {order.billingAddress.gstin}</p>
        </div>

        <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm space-y-2 text-xs">
          <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5 border-b border-slate-100 pb-2">
            <Truck className="w-4 h-4 text-sky-700" /> Site Shipping Address
          </h4>
          <p className="font-bold text-slate-900">{order.shippingAddress.companyName}</p>
          <p className="text-slate-600">{order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
          <p className="font-mono text-sky-800">GSTIN: {order.shippingAddress.gstin}</p>
        </div>
      </div>
    </div>
  );
}
