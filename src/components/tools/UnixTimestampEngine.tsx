import React, { useState, useEffect } from 'react';
import { Clock, Copy, Check, RefreshCw, Calendar } from 'lucide-react';
import { Language } from '../../types';

export const UnixTimestampEngine: React.FC<{ lang: Language }> = ({ lang }) => {
  const [currentNow, setCurrentNow] = useState<number>(Math.floor(Date.now() / 1000));
  const [timestampInput, setTimestampInput] = useState<string>(String(Math.floor(Date.now() / 1000)));
  const [dateInput, setDateInput] = useState<string>(
    new Date().toISOString().slice(0, 16)
  );
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Live ticking clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNow(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute date from timestamp
  const tsNumber = parseInt(timestampInput, 10);
  const isMs = timestampInput.length >= 13;
  const validDate = !isNaN(tsNumber)
    ? new Date(isMs ? tsNumber : tsNumber * 1000)
    : null;

  // Compute timestamp from date input
  const computedTimestampFromDate = dateInput ? Math.floor(new Date(dateInput).getTime() / 1000) : 0;

  const copyVal = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Current Unix Time Bar */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-6 shadow-xs dark:border-blue-900/50 dark:bg-blue-950/30">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Current Unix Epoch Timestamp:
            </span>
            <div className="mt-1 font-mono text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
              {currentNow}
            </div>
          </div>
          <button
            onClick={() => copyVal(String(currentNow), 'now')}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-blue-700 transition"
          >
            {copiedKey === 'now' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span>{copiedKey === 'now' ? 'Copied' : 'Copy Current Timestamp'}</span>
          </button>
        </div>
      </div>

      {/* Timestamp to Date Converter */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Timestamp → Human Date
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="number"
            value={timestampInput}
            onChange={(e) => setTimestampInput(e.target.value)}
            placeholder="e.g. 1773000000"
            className="h-11 flex-1 min-w-48 rounded-xl border border-slate-200 bg-slate-50 px-3 font-mono text-sm font-bold text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
          />
          <button
            onClick={() => setTimestampInput(String(currentNow))}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 transition"
          >
            Use Now
          </button>
        </div>

        {validDate && !isNaN(validDate.getTime()) ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="rounded-xl border border-slate-200 p-3 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
              <span className="text-[11px] font-semibold text-slate-400">GMT / UTC:</span>
              <p className="mt-1 font-mono text-xs font-bold text-slate-900 dark:text-white">
                {validDate.toUTCString()}
              </p>
            </div>
            <div className="rounded-xl border border-slate-200 p-3 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
              <span className="text-[11px] font-semibold text-slate-400">Local Timezone:</span>
              <p className="mt-1 font-mono text-xs font-bold text-slate-900 dark:text-white">
                {validDate.toString()}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-xs text-rose-500 font-semibold">Please enter a valid numeric timestamp.</p>
        )}
      </div>

      {/* Date to Timestamp Converter */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Human Date → Unix Timestamp
        </h3>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="datetime-local"
            value={dateInput}
            onChange={(e) => setDateInput(e.target.value)}
            className="h-11 flex-1 min-w-48 rounded-xl border border-slate-200 bg-slate-50 px-3 font-mono text-xs font-bold text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
          />
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-blue-600 dark:text-blue-400">
              {computedTimestampFromDate}
            </span>
            <button
              onClick={() => copyVal(String(computedTimestampFromDate), 'from-date')}
              className="rounded-lg p-2 text-slate-400 hover:text-blue-600"
              title="Copy"
            >
              {copiedKey === 'from-date' ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
