'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { RoleSwitcher } from '../../components/layout/RoleSwitcher';
import { useAppStore } from '../../lib/store';
import { LayoutDashboard, ShoppingBag, ClipboardList, FileText, MapPin, Heart, User, Headphones, LogOut } from 'lucide-react';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAppStore();

  const navItems = [
    { label: 'Dashboard', href: '/account', icon: LayoutDashboard },
    { label: 'My Orders', href: '/account/orders', icon: ShoppingBag },
    { label: 'RFQ Quotations', href: '/account/quotes', icon: ClipboardList },
    { label: 'GST Invoices', href: '/account/invoices', icon: FileText },
    { label: 'Address Book', href: '/account/addresses', icon: MapPin },
    { label: 'Saved Wishlist', href: '/account/wishlist', icon: Heart },
    { label: 'Company Profile', href: '/account/profile', icon: User },
    { label: 'Support & Help', href: '/account/support', icon: Headphones }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <RoleSwitcher />
      <Header />

      <div className="bg-slate-900 text-white py-8 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold">{user.companyName}</h1>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              B2B Client Account | Contact: {user.fullName} | GSTIN: {user.gstin}
            </p>
          </div>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold px-3 py-1 rounded-full uppercase">
            Active Account
          </span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Customer Sidebar Navigation */}
          <aside className="lg:col-span-3 space-y-4">
            <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
                      isActive
                        ? 'bg-slate-900 text-amber-400 shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <item.icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}

              <div className="border-t border-slate-100 my-2 pt-2">
                <Link
                  href="/login"
                  className="flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </Link>
              </div>
            </div>
          </aside>

          {/* Account Sub-page Content */}
          <section className="lg:col-span-9">{children}</section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
