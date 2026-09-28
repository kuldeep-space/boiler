'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '../../../lib/store';
import { ClipboardList, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CustomerQuotesPage() {
  const { quotes } = useAppStore();

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-amber-500" />
            My RFQ Technical Proposals & Quotes ({quotes.length})
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Review formal quotations issued by Pandey Ji Iron Works sales engineers. Accept to instantly place orders.
          </p>
        </div>

        <Link
          href="/request-quote"
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition"
        >
          Submit New RFQ
        </Link>
      </div>

      <div className="space-y-4">
        {quotes.map((q) => (
          <div key={q.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-slate-900">{q.quoteNumber}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      q.status === 'quoted'
                        ? 'bg-amber-500 text-slate-950'
                        : q.status === 'accepted'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {q.status}
                  </span>
                </div>
                <span className="text-slate-400 text-[11px]">Submitted on {new Date(q.createdAt).toLocaleDateString('en-IN')}</span>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-500 block">Quoted Grand Total</span>
                <strong className="font-mono text-base font-black text-amber-600">
                  {q.grandTotal ? formatPrice(q.grandTotal) : 'Under Technical Review'}
                </strong>
              </div>
            </div>

            <div className="text-xs space-y-1">
              <strong className="text-slate-900 text-sm block">{q.productName}</strong>
              <p className="text-slate-600">
                Quantity: <strong>{q.quantity} Unit(s)</strong> | Destination: {q.deliveryCity}, {q.deliveryState}
              </p>
              {q.adminNotes && (
                <p className="text-amber-800 bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-[11px]">
                  <strong>Sales VP Note:</strong> {q.adminNotes}
                </p>
              )}
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 text-xs">
              <Link
                href={`/account/quotes/${q.id}`}
                className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition flex items-center gap-1.5"
              >
                Review Proposal & Action <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
