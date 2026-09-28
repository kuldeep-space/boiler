'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, FileText, LogOut, ShieldCheck, Flame, UserPlus, Menu, X } from 'lucide-react';
import { logout } from './actions';
import { useState } from 'react';

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Products', href: '/products', icon: Package, badge: 'Catalog' },
    { name: 'Customer Queries', href: '/queries', icon: FileText, badge: 'Live' }
  ];

  const SidebarContent = () => (
    <>
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/70 relative overflow-hidden bg-gradient-to-b from-slate-900 to-[#0d1117]">
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-red-600/15 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#ca0013] to-red-700 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm font-black tracking-wider text-white flex items-center gap-1.5 uppercase">
                PANDAYJI <span className="text-[#ca0013] font-bold text-[10px] bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20">PRO</span>
              </h1>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">Iron Works & Boilers</p>
            </div>
          </div>
          {/* Mobile close button */}
          <button onClick={() => setOpen(false)} className="md:hidden text-slate-400 hover:text-white p-1">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Add Admin Button */}
      <div className="px-4 pt-4 pb-2">
        <Link
          href="/signup"
          onClick={() => setOpen(false)}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#ca0013] to-red-600 hover:from-red-600 hover:to-red-500 text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-red-900/40 hover:-translate-y-0.5 transition-all duration-200"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Admin</span>
        </Link>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">Management</div>
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
          return (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group relative ${
                isActive
                  ? 'bg-slate-800/90 text-white shadow-sm border border-slate-700/60'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-2 bottom-2 w-1 bg-[#ca0013] rounded-r-full shadow-[0_0_10px_#ca0013]" />
              )}
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#ca0013]' : 'text-slate-400 group-hover:text-slate-200'}`} />
                <span className="tracking-wide">{link.name}</span>
              </div>
              {link.badge && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  isActive ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}>
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Admin Badge & Logout */}
      <div className="p-4 border-t border-slate-800/70 bg-slate-900/40 space-y-3">
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-bold text-white truncate">Administrator</p>
            <p className="text-[10px] text-emerald-400 font-medium">Logged in Securely</p>
          </div>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-800/60 hover:bg-red-600/20 hover:text-red-300 hover:border-red-500/30 border border-slate-700/50 text-slate-300 text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-[#0d1117] border-b border-slate-800/80 shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ca0013] to-red-700 flex items-center justify-center">
            <Flame className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-black text-white uppercase tracking-wider">Pandayji <span className="text-[#ca0013]">PRO</span></span>
        </div>
        <button onClick={() => setOpen(!open)} className="text-slate-300 hover:text-white p-1.5 rounded-lg bg-slate-800/60 transition-colors">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Overlay Drawer */}
      {open && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="relative z-50 w-72 bg-[#0d1117] text-slate-200 flex flex-col h-full border-r border-slate-800/80 shadow-2xl">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 lg:w-72 bg-[#0d1117] text-slate-200 flex-col h-full border-r border-slate-800/80 shadow-2xl relative z-20 flex-shrink-0 select-none">
        <SidebarContent />
      </aside>
    </>
  );
}