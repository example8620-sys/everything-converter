import React, { useState } from 'react';
import { Percent, Copy, Check, Sparkles } from 'lucide-react';
import { Language } from '../../types';

export const PercentageCalculatorEngine: React.FC<{ lang: Language }> = ({ lang }) => {
  // Mode 1: What is X% of Y
  const [p1X, setP1X] = useState<string>('20');
  const [p1Y, setP1Y] = useState<string>('500');

  // Mode 2: X is what % of Y
  const [p2X, setP2X] = useState<string>('150');
  const [p2Y, setP2Y] = useState<string>('600');

  // Mode 3: Percent increase/decrease from A to B
  const [p3A, setP3A] = useState<string>('80');
  const [p3B, setP3B] = useState<string>('120');

  const res1 = (parseFloat(p1X) * parseFloat(p1Y)) / 100;
  const res2 = parseFloat(p2Y) !== 0 ? (parseFloat(p2X) / parseFloat(p2Y)) * 100 : 0;
  const diff3 = parseFloat(p3B) - parseFloat(p3A);
  const res3 = parseFloat(p3A) !== 0 ? (diff3 / parseFloat(p3A)) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Question 1: What is X% of Y? */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          1. What is X% of Y?
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">What is</span>
          <div className="flex items-center">
            <input
              type="number"
              value={p1X}
              onChange={(e) => setP1X(e.target.value)}
              className="h-11 w-24 rounded-l-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />
            <span className="flex h-11 items-center rounded-r-xl border border-l-0 border-slate-200 bg-slate-100 px-3 text-xs font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300">
              %
            </span>
          </div>
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">of</span>
          <input
            type="number"
            value={p1Y}
            onChange={(e) => setP1Y(e.target.value)}
            className="h-11 w-32 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
          />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">=</span>
          <div className="flex h-11 min-w-32 items-center rounded-xl border border-blue-200 bg-blue-50/50 px-4 text-base font-black text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">
            {!isNaN(res1) ? res1.toLocaleString(undefined, { maximumFractionDigits: 4 }) : '—'}
          </div>
        </div>
        <p className="mt-2 text-[11px] text-slate-400">
          Formula: ({p1X} / 100) × {p1Y} = {res1}
        </p>
      </div>

      {/* Question 2: X is what percent of Y? */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          2. X is what percent of Y?
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <input
            type="number"
            value={p2X}
            onChange={(e) => setP2X(e.target.value)}
            className="h-11 w-28 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
          />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">is what % of</span>
          <input
            type="number"
            value={p2Y}
            onChange={(e) => setP2Y(e.target.value)}
            className="h-11 w-28 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
          />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">=</span>
          <div className="flex h-11 min-w-32 items-center rounded-xl border border-blue-200 bg-blue-50/50 px-4 text-base font-black text-blue-700 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-300">
            {!isNaN(res2) ? `${res2.toFixed(2)}%` : '—'}
          </div>
        </div>
        <p className="mt-2 text-[11px] text-slate-400">
          Formula: ({p2X} / {p2Y}) × 100 = {res2.toFixed(2)}%
        </p>
      </div>

      {/* Question 3: Percentage Increase / Decrease */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          3. Percentage Increase or Decrease
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">From</span>
          <input
            type="number"
            value={p3A}
            onChange={(e) => setP3A(e.target.value)}
            className="h-11 w-28 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
          />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">to</span>
          <input
            type="number"
            value={p3B}
            onChange={(e) => setP3B(e.target.value)}
            className="h-11 w-28 rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-bold text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
          />
          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">=</span>
          <div
            className={`flex h-11 min-w-36 items-center rounded-xl border px-4 text-base font-black ${
              res3 >= 0
                ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300'
                : 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300'
            }`}
          >
            {!isNaN(res3) ? `${res3 >= 0 ? '+' : ''}${res3.toFixed(2)}% ${res3 >= 0 ? 'Increase' : 'Decrease'}` : '—'}
          </div>
        </div>
      </div>
    </div>
  );
};
