'use client';

import { useState, useRef, ChangeEvent, DragEvent, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  file: File;
  previewUrl: string;
  name: string;
  size: string;
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

export default function AddProductPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states - completely clean, 0% dummy data
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [capacity, setCapacity] = useState('');
  const [manufacturer, setManufacturer] = useState('Pandayji Iron Works');
  const [showCallNow, setShowCallNow] = useState(true);
  const [showInterested, setShowInterested] = useState(true);

  // Specifications in Tabular Format - starts empty, 0% dummy data
  const [specs, setSpecs] = useState<SpecRow[]>([]);

  // Images state
  const [images, setImages] = useState<ImageFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Submission state
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle files selection
  const processFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    setErrorMessage('');

    const newImages: ImageFile[] = [];
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

    Array.from(fileList).forEach((file) => {
      if (!validTypes.includes(file.type)) {
        setErrorMessage('Please upload JPG, PNG, or WebP images only.');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage('One or more images exceed the 10MB limit.');
        return;
      }

      const previewUrl = URL.createObjectURL(file);
      const sizeStr = file.size > 1024 * 1024 
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` 
        : `${Math.round(file.size / 1024)} KB`;

      newImages.push({
        id: Math.random().toString(36).substring(2, 9),
        file,
        previewUrl,
        name: file.name,
        size: sizeStr
      });
    });

    setImages((prev) => [...prev, ...newImages]);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    processFiles(e.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  };

  const removeImage = (id: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  // Convert file to base64 preview string
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
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
    if (existing) {
      return;
    }
    addSpecRow(param, '');
  };

  // Submit Handler
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
    setStatusMessage('Preparing product data...');

    try {
      const supabase = createClient();
      const base64Images: string[] = [];

      for (const img of images) {
        try {
          const b64 = await fileToBase64(img.file);
          base64Images.push(b64);
        } catch {
          // ignore
        }
      }

      // Try uploading to Supabase Storage if bucket exists
      const uploadedUrls: string[] = [];
      if (images.length > 0) {
        setStatusMessage(`Processing ${images.length} product photos...`);
        for (let i = 0; i < images.length; i++) {
          const img = images[i];
          const fileExt = img.file.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
          const filePath = `products/${fileName}`;

          try {
            const { data: uploadData, error: uploadErr } = await supabase.storage
              .from('product-images')
              .upload(filePath, img.file);

            if (!uploadErr && uploadData) {
              const { data: publicUrlData } = supabase.storage
                .from('product-images')
                .getPublicUrl(filePath);
              if (publicUrlData?.publicUrl) {
                uploadedUrls.push(publicUrlData.publicUrl);
              }
            }
          } catch {
            // ignore
          }
        }
      }

      const finalImageUrls = uploadedUrls.length > 0 ? uploadedUrls : base64Images;

      // Filter out empty spec rows
      const validSpecs = specs
        .map((s) => ({ key: s.key.trim(), value: s.value.trim() }))
        .filter((s) => s.key.length > 0 && s.value.length > 0);

      const serializedSpecs = JSON.stringify(validSpecs);

      const productPayload = {
        name: name.trim(),
        description: description.trim(),
        price: parseFloat(price),
        capacity: capacity.trim() || (validSpecs.find((s) => s.key.toLowerCase() === 'capacity')?.value || null),
        specifications: serializedSpecs,
        manufacturer: manufacturer.trim() || 'Pandayji Iron Works',
        show_call_now: showCallNow,
        show_interested: showInterested,
        images: finalImageUrls,
        created_at: new Date().toISOString()
      };

      setStatusMessage('Saving product to database & synchronized catalog...');

      // 1. Save directly to Supabase Database (Primary Cloud Source of Truth)
      const { data: insertedProduct, error: dbError } = await supabase
        .from('products')
        .insert({
          name: productPayload.name,
          description: productPayload.description,
          price: productPayload.price,
          capacity: productPayload.capacity,
          specifications: productPayload.specifications,
          manufacturer: productPayload.manufacturer,
          show_call_now: productPayload.show_call_now,
          show_interested: productPayload.show_interested
        })
        .select()
        .single();

      if (dbError) {
        setLoading(false);
        setErrorMessage(`Supabase Error (${dbError.code || 'DB'}): ${dbError.message}. Please run the schema SQL in your Supabase SQL Editor to create the 'products' table.`);
        return;
      }

      if (insertedProduct && finalImageUrls.length > 0) {
        const imgRows = finalImageUrls.map((url) => ({
          product_id: insertedProduct.id,
          image_url: url
        }));
        await supabase.from('product_images').insert(imgRows);
      }

      // 2. Backup to localStorage for instant local view
      if (typeof window !== 'undefined') {
        const localKey = 'pandayji_catalog_products';
        const existing = JSON.parse(localStorage.getItem(localKey) || '[]');
        const localProduct = {
          id: insertedProduct?.id || ('prod_' + Date.now()),
          ...productPayload,
          isLocal: false
        };
        existing.unshift(localProduct);
        localStorage.setItem(localKey, JSON.stringify(existing));
      }

      setStatusMessage('Product published to Supabase successfully!');
      setTimeout(() => {
        window.location.href = '/products';
      }, 700);

    } catch (err: unknown) {
      console.error('Error adding product:', err);
      setErrorMessage(err instanceof Error ? err.message : 'Failed to save product. Please try again.');
      setLoading(false);
    }
  };

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
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Add New Product</h1>
              <span className="bg-red-500/10 text-[#ca0013] text-xs font-bold px-2.5 py-0.5 rounded-full border border-red-500/20">
                New Catalog Entry
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium mt-0.5">
              Fill details, photos, and tabular technical specifications to publish this boiler.
            </p>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center gap-3 text-red-700 text-sm font-semibold shadow-sm animate-fade-in">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-600" />
          <p>{errorMessage}</p>
        </div>
      )}

      {/* Main Form Container */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/40 p-6 md:p-10 space-y-10 relative overflow-hidden">
        
        {/* Subtle Decorative Ambient Gradient */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        {/* 1. TOP: Multiple Photos Upload */}
        <div className="space-y-4 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-[#ca0013] text-white flex items-center justify-center font-black text-xs shadow-md shadow-red-500/30">
                1
              </span>
              <div>
                <h2 className="text-base font-bold text-slate-900">Product Photos</h2>
                <p className="text-xs text-slate-500">First uploaded photo will be the main cover picture.</p>
              </div>
            </div>

            {images.length > 0 && (
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                {images.length} {images.length === 1 ? 'photo' : 'photos'} selected
              </span>
            )}
          </div>

          {/* Hidden Actual Input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/png,image/jpeg,image/jpg,image/webp"
            className="hidden"
            onChange={handleFileInputChange}
          />

          {/* Clickable & Drag-and-Drop Area */}
          {images.length === 0 && (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              className={`border-2 border-dashed rounded-2xl p-8 md:p-10 text-center transition-all duration-200 cursor-pointer select-none group flex flex-col items-center justify-center ${
                isDragging
                  ? 'border-[#ca0013] bg-red-50/60 scale-[1.01]'
                  : 'border-slate-300 hover:border-[#ca0013] bg-slate-50/60 hover:bg-red-50/20'
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-slate-200/80 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-red-200 transition-all duration-300 text-slate-400 group-hover:text-[#ca0013]">
                <UploadCloud className="w-8 h-8" />
              </div>

              <p className="text-base font-bold text-slate-800 mb-1 group-hover:text-[#ca0013] transition-colors">
                Click to browse or drag photos here
              </p>
              <p className="text-xs text-slate-500 font-medium max-w-sm mx-auto">
                PNG, JPG, WebP supported.
              </p>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="mt-4 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300/80 rounded-xl text-xs font-bold text-slate-700 shadow-sm transition-all hover:border-[#ca0013] hover:text-[#ca0013] cursor-pointer"
              >
                Choose Photos
              </button>
            </div>
          )}

          {/* Photo Preview Grid */}
          {images.length > 0 && (
            <div className="pt-2">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {images.map((img, idx) => (
                  <div
                    key={img.id}
                    className="relative group rounded-2xl border border-slate-200 overflow-hidden bg-slate-100 shadow-sm aspect-square"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.previewUrl}
                      alt={img.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                    {/* Cover Badge on first image */}
                    {idx === 0 && (
                      <span className="absolute top-2 left-2 bg-[#ca0013] text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-md">
                        Cover
                      </span>
                    )}

                    {/* Image details on hover */}
                    <div className="absolute bottom-2 left-2 right-2 text-white text-[10px] truncate opacity-0 group-hover:opacity-100 transition-opacity font-medium">
                      {img.size}
                    </div>

                    {/* Remove Button */}
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

                {/* Additional Add Box */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all aspect-square group ${
                    isDragging
                      ? 'border-[#ca0013] bg-red-50/60 scale-[1.02]'
                      : 'border-slate-300 hover:border-[#ca0013] hover:bg-red-50/30'
                  }`}
                >
                  <Plus className="w-6 h-6 text-slate-400 group-hover:text-[#ca0013] mb-1" />
                  <span className="text-[11px] font-bold text-slate-600 group-hover:text-[#ca0013]">Add More</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="h-px bg-slate-100 w-full" />

        {/* 2. Basic Details: Title, Description, Price */}
        <div className="space-y-6 relative z-10">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-[#ca0013] text-white flex items-center justify-center font-black text-xs shadow-md shadow-red-500/30">
              2
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900">Basic Details</h2>
              <p className="text-xs text-slate-500">Key equipment information shown in product cards and headings.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
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
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-[#ca0013] transition-all text-sm font-semibold text-slate-900 placeholder:text-slate-400"
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2 space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Description
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Equipment details and specifications..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-[#ca0013] transition-all text-sm font-medium text-slate-900 placeholder:text-slate-400 resize-none"
              />
            </div>

            {/* Price */}
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
                  className="w-full pl-9 pr-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-[#ca0013] transition-all text-sm font-bold text-slate-900 placeholder:text-slate-400 font-mono"
                />
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Ex-factory unit price.</p>
            </div>

            {/* Capacity */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Steam / Output Capacity
              </label>
              <input
                type="text"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="Capacity (e.g. 300 Kg/Hr)"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-[#ca0013] transition-all text-sm font-semibold text-slate-900 placeholder:text-slate-400"
              />
              <p className="text-[11px] text-slate-400 font-medium">Steam output or processing volume.</p>
            </div>
          </div>
        </div>

        <div className="h-px bg-slate-100 w-full" />

        {/* 3. Technical Specifications in Tabular Format */}
        <div className="space-y-6 relative z-10">
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
                  Each row here renders directly as a clean tabular row on the customer product page.
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

          {/* Quick Preset Parameter Chips */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Quick Suggestions:</span>
            </div>
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
                        No specifications added yet. Click &ldquo;Add Specification Row&rdquo; or a suggested chip above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-medium">
                {specs.filter((s) => s.key && s.value).length} valid specifications in tabular form
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

          {/* Manufacturer & Establishment details */}
          <div className="space-y-1.5 pt-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              Manufacturer / Brand
            </label>
            <input
              type="text"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-4 focus:ring-red-500/10 focus:border-[#ca0013] transition-all text-sm font-bold text-slate-900"
            />
            <p className="text-[11px] text-slate-400 font-medium">Pandayji Iron Works (Est. 2019, Sariska, Rajasthan).</p>
          </div>
        </div>

        <div className="h-px bg-slate-100 w-full" />

        {/* 4. Action Toggles (Call Now & I am Interested) */}
        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 rounded-lg bg-[#ca0013] text-white flex items-center justify-center font-black text-xs shadow-md shadow-red-500/30">
              4
            </span>
            <div>
              <h2 className="text-base font-bold text-slate-900">Customer Interaction Buttons</h2>
              <p className="text-xs text-slate-500">Control what interactive buttons appear on this item for buyers.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Call Now Toggle Card */}
            <div
              onClick={() => setShowCallNow(!showCallNow)}
              role="button"
              tabIndex={0}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 select-none ${
                showCallNow
                  ? 'border-red-500/60 bg-red-50/30 shadow-sm'
                  : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 opacity-70'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                  showCallNow ? 'bg-[#ca0013] text-white' : 'bg-slate-200 text-slate-500'
                }`}
              >
                <PhoneCall className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">Show &ldquo;Call Now&rdquo;</span>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                      showCallNow
                        ? 'bg-[#ca0013] border-[#ca0013] text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {showCallNow && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-1 leading-snug">
                  Lets buyers tap to immediately call your sales rep directly (096804 29713).
                </p>
              </div>
            </div>

            {/* I am Interested Toggle Card */}
            <div
              onClick={() => setShowInterested(!showInterested)}
              role="button"
              tabIndex={0}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-4 select-none ${
                showInterested
                  ? 'border-red-500/60 bg-red-50/30 shadow-sm'
                  : 'border-slate-200 bg-slate-50/50 hover:border-slate-300 opacity-70'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                  showInterested ? 'bg-[#ca0013] text-white' : 'bg-slate-200 text-slate-500'
                }`}
              >
                <Heart className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">Show &ldquo;I am Interested&rdquo;</span>
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                      showInterested
                        ? 'bg-[#ca0013] border-[#ca0013] text-white'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {showInterested && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
                <p className="text-xs text-slate-500 font-medium mt-1 leading-snug">
                  Allows customers to submit an instant quotation inquiry into your Leads table.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400 font-medium">
            {statusMessage && (
              <span className="text-emerald-600 font-bold flex items-center gap-1.5 animate-fade-in">
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
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest text-white bg-gradient-to-r from-[#ca0013] to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Publish Product</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
