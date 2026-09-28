'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { RoleSwitcher } from '../../components/layout/RoleSwitcher';
import { useAppStore } from '../../lib/store';
import { calculateCartTotals, extractStateCodeFromGSTIN, getStateNameFromCode } from '../../lib/taxFreightEngine';
import { Order, Address } from '../../lib/types';
import { ShieldCheck, Truck, CreditCard, Building2, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, user, activeCoupon, createOrder } = useAppStore();

  const [selectedAddressId, setSelectedAddressId] = useState<string>(user.addresses[0]?.id || 'addr-1');
  const [sameAsBilling, setSameAsBilling] = useState<boolean>(true);
  const [paymentMethod, setPaymentMethod] = useState<string>('Razorpay UPI / NetBanking / Cards');

  // Custom Address Form fields if editing
  const selectedAddress = user.addresses.find((a) => a.id === selectedAddressId) || user.addresses[0];

  const cartTotals = calculateCartTotals(cart, selectedAddress, activeCoupon);

  const formatPrice = (val?: number) => { val = val || 0;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const orderId = `ord-${Date.now().toString().slice(-6)}`;
    const orderNumber = `ORD-PJIW-2026-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder: Order = {
      id: orderId,
      orderNumber,
      customerId: user.id,
      companyName: selectedAddress.companyName || user.companyName,
      contactPerson: selectedAddress.contactName || user.fullName,
      email: selectedAddress.email || user.email,
      phone: selectedAddress.phone || user.phone,
      gstin: selectedAddress.gstin || user.gstin,
      billingAddress: selectedAddress,
      shippingAddress: selectedAddress,
      items: cart.map((i) => ({
        productId: i.productId || i.product.id,
        name: i.product.name,
        sku: i.product.sku,
        quantity: i.quantity,
        unitPrice: i.product.price,
        totalPrice: i.product.price * i.quantity,
        hsnCode: i.product.hsnCode,
        gstRate: i.product.gstRate,
        image: i.product.image
      })),
      subtotal: cartTotals.subtotal,
      discountAmount: cartTotals.totalDiscount,
      couponCode: activeCoupon?.code,
      taxableAmount: cartTotals.taxableAmount,
      sellerStateCode: '27',
      buyerStateCode: selectedAddress.stateCode || extractStateCodeFromGSTIN(selectedAddress.gstin),
      isInterstate: cartTotals.isInterstate,
      cgst: cartTotals.cgst,
      sgst: cartTotals.sgst,
      igst: cartTotals.igst,
      totalGst: cartTotals.totalGst,
      freightAmount: cartTotals.freightAmount,
      freightMode: 'calculated',
      grandTotal: cartTotals.grandTotal,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod,
      orderStatus: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    createOrder(newOrder);
    router.push(`/payment?orderId=${newOrder.id}`);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <RoleSwitcher />
        <Header />
        <div className="max-w-md mx-auto my-20 p-8 bg-white border border-slate-200 rounded-2xl text-center space-y-4 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">No items in cart to checkout</h2>
          <button onClick={() => router.push('/products')} className="px-6 py-3 bg-slate-900 text-white rounded-xl text-xs font-bold">
            Return to Catalogue
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <RoleSwitcher />
      <Header />

      <div className="bg-slate-900 text-white py-8 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-3">
              <ShieldCheck className="w-7 h-7 text-emerald-400" />
              B2B Order Checkout & Payment
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Verify company GSTIN, shipping site address, and complete payment.
            </p>
          </div>
          <span className="bg-slate-800 text-amber-400 px-3 py-1 rounded-lg text-xs font-mono font-bold">
            GSTIN Validated
          </span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* 1. B2B Client Details */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Building2 className="w-5 h-5 text-sky-700" />
                1. B2B Company & Tax Identification
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Company Name</label>
                  <input
                    type="text"
                    value={user.companyName}
                    readOnly
                    className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1">GSTIN Number</label>
                  <input
                    type="text"
                    value={user.gstin}
                    readOnly
                    className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl font-mono font-bold text-sky-800 uppercase"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={user.fullName}
                    readOnly
                    className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl font-semibold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1">Email / Mobile</label>
                  <input
                    type="text"
                    value={`${user.email} | ${user.phone}`}
                    readOnly
                    className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-xl text-slate-900 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* 2. Address Selection */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <MapPin className="w-5 h-5 text-sky-700" />
                2. Shipping & Plant Site Address
              </h3>

              <div className="space-y-3">
                {user.addresses.map((addr) => (
                  <label
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    className={`block p-4 rounded-xl border-2 cursor-pointer transition ${
                      selectedAddressId === addr.id ? 'border-sky-600 bg-sky-50/40 shadow-sm' : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 text-xs text-slate-700">
                        <div className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="address"
                            checked={selectedAddressId === addr.id}
                            onChange={() => setSelectedAddressId(addr.id)}
                            className="text-sky-600"
                          />
                          <strong className="text-slate-900 text-sm">{addr.companyName}</strong>
                          {addr.isDefault && (
                            <span className="bg-slate-200 text-slate-800 text-[10px] font-bold px-1.5 py-0.2 rounded">
                              DEFAULT SITE
                            </span>
                          )}
                        </div>
                        <p className="pl-5 text-slate-600 font-medium">{addr.street}, {addr.city}, {addr.state} - {addr.pincode}</p>
                        <p className="pl-5 text-[11px] text-slate-400 font-mono">GSTIN: {addr.gstin} | Contact: {addr.contactName} ({addr.phone})</p>
                      </div>

                      <span className="text-xs font-mono font-bold text-sky-800 bg-sky-100 px-2.5 py-1 rounded-lg">
                        State Code: {addr.stateCode}
                      </span>
                    </div>
                  </label>
                ))}
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sameAsBilling}
                    onChange={(e) => setSameAsBilling(e.target.checked)}
                    className="text-sky-600 rounded"
                  />
                  Shipping address is same as billing address
                </label>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
                <CreditCard className="w-5 h-5 text-sky-700" />
                3. B2B Payment Gateway / Terms
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { name: 'Razorpay UPI / NetBanking / Cards', desc: 'Instant confirmation via Razorpay API gateway', icon: CreditCard },
                  { name: 'NEFT / RTGS Bank Wire Transfer', desc: 'Direct corporate account transfer (ICICI Bank)', icon: Building2 },
                  { name: 'Letter of Credit (LC) / Credit Terms', desc: 'Approved 30-day LC for capital machinery', icon: ShieldCheck }
                ].map((pm, i) => (
                  <label
                    key={i}
                    onClick={() => setPaymentMethod(pm.name)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition flex flex-col justify-between space-y-2 text-xs ${
                      paymentMethod === pm.name ? 'border-amber-500 bg-amber-50/40 shadow-sm' : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <pm.icon className="w-5 h-5 text-slate-800" />
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === pm.name}
                        onChange={() => setPaymentMethod(pm.name)}
                        className="text-amber-600"
                      />
                    </div>
                    <div>
                      <strong className="text-slate-900 font-bold block">{pm.name}</strong>
                      <p className="text-[11px] text-slate-500 mt-1">{pm.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Summary Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 sticky top-24">
              <h3 className="font-extrabold text-slate-900 text-base border-b border-slate-100 pb-3">
                Order Total Breakdown
              </h3>

              <div className="space-y-2.5 text-xs text-slate-700">
                <div className="flex justify-between">
                  <span>Equipment Subtotal</span>
                  <strong className="font-mono text-slate-900">{formatPrice(cartTotals.subtotal)}</strong>
                </div>

                {cartTotals.totalDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount (-)</span>
                    <strong className="font-mono">-{formatPrice(cartTotals.totalDiscount)}</strong>
                  </div>
                )}

                <div className="flex justify-between pt-2 border-t border-slate-100 font-semibold">
                  <span>Taxable Value</span>
                  <strong className="font-mono text-slate-900">{formatPrice(cartTotals.taxableAmount)}</strong>
                </div>

                {/* Tax Breakdown */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1 font-mono text-[11px]">
                  {cartTotals.isInterstate ? (
                    <div className="flex justify-between text-slate-700">
                      <span>IGST (18%)</span>
                      <strong>{formatPrice(cartTotals.igst)}</strong>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between text-slate-700">
                        <span>CGST (9%)</span>
                        <strong>{formatPrice(cartTotals.cgst)}</strong>
                      </div>
                      <div className="flex justify-between text-slate-700">
                        <span>SGST (9%)</span>
                        <strong>{formatPrice(cartTotals.sgst)}</strong>
                      </div>
                    </>
                  )}
                  <span className="text-[10px] text-slate-500 block pt-1 font-sans">
                    Rule: {cartTotals.isInterstate ? 'Inter-state transaction (Seller MH -> Buyer ' + selectedAddress.state + ')' : 'Intra-state transaction (MH -> MH)'}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Pan-India Freight Transport</span>
                  <strong className="font-mono text-slate-900">{formatPrice(cartTotals.freightAmount)}</strong>
                </div>

                <div className="flex justify-between pt-3 border-t-2 border-slate-900 text-base font-black text-slate-900">
                  <span>Grand Total</span>
                  <span className="text-amber-600 font-mono text-lg">{formatPrice(cartTotals.grandTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-lg transition flex items-center justify-center gap-2 mt-4"
              >
                Place Order & Pay <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
