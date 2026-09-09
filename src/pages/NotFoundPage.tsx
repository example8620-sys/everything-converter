import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowLeft, Home } from 'lucide-react';
import { Language } from '../types';
import { SEOHead } from '../components/SEOHead';

export const NotFoundPage: React.FC<{ lang: Language }> = ({ lang }) => {
  return (
    <div className="mx-auto max-w-lg text-center py-16 space-y-6">
      <SEOHead
        title="Page Not Found – Everything Converter"
        description="The requested conversion tool or page could not be found."
        canonicalUrl="https://everythingconverter.com/404"
      />

      <div className="flex h-20 w-20 mx-auto items-center justify-center rounded-3xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
        <HelpCircle className="h-10 w-10" />
      </div>

      <div className="space-y-2">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white">404</h1>
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">
          Page or Tool Not Found
        </h2>
        <p className="text-xs text-slate-500 max-w-sm mx-auto">
          We couldn't locate the conversion tool or page you're searching for. It may have been renamed or moved.
        </p>
      </div>

      <div className="flex justify-center gap-3">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition"
        >
          <Home className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};
