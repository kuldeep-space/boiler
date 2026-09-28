'use client';

import React, { useState } from 'react';
import { useAppStore } from '../../../lib/store';
import { Product, PurchaseMode } from '../../../lib/types';
import { Package, Plus, Edit2, Trash2, ShieldCheck, ClipboardList, ShoppingCart } from 'lucide-react';

export default function AdminProductsPage() {
  const { products, categories, saveProduct, deleteProduct } = useAppStore();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 'cat-steam-boilers');
  const [mode, setMode] = useState<PurchaseMode>('quote');
  const [price, setPrice] = useState(2500000);
  const [hsnCode, setHsnCode] = useState('84021100');
  const [gstRate, setGstRate] = useState(18);
  const [capacity, setCapacity] = useState('3.0 TPH');
  const [fuelType, setFuelType] = useState('Biomass Pellets / Wood');
  const [pressure, setPressure] = useState('10.5 kg/cm²');
  const [efficiency, setEfficiency] = useState('84%');
  const [dimensions, setDimensions] = useState('5000 x 2500 x 3000 mm');
  const [weight, setWeight] = useState('14000 kg');
  const [material, setMaterial] = useState('SA 516 Gr 70 Boiler Quality Steel');
  const [shortDescription, setShortDescription] = useState('');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80');

  const openNewForm = () => {
    setEditingId(null);
    setName('');
    setSku(`PJIW-NEW-${Math.floor(1000 + Math.random() * 9000)}`);
    setPrice(1500000);
    setShortDescription('Heavy-duty industrial boiler engineered for process plants.');
    setIsEditing(true);
  };

  const openEditForm = (p: Product) => {
    setEditingId(p.id);
    setName(p.name);
    setSku(p.sku);
    setCategoryId(p.categoryId);
    setMode(p.mode);
    setPrice(p.price);
    setHsnCode(p.hsnCode);
    setGstRate(p.gstRate);
    setCapacity(p.capacity || "");
    setFuelType(p.fuelType || "");
    setPressure(p.pressure || "");
    setEfficiency(p.efficiency || "");
    setDimensions(p.dimensions || "");
    setWeight(p.weight || "");
    setMaterial(p.material || "");
    setShortDescription(p.shortDescription || "");
    setImage(p.image || "");
    setIsEditing(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const catObj = categories.find((c) => c.id === categoryId) || categories[0];
    const newProduct: Product = {
      id: editingId || `prod-${Date.now()}`,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      name,
      sku,
      categoryId,
      categoryName: catObj.name,
      brand: 'Pandey Ji Iron Works',
      mode,
      price: Number(price),
      hsnCode,
      gstRate: Number(gstRate),
      availability: 'in_stock',
      capacity,
      fuelType,
      pressure,
      efficiency,
      dimensions,
      weight,
      material,
      warranty: '18 Months Warranty',
      shortDescription,
      description: shortDescription,
      features: ['IBR Form IIIC Certified', 'Three-pass wetback shell design', 'Automatic safety cut-offs'],
      applications: ['Textile Processing', 'Pharma Plants', 'Food Processing'],
      specifications: { 'Capacity': capacity, 'Operating Pressure': pressure },
      image,
      gallery: [image],
      documents: [{ id: 'd1', title: `${name} Datasheet`, fileType: 'PDF', fileSize: '2.5 MB', url: '#' }],
      freightMode: 'fixed',
      fixedFreightAmount: 25000,
      status: 'published'
    };

    saveProduct(newProduct);
    setIsEditing(false);
    alert('Product equipment saved successfully!');
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this industrial product SKU?')) {
      deleteProduct(id);
    }
  };

  const formatPrice = (val?: number) => { val = val || 0;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-amber-500" />
            Product & Equipment Catalogue Manager ({products.length})
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Add/edit SKUs, set Direct Purchase vs Request Quote modes, HSN Codes, and technical specifications.
          </p>
        </div>

        <button
          onClick={openNewForm}
          className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" /> Add Industrial Equipment SKU
        </button>
      </div>

      {isEditing && (
        <form onSubmit={handleSaveProduct} className="bg-white border border-slate-300 rounded-2xl p-6 shadow-xl space-y-4 text-xs">
          <h3 className="font-extrabold text-sm text-slate-900 border-b border-slate-200 pb-2">
            {editingId ? 'Edit Equipment SKU' : 'Add New Industrial Boiler / Auxiliary'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Product Title *</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl font-bold text-slate-900" required />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">SKU Number *</label>
              <input type="text" value={sku} onChange={(e) => setSku(e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono uppercase" required />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Category *</label>
              <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium">
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Purchasing Mode *</label>
              <select value={mode} onChange={(e) => setMode(e.target.value as PurchaseMode)} className="w-full p-2.5 bg-slate-50 border rounded-xl font-bold text-amber-700">
                <option value="quote">Request a Quote Mode (Custom Price)</option>
                <option value="direct">Direct Purchase Mode (Standard Price)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Base Price (₹) *</label>
              <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono font-bold" required />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">HSN Code *</label>
              <input type="text" value={hsnCode} onChange={(e) => setHsnCode(e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono" required />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">GST Tax Rate (%)</label>
              <input type="number" value={gstRate} onChange={(e) => setGstRate(Number(e.target.value))} className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono" required />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Steam / Heat Capacity</label>
              <input type="text" value={capacity} onChange={(e) => setCapacity(e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl" required />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Fuel Type</label>
              <input type="text" value={fuelType} onChange={(e) => setFuelType(e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl" required />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Operating Pressure</label>
              <input type="text" value={pressure} onChange={(e) => setPressure(e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl" required />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Thermal Efficiency</label>
              <input type="text" value={efficiency} onChange={(e) => setEfficiency(e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl" required />
            </div>

            <div className="sm:col-span-3">
              <label className="block font-bold text-slate-700 mb-1">Short Description</label>
              <input type="text" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} className="w-full p-2.5 bg-slate-50 border rounded-xl" required />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t">
            <button type="button" onClick={() => setIsEditing(false)} className="px-4 py-2 bg-slate-100 font-bold text-xs rounded-xl">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-slate-900 text-white font-bold text-xs rounded-xl">Save Equipment SKU</button>
          </div>
        </form>
      )}

      {/* Equipment Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-slate-700">
            <thead className="bg-slate-100 font-bold text-slate-600 uppercase text-[10px]">
              <tr>
                <th className="p-3">Equipment</th>
                <th className="p-3">Mode</th>
                <th className="p-3">Price / HSN</th>
                <th className="p-3">Capacity & Fuel</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="p-3 flex items-center gap-3">
                    <img src={p.image} alt="" className="w-10 h-8 object-cover rounded border bg-slate-100" />
                    <div>
                      <strong className="text-slate-900 block">{p.name}</strong>
                      <span className="text-slate-400 font-mono text-[10px]">SKU: {p.sku} | Cat: {p.categoryName}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    {p.mode === 'quote' ? (
                      <span className="bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded text-[10px]">
                        RFQ Quote Mode
                      </span>
                    ) : (
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded text-[10px]">
                        Direct Purchase
                      </span>
                    )}
                  </td>
                  <td className="p-3 font-mono font-bold text-slate-900">
                    {formatPrice(p.price)}
                    <span className="text-[10px] text-slate-400 block font-normal">HSN {p.hsnCode} ({p.gstRate}%)</span>
                  </td>
                  <td className="p-3">
                    <span className="font-bold text-slate-900 block">{p.capacity}</span>
                    <span className="text-[11px] text-slate-500">{p.fuelType}</span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEditForm(p)} className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700" title="Edit">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-1.5 bg-rose-50 hover:bg-rose-100 rounded text-rose-600" title="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
