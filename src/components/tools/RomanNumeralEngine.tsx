import React, { useState } from 'react';
import { Scroll, Copy, Check, ArrowDownUp } from 'lucide-react';
import { Language } from '../../types';

export const RomanNumeralEngine: React.FC<{ lang: Language }> = ({ lang }) => {
  const [numberVal, setNumberVal] = useState<string>('2026');
  const [romanVal, setRomanVal] = useState<string>('MMXXVI');
  const [copied, setCopied] = useState<boolean>(false);

  const handleNumberChange = (val: string) => {
    setNumberVal(val);
    const n = parseInt(val, 10);
    if (!isNaN(n) && n >= 1 && n <= 3999) {
      setRomanVal(toRoman(n));
    } else {
      setRomanVal('');
    }
  };

  const handleRomanChange = (val: string) => {
    const clean = val.toUpperCase().replace(/[^IVXLCDM]/g, '');
    setRomanVal(clean);
    const num = fromRoman(clean);
    if (num > 0 && num <= 3999) {
      setNumberVal(num.toString());
    }
  };

  const copyRoman = () => {
    navigator.clipboard.writeText(romanVal);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Standard Number (1 – 3999):
            </label>
            <input
              type="number"
              min="1"
              max="3999"
              value={numberVal}
              onChange={(e) => handleNumberChange(e.target.value)}
              className="mt-1.5 w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 font-mono text-base font-bold text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span>Roman Numeral:</span>
              <button
                onClick={copyRoman}
                className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-[11px]"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <input
              type="text"
              value={romanVal}
              onChange={(e) => handleRomanChange(e.target.value)}
              placeholder="e.g. MMXXVI"
              className="mt-1.5 w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 font-mono text-base font-bold text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white uppercase"
            />
          </div>
        </div>

        {/* Breakdown table */}
        <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800 text-xs text-slate-500">
          <p className="font-semibold text-slate-700 dark:text-slate-300">Roman Symbol Values:</p>
          <div className="mt-2 flex flex-wrap gap-3 font-mono">
            <span>M = 1000</span>
            <span>D = 500</span>
            <span>C = 100</span>
            <span>L = 50</span>
            <span>X = 10</span>
            <span>V = 5</span>
            <span>I = 1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const ROMAN_MAP: [number, string][] = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
];

function toRoman(num: number): string {
  let result = '';
  for (const [val, letter] of ROMAN_MAP) {
    while (num >= val) {
      result += letter;
      num -= val;
    }
  }
  return result;
}

function fromRoman(str: string): number {
  const map: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  for (let i = 0; i < str.length; i++) {
    const current = map[str[i]] || 0;
    const next = map[str[i + 1]] || 0;
    if (next > current) {
      total += next - current;
      i++;
    } else {
      total += current;
    }
  }
  return total;
}
