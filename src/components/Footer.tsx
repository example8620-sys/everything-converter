import React from 'react';
import { Sparkles, Shield, Heart } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../translations';
import { categories } from '../data/categories';

interface FooterProps {
  onNavigate: (path: string) => void;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, lang }) => {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/80 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-sky-500 text-white shadow-xs">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">
                Everything Converter
              </span>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400 max-w-sm">
              {getTranslation(lang, 'tagline')}
              <br />
              A massive suite of 100+ free everyday online tools, image processors, unit converters, calculators, and developer utilities with 100% local client-side privacy.
            </p>

            <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400">
              <Shield className="h-4 w-4" />
              <span>{lang === 'hi' ? '100% स्थानीय ब्राउज़र प्रोसेसिंग' : '100% Local In-Browser Processing'}</span>
            </div>

            <p className="mt-3 text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
              <span>Developed by</span>
              <span className="text-blue-600 dark:text-blue-400">Shubham Kumar</span>
              <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500 inline" />
            </p>
          </div>

          {/* Popular Categories */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {lang === 'hi' ? 'मुख्य श्रेणियां' : 'Categories'}
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              {categories.slice(0, 5).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onNavigate(`/${cat.slug}/`)}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                  >
                    {lang === 'hi' ? cat.nameHi : cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tools Quicklinks */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {getTranslation(lang, 'popularTools')}
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => onNavigate('/passport-photo-maker/')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  {lang === 'hi' ? 'पासपोर्ट साइज फोटो मेकर' : 'Passport Photo Maker'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/photo-size-reducer/')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  {lang === 'hi' ? 'फोटो साइज रिड्यूसर (KB)' : 'Photo Size Reducer (KB)'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/length-converter/')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  {lang === 'hi' ? 'लंबाई कनवर्टर' : 'Length Converter'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/age-calculator/')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  {lang === 'hi' ? 'उम्र कैलकुलेटर' : 'Age Calculator'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/loan-emi-calculator/')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  {lang === 'hi' ? 'लोन ईएमआई कैलकुलेटर' : 'Loan EMI Calculator'}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/binary-converter/')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  {lang === 'hi' ? 'बाइनरी कनवर्टर' : 'Binary Converter'}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal / Company Pages for AdSense Compliance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
              {lang === 'hi' ? 'नीति व जानकारी' : 'Company & Legal'}
            </h4>
            <ul className="mt-3 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <button onClick={() => onNavigate('/about/')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  {getTranslation(lang, 'footerAbout')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact/')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  {getTranslation(lang, 'footerContact')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/privacy-policy/')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  {getTranslation(lang, 'footerPrivacy')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/terms/')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  {getTranslation(lang, 'footerTerms')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/disclaimer/')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  {getTranslation(lang, 'footerDisclaimer')}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/cookie-policy/')} className="hover:text-blue-600 dark:hover:text-blue-400 transition">
                  {getTranslation(lang, 'footerCookies')}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between border-t border-slate-100 pt-8 sm:flex-row dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} Everything Converter. {getTranslation(lang, 'footerRights')}</p>
          <p className="mt-2 sm:mt-0 font-medium">
            Developed by Shubham Kumar ❤
          </p>
        </div>
      </div>
    </footer>
  );
};
