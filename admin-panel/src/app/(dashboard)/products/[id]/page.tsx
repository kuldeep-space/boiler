'use client';

import { useState, useRef, useEffect, ChangeEvent, DragEvent, FormEvent } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  UploadCloud, 
  X, 
  Check, 
  Loader2, 
  Sparkles,
  PhoneCall,
  Heart,
  Plus,
  Trash2,
  Table as TableIcon,
  AlertCircle
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

interface ImageFile {
  id: string;
  url: string;
  file?: File;
  name?: string;
  size?: string;
}

interface SpecRow {
  id: string;
  key: string;
  value: string;
}

const PRESET_PARAMETERS = [
  'Capacity',
  'Working Pressure',
  'Material',
  'Type of Steam Boilers',
  'Fuel Type',
  'Voltage',
  'Automation Grade',
  'Phase',
  'Power',
  'Overall Dimensions',
  'Efficiency',
  'Feed Water Pump',
  'Warranty'
];

function parseSpecsToRows(rawSpecs: any): SpecRow[] {
  if (!rawSpecs) return [];
  if (Array.isArray(rawSpecs)) {
    return rawSpecs
      .filter((s) => s && typeof s === 'object' && ('key' in s || 'parameter' in s))
      .map((s, idx) => ({
        id: `spec_row_${idx}_${Date.now()}`,
        key: String(s.key || s.parameter || '').trim(),
        value: String(s.value || s.val || '').trim(),
      }))
      .filter((s) => s.key.length > 0 || s.value.length > 0);
  }
  if (typeof rawSpecs === 'string') {
    try {
      const parsed = JSON.parse(rawSpecs);
      return parseSpecsToRows(parsed);
    } catch {
      const rows: SpecRow[] = [];
      const lines = rawSpecs.split(/[\n,;]+/);
      lines.forEach((line, idx) => {
        const parts = line.split(/[:=]/);
        if (parts.length >= 2) {
          rows.push({
            id: `spec_row_${idx}_${Date.now()}`,
            key: parts[0].trim(),
            value: parts.slice(1).join(':').trim(),
          });
        }
      });
      return rows;
    }
  }
  if (typeof rawSpecs === 'object') {
    return Object.entries(rawSpecs).map(([key, value], idx) => ({
      id: `spec_row_${idx}_${Date.now()}`,
      key: String(key).trim(),
      value: String(value).trim(),
    }));
  }
  return [];
}

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const productId = params?.id as string;

  // Form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [capacity, setCapacity] = useState('');
  const [manufacturer, setManufacturer] = useState('Pandayji Iron Works');
  const [showCallNow, setShowCallNow] = useState(true);
  const [showInterested, setShowInterested] = useState(true);
  const [specs, setSpecs] = useState<SpecRow[]>([]);
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Status states
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Load existing product
  useEffect(() => {
    async function loadProduct() {
      if (!productId) return;
      setFetching(true);
      let found: any = null;

      // 1. Try Supabase
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('products')
          .select('*, product_images(image_url)')
          .eq('id', productId)
          .single();

        if (!error && data) {
          found = {
            ...data,
            images: data.product_images?.map((pi: any) => pi.image_url) || []
          };
        }
      } catch (err) {
        console.warn('Supabase fetch error:', err);
      }

      // 2. Try Catalog API
      if (!found) {
        try {
          const res = await fetch('http://localhost:3000/api/catalog/products');
          if (res.ok) {
            const list = await res.json();
            found = list.find((p: any) => p.id === productId || p.slug === productId);
          }
        } catch (err) {
          console.warn('API fetch error:', err);
        }
      }

      // 3. Try LocalStorage
      if (!found && typeof window !== 'undefined') {
        try {
          const localData = localStorage.getItem('pandayji_catalog_products');
          if (localData) {
            const list = JSON.parse(localData);
            found = list.find((p: any) => p.id === productId || p.slug === productId);
          }
        } catch (err) {
          console.warn('Local storage error:', err);
        }
      }

      if (found) {
        setName(found.name || '');
        setDescription(found.description || '');
        setPrice(found.price ? String(found.price) : '');
        setCapacity(found.capacity || '');
        setManufacturer(found.manufacturer || 'Pandayji Iron Works');
        setShowCallNow(found.show_call_now ?? true);
        setShowInterested(found.show_interested ?? true);
        
        // Populate tabular specs
        const parsedRows = parseSpecsToRows(found.specifications);
        setSpecs(parsedRows);

        // Populate images
        const existingImgs: string[] = Array.isArray(found.images) ? found.images : [];
        setImages(
          existingImgs.map((url: string, i: number) => ({
            id: `img_${i}_${Date.now()}`,
            url,
          }))
        );
      } else {
        setErrorMessage('Product not found or already deleted.');
      }
      setFetching(false);
    }

    loadProduct();
  }, [productId]);

  // Handle new image upload
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const processFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setErrorMessage('');

    const newImages: ImageFile[] = [];
    for (const file of Array.from(fileList)) {
      if (!file.type.startsWith('image/')) continue;
      try {
        const b64 = await fileToBase64(file);
        newImages.push({
          id: Math.random().toString(36).substring(2, 9),
          url: b64,
          file,
          name: file.name
        });
      } catch {
        // ignore
      }
    }
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeImage = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  // Specification Table Handlers
  const handleSpecChange = (id: string, field: 'key' | 'value', val: string) => {
    setSpecs((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: val } : row))
    );
  };

  const addSpecRow = (keyName: string = '', val: string = '') => {
    setSpecs((prev) => [
      ...prev,
      { id: 'spec_' + Date.now() + '_' + Math.random().toString(36).substring(2, 5), key: keyName, value: val }
    ]);
  };

  const removeSpecRow = (id: string) => {
    setSpecs((prev) => prev.filter((row) => row.id !== id));
  };

  const addPresetParameter = (param: string) => {
    const existing = specs.find((s) => s.key.toLowerCase() === param.toLowerCase());
    if (existing) return;
    addSpecRow(param, '');
  };

  // Submit Update
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Product Title is required.');
      return;
    }
    if (!price || isNaN(Number(price))) {
      setErrorMessage('Please enter a valid numeric Price.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setStatusMessage('Updating product specifications...');

    try {
      const finalImageUrls = images.map((img) => img.url);

      const validSpecs = specs
        .map((s) => ({ key: s.key.trim(), value: s.value.trim() }))
        .filter((s) => s.key.length > 0 && s.value.length > 0);

      const serializedSpecs = JSON.stringify(validSpecs);

      const productPayload = {
        id: productId,
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price),
        capacity: capacity.trim() || (validSpecs.find((s) => s.key.toLowerCase() === 'capacity')?.value || null),
        specifications: serializedSpecs,
        manufacturer: manufacturer.trim() || 'Pandayji Iron Works',
        show_call_now: showCallNow,
        show_interested: showInterested,
        images: finalImageUrls,
        updated_at: new Date().toISOString()
      };

      // 1. Update shared catalog API via PUT
      try {
        await fetch('http://localhost:3000/api/catalog/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productPayload)
        });
      } catch (err) {
        console.warn('API update error:', err);
      }

      // 2. Try Supabase
      try {
        const supabase = createClient();
        await supabase
          .from('products')
          .update({
            name: productPayload.name,
            description: productPayload.description,
            price: productPayload.price,
            capacity: productPayload.capacity,
            specifications: productPayload.specifications,
            manufacturer: productPayload.manufacturer,
            show_call_now: productPayload.show_call_now,
            show_interested: productPayload.show_interested
          })
          .eq('id', productId);

        if (finalImageUrls.length > 0) {
          await supabase.from('product_images').delete().eq('product_id', productId);
          const imgRows = finalImageUrls.map((url) => ({
            product_id: productId,
            image_url: url
          }));
          await supabase.from('product_images').insert(imgRows);
        }
      } catch (err) {
        console.warn('Supabase update note:', err);
      }

      // 3. Update localStorage
      if (typeof window !== 'undefined') {
        const localKey = 'pandayji_catalog_products';
        const existing = JSON.parse(localStorage.getItem(localKey) || '[]');
        const updated = existing.map((p: any) =>
          p.id === productId ? { ...p, ...productPayload } : p
        );
        localStorage.setItem(localKey, JSON.stringify(updated));
      }

      setStatusMessage('Product updated successfully!');
      setTimeout(() => {
        router.push('/products');
      }, 700);

    } catch (err: unknown) {
      console.error('Error updating product:', err);
      setErrorMessage(err instanceof Error ? err.message : 'Failed to update product.');
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="p-16 text-center max-w-5xl mx-auto space-y-4">
        <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-semibold text-slate-500">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/products"
            className="p-2.5 bg-white hover:bg-slate-100 border border-slate-200/80 rounded-xl shadow-sm transition-all hover:scale-105 text-slate-600 hover:text-slate-900 group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Edit Product</h1>
              <span className="bg-blue-500/10 text-blue-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-500/20">
                Update Catalog Entry
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium mt-0.5">
              Modify boiler details, photos, or tabular technical specifications.
            </p>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-sm font-semibold shadow-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Main Form Container */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/40 p-6 md:p-10 space-y-10 relative overflow-hidden">
        
        {/* 1. Photos Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#ca0013] text-white flex items-center justify-center font-black text-xs shadow-md shadow-red-500/30">
                1
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900">Product Photos</h2>
                <p className="text-xs text-slate-500">First image will be the primary catalogue picture.</p>
              </div>
            </div>

            {images.length > 0 && (
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                {images.length} {images.length === 1 ? 'photo' : 'photos'}
              </span>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/png,image/jpeg,image/jpg,image/webp"
            className="hidden"
            onChange={handleFileInputChange}
          />

          {/* Photo Preview Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-2">
            {images.map((img, idx) => (
              <div
                key={img.id}
                className="relative group rounded-2xl border border-slate-200 overflow-hidden bg-slate-100 shadow-sm aspect-square"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {idx === 0 && (
                  <span className="absolute top-2 left-2 bg-[#ca0013] text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-md">
                    Cover
                  </span>
                )}

                <button
                  type="button"
                  onClick={(e) => removeImage(img.id, e)}
                  className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center transition-all shadow-md cursor-pointer"
                  title="Remove image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-300 hover:border-[#ca0013] hover:bg-red-50/30 rounded-2xl flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all aspect-square group"
            >
              <Plus className="w-6 h-6 text-slate-400 group-hover:text-[#ca0013] mb-1" />
              <span className="text-[11px] font-bold text-slate-600 group-hover:text-[#ca0013]">Add Photos</span>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-100 w-full" />

        {/* 2. Basic Details */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-[#ca0013] text-white flex items-center justify-center font-black text-xs shadow-md shadow-red-500/30">
              2
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900">Basic Details</h2>
              <p className="text-xs text-slate-500">Edit model title, price, and description.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Product Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Product title"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-[#ca0013] transition-all text-sm font-semibold text-slate-900"
              />
            </div>

            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Equipment details and specifications..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-[#ca0013] transition-all text-sm font-medium text-slate-900 resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Price (₹ INR) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 text-sm">₹</span>
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Price in INR"
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-[#ca0013] transition-all text-sm font-bold text-slate-900 font-mono"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Steam / Output Capacity
              </label>
              <input
                type="text"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="Capacity (e.g. 300 Kg/Hr)"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-[#ca0013] transition-all text-sm font-semibold text-slate-900"
              />
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-100 w-full" />

        {/* 3. Technical Specifications in Tabular Format */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#ca0013] text-white flex items-center justify-center font-black text-xs shadow-md shadow-red-500/30">
                3
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900">Technical Specifications</h2>
                  <span className="bg-emerald-500/10 text-emerald-700 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border border-emerald-500/20 flex items-center gap-1">
                    <TableIcon className="w-3 h-3" /> Tabular Form
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Update engineering parameters and values shown in the customer datasheet table.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => addSpecRow('', '')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-[#ca0013] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Specification Row</span>
            </button>
          </div>

          {/* Preset Parameter Chips */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Quick Suggestions:</span>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_PARAMETERS.map((param) => {
                const isAdded = specs.some((s) => s.key.toLowerCase() === param.toLowerCase());
                return (
                  <button
                    key={param}
                    type="button"
                    disabled={isAdded}
                    onClick={() => addPresetParameter(param)}
                    className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all ${
                      isAdded
                        ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                        : 'bg-white text-slate-700 border-slate-300 hover:border-[#ca0013] hover:text-[#ca0013] hover:bg-red-50/30 cursor-pointer shadow-xs'
                    }`}
                  >
                    + {param}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Specification Table */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm bg-slate-50/50">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                    <th className="py-3 px-4 w-12 text-center">#</th>
                    <th className="py-3 px-4 w-1/3">Parameter / Specification Name</th>
                    <th className="py-3 px-4">Technical Value / Details</th>
                    <th className="py-3 px-4 w-16 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {specs.map((row, index) => (
                    <tr key={row.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="py-2.5 px-4 text-center font-mono font-bold text-slate-400">
                        {index + 1}
                      </td>
                      <td className="py-2.5 px-4">
                        <input
                          type="text"
                          value={row.key}
                          onChange={(e) => handleSpecChange(row.id, 'key', e.target.value)}
                          placeholder="Parameter name"
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#ca0013] focus:ring-2 focus:ring-red-500/10 focus:outline-none font-semibold text-slate-800 text-xs bg-slate-50/50 group-hover:bg-white"
                        />
                      </td>
                      <td className="py-2.5 px-4">
                        <input
                          type="text"
                          value={row.value}
                          onChange={(e) => handleSpecChange(row.id, 'value', e.target.value)}
                          placeholder="Value"
                          className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#ca0013] focus:ring-2 focus:ring-red-500/10 focus:outline-none font-medium text-slate-900 text-xs bg-slate-50/50 group-hover:bg-white font-mono"
                        />
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        <button
                          type="button"
                          onClick={() => removeSpecRow(row.id)}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                          title="Delete row"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {specs.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-slate-400">
                        No specifications added. Click &ldquo;Add Specification Row&rdquo; or a suggested chip above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">
                {specs.filter((s) => s.key && s.value).length} specifications in tabular form
              </span>
              <button
                type="button"
                onClick={() => addSpecRow('', '')}
                className="text-xs font-bold text-[#ca0013] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Another Row
              </button>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-100 w-full" />

        {/* 4. Action Toggles */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-[#ca0013] text-white flex items-center justify-center font-black text-xs shadow-md shadow-red-500/30">
              4
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900">Customer Interaction Buttons</h2>
              <p className="text-xs text-slate-500">Control buttons displayed on this product.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div
              onClick={() => setShowCallNow(!showCallNow)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 select-none ${
                showCallNow ? 'border-red-500/60 bg-red-50/30 shadow-sm' : 'border-slate-200 bg-slate-50/50 opacity-70'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${showCallNow ? 'bg-[#ca0013] text-white' : 'bg-slate-200 text-slate-500'}`}>
                <PhoneCall className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">Show &ldquo;Call Now&rdquo;</span>
                  {showCallNow && <Check className="w-4 h-4 text-[#ca0013]" />}
                </div>
              </div>
            </div>

            <div
              onClick={() => setShowInterested(!showInterested)}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 select-none ${
                showInterested ? 'border-red-500/60 bg-red-50/30 shadow-sm' : 'border-slate-200 bg-slate-50/50 opacity-70'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${showInterested ? 'bg-[#ca0013] text-white' : 'bg-slate-200 text-slate-500'}`}>
                <Heart className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">Show &ldquo;I am Interested&rdquo;</span>
                  {showInterested && <Check className="w-4 h-4 text-[#ca0013]" />}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 font-medium">
            {statusMessage && (
              <span className="text-emerald-600 font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                {statusMessage}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href="/products"
              className="w-full sm:w-auto text-center px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest text-white bg-gradient-to-r from-[#ca0013] to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-600/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
