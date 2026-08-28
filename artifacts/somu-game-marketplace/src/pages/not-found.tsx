import { Link } from 'wouter';
import { ArrowLeft, CircleAlert } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[#080808] px-6 text-white">
      <div className="w-full max-w-lg border border-white/20 bg-[#111] p-8 shadow-[8px_8px_0_#c6ff33] sm:p-12">
        <div className="flex items-center gap-3 text-lime"><CircleAlert size={22} /><span className="mono text-[10px] uppercase tracking-[.2em]">Cabinet error</span></div>
        <h1 className="display mt-8 text-7xl font-bold uppercase leading-none">404<span className="text-lime">.</span></h1>
        <p className="mt-5 max-w-sm text-sm leading-6 text-white/50">That cartridge is not in the collection. Head back to the marketplace and choose a game.</p>
        <Link href="/" className="mt-8 inline-flex items-center gap-2 border border-lime px-4 py-3 text-sm font-semibold text-lime transition hover:bg-lime hover:text-[#080808]" data-testid="link-not-found-home"><ArrowLeft size={16} /> Back to games</Link>
      </div>
    </div>
  );
}
