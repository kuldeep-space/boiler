'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { RoleSwitcher } from '../../components/layout/RoleSwitcher';
import { ProductCard } from '../../components/product/ProductCard';
import { useAppStore } from '../../lib/store';
import { Search, SlidersHorizontal, RefreshCw, Layers, ArrowRight } from 'lucide-react';

export default function ProductCataloguePage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('cat') || '';
  const initialSearch = searchParams.get('q') || '';

  const { products, categories } = useAppStore();

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedFuel, setSelectedFuel] = useState<string>('');
  const [selectedMode, setSelectedMode] = useState<string>(''); // 'direct' | 'quote'
  const [selectedAvailability, setSelectedAvailability] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('featured');

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesSku = p.sku.toLowerCase().includes(q);
        const matchesCat = p.categoryName.toLowerCase().includes(q);
        const matchesHsn = p.hsnCode.includes(q);
        const matchesFuel = p.fuelType.toLowerCase().includes(q);
        if (!matchesName && !matchesSku && !matchesCat && !matchesHsn && !matchesFuel) return false;
      }

      // Category
      if (selectedCategory) {
        if (p.categoryId !== selectedCategory && p.categoryName.toLowerCase() !== selectedCategory.toLowerCase()) {
          const matchedCat = categories.find((c) => c.slug === selectedCategory || c.id === selectedCategory);
          if (matchedCat && p.categoryId !== matchedCat.id) return false;
        }
      }

      // Mode
      if (selectedMode && p.mode !== selectedMode) return false;

      // Availability
      if (selectedAvailability && p.availability !== selectedAvailability) return false;

      // Fuel Type
      if (selectedFuel) {
        if (!p.fuelType.toLowerCase().includes(selectedFuel.toLowerCase())) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, categories, searchQuery, selectedCategory, selectedMode, selectedAvailability, selectedFuel, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedFuel('');
    setSelectedMode('');
    setSelectedAvailability('');
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ backgroundColor: '#eeebe3' }}>
      <RoleSwitcher />
      <Header />

      {/* Page Header (40px radius card) */}
      <div className="px-4 pt-6 sm:pt-8 max-w-7xl mx-auto w-full">
        <div
          className="p-8 sm:p-12 text-white relative overflow-hidden"
          style={{
            backgroundColor: '#171e19',
            borderRadius: '40px',
            boxShadow: '0 20px 50px -12px rgba(23, 30, 25, 0.25)',
          }}
        >
          {/* Decorative sage blob */}
          <div
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none blur-3xl opacity-20"
            style={{ backgroundColor: '#b7c6c2' }}
          />

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-xl">
              <span className="label-tag text-[11px] font-black uppercase tracking-widest text-[#ca0013] block mb-2">
                Official Equipment Spectrum
              </span>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white mb-2">
                Industrial Boiler Equipment Catalogue
              </h1>
              <p className="text-xs sm:text-sm text-[#b7c6c2] font-semibold leading-relaxed">
                Browse IBR Steam Boilers, Thermic Fluid Heaters, Auxiliaries & Genuine Spare Parts.
                Direct manufacturer dispatch from Thanagazi, Rajasthan.
              </p>
            </div>

            <div
              className="p-4 rounded-3xl flex items-center gap-6"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(183, 198, 194, 0.2)',
              }}
            >
              <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#b7c6c2]">
                  Total Equipment
                </span>
                <strong className="text-lg font-black text-white">{products.length} Models</strong>
              </div>
              <div className="border-l border-white/20 pl-6">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#b7c6c2]">
                  Filtered Result
                </span>
                <strong className="text-lg font-black text-[#ca0013]">{filteredProducts.length} Showing</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Left Sidebar Filters (24px radius card) */}
          <aside className="lg:col-span-1 space-y-6">
            <div
              className="p-6 space-y-5"
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '24px',
                border: '1px solid rgba(183, 198, 194, 0.3)',
                boxShadow: '0 10px 30px -5px rgba(23, 30, 25, 0.05)',
              }}
            >
              <div className="flex items-center justify-between border-b border-[#b7c6c2]/30 pb-3">
                <h3 className="font-black text-sm text-[#171e19] flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#ca0013]" />
                  Filters
                </h3>
                <button
                  onClick={clearFilters}
                  className="text-xs text-[#ca0013] hover:underline font-black flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Reset
                </button>
              </div>

              {/* Search Box */}
              <div>
                <label className="block text-[10px] font-black text-[#b7c6c2] mb-1.5 uppercase tracking-wider">
                  Keyword / SKU Search
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search boiler name, SKU..."
                    className="w-full pl-8 pr-3 py-2 bg-[#eeebe3] rounded-2xl text-xs font-semibold text-[#171e19] outline-none border border-[#b7c6c2]/40 focus:border-[#ca0013]"
                  />
                  <Search className="w-3.5 h-3.5 text-[#b7c6c2] absolute left-2.5 top-2.5" />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-[10px] font-black text-[#b7c6c2] mb-1.5 uppercase tracking-wider">
                  Product Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 bg-[#eeebe3] rounded-2xl text-xs font-semibold text-[#171e19] outline-none border border-[#b7c6c2]/40"
                >
                  <option value="">All Categories ({categories.length})</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Purchase Mode Filter */}
              <div>
                <label className="block text-[10px] font-black text-[#b7c6c2] mb-1.5 uppercase tracking-wider">
                  Purchasing Mode
                </label>
                <div className="space-y-2 text-xs text-[#171e19] font-bold">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="mode"
                      value=""
                      checked={selectedMode === ''}
                      onChange={() => setSelectedMode('')}
                      className="accent-[#ca0013]"
                    />
                    All Equipment
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="mode"
                      value="direct"
                      checked={selectedMode === 'direct'}
                      onChange={() => setSelectedMode('direct')}
                      className="accent-[#ca0013]"
                    />
                    Direct Purchase (Standard)
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="mode"
                      value="quote"
                      checked={selectedMode === 'quote'}
                      onChange={() => setSelectedMode('quote')}
                      className="accent-[#ca0013]"
                    />
                    Request a Quote (Custom RFQ)
                  </label>
                </div>
              </div>

              {/* Fuel Type Filter */}
              <div>
                <label className="block text-[10px] font-black text-[#b7c6c2] mb-1.5 uppercase tracking-wider">
                  Heating / Fuel Source
                </label>
                <select
                  value={selectedFuel}
                  onChange={(e) => setSelectedFuel(e.target.value)}
                  className="w-full p-2 bg-[#eeebe3] rounded-2xl text-xs font-semibold text-[#171e19] outline-none border border-[#b7c6c2]/40"
                >
                  <option value="">All Fuel Types</option>
                  <option value="Biomass">Biomass Briquette / Pellets</option>
                  <option value="PNG">PNG / Natural Gas</option>
                  <option value="Oil">Diesel (HSD) / Light Oil</option>
                  <option value="Electric">Electricity (Electric Steam)</option>
                  <option value="Solid Fuel">Solid Coal / Agrowaste</option>
                </select>
              </div>

              {/* Availability Filter */}
              <div>
                <label className="block text-[10px] font-black text-[#b7c6c2] mb-1.5 uppercase tracking-wider">
                  Stock Status
                </label>
                <select
                  value={selectedAvailability}
                  onChange={(e) => setSelectedAvailability(e.target.value)}
                  className="w-full p-2 bg-[#eeebe3] rounded-2xl text-xs font-semibold text-[#171e19] outline-none border border-[#b7c6c2]/40"
                >
                  <option value="">All Statuses</option>
                  <option value="in_stock">In Stock (Thanagazi Ready)</option>
                  <option value="made_to_order">Made to Order (Fabrication)</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Right Product Grid */}
          <div className="lg:col-span-3 space-y-6">
            {/* Sorting & Control Bar (24px radius card) */}
            <div
              className="p-4 rounded-[24px] flex flex-wrap items-center justify-between gap-4"
              style={{
                backgroundColor: '#ffffff',
                border: '1px solid rgba(183, 198, 194, 0.3)',
                boxShadow: '0 10px 30px -5px rgba(23, 30, 25, 0.05)',
              }}
            >
              <span className="text-xs font-bold text-[#6B7280]">
                Showing <strong className="text-[#171e19] font-black">{filteredProducts.length}</strong> of {products.length} models
              </span>

              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-[#b7c6c2] uppercase tracking-wider">Sort:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-1.5 px-3 bg-[#eeebe3] rounded-xl text-xs font-black text-[#171e19] outline-none border border-[#b7c6c2]/40"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Product Name (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Product Cards Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div
                className="p-12 text-center rounded-[32px] space-y-4"
                style={{
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(183, 198, 194, 0.3)',
                }}
              >
                <Layers className="w-12 h-12 text-[#b7c6c2] mx-auto" />
                <h3 className="font-black text-lg text-[#171e19]">No Industrial Boilers Found</h3>
                <p className="text-xs text-[#6B7280] font-semibold max-w-sm mx-auto">
                  No equipment matched your filters. Broaden your criteria or reset filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-primary px-5 py-2.5 text-xs font-black uppercase tracking-wider"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
