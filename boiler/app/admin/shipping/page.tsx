'use client';

import React from 'react';
import { useAppStore } from '../../../lib/store';
import { Truck, MapPin } from 'lucide-react';

export default function AdminShippingPage() {
  const { freightZones } = useAppStore();

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <Truck className="w-5 h-5 text-amber-500" />
          Heavy Industrial Freight Matrix & Zone Rules ({freightZones.length})
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Configure hydraulic low-bed trailer transport rates by Indian state zones, weight per ton, and estimated transit days.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-700">
            <thead className="bg-slate-100 font-bold uppercase text-[10px] text-slate-600">
              <tr>
                <th className="p-3">Destination State</th>
                <th className="p-3">Logistics Zone</th>
                <th className="p-3">Base Per Ton Rate</th>
                <th className="p-3">Flat Trailer Rate</th>
                <th className="p-3 text-right">Est. Transit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {freightZones.map((fz) => (
                <tr key={fz.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">{fz.stateName}</td>
                  <td className="p-3 font-mono font-bold text-sky-700">{fz.zone} Zone</td>
                  <td className="p-3 font-mono">{formatPrice(fz.baseFreightPerTon)} / Ton</td>
                  <td className="p-3 font-mono font-bold text-amber-600">{formatPrice(fz.flatRate)}</td>
                  <td className="p-3 text-right font-mono font-bold">{fz.estimatedTransitDays} Days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
