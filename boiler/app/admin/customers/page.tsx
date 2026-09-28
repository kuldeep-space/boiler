'use client';

import React from 'react';
import { useAppStore } from '../../../lib/store';
import { Users, ShieldCheck, MapPin } from 'lucide-react';

export default function AdminCustomersPage() {
  const { user, orders } = useAppStore();

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <Users className="w-5 h-5 text-sky-700" />
          B2B Customer Directory & GSTIN Verification
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Registered industrial clients, plant heads, GSTIN tax credentials, and order history.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-700">
            <thead className="bg-slate-100 font-bold uppercase text-[10px] text-slate-600">
              <tr>
                <th className="p-3">Company & Contact</th>
                <th className="p-3">GSTIN Number</th>
                <th className="p-3">Primary State</th>
                <th className="p-3">Total Orders</th>
                <th className="p-3 text-right">Verification Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              <tr className="hover:bg-slate-50">
                <td className="p-3">
                  <strong className="text-slate-900 text-sm block">{user.companyName}</strong>
                  <span className="text-slate-500 text-[11px]">{user.fullName} ({user.email} | {user.phone})</span>
                </td>
                <td className="p-3 font-mono font-bold text-sky-800">{user.gstin}</td>
                <td className="p-3 font-mono">Maharashtra (27)</td>
                <td className="p-3 font-mono font-bold">{orders.length} Orders</td>
                <td className="p-3 text-right">
                  <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase flex items-center gap-1 justify-end">
                    <ShieldCheck className="w-3.5 h-3.5" /> GSTIN Active
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
