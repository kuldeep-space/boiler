'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, PhoneCall, Award, ChevronRight } from 'lucide-react';
import { COMPANY_DETAILS } from '../../lib/sampleData';

export const RoleSwitcher: React.FC = () => {
  return (
    <div
      className="text-xs py-1.5 sm:py-2 px-3 sm:px-4 transition-colors overflow-hidden"
      style={{
        backgroundColor: '#171e19',
        borderBottom: '1px solid rgba(183, 198, 194, 0.2)',
        color: '#eeebe3',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Manufacturing Status & Compliance */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ca0013] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ca0013]"></span>
            </span>
            <span className="font-black uppercase text-[9px] sm:text-[10px] tracking-wider text-white whitespace-nowrap">
              Works:
            </span>
            <span className="font-semibold text-[10px] sm:text-[11px] text-[#b7c6c2] truncate">
              Thanagazi (Rajasthan)
            </span>
          </div>

          <span className="hidden md:inline opacity-20">|</span>

          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-[#b7c6c2] flex-shrink-0">
            <Award className="w-3.5 h-3.5 text-[#ca0013]" />
            <span>IBR 1950 Form IIIC Certified</span>
          </div>

          <span className="hidden lg:inline opacity-20">|</span>

          <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-[#b7c6c2] flex-shrink-0">
            <Truck className="w-3.5 h-3.5 text-white" />
            <span>Pan-India Hydraulic Trailer Dispatch</span>
          </div>
        </div>

        {/* Right: Hotline & Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 text-[10px] sm:text-[11px]">
          <span className="hidden sm:inline text-[#b7c6c2] font-medium">
            Helpline:
          </span>
          <a
            href={`tel:${COMPANY_DETAILS.phone}`}
            className="flex items-center gap-1 font-black text-white hover:text-[#ca0013] transition-colors whitespace-nowrap"
          >
            <PhoneCall className="w-3 h-3 text-[#ca0013]" />
            <span>{COMPANY_DETAILS.phone}</span>
          </a>

          <Link
            href="/request-quote"
            className="inline-flex items-center gap-0.5 sm:gap-1 px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-white transition-all duration-200 hover:bg-[#a80010] whitespace-nowrap"
            style={{ backgroundColor: '#ca0013' }}
          >
            RFQ <ChevronRight className="w-2.5 h-2.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
