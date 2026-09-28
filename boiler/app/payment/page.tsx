'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { RoleSwitcher } from '../../components/layout/RoleSwitcher';
import { useAppStore } from '../../lib/store';
import { ShieldCheck, CheckCircle2, Lock, Smartphone, CreditCard, Building2, AlertCircle } from 'lucide-react';

export default function PaymentGatewaySimulatorPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderIdParam = searchParams.get('orderId') || '';

  const { orders, updatePaymentStatus, updateOrderStatus } = useAppStore();

  const order = orders.find((o) => o.id === orderIdParam) || orders[0];

  const [paymentTab, setPaymentTab] = useState<'upi' | 'card' | 'netbanking' | 'neft'>('upi');
  const [upiId, setUpiId] = useState('rajesh@okhdfcbank');
  const [processing, setProcessing] = useState(false);

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const handleSimulatePaymentSuccess = () => {
    setProcessing(true);
    setTimeout(() => {
      const txId = `pay_RZP_${Math.floor(1000000000 + Math.random() * 9000000000)}`;
      updatePaymentStatus(order.id, 'paid', txId);
      updateOrderStatus(order.id, 'confirmed');
      setProcessing(false);
      router.push(`/order-confirmation/${order.id}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <RoleSwitcher />
      <Header />

      <main className="max-w-xl mx-auto px-4 py-12 flex-1 w-full">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-slate-900 text-white p-6 border-b border-slate-800 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold font-mono">
                <Lock className="w-3.5 h-3.5" /> 256-Bit SSL Secured Gateway
              </div>
              <h2 className="text-xl font-extrabold mt-1">Razorpay B2B Payment Portal</h2>
            </div>
            <span className="bg-amber-500 text-slate-950 text-xs font-bold px-2.5 py-1 rounded font-mono">
              ₹ {formatPrice(order.grandTotal)}
            </span>
          </div>

          {/* Order Snapshot */}
          <div className="p-4 bg-slate-50 border-b border-slate-200 text-xs flex justify-between items-center text-slate-700">
            <div>
              <span className="text-slate-400 block text-[10px]">Order Ref</span>
              <strong className="font-mono text-slate-900">{order.orderNumber}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">B2B Client</span>
              <strong className="text-slate-900">{order.companyName}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">GSTIN</span>
              <strong className="font-mono text-sky-800">{order.gstin}</strong>
            </div>
          </div>

          {/* Payment Method Tabs */}
          <div className="p-6 space-y-6">
            <div className="flex border-b border-slate-200 text-xs font-bold">
              <button
                onClick={() => setPaymentTab('upi')}
                className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 ${
                  paymentTab === 'upi' ? 'border-sky-600 text-sky-700' : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
              >
                <Smartphone className="w-4 h-4" /> UPI / QR
              </button>
              <button
                onClick={() => setPaymentTab('card')}
                className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 ${
                  paymentTab === 'card' ? 'border-sky-600 text-sky-700' : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
              >
                <CreditCard className="w-4 h-4" /> Cards
              </button>
              <button
                onClick={() => setPaymentTab('netbanking')}
                className={`pb-2.5 px-3 border-b-2 transition flex items-center gap-1.5 ${
                  paymentTab === 'netbanking' ? 'border-sky-600 text-sky-700' : 'border-transparent text-slate-400 hover:text-slate-700'
                }`}
              >
                <Building2 className="w-4 h-4" /> Corporate NetBanking
              </button>
            </div>

            {/* TAB: UPI */}
            {paymentTab === 'upi' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Enter Virtual Payment Address (VPA / UPI ID)</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="company@icici"
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900"
                  />
                </div>
                <div className="bg-slate-100 p-3 rounded-xl border border-slate-200 text-center text-xs text-slate-600">
                  Supported apps: BHIM UPI, GPay Business, PhonePe, Paytm, HDFC PayZapp
                </div>
              </div>
            )}

            {/* TAB: Cards */}
            {paymentTab === 'card' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Corporate Card Number</label>
                  <input
                    type="text"
                    defaultValue="4532 •••• •••• 8912"
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-mono text-slate-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Expiry Date</label>
                    <input type="text" defaultValue="08/29" className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-mono text-slate-900" />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">CVV Security Code</label>
                    <input type="password" defaultValue="•••" className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl font-mono text-slate-900" />
                  </div>
                </div>
              </div>
            )}

            {/* TAB: Netbanking */}
            {paymentTab === 'netbanking' && (
              <div className="space-y-3 text-xs">
                <label className="block font-bold text-slate-700">Select Corporate Bank</label>
                <div className="grid grid-cols-2 gap-2 font-bold">
                  {['HDFC Corporate', 'ICICI Corporate', 'SBI Corporate', 'Axis Bank Business'].map((b, i) => (
                    <div key={i} className="p-3 bg-slate-50 border border-slate-300 rounded-xl text-center hover:border-sky-600 cursor-pointer">
                      {b}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action CTA */}
            <div className="pt-2">
              <button
                onClick={handleSimulatePaymentSuccess}
                disabled={processing}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-lg transition flex items-center justify-center gap-2"
              >
                {processing ? (
                  <span>Communicating with Bank Gateway...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" /> Confirm Payment of {formatPrice(order.grandTotal)}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
