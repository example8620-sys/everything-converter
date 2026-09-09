import React, { useState, useMemo } from 'react';
import { ArrowLeftRight, Copy, Check, RotateCcw } from 'lucide-react';
import { UnitCategory, Language, UnitDefinition, ToolDefinition } from '../../types';
import { getCategoryUnits, convertUnits } from '../../data/units';
import { getTranslation } from '../../translations';

interface UnitConverterEngineProps {
  category?: UnitCategory;
  tool?: ToolDefinition;
  lang: Language;
}

export const UnitConverterEngine: React.FC<UnitConverterEngineProps> = ({ category: categoryProp, tool, lang }) => {
  const category = categoryProp || (tool ? tool.slug.replace(/-converter$/, '') : 'length');
  const units = useMemo(() => getCategoryUnits(category), [category]);
  const defaultFrom = units[0]?.id || '';
  const defaultTo = units[1]?.id || units[0]?.id || '';

  const [inputValue, setInputValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState<string>(defaultFrom);
  const [toUnit, setToUnit] = useState<string>(defaultTo);
  const [copied, setCopied] = useState<boolean>(false);

  const numInput = parseFloat(inputValue);
  const isValidNumber = !isNaN(numInput);

  const result = useMemo(() => {
    if (!isValidNumber) return 0;
    return convertUnits(category, numInput, fromUnit, toUnit);
  }, [category, numInput, fromUnit, toUnit, isValidNumber]);

  const handleSwap = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${formatDisplay(result)}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setInputValue('1');
    setFromUnit(defaultFrom);
    setToUnit(defaultTo);
  };

  // Convert input value to all units in this category for comparison table
  const allConversions = useMemo(() => {
    if (!isValidNumber) return [];
    return units.map((u: UnitDefinition) => ({
      unit: u,
      value: convertUnits(category, numInput, fromUnit, u.id),
    }));
  }, [category, numInput, fromUnit, units, isValidNumber]);

  return (
    <div className="space-y-6">
      {/* Primary Conversion Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* From Column */}
          <div className="md:col-span-5 space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {getTranslation(lang, 'from')}
            </label>
            <input
              id="unit-input-value"
              type="number"
              step="any"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value..."
              className="w-full h-12 rounded-xl border border-slate-200 bg-slate-50 px-4 text-base font-bold text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />
            <select
              id="unit-from-select"
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            >
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="md:col-span-1 flex justify-center py-2 md:py-0">
            <button
              id="unit-swap-btn"
              onClick={handleSwap}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition shadow-xs"
              title={getTranslation(lang, 'swap')}
            >
              <ArrowLeftRight className="h-4 w-4" />
            </button>
          </div>

          {/* To Column */}
          <div className="md:col-span-5 space-y-2">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {getTranslation(lang, 'to')}
            </label>
            <div className="flex h-12 items-center justify-between rounded-xl border border-blue-200 bg-blue-50/50 px-4 text-base font-black text-blue-700 dark:border-blue-900/50 dark:bg-blue-950/30 dark:text-blue-300">
              <span className="truncate">{isValidNumber ? formatDisplay(result) : '—'}</span>
              <button
                onClick={handleCopy}
                disabled={!isValidNumber}
                className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-bold text-blue-600 hover:bg-blue-100/70 dark:text-blue-400 dark:hover:bg-blue-900/50 transition"
                title={getTranslation(lang, 'copy')}
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span className="text-[11px]">{copied ? getTranslation(lang, 'copied') : getTranslation(lang, 'copy')}</span>
              </button>
            </div>
            <select
              id="unit-to-select"
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-800 focus:border-blue-500 focus:outline-hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            >
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Controls & Live Formula */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <div className="text-xs text-slate-600 dark:text-slate-400">
            {isValidNumber && (
              <span>
                <strong>Formula:</strong> {inputValue} {units.find((u) => u.id === fromUnit)?.symbol} ={' '}
                <span className="font-bold text-blue-600 dark:text-blue-400">
                  {formatDisplay(result)} {units.find((u) => u.id === toUnit)?.symbol}
                </span>
              </span>
            )}
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>{getTranslation(lang, 'reset')}</span>
          </button>
        </div>
      </div>

      {/* All Unit Comparison Table */}
      {isValidNumber && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            {getTranslation(lang, 'conversionTable')} ({inputValue} {units.find((u) => u.id === fromUnit)?.name})
          </h3>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Instant conversion to all corresponding {category} measurement units:
          </p>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                  <th className="py-2.5 pr-4 font-semibold">Unit Name</th>
                  <th className="py-2.5 pr-4 font-semibold">Symbol</th>
                  <th className="py-2.5 pr-4 font-semibold">Equivalent Value</th>
                  <th className="py-2.5 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                {allConversions.map(({ unit, value }) => {
                  const isCurrent = unit.id === toUnit;
                  return (
                    <tr
                      key={unit.id}
                      className={`hover:bg-slate-50 dark:hover:bg-slate-800/40 transition ${
                        isCurrent ? 'bg-blue-50/60 font-semibold dark:bg-blue-950/40' : ''
                      }`}
                    >
                      <td className="py-2.5 pr-4 text-slate-800 dark:text-slate-200">
                        {unit.name}
                        {isCurrent && (
                          <span className="ml-2 inline-block rounded-md bg-blue-600 px-1.5 py-0.5 text-[10px] text-white">
                            Selected
                          </span>
                        )}
                      </td>
                      <td className="py-2.5 pr-4 text-slate-500 dark:text-slate-400 font-mono">{unit.symbol}</td>
                      <td className="py-2.5 pr-4 text-slate-900 dark:text-white font-mono font-medium">
                        {formatDisplay(value)} {unit.symbol}
                      </td>
                      <td className="py-2.5 text-right">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(`${formatDisplay(value)}`);
                          }}
                          className="rounded-md border border-slate-200 px-2 py-1 text-[11px] font-medium text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          Copy
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

function formatDisplay(num: number): string {
  if (num === 0) return '0';
  if (Math.abs(num) >= 1e9 || (Math.abs(num) < 1e-6 && Math.abs(num) > 0)) {
    return num.toExponential(6);
  }
  // Round sensibly to up to 8 decimal places, trimming trailing zeros
  const fixed = Number(num.toFixed(8));
  return fixed.toLocaleString(undefined, { maximumFractionDigits: 8 });
}
