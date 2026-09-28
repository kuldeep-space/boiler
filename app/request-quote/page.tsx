'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { RoleSwitcher } from '../../components/layout/RoleSwitcher';
import { useAppStore } from '../../lib/store';
import { ClipboardList, ShieldCheck, CheckCircle2, Building2, MapPin, Calendar, FileText, Upload, ArrowRight } from 'lucide-react';

export default function RequestQuotePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const productIdParam = searchParams.get('productId') || '';

  const { products, user, createQuote } = useAppStore();

  const selectedProduct = products.find((p) => p.id === productIdParam) || products[0];

  const [productId, setProductId] = useState<string>(selectedProduct.id);
  const [quantity, setQuantity] = useState<number>(1);
  const [companyName, setCompanyName] = useState(user.companyName);
  const [contactPerson, setContactPerson] = useState(user.fullName);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [gstin, setGstin] = useState(user.gstin);
  const [deliveryState, setDeliveryState] = useState('Maharashtra');
  const [deliveryCity, setDeliveryCity] = useState('Palghar');
  const [deliveryPincode, setDeliveryPincode] = useState('401506');
  const [requiredDate, setRequiredDate] = useState('2026-11-30');
  const [pressureReq, setPressureReq] = useState('14.0 kg/cm² (g)');
  const [fuelReq, setFuelReq] = useState('Biomass Pellets / Wood');
  const [notes, setNotes] = useState('');
  const [attachment, setAttachment] = useState<string>('');
  const [submitted, setSubmitted] = useState(false);
  const [createdQuoteNumber, setCreatedQuoteNumber] = useState('');

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const targetProduct = products.find((p) => p.id === productId);

    const newQuote = createQuote({
      productId: targetProduct?.id,
      productName: targetProduct ? targetProduct.name : 'Custom Boiler Plant Requirement',
      quantity,
      customerId: user.id,
      companyName,
      contactPerson,
      phone,
      email,
      gstin,
      deliveryState,
      deliveryCity,
      deliveryPincode,
      requiredDeliveryDate: requiredDate,
      specsRequired: {
        'Required Operating Pressure': pressureReq,
        'Fuel Preference': fuelReq
      },
      items: [],
      notes,
      attachmentName: attachment || undefined
    });

    setCreatedQuoteNumber(newQuote.quoteNumber);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: '#eeebe3' }}>
      <RoleSwitcher />
      <Header />

      {/* Hero Header (40px radius card) */}
      <div className="px-4 pt-6 sm:pt-8 max-w-4xl mx-auto w-full">
        <div
          className="p-8 sm:p-12 text-white text-center relative overflow-hidden"
          style={{
            backgroundColor: '#171e19',
            borderRadius: '40px',
            boxShadow: '0 20px 50px -12px rgba(23, 30, 25, 0.25)',
          }}
        >
          <div
            className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none blur-3xl opacity-20"
            style={{ backgroundColor: '#b7c6c2' }}
          />
          <div className="relative z-10 space-y-3">
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider text-white"
              style={{ backgroundColor: '#ca0013' }}
            >
              <ClipboardList className="w-4 h-4 text-white" />
              Official B2B RFQ Wizard
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Request a Technical Commercial Quote (RFQ)
            </h1>
            <p className="text-xs sm:text-sm text-[#b7c6c2] font-semibold max-w-xl mx-auto">
              Get an itemized quotation including boiler equipment, auxiliary package, IBR Form IIIC certification fees, freight transport, and installation terms.
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 py-8 flex-1 w-full">
        {submitted ? (
          <div className="bg-white border border-emerald-200 rounded-2xl p-8 text-center space-y-6 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest block">
                Quote Request Registered
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900">
                RFQ Reference: <span className="font-mono text-sky-700">{createdQuoteNumber}</span>
              </h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Thank you for submitting your boiler requirement. Our sales engineering team at Pune Works will review your specifications and issue a detailed proposal to your account dashboard within 4 business hours.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 max-w-md mx-auto text-left space-y-1 font-mono">
              <div><strong>Company:</strong> {companyName}</div>
              <div><strong>GSTIN:</strong> {gstin}</div>
              <div><strong>Destination:</strong> {deliveryCity}, {deliveryState}</div>
              <div><strong>Equipment:</strong> {products.find(p => p.id === productId)?.name}</div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => router.push('/account/quotes')}
                className="px-6 py-3 bg-slate-900 text-white font-bold text-xs rounded-xl shadow hover:bg-slate-800 transition flex items-center gap-2"
              >
                Track Quote in Account <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 bg-slate-100 text-slate-800 font-semibold text-xs rounded-xl hover:bg-slate-200 transition"
              >
                Submit Another RFQ
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleQuoteSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-8">
            {/* Step 1: Equipment Selection */}
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">1</span>
                Boiler Equipment & Quantity
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Boiler Equipment *</label>
                  <select
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600"
                    required
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.capacity})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Required Quantity *</label>
                  <input
                    type="number"
                    min={1}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-900"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Step 2: B2B Company & Tax Details */}
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">2</span>
                Company & GST Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Registered Company Name *</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Apex Textile Processors Pvt. Ltd."
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">GSTIN Number *</label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value.toUpperCase())}
                    placeholder="27AAACA1234F1Z5"
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono uppercase"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Contact Person Name *</label>
                  <input
                    type="text"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile / Phone Number *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                    required
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Corporate Email Address *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Logistics & Technical Specs */}
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2">
                <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center font-bold">3</span>
                Site Logistics & Operating Parameters
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Delivery State *</label>
                  <select
                    value={deliveryState}
                    onChange={(e) => setDeliveryState(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Delhi">Delhi NCR</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City / Industrial Area *</label>
                  <input
                    type="text"
                    value={deliveryCity}
                    onChange={(e) => setDeliveryCity(e.target.value)}
                    placeholder="e.g. Tarapur MIDC"
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pincode *</label>
                  <input
                    type="text"
                    value={deliveryPincode}
                    onChange={(e) => setDeliveryPincode(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Operating Pressure</label>
                  <input
                    type="text"
                    value={pressureReq}
                    onChange={(e) => setPressureReq(e.target.value)}
                    placeholder="14.0 kg/cm²"
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Fuel Preference</label>
                  <input
                    type="text"
                    value={fuelReq}
                    onChange={(e) => setFuelReq(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Required Site Delivery Date *</label>
                  <input
                    type="date"
                    value={requiredDate}
                    onChange={(e) => setRequiredDate(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Additional Plant Requirements / Piping Scope</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Mention civil foundation layout requirements, chimney height (15m/30m), deaerator tank capacity, turn-key erection..."
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Attach Layout Drawing / Tender RFQ (Optional)</label>
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-dashed border-slate-300">
                  <Upload className="w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    value={attachment}
                    onChange={(e) => setAttachment(e.target.value)}
                    placeholder="Enter file name (e.g. Plant_Layout_Tarapur_v2.pdf)"
                    className="w-full bg-transparent text-xs text-slate-900 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>IBR Accredited Engineering Review | Confidential Proposal</span>
              </div>

              <button
                type="submit"
                className="px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-lg transition flex items-center gap-2"
              >
                Submit Quote Request <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
