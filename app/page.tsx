'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { RoleSwitcher } from '../components/layout/RoleSwitcher';
import { ProductCard } from '../components/product/ProductCard';
import { useAppStore } from '../lib/store';
import {
  Flame,
  ArrowRight,
  ShieldCheck,
  Award,
  Truck,
  Wrench,
  Building2,
  Users,
  Factory,
  Zap,
  Droplets,
  ChevronRight,
  Gauge,
  ThermometerSun,
  Phone,
  Layers,
  Sparkles,
  FileCheck,
} from 'lucide-react';

export default function HomePage() {
  const { products } = useAppStore();

  const featuredProducts = products.slice(0, 6);

  const INDUSTRIES = [
    { name: 'Textile Processing',  desc: 'Dyeing & Stenters',               icon: Factory },
    { name: 'Pharmaceuticals',     desc: 'Sterilization & Autoclaves',      icon: Building2 },
    { name: 'Food Processing',     desc: 'Steam Kettles & Evaporators',     icon: Droplets },
    { name: 'Chemical & Resins',   desc: 'High Temp Heating',               icon: Flame },
    { name: 'Dairy Plants',        desc: 'Milk Evaporation',               icon: ThermometerSun },
    { name: 'Paper & Board',       desc: 'Corrugation & Drums',             icon: Wrench },
    { name: 'Manufacturing',       desc: 'Co-generation',                   icon: Zap },
    { name: 'Hospitality',         desc: 'Central Laundries',               icon: Users },
  ];

  const WHY_US_ITEMS = [
    {
      title: 'Precision Boiler Fabrication in Thanagazi',
      desc: 'Expert thermal engineers in Thanagazi, Rajasthan design robust Wood & Sawdust Fired (Non-IBR) steam boilers and Khoya making machines built for heavy round-the-clock Indian operation.',
      icon: Award,
    },
    {
      title: 'Tested Safety & 6 to 20 PSI Pressure Standards',
      desc: 'Every boiler is fabricated from premium stainless steel or heavy mild steel, hydraulically tested and calibrated for safe, fuel-efficient operation.',
      icon: ShieldCheck,
    },
    {
      title: 'Pan-India Machinery Transport & Logistics',
      desc: 'Direct factory transport and dispatch for 200 kg to 1000 kg boilers and khoya machines across all states, with secure logistics and real-time consignment updates.',
      icon: Truck,
    },
    {
      title: 'Turnkey Commissioning, Piping & Support',
      desc: 'Complete technical assistance: steam piping layout, chimney setup, burner tuning, operator guidance, and genuine spare parts replacement.',
      icon: Wrench,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#eeebe3' }}>
      <RoleSwitcher />
      <Header />

      <main className="flex-1 pb-24 md:pb-0">

        {/* ════════════════════════════════════════════════════
            § 1 — HERO FEATURE CARD
            Responsive 28px/40px radius, decorative sage blob,
            64px icon holder, bento metrics grid, bottom alert info box
            ════════════════════════════════════════════════════ */}
        <section className="px-3 sm:px-4 pt-4 sm:pt-8 pb-6 sm:pb-8 max-w-7xl mx-auto">
          <div
            className="card-main relative overflow-hidden p-5 sm:p-8 lg:p-12 transition-all"
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 'clamp(24px, 5vw, 40px)',
              border: '1px solid rgba(183, 198, 194, 0.3)',
              boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.08)',
            }}
          >
            {/* Semi-transparent decorative blob (#b7c6c2/20) in top-right */}
            <div
              className="absolute -top-24 -right-24 w-72 sm:w-96 h-72 sm:h-96 rounded-full pointer-events-none blur-2xl"
              style={{ backgroundColor: 'rgba(183, 198, 194, 0.25)' }}
            />
            <div
              className="absolute top-1/2 -right-10 w-48 sm:w-64 h-48 sm:h-64 rounded-full pointer-events-none blur-3xl"
              style={{ backgroundColor: 'rgba(202, 0, 19, 0.04)' }}
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">

              {/* Left Column: Heading, Icon Holder, CTAs */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-6">

                {/* 64x64px white square icon holder with badge */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div
                    className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm"
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid rgba(183, 198, 194, 0.35)',
                    }}
                  >
                    <Flame className="w-6 sm:w-8 h-6 sm:h-8 text-[#ca0013]" />
                  </div>
                  <div>
                    <span className="label-tag block text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#b7c6c2]">
                      Thanagazi, Rajasthan · Pan-India Supplier
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-[#171e19]">
                      Wood Fired Steam Boilers &amp; Khoya Machinery
                    </p>
                  </div>
                </div>

                {/* Headline: Responsive 28px to 54px Font-Black */}
                <h1 className="heading-xl text-2xl sm:text-4xl lg:text-5xl leading-[1.12] sm:leading-[1.08] text-[#171e19]">
                  Industrial Boilers Built for{' '}
                  <span className="text-[#ca0013]">Unmatched</span>{' '}
                  Performance.
                </h1>

                {/* Body Copy */}
                <p className="text-xs sm:text-base leading-relaxed font-semibold text-[#6B7280] max-w-xl">
                  Pandayji Iron Works manufactures robust 200 kg to 1000 kg Wood Fired Steam Boilers (Non-IBR),
                  automatic Khoya Making Machines, and heavy-duty steam equipment. Operating at 6 to 20 PSI with high thermal
                  efficiency in Stainless Steel and Mild Steel.
                </p>

                {/* CTAs: Mobile full-width stack / Desktop inline */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-1">
                  <Link
                    href="/products"
                    className="btn-primary w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 flex items-center justify-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider"
                  >
                    Explore Boilers
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="tel:9680429713"
                    className="btn-secondary w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold"
                  >
                    <Phone className="w-4 h-4 text-[#ca0013]" />
                    Call Us: 96804 29713
                  </a>
                </div>

                {/* Nested 2-column on mobile, 4-column on desktop Bento metric cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 pt-2">
                  {[
                    { label: 'CAPACITY RANGE', value: '200 to 1000 Kg', icon: Zap },
                    { label: 'STEAM PRESSURE', value: '6 to 20 PSI', icon: Gauge },
                    { label: 'FUEL COMPATIBLE', value: 'Wood, Sawdust, Coal', icon: Flame },
                    { label: 'FABRICATION', value: 'Stainless & Mild Steel', icon: Sparkles },
                  ].map(({ label, value, icon: Icon }) => (
                    <div
                      key={label}
                      className="bento-card p-2 sm:p-3"
                      style={{
                        backgroundColor: 'rgba(238, 235, 227, 0.7)',
                        backdropFilter: 'blur(12px)',
                        borderRadius: '16px',
                        border: '1px solid rgba(183, 198, 194, 0.35)',
                      }}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <div
                          className="w-5 sm:w-6 h-5 sm:h-6 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: 'rgba(202, 0, 19, 0.1)' }}
                        >
                          <Icon className="w-3 h-3 text-[#ca0013]" />
                        </div>
                        <span className="label-tag text-[8px] sm:text-[9px] font-black uppercase tracking-wider text-[#b7c6c2] truncate">
                          {label}
                        </span>
                      </div>
                      <strong className="block text-[11px] sm:text-xs font-black text-[#171e19] truncate">
                        {value}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Hero Image Container */}
              <div className="lg:col-span-5 space-y-4 flex flex-col justify-center items-center relative pt-2 lg:pt-0">
                {/* Soft ambient radial fade glow around the boiler */}
                <div
                  className="absolute inset-0 pointer-events-none rounded-full blur-3xl opacity-75"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(183, 198, 194, 0.45) 0%, rgba(202, 0, 19, 0.06) 45%, transparent 75%)',
                  }}
                />

                {/* Boiler Image: object-contain (NO STRETCH), NO CARD, NO BORDER, natural proportions */}
                <div className="relative z-10 w-full flex items-center justify-center py-2">
                  <img
                    src="/images/boiler.png"
                    alt="IBR Steam Boiler — Pandey Ji Iron Works Thanagazi"
                    className="max-h-[220px] sm:max-h-[320px] lg:max-h-[400px] w-auto max-w-full object-contain filter drop-shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
                    style={{
                      maskImage: 'radial-gradient(ellipse 92% 92% at 50% 50%, black 80%, transparent 100%)',
                      WebkitMaskImage: 'radial-gradient(ellipse 92% 92% at 50% 50%, black 80%, transparent 100%)',
                    }}
                  />
                </div>

                {/* Floating Spec Snippet */}
                <div
                  className="bento-card w-full flex items-center justify-between p-3 sm:p-4 relative z-10"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    borderRadius: '20px',
                    border: '1px solid rgba(183, 198, 194, 0.3)',
                    boxShadow: '0 10px 25px -5px rgba(23, 30, 25, 0.06)',
                  }}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                    <div
                      className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: 'rgba(202, 0, 19, 0.1)' }}
                    >
                      <ShieldCheck className="w-4 sm:w-5 h-4 sm:h-5 text-[#ca0013]" />
                    </div>
                    <div className="truncate">
                      <p className="font-black text-xs text-[#171e19] truncate">
                        Wood Fired Steam Boilers (Non-IBR)
                      </p>
                      <p className="text-[10px] sm:text-[11px] font-bold text-[#b7c6c2] truncate">
                        200 Kg to 1000 Kg Capacity Range
                      </p>
                    </div>
                  </div>
                  <span
                    className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-black text-white flex-shrink-0 ml-2"
                    style={{ backgroundColor: '#171e19' }}
                  >
                    6 - 20 PSI
                  </span>
                </div>
              </div>
            </div>

            {/* Alert/info box at the bottom using #b7c6c2/20 background */}
            <div
              className="mt-6 sm:mt-8 p-3.5 sm:p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 text-xs"
              style={{
                backgroundColor: 'rgba(183, 198, 194, 0.2)',
                border: '1px solid rgba(183, 198, 194, 0.35)',
              }}
            >
              <div className="flex items-center gap-2 text-[#171e19] font-bold">
                <FileCheck className="w-4 h-4 text-[#ca0013] flex-shrink-0" />
                <span className="leading-tight">
                  Available in 200 kg, 300 kg, 400 kg, 500 kg, 600 kg, 700 kg, 800 kg, 900 kg &amp; 1000 kg capacities.
                </span>
              </div>
              <a
                href="tel:9680429713"
                className="font-black text-[#ca0013] hover:underline flex items-center gap-1 flex-shrink-0"
              >
                Call Works: 96804 29713 <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </section>



        {/* ════════════════════════════════════════════════════
            § 3 — FEATURED EQUIPMENT (Responsive Grid)
            ════════════════════════════════════════════════════ */}
        <section className="px-3 sm:px-4 py-6 sm:py-8 max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
            <div>
              <span className="label-tag text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#ca0013]">
                Factory Engineered
              </span>
              <h2 className="heading-lg text-xl sm:text-3xl text-[#171e19]">
                Featured Boilers &amp; Auxiliaries
              </h2>
            </div>
            <Link
              href="/products"
              className="text-xs font-black uppercase tracking-wider text-[#171e19] hover:text-[#ca0013] flex items-center gap-1 transition-colors"
            >
              Browse Catalogue <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {featuredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          ) : (
            <div
              className="p-10 sm:p-14 text-center rounded-[32px] space-y-3"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid rgba(183, 198, 194, 0.3)',
              }}
            >
              <Layers className="w-12 h-12 text-[#b7c6c2] mx-auto" />
              <h3 className="font-black text-lg text-[#171e19]">Catalogue Template Ready</h3>
              <p className="text-xs text-[#6B7280] font-semibold max-w-sm mx-auto">
                No equipment is currently published. You can publish new boiler models anytime from the Admin Panel.
              </p>
              <Link
                href="/contact"
                className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-xs font-black uppercase tracking-wider"
              >
                Inquire For Custom Boilers
              </Link>
            </div>
          )}
        </section>

        {/* ════════════════════════════════════════════════════
            § 4 — WHY CHOOSE US (Secondary Feed Items)
            ════════════════════════════════════════════════════ */}
        <section className="px-3 sm:px-4 py-8 sm:py-10 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8">
            <span className="label-tag text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#ca0013]">
              The Pandey Ji Standard
            </span>
            <h2 className="heading-lg text-xl sm:text-3xl text-[#171e19] mb-2">
              Why Process Industries Trust Us
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-[#6B7280]">
              From custom CAD calculation and IBR Form IIIC fabrication in Thanagazi to heavy low-bed
              trailer delivery and site commissioning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {WHY_US_ITEMS.map(({ title, desc, icon: Icon }) => (
              <div
                key={title}
                className="card-item p-4 sm:p-6 rounded-[20px] sm:rounded-[24px] flex items-start justify-between gap-3 sm:gap-4 group"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(183, 198, 194, 0.3)',
                  boxShadow: '0 10px 30px -5px rgba(23, 30, 25, 0.05)',
                }}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  {/* 56px icon container */}
                  <div
                    className="w-11 sm:w-14 h-11 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(202, 0, 19, 0.1)' }}
                  >
                    <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-[#ca0013]" />
                  </div>
                  <div>
                    <h3 className="heading-md text-sm sm:text-lg font-black text-[#171e19] mb-1">
                      {title}
                    </h3>
                    <p className="text-xs leading-relaxed font-semibold text-[#6B7280]">
                      {desc}
                    </p>
                  </div>
                </div>

                {/* Circular trailing button (40px) */}
                <div
                  className="w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 border border-[#b7c6c2]/40 bg-[#eeebe3] group-hover:bg-[#ca0013] group-hover:border-[#ca0013] group-hover:text-white text-[#171e19]"
                >
                  <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            § 5 — INDUSTRIES POWERED BY OUR BOILERS
            ════════════════════════════════════════════════════ */}
        <section className="px-3 sm:px-4 py-6 sm:py-8 max-w-7xl mx-auto">
          <div
            className="p-6 sm:p-10 rounded-[28px] sm:rounded-[32px] mb-4 sm:mb-6"
            style={{
              backgroundColor: '#ffffff',
              border: '1px solid rgba(183, 198, 194, 0.3)',
            }}
          >
            <span className="label-tag text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#b7c6c2]">
              Pan-India Applications
            </span>
            <h2 className="heading-lg text-xl sm:text-3xl text-[#171e19] mb-2">
              Industries Powered by Our Boilers
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-[#6B7280]">
              Precision steam generation, hot water cycles, and thermal fluid temperatures for major processing plants.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4">
            {INDUSTRIES.map(({ name, desc, icon: Icon }) => (
              <div
                key={name}
                className="card-item p-3.5 sm:p-5 rounded-[20px] sm:rounded-[24px] text-center"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(183, 198, 194, 0.3)',
                }}
              >
                <div
                  className="w-10 sm:w-12 h-10 sm:h-12 rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-3"
                  style={{ backgroundColor: 'rgba(202, 0, 19, 0.08)' }}
                >
                  <Icon className="w-4 sm:w-5 h-4 sm:h-5 text-[#ca0013]" />
                </div>
                <h4 className="font-black text-xs text-[#171e19] mb-0.5 truncate">{name}</h4>
                <p className="text-[9px] sm:text-[10px] font-bold text-[#b7c6c2] truncate">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════
            § 6 — HIGH-IMPACT CTA BANNER
            ════════════════════════════════════════════════════ */}
        <section className="px-3 sm:px-4 pb-10 sm:pb-14 max-w-7xl mx-auto">
          <div
            className="p-6 sm:p-12 rounded-[28px] sm:rounded-[40px] text-center relative overflow-hidden text-white"
            style={{
              backgroundColor: '#171e19',
              boxShadow: '0 25px 60px -15px rgba(23, 30, 25, 0.3)',
            }}
          >
            {/* Decorative blobs */}
            <div
              className="absolute -bottom-16 -left-16 w-48 sm:w-64 h-48 sm:h-64 rounded-full pointer-events-none blur-3xl opacity-20"
              style={{ backgroundColor: '#b7c6c2' }}
            />
            <div
              className="absolute -top-16 -right-16 w-48 sm:w-64 h-48 sm:h-64 rounded-full pointer-events-none blur-3xl opacity-20"
              style={{ backgroundColor: '#ca0013' }}
            />

            <div className="relative z-10 max-w-2xl mx-auto space-y-4 sm:space-y-5">
              <span className="inline-block px-3.5 py-1 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-[#b7c6c2] bg-white/10">
                Direct From Thanagazi Works
              </span>

              <h2 className="heading-lg text-2xl sm:text-4xl text-white">
                Ready to Commission Your Boiler?
              </h2>

              <p className="text-xs sm:text-sm font-semibold text-[#b7c6c2] leading-relaxed">
                Connect directly with our chief thermal engineering team. Receive detailed thermodynamic
                sizing, fuel consumption calculations, and a complete GST-compliant quote in 24 hours.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-3 pt-2">
                <Link
                  href="/contact"
                  className="btn-primary w-full sm:w-auto px-7 sm:px-8 py-3 sm:py-3.5 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider"
                >
                  <Phone className="w-4 h-4" />
                  Contact Us
                </Link>

                <a
                  href="tel:9680429713"
                  className="btn-secondary w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 flex items-center justify-center gap-2 text-xs font-bold"
                >
                  <Phone className="w-4 h-4 text-[#ca0013]" />
                  Call 96804 29713
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>



      <Footer />
    </div>
  );
}
