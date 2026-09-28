'use client';

import React from 'react';
import Link from 'next/link';
import { COMPANY_DETAILS } from '../../lib/sampleData';
import { ShieldCheck, MapPin, Phone, Mail, Award, ArrowRight, Zap, ClipboardList } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="pt-10 sm:pt-16 pb-24 md:pb-12 px-3 sm:px-4" style={{ backgroundColor: '#eeebe3' }}>
      <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">

        {/* ── Main Container (Responsive 28px/40px radius card) ─────── */}
        <div
          className="p-5 sm:p-8 lg:p-12"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: 'clamp(24px, 5vw, 40px)',
            border: '1px solid rgba(183, 198, 194, 0.3)',
            boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.08)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10">

            {/* Col 1: Company Profile (wide) */}
            <div className="lg:col-span-4 space-y-4 sm:space-y-5">
              <div className="mb-3 sm:mb-4">
                <img
                  src="/images/herologo.png"
                  alt="Pandey Ji Iron Works"
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>

              <p className="text-xs leading-relaxed font-medium" style={{ color: '#6B7280' }}>
                Leading manufacturer and Pan-India supplier of high-efficiency IBR 1950 Steam Boilers,
                Thermic Fluid Heaters, Hot Water Generators, and Auxiliaries. Manufactured at Thanagazi
                (Alwar, Rajasthan) and deployed across all 28 Indian states.
              </p>

              {/* Certification badges (24px radius pill) */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[
                  { icon: Award, label: 'IBR 1950 Form IIIC', color: '#ca0013' },
                  { icon: ShieldCheck, label: 'ISO 9001:2015', color: '#171e19' },
                  { icon: Zap, label: 'Pan-India Logistics', color: '#ca0013' },
                ].map(({ icon: Icon, label, color }) => (
                  <span
                    key={label}
                    className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-extrabold px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: '#eeebe3',
                      border: '1px solid rgba(183, 198, 194, 0.4)',
                      color: '#171e19',
                    }}
                  >
                    <Icon className="w-3.5 h-3.5" style={{ color }} />
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Col 2: Equipment Lines */}
            <div className="lg:col-span-2">
              <h4
                className="font-black text-xs uppercase tracking-widest mb-3 sm:mb-4 pb-2 border-b"
                style={{ color: '#171e19', borderColor: 'rgba(183, 198, 194, 0.3)' }}
              >
                Equipment
              </h4>
              <ul className="space-y-2 text-xs font-bold" style={{ color: '#6B7280' }}>
                {[
                  { href: '/products?cat=steam-boilers', label: 'Steam Boilers (1–20 TPH)' },
                  { href: '/products?cat=thermic-fluid-heaters', label: 'Thermic Fluid Heaters' },
                  { href: '/products?cat=hot-water-boilers', label: 'Hot Water Generators' },
                  { href: '/products?cat=electric-boilers', label: 'Electric Boilers' },
                  { href: '/products?cat=boiler-accessories', label: 'Water Softeners' },
                  { href: '/products?cat=boiler-spares-valves', label: 'IBR Safety Valves' },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="transition-colors duration-200 hover:text-[#ca0013] flex items-center gap-1.5"
                    >
                      <ArrowRight className="w-3 h-3 text-[#b7c6c2]" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Compliance & Legal */}
            <div className="lg:col-span-2">
              <h4
                className="font-black text-xs uppercase tracking-widest mb-3 sm:mb-4 pb-2 border-b"
                style={{ color: '#171e19', borderColor: 'rgba(183, 198, 194, 0.3)' }}
              >
                Governance
              </h4>
              <ul className="space-y-2 text-xs font-bold" style={{ color: '#6B7280' }}>
                {[
                  { href: '/shipping-policy', label: 'Logistics Policy' },
                  { href: '/terms', label: 'Terms & Conditions' },
                  { href: '/privacy-policy', label: 'Privacy & Security' },
                  { href: '/refund-policy', label: 'Refund Policy' },
                  { href: '/certifications', label: 'IBR Compliance' },
                  { href: '/technical-resources', label: 'Steam Calculators' },
                ].map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="transition-colors duration-200 hover:text-[#ca0013] flex items-center gap-1.5"
                    >
                      <ArrowRight className="w-3 h-3 text-[#b7c6c2]" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Factory Contacts */}
            <div className="lg:col-span-4 space-y-3 sm:space-y-4">
              <h4
                className="font-black text-xs uppercase tracking-widest mb-3 sm:mb-4 pb-2 border-b"
                style={{ color: '#171e19', borderColor: 'rgba(183, 198, 194, 0.3)' }}
              >
                Works & Factory
              </h4>

              {/* Address Bento Card */}
              <div
                className="p-3.5 sm:p-4 rounded-2xl"
                style={{
                  backgroundColor: '#eeebe3',
                  border: '1px solid rgba(183, 198, 194, 0.3)',
                }}
              >
                <div className="flex gap-2.5 sm:gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#ca0013]" />
                  <div className="text-xs">
                    <strong className="block mb-0.5 font-black text-[#171e19]">
                      Thanagazi Works (Rajasthan)
                    </strong>
                    <span className="text-[#6B7280] font-medium leading-relaxed">
                      {COMPANY_DETAILS.address}
                    </span>
                  </div>
                </div>
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <a
                  href={`tel:${COMPANY_DETAILS.phone}`}
                  className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-[#b7c6c2]/40 hover:border-[#ca0013] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#ca0013] flex-shrink-0" />
                  <div>
                    <span className="block text-[9px] uppercase font-bold text-[#b7c6c2]">Phone</span>
                    <strong className="text-[#171e19] font-black">{COMPANY_DETAILS.phone}</strong>
                  </div>
                </a>

                <a
                  href={`mailto:${COMPANY_DETAILS.email}`}
                  className="flex items-center gap-2 p-3 rounded-2xl bg-white border border-[#b7c6c2]/40 hover:border-[#ca0013] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#171e19] flex-shrink-0" />
                  <div className="overflow-hidden">
                    <span className="block text-[9px] uppercase font-bold text-[#b7c6c2]">Email</span>
                    <strong className="text-[#171e19] font-black truncate block">{COMPANY_DETAILS.email}</strong>
                  </div>
                </a>
              </div>

              {/* Request Quote Button */}
              <Link
                href="/request-quote"
                className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider"
              >
                <ClipboardList className="w-4 h-4" />
                Request Custom Quotation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar (Responsive 20px/24px radius) ───────── */}
        <div
          className="p-4 sm:p-5 px-5 sm:px-8 rounded-[20px] sm:rounded-[24px] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-semibold text-center sm:text-left"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid rgba(183, 198, 194, 0.3)',
            color: '#6B7280',
          }}
        >
          <div>
            © {new Date().getFullYear()}{' '}
            <strong className="text-[#171e19] font-black">{COMPANY_DETAILS.name}</strong>. All rights reserved.
            <span className="block sm:inline sm:ml-3 font-mono text-[10px] sm:text-[11px] text-[#b7c6c2] mt-0.5 sm:mt-0">
              GSTIN: {COMPANY_DETAILS.gstin}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span>
              Hotline:{' '}
              <a
                href={`tel:${COMPANY_DETAILS.phone}`}
                className="font-black text-[#ca0013] hover:underline"
              >
                {COMPANY_DETAILS.phone}
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
