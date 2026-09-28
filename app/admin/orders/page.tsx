'use client';

import React, { useState } from 'react';
import { useAppStore } from '../../../lib/store';
import { OrderStatus, PaymentStatus } from '../../../lib/types';
import { ShoppingBag, Truck, CheckCircle2, Edit2, FileText, Send } from 'lucide-react';

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus, updatePaymentStatus } = useAppStore();

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(orders[0]?.id || null);

  const [newOrderStatus, setNewOrderStatus] = useState<OrderStatus>('processing');
  const [newPaymentStatus, setNewPaymentStatus] = useState<PaymentStatus>('paid');
  const [carrierName, setCarrierName] = useState('VRL Logistics Hydraulic Trailer');
  const [trackingNumber, setTrackingNumber] = useState('VRL-MH-9948120');
  const [lrNumber, setLrNumber] = useState('LR-2026-98124');
  const [estimatedDelivery, setEstimatedDelivery] = useState('2026-10-05');

  const selectedOrder = orders.find((o) => o.id === selectedOrderId) || orders[0];

  const handleUpdateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    updateOrderStatus(selectedOrder.id, newOrderStatus, {
      carrierName,
      trackingNumber,
      lrNumber,
      estimatedDeliveryDate: estimatedDelivery
    });
    updatePaymentStatus(selectedOrder.id, newPaymentStatus);

    alert(`Order ${selectedOrder.orderNumber} status updated to ${newOrderStatus.toUpperCase()}!`);
  };

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
          Plant Order Fulfillment & Dispatch Manager ({orders.length})
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Update 7-stage manufacturing timelines, issue LR receipts, attach tracking numbers, and update payment status.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Order Selector List */}
        <div className="lg:col-span-5 space-y-2">
          {orders.map((ord) => (
            <div
              key={ord.id}
              onClick={() => {
                setSelectedOrderId(ord.id);
                setNewOrderStatus((ord.orderStatus || ord.status));
                setNewPaymentStatus(ord.paymentStatus);
              }}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition text-xs space-y-1.5 ${
                selectedOrderId === ord.id ? 'border-sky-600 bg-sky-50/40 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between font-mono font-bold">
                <span className="text-slate-900">{ord.orderNumber}</span>
                <span className="text-amber-600">{formatPrice(ord.grandTotal)}</span>
              </div>

              <div className="flex items-center justify-between text-[11px]">
                <strong className="text-slate-800">{ord.companyName}</strong>
                <span className="bg-slate-900 text-amber-400 font-bold px-2 py-0.5 rounded capitalize text-[10px]">
                  {(ord.orderStatus || ord.status).replace('_', ' ')}
                </span>
              </div>

              <div className="text-[10px] text-slate-400 font-mono">
                GSTIN: {ord.gstin} | Payment: {ord.paymentStatus}
              </div>
            </div>
          ))}
        </div>

        {/* Update Form & Order Inspector */}
        <div className="lg:col-span-7">
          {selectedOrder ? (
            <form onSubmit={handleUpdateOrder} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm font-mono">
                    Update Order {selectedOrder.orderNumber}
                  </h3>
                  <span className="text-slate-400 text-[11px]">B2B Buyer: {selectedOrder.companyName} ({selectedOrder.gstin})</span>
                </div>
                <span className="font-mono font-black text-amber-600 text-base">{formatPrice(selectedOrder.grandTotal)}</span>
              </div>

              {/* Status Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">7-Stage Manufacturing & Fulfillment Status *</label>
                  <select
                    value={newOrderStatus}
                    onChange={(e) => setNewOrderStatus(e.target.value as OrderStatus)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900"
                  >
                    <option value="placed">1. Order Placed</option>
                    <option value="confirmed">2. Payment Confirmed</option>
                    <option value="processing">3. Engineering Processing</option>
                    <option value="manufacturing">4. Manufacturing / Assembly</option>
                    <option value="dispatch_ready">5. Ready for Dispatch</option>
                    <option value="dispatched">6. Dispatched (Hydraulic Trailer)</option>
                    <option value="delivered">7. Site Delivered</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Payment Reconciliation Status *</label>
                  <select
                    value={newPaymentStatus}
                    onChange={(e) => setNewPaymentStatus(e.target.value as PaymentStatus)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-emerald-800"
                  >
                    <option value="pending">Pending Payment</option>
                    <option value="paid">Payment Received (Paid)</option>
                    <option value="failed">Payment Failed</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Logistics Transport Carrier</label>
                  <input
                    type="text"
                    value={carrierName}
                    onChange={(e) => setCarrierName(e.target.value)}
                    placeholder="VRL Logistics Hydraulic Trailer"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Tracking Number</label>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="VRL-MH-9948120"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Lorry Receipt (LR Number)</label>
                  <input
                    type="text"
                    value={lrNumber}
                    onChange={(e) => setLrNumber(e.target.value)}
                    placeholder="LR-2026-98124"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Estimated Site Arrival Date</label>
                  <input
                    type="date"
                    value={estimatedDelivery}
                    onChange={(e) => setEstimatedDelivery(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                  />
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow transition flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" /> Save Status & Notify Customer
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400">
              Select an order to manage status.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
