'use client';

import React, { useState } from 'react';
import { useAppStore } from '../../../lib/store';
import { MapPin, Plus, ShieldCheck } from 'lucide-react';

export default function CustomerAddressesPage() {
  const { user, addOrUpdateAddress } = useAppStore();
  const [showAddModal, setShowAddModal] = useState(false);

  const [companyName, setCompanyName] = useState(user.companyName);
  const [contactName, setContactName] = useState(user.fullName);
  const [phone, setPhone] = useState(user.phone);
  const [gstin, setGstin] = useState(user.gstin);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Maharashtra');
  const [stateCode, setStateCode] = useState('27');
  const [pincode, setPincode] = useState('');

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    addOrUpdateAddress({
      companyName,
      contactName,
      phone,
      email: user.email,
      gstin,
      street,
      city,
      state,
      stateCode,
      pincode,
      isDefault: user.addresses.length === 0
    });
    setShowAddModal(false);
    alert('Address saved to address book!');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-sky-700" />
            Address Book & Plant Sites ({user.addresses.length})
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage billing addresses and delivery plant sites across Indian states with specific GSTINs.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 text-amber-400" /> Add New Plant Site Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {user.addresses.map((addr) => (
          <div key={addr.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <strong className="font-extrabold text-sm text-slate-900">{addr.companyName}</strong>
              {addr.isDefault && (
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  DEFAULT BILLING
                </span>
              )}
            </div>

            <p className="text-slate-700 leading-relaxed font-medium">
              {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
            </p>

            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-mono text-[11px] space-y-1">
              <div>GSTIN: <strong className="text-sky-800">{addr.gstin}</strong></div>
              <div>State Code: <strong className="text-slate-900">{addr.stateCode}</strong></div>
              <div>Contact: <strong className="text-slate-800">{addr.contactName} ({addr.phone})</strong></div>
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <form onSubmit={handleAddAddress} className="bg-white border border-slate-300 p-6 rounded-2xl space-y-4 shadow-xl">
          <h3 className="font-extrabold text-sm text-slate-900">Add New Manufacturing Plant Address</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Company Unit Name</label>
              <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl" required />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">GSTIN Number for Site</label>
              <input type="text" value={gstin} onChange={(e) => setGstin(e.target.value.toUpperCase())} className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono uppercase" required />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Street Address / Plot / MIDC</label>
              <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl" required />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">City</label>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl" required />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">State</label>
              <select value={state} onChange={(e) => { setState(e.target.value); setStateCode(e.target.value === 'Gujarat' ? '24' : '27'); }} className="w-full p-2.5 bg-slate-50 border rounded-xl">
                <option value="Maharashtra">Maharashtra (27)</option>
                <option value="Gujarat">Gujarat (24)</option>
                <option value="Delhi">Delhi NCR (07)</option>
                <option value="Tamil Nadu">Tamil Nadu (33)</option>
                <option value="Karnataka">Karnataka (29)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Pincode</label>
              <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono" required />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Plant Head / Manager</label>
              <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl" required />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-100 text-xs font-bold rounded-xl">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl">Save Address</button>
          </div>
        </form>
      )}
    </div>
  );
}
