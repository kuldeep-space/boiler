import { login } from './actions';
import Link from 'next/link';
import { Flame, ShieldCheck, ArrowRight, Lock, Mail, AlertCircle } from 'lucide-react';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const params = await searchParams;
  const error = params?.error;
  const message = params?.message;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ca0013]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-8 sm:p-10 rounded-3xl shadow-2xl shadow-black/80 w-full max-w-md relative z-10 space-y-8 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ca0013] to-red-700 flex items-center justify-center text-white mx-auto shadow-xl shadow-red-600/30">
            <Flame className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-wider text-white pt-2">
            PANDAYJI <span className="text-[#ca0013]">ADMIN</span>
          </h1>
          <p className="text-slate-400 text-xs font-medium">
            Sign in to manage boiler catalog and buyer inquiries
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="p-3.5 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2.5 text-red-400 text-xs font-medium">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {message && (
          <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center gap-2.5 text-emerald-400 text-xs font-medium">
            <ShieldCheck className="w-4 h-4 flex-shrink-0 text-emerald-500" />
            <span>{message}</span>
          </div>
        )}

        {/* Form */}
        <form className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="admin@pandayji.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-800/80 text-white placeholder:text-slate-500 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#ca0013] focus:border-[#ca0013] transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-800/80 text-white placeholder:text-slate-500 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#ca0013] focus:border-[#ca0013] transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                name="remember"
                defaultChecked
                className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-[#ca0013] focus:ring-[#ca0013] accent-[#ca0013] cursor-pointer"
              />
              <span className="font-medium text-slate-300">Remember this device (Stay signed in)</span>
            </label>
          </div>

          <button
            formAction={login}
            type="submit"
            className="w-full bg-gradient-to-r from-[#ca0013] to-red-600 hover:from-red-600 hover:to-red-700 text-white font-black uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-red-900/50 hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-xs cursor-pointer"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Security Footer Note */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Encrypted Admin Session</span>
        </div>
      </div>
    </div>
  );
}
