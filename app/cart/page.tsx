'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { RoleSwitcher } from '../../components/layout/RoleSwitcher';
import { useAppStore } from '../../lib/store';
import { calculateCartTotals } from '../../lib/taxFreightEngine';
import { ShoppingCart, Trash2, ArrowRight, Tag, ShieldCheck, Truck, Percent } from 'lucide-react';

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, activeCoupon, applyCoupon, removeCoupon, user } = useAppStore();
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ success: boolean; text: string } | null>(null);

  const defaultShippingAddr = user.addresses[0];
  const cartTotals = calculateCartTotals(cart, defaultShippingAddr, activeCoupon);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponMessage({ success: res.success, text: res.message });
  };

  const formatPrice = (val?: number) => { val = val || 0;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <RoleSwitcher />
      <Header />

      <div className="bg-slate-900 text-white py-8 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-3">
            <ShoppingCart className="w-7 h-7 text-amber-500" />
            B2B Equipment Shopping Cart
          </h1>
          <span className="text-xs text-slate-400 font-mono">
            {cart.length} Line Items
          </span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        {cart.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4 shadow-sm max-w-lg mx-auto my-8">
            <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto" />
            <h2 className="text-xl font-bold text-slate-900">Your Equipment Cart is Empty</h2>
            <p className="text-xs text-slate-500">
              Browse our industrial boiler catalogue to add standardized equipment, accessories, softeners, or valves.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition"
            >
              Browse Equipment Catalogue <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Cart Line Items Table */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="p-4 bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider grid grid-cols-12 gap-2">
                  <div className="col-span-6">Equipment / Product</div>
                  <div className="col-span-2 text-center">Unit Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Subtotal</div>
                </div>

                <div className="divide-y divide-slate-100">
                  {cart.map((item) => (
                    <div key={(item.productId || item.product.id)} className="p-4 grid grid-cols-12 gap-2 items-center text-xs">
                      {/* Product details */}
                      <div className="col-span-12 sm:col-span-6 flex gap-3 items-center">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-14 object-cover rounded-lg border border-slate-200 bg-slate-100 shrink-0"
                        />
                        <div className="space-y-0.5">
                          <Link href={`/products/${item.product.slug}`} className="font-bold text-slate-900 hover:text-sky-700 text-xs block leading-tight">
                            {item.product.name}
                          </Link>
                          <span className="text-[10px] text-slate-400 font-mono block">SKU: {item.product.sku} | HSN: {item.product.hsnCode}</span>
                          <span className="inline-block bg-slate-100 text-slate-700 text-[9px] px-1.5 py-0.5 rounded font-semibold">
                            {item.product.capacity}
                          </span>
                        </div>
                      </div>

                      {/* Unit Price */}
                      <div className="col-span-4 sm:col-span-2 text-center font-mono text-slate-800 font-bold">
                        {formatPrice(item.product.price)}
                      </div>

                      {/* Quantity Controls */}
                      <div className="col-span-4 sm:col-span-2 flex items-center justify-center gap-1">
                        <button
                          onClick={() => updateCartQuantity((item.productId || item.product.id), item.quantity - 1)}
                          className="w-6 h-6 rounded bg-slate-100 border border-slate-300 font-bold text-slate-700 hover:bg-slate-200 flex items-center justify-center text-xs"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-bold text-slate-900">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity((item.productId || item.product.id), item.quantity + 1)}
                          className="w-6 h-6 rounded bg-slate-100 border border-slate-300 font-bold text-slate-700 hover:bg-slate-200 flex items-center justify-center text-xs"
                        >
                          +
                        </button>
                      </div>

                      {/* Subtotal & Delete */}
                      <div className="col-span-4 sm:col-span-2 text-right font-mono font-bold text-slate-900 flex items-center justify-end gap-2">
                        <span>{formatPrice(item.product.price * item.quantity)}</span>
                        <button
                          onClick={() => removeFromCart((item.productId || item.product.id))}
                          className="text-slate-400 hover:text-rose-600 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* B2B Assurance Banner */}
              <div className="bg-slate-900 text-slate-300 p-4 rounded-xl border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Pan-India B2B GST Invoice included with CGST/SGST/IGST calculation.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>Freight rates dynamically updated based on shipping state & pincode.</span>
                </div>
              </div>
            </div>

            {/* Right Summary Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Coupon Form */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-3">
                <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Tag className="w-4 h-4 text-amber-600" /> Apply Promo / Corporate Coupon
                </h3>

                {activeCoupon ? (
                  <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <strong className="text-amber-900 font-mono block">{activeCoupon.code} Applied</strong>
                      <span className="text-amber-700 text-[11px]">{activeCoupon.description}</span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-rose-600 font-bold hover:underline text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="e.g. BOILER10"
                      className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900 focus:outline-none uppercase"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-slate-800 transition"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {couponMessage && (
                  <p className={`text-[11px] font-semibold ${couponMessage.success ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {couponMessage.text}
                  </p>
                )}

                <div className="text-[10px] text-slate-400 font-mono pt-1">
                  Try codes: <span className="font-bold text-slate-700">BOILER10</span> (10% off accessories) or <span className="font-bold text-slate-700">HEAVY50K</span> (₹50k off &gt;₹10L)
                </div>
              </div>

              {/* Price Breakdown Card */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">
                  Order Payment Summary
                </h3>

                <div className="space-y-2.5 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span>Product Subtotal</span>
                    <strong className="font-mono text-slate-900">{formatPrice(cartTotals.subtotal)}</strong>
                  </div>

                  {cartTotals.totalDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Total Discounts & Coupons (-)</span>
                      <strong className="font-mono">-{formatPrice(cartTotals.totalDiscount)}</strong>
                    </div>
                  )}

                  <div className="flex justify-between pt-2 border-t border-slate-100 font-medium">
                    <span>Taxable Amount</span>
                    <strong className="font-mono text-slate-900">{formatPrice(cartTotals.taxableAmount)}</strong>
                  </div>

                  {/* GST Breakdown */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1 text-[11px] font-mono">
                    <div className="flex justify-between text-slate-600">
                      <span>{cartTotals.isInterstate ? 'IGST (18%)' : 'CGST (9%) + SGST (9%)'}</span>
                      <strong className="text-slate-900">{formatPrice(cartTotals.totalGst)}</strong>
                    </div>
                    <span className="text-[10px] text-slate-400 block">
                      Buyer Location: {defaultShippingAddr ? defaultShippingAddr.state : 'Maharashtra'} ({cartTotals.isInterstate ? 'Inter-state IGST' : 'Intra-state CGST/SGST'})
                    </span>
                  </div>

                  {/* Freight */}
                  <div className="flex justify-between">
                    <span>Pan-India Transport Freight</span>
                    <strong className="font-mono text-slate-900">{formatPrice(cartTotals.freightAmount)}</strong>
                  </div>

                  {/* Grand Total */}
                  <div className="flex justify-between pt-3 border-t-2 border-slate-900 text-base font-black text-slate-900">
                    <span>Grand Total</span>
                    <span className="text-amber-600 font-mono text-lg">{formatPrice(cartTotals.grandTotal)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-lg transition flex items-center justify-center gap-2 mt-4"
                >
                  Proceed to B2B Checkout <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
