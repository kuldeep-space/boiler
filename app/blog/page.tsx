'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { RoleSwitcher } from '../../components/layout/RoleSwitcher';
import { FileText, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const articles = [
    { title: 'Biomass Briquette Conversion: Lowering Boiler Fuel Costs by 40%', date: 'Sept 15, 2026', readTime: '5 min read' },
    { title: 'Annual IBR Inspection Guide: Key Form IIIC Renewal Checklist', date: 'Aug 28, 2026', readTime: '7 min read' },
    { title: 'Preventing Tube Scale: Why Automatic Water Softeners Save Boiler Tubes', date: 'July 10, 2026', readTime: '4 min read' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <RoleSwitcher />
      <Header />

      <div className="bg-slate-900 text-white py-12 px-4 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-wider block">
            Engineering Insights
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
            Industrial Boiler Articles & Energy Guides
          </h1>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-12 flex-1 w-full space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art, i) => (
            <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-3">
              <span className="text-[11px] text-slate-400 font-mono">{art.date} | {art.readTime}</span>
              <h3 className="font-extrabold text-slate-900 text-base">{art.title}</h3>
              <Link href="/products" className="text-xs font-bold text-sky-700 hover:underline flex items-center gap-1 pt-2">
                Read Full Article <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
