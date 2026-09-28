'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { RoleSwitcher } from '../../components/layout/RoleSwitcher';
import { Factory, Building2, Droplets, Flame, CheckCircle2, Zap, Users, Wrench, ArrowRight } from 'lucide-react';

export default function IndustriesPage() {
  const industries = [
    { title: 'Textile Processing & Dyeing', desc: 'Continuous steam supply for stenter machines, fabric dyeing vats, and drying cylinders.', icon: Factory },
    { title: 'Pharmaceutical & Chemicals', desc: 'Clean steam boilers for reactors, sterile formulation cleanrooms, and resin plants.', icon: Building2 },
    { title: 'Food Processing & Dairies', desc: 'Hygienic steam for milk pasteurization, starch cooking, and steam kettles.', icon: Droplets },
    { title: 'Paper & Board Packaging', desc: 'High pressure steam boilers for corrugation lines and paper drying drums.', icon: Wrench },
    { title: 'Plywood & Wood Presses', desc: 'High temperature thermic fluid heating up to 320°C for hot press machines.', icon: Flame },
    { title: 'Hospitality & Commercial', desc: 'Pressurised hot water generators for central heating, laundries, and HVAC.', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <RoleSwitcher />
      <Header />

      <div className="bg-slate-900 text-white py-12 px-4 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-wider block">
            Custom Industrial Thermal Solutions
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Industries Powered Across India
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Pandey Ji Iron Works engineers steam boilers and heat exchangers tailored to exact manufacturing plant requirements.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12 flex-1 w-full space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind, idx) => (
            <div key={idx} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-3">
              <ind.icon className="w-8 h-8 text-amber-500" />
              <h3 className="font-extrabold text-slate-900 text-base">{ind.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{ind.desc}</p>
              <Link href="/contact" className="text-xs font-bold text-[#ca0013] hover:underline flex items-center gap-1 pt-2">
                Inquire For This Industry <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
