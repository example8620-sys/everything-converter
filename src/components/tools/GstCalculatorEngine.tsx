import React, { useState, useMemo } from 'react';
import { Receipt, Copy, Check, Sparkles } from 'lucide-react';
import { Language } from '../../types';

export const GstCalculatorEngine: React.FC<{ lang: Language }> = ({ lang }) => {
  const [amount, setAmount] = useState<number>(1000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [isAddGst, setIsAddGst] = useState<boolean>(true); // true = Add GST, false = Remove GST
  const [copied, setCopied] = useState<boolean>(false);

  const SLABS = [5, 12, 18, 28];

  const stats = useMemo(() => {
    const P = amount || 0;
    const R = gstRate || 0;

    let netPrice = 0;
    let gstAmount = 0;
    let totalGross = 0;

    if (isAddGst) {
      netPrice = P;
      gstAmount = (P * R) / 100;
      totalGross = P + gstAmount;
    } else {
      totalGross = P;
      netPrice = (P * 100) / (100 + R);
      gstAmount = totalGross - netPrice;
    }

    const cgst = gstAmount / 2;
    const sgst = gstAmount / 2;

    return {
      netPrice: Math.round(netPrice * 100) / 100,
      gstAmount: Math.round(gstAmount * 100) / 100,
      totalGross: Math.round(totalGross * 100) / 100,
      cgst: Math.round(cgst * 100) / 100,
      sgst: Math.round(sgst * 100) / 100,
    };
  }, [amount, gstRate, isAddGst]);

  const handleCopy = () => {
    const text = `Net Price: ₹${stats.netPrice}\nGST (${gstRate}%): ₹${stats.gstAmount} (CGST: ₹${stats.cgst}, SGST: ₹${stats.sgst})\nTotal Price: ₹${stats.totalGross}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-5">
        {/* Toggle: Add GST vs Remove GST */}
        <div className="flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          <button
            onClick={() => setIsAddGst(true)}
            className={`flex-1 rounded-lg py-2.5 text-xs font-bold transition ${
              isAddGst ? 'bg-white text-blue-600 shadow-xs dark:bg-slate-900 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Add GST (Exclusive)
          </button>
          <button
            onClick={() => setIsAddGst(false)}
            className={`flex-1 rounded-lg py-2.5 text-xs font-bold transition ${
              !isAddGst ? 'bg-white text-blue-600 shadow-xs dark:bg-slate-900 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Remove GST (Inclusive)
          </button>
        </div>

        {/* Amount Input */}
        <div>
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            {isAddGst ? 'Initial Net Price:' : 'Total Gross Bill Amount (with GST):'}
          </label>
          <div className="mt-1.5 flex items-center">
            <span className="flex h-12 items-center rounded-l-xl border border-r-0 border-slate-200 bg-slate-100 px-4 text-base font-bold text-slate-600 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300">
              ₹
            </span>
            <input
              type="number"
              step="any"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="h-12 w-full rounded-r-xl border border-slate-200 bg-slate-50 px-4 text-base font-bold text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />
          </div>
        </div>

        {/* GST Slab selection */}
        <div>
          <label className="text-xs font-bold text-slate-500">Select GST Rate Slab:</label>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {SLABS.map((slab) => (
              <button
                key={slab}
                onClick={() => setGstRate(slab)}
                className={`flex-1 min-w-16 rounded-xl py-2.5 text-xs font-bold transition ${
                  gstRate === slab
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {slab}%
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Breakdown */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-6 shadow-xs dark:border-blue-900/50 dark:bg-blue-950/30 space-y-4">
        <div className="flex items-center justify-between border-b border-blue-200/60 pb-3 dark:border-blue-900/60">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
            GST Calculation Breakdown
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-800 dark:text-blue-400"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="rounded-xl bg-white p-3 shadow-2xs dark:bg-slate-900">
            <span className="text-[11px] font-semibold text-slate-500">Net Amount</span>
            <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
              ₹ {stats.netPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="rounded-xl bg-white p-3 shadow-2xs dark:bg-slate-900">
            <span className="text-[11px] font-semibold text-slate-500">GST Amount ({gstRate}%)</span>
            <p className="mt-1 text-xl font-bold text-amber-600 dark:text-amber-400">
              ₹ {stats.gstAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
            <p className="mt-0.5 text-[10px] text-slate-400">
              CGST: ₹{stats.cgst} | SGST: ₹{stats.sgst}
            </p>
          </div>

          <div className="rounded-xl bg-white p-3 shadow-2xs dark:bg-slate-900">
            <span className="text-[11px] font-semibold text-slate-500">Total Gross Price</span>
            <p className="mt-1 text-xl font-black text-blue-600 dark:text-blue-400">
              ₹ {stats.totalGross.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
