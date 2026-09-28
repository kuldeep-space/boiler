'use client';

import React, { useState } from 'react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { RoleSwitcher } from '../../components/layout/RoleSwitcher';
import { COMPANY_DETAILS } from '../../lib/sampleData';
import { MapPin, PhoneCall, Mail, Clock, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function ContactUsPage() {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <RoleSwitcher />
      <Header />

      <div className="bg-slate-900 text-white py-12 px-4 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-wider block">
            Direct Factory Contact
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Contact Pandey Ji Iron Works
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Get in touch with our boiler manufacturing plant at Thanagazi (Rajasthan) for technical sales, IBR quotes, and site service support.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12 flex-1 w-full space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-5 text-xs text-slate-700">
              <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">
                Factory & Head Office
              </h3>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-slate-900 text-sm block">Pandey Ji Iron Works</strong>
                  <p className="text-slate-600 mt-1 leading-relaxed">
                    {COMPANY_DETAILS.address}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-900 flex items-center justify-center shrink-0">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-slate-900 text-sm block">Direct Phone Hotline</strong>
                  <a href={`tel:${COMPANY_DETAILS.phone}`} className="text-sky-700 font-bold text-sm hover:underline font-mono">
                    {COMPANY_DETAILS.phone}
                  </a>
                  <p className="text-slate-500 text-[11px] mt-0.5">Available 8:00 AM - 8:00 PM IST (Mon - Sat)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="text-slate-900 text-sm block">Email Enquiries</strong>
                  <a href={`mailto:${COMPANY_DETAILS.email}`} className="text-slate-800 font-medium hover:underline">
                    {COMPANY_DETAILS.email}
                  </a>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1 font-mono text-[11px]">
                <strong className="text-slate-900 block font-sans">GSTIN & Regulatory Registration:</strong>
                <div>GSTIN: <strong className="text-sky-800">{COMPANY_DETAILS.gstin}</strong> (Rajasthan State)</div>
                <div>IBR Authority: Chief Inspector of Boilers, Rajasthan</div>
              </div>
            </div>

            {/* Map Placeholder Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md border border-slate-800 space-y-2 text-xs">
              <strong className="text-amber-400 block font-bold text-sm">Location Map Reference</strong>
              <p className="text-slate-300">
                Opposite Jyoti School, Pratapgarh Road, Thanagazi, Alwar District, Rajasthan 301022.
              </p>
              <div className="pt-2 text-[11px] text-slate-400 font-mono">
                Pan-India Heavy Hydraulic Trailer Dispatch Yard
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="bg-white border border-emerald-200 rounded-2xl p-8 text-center space-y-4 shadow-sm">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-extrabold text-xl text-slate-900">Enquiry Submitted to Factory</h3>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Thank you for reaching out to Pandey Ji Iron Works. Our Thanagazi sales team will contact you at {phone} within 2 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4 text-xs">
                <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">
                  Send Boiler Technical Query / Call Request
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ramesh Chandra"
                      className="w-full p-3 bg-slate-50 border rounded-xl"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Company Name *</label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="e.g. Modern Textiles Pvt Ltd"
                      className="w-full p-3 bg-slate-50 border rounded-xl"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone / Mobile Number *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="096804 29713"
                      className="w-full p-3 bg-slate-50 border rounded-xl font-mono"
                      required
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ramesh@company.com"
                      className="w-full p-3 bg-slate-50 border rounded-xl"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Boiler Capacity & Details Needed *</label>
                    <textarea
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Specify required steam flow (TPH), fuel type (Biomass pellet/Wood/Gas), operating pressure, and site pincode..."
                      className="w-full p-3 bg-slate-50 border rounded-xl"
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl shadow transition flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Submit Enquiry to Factory
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
