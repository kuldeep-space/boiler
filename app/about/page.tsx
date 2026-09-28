'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { RoleSwitcher } from '../../components/layout/RoleSwitcher';
import { COMPANY_DETAILS } from '../../lib/sampleData';
import { ShieldCheck, MapPin, ArrowRight } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#eeebe3' }}>
      <RoleSwitcher />
      <Header />

      {/* Hero Banner */}
      <div className="py-12 px-4" style={{ backgroundColor: '#171e19' }}>
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <span className="font-mono text-xs font-bold uppercase tracking-wider block" style={{ color: '#b7c6c2' }}>
            About Pandayji Iron Works
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Pioneering Steam Boiler &amp; Khoya Machinery Manufacturing
          </h1>
          <p className="text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed" style={{ color: '#b7c6c2' }}>
            Manufactured at Thanagazi (Rajasthan) and supplied to process industries, dairies, sweet makers, and mills across India.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12 flex-1 w-full space-y-8 pb-24 md:pb-12">

        {/* Company Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center p-6 sm:p-8 lg:p-10" style={{ backgroundColor: '#ffffff', borderRadius: 'clamp(20px, 4vw, 32px)', border: '1px solid rgba(183,198,194,0.3)', boxShadow: '0 20px 50px -12px rgba(0,0,0,0.08)' }}>
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest block" style={{ color: '#ca0013' }}>Manufacturing Heritage</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#171e19' }}>
              High Performance Industrial Boilers Built for Indian Operating Conditions
            </h2>
            <p className="text-xs sm:text-sm leading-relaxed font-semibold" style={{ color: '#6B7280' }}>
              Pandayji Iron Works, situated in Thanagazi (Rajasthan), is one of India&apos;s reputed manufacturers of Wood &amp; Sawdust Fired Steam Boilers (Non-IBR), Khoya &amp; Mawa Making Machines, and heavy-duty steam equipment.
            </p>
            <p className="text-xs sm:text-sm leading-relaxed font-semibold" style={{ color: '#6B7280' }}>
              With models ranging from 200 kg to 1000 kg capacity and operating pressures from 6 to 20 PSI, our boilers deliver maximum thermal energy with minimal wood or sawdust consumption. Every boiler is fabricated from premium stainless steel or heavy mild steel and hydraulically tested before dispatch.
            </p>

            <div className="p-4 space-y-2 text-xs font-mono" style={{ backgroundColor: 'rgba(238,235,227,0.7)', borderRadius: '14px', border: '1px solid rgba(183,198,194,0.3)' }}>
              <div className="flex items-center gap-2" style={{ color: '#171e19' }}>
                <MapPin className="w-4 h-4 shrink-0" style={{ color: '#ca0013' }} />
                <span><strong>Works Address:</strong> {COMPANY_DETAILS.address}</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: '#171e19' }}>
                <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: '#171e19' }} />
                <span><strong>Phone:</strong> {COMPANY_DETAILS.phone} | {COMPANY_DETAILS.phone2} | GSTIN: {COMPANY_DETAILS.gstin}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative overflow-hidden shadow-xl" style={{ borderRadius: '20px' }}>
              <img
                src="https://lh3.googleusercontent.com/gps-cs-s/ANWiy9RSIRIGX0qS26pOfdEqxnqPTYn4OthFFQfrzzIRHUt1PpDsyw_AlY_7YT7HaXAWob4PnmPtX_FV91osfzyf_JQOneLk8T7yTThm8lwDmSo0OeU4AP0tlueIvz1KZi4ir2nYN9HmKxlZ77N3=s1360-w1360-h1020-rw"
                alt="Pandayji Iron Works Factory"
                className="w-full h-72 sm:h-80 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: 'linear-gradient(to top, rgba(23,30,25,0.95) 0%, transparent 100%)' }}>
                <strong className="block font-bold text-xs mb-0.5" style={{ color: '#ca0013' }}>Pandayji Iron Works Facility</strong>
                <p className="text-[11px]" style={{ color: '#b7c6c2' }}>Pratapgarh Road, opp. Jyoti School, Thanagazi, Rajasthan 301022</p>
              </div>
            </div>
          </div>
        </div>


        {/* CTA */}
        <div className="p-6 sm:p-10 text-center" style={{ backgroundColor: '#171e19', borderRadius: 'clamp(20px, 4vw, 32px)' }}>
          <span className="text-[10px] font-black uppercase tracking-wider" style={{ color: '#b7c6c2' }}>Get In Touch</span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-2 mb-3">Ready to Commission Your Boiler?</h2>
          <p className="text-xs font-semibold mb-5" style={{ color: '#b7c6c2' }}>Contact our engineering team for technical sizing, fuel calculations, and factory quotes.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/contact" className="btn-primary px-7 py-3 text-xs font-black uppercase tracking-wider flex items-center gap-2">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
            <a href={`tel:${COMPANY_DETAILS.phone}`} className="btn-secondary px-6 py-3 text-xs font-bold flex items-center gap-2">
              Call: {COMPANY_DETAILS.phone}
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
