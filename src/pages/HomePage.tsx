import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles, ShieldCheck, Zap, WifiOff, Heart, ArrowRight } from 'lucide-react';
import { Language } from '../types';
import { categories } from '../data/categories';
import { toolsRegistry } from '../data/toolsRegistry';
import { ToolCard } from '../components/ToolCard';
import { DynamicIcon } from '../components/DynamicIcon';
import { SEOHead } from '../components/SEOHead';

interface HomePageProps {
  lang: Language;
}

export const HomePage: React.FC<HomePageProps> = ({ lang }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTools = useMemo(() => {
    return toolsRegistry.filter((tool) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'all' || tool.category === selectedCategory;

      // Search query filter
      if (!matchesCategory) return false;
      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const matchName = tool.name.toLowerCase().includes(q);
      const matchNameHi = tool.nameHi?.toLowerCase().includes(q) || false;
      const matchDesc = tool.description.toLowerCase().includes(q);
      const matchKeywords = tool.keywords.some((k) => k.toLowerCase().includes(q));

      return matchName || matchNameHi || matchDesc || matchKeywords;
    });
  }, [searchQuery, selectedCategory]);

  const popularTools = useMemo(() => {
    return toolsRegistry.filter((t) => t.isPopular || t.badge === 'Popular');
  }, []);

  return (
    <div className="space-y-12">
      <SEOHead
        title="Everything Converter – Convert Everything. Simply. Quickly. Accurately."
        description="Free online utility suite with 100+ tools for units, image resizing, passport photos, compression, PDF, time, text, calculations, and code formatting with 100% browser privacy."
        canonicalUrl="https://everythingconverter.com/"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-linear-to-b from-white via-slate-50/50 to-white px-6 py-12 text-center shadow-xs dark:border-slate-800/80 dark:from-slate-900 dark:via-slate-900/40 dark:to-slate-950 sm:px-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50/80 px-3.5 py-1 text-xs font-semibold text-blue-700 shadow-2xs dark:border-blue-900/50 dark:bg-blue-950/50 dark:text-blue-300">
            <Sparkles className="h-3.5 w-3.5" />
            <span>100+ Free Online Converters & Tools</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {lang === 'hi' ? 'सब कुछ बदलें। आसानी से। तेज़ी से।' : 'Convert Everything.'}
            <span className="block text-blue-600 dark:text-blue-400">
              {lang === 'hi' ? 'सटीकता के साथ।' : 'Simply. Quickly. Accurately.'}
            </span>
          </h1>

          <p className="mx-auto max-w-xl text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {lang === 'hi'
              ? 'यूनिट्स, पासपोर्ट फोटो, इमेज कंप्रेशन, गणित, टेक्स्ट, फाइनेंस व कोडिंग के सभी टूल्स एक ही जगह। बिना किसी सर्वर अपलोड के 100% सुरक्षित।'
              : 'The comprehensive utility platform for units, passport photos, image compression, cooking measurements, financial calculators, and developer tools.'}
          </p>

          {/* Search Input Bar */}
          <div className="mx-auto mt-6 max-w-xl">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  lang === 'hi'
                    ? 'कोई भी टूल खोजें... (उदा. passport photo, length, emi, jpg to png)'
                    : 'Search 100+ tools... (e.g. passport photo, length, emi, jpg to png)'
                }
                className="h-13 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-sm font-medium text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-hidden focus:ring-3 focus:ring-blue-500/15 dark:border-slate-800 dark:bg-slate-900 dark:text-white transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Suggestions */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs text-slate-500">
              <span className="font-semibold">Quick access:</span>
              <button
                onClick={() => setSearchQuery('passport photo')}
                className="rounded-lg bg-slate-100 px-2 py-0.5 font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              >
                Passport Photo
              </button>
              <button
                onClick={() => setSearchQuery('photo size')}
                className="rounded-lg bg-slate-100 px-2 py-0.5 font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              >
                Photo Size 50KB/100KB
              </button>
              <button
                onClick={() => setSearchQuery('cooking')}
                className="rounded-lg bg-slate-100 px-2 py-0.5 font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              >
                Cups to Grams
              </button>
              <button
                onClick={() => setSearchQuery('emi')}
                className="rounded-lg bg-slate-100 px-2 py-0.5 font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              >
                Loan EMI
              </button>
              <button
                onClick={() => setSearchQuery('age')}
                className="rounded-lg bg-slate-100 px-2 py-0.5 font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              >
                Age Calculator
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Performance Pillars */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">100% Client-Side Privacy</h4>
            <p className="text-[11px] text-slate-500">Your files & data never leave your browser</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Instant Calculations</h4>
            <p className="text-[11px] text-slate-500">Zero latency, no queue, instant downloads</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-400">
            <WifiOff className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">PWA Offline Ready</h4>
            <p className="text-[11px] text-slate-500">Install as an app and use without internet</p>
          </div>
        </div>
      </section>

      {/* Category Navigation Pills */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {lang === 'hi' ? 'टूल श्रेणियां' : 'Browse by Category'}
          </h2>
          <span className="text-xs font-medium text-slate-500">
            Showing {filteredTools.length} tools
          </span>
        </div>

        <div className="flex flex-wrap gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'border border-slate-200/80 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>All Tools ({toolsRegistry.length})</span>
          </button>

          {categories.map((cat) => {
            const count = toolsRegistry.filter((t) => t.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'border border-slate-200/80 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                <DynamicIcon name={cat.iconName} className="h-3.5 w-3.5" />
                <span>{lang === 'hi' ? cat.nameHi : cat.name}</span>
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                    isSelected
                      ? 'bg-blue-700 text-white'
                      : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Tools Grid */}
      <section className="space-y-4">
        {filteredTools.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} lang={lang} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
            <Search className="mx-auto h-8 w-8 text-slate-400" />
            <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">No tools found</h3>
            <p className="mt-1 text-xs text-slate-500">
              No converters matched your search query "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* Popular Everyday Tools Highlight */}
      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Most Popular Daily Converters
            </h3>
            <p className="text-xs text-slate-500">
              Frequently accessed tools for work, study, and daily life
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {popularTools.slice(0, 12).map((tool) => (
            <Link
              key={tool.id}
              to={`/${tool.slug}`}
              className="group flex flex-col items-center justify-center rounded-2xl border border-slate-200/70 p-4 text-center hover:border-blue-500 hover:bg-blue-50/40 dark:border-slate-800 dark:hover:border-blue-500/50 dark:hover:bg-blue-950/20 transition"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700 group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-800 dark:text-slate-300 transition">
                <DynamicIcon name={tool.iconName} className="h-5 w-5" />
              </div>
              <span className="mt-2.5 line-clamp-1 text-xs font-bold text-slate-800 group-hover:text-blue-600 dark:text-slate-200 dark:group-hover:text-blue-400">
                {lang === 'hi' && tool.nameHi ? tool.nameHi : tool.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Developer Credit & Trust Banner */}
      <section className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-6 text-center dark:border-slate-800 dark:bg-slate-900/50">
        <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400">
          <span>Developed with</span>
          <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500 inline" />
          <span>by <strong className="text-slate-900 dark:text-white">Shubham Kumar</strong></span>
        </div>
        <p className="mt-1 text-[11px] text-slate-500">
          Everything Converter is engineered for lightning-speed client-side execution, full offline support, and zero tracking.
        </p>
      </section>
    </div>
  );
};
