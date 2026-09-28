'use client';

import React, { useState } from 'react';
import { useAppStore } from '../../../lib/store';
import { Headphones, PhoneCall, Mail, MessageSquare, CheckCircle2, Wrench } from 'lucide-react';

export default function CustomerSupportPage() {
  const { user } = useAppStore();
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('boiler_maintenance');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Headphones className="w-5 h-5 text-sky-700" />
            24/7 Technical Support & Plant Service
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Dedicated service engineers for IBR inspection assistance, burner servicing, and emergency spare part dispatches.
          </p>
        </div>

        <a
          href="tel:+9118002668899"
          className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
        >
          <PhoneCall className="w-4 h-4" /> Emergency Helpline: +91 1800 266 8899
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm space-y-1">
          <Wrench className="w-5 h-5 text-amber-600" />
          <strong className="text-slate-900 font-bold block">IBR Inspection Assistance</strong>
          <p className="text-slate-500 text-[11px]">Support with Chief Inspector of Boilers (CIB) annual hydraulic renewal.</p>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm space-y-1">
          <PhoneCall className="w-5 h-5 text-emerald-600" />
          <strong className="text-slate-900 font-bold block">On-Site Service Response</strong>
          <p className="text-slate-500 text-[11px]">24-hour engineer dispatch to industrial MIDC/GIDC hubs.</p>
        </div>

        <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm space-y-1">
          <Mail className="w-5 h-5 text-sky-600" />
          <strong className="text-slate-900 font-bold block">Spare Parts Helpline</strong>
          <p className="text-slate-500 text-[11px]">Same-day dispatch of genuine gaskets, valves, and water gauges.</p>
        </div>
      </div>

      {submitted ? (
        <div className="bg-white border border-emerald-200 p-8 rounded-2xl text-center space-y-3 shadow-sm">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h3 className="font-extrabold text-lg text-slate-900">Support Ticket Created: TKT-2026-8819</h3>
          <p className="text-xs text-slate-600 max-w-sm mx-auto">
            Our Pune Works service engineer has been assigned to your ticket. You will receive a call within 30 minutes.
          </p>
          <button onClick={() => setSubmitted(false)} className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
            Submit Another Query
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmitTicket} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-xs">
          <h3 className="font-extrabold text-slate-900 text-sm border-b border-slate-100 pb-2">
            Raise a Plant Technical Support Request
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Issue Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3 bg-slate-50 border rounded-xl font-medium">
                <option value="boiler_maintenance">Boiler Routine Maintenance & Servicing</option>
                <option value="ibr_renewal">IBR Form Form IIIC / Annual Renewal</option>
                <option value="spares_req">Emergency Spare Part Requirement</option>
                <option value="burner_fault">Burner / Control Panel Fault</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Ticket Subject *</label>
              <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Water Level Mobrey Controller Calibration" className="w-full p-3 bg-slate-50 border rounded-xl" required />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Detailed Operating Problem / Site Location *</label>
              <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Describe steam pressure issues, fuel consumption changes, error codes..." className="w-full p-3 bg-slate-50 border rounded-xl" required></textarea>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button type="submit" className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition">
              Submit Ticket
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
