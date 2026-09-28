'use client';

import React, { useState } from 'react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { RoleSwitcher } from '../../components/layout/RoleSwitcher';
import { COMPANY_DETAILS } from '../../lib/sampleData';
import { MapPin, PhoneCall, Mail, Send, CheckCircle2 } from 'lucide-react';

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
    fetch('/api/catalog/queries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ customer_name: name || company || 'Website Contact Lead', customer_phone: phone || '', customer_email: email || '', message: (company ? '[' + company + '] ' : '') + message })
    }).catch((err) => console.warn('Could not post contact query:', err));
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#eeebe3' }}>
      <RoleSwitcher />
      <Header />

      <div className="py-12 px-4" style={{ backgroundColor: '#171e19' }}>
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="font-mono text-xs font-bold uppercase tracking-wider block" style={{ color: '#b7c6c2' }}>Direct Factory Contact</span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">Contact Pandey Ji Iron Works</h1>
          <p className="text-xs sm:text-sm max-w-xl mx-auto" style={{ color: '#b7c6c2' }}>Get in touch with our boiler manufacturing plant at Thanagazi (Rajasthan) for technical sales, pricing, and service support.</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12 flex-1 w-full pb-24 md:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">

          <div className="lg:col-span-5 space-y-4">
            <div className="p-6 space-y-5 text-xs" style={{ backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid rgba(183,198,194,0.3)', boxShadow: '0 10px 30px -5px rgba(0,0,0,0.06)' }}>
              <h3 className="font-extrabold text-base pb-3" style={{ color: '#171e19', borderBottom: '1px solid rgba(183,198,194,0.3)' }}>Factory &amp; Head Office</h3>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(202,0,19,0.1)' }}><MapPin className="w-4 h-4" style={{ color: '#ca0013' }} /></div>
                <div>
                  <strong className="text-sm block font-black" style={{ color: '#171e19' }}>Pandey Ji Iron Works</strong>
                  <p className="mt-1 leading-relaxed font-semibold" style={{ color: '#6B7280' }}>{COMPANY_DETAILS.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(23,30,25,0.08)' }}><PhoneCall className="w-4 h-4" style={{ color: '#171e19' }} /></div>
                <div>
                  <strong className="text-sm block font-black" style={{ color: '#171e19' }}>Call Us</strong>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <a href={`tel:${COMPANY_DETAILS.phone}`} className="font-bold text-sm font-mono hover:underline" style={{ color: '#ca0013' }}>{COMPANY_DETAILS.phone}</a>
                    <span style={{ color: '#b7c6c2' }}>/</span>
                    <a href={`tel:${COMPANY_DETAILS.phone2}`} className="font-bold text-sm font-mono hover:underline" style={{ color: '#ca0013' }}>{COMPANY_DETAILS.phone2}</a>
                  </div>
                  <p className="text-[11px] mt-0.5" style={{ color: '#b7c6c2' }}>Available 8:00 AM - 8:00 PM IST (Mon - Sat)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: 'rgba(183,198,194,0.2)' }}><Mail className="w-4 h-4" style={{ color: '#171e19' }} /></div>
                <div>
                  <strong className="text-sm block font-black" style={{ color: '#171e19' }}>Email Enquiries</strong>
                  <a href={`mailto:${COMPANY_DETAILS.email}`} className="font-medium hover:underline" style={{ color: '#6B7280' }}>{COMPANY_DETAILS.email}</a>
                </div>
              </div>

              <div className="p-4 space-y-1 font-mono text-[11px]" style={{ backgroundColor: 'rgba(238,235,227,0.7)', borderRadius: '12px', border: '1px solid rgba(183,198,194,0.3)' }}>
                <strong className="block font-sans text-xs" style={{ color: '#171e19' }}>GSTIN &amp; Registration:</strong>
                <div style={{ color: '#6B7280' }}>GSTIN: <strong style={{ color: '#171e19' }}>{COMPANY_DETAILS.gstin}</strong> (Rajasthan)</div>
                <div style={{ color: '#6B7280' }}>IBR Authority: Chief Inspector of Boilers, Rajasthan</div>
              </div>
            </div>

            <div className="p-5 space-y-2 text-xs" style={{ backgroundColor: '#171e19', borderRadius: '20px' }}>
              <strong className="block font-bold text-sm" style={{ color: '#ca0013' }}>Location Reference</strong>
              <p style={{ color: '#b7c6c2' }}>Opposite Jyoti School, Pratapgarh Road, Thanagazi, Alwar District, Rajasthan 301022.</p>
              <div className="pt-1 font-mono text-[11px]" style={{ color: '#6B7280' }}>Pan-India Heavy Hydraulic Trailer Dispatch</div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {submitted ? (
              <div className="p-8 text-center space-y-4" style={{ backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid rgba(183,198,194,0.3)', boxShadow: '0 10px 30px -5px rgba(0,0,0,0.06)' }}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: 'rgba(202,0,19,0.1)' }}>
                  <CheckCircle2 className="w-8 h-8" style={{ color: '#ca0013' }} />
                </div>
                <h3 className="font-extrabold text-xl" style={{ color: '#171e19' }}>Enquiry Submitted to Factory</h3>
                <p className="text-xs max-w-md mx-auto font-semibold" style={{ color: '#6B7280' }}>Thank you for reaching out to Pandey Ji Iron Works. Our Thanagazi sales team will contact you at <strong style={{ color: '#171e19' }}>{phone}</strong> within 2 hours.</p>
                <button onClick={() => setSubmitted(false)} className="btn-secondary px-6 py-2.5 font-bold text-xs">Send Another Message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 text-xs" style={{ backgroundColor: '#ffffff', borderRadius: '24px', border: '1px solid rgba(183,198,194,0.3)', boxShadow: '0 10px 30px -5px rgba(0,0,0,0.06)' }}>
                <h3 className="font-extrabold text-base pb-3" style={{ color: '#171e19', borderBottom: '1px solid rgba(183,198,194,0.3)' }}>Send Boiler Technical Query / Call Request</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Your Name *', type: 'text', value: name, setter: setName, placeholder: 'e.g. Ramesh Chandra', required: true },
                    { label: 'Company Name (Optional)', type: 'text', value: company, setter: setCompany, placeholder: 'e.g. Modern Textiles Pvt Ltd', required: false },
                    { label: 'Phone / Mobile *', type: 'tel', value: phone, setter: setPhone, placeholder: '96804 29713', required: true },
                    { label: 'Email Address (Optional)', type: 'email', value: email, setter: setEmail, placeholder: 'name@company.com', required: false },
                  ].map(({ label, type, value, setter, placeholder, required }) => (
                    <div key={label}>
                      <label className="block font-bold mb-1" style={{ color: '#171e19' }}>{label}</label>
                      <input type={type} value={value} onChange={(e) => setter(e.target.value)} placeholder={placeholder} required={required} className="w-full p-3 outline-none transition-all" style={{ backgroundColor: 'rgba(238,235,227,0.5)', borderRadius: '12px', border: '1px solid rgba(183,198,194,0.4)', color: '#171e19' }} />
                    </div>
                  ))}

                  <div className="sm:col-span-2">
                    <label className="block font-bold mb-1" style={{ color: '#171e19' }}>Boiler Capacity &amp; Requirement Details *</label>
                    <textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Specify required steam capacity (200-1000 kg), fuel type (Wood/Sawdust), operating pressure, and delivery location..." required className="w-full p-3 outline-none resize-none transition-all" style={{ backgroundColor: 'rgba(238,235,227,0.5)', borderRadius: '12px', border: '1px solid rgba(183,198,194,0.4)', color: '#171e19' }} />
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button type="submit" className="btn-primary px-8 py-3.5 text-xs font-black uppercase tracking-wider flex items-center gap-2">
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