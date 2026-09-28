'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  Package, 
  Trash2, 
  Search, 
  PhoneCall, 
  Heart,
  CheckCircle2,
  Table as TableIcon,
  Pencil
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

interface ProductItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  capacity?: string;
  specifications?: string;
  manufacturer?: string;
  show_call_now?: boolean;
  show_interested?: boolean;
  images?: string[];
  created_at?: string;
  isLocal?: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Load products from Supabase and synchronized catalog
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const allProducts: ProductItem[] = [];

      // 1. Try Supabase
      try {
        const supabase = createClient();
        const { data: dbProducts, error } = await supabase
          .from('products')
          .select('*, product_images(image_url)')
          .order('created_at', { ascending: false });

        if (!error && dbProducts && dbProducts.length > 0) {
          dbProducts.forEach((item: any) => {
            const imgs = item.product_images?.map((pi: any) => pi.image_url) || [];
            allProducts.push({
              id: item.id,
              name: item.name,
              description: item.description,
              price: item.price,
              capacity: item.capacity,
              specifications: item.specifications,
              manufacturer: item.manufacturer,
              show_call_now: item.show_call_now,
              show_interested: item.show_interested,
              images: imgs,
              created_at: item.created_at,
              isLocal: false
            });
          });
        }
      } catch (e) {
        console.warn('Supabase products fetch skipped/failed:', e);
      }

      // 2. Fetch from Main Website Synchronized API
      try {
        const res = await fetch('http://localhost:3000/api/catalog/products');
        if (res.ok) {
          const apiProducts: ProductItem[] = await res.json();
          apiProducts.forEach((apiItem) => {
            if (!allProducts.some((p) => p.id === apiItem.id || p.name === apiItem.name)) {
              allProducts.push(apiItem);
            }
          });
        }
      } catch (e) {
        console.warn('API sync fetch skipped/failed:', e);
      }

      // 3. Fallback LocalStorage
      if (typeof window !== 'undefined') {
        try {
          const localData = localStorage.getItem('pandayji_catalog_products');
          if (localData) {
            const parsed: ProductItem[] = JSON.parse(localData);
            parsed.forEach((localItem) => {
              if (!allProducts.some((p) => p.id === localItem.id || p.name === localItem.name)) {
                allProducts.push(localItem);
              }
            });
          }
        } catch (e) {
          console.warn('Error reading local products:', e);
        }
      }

      setProducts(allProducts);
      setLoading(false);
    }

    fetchProducts();
  }, []);

  // Handle Delete
  const handleDelete = async (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);

    if (typeof window !== 'undefined') {
      const localData = localStorage.getItem('pandayji_catalog_products');
      if (localData) {
        const parsed: ProductItem[] = JSON.parse(localData);
        const filtered = parsed.filter((p) => p.id !== id);
        localStorage.setItem('pandayji_catalog_products', JSON.stringify(filtered));
      }
    }

    try {
      await fetch(`http://localhost:3000/api/catalog/products?id=${id}`, {
        method: 'DELETE'
      });
    } catch {
      // ignore
    }

    try {
      const supabase = createClient();
      await supabase.from('products').delete().eq('id', id);
    } catch {
      // ignore
    }

    setDeleteConfirmId(null);
  };

  const parseSpecsCount = (specsStr?: string) => {
    if (!specsStr) return 0;
    try {
      const parsed = JSON.parse(specsStr);
      if (Array.isArray(parsed)) return parsed.length;
      if (typeof parsed === 'object') return Object.keys(parsed).length;
    } catch {
      return specsStr.split(',').length;
    }
    return 0;
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.capacity && p.capacity.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Products Catalog</h1>
            <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-0.5 rounded-full border border-slate-200">
              {products.length} {products.length === 1 ? 'Item' : 'Items'}
            </span>
          </div>
          <p className="text-slate-500 text-sm font-medium mt-1">
            Manage your boilers, update prices, edit specifications, and client actions.
          </p>
        </div>

        <Link
          href="/products/new"
          className="bg-gradient-to-r from-[#ca0013] to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-red-600/30 hover:shadow-red-600/50 hover:-translate-y-0.5 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </Link>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or capacity..."
            className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#ca0013] transition-all"
          />
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> of {products.length} products
        </div>
      </div>

      {/* Products Grid / Table */}
      {loading ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-16 text-center shadow-sm">
          <div className="w-10 h-10 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm font-semibold text-slate-500">Loading catalog products...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center shadow-sm space-y-4">
          <div className="w-16 h-16 bg-red-50 text-[#ca0013] rounded-2xl flex items-center justify-center mx-auto">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No products found</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            {searchTerm ? 'Try a different search term.' : 'Click "Add Product" above to publish your first boiler with tabular specifications!'}
          </p>
          <Link
            href="/products/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#ca0013] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md hover:bg-red-700 transition-all"
          >
            <Plus className="w-4 h-4" /> Add Product
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const hasImages = product.images && product.images.length > 0;
            const primaryImg = hasImages ? product.images![0] : null;
            const specCount = parseSpecsCount(product.specifications);

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group"
              >
                {/* Product Image Banner */}
                <div className="h-48 bg-slate-100 relative overflow-hidden flex items-center justify-center">
                  {primaryImg ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={primaryImg}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Package className="w-12 h-12 mb-1" />
                      <span className="text-[11px] font-medium">No Image</span>
                    </div>
                  )}

                  {/* Price Tag Pill */}
                  <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md text-white font-mono font-bold text-xs px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5">
                    <span className="text-red-400">₹</span>
                    <span>{Number(product.price).toLocaleString('en-IN')}</span>
                  </div>

                  {/* Actions: Edit & Delete */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    {/* Edit Button */}
                    <Link
                      href={`/products/${product.id}`}
                      className="w-8 h-8 rounded-xl bg-white/95 hover:bg-slate-900 text-slate-700 hover:text-white flex items-center justify-center shadow-md backdrop-blur-sm transition-all"
                      title="Edit product"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </Link>

                    {/* Delete Button */}
                    {deleteConfirmId === product.id ? (
                      <div className="flex items-center gap-1 bg-white p-1 rounded-xl shadow-lg border border-red-200 animate-fade-in">
                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-[10px] font-black rounded-lg cursor-pointer"
                        >
                          Confirm
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(null)}
                          className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold rounded-lg cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(product.id)}
                        className="w-8 h-8 rounded-xl bg-white/95 hover:bg-red-600 text-slate-700 hover:text-white flex items-center justify-center shadow-md backdrop-blur-sm transition-all cursor-pointer"
                        title="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Photo count indicator */}
                  {hasImages && product.images!.length > 1 && (
                    <div className="absolute top-3 left-3 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-sm">
                      {product.images!.length} photos
                    </div>
                  )}
                </div>

                {/* Details Section */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {product.capacity && (
                        <span className="text-[10px] font-bold text-red-600 bg-red-50 border border-red-200/60 px-2 py-0.5 rounded-md uppercase tracking-wider">
                          {product.capacity}
                        </span>
                      )}
                      {specCount > 0 && (
                        <span className="text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <TableIcon className="w-2.5 h-2.5 text-slate-500" />
                          {specCount} Specs
                        </span>
                      )}
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm mt-2 line-clamp-2 leading-snug group-hover:text-[#ca0013] transition-colors">
                      {product.name}
                    </h3>

                    {product.description && (
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1.5 font-medium leading-relaxed">
                        {product.description}
                      </p>
                    )}
                  </div>

                  {/* Edit CTA button & Footer Meta */}
                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    <Link
                      href={`/products/${product.id}`}
                      className="w-full flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-[#ca0013] border border-slate-200 hover:border-[#ca0013] text-slate-700 hover:text-white font-bold text-xs transition-all shadow-xs group/btn"
                    >
                      <Pencil className="w-3.5 h-3.5 text-[#ca0013] group-hover/btn:text-white transition-colors" />
                      <span>Edit Product &amp; Specifications</span>
                    </Link>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                      <span>{product.manufacturer || 'Pandayji Iron Works'}</span>
                      <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
