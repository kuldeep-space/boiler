'use client';

import React from 'react';
import Link from 'next/link';
import { COMPANY_DETAILS } from '../../lib/sampleData';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="pt-10 sm:pt-16 pb-24 md:pb-12 px-3 sm:px-4" style={{ backgroundColor: '#eeebe3' }}>
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">

        {/* ── Main Container (Card with symmetrical 2-column layout) ─────── */}
        <div
          className="p-6 sm:p-8 lg:p-12 bg-white"
          style={{
            borderRadius: 'clamp(24px, 5vw, 40px)',
            border: '1px solid rgba(183, 198, 194, 0.35)',
            boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.06)',
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:divide-x lg:divide-[rgba(183,198,194,0.3)]">

            {/* Col 1: Company Profile & Primary Action */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="pb-3 border-b border-[rgba(183,198,194,0.3)]">
                  <h4 className="font-black text-xs uppercase tracking-widest text-[#171e19]">
                    Company Profile
                  </h4>
                </div>

                <div className="pt-1">
                  <img
                    src="/images/herologo.png"
                    alt="Pandey Ji Iron Works"
                    className="h-10 sm:h-12 w-auto object-contain"
                  />
                </div>

                <p className="text-xs leading-relaxed font-medium text-[#6B7280]">
                  Leading manufacturer and Pan-India supplier of high-efficiency IBR 1950 Steam Boilers,
                  Thermic Fluid Heaters, Hot Water Generators, and Auxiliaries. Manufactured at Thanagazi
                  (Alwar, Rajasthan) and deployed across all 28 Indian states.
                </p>
              </div>

              <div>
                <Link
                  href="/contact"
                  className="btn-primary w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all"
                >
                  Contact Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Col 2: Works & Factory Contacts */}
            <div className="lg:pl-12 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="pb-3 border-b border-[rgba(183,198,194,0.3)]">
                  <h4 className="font-black text-xs uppercase tracking-widest text-[#171e19]">
                    Works &amp; Factory
                  </h4>
                </div>

                {/* Thanagazi Address Card */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-[#eeebe3]/50 border border-[rgba(183,198,194,0.4)] flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-white flex items-center justify-center flex-shrink-0 border border-[rgba(183,198,194,0.3)] shadow-xs">
                    <MapPin className="w-4 h-4 text-[#ca0013]" />
                  </div>
                  <div className="text-xs">
                    <strong className="block font-black text-[#171e19]">
                      Thanagazi Works (Rajasthan)
                    </strong>
                    <span className="text-[#6B7280] font-medium leading-relaxed block mt-0.5">
                      {COMPANY_DETAILS.address}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Actions Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <a
                  href={`tel:${COMPANY_DETAILS.phone}`}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#eeebe3]/50 border border-[rgba(183,198,194,0.4)] hover:border-[#ca0013] hover:bg-white transition-all group"
                >
                  <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center flex-shrink-0 border border-[rgba(183,198,194,0.3)] group-hover:border-[#ca0013]/40">
                    <Phone className="w-3.5 h-3.5 text-[#ca0013]" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[9px] uppercase font-bold text-[#b7c6c2] leading-none mb-1">
                      Phone / Call
                    </span>
                    <strong className="text-[#171e19] font-black text-[11px] block leading-tight truncate">
                      {COMPANY_DETAILS.phone}
                    </strong>
                  </div>
                </a>

                <a
                  href={`mailto:${COMPANY_DETAILS.email}`}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-[#eeebe3]/50 border border-[rgba(183,198,194,0.4)] hover:border-[#ca0013] hover:bg-white transition-all group"
                >
                  <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center flex-shrink-0 border border-[rgba(183,198,194,0.3)] group-hover:border-[#ca0013]/40">
                    <Mail className="w-3.5 h-3.5 text-[#171e19]" />
                  </div>
                  <div className="min-w-0">
                    <span className="block text-[9px] uppercase font-bold text-[#b7c6c2] leading-none mb-1">
                      Email
                    </span>
                    <strong className="text-[#171e19] font-black text-[11px] block leading-tight truncate">
                      {COMPANY_DETAILS.email}
                    </strong>
                  </div>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* ── Bottom Bar ───────── */}
        <div
          className="p-4 sm:p-5 px-6 sm:px-8 rounded-[20px] sm:rounded-[24px] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-medium text-center sm:text-left bg-white"
          style={{
            border: '1px solid rgba(183, 198, 194, 0.35)',
            color: '#6B7280',
          }}
        >
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 gap-y-1">
            <span>
              © {new Date().getFullYear()}{' '}
              <strong className="text-[#171e19] font-black">{COMPANY_DETAILS.name}</strong>. All rights reserved.
            </span>
            <span className="hidden sm:inline text-[#b7c6c2]">•</span>
            <span className="font-mono text-[11px] text-[#6B7280]">
              GSTIN: <strong className="text-[#171e19] font-bold">{COMPANY_DETAILS.gstin}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#9CA3AF] font-bold uppercase text-[10px] tracking-wider">Hotline:</span>
            <a
              href={`tel:${COMPANY_DETAILS.phone}`}
              className="font-black text-[#ca0013] hover:underline"
            >
              {COMPANY_DETAILS.phone}
            </a>
            <span className="text-[#b7c6c2]">/</span>
            <a
              href={`tel:${COMPANY_DETAILS.phone2}`}
              className="font-black text-[#ca0013] hover:underline"
            >
              {COMPANY_DETAILS.phone2}
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

