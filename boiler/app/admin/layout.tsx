'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { RoleSwitcher } from '../../components/layout/RoleSwitcher';
import { useAppStore } from '../../lib/store';
import { 
  LayoutDashboard, 
  Package, 
  Layers, 
  ShoppingBag, 
  Users, 
  ClipboardList, 
  CreditCard, 
  FileText, 
  Tag, 
  Truck, 
  Percent, 
  Settings, 
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentRole, switchRole } = useAppStore();

  const adminNavItems = [
    { label: 'Overview Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Products & Equipment', href: '/admin/products', icon: Package },
    { label: 'Categories & Specs', href: '/admin/categories', icon: Layers },
    { label: 'Orders & Dispatch', href: '/admin/orders', icon: ShoppingBag },
    { label: 'RFQ Quotes & Pricing', href: '/admin/quotes', icon: ClipboardList },
    { label: 'B2B Customers & GST', href: '/admin/customers', icon: Users },
    { label: 'Coupons & Discounts', href: '/admin/coupons', icon: Tag },
    { label: 'GST Tax Configuration', href: '/admin/gst-tax', icon: Percent },
    { label: 'Shipping & Freight Zones', href: '/admin/shipping', icon: Truck },
    { label: 'Invoices Audit', href: '/admin/invoices', icon: FileText },
    { label: 'Company Settings', href: '/admin/settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <RoleSwitcher />
      <Header />

      {/* Admin Title Bar */}
      <div className="bg-slate-950 text-white py-6 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                Pandey Ji Iron Works Admin Portal
              </h1>
              <p className="text-xs text-amber-400 font-mono">
                Plant Manager & Sales Executive Operations Dashboard
              </p>
            </div>
          </div>

          <button
            onClick={() => switchRole('customer')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
          >
            <UserCheck className="w-4 h-4 text-amber-400" /> Switch to Buyer View
          </button>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Admin Navigation Sidebar */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-1 block">
                Admin Controls
              </span>
              {adminNavItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                      isActive
                        ? 'bg-amber-500 text-slate-950 shadow'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </aside>

          {/* Main Admin Sub-Page Content */}
          <section className="lg:col-span-9">{children}</section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
