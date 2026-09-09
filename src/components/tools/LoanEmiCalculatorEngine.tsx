import React, { useState, useMemo } from 'react';
import { CreditCard, PieChart, Calendar, DollarSign } from 'lucide-react';
import { Language } from '../../types';

export const LoanEmiCalculatorEngine: React.FC<{ lang: Language }> = ({ lang }) => {
  const [principal, setPrincipal] = useState<number>(1000000);
  const [rate, setRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(5);

  const stats = useMemo(() => {
    const P = principal;
    const r = rate / 12 / 100; // monthly rate
    const n = tenureYears * 12; // total months

    if (P <= 0 || r <= 0 || n <= 0) {
      return { emi: 0, totalInterest: 0, totalPayment: 0, yearlySchedule: [] };
    }

    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    // Generate yearly amortization
    let balance = P;
    const yearlySchedule = [];
    for (let yr = 1; yr <= tenureYears; yr++) {
      let yearlyInterest = 0;
      let yearlyPrincipal = 0;
      for (let m = 1; m <= 12; m++) {
        const interestMonth = balance * r;
        const principalMonth = emi - interestMonth;
        yearlyInterest += interestMonth;
        yearlyPrincipal += principalMonth;
        balance -= principalMonth;
      }
      yearlySchedule.push({
        year: yr,
        principalPaid: Math.round(yearlyPrincipal),
        interestPaid: Math.round(yearlyInterest),
        balance: Math.max(0, Math.round(balance)),
      });
    }

    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment),
      yearlySchedule,
    };
  }, [principal, rate, tenureYears]);

  const principalPercent = stats.totalPayment > 0 ? (principal / stats.totalPayment) * 100 : 50;
  const interestPercent = 100 - principalPercent;

  return (
    <div className="space-y-6">
      {/* Input Sliders & Controls */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-6">
        {/* Principal Amount */}
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
            <span>Loan Amount:</span>
            <span className="font-mono text-base font-black text-blue-600 dark:text-blue-400">
              ₹ {principal.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="10000"
            max="10000000"
            step="10000"
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            className="mt-2 w-full accent-blue-600"
          />
        </div>

        {/* Interest Rate */}
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
            <span>Interest Rate (p.a.):</span>
            <span className="font-mono text-base font-black text-slate-900 dark:text-white">
              {rate}%
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="25"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="mt-2 w-full accent-blue-600"
          />
        </div>

        {/* Loan Tenure */}
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
            <span>Loan Tenure:</span>
            <span className="font-mono text-base font-black text-slate-900 dark:text-white">
              {tenureYears} Years ({tenureYears * 12} Months)
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={tenureYears}
            onChange={(e) => setTenureYears(Number(e.target.value))}
            className="mt-2 w-full accent-blue-600"
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-6 shadow-xs dark:border-blue-900/50 dark:bg-blue-950/30 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Monthly Loan EMI
          </span>
          <p className="mt-2 text-3xl font-black text-blue-700 dark:text-blue-300">
            ₹ {stats.emi.toLocaleString()}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Total Interest Payable
          </span>
          <p className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
            ₹ {stats.totalInterest.toLocaleString()}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Total Amount (Principal + Int)
          </span>
          <p className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
            ₹ {stats.totalPayment.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Proportion Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
          <span>Principal ({principalPercent.toFixed(1)}%)</span>
          <span>Interest ({interestPercent.toFixed(1)}%)</span>
        </div>
        <div className="mt-2 flex h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div className="bg-blue-600 transition-all" style={{ width: `${principalPercent}%` }} />
          <div className="bg-amber-500 transition-all" style={{ width: `${interestPercent}%` }} />
        </div>
      </div>

      {/* Yearly Schedule Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
          Yearly Amortization Schedule
        </h4>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400">
                <th className="py-2.5 pr-4 font-semibold">Year</th>
                <th className="py-2.5 pr-4 font-semibold">Principal (A)</th>
                <th className="py-2.5 pr-4 font-semibold">Interest (B)</th>
                <th className="py-2.5 pr-4 font-semibold">Total Paid (A + B)</th>
                <th className="py-2.5 font-semibold">Remaining Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
              {stats.yearlySchedule.map((row) => (
                <tr key={row.year} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-2.5 pr-4 font-sans font-bold text-slate-800 dark:text-slate-200">
                    Year {row.year}
                  </td>
                  <td className="py-2.5 pr-4 text-blue-600 dark:text-blue-400">
                    ₹ {row.principalPaid.toLocaleString()}
                  </td>
                  <td className="py-2.5 pr-4 text-amber-600 dark:text-amber-400">
                    ₹ {row.interestPaid.toLocaleString()}
                  </td>
                  <td className="py-2.5 pr-4 font-bold text-slate-900 dark:text-white">
                    ₹ {(row.principalPaid + row.interestPaid).toLocaleString()}
                  </td>
                  <td className="py-2.5 text-slate-600 dark:text-slate-400">
                    ₹ {row.balance.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
