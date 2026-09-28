'use client';

import React, { useState } from 'react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { RoleSwitcher } from '../../components/layout/RoleSwitcher';
import { Calculator, Flame, FileText, Download } from 'lucide-react';

export default function TechnicalResourcesPage() {
  const [steamKg, setSteamKg] = useState<number>(2000);
  const [pressureBar, setPressureBar] = useState<number>(10.5);
  const [fuelType, setFuelType] = useState<'pellet' | 'png' | 'hsd'>('pellet');

  // Fuel consumption calculation
  // Pellet GCV = 4000 kcal/kg, PNG = 9500 kcal/SCM, HSD = 10200 kcal/kg
  const latentHeat = 480; // kcal/kg approx
  const totalHeatNeeded = steamKg * latentHeat;

  let fuelCons = 0;
  let unitName = 'kg/hr';
  if (fuelType === 'pellet') {
    fuelCons = Math.round(totalHeatNeeded / (4000 * 0.84));
    unitName = 'kg/hr (Pellet @ 4000 kcal/kg)';
  } else if (fuelType === 'png') {
    fuelCons = Math.round(totalHeatNeeded / (9500 * 0.91));
    unitName = 'SCM/hr (PNG Gas)';
  } else {
    fuelCons = Math.round(totalHeatNeeded / (10200 * 0.91));
    unitName = 'Litres/hr (Diesel HSD)';
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <RoleSwitcher />
      <Header />

      <div className="bg-slate-900 text-white py-12 px-4 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-wider block">
            Engineering Calculators & Steam Tables
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Steam Engineering Technical Resources
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Tools and reference datasheets for plant heads, utility engineers, and HVAC consultants.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12 flex-1 w-full space-y-8">
        {/* Interactive Boiler Fuel Consumption Calculator */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 border-b pb-3">
            <Calculator className="w-6 h-6 text-sky-700" />
            Interactive Boiler Fuel Consumption Estimator
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Steam Flow Rate (kg/hr)</label>
              <input
                type="number"
                value={steamKg}
                onChange={(e) => setSteamKg(Number(e.target.value))}
                className="w-full p-3 bg-slate-50 border rounded-xl font-mono font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Working Pressure (kg/cm²)</label>
              <input
                type="number"
                value={pressureBar}
                onChange={(e) => setPressureBar(Number(e.target.value))}
                className="w-full p-3 bg-slate-50 border rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Fuel Type</label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value as any)}
                className="w-full p-3 bg-slate-50 border rounded-xl font-bold"
              >
                <option value="pellet">Wood Pellet / Biomass Briquette</option>
                <option value="png">Natural Gas (PNG)</option>
                <option value="hsd">Diesel (HSD Oil)</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 flex items-center justify-between font-mono">
            <div>
              <span className="text-slate-400 text-xs uppercase block">Estimated Fuel Consumption:</span>
              <strong className="text-amber-400 text-3xl font-black">{fuelCons} {unitName}</strong>
            </div>
            <Flame className="w-10 h-10 text-amber-500" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
