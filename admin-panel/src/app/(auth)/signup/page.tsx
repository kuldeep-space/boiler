import { signup } from './actions';
import Link from 'next/link';
import { Flame, ShieldCheck, UserPlus, Lock, Mail, ArrowLeft, AlertCircle } from 'lucide-react';

export default async function SignUpPage({
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
        {/* Top Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-red-500/10 text-red-400 border border-red-500/20 px-2 py-0.5 rounded-full">
            Admin Management
          </span>
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ca0013] to-red-700 flex items-center justify-center text-white mx-auto shadow-xl shadow-red-600/30">
            <Flame className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-wider text-white pt-2">
            ADD NEW <span className="text-[#ca0013]">ADMIN</span>
          </h1>
          <p className="text-slate-400 text-xs font-medium">
            Register a new administrator with secure panel access
          </p>
        </div>

        {/* Error / Success Alerts */}
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
        <form className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="newadmin@pandayji.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-800/80 text-white placeholder:text-slate-500 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#ca0013] focus:border-[#ca0013] transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-800/80 text-white placeholder:text-slate-500 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#ca0013] focus:border-[#ca0013] transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                id="confirm_password"
                name="confirm_password"
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-700 bg-slate-800/80 text-white placeholder:text-slate-500 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#ca0013] focus:border-[#ca0013] transition-all"
              />
            </div>
          </div>

          <button
            formAction={signup}
            type="submit"
            className="w-full bg-gradient-to-r from-[#ca0013] to-red-600 hover:from-red-600 hover:to-red-700 text-white font-black uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-red-900/50 hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-xs cursor-pointer mt-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create Admin Account</span>
          </button>
        </form>

        {/* Security Footer Note */}
        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Encrypted Credentials</span>
          </div>
          <Link href="/login" className="text-red-400 hover:text-red-300 font-bold transition-colors">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
