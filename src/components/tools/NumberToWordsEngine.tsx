import React, { useState, useMemo } from 'react';
import { Copy, Check, SpellCheck } from 'lucide-react';
import { Language } from '../../types';

export const NumberToWordsEngine: React.FC<{ lang: Language }> = ({ lang }) => {
  const [numberInput, setNumberInput] = useState<string>('1250000');
  const [format, setFormat] = useState<'indian' | 'international'>('indian');
  const [currency, setCurrency] = useState<'none' | 'rupees' | 'dollars'>('rupees');
  const [copied, setCopied] = useState<boolean>(false);

  const numVal = parseFloat(numberInput.replace(/,/g, ''));

  const resultWords = useMemo(() => {
    if (isNaN(numVal) || numVal < 0) return 'Please enter a positive number';
    if (numVal === 0) return 'Zero';

    const intPart = Math.floor(numVal);
    const decPart = Math.round((numVal - intPart) * 100);

    let words = format === 'indian' ? convertIndian(intPart) : convertInternational(intPart);

    if (currency === 'rupees') {
      words = `${words} Rupees`;
      if (decPart > 0) words += ` and ${convertIndian(decPart)} Paise`;
      words += ' Only';
    } else if (currency === 'dollars') {
      words = `${words} Dollars`;
      if (decPart > 0) words += ` and ${convertInternational(decPart)} Cents`;
      words += ' Only';
    }

    return words;
  }, [numVal, format, currency]);

  const handleCopy = () => {
    navigator.clipboard.writeText(resultWords);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-5">
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {lang === 'hi' ? 'संख्या या चेक राशि दर्ज करें:' : 'Enter Numeric Amount:'}
          </label>
          <input
            type="number"
            step="any"
            value={numberInput}
            onChange={(e) => setNumberInput(e.target.value)}
            className="mt-1.5 w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 font-mono text-base font-bold text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-500">Numbering System:</label>
            <div className="mt-1.5 flex gap-2">
              <button
                onClick={() => setFormat('indian')}
                className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
                  format === 'indian'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                Indian (Lakh, Crore)
              </button>
              <button
                onClick={() => setFormat('international')}
                className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
                  format === 'international'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                International (Million)
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500">Bank Cheque / Currency Mode:</label>
            <div className="mt-1.5 flex gap-2">
              <button
                onClick={() => setCurrency('rupees')}
                className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
                  currency === 'rupees'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                Rupees (₹)
              </button>
              <button
                onClick={() => setCurrency('dollars')}
                className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
                  currency === 'dollars'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                Dollars ($)
              </button>
              <button
                onClick={() => setCurrency('none')}
                className={`flex-1 rounded-xl py-2 text-xs font-bold transition ${
                  currency === 'none'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                Plain
              </button>
            </div>
          </div>
        </div>

        {/* Word Result Card */}
        <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-5 dark:border-blue-900/50 dark:bg-blue-950/30">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Amount in Words:
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold text-blue-600 hover:bg-blue-100/80 dark:text-blue-400 dark:hover:bg-blue-900/40"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Words'}</span>
            </button>
          </div>
          <p className="mt-2 text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
            {resultWords}
          </p>
        </div>
      </div>
    </div>
  );
};

const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

function convertUnderThousand(num: number): string {
  let s = '';
  if (num >= 100) {
    s += `${ONES[Math.floor(num / 100)]} Hundred `;
    num %= 100;
  }
  if (num >= 20) {
    s += `${TENS[Math.floor(num / 10)]} `;
    num %= 10;
  }
  if (num > 0) {
    s += `${ONES[num]} `;
  }
  return s.trim();
}

function convertIndian(n: number): string {
  if (n === 0) return 'Zero';
  let str = '';

  const crore = Math.floor(n / 10000000);
  n %= 10000000;
  const lakh = Math.floor(n / 100000);
  n %= 100000;
  const thousand = Math.floor(n / 1000);
  n %= 1000;

  if (crore > 0) str += `${convertIndian(crore)} Crore `;
  if (lakh > 0) str += `${convertUnderThousand(lakh)} Lakh `;
  if (thousand > 0) str += `${convertUnderThousand(thousand)} Thousand `;
  if (n > 0) str += convertUnderThousand(n);

  return str.trim();
}

function convertInternational(n: number): string {
  if (n === 0) return 'Zero';
  let str = '';

  const billion = Math.floor(n / 1000000000);
  n %= 1000000000;
  const million = Math.floor(n / 1000000);
  n %= 1000000;
  const thousand = Math.floor(n / 1000);
  n %= 1000;

  if (billion > 0) str += `${convertUnderThousand(billion)} Billion `;
  if (million > 0) str += `${convertUnderThousand(million)} Million `;
  if (thousand > 0) str += `${convertUnderThousand(thousand)} Thousand `;
  if (n > 0) str += convertUnderThousand(n);

  return str.trim();
}
