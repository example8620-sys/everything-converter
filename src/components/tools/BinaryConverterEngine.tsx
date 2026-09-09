import React, { useState } from 'react';
import { Copy, Check, Binary, Hash, Code, Boxes } from 'lucide-react';
import { Language } from '../../types';

export const BinaryConverterEngine: React.FC<{ lang: Language }> = ({ lang }) => {
  const [decimalVal, setDecimalVal] = useState<string>('42');
  const [binaryVal, setBinaryVal] = useState<string>('101010');
  const [hexVal, setHexVal] = useState<string>('2A');
  const [octalVal, setOctalVal] = useState<string>('52');
  const [asciiVal, setAsciiVal] = useState<string>('*');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const updateFromDecimal = (val: string) => {
    setDecimalVal(val);
    const num = parseInt(val, 10);
    if (!isNaN(num) && num >= 0) {
      setBinaryVal(num.toString(2));
      setHexVal(num.toString(16).toUpperCase());
      setOctalVal(num.toString(8));
      setAsciiVal(num >= 32 && num <= 126 ? String.fromCharCode(num) : 'N/A');
    } else {
      setBinaryVal('');
      setHexVal('');
      setOctalVal('');
      setAsciiVal('');
    }
  };

  const updateFromBinary = (val: string) => {
    // only allow 0 and 1
    const clean = val.replace(/[^01]/g, '');
    setBinaryVal(clean);
    const num = parseInt(clean, 2);
    if (!isNaN(num)) {
      setDecimalVal(num.toString(10));
      setHexVal(num.toString(16).toUpperCase());
      setOctalVal(num.toString(8));
      setAsciiVal(num >= 32 && num <= 126 ? String.fromCharCode(num) : 'N/A');
    }
  };

  const updateFromHex = (val: string) => {
    const clean = val.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();
    setHexVal(clean);
    const num = parseInt(clean, 16);
    if (!isNaN(num)) {
      setDecimalVal(num.toString(10));
      setBinaryVal(num.toString(2));
      setOctalVal(num.toString(8));
      setAsciiVal(num >= 32 && num <= 126 ? String.fromCharCode(num) : 'N/A');
    }
  };

  const updateFromOctal = (val: string) => {
    const clean = val.replace(/[^0-7]/g, '');
    setOctalVal(clean);
    const num = parseInt(clean, 8);
    if (!isNaN(num)) {
      setDecimalVal(num.toString(10));
      setBinaryVal(num.toString(2));
      setHexVal(num.toString(16).toUpperCase());
      setAsciiVal(num >= 32 && num <= 126 ? String.fromCharCode(num) : 'N/A');
    }
  };

  const copyVal = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900 space-y-4">
        {/* Decimal */}
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <Hash className="h-4 w-4 text-blue-600" />
              <span>Decimal (Base 10):</span>
            </span>
            <button
              onClick={() => copyVal(decimalVal, 'dec')}
              className="text-slate-400 hover:text-blue-600 text-[11px] flex items-center gap-1"
            >
              {copiedKey === 'dec' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedKey === 'dec' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <input
            type="number"
            value={decimalVal}
            onChange={(e) => updateFromDecimal(e.target.value)}
            className="mt-1.5 w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 font-mono text-sm font-bold text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
          />
        </div>

        {/* Binary */}
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <Binary className="h-4 w-4 text-blue-600" />
              <span>Binary (Base 2):</span>
            </span>
            <button
              onClick={() => copyVal(binaryVal, 'bin')}
              className="text-slate-400 hover:text-blue-600 text-[11px] flex items-center gap-1"
            >
              {copiedKey === 'bin' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedKey === 'bin' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <input
            type="text"
            value={binaryVal}
            onChange={(e) => updateFromBinary(e.target.value)}
            className="mt-1.5 w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 font-mono text-sm font-bold text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
          />
          {binaryVal && (
            <p className="mt-1 text-[11px] text-slate-400 font-mono">
              Grouped Bytes: {binaryVal.padStart(Math.ceil(binaryVal.length / 8) * 8, '0').match(/.{1,4}/g)?.join(' ')}
            </p>
          )}
        </div>

        {/* Hexadecimal */}
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <Code className="h-4 w-4 text-blue-600" />
              <span>Hexadecimal (Base 16):</span>
            </span>
            <button
              onClick={() => copyVal(hexVal, 'hex')}
              className="text-slate-400 hover:text-blue-600 text-[11px] flex items-center gap-1"
            >
              {copiedKey === 'hex' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              <span>{copiedKey === 'hex' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <input
            type="text"
            value={hexVal}
            onChange={(e) => updateFromHex(e.target.value)}
            className="mt-1.5 w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 font-mono text-sm font-bold text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
          />
        </div>

        {/* Octal & ASCII */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <Boxes className="h-4 w-4 text-blue-600" />
                <span>Octal (Base 8):</span>
              </span>
              <button
                onClick={() => copyVal(octalVal, 'oct')}
                className="text-slate-400 hover:text-blue-600 text-[11px] flex items-center gap-1"
              >
                {copiedKey === 'oct' ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedKey === 'oct' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <input
              type="text"
              value={octalVal}
              onChange={(e) => updateFromOctal(e.target.value)}
              className="mt-1.5 w-full h-11 rounded-xl border border-slate-200 bg-slate-50 px-3 font-mono text-sm font-bold text-slate-900 focus:outline-hidden dark:border-slate-800 dark:bg-slate-950 dark:text-white"
            />
          </div>

          <div>
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">ASCII Character:</span>
            <div className="mt-1.5 flex h-11 items-center rounded-xl border border-slate-200 bg-slate-50 px-4 font-mono text-base font-bold text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white">
              {asciiVal}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
