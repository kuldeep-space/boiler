import { resetPassword } from './actions';
import Link from 'next/link';
import { ArrowLeft, Mail, KeyRound } from 'lucide-react';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4 relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#ca0013]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-8 sm:p-10 rounded-3xl shadow-2xl shadow-black/80 w-full max-w-md relative z-10 space-y-8 animate-fade-in">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Login
        </Link>

        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ca0013] to-red-700 flex items-center justify-center text-white mx-auto shadow-xl shadow-red-600/30">
            <KeyRound className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-black uppercase tracking-wider text-white pt-2">
            Reset Password
          </h1>
          <p className="text-slate-400 text-xs font-medium">
            Enter your admin email and we will send you a password recovery link.
          </p>
        </div>

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

          <button
            formAction={resetPassword}
            type="submit"
            className="w-full bg-gradient-to-r from-[#ca0013] to-red-600 hover:from-red-600 hover:to-red-700 text-white font-black uppercase tracking-wider py-3.5 rounded-xl shadow-lg shadow-red-900/50 hover:shadow-red-600/40 hover:-translate-y-0.5 transition-all text-xs cursor-pointer"
          >
            Send Recovery Email
          </button>
        </form>
      </div>
    </div>
  );
}
