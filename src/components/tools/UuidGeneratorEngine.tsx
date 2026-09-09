import React, { useState } from 'react';
import { Copy, Check, RefreshCw, Sparkles, Key } from 'lucide-react';
import { Language } from '../../types';

export const UuidGeneratorEngine: React.FC<{ lang: Language }> = ({ lang }) => {
  const [count, setCount] = useState<number>(5);
  const [isUppercase, setIsUppercase] = useState<boolean>(false);
  const [hasHyphens, setHasHyphens] = useState<boolean>(true);
  const [uuids, setUuids] = useState<string[]>(() => generateList(5, false, true));
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  function generateOne(upper: boolean, hyphens: boolean): string {
    let id: string = crypto.randomUUID();
    if (!hyphens) id = id.replace(/-/g, '');
    if (upper) id = id.toUpperCase();
    return id;
  }

  function generateList(n: number, upper: boolean, hyphens: boolean): string[] {
    const list: string[] = [];
    for (let i = 0; i < n; i++) {
      list.push(generateOne(upper, hyphens));
    }
    return list;
  }

  const handleRegenerate = () => {
    setUuids(generateList(count, isUppercase, hasHyphens));
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const copyOne = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-5">
        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Quantity:</span>
              <select
                value={count}
                onChange={(e) => {
                  const n = Number(e.target.value);
                  setCount(n);
                  setUuids(generateList(n, isUppercase, hasHyphens));
                }}
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
              >
                <option value={1}>1 UUID</option>
                <option value={5}>5 UUIDs</option>
                <option value={10}>10 UUIDs</option>
                <option value={25}>25 UUIDs</option>
                <option value={50}>50 UUIDs</option>
              </select>
            </div>

            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={isUppercase}
                onChange={(e) => {
                  setIsUppercase(e.target.checked);
                  setUuids(generateList(count, e.target.checked, hasHyphens));
                }}
                className="rounded accent-blue-600"
              />
              <span>Uppercase</span>
            </label>

            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={hasHyphens}
                onChange={(e) => {
                  setHasHyphens(e.target.checked);
                  setUuids(generateList(count, isUppercase, e.target.checked));
                }}
                className="rounded accent-blue-600"
              />
              <span>Hyphens</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRegenerate}
              className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 transition"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Generate New</span>
            </button>
            <button
              onClick={copyAll}
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 shadow-xs transition"
            >
              {copiedAll ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedAll ? 'Copied All' : 'Copy All'}</span>
            </button>
          </div>
        </div>

        {/* List of UUIDs */}
        <div className="space-y-2 font-mono">
          {uuids.map((id, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-bold text-slate-800 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200"
            >
              <span className="truncate">{id}</span>
              <button
                onClick={() => copyOne(id, idx)}
                className="ml-2 text-slate-400 hover:text-blue-600 p-1"
                title="Copy this UUID"
              >
                {copiedIndex === idx ? (
                  <Check className="h-4 w-4 text-emerald-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
