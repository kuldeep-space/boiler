'use client';

import React, { useState } from 'react';
import { useAppStore } from '../../../lib/store';
import { Quote } from '../../../lib/types';
import { ClipboardList, Send, ShieldCheck, DollarSign, Calculator } from 'lucide-react';

export default function AdminQuotesPage() {
  const { quotes, updateQuoteByAdmin } = useAppStore();

  const [selectedQuoteId, setSelectedQuoteId] = useState<string | null>(quotes[0]?.id || null);

  const selectedQuote = quotes.find((q) => q.id === selectedQuoteId) || quotes[0];

  const [unitPrice, setUnitPrice] = useState<number>(selectedQuote?.unitPrice || 4850000);
  const [discountAmount, setDiscountAmount] = useState<number>(selectedQuote?.discountAmount || 150000);
  const [gstRate, setGstRate] = useState<number>(selectedQuote?.gstRate || 18);
  const [freightAmount, setFreightAmount] = useState<number>(selectedQuote?.freightAmount || 85000);
  const [paymentTerms, setPaymentTerms] = useState<string>(
    selectedQuote?.paymentTerms || '30% Advance with PO, 60% prior to dispatch, 10% post commissioning.'
  );
  const [validityDays, setValidityDays] = useState<number>(selectedQuote?.validityDays || 30);
  const [adminNotes, setAdminNotes] = useState<string>(selectedQuote?.adminNotes || 'Discount approved by VP.');

  // Calculated values
  const subtotal = unitPrice * (selectedQuote?.quantity || 1);
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const gstAmount = (taxableAmount * gstRate) / 100;
  const grandTotal = Math.round(taxableAmount + gstAmount + freightAmount);

  const handleSendQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuote) return;

    updateQuoteByAdmin(selectedQuote.id, {
      unitPrice,
      subtotal,
      discountAmount,
      taxableAmount,
      gstRate,
      gstAmount,
      freightAmount,
      grandTotal,
      paymentTerms,
      validityDays,
      adminNotes,
      status: 'quoted'
    });

    alert(`Commercial Quotation ${selectedQuote.quoteNumber} dispatched to customer dashboard! Total: ₹${grandTotal.toLocaleString('en-IN')}`);
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
          <ClipboardList className="w-5 h-5 text-amber-500" />
          RFQ Technical & Commercial Quotation Desk ({quotes.length})
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Review customer RFQs, configure itemized unit pricing, GST tax, freight transport, and issue formal proposals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Quote Request List */}
        <div className="lg:col-span-4 space-y-2">
          {quotes.map((q) => (
            <div
              key={q.id}
              onClick={() => {
                setSelectedQuoteId(q.id);
                setUnitPrice(q.unitPrice || 4500000);
                setDiscountAmount(q.discountAmount || 100000);
                setGstRate(q.gstRate || 18);
                setFreightAmount(q.freightAmount || 75000);
                if (q.paymentTerms) setPaymentTerms(q.paymentTerms);
                if (q.adminNotes) setAdminNotes(q.adminNotes);
              }}
              className={`p-4 rounded-2xl border-2 cursor-pointer transition text-xs space-y-1 ${
                selectedQuoteId === q.id ? 'border-amber-500 bg-amber-50/30 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between font-mono font-bold">
                <span className="text-slate-900">{q.quoteNumber}</span>
                <span className="bg-slate-900 text-amber-400 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                  {q.status}
                </span>
              </div>
              <strong className="text-slate-900 block text-xs truncate">{q.productName}</strong>
              <p className="text-[11px] text-slate-500">
                {q.companyName} | {q.deliveryCity}, {q.deliveryState}
              </p>
            </div>
          ))}
        </div>

        {/* Quotation Proposal Calculator Form */}
        <div className="lg:col-span-8">
          {selectedQuote ? (
            <form onSubmit={handleSendQuotation} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm font-mono">
                    Quotation Builder: {selectedQuote.quoteNumber}
                  </h3>
                  <p className="text-slate-500 text-[11px]">
                    Customer: <strong>{selectedQuote.companyName}</strong> (GSTIN: {selectedQuote.gstin})
                  </p>
                </div>

                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase">
                  RFQ Status: {selectedQuote.status}
                </span>
              </div>

              {/* Customer Requirements Snapshot */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-[11px]">
                <strong className="text-slate-900 block font-bold text-xs">Submitted Requirements:</strong>
                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div>Equipment: <strong>{selectedQuote.productName}</strong></div>
                  <div>Quantity: <strong>{selectedQuote.quantity} Unit(s)</strong></div>
                  <div>Target Pressure: <strong>{selectedQuote.specsRequired?.['Required Operating Pressure'] || '14 kg/cm²'}</strong></div>
                  <div>Fuel Preference: <strong>{selectedQuote.specsRequired?.['Fuel Preference'] || 'Biomass'}</strong></div>
                  <div className="col-span-2">Notes: <em>{selectedQuote.notes || 'None'}</em></div>
                </div>
              </div>

              {/* Pricing Form */}
              <div className="space-y-4">
                <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5 border-b pb-1">
                  <Calculator className="w-4 h-4 text-sky-700" /> Commercial Price Structure
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Unit Equipment Price (₹) *</label>
                    <input
                      type="number"
                      value={unitPrice}
                      onChange={(e) => setUnitPrice(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono font-bold text-slate-900"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Discount Amount (₹)</label>
                    <input
                      type="number"
                      value={discountAmount}
                      onChange={(e) => setDiscountAmount(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono font-bold text-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">GST Tax Rate (%) *</label>
                    <input
                      type="number"
                      value={gstRate}
                      onChange={(e) => setGstRate(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Pan-India Freight Charge (₹)</label>
                    <input
                      type="number"
                      value={freightAmount}
                      onChange={(e) => setFreightAmount(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono font-bold text-amber-700"
                      required
                    />
                  </div>
                </div>

                {/* Live Calculated Proposal Total Box */}
                <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 space-y-1 font-mono">
                  <div className="flex justify-between text-slate-300">
                    <span>Taxable Amount:</span>
                    <span>{formatPrice(taxableAmount)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>GST ({gstRate}%):</span>
                    <span>{formatPrice(gstAmount)}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Freight Transport:</span>
                    <span>{formatPrice(freightAmount)}</span>
                  </div>
                  <div className="flex justify-between text-amber-400 text-base font-black pt-2 border-t border-slate-800">
                    <span>GRAND PROPOSAL TOTAL:</span>
                    <span>{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Payment & Supply Terms *</label>
                  <textarea
                    rows={2}
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono"
                    required
                  ></textarea>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Internal Sales VP Notes</label>
                  <input
                    type="text"
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl"
                  />
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" /> Issue Commercial Proposal to Customer Dashboard
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400">
              Select a quote from left column to build quotation.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
