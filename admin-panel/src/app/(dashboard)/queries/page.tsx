'use client';

import { useState, useEffect } from 'react';
import { 
  FileText, 
  Mail, 
  Phone, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Filter, 
  MessageSquare,
  UserCheck
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

interface QueryItem {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  message?: string;
  status: 'New' | 'Contacted' | 'Resolved' | 'Spam';
  created_at: string;
  product_name?: string;
}

export default function QueriesPage() {
  const [queries, setQueries] = useState<QueryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchQueries() {
      setLoading(true);
      const combined: QueryItem[] = [];

      // 1. Try Supabase
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('queries')
          .select('*, products(name)')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          data.forEach((item: any) => {
            combined.push({
              id: item.id,
              customer_name: item.customer_name,
              customer_phone: item.customer_phone,
              customer_email: item.customer_email,
              message: item.message,
              status: item.status || 'New',
              created_at: item.created_at,
              product_name: item.product_name || item.products?.name || 'General Boiler Inquiry'
            });
          });
        }
      } catch (err) {
        console.warn('Could not fetch queries from Supabase:', err);
      }

      // 2. Fetch from Synchronized Catalog API if configured
      const siteUrl = process.env.NEXT_PUBLIC_MAIN_SITE_URL || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:3000' : '');
      if (siteUrl) {
        try {
          const res = await fetch(`${siteUrl}/api/catalog/queries`);
          if (res.ok) {
            const apiQueries: QueryItem[] = await res.json();
            apiQueries.forEach((q) => {
              if (!combined.some((item) => item.id === q.id)) {
                combined.push(q);
              }
            });
          }
        } catch (e) {
          console.warn('API queries fetch skipped:', e);
        }
      }

      setQueries(combined);
      setLoading(false);
    }

    fetchQueries();
  }, []);

  const handleStatusChange = async (id: string, newStatus: QueryItem['status']) => {
    setQueries((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q))
    );

    // Update via API
    const siteUrl = process.env.NEXT_PUBLIC_MAIN_SITE_URL || (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:3000' : '');
    if (siteUrl) {
      try {
        await fetch(`${siteUrl}/api/catalog/queries`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, status: newStatus })
        });
      } catch {
        // ignore
      }
    }

    // Try Supabase
    try {
      const supabase = createClient();
      await supabase.from('queries').update({ status: newStatus }).eq('id', id);
    } catch {
      // ignore
    }
  };

  const filteredQueries = queries.filter((q) => {
    const matchesFilter = filterStatus === 'All' || q.status === filterStatus;
    const matchesSearch =
      q.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.customer_phone.includes(searchTerm) ||
      (q.message && q.message.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Customer Queries &amp; Leads</h1>
            <span className="bg-red-50 text-[#ca0013] text-xs font-bold px-2.5 py-0.5 rounded-full border border-red-200">
              {queries.length} Total Leads
            </span>
          </div>
          <p className="text-slate-500 text-sm font-medium mt-1">
            Incoming quotation requests submitted by potential buyers on your website.
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by client name or phone..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#ca0013] transition-all"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['All', 'New', 'Contacted', 'Resolved'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterStatus === st
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Queries List */}
      {loading ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-16 text-center shadow-sm">
          <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-semibold text-slate-500">Loading incoming inquiries...</p>
        </div>
      ) : filteredQueries.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-sm space-y-3">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
            <FileText className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No matching inquiries</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            When prospective buyers fill the inquiry form on your website, their requests will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredQueries.map((query) => (
            <div
              key={query.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              {/* Left Details */}
              <div className="space-y-3 max-w-2xl">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="font-bold text-base text-slate-900">{query.customer_name}</h3>
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                      query.status === 'New'
                        ? 'bg-red-50 text-[#ca0013] border-red-200'
                        : query.status === 'Contacted'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}
                  >
                    {query.status}
                  </span>
                  {query.product_name && (
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      Product: {query.product_name}
                    </span>
                  )}
                </div>

                {query.message && (
                  <p className="text-xs text-slate-600 font-medium leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    &ldquo;{query.message}&rdquo;
                  </p>
                )}

                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 flex-wrap">
                  <a
                    href={`tel:${query.customer_phone}`}
                    className="flex items-center gap-1.5 text-emerald-700 hover:underline bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{query.customer_phone}</span>
                  </a>

                  {query.customer_email && (
                    <a
                      href={`mailto:${query.customer_email}`}
                      className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>{query.customer_email}</span>
                    </a>
                  )}

                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3 h-3" />
                    {new Date(query.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="flex items-center gap-2 border-t md:border-t-0 pt-3 md:pt-0">
                <button
                  type="button"
                  onClick={() => handleStatusChange(query.id, 'Contacted')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    query.status === 'Contacted'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  Mark Contacted
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange(query.id, 'Resolved')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    query.status === 'Resolved'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  Mark Resolved
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
