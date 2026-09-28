'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { RoleSwitcher } from '../../components/layout/RoleSwitcher';
import { COMPANY_DETAILS } from '../../lib/sampleData';
import { Flame, ShieldCheck, MapPin, Award, Factory, Users, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <RoleSwitcher />
      <Header />

      {/* Hero */}
      <div className="bg-slate-900 text-white py-16 px-4 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-wider block">
            About Pandey Ji Iron Works
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Pioneering Steam Boiler Manufacturing in India
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Manufactured at Thanagazi (Rajasthan) and supplied to over 2,500 process industries across India with full IBR 1950 compliance.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12 flex-1 w-full space-y-12">
        {/* Company Overview & Works */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-bold text-sky-700 uppercase tracking-widest block">
              Manufacturing Heritage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              High Performance Industrial Boilers Built for Indian Operating Conditions
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Pandey Ji Iron Works, situated on Pratapgarh Road in Thanagazi (Rajasthan), is one of India&apos;s leading manufacturers of Package Steam Boilers, Thermic Fluid Heaters, and Pressure Vessels.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              With deep engineering expertise in biomass fuel combustion, waste heat recovery, and dual-fuel burners, our boilers deliver maximum thermal energy with minimal operational costs. Every boiler manufactured at our works undergoes stringent X-ray weld testing and hydraulic testing under Chief Inspector of Boilers (CIB) supervision.
            </p>

            <div className="bg-white border border-slate-200 p-4 rounded-xl space-y-2 text-xs text-slate-700 font-mono">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
                <span><strong>Works Address:</strong> {COMPANY_DETAILS.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Phone:</strong> {COMPANY_DETAILS.phone} | GSTIN: {COMPANY_DETAILS.gstin}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 shadow-xl bg-slate-900">
              <img
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
                alt="Pandey Ji Iron Works Factory"
                className="w-full h-80 object-cover"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur p-3 rounded-xl text-xs text-white">
                <strong className="text-amber-400 block font-bold">Thanagazi Manufacturing Facility</strong>
                <p className="text-[11px] text-slate-300">Pratapgarh Road, opp. Jyoti School, Thanagazi, Rajasthan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars of Quality */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-2">
            <Award className="w-6 h-6 text-amber-500" />
            <h3 className="font-extrabold text-slate-900 text-sm">IBR 1950 Accreditation</h3>
            <p className="text-xs text-slate-500">Form IIIC inspection certificates issued for all steam boilers manufactured at Thanagazi works.</p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-2">
            <Factory className="w-6 h-6 text-sky-600" />
            <h3 className="font-extrabold text-slate-900 text-sm">Pan-India Freight Logistics</h3>
            <p className="text-xs text-slate-500">Heavy hydraulic trailer dispatch to all 28 states and Union Territories across India.</p>
          </div>

          <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-2">
            <Users className="w-6 h-6 text-emerald-600" />
            <h3 className="font-extrabold text-slate-900 text-sm">24/7 Service Engineers</h3>
            <p className="text-xs text-slate-500">On-site annual IBR renewal assistance and 24-hour spare part dispatches.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
