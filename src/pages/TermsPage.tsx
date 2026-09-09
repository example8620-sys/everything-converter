import React from 'react';
import { Language } from '../types';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const TermsPage: React.FC<{ lang: Language }> = ({ lang }) => {
  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <SEOHead
        title="Terms of Service – Everything Converter"
        description="Terms of service and acceptable usage guidelines for Everything Converter."
        canonicalUrl="https://everythingconverter.com/terms"
      />

      <Breadcrumbs items={[{ label: 'Home', path: '/' }, { label: 'Terms of Service' }]} />

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Terms of Service
          </h1>
          <p className="mt-1 text-xs text-slate-500">Last updated: January 1, 2026</p>
        </div>

        <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Everything Converter (everythingconverter.com), you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
          </p>

          <h2 className="text-sm font-bold text-slate-900 dark:text-white pt-2">2. Accuracy & Disclaimer of Warranties</h2>
          <p>
            All conversion calculators, financial estimates, formula explanations, and image processing tools are provided on an "as is" and "as available" basis without warranties of any kind. While we strive for extreme mathematical precision and conformity to official standards, users are encouraged to verify critical calculations (such as architectural engineering specifications or official legal tax submissions) with licensed authorities.
          </p>

          <h2 className="text-sm font-bold text-slate-900 dark:text-white pt-2">3. Intellectual Property</h2>
          <p>
            The software, interface designs, algorithms, branding, and original content on Everything Converter are the intellectual property of Shubham Kumar and protected by applicable copyright laws.
          </p>

          <h2 className="text-sm font-bold text-slate-900 dark:text-white pt-2">4. User Conduct</h2>
          <p>
            You agree not to misuse our website by attempting to inject malicious scripts, reverse engineer protected code, or launch denial-of-service attacks against our content delivery networks.
          </p>
        </div>
      </div>
    </div>
  );
};
