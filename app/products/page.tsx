'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { RoleSwitcher } from '../../components/layout/RoleSwitcher';
import { ProductCard } from '../../components/product/ProductCard';
import { useAppStore } from '../../lib/store';
import { Search, SlidersHorizontal, RefreshCw, Layers, ArrowRight, X } from 'lucide-react';

function ProductCatalogueContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('cat') || '';
  const initialSearch = searchParams.get('q') || '';

  const { products, categories } = useAppStore();

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedFuel, setSelectedFuel] = useState<string>('');
  const [selectedAvailability, setSelectedAvailability] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (![p.name, p.sku, p.categoryName, p.hsnCode, p.fuelType].some(f => f.toLowerCase().includes(q))) return false;
      }
      if (selectedCategory) {
        if (p.categoryId !== selectedCategory && p.categoryName.toLowerCase() !== selectedCategory.toLowerCase()) {
          const matchedCat = categories.find((c) => c.slug === selectedCategory || c.id === selectedCategory);
          if (matchedCat && p.categoryId !== matchedCat.id) return false;
        }
      }
      if (selectedAvailability && p.availability !== selectedAvailability) return false;
      if (selectedFuel && !p.fuelType.toLowerCase().includes(selectedFuel.toLowerCase())) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, categories, searchQuery, selectedCategory, selectedAvailability, selectedFuel, sortBy]);

  const clearFilters = () => { setSearchQuery(''); setSelectedCategory(''); setSelectedFuel(''); setSelectedAvailability(''); setSortBy('featured'); };
  const activeFilterCount = [searchQuery, selectedCategory, selectedFuel, selectedAvailability].filter(Boolean).length;

  const selectStyle = { backgroundColor: 'rgba(238,235,227,0.7)', borderRadius: '14px', border: '1px solid rgba(183,198,194,0.4)', color: '#171e19' } as const;
  const labelClass = "block text-[10px] font-black text-[#b7c6c2] mb-1.5 uppercase tracking-wider";

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#eeebe3' }}>
      <RoleSwitcher />
      <Header />

      {/* Hero */}
      <div className="px-3 sm:px-4 pt-4 sm:pt-8 pb-4 max-w-7xl mx-auto w-full">
        <div className="p-6 sm:p-10 text-white relative overflow-hidden" style={{ backgroundColor: '#171e19', borderRadius: 'clamp(20px, 4vw, 36px)', boxShadow: '0 20px 50px -12px rgba(23,30,25,0.25)' }}>
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none blur-3xl opacity-20" style={{ backgroundColor: '#b7c6c2' }} />
          <div className="relative z-10">
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white mb-2">Industrial Boiler Equipment Catalogue</h1>
            <p className="text-xs sm:text-sm text-[#b7c6c2] font-semibold leading-relaxed max-w-2xl">Browse IBR Steam Boilers, Thermic Fluid Heaters, Auxiliaries &amp; Genuine Spare Parts. Direct manufacturer dispatch from Thanagazi, Rajasthan.</p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 flex-1 w-full">

        {/* ── Filter + Sort row ── */}
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
          {/* Filter toggle button */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 text-[11px] sm:text-xs font-black uppercase tracking-wider transition-all rounded-xl cursor-pointer flex-1 sm:flex-none justify-center sm:justify-start"
            style={{
              backgroundColor: activeFilterCount > 0 ? '#ca0013' : '#171e19',
              color: '#ffffff',
              boxShadow: activeFilterCount > 0 ? '0 4px 12px -2px rgba(202,0,19,0.3)' : '0 4px 12px -2px rgba(23,30,25,0.15)',
            }}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-white text-[#ca0013] text-[10px] font-black flex items-center justify-center">{activeFilterCount}</span>
            )}
          </button>

          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2.5 text-[11px] sm:text-xs font-bold outline-none cursor-pointer flex-1 sm:flex-none"
            style={{ ...selectStyle, borderRadius: '12px' }}
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-low">Price: Low → High</option>
            <option value="price-high">Price: High → Low</option>
            <option value="name">Name (A-Z)</option>
          </select>

          {/* Clear all — only when filters active */}
          {activeFilterCount > 0 && (
            <button onClick={clearFilters} className="text-[11px] sm:text-xs text-[#ca0013] hover:underline font-black flex items-center gap-1 cursor-pointer whitespace-nowrap flex-shrink-0">
              <RefreshCw className="w-3 h-3" /> Clear
            </button>
          )}
        </div>

        {/* ── Results count (separate row) ── */}
        <div
          className="px-4 py-2.5 rounded-2xl flex items-center justify-between mb-4 sm:mb-6"
          style={{
            backgroundColor: '#ffffff',
            border: '1px solid rgba(183,198,194,0.3)',
          }}
        >
          <span className="text-xs font-bold text-[#6B7280]">
            Showing <strong className="text-[#171e19] font-black">{filteredProducts.length}</strong> of {products.length} models
          </span>
          {selectedCategory && (
            <span className="text-[10px] font-black uppercase tracking-wider text-[#ca0013]">
              Filtered
            </span>
          )}
        </div>

        {/* Product Grid — Full Width now (no sidebar) */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="p-10 sm:p-14 text-center rounded-[28px] space-y-4" style={{ backgroundColor: '#ffffff', border: '1px solid rgba(183,198,194,0.3)' }}>
            <Layers className="w-12 h-12 text-[#b7c6c2] mx-auto" />
            <h3 className="font-black text-lg text-[#171e19]">No Industrial Boilers Found</h3>
            <p className="text-xs text-[#6B7280] font-semibold max-w-sm mx-auto">No equipment matched your filters. Broaden your criteria or reset filters.</p>
            <button onClick={clearFilters} className="btn-primary px-5 py-2.5 text-xs font-black uppercase tracking-wider">Reset All Filters</button>
          </div>
        )}
      </main>

      {/* ── Filter Slide-Out Drawer (overlay from right) ── */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <div className="relative z-50 w-full max-w-sm h-full overflow-y-auto shadow-2xl" style={{ backgroundColor: '#ffffff' }}>
            {/* Drawer header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-5 border-b" style={{ backgroundColor: '#171e19', borderColor: 'rgba(183,198,194,0.2)' }}>
              <h3 className="text-sm font-black text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#ca0013]" /> Filter & Sort
              </h3>
              <div className="flex items-center gap-3">
                <button onClick={clearFilters} className="text-[10px] font-black uppercase tracking-wider text-[#b7c6c2] hover:text-white cursor-pointer">Reset</button>
                <button onClick={() => setDrawerOpen(false)} className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white hover:bg-white/20 cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Drawer body */}
            <div className="p-5 space-y-5">
              {/* Search */}
              <div>
                <label className={labelClass}>Keyword / SKU</label>
                <div className="relative">
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search boiler name, SKU..." className="w-full pl-8 pr-3 py-2.5 text-xs font-semibold outline-none" style={selectStyle} />
                  <Search className="w-3.5 h-3.5 text-[#b7c6c2] absolute left-2.5 top-3" />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className={labelClass}>Product Category</label>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full p-2.5 text-xs font-semibold outline-none" style={selectStyle}>
                  <option value="">All Categories ({categories.length})</option>
                  {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>

              {/* Fuel */}
              <div>
                <label className={labelClass}>Fuel Source</label>
                <select value={selectedFuel} onChange={(e) => setSelectedFuel(e.target.value)} className="w-full p-2.5 text-xs font-semibold outline-none" style={selectStyle}>
                  <option value="">All Fuel Types</option>
                  <option value="Wood">Wood / Sawdust Fired</option>
                  <option value="Biomass">Biomass Briquette / Pellets</option>
                  <option value="PNG">PNG / Natural Gas</option>
                  <option value="Oil">Diesel (HSD) / Light Oil</option>
                  <option value="Electric">Electric Steam</option>
                  <option value="Solid Fuel">Solid Coal / Agrowaste</option>
                </select>
              </div>

              {/* Availability */}
              <div>
                <label className={labelClass}>Stock Status</label>
                <select value={selectedAvailability} onChange={(e) => setSelectedAvailability(e.target.value)} className="w-full p-2.5 text-xs font-semibold outline-none" style={selectStyle}>
                  <option value="">All Statuses</option>
                  <option value="in_stock">In Stock (Thanagazi Ready)</option>
                  <option value="made_to_order">Made to Order</option>
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className={labelClass}>Sort By</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full p-2.5 text-xs font-semibold outline-none" style={selectStyle}>
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Product Name (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Drawer footer — Apply */}
            <div className="sticky bottom-0 p-5 border-t" style={{ backgroundColor: '#ffffff', borderColor: 'rgba(183,198,194,0.3)' }}>
              <button
                onClick={() => setDrawerOpen(false)}
                className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider cursor-pointer"
              >
                Show {filteredProducts.length} Results <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default function ProductCataloguePage() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen bg-[#eeebe3] flex flex-col items-center justify-center">
        <div className="text-[#171e19] font-mono text-sm animate-pulse">Loading Catalogue...</div>
      </div>
    }>
      <ProductCatalogueContent />
    </React.Suspense>
  );
}