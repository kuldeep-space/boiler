'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppStore } from '../../../../lib/store';
import { ClipboardList, CheckCircle2, XCircle, RefreshCw, FileText, ArrowRight, ShieldCheck } from 'lucide-react';

export default function QuoteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const quoteIdParam = params?.id as string;

  const { quotes, respondToQuoteByCustomer } = useAppStore();
  const quote = quotes.find((q) => q.id === quoteIdParam || q.quoteNumber === quoteIdParam) || quotes[0];

  const [message, setMessage] = useState('');

  const formatPrice = (val?: number) => { val = val || 0;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleAccept = () => {
    if (confirm('Accept this quotation proposal and convert it into a confirmed Purchase Order?')) {
      const createdOrder = respondToQuoteByCustomer(quote.id, 'accept');
      if (createdOrder) {
        alert('Quotation accepted! Order has been generated automatically.');
        router.push(`/order-confirmation/${createdOrder.id}`);
      } else {
        alert('Quotation status updated to Accepted.');
        router.push('/account/quotes');
      }
    }
  };

  const handleReject = () => {
    if (confirm('Reject this quotation proposal?')) {
      respondToQuoteByCustomer(quote.id, 'reject');
      alert('Quotation marked as Rejected.');
      router.push('/account/quotes');
    }
  };

  const handleRequestRevision = () => {
    respondToQuoteByCustomer(quote.id, 'revision');
    alert('Revision request submitted to Pandey Ji Iron Works sales team.');
    router.push('/account/quotes');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900 font-mono">
              {quote.quoteNumber}
            </h2>
            <span
              className={`text-xs font-extrabold px-2.5 py-0.5 rounded uppercase ${
                quote.status === 'quoted'
                  ? 'bg-amber-500 text-slate-950'
                  : quote.status === 'accepted'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-200 text-slate-700'
              }`}
            >
              {quote.status}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Submitted by {quote.contactPerson} ({quote.companyName}) | GSTIN: {quote.gstin}
          </p>
        </div>

        <Link
          href="/account/quotes"
          className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition"
        >
          &larr; Back to Quotes
        </Link>
      </div>

      {/* Admin Quoted Commercial Proposal Card (If quoted) */}
      {quote.grandTotal ? (
        <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-base text-amber-400 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Official Engineering & Commercial Proposal
            </h3>
            <span className="text-xs text-slate-400 font-mono">Validity: {quote.validityDays || 30} Days</span>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Unit Equipment Price</span>
              <strong className="text-white text-base font-mono">{formatPrice(quote.unitPrice || 0)}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">GST ({quote.gstRate || 18}%) + Freight</span>
              <strong className="text-white text-base font-mono">{formatPrice((quote.gstAmount || 0) + (quote.freightAmount || 0))}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">Total Proposal Amount</span>
              <strong className="text-amber-400 text-xl font-mono font-black">{formatPrice(quote.grandTotal)}</strong>
            </div>
          </div>

          {/* Payment Terms */}
          {quote.paymentTerms && (
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-1">
              <strong className="text-amber-400 block text-xs">Payment & Supply Terms:</strong>
              <p className="text-slate-300 leading-relaxed font-mono">{quote.paymentTerms}</p>
            </div>
          )}

          {/* Action CTAs */}
          {quote.status !== 'accepted' && quote.status !== 'rejected' && (
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                onClick={handleAccept}
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Accept Proposal & Create Order
              </button>

              <button
                onClick={handleRequestRevision}
                className="px-5 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl shadow transition flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Request Modification
              </button>

              <button
                onClick={handleReject}
                className="px-5 py-3.5 bg-rose-900/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800 font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center gap-2"
              >
                <XCircle className="w-4 h-4" /> Decline RFQ
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl text-xs text-amber-900 space-y-2">
          <strong className="text-sm font-bold block">Quote Status: Pending Technical Assessment</strong>
          <p>
            Our sales engineering team is currently evaluating your boiler specs and civil layout. Commercial proposal will appear here shortly.
          </p>
        </div>
      )}

      {/* Submitted Specification Details */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-xs">
        <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-2">
          Original Requirement Specifications
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <span className="text-slate-400 block text-[10px]">Equipment Target</span>
            <strong className="text-slate-900 text-sm">{quote.productName}</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Destination Site</span>
            <strong className="text-slate-900">{quote.deliveryCity}, {quote.deliveryState} ({quote.deliveryPincode})</strong>
          </div>
          {Object.entries(quote.specsRequired || {}).map(([k, v], idx) => (
            <div key={idx}>
              <span className="text-slate-400 block text-[10px]">{k}</span>
              <strong className="text-slate-800 font-mono">{String(v)}</strong>
            </div>
          ))}
        </div>

        {quote.notes && (
          <div className="pt-2 border-t border-slate-100">
            <span className="text-slate-400 block text-[10px]">Customer Notes:</span>
            <p className="text-slate-700 mt-1">{quote.notes}</p>
          </div>
        )}
      </div>
    </div>
  );
}
