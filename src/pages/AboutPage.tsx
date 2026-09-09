import React from 'react';
import { Heart, ShieldCheck, Zap, Sparkles, Cpu, Globe } from 'lucide-react';
import { Language } from '../types';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const AboutPage: React.FC<{ lang: Language }> = ({ lang }) => {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <SEOHead
        title="About Everything Converter – Fast, Accurate, 100% Private"
        description="Learn about Everything Converter, developed by Shubham Kumar. The modern suite of 100+ private online conversion utilities."
        canonicalUrl="https://everythingconverter.com/about"
      />

      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'About Us' }]} />

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>About Everything Converter</span>
          </div>
          <h1 className="mt-3 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Convert Everything. Simply. Quickly. Accurately.
          </h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Everything Converter was founded on a simple principle: daily digital utilities (like photo compression, unit conversion, passport photo creation, and tax calculation) should be fast, completely free, and genuinely private.
          </p>
        </div>

        {/* Developer Spotlight */}
        <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-6 dark:border-slate-800 dark:bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white font-bold text-lg">
              SK
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <span>Developed by Shubham Kumar</span>
                <Heart className="h-4 w-4 fill-rose-500 text-rose-500 inline" />
              </h2>
              <p className="text-xs text-slate-500">
                Senior Full-Stack Engineer & Product Architect
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            "We built Everything Converter because existing online tools are overcrowded with aggressive pop-ups, slow server queues, and invasive file upload practices. Our goal is to provide a clean, modern, ad-friendly, and privacy-respecting platform that runs instantly inside your browser."
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
            <ShieldCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            <h3 className="mt-2 text-xs font-bold text-slate-900 dark:text-white">Zero Server Uploads</h3>
            <p className="mt-1 text-[11px] text-slate-500">
              Photos, PDFs, and numbers are processed 100% on your device using HTML5 Canvas & Web APIs.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
            <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h3 className="mt-2 text-xs font-bold text-slate-900 dark:text-white">Sub-Millisecond Speed</h3>
            <p className="mt-1 text-[11px] text-slate-500">
              No backend network round-trips. Calculations and conversions execute instantly.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 p-4 dark:border-slate-800">
            <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            <h3 className="mt-2 text-xs font-bold text-slate-900 dark:text-white">Bilingual & Accessible</h3>
            <p className="mt-1 text-[11px] text-slate-500">
              Full English and Hindi support with keyboard navigation and dark mode adaptability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
