'use client';

import React from 'react';
import { PhoneCall } from 'lucide-react';
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

        </div>

        {/* Right: Call & Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0 text-[10px] sm:text-[11px]">
          <span className="hidden sm:inline text-[#b7c6c2] font-medium">
            Call Us:
          </span>
          <a
            href={`tel:${COMPANY_DETAILS.phone}`}
            className="flex items-center gap-1 font-black text-white hover:text-[#ca0013] transition-colors whitespace-nowrap"
          >
            <PhoneCall className="w-3 h-3 text-[#ca0013]" />
            <span>{COMPANY_DETAILS.phone}</span>
          </a>
          <span className="text-[#b7c6c2] hidden md:inline">|</span>
          <a
            href={`tel:${COMPANY_DETAILS.phone2}`}
            className="hidden md:flex items-center gap-1 font-black text-white hover:text-[#ca0013] transition-colors whitespace-nowrap"
          >
            <span>{COMPANY_DETAILS.phone2}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
