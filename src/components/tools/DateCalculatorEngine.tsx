import React, { useState, useMemo } from 'react';
import { Calendar, Plus, Minus, Check } from 'lucide-react';
import { Language } from '../../types';

export const DateCalculatorEngine: React.FC<{ lang: Language }> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'diff' | 'addsub'>('diff');

  // Diff Mode
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState<string>(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  });

  // Add/Subtract Mode
  const [baseDate, setBaseDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [daysCount, setDaysCount] = useState<number>(45);

  // Calculate Difference
  const diffStats = useMemo(() => {
    const s = new Date(startDate);
    const e = new Date(endDate);

    if (isNaN(s.getTime()) || isNaN(e.getTime())) return null;

    const diffMs = Math.abs(e.getTime() - s.getTime());
    const totalDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;

    // Count business days
    let businessDays = 0;
    const cur = new Date(s < e ? s : e);
    const target = new Date(s < e ? e : s);
    while (cur < target) {
      cur.setDate(cur.getDate() + 1);
      const day = cur.getDay();
      if (day !== 0 && day !== 6) {
        businessDays++;
      }
    }

    return {
      totalDays,
      weeks,
      remainingDays,
      businessDays,
      totalHours: totalDays * 24,
    };
  }, [startDate, endDate]);

  // Calculate Add / Subtract
  const addSubResult = useMemo(() => {
    const b = new Date(baseDate);
    if (isNaN(b.getTime())) return '';
    const factor = operation === 'add' ? 1 : -1;
    b.setDate(b.getDate() + daysCount * factor);
    return b.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }, [baseDate, operation, daysCount]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-5">
        {/* Tab switch */}
        <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          <button
            onClick={() => setActiveTab('diff')}
            className={`flex-1 rounded-lg py-2.5 text-xs font-bold transition ${
              activeTab === 'diff'
                ? 'bg-white text-blue-600 shadow-xs dark:bg-slate-900 dark:text-blue-400'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Days Between Two Dates
          </button>
          <button
            onClick={() => setActiveTab('addsub')}
            className={`flex-1 rounded-lg py-2.5 text-xs font-bold transition ${
              activeTab === 'addsub'
                ? 'bg-white text-blue-600 shadow-xs dark:bg-slate-900 dark:text-blue-400'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Add or Subtract Days
          </button>
        </div>

        {activeTab === 'diff' ? (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Start Date:</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="mt-1.5 w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">End Date:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1.5 w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>
            </div>

            {diffStats && (
              <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-5 dark:border-blue-900 dark:bg-blue-950/30 text-center space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Total Difference
                </span>
                <div className="text-3xl font-black text-slate-900 dark:text-white">
                  {diffStats.totalDays} Days
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Equivalent to <strong>{diffStats.weeks} weeks and {diffStats.remainingDays} days</strong>.
                </p>
                <div className="flex justify-center gap-6 border-t border-blue-200/60 pt-3 dark:border-blue-900/60 text-xs">
                  <div>
                    <span className="text-slate-500">Business Working Days: </span>
                    <strong className="text-emerald-600 dark:text-emerald-400">
                      {diffStats.businessDays} days
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-500">Total Hours: </span>
                    <strong className="text-slate-800 dark:text-slate-200">
                      {diffStats.totalHours.toLocaleString()} hrs
                    </strong>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Start Date:</label>
                <input
                  type="date"
                  value={baseDate}
                  onChange={(e) => setBaseDate(e.target.value)}
                  className="mt-1.5 w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Operation:</label>
                <div className="mt-1.5 flex gap-2">
                  <button
                    onClick={() => setOperation('add')}
                    className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition ${
                      operation === 'add'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    + Add
                  </button>
                  <button
                    onClick={() => setOperation('subtract')}
                    className={`flex-1 rounded-xl py-2.5 text-xs font-bold transition ${
                      operation === 'subtract'
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'border border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    − Subtract
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Number of Days:</label>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={daysCount}
                  onChange={(e) => setDaysCount(Number(e.target.value))}
                  className="mt-1.5 w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                />
              </div>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-5 dark:border-blue-900 dark:bg-blue-950/30 text-center">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Calculated Target Date:
              </span>
              <div className="mt-2 text-2xl font-black text-slate-900 dark:text-white">
                {addSubResult}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
