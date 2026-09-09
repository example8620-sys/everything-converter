import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Language } from '../types';

interface PrivacyBannerProps {
  lang: Language;
}

export const PrivacyBanner: React.FC<PrivacyBannerProps> = ({ lang }) => {
  return (
    <div
      id="privacy-assurance-banner"
      className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50/70 p-3.5 text-xs text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300"
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-xs">
        <ShieldCheck className="h-4 w-4" />
      </div>
      <div className="leading-relaxed">
        <strong className="font-semibold">
          {lang === 'hi' ? '100% स्थानीय गोपनीयता:' : '100% Local Browser Privacy:'}
        </strong>{' '}
        {lang === 'hi'
          ? 'आपकी फोटो, फाइलें और गणनाएं पूरी तरह आपके ब्राउज़र में लोकली प्रोसेस होती हैं। कोई भी डेटा कभी किसी बाहरी सर्वर पर अपलोड नहीं किया जाता।'
          : 'Your photos, files, and calculations are processed exclusively in your device browser. No files are ever sent to or stored on any server.'}
      </div>
    </div>
  );
};
