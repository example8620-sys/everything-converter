import React, { useState } from 'react';
import { Download, X } from 'lucide-react';
import { usePWAInstall } from './usePWAInstall';
import { Language } from '../types';
import { getTranslation } from '../translations';

interface PWAInstallButtonProps {
  lang: Language;
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ lang }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        id="pwa-install-btn"
        onClick={install}
        className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-700 transition"
        title={getTranslation(lang, 'installApp')}
      >
        <Download className="w-3.5 h-3.5" />
        <span className="whitespace-nowrap">{getTranslation(lang, 'installApp')}</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          id="pwa-install-ios-btn"
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-1.5 rounded-lg border border-slate-300 dark:border-slate-700 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="whitespace-nowrap">Install App</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {lang === 'hi' ? 'iPhone / iPad पर इंस्टॉल करें' : 'Install on iPhone / iPad'}
                </h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="rounded-lg p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-300 space-y-2">
                <span>1. Safari टूलबार में <strong>Share</strong> (शेयर) बटन पर टैप करें।</span>
                <br />
                <span>2. नीचे स्क्रॉल करें और <strong>Add to Home Screen</strong> चुनें।</span>
              </p>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 transition"
              >
                {lang === 'hi' ? 'समझ गया' : 'Got it'}
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
