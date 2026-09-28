'use client';

import React from 'react';
import Link from 'next/link';
import { useAppStore } from '../../../lib/store';
import { FileText, Printer, ShieldCheck } from 'lucide-react';

export default function AdminInvoicesPage() {
  const { orders } = useAppStore();

  const formatPrice = (val?: number) => { val = val || 0;
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-600" />
          B2B Tax Invoices Audit Ledger ({orders.length})
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Complete audit trail of issued GST tax invoices, CGST/SGST vs IGST split, and customer GSTIN records.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-700">
            <thead className="bg-slate-100 font-bold uppercase text-[10px] text-slate-600">
              <tr>
                <th className="p-3">Invoice No</th>
                <th className="p-3">Customer Company</th>
                <th className="p-3">GSTIN</th>
                <th className="p-3">Taxable Value</th>
                <th className="p-3">GST Amount</th>
                <th className="p-3">Grand Total</th>
                <th className="p-3 text-right">Invoice View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-slate-900">
                    INV-{ord.orderNumber.replace('ORD-', '')}
                  </td>
                  <td className="p-3 font-bold text-slate-900">{ord.companyName}</td>
                  <td className="p-3 font-mono font-bold text-sky-800">{ord.gstin}</td>
                  <td className="p-3 font-mono">{formatPrice(ord.taxableAmount)}</td>
                  <td className="p-3 font-mono text-emerald-700 font-bold">{formatPrice(ord.totalGst)}</td>
                  <td className="p-3 font-mono font-black text-slate-900">{formatPrice(ord.grandTotal)}</td>
                  <td className="p-3 text-right">
                    <Link href={`/account/invoices`} className="px-3 py-1 bg-slate-900 text-white rounded text-[11px] font-bold">
                      View Printable GST
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
