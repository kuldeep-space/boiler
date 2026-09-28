'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';
import { RoleSwitcher } from '../../../components/layout/RoleSwitcher';
import { useAppStore } from '../../../lib/store';
import {
  CheckCircle2, ShieldCheck, Truck, Wrench, Heart, PhoneCall,
  ChevronRight, Info, X, Send, Loader2, Table as TableIcon, ArrowRight,
} from 'lucide-react';

interface SpecItem { key: string; value: string; }

function parseTechnicalSpecifications(specs: any): SpecItem[] {
  if (!specs) return [];
  if (Array.isArray(specs)) {
    return specs.filter((s) => s && typeof s === 'object' && ('key' in s || 'parameter' in s))
      .map((s) => ({ key: String(s.key || s.parameter || s.name || '').trim(), value: String(s.value || s.val || '').trim() }))
      .filter((s) => s.key.length > 0 && s.value.length > 0);
  }
  if (typeof specs === 'string') {
    try { return parseTechnicalSpecifications(JSON.parse(specs)); }
    catch {
      const items: SpecItem[] = [];
      for (const line of specs.split(/[\n,;]+/)) {
        const parts = line.split(/[:=]/);
        if (parts.length >= 2) items.push({ key: parts[0].trim(), value: parts.slice(1).join(':').trim() });
      }
      return items;
    }
  }
  if (typeof specs === 'object') return Object.entries(specs).map(([key, value]) => ({ key: String(key).trim(), value: String(value).trim() }));
  return [];
}

export default function ProductDetailPage() {
  const params = useParams();
  const slugParam = params?.slug as string;
  const { products, wishlist, toggleWishlist } = useAppStore();
  const product = products.find((p) => p.slug === slugParam || p.id === slugParam) || products[0];
  const isWishlisted = product ? wishlist.includes(product.id) : false;

  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  const [activeTab, setActiveTab] = useState<'specs' | 'features'>('specs');
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMessage, setInquiryMessage] = useState('');
  const [inquirySubmitting, setInquirySubmitting] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#eeebe3' }}>
        <RoleSwitcher /><Header />
        <main className="flex-1 max-w-7xl mx-auto p-6 md:p-12 text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm mx-auto border" style={{ backgroundColor: '#ffffff', borderColor: 'rgba(183,198,194,0.4)', color: '#b7c6c2' }}><Info className="w-8 h-8" /></div>
          <h2 className="text-2xl font-black" style={{ color: '#171e19' }}>Equipment Model Not Found</h2>
          <p className="text-sm max-w-md font-semibold" style={{ color: '#6B7280' }}>The boiler or auxiliary model you are looking for is currently not in the catalog.</p>
          <Link href="/products" className="btn-primary px-6 py-2.5 text-xs uppercase font-black tracking-wider">Return to Catalogue</Link>
        </main>
        <Footer />
      </div>
    );
  }

  const formatPrice = (val?: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val || 0);
  const dynamicSpecs = parseTechnicalSpecifications(product.specifications);
  const tableRows = [
    { key: 'Manufacturer / Brand', value: 'Pandayji Iron Works (Est. 2019, Pratapgarh Road, Thanagazi, Rajasthan 301022)' },
    { key: 'Model Name / Type', value: product.name },
    { key: 'Rated Steam Capacity', value: product.capacity || 'Standard / Variable' },
    { key: 'Working Pressure', value: product.pressure || '6 - 20 PSI (Non-IBR)' },
    { key: 'Primary Fuel', value: product.fuelType || 'Wood, Sawdust, Biomass' },
    ...dynamicSpecs,
  ];

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryPhone.trim()) return;
    setInquirySubmitting(true);
    try {
      await fetch('/api/catalog/queries', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ customer_name: inquiryName.trim(), customer_phone: inquiryPhone.trim(), customer_email: inquiryEmail.trim(), message: inquiryMessage.trim() || `Inquired about ${product.name}`, product_name: product.name, product_id: product.id }) });
      setInquirySuccess(true);
      setTimeout(() => { setInquiryModalOpen(false); setInquirySuccess(false); setInquiryName(''); setInquiryPhone(''); setInquiryEmail(''); setInquiryMessage(''); }, 2000);
    } catch (err) { console.error('Failed to submit inquiry:', err); } finally { setInquirySubmitting(false); }
  };

  const CARD = { backgroundColor: '#ffffff', borderRadius: 'clamp(20px, 4vw, 32px)', border: '1px solid rgba(183,198,194,0.3)', boxShadow: '0 20px 50px -12px rgba(0,0,0,0.08)' };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#eeebe3' }}>
      <RoleSwitcher /><Header />

      <div className="border-b py-3 px-4" style={{ backgroundColor: '#ffffff', borderColor: 'rgba(183,198,194,0.3)' }}>
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold overflow-x-auto" style={{ color: '#6B7280' }}>
          <Link href="/" className="hover:text-[#ca0013] transition-colors whitespace-nowrap">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#b7c6c2' }} />
          <Link href="/products" className="hover:text-[#ca0013] transition-colors whitespace-nowrap">Products</Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#b7c6c2' }} />
          <Link href={`/products?cat=${product.categoryId}`} className="hover:text-[#ca0013] transition-colors whitespace-nowrap">{product.categoryName}</Link>
          <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#b7c6c2' }} />
          <span className="font-bold truncate" style={{ color: '#171e19' }}>{product.name}</span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8 flex-1 w-full space-y-6 pb-24 md:pb-8">

        <div className="p-5 sm:p-7 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8" style={CARD}>
          <div className="lg:col-span-6 space-y-4">
            <div className="relative overflow-hidden" style={{ aspectRatio: '4/3', borderRadius: '20px', backgroundColor: '#eeebe3', border: '1px solid rgba(183,198,194,0.3)' }}>
              <img src={selectedImage || product.image} alt={product.name} className="w-full h-full object-cover transition-all duration-300" />
              <button onClick={() => toggleWishlist(product.id)} className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 shadow-md bg-white hover:bg-[#ca0013] hover:text-white" style={{ color: isWishlisted ? '#ca0013' : '#171e19', border: '1px solid rgba(183,198,194,0.4)' }}>
                <Heart className="w-4 h-4" fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
              <div className="absolute top-4 left-4">
                <span className="text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider text-white" style={{ backgroundColor: '#ca0013' }}>Pandayji Iron Works</span>
              </div>
            </div>

            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {product.gallery.map((imgUrl, i) => (
                  <button key={i} onClick={() => setSelectedImage(imgUrl)} className="w-20 h-16 overflow-hidden shrink-0 transition-all duration-200" style={{ borderRadius: '12px', border: selectedImage === imgUrl ? '2px solid #ca0013' : '2px solid rgba(183,198,194,0.4)', opacity: selectedImage === imgUrl ? 1 : 0.7 }}>
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="p-4 grid grid-cols-3 gap-2 text-center text-[11px] font-semibold" style={{ backgroundColor: '#eeebe3', borderRadius: '16px', border: '1px solid rgba(183,198,194,0.3)', color: '#171e19' }}>
              <div style={{ borderRight: '1px solid rgba(183,198,194,0.4)' }} className="pr-2"><ShieldCheck className="w-4 h-4 mx-auto mb-1" style={{ color: '#ca0013' }} /><span>Heavy Gauge</span></div>
              <div style={{ borderRight: '1px solid rgba(183,198,194,0.4)' }} className="pr-2"><Wrench className="w-4 h-4 mx-auto mb-1" style={{ color: '#171e19' }} /><span>Hydraulic Tested</span></div>
              <div><Truck className="w-4 h-4 mx-auto mb-1" style={{ color: '#ca0013' }} /><span>Pan-India</span></div>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono flex-wrap gap-2">
                <span style={{ color: '#b7c6c2' }}>SKU: <strong style={{ color: '#171e19' }}>{product.sku}</strong></span>
                <span className="font-bold px-2.5 py-0.5 rounded-full border text-[11px]" style={{ color: '#171e19', backgroundColor: 'rgba(183,198,194,0.2)', borderColor: 'rgba(183,198,194,0.4)' }}>Est. 2019, Thanagazi</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black leading-tight" style={{ color: '#171e19' }}>{product.name}</h1>
              {product.description && <p className="text-xs sm:text-sm leading-relaxed font-semibold" style={{ color: '#6B7280' }}>{product.description}</p>}

              <div className="p-5 space-y-1" style={{ backgroundColor: '#171e19', borderRadius: '20px' }}>
                <span className="text-[11px] uppercase tracking-widest font-bold block" style={{ color: '#b7c6c2' }}>Ex-Factory Price</span>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl sm:text-4xl font-black font-mono" style={{ color: '#ca0013' }}>{formatPrice(product.price)}</span>
                  <span className="text-xs" style={{ color: '#b7c6c2' }}>/ Piece</span>
                </div>
                {product.compareAtPrice && <span className="text-xs line-through" style={{ color: '#6B7280' }}>{formatPrice(product.compareAtPrice)}</span>}
                <p className="text-[11px] font-mono" style={{ color: '#6B7280' }}>+ 18% GST Applicable. Transport as per location.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3" style={{ backgroundColor: 'rgba(238,235,227,0.7)', borderRadius: '16px', border: '1px solid rgba(183,198,194,0.3)' }}>
                {[{ label: 'Capacity', value: product.capacity || 'Standard' }, { label: 'Pressure', value: product.pressure || '6-20 PSI' }, { label: 'Fuel', value: product.fuelType || 'Wood' }, { label: 'Brand', value: 'Pandayji' }].map(({ label, value }) => (
                  <div key={label} className="text-xs">
                    <span className="text-[10px] uppercase font-bold block" style={{ color: '#b7c6c2' }}>{label}</span>
                    <strong className="font-mono font-black truncate block" style={{ color: '#171e19' }}>{value}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4" style={{ borderTop: '1px solid rgba(183,198,194,0.3)' }}>
              <div className="flex gap-2">
                <a href="tel:9680429713" className="flex-1 py-3.5 px-3 text-white font-black text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 hover:-translate-y-0.5" style={{ backgroundColor: '#171e19', borderRadius: '16px', boxShadow: '0 8px 20px -4px rgba(23,30,25,0.25)' }}>
                  <PhoneCall className="w-3.5 h-3.5" /><span>96804 29713</span>
                </a>
                <a href="tel:9024633928" className="py-3.5 px-4 text-white font-black text-[11px] uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 hover:-translate-y-0.5" style={{ backgroundColor: '#171e19', borderRadius: '16px', border: '1px solid rgba(183,198,194,0.2)' }}>
                  <PhoneCall className="w-3.5 h-3.5" /><span>90246 33928</span>
                </a>
              </div>
              <button type="button" onClick={() => setInquiryModalOpen(true)} className="btn-primary w-full py-3.5 px-4 flex items-center justify-center gap-2 text-xs font-black uppercase tracking-wider cursor-pointer">
                <Heart className="w-4 h-4 fill-white" /><span>Yes, I am Interested — Get Best Quote</span><ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-7 lg:p-10 space-y-6" style={CARD}>
          <div className="flex overflow-x-auto text-xs font-bold uppercase tracking-wider" style={{ borderBottom: '1px solid rgba(183,198,194,0.3)' }}>
            <button onClick={() => setActiveTab('specs')} className="px-5 py-3 border-b-2 transition whitespace-nowrap flex items-center gap-2" style={{ borderColor: activeTab === 'specs' ? '#ca0013' : 'transparent', color: activeTab === 'specs' ? '#ca0013' : '#6B7280' }}>
              <TableIcon className="w-4 h-4" />Technical Specifications
            </button>
            <button onClick={() => setActiveTab('features')} className="px-5 py-3 border-b-2 transition whitespace-nowrap" style={{ borderColor: activeTab === 'features' ? '#ca0013' : 'transparent', color: activeTab === 'features' ? '#ca0013' : '#6B7280' }}>
              Engineering Features
            </button>
          </div>

          {activeTab === 'specs' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div><h3 className="font-extrabold text-base" style={{ color: '#171e19' }}>Comprehensive Technical Specifications</h3><p className="text-xs" style={{ color: '#6B7280' }}>Standard engineering datasheet for {product.name}</p></div>
                <span className="text-[11px] font-bold px-3 py-1 rounded-full border" style={{ color: '#171e19', backgroundColor: 'rgba(183,198,194,0.2)', borderColor: 'rgba(183,198,194,0.4)' }}>{tableRows.length} Parameters</span>
              </div>
              <div style={{ border: '1px solid rgba(183,198,194,0.3)', borderRadius: '16px', overflow: 'hidden' }}>
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="text-white font-bold uppercase tracking-wider text-[11px]" style={{ backgroundColor: '#171e19' }}>
                      <th className="py-3.5 px-5 w-2/5" style={{ borderRight: '1px solid rgba(183,198,194,0.15)' }}>Technical Parameter</th>
                      <th className="py-3.5 px-5">Engineering Value</th>
                    </tr>
                  </thead>
                  <tbody style={{ color: '#171e19' }}>
                    {tableRows.map((item, idx) => (
                      <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? 'rgba(238,235,227,0.5)' : '#ffffff' }}>
                        <td className="py-3 px-5 font-bold" style={{ borderRight: '1px solid rgba(183,198,194,0.3)' }}>{item.key}</td>
                        <td className="py-3 px-5 font-mono font-medium">{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="space-y-4">
              <h3 className="font-bold text-base" style={{ color: '#171e19' }}>Key Design Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['Heavy gauge stainless steel or high-tensile mild steel construction', 'Optimized heating chamber for wood sawdust and biomass fuel efficiency', 'Precision safety valve and pressure gauge fittings', 'Low maintenance design with simple ash removal and soot cleaning ports', 'Tested under hydraulic pressure before factory dispatch', 'Engineered by Pandayji Iron Works (Est. 2019) for continuous Indian dairy and plant operations'].map((feat, idx) => (
                  <div key={idx} className="p-3.5 flex items-start gap-2.5 text-xs" style={{ backgroundColor: 'rgba(238,235,227,0.6)', borderRadius: '14px', border: '1px solid rgba(183,198,194,0.3)' }}>
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: '#ca0013' }} />
                    <span className="font-medium" style={{ color: '#171e19' }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {inquiryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="max-w-lg w-full p-6 md:p-8 relative" style={{ backgroundColor: '#ffffff', borderRadius: '28px', border: '1px solid rgba(183,198,194,0.3)', boxShadow: '0 30px 60px -15px rgba(0,0,0,0.25)' }}>
            <button onClick={() => setInquiryModalOpen(false)} className="absolute top-5 right-5 p-2 rounded-full transition-all cursor-pointer" style={{ color: '#b7c6c2' }}><X className="w-5 h-5" /></button>
            {inquirySuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: 'rgba(202,0,19,0.1)' }}><CheckCircle2 className="w-8 h-8" style={{ color: '#ca0013' }} /></div>
                <h3 className="text-xl font-black" style={{ color: '#171e19' }}>Inquiry Sent Successfully!</h3>
                <p className="text-xs max-w-sm mx-auto font-semibold" style={{ color: '#6B7280' }}>Our team will contact you at <strong style={{ color: '#171e19' }}>{inquiryPhone}</strong> shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded border" style={{ color: '#ca0013', backgroundColor: 'rgba(202,0,19,0.06)', borderColor: 'rgba(202,0,19,0.2)' }}>Direct Manufacturer Inquiry</span>
                  <h3 className="text-xl font-black mt-2" style={{ color: '#171e19' }}>Get Best Quote</h3>
                  <p className="text-xs font-medium mt-0.5" style={{ color: '#6B7280' }}>Interested in <strong style={{ color: '#171e19' }}>{product.name}</strong>? Fill in your contact details.</p>
                </div>
                <div className="space-y-3 pt-1">
                  <div><label className="block text-xs font-bold mb-1" style={{ color: '#171e19' }}>Your Name *</label><input type="text" required value={inquiryName} onChange={(e) => setInquiryName(e.target.value)} placeholder="e.g. Ramesh Kumar" className="w-full px-3.5 py-2.5 text-xs font-semibold outline-none" style={{ borderRadius: '12px', border: '1px solid rgba(183,198,194,0.5)', color: '#171e19' }} /></div>
                  <div><label className="block text-xs font-bold mb-1" style={{ color: '#171e19' }}>Phone (WhatsApp / Call) *</label><input type="tel" required value={inquiryPhone} onChange={(e) => setInquiryPhone(e.target.value)} placeholder="e.g. 9876543210" className="w-full px-3.5 py-2.5 text-xs font-bold outline-none font-mono" style={{ borderRadius: '12px', border: '1px solid rgba(183,198,194,0.5)', color: '#171e19' }} /></div>
                  <div><label className="block text-xs font-bold mb-1" style={{ color: '#171e19' }}>Email (Optional)</label><input type="email" value={inquiryEmail} onChange={(e) => setInquiryEmail(e.target.value)} placeholder="name@company.com" className="w-full px-3.5 py-2.5 text-xs font-medium outline-none" style={{ borderRadius: '12px', border: '1px solid rgba(183,198,194,0.5)', color: '#171e19' }} /></div>
                  <div><label className="block text-xs font-bold mb-1" style={{ color: '#171e19' }}>Requirement / City</label><textarea rows={2} value={inquiryMessage} onChange={(e) => setInquiryMessage(e.target.value)} placeholder="e.g. Need for sweet shop in Jaipur, delivery in 10 days." className="w-full px-3.5 py-2.5 text-xs font-medium outline-none resize-none" style={{ borderRadius: '12px', border: '1px solid rgba(183,198,194,0.5)', color: '#171e19' }} /></div>
                </div>
                <div className="pt-2 flex items-center justify-end gap-2">
                  <button type="button" onClick={() => setInquiryModalOpen(false)} className="px-4 py-2.5 text-xs font-bold cursor-pointer" style={{ color: '#6B7280', borderRadius: '12px' }}>Cancel</button>
                  <button type="submit" disabled={inquirySubmitting} className="btn-primary px-6 py-2.5 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-50 cursor-pointer">
                    {inquirySubmitting ? (<><Loader2 className="w-3.5 h-3.5 animate-spin" /><span>Sending...</span></>) : (<><Send className="w-3.5 h-3.5" /><span>Submit Inquiry</span></>)}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}