'use client';

import React from 'react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { RoleSwitcher } from '../../components/layout/RoleSwitcher';
import { ShieldCheck, Award, FileText, CheckCircle2 } from 'lucide-react';

export default function CertificationsPage() {
  const certs = [
    { title: 'IBR 1950 Registration (Form IIIC)', desc: 'Full statutory approval by Chief Inspector of Boilers for high pressure steam vessels.', code: 'CIB-RJ-1950-FORM3C' },
    { title: 'ISO 9001:2015 Quality Management', desc: 'Certified manufacturing process standards at Thanagazi Works, Rajasthan.', code: 'ISO-9001-QMS-8812' },
    { title: 'ASME Section I & VIII Alignment', desc: 'Conforming to international boiler and pressure vessel design specifications.', code: 'ASME-SEC-1' },
    { title: 'CPCB Environment Emission Compliance', desc: 'Flue gas particulate emission level under 50 mg/Nm³ with multi-cyclone dust collectors.', code: 'CPCB-ENV-2026' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <RoleSwitcher />
      <Header />

      <div className="bg-slate-900 text-white py-12 px-4 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-wider block">
            Regulatory Approvals & Compliance
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            IBR & Quality Certifications
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            All boilers manufactured at Pandey Ji Iron Works strictly adhere to Indian Boiler Regulations 1950.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12 flex-1 w-full space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certs.map((c, i) => (
            <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <ShieldCheck className="w-8 h-8 text-emerald-600" />
                <span className="bg-slate-900 text-amber-400 font-mono text-[10px] font-bold px-2.5 py-1 rounded">
                  {c.code}
                </span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">{c.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
