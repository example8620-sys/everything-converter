import React from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const PrivacyPage: React.FC<{ lang: Language }> = ({ lang }) => {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <SEOHead
        title="Privacy Policy – Everything Converter"
        description="Everything Converter privacy policy. 100% client-side processing, no server file storage, GDPR and CCPA compliant."
        canonicalUrl="https://everythingconverter.com/privacy"
      />

      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Privacy Policy' }]} />

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="mt-1 text-xs text-slate-500">Effective Date: January 1, 2026</p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 dark:border-emerald-900/50 dark:bg-emerald-950/30">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
            <ShieldCheck className="h-4 w-4" />
            <span>Our Uncompromising Privacy Guarantee:</span>
          </div>
          <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-400">
            Everything Converter processes all images, PDF conversions, code formatting, and numerical calculations entirely inside your client browser. We never store, transmit, or review your uploaded pictures, documents, or inputs on any external server.
          </p>
        </div>

        <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">1. Information We Do Not Collect</h2>
          <p>
            When you use our photo compressor, passport photo maker, unit converter, or financial calculators:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>We do NOT upload or store your images or biometric photos on our servers.</li>
            <li>We do NOT record your personal numerical calculations, income, or loan inputs.</li>
            <li>We do NOT sell, license, or monetize your private content in any manner.</li>
          </ul>

          <h2 className="text-sm font-bold text-slate-900 dark:text-white pt-2">2. Local Browser Storage</h2>
          <p>
            We use standard web browser storage APIs (such as <code>localStorage</code>) strictly for client-side user preferences:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Saving your Dark / Light theme preference.</li>
            <li>Saving your selected language (English or Hindi).</li>
            <li>Maintaining your local "Recent Tools" history list for fast access on your device only.</li>
          </ul>

          <h2 className="text-sm font-bold text-slate-900 dark:text-white pt-2">3. Advertising & Cookies</h2>
          <p>
            To keep our utility suite 100% free forever, Everything Converter displays non-intrusive advertisements served through trusted partners such as Google AdSense. Third-party advertising vendors may use cookies to serve ads based on your prior visits to this or other websites. You can opt out of personalized advertising by visiting Google's Ads Settings.
          </p>

          <h2 className="text-sm font-bold text-slate-900 dark:text-white pt-2">4. Contact Privacy Officer</h2>
          <p>
            If you have questions regarding this Privacy Policy or your data rights, please contact:
          </p>
          <p className="font-semibold text-slate-900 dark:text-white">
            Email: privacy@everythingconverter.com
          </p>
        </div>
      </div>
    </div>
  );
};
