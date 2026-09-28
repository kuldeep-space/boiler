'use client';

import React from 'react';
import { useAppStore } from '../../../lib/store';
import { Percent, ShieldCheck } from 'lucide-react';

export default function AdminGSTTaxPage() {
  const { hsnConfigs } = useAppStore();

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <Percent className="w-5 h-5 text-emerald-600" />
          Pan-India GST Tax & HSN Configuration Engine
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Admin controlled GST tax rates, HSN classification, and Intra-state (CGST+SGST) vs Inter-state (IGST) rules.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-700">
            <thead className="bg-slate-100 font-bold uppercase text-[10px] text-slate-600">
              <tr>
                <th className="p-3">HSN / SAC Code</th>
                <th className="p-3">Category Classification</th>
                <th className="p-3">Detailed Description</th>
                <th className="p-3 text-right">GST Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {hsnConfigs.map((hsn) => (
                <tr key={hsn.hsnCode} className="hover:bg-slate-50">
                  <td className="p-3 font-mono font-bold text-sky-800 text-sm">{hsn.hsnCode}</td>
                  <td className="p-3 font-bold text-slate-900">{hsn.category}</td>
                  <td className="p-3 text-slate-600">{hsn.description}</td>
                  <td className="p-3 text-right font-mono font-black text-emerald-700 text-sm">{hsn.gstRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
