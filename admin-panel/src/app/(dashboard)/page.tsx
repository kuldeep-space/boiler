'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Package, 
  FileText, 
  PlusCircle, 
  ArrowUpRight, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function DashboardPage() {
  const [productCount, setProductCount] = useState(0);
  const [queriesCount, setQueriesCount] = useState(0);
  const [recentProducts, setRecentProducts] = useState<any[]>([]);

  useEffect(() => {
    async function loadStats() {
      const allProducts: any[] = [];
      let totalQueries = 0;

      // 1. Fetch from Supabase
      try {
        const supabase = createClient();
        const { data: dbProducts } = await supabase.from('products').select('*').order('created_at', { ascending: false });
        if (dbProducts && dbProducts.length > 0) {
          dbProducts.forEach((p) => allProducts.push(p));
        }

        const { count } = await supabase.from('queries').select('*', { count: 'exact', head: true });
        if (count !== null && count !== undefined) {
          totalQueries = count;
        }
      } catch {
        // ignore
      }

      // 2. Fetch from Synchronized Catalog API if configured
      const siteUrl = process.env.NEXT_PUBLIC_MAIN_SITE_URL || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:3000' : '');
      if (siteUrl) {
        try {
          const res = await fetch(`${siteUrl}/api/catalog/products`);
          if (res.ok) {
            const apiProducts = await res.json();
            if (Array.isArray(apiProducts)) {
              apiProducts.forEach((ap) => {
                if (!allProducts.some((p) => p.id === ap.id || p.name === ap.name)) {
                  allProducts.push(ap);
                }
              });
            }
          }
        } catch {
          // ignore
        }

        // 3. Fetch from Synchronized Queries API
        try {
          const resQ = await fetch(`${siteUrl}/api/catalog/queries`);
          if (resQ.ok) {
            const apiQueries = await resQ.json();
            if (Array.isArray(apiQueries) && apiQueries.length > totalQueries) {
              totalQueries = apiQueries.length;
            }
          }
        } catch {
          // ignore
        }
      }

      // 4. Local storage fallback
      if (typeof window !== 'undefined') {
        try {
          const stored = localStorage.getItem('pandayji_catalog_products');
          if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed)) {
              parsed.forEach((lp) => {
                if (!allProducts.some((p) => p.id === lp.id || p.name === lp.name)) {
                  allProducts.push(lp);
                }
              });
            }
          }
        } catch {
          // ignore
        }
      }

      setProductCount(allProducts.length);
      setRecentProducts(allProducts.slice(0, 6));
      setQueriesCount(totalQueries);
    }

    loadStats();
  }, []);

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-[#111612] to-slate-900 rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-2xl border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ca0013]/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>Pandayji Iron Works &bull; Admin Hub</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">
              Control Panel &amp; Catalog
            </h1>
            <p className="text-slate-400 text-sm max-w-xl font-medium">
              Manage your boilers, update prices, check quotation inquiries from prospective buyers, and keep your machinery catalog fresh.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/products/new"
              className="bg-[#ca0013] hover:bg-red-700 text-white px-5 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-red-900/50 hover:shadow-red-600/50 hover:-translate-y-0.5 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add New Boiler</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Products */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Products</span>
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#ca0013] flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{productCount}</span>
            <span className="text-xs font-semibold text-emerald-600">Active</span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">Published in online equipment list</p>
        </div>

        {/* Customer Queries */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Buyer Inquiries</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{queriesCount}</span>
            <span className="text-xs font-semibold text-blue-600">New Leads</span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">Quote requests from website visitors</p>
        </div>

        {/* System Status */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Admin Status</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900">Protected</span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">SSL Active</span>
          </div>
          <p className="text-xs text-slate-500 mt-1 font-medium">Next.js 16 + Supabase Security</p>
        </div>
      </div>

      {/* Quick Launch / Recent Products */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">Recent Products</h2>
            <p className="text-xs text-slate-500 font-medium">Quick overview of equipment in your catalog</p>
          </div>
          <Link
            href="/products"
            className="text-xs font-bold text-[#ca0013] hover:text-red-700 flex items-center gap-1 group"
          >
            <span>View All</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {recentProducts.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50 space-y-3">
            <div className="w-12 h-12 bg-red-50 text-[#ca0013] rounded-xl flex items-center justify-center mx-auto">
              <Package className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-slate-800">No equipment in catalog yet</p>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Click below to publish your first boiler or machinery with tabular technical specifications.
            </p>
            <Link
              href="/products/new"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#ca0013] hover:bg-red-700 text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              <PlusCircle className="w-4 h-4" /> Add First Product
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentProducts.map((p, idx) => (
              <div
                key={p.id || idx}
                className="p-4 rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex items-center gap-4 bg-slate-50/50"
              >
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center flex-shrink-0 text-slate-400 overflow-hidden">
                  {p.images && p.images.length > 0 ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.images[0]} alt="" className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <Package className="w-6 h-6" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-xs truncate">{p.name}</h4>
                  <p className="font-mono font-bold text-slate-600 text-xs mt-0.5">
                    ₹{Number(p.price || 0).toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ))}

            <Link
              href="/products/new"
              className="p-4 rounded-2xl border-2 border-dashed border-slate-200 hover:border-[#ca0013] hover:bg-red-50/30 transition-all flex items-center justify-center gap-2 group text-slate-500 hover:text-[#ca0013]"
            >
              <PlusCircle className="w-5 h-5 text-slate-400 group-hover:text-[#ca0013]" />
              <span className="text-xs font-bold">Add Another Product</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
