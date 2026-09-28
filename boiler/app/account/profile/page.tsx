'use client';

import React, { useState } from 'react';
import { useAppStore } from '../../../lib/store';
import { User, ShieldCheck } from 'lucide-react';

export default function CustomerProfilePage() {
  const { user, updateUserProfile } = useAppStore();

  const [fullName, setFullName] = useState(user.fullName);
  const [companyName, setCompanyName] = useState(user.companyName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [gstin, setGstin] = useState(user.gstin);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ fullName, companyName, email, phone, gstin });
    alert('Company profile updated successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
          <User className="w-5 h-5 text-sky-700" />
          B2B Corporate Profile & Tax Settings
        </h2>
        <p className="text-xs text-slate-500 mt-1">
          Maintain your corporate buyer credentials, GSTIN registration, and primary contact info.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Corporate Name *</label>
            <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full p-3 bg-slate-50 border rounded-xl font-bold" required />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Primary GSTIN Number *</label>
            <input type="text" value={gstin} onChange={(e) => setGstin(e.target.value.toUpperCase())} className="w-full p-3 bg-slate-50 border rounded-xl font-mono uppercase font-bold text-sky-800" required />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Contact Person Name *</label>
            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full p-3 bg-slate-50 border rounded-xl" required />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Official Email Address *</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 bg-slate-50 border rounded-xl" required />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Mobile / Phone Number *</label>
            <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3 bg-slate-50 border rounded-xl" required />
          </div>
        </div>

        <div className="pt-4 border-t flex justify-end">
          <button type="submit" className="px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition">
            Save Profile Changes
          </button>
        </div>
      </form>
    </div>
  );
}
