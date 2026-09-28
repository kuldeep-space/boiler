'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';
import { RoleSwitcher } from '../../../components/layout/RoleSwitcher';
import { useAppStore } from '../../../lib/store';
import { 
  Flame, 
  ShoppingCart, 
  ClipboardList, 
  CheckCircle2, 
  Clock, 
  Download, 
  FileText, 
  ShieldCheck, 
  Truck, 
  Wrench, 
  Heart, 
  PhoneCall, 
  ChevronRight,
  ArrowRight,
  Zap,
  Info
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slugParam = params?.slug as string;

  const { products, addToCart, wishlist, toggleWishlist } = useAppStore();

  const product = products.find((p) => p.slug === slugParam || p.id === slugParam) || products[0];
  const isWishlisted = wishlist.includes(product.id);

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedQty, setSelectedQty] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'features' | 'applications' | 'downloads'>('specs');

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedQty);
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <RoleSwitcher />
      <Header />

      {/* Breadcrumb Trail */}
      <div className="bg-white border-b border-slate-200 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500 font-medium overflow-x-auto">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/products" className="hover:text-slate-900">Products</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href={`/products?cat=${product.categoryId}`} className="hover:text-slate-900">{product.categoryName}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-bold truncate">{product.name}</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full space-y-12">
        {/* Main Product Hero Grid */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Gallery Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              <button
                onClick={() => toggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-2.5 rounded-full bg-white shadow-md transition ${
                  isWishlisted ? 'text-rose-600' : 'text-slate-400 hover:text-rose-600'
                }`}
                title="Save to Wishlist"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-600' : ''}`} />
              </button>

              <div className="absolute top-4 left-4 flex flex-col gap-1">
                {product.mode === 'quote' ? (
                  <span className="bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded shadow uppercase tracking-wider">
                    Custom Quote Mode
                  </span>
                ) : (
                  <span className="bg-emerald-600 text-white font-black text-xs px-3 py-1 rounded shadow uppercase tracking-wider">
                    Direct Purchase Mode
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Row */}
            {product.gallery && product.gallery.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.gallery.map((imgUrl, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`w-20 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition ${
                      selectedImage === imgUrl ? 'border-sky-600 shadow' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Quality Seals */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold text-slate-700">
              <div className="border-r border-slate-200 pr-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <span>IBR Form IIIC Approved</span>
              </div>
              <div className="border-r border-slate-200 pr-2">
                <Wrench className="w-4 h-4 text-sky-600 mx-auto mb-1" />
                <span>{product.warranty}</span>
              </div>
              <div>
                <Truck className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                <span>Pan-India Hydraulic Transport</span>
              </div>
            </div>
          </div>

          {/* Details & Purchase Panel */}
          <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>SKU: <strong>{product.sku}</strong></span>
                <span>HSN Code: <strong>{product.hsnCode}</strong> (GST {product.gstRate}%)</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {product.name}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Engineering Snapshot Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-100 p-3 rounded-xl border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Capacity</span>
                  <strong className="text-slate-900 font-mono">{product.capacity}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Pressure</span>
                  <strong className="text-slate-900 font-mono">{product.pressure}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Efficiency</span>
                  <strong className="text-slate-900 font-mono">{product.efficiency}</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase font-bold block">Status</span>
                  <strong className="text-emerald-700 font-bold capitalize">{product.availability.replace('_', ' ')}</strong>
                </div>
              </div>

              {/* Price Display */}
              <div className="bg-slate-900 text-white p-4 rounded-xl border border-slate-800 space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-black text-amber-400">
                    {product.mode === 'quote' ? 'Configuration Price on RFQ' : formatPrice(product.price)}
                  </span>
                  {product.compareAtPrice && product.mode === 'direct' && (
                    <span className="text-sm text-slate-400 line-through font-mono">
                      {formatPrice(product.compareAtPrice)}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-300 font-mono">
                  + {product.gstRate}% GST applicable | Seller State: MH (27)
                </p>

                {/* Tiered Discount Callout */}
                {product.tieredPricing && product.tieredPricing.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-800 text-xs text-amber-300 space-y-1">
                    <span className="font-bold flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-400" /> Tiered Volume Discounts:
                    </span>
                    <div className="grid grid-cols-3 gap-2 text-[11px]">
                      {product.tieredPricing.map((t, idx) => (
                        <div key={idx} className="bg-slate-800 p-1.5 rounded text-center">
                          <span className="block text-slate-400">{t.minQty}+ Units</span>
                          <strong className="text-white font-mono">{formatPrice(t.price)}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Quantity Selector for Direct Purchase */}
              {product.mode === 'direct' && (
                <div className="flex items-center gap-4 py-2">
                  <label className="text-xs font-bold text-slate-700 uppercase">Quantity:</label>
                  <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-slate-50">
                    <button
                      onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))}
                      className="px-3 py-1.5 text-slate-700 hover:bg-slate-200 font-bold"
                    >
                      -
                    </button>
                    <span className="px-4 py-1.5 font-bold text-slate-900 text-sm">{selectedQty}</span>
                    <button
                      onClick={() => setSelectedQty(selectedQty + 1)}
                      className="px-3 py-1.5 text-slate-700 hover:bg-slate-200 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ACTION BUTTONS */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              {product.mode === 'quote' ? (
                <div className="space-y-2">
                  <Link
                    href={`/request-quote?productId=${product.id}`}
                    className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                  >
                    <ClipboardList className="w-5 h-5" />
                    Request Custom Quote (RFQ)
                  </Link>
                  <p className="text-[11px] text-slate-500 text-center">
                    Submit your steam flow, working pressure & plant location for itemized quote within 4 hours.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => addToCart(product, selectedQty)}
                    className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </button>

                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow transition flex items-center justify-center gap-2"
                  >
                    Buy Now
                  </button>
                </div>
              )}

              {/* Direct Sales Assistance Hotline */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <PhoneCall className="w-4 h-4 text-amber-600" />
                  <span className="font-semibold text-slate-800">Need Engineering Assistance?</span>
                </div>
                <a href="tel:+9118002668899" className="text-sky-700 font-bold hover:underline">
                  +91 1800 266 8899
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Technical Specifications & Information */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
          <div className="flex border-b border-slate-200 overflow-x-auto text-xs font-bold uppercase tracking-wider">
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-5 py-3 border-b-2 transition whitespace-nowrap ${
                activeTab === 'specs' ? 'border-sky-600 text-sky-700' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`px-5 py-3 border-b-2 transition whitespace-nowrap ${
                activeTab === 'features' ? 'border-sky-600 text-sky-700' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Engineering Features
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`px-5 py-3 border-b-2 transition whitespace-nowrap ${
                activeTab === 'applications' ? 'border-sky-600 text-sky-700' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Applications & Industry Uses
            </button>
            <button
              onClick={() => setActiveTab('downloads')}
              className={`px-5 py-3 border-b-2 transition whitespace-nowrap ${
                activeTab === 'downloads' ? 'border-sky-600 text-sky-700' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Brochures & CAD Downloads ({product.documents?.length || 0})
            </button>
          </div>

          {/* TAB 1: TECH SPECS TABLE */}
          {activeTab === 'specs' && (
            <div className="space-y-4">
              <h3 className="font-bold text-base text-slate-900">Comprehensive Engineering Datasheet</h3>
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-xs text-left text-slate-700">
                  <tbody className="divide-y divide-slate-200">
                    <tr className="bg-slate-50">
                      <td className="p-3 font-bold text-slate-900 w-1/3">Boiler Model & SKU</td>
                      <td className="p-3 font-mono">{product.name} ({product.sku})</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Steam / Thermal Capacity</td>
                      <td className="p-3 font-mono">{product.capacity}</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">Design Operating Pressure</td>
                      <td className="p-3 font-mono">{product.pressure}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Fuel & Combustion System</td>
                      <td className="p-3">{product.fuelType}</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">Thermal Efficiency Rating</td>
                      <td className="p-3 font-mono">{product.efficiency}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Dimensions (L x W x H)</td>
                      <td className="p-3 font-mono">{product.dimensions}</td>
                    </tr>
                    <tr className="bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">Total Dry Weight</td>
                      <td className="p-3 font-mono">{product.weight}</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-slate-900">Pressure Vessel Material</td>
                      <td className="p-3">{product.material}</td>
                    </tr>
                    
                    {/* Custom Spec key-values */}
                    {Object.entries(product.specifications || {}).map(([key, val], idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50' : ''}>
                        <td className="p-3 font-bold text-slate-900">{key}</td>
                        <td className="p-3 font-mono">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: FEATURES */}
          {activeTab === 'features' && (
            <div className="space-y-4">
              <h3 className="font-bold text-base text-slate-900">Key Design Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(product.features || []).map((feat, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-start gap-2 text-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-slate-800 font-medium">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: APPLICATIONS */}
          {activeTab === 'applications' && (
            <div className="space-y-4">
              <h3 className="font-bold text-base text-slate-900">Industrial Process Applications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(product.applications || []).map((app, idx) => (
                  <div key={idx} className="bg-sky-50/60 p-3 rounded-xl border border-sky-100 text-xs font-semibold text-sky-900 flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-500 shrink-0" />
                    {app}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: DOWNLOADS */}
          {activeTab === 'downloads' && (
            <div className="space-y-4">
              <h3 className="font-bold text-base text-slate-900">Technical Documentation & Downloads</h3>
              <div className="space-y-2">
                {(product.documents || []).map((doc) => (
                  <div key={doc.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-sky-700" />
                      <div>
                        <strong className="text-slate-900 text-sm block">{doc.title}</strong>
                        <span className="text-slate-400 font-mono text-[11px]">{doc.fileType} | {doc.fileSize}</span>
                      </div>
                    </div>
                    <a
                      href="#"
                      onClick={(e) => { e.preventDefault(); alert(`Downloading ${doc.title}...`); }}
                      className="px-3.5 py-1.5 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition flex items-center gap-1 text-[11px]"
                    >
                      <Download className="w-3.5 h-3.5" /> Download
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
