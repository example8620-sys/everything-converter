import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, ShieldCheck, Sparkles, HelpCircle, Calculator, Info } from 'lucide-react';
import { Language } from '../types';
import { toolsRegistry } from '../data/toolsRegistry';
import { categories } from '../data/categories';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SEOHead } from '../components/SEOHead';
import { DynamicIcon } from '../components/DynamicIcon';
import { PrivacyBanner } from '../components/PrivacyBanner';
import { ToolCard } from '../components/ToolCard';

// Engines
import { UnitConverterEngine } from '../components/tools/UnitConverterEngine';
import { CookingConverterEngine } from '../components/tools/CookingConverterEngine';
import { PassportPhotoMaker } from '../components/tools/PassportPhotoMaker';
import { PhotoSizeReducer } from '../components/tools/PhotoSizeReducer';
import { ImageResizerEngine } from '../components/tools/ImageResizerEngine';
import { ImageFormatConverterEngine } from '../components/tools/ImageFormatConverterEngine';
import { ImageToPdfEngine } from '../components/tools/ImageToPdfEngine';
import { AgeCalculatorEngine } from '../components/tools/AgeCalculatorEngine';
import { DateCalculatorEngine } from '../components/tools/DateCalculatorEngine';
import { UnixTimestampEngine } from '../components/tools/UnixTimestampEngine';
import { BinaryConverterEngine } from '../components/tools/BinaryConverterEngine';
import { NumberToWordsEngine } from '../components/tools/NumberToWordsEngine';
import { RomanNumeralEngine } from '../components/tools/RomanNumeralEngine';
import { WordCounterEngine } from '../components/tools/WordCounterEngine';
import { CaseConverterEngine } from '../components/tools/CaseConverterEngine';
import { PercentageCalculatorEngine } from '../components/tools/PercentageCalculatorEngine';
import { LoanEmiCalculatorEngine } from '../components/tools/LoanEmiCalculatorEngine';
import { GstCalculatorEngine } from '../components/tools/GstCalculatorEngine';
import { BmiCalculatorEngine } from '../components/tools/BmiCalculatorEngine';
import { JsonFormatterEngine } from '../components/tools/JsonFormatterEngine';
import { UuidGeneratorEngine } from '../components/tools/UuidGeneratorEngine';
import { ColorConverterEngine } from '../components/tools/ColorConverterEngine';
import { ScientificCalculatorEngine } from '../components/tools/ScientificCalculatorEngine';

interface ToolPageProps {
  lang: Language;
}

export const ToolPage: React.FC<ToolPageProps> = ({ lang }) => {
  const { slug } = useParams<{ slug: string }>();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const tool = toolsRegistry.find((t) => t.slug === slug);
  const category = categories.find((c) => c.id === tool?.category);

  // Save to recent tools history
  useEffect(() => {
    if (!tool) return;
    try {
      const saved = localStorage.getItem('everything_converter_recent_tools');
      let recents: string[] = saved ? JSON.parse(saved) : [];
      recents = [tool.slug, ...recents.filter((s) => s !== tool.slug)].slice(0, 10);
      localStorage.setItem('everything_converter_recent_tools', JSON.stringify(recents));
    } catch (e) {
      // ignore
    }
  }, [tool]);

  if (!tool) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Tool Not Found</h2>
        <p className="mt-2 text-xs text-slate-500">
          The requested conversion tool "{slug}" does not exist or has moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-blue-700"
        >
          Explore All Tools
        </Link>
      </div>
    );
  }

  // Find related tools
  const relatedTools = toolsRegistry.filter(
    (t) => t.id !== tool.id && (tool.relatedSlugs?.includes(t.slug) || t.category === tool.category)
  ).slice(0, 4);

  // Render appropriate engine
  const renderEngine = () => {
    switch (tool.slug) {
      case 'passport-photo-maker':
        return <PassportPhotoMaker lang={lang} />;
      case 'photo-size-reducer':
        return <PhotoSizeReducer lang={lang} />;
      case 'image-resizer':
      case 'photo-cropper':
        return <ImageResizerEngine lang={lang} />;
      case 'jpg-to-png':
        return <ImageFormatConverterEngine lang={lang} defaultTarget="png" />;
      case 'png-to-jpg':
        return <ImageFormatConverterEngine lang={lang} defaultTarget="jpeg" />;
      case 'webp-to-jpg':
        return <ImageFormatConverterEngine lang={lang} defaultTarget="jpeg" />;
      case 'jpg-to-webp':
      case 'png-to-webp':
        return <ImageFormatConverterEngine lang={lang} defaultTarget="webp" />;
      case 'image-format-converter':
      case 'image-compressor':
        return <ImageFormatConverterEngine lang={lang} />;
      case 'image-to-pdf':
        return <ImageToPdfEngine lang={lang} />;
      case 'cooking-converter':
        return <CookingConverterEngine lang={lang} />;
      case 'age-calculator':
        return <AgeCalculatorEngine lang={lang} />;
      case 'date-calculator':
        return <DateCalculatorEngine lang={lang} />;
      case 'unix-timestamp-converter':
        return <UnixTimestampEngine lang={lang} />;
      case 'binary-converter':
        return <BinaryConverterEngine lang={lang} />;
      case 'number-to-words-converter':
        return <NumberToWordsEngine lang={lang} />;
      case 'roman-numeral-converter':
        return <RomanNumeralEngine lang={lang} />;
      case 'word-counter':
        return <WordCounterEngine lang={lang} />;
      case 'case-converter':
        return <CaseConverterEngine lang={lang} />;
      case 'percentage-calculator':
      case 'discount-calculator':
        return <PercentageCalculatorEngine lang={lang} />;
      case 'loan-emi-calculator':
        return <LoanEmiCalculatorEngine lang={lang} />;
      case 'gst-calculator':
        return <GstCalculatorEngine lang={lang} />;
      case 'bmi-calculator':
        return <BmiCalculatorEngine lang={lang} />;
      case 'json-formatter-validator':
        return <JsonFormatterEngine lang={lang} />;
      case 'uuid-generator':
        return <UuidGeneratorEngine lang={lang} />;
      case 'color-converter':
        return <ColorConverterEngine lang={lang} />;
      case 'scientific-calculator':
        return <ScientificCalculatorEngine lang={lang} />;
      default:
        // Default universal unit converter
        return <UnitConverterEngine tool={tool} lang={lang} />;
    }
  };

  const breadcrumbs = [
    { label: 'Home', path: '/' },
    { label: category ? (lang === 'hi' ? category.nameHi : category.name) : 'Converters', path: '/' },
    { label: lang === 'hi' && tool.nameHi ? tool.nameHi : tool.name },
  ];

  return (
    <div className="space-y-8">
      <SEOHead
        title={tool.seoTitle || `${tool.name} – Everything Converter`}
        description={tool.seoDescription || tool.description}
        canonicalUrl={`https://everythingconverter.com/${tool.slug}`}
        faqItems={tool.faqs?.map((f) => ({
          question: lang === 'hi' && f.questionHi ? f.questionHi : f.question,
          answer: lang === 'hi' && f.answerHi ? f.answerHi : f.answer,
        }))}
      />

      {/* Breadcrumbs Navigation */}
      <Breadcrumbs items={breadcrumbs} />

      {/* Tool Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
            <DynamicIcon name={tool.iconName} className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                {lang === 'hi' && tool.nameHi ? tool.nameHi : tool.h1 || tool.name}
              </h1>
              {tool.badge && (
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800 dark:bg-blue-950/80 dark:text-blue-300">
                  {tool.badge}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              {lang === 'hi' && tool.descriptionHi ? tool.descriptionHi : tool.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Interactive Tool Engine */}
      <div className="relative">{renderEngine()}</div>

      {/* Privacy Guarantee Pill */}
      <PrivacyBanner />

      {/* Step-by-Step Instructions */}
      {tool.howItWorks && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-3">
          <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
            <Info className="h-4 w-4 text-blue-600" />
            <span>How to Use the {tool.name}</span>
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {lang === 'hi' && tool.howItWorksHi ? tool.howItWorksHi : tool.howItWorks}
          </p>
        </section>
      )}

      {/* Mathematical Formula Breakdown */}
      {(tool.formula || (tool.formulas && tool.formulas.length > 0)) && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
            <Calculator className="h-4 w-4 text-blue-600" />
            <span>Formulas & Mathematical Logic</span>
          </h2>

          {tool.formula && (
            <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-4 font-mono text-xs font-bold text-blue-900 dark:border-blue-950 dark:bg-blue-950/30 dark:text-blue-300">
              {tool.formula}
            </div>
          )}

          {tool.formulas && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tool.formulas.map((f, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-3.5 dark:border-slate-800 dark:bg-slate-950"
                >
                  <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">{f.title}</h3>
                  <p className="mt-1 font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                    {f.formula}
                  </p>
                  <p className="mt-1 text-[11px] text-slate-500">{f.explanation}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Common Examples / Conversion Reference Table */}
      {tool.examples && tool.examples.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Common Conversions & Reference Values
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                  <th className="py-2.5 pr-4 font-semibold">Input Value</th>
                  <th className="py-2.5 pr-4 font-semibold">Converted Result</th>
                  <th className="py-2.5 font-semibold">Context / Note</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {tool.examples.map((ex, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-2.5 pr-4 font-bold text-slate-900 dark:text-white">{ex.input}</td>
                    <td className="py-2.5 pr-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                      {ex.output}
                    </td>
                    <td className="py-2.5 text-slate-500">{ex.note || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Frequently Asked Questions (FAQ) */}
      {tool.faqs && tool.faqs.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
            <HelpCircle className="h-4 w-4 text-blue-600" />
            <span>Frequently Asked Questions</span>
          </h2>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {tool.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              const q = lang === 'hi' && faq.questionHi ? faq.questionHi : faq.question;
              const a = lang === 'hi' && faq.answerHi ? faq.answerHi : faq.answer;

              return (
                <div key={idx} className="py-3.5">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between text-left text-xs font-bold text-slate-800 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
                  >
                    <span>{q}</span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 shrink-0 text-slate-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                    )}
                  </button>
                  {isOpen && (
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Related Converters Grid */}
      {relatedTools.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white">
            Related Converters & Calculators
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedTools.map((relTool) => (
              <ToolCard key={relTool.id} tool={relTool} lang={lang} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
