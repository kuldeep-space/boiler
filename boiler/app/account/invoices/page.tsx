'use client';

import React, { useState } from 'react';
import { useAppStore } from '../../../lib/store';
import { Order } from '../../../lib/types';
import { FileText, Printer, Download, Flame, ShieldCheck } from 'lucide-react';

export default function CustomerInvoicesPage() {
  const { orders } = useAppStore();
  const [selectedInvoice, setSelectedInvoice] = useState<Order | null>(orders[0] || null);

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
            <FileText className="w-5 h-5 text-emerald-600" />
            B2B GST Tax Invoices ({orders.length})
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Download or print official GST compliant Tax Invoices for corporate accounting and input tax credit (ITC).
          </p>
        </div>

        {selectedInvoice && (
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition flex items-center gap-1.5"
          >
            <Printer className="w-4 h-4 text-amber-400" /> Print Tax Invoice
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Invoice Selector List */}
        <div className="lg:col-span-4 space-y-2">
          {orders.map((ord) => (
            <button
              key={ord.id}
              onClick={() => setSelectedInvoice(ord)}
              className={`w-full text-left p-4 rounded-xl border-2 transition ${
                selectedInvoice?.id === ord.id
                  ? 'border-emerald-600 bg-emerald-50/40 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white'
              }`}
            >
              <div className="flex justify-between items-center text-xs font-mono font-bold">
                <span className="text-slate-900">{ord.orderNumber}</span>
                <span className="text-emerald-700">{formatPrice(ord.grandTotal)}</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Date: {new Date(ord.createdAt).toLocaleDateString('en-IN')}
              </p>
            </button>
          ))}
        </div>

        {/* Printable Tax Invoice Document Preview */}
        <div className="lg:col-span-8">
          {selectedInvoice ? (
            <div className="bg-white border border-slate-300 rounded-2xl p-8 shadow-xl space-y-6 text-xs text-slate-800 font-sans print:shadow-none print:border-none">
              {/* Header */}
              <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-slate-900 text-amber-500 flex items-center justify-center font-bold">
                      <Flame className="w-5 h-5 fill-amber-500" />
                    </div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      BHARAT THERMIC HEAVY ENG. PVT. LTD.
                    </h3>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Plot C-42, Chakan Industrial Area Phase II, Pune, MH - 410501
                  </p>
                  <p className="font-mono text-[11px] text-slate-700 font-bold mt-0.5">
                    GSTIN: 27AAACB9876F1ZB | State: Maharashtra (27)
                  </p>
                </div>

                <div className="text-right">
                  <span className="bg-slate-900 text-amber-400 font-black text-sm px-3 py-1 rounded inline-block uppercase tracking-wider">
                    TAX INVOICE
                  </span>
                  <p className="font-mono text-sm font-extrabold text-slate-900 mt-2">
                    INV-{selectedInvoice.orderNumber.replace('ORD-', '')}
                  </p>
                  <p className="text-[11px] text-slate-500">Date: {new Date(selectedInvoice.createdAt).toLocaleDateString('en-IN')}</p>
                </div>
              </div>

              {/* Billed To / Shipped To Grid */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-[11px]">
                <div>
                  <strong className="text-slate-900 font-sans text-xs block mb-1">Billed To (Customer):</strong>
                  <p className="font-bold text-slate-900">{selectedInvoice.companyName}</p>
                  <p>{selectedInvoice.billingAddress.street}, {selectedInvoice.billingAddress.city}</p>
                  <p>{selectedInvoice.billingAddress.state} - {selectedInvoice.billingAddress.pincode}</p>
                  <p className="text-sky-800 font-bold">GSTIN: {selectedInvoice.gstin}</p>
                </div>

                <div>
                  <strong className="text-slate-900 font-sans text-xs block mb-1">Shipped To (Plant Site):</strong>
                  <p className="font-bold text-slate-900">{selectedInvoice.shippingAddress.companyName}</p>
                  <p>{selectedInvoice.shippingAddress.street}, {selectedInvoice.shippingAddress.city}</p>
                  <p>{selectedInvoice.shippingAddress.state} - {selectedInvoice.shippingAddress.pincode}</p>
                  <p className="text-sky-800 font-bold">GSTIN: {selectedInvoice.shippingAddress.gstin}</p>
                </div>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left">
                  <thead className="bg-slate-900 text-white text-[11px] font-mono">
                    <tr>
                      <th className="p-2.5">Item Description</th>
                      <th className="p-2.5">HSN Code</th>
                      <th className="p-2.5 text-center">Qty</th>
                      <th className="p-2.5 text-right">Rate</th>
                      <th className="p-2.5 text-right">Taxable Amt</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-mono">
                    {selectedInvoice.items.map((it, idx) => (
                      <tr key={idx}>
                        <td className="p-2.5 font-sans font-bold text-slate-900">{it.name}</td>
                        <td className="p-2.5">{it.hsnCode}</td>
                        <td className="p-2.5 text-center">{it.quantity}</td>
                        <td className="p-2.5 text-right">{formatPrice(it.unitPrice)}</td>
                        <td className="p-2.5 text-right font-bold">{formatPrice(it.totalPrice)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total Calculation */}
              <div className="flex justify-end">
                <div className="w-72 space-y-1.5 font-mono text-right text-xs">
                  <div className="flex justify-between">
                    <span>Taxable Amount:</span>
                    <strong>{formatPrice(selectedInvoice.taxableAmount)}</strong>
                  </div>

                  {selectedInvoice.isInterstate ? (
                    <div className="flex justify-between text-slate-700">
                      <span>IGST @ 18%:</span>
                      <strong>{formatPrice(selectedInvoice.igst)}</strong>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between text-slate-700">
                        <span>CGST @ 9%:</span>
                        <strong>{formatPrice(selectedInvoice.cgst)}</strong>
                      </div>
                      <div className="flex justify-between text-slate-700">
                        <span>SGST @ 9%:</span>
                        <strong>{formatPrice(selectedInvoice.sgst)}</strong>
                      </div>
                    </>
                  )}

                  <div className="flex justify-between">
                    <span>Freight Transport:</span>
                    <strong>{formatPrice(selectedInvoice.freightAmount)}</strong>
                  </div>

                  <div className="flex justify-between border-t-2 border-slate-900 pt-1 text-sm font-black text-slate-900">
                    <span>Grand Total:</span>
                    <span className="text-amber-600">{formatPrice(selectedInvoice.grandTotal)}</span>
                  </div>
                </div>
              </div>

              {/* Footer Declaration */}
              <div className="pt-4 border-t border-slate-200 flex justify-between items-end text-[10px] text-slate-500">
                <div>
                  <p>Computer generated tax invoice. Subject to Pune jurisdiction.</p>
                  <p>Form IIIC IBR Compliance documents attached with shipment.</p>
                </div>
                <div className="text-right font-mono font-bold text-slate-900">
                  For Pandey Ji Iron Works Pvt. Ltd.
                  <br />
                  <span className="text-slate-400 font-normal italic">Authorized Signatory</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-500">
              Select an invoice from left column to view details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
