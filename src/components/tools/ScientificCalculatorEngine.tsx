import React, { useState } from 'react';
import { Delete, RotateCcw, Equal } from 'lucide-react';
import { Language } from '../../types';

export const ScientificCalculatorEngine: React.FC<{ lang: Language }> = ({ lang }) => {
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [isRad, setIsRad] = useState<boolean>(true);

  const append = (val: string) => {
    setExpression((prev) => prev + val);
  };

  const clearAll = () => {
    setExpression('');
    setResult('');
  };

  const backspace = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  const calculate = () => {
    try {
      if (!expression) return;
      // Evaluate safe mathematical expressions
      let sanitized = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'Math.PI')
        .replace(/e/g, 'Math.E')
        .replace(/sin\(/g, isRad ? 'Math.sin(' : 'Math.sin((Math.PI/180)*')
        .replace(/cos\(/g, isRad ? 'Math.cos(' : 'Math.cos((Math.PI/180)*')
        .replace(/tan\(/g, isRad ? 'Math.tan(' : 'Math.tan((Math.PI/180)*')
        .replace(/sqrt\(/g, 'Math.sqrt(')
        .replace(/log\(/g, 'Math.log10(')
        .replace(/ln\(/g, 'Math.log(')
        .replace(/\^/g, '**');

      // eslint-disable-next-line no-eval
      const evalRes = Function(`'use strict'; return (${sanitized})`)();
      const formatted = Number.isFinite(evalRes)
        ? Math.round(evalRes * 100000000) / 100000000
        : 'Error';
      setResult(String(formatted));
    } catch (e) {
      setResult('Error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="mx-auto max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        {/* Screen Display */}
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-right dark:border-slate-800 dark:bg-slate-950 font-mono">
          <div className="h-6 text-xs text-slate-400 overflow-x-auto whitespace-nowrap">
            {expression || '0'}
          </div>
          <div className="mt-1 text-3xl font-black text-slate-900 dark:text-white truncate">
            {result || expression || '0'}
          </div>
        </div>

        {/* Deg / Rad toggle */}
        <div className="flex justify-between items-center text-xs font-bold text-slate-500">
          <div className="flex rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
            <button
              onClick={() => setIsRad(false)}
              className={`rounded-md px-2.5 py-1 ${!isRad ? 'bg-white text-blue-600 shadow-xs dark:bg-slate-900' : ''}`}
            >
              DEG
            </button>
            <button
              onClick={() => setIsRad(true)}
              className={`rounded-md px-2.5 py-1 ${isRad ? 'bg-white text-blue-600 shadow-xs dark:bg-slate-900' : ''}`}
            >
              RAD
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={backspace}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
              title="Backspace"
            >
              <Delete className="h-4 w-4" />
            </button>
            <button
              onClick={clearAll}
              className="rounded-lg bg-rose-50 px-2.5 py-1 text-xs font-bold text-rose-600 hover:bg-rose-100 dark:bg-rose-950/60 dark:text-rose-300"
            >
              AC
            </button>
          </div>
        </div>

        {/* Keypad Grid */}
        <div className="grid grid-cols-5 gap-2">
          {/* Row 1 */}
          <button onClick={() => append('sin(')} className="calc-btn-sc">sin</button>
          <button onClick={() => append('cos(')} className="calc-btn-sc">cos</button>
          <button onClick={() => append('tan(')} className="calc-btn-sc">tan</button>
          <button onClick={() => append('(')} className="calc-btn-sc">(</button>
          <button onClick={() => append(')')} className="calc-btn-sc">)</button>

          {/* Row 2 */}
          <button onClick={() => append('ln(')} className="calc-btn-sc">ln</button>
          <button onClick={() => append('log(')} className="calc-btn-sc">log</button>
          <button onClick={() => append('sqrt(')} className="calc-btn-sc">√</button>
          <button onClick={() => append('^')} className="calc-btn-sc">x^y</button>
          <button onClick={() => append('÷')} className="calc-btn-op">÷</button>

          {/* Row 3 */}
          <button onClick={() => append('π')} className="calc-btn-sc">π</button>
          <button onClick={() => append('7')} className="calc-btn-num">7</button>
          <button onClick={() => append('8')} className="calc-btn-num">8</button>
          <button onClick={() => append('9')} className="calc-btn-num">9</button>
          <button onClick={() => append('×')} className="calc-btn-op">×</button>

          {/* Row 4 */}
          <button onClick={() => append('e')} className="calc-btn-sc">e</button>
          <button onClick={() => append('4')} className="calc-btn-num">4</button>
          <button onClick={() => append('5')} className="calc-btn-num">5</button>
          <button onClick={() => append('6')} className="calc-btn-num">6</button>
          <button onClick={() => append('-')} className="calc-btn-op">-</button>

          {/* Row 5 */}
          <button onClick={() => append('%')} className="calc-btn-sc">%</button>
          <button onClick={() => append('1')} className="calc-btn-num">1</button>
          <button onClick={() => append('2')} className="calc-btn-num">2</button>
          <button onClick={() => append('3')} className="calc-btn-num">3</button>
          <button onClick={() => append('+')} className="calc-btn-op">+</button>

          {/* Row 6 */}
          <button onClick={() => append('0')} className="col-span-2 calc-btn-num">0</button>
          <button onClick={() => append('.')} className="calc-btn-num">.</button>
          <button
            onClick={calculate}
            className="col-span-2 flex items-center justify-center rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-sm hover:bg-blue-700 transition"
          >
            <Equal className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
