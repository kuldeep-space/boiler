'use client';

import React from 'react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { RoleSwitcher } from '../../components/layout/RoleSwitcher';
import { Building2, CheckCircle2, MapPin } from 'lucide-react';

export default function ProjectsPage() {
  const projects = [
    { title: '5.0 TPH Biomass Boiler Installation', client: 'Apex Textile Park, Solapur (MH)', capacity: '5,000 kg/hr @ 17.5 bar', year: '2026' },
    { title: '10 Lac Kcal Thermic Fluid Heater Unit', client: 'Gujarat Resins Hub, Ankleshwar (GJ)', capacity: '1,000,000 Kcal @ 300°C', year: '2025' },
    { title: '2.0 TPH Dual Fuel PNG Package Boiler', client: 'Pharma Formulation Hub, Baddi (HP)', capacity: '2,000 kg/hr @ 10.5 bar', year: '2025' },
    { title: '100 kW Clean Room Electric Generator', client: 'Apollo CSSD Hospital Unit, New Delhi', capacity: '150 kg/hr @ 7.0 bar', year: '2026' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <RoleSwitcher />
      <Header />

      <div className="bg-slate-900 text-white py-12 px-4 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-wider block">
            Pan-India Installations
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Case Studies & Project Installations
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Explore turnkey boiler installations executed by Pandey Ji Iron Works across India.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12 flex-1 w-full space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="bg-slate-900 text-amber-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                  Year {p.year}
                </span>
                <span className="text-xs text-slate-400 font-mono">{p.capacity}</span>
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">{p.title}</h3>
              <p className="text-xs font-bold text-sky-700 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> {p.client}
              </p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
